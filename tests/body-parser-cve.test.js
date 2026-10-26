// Regression test for GHSA-27r3-jxmh-p828 / CVE-2026-111181
// https://github.com/expressjs/body-parser/security/advisories/GHSA-27r3-jxmh-p828
//
// body-parser < 2.4.0 pipes a compressed request body into a decompression
// stream and, after reading the body, leaves that stream piped with no error
// listener. A request made of one valid gzip frame followed by trailing bytes
// decodes and responds normally, but the trailing bytes then reach the
// already-finished decoder; the error it emits is re-thrown as an uncaught
// exception and terminates the process.
//
// This test reproduces that payload (valid gzip frame + 0x00 + trailing bytes)
// and asserts the server still responds 200. On body-parser 2.2.2 the process
// crashes with an uncaught "incorrect header check" error; on 2.4.0 it passes.
const http = require('http');
const zlib = require('zlib');
const express = require('express');
const chai = require('chai');

const expect = chai.expect;

describe('body-parser CVE-2026-111181 (GHSA-27r3-jxmh-p828)', function () {
  it('does not crash when trailing bytes follow a gzip request body', function (done) {
    const app = express();
    app.use(express.json());
    app.post('/echo', (req, res) => res.status(200).json({ ok: true, body: req.body }));

    const server = app.listen(0, '127.0.0.1', () => {
      const port = server.address().port;

      // One valid compressed frame, followed by trailing bytes that reach the
      // finished decoder and trigger the uncaught error on vulnerable versions.
      const body = Buffer.concat([
        zlib.gzipSync(Buffer.from(JSON.stringify({ a: 1 }))),
        Buffer.from([0x00]),
        Buffer.alloc(100 * 1024, 0x58)
      ]);

      const req = http.request({
        host: '127.0.0.1',
        port,
        method: 'POST',
        path: '/echo',
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          'Content-Length': body.length
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          // Give the trailing bytes time to reach the finished decoder before
          // asserting, so a delayed crash is still observed.
          setTimeout(() => {
            server.close();
            try {
              expect(res.statusCode).to.equal(200);
              expect(JSON.parse(data).body).to.deep.equal({ a: 1 });
              done();
            } catch (err) {
              done(err);
            }
          }, 200);
        });
      });

      req.on('error', done);
      req.end(body);
    });
  });
});
