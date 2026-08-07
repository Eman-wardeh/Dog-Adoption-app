require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
let server;


if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    })
}
async function shutdown(signal){
  console.log(`${signal} received. Shutting down gracefully`);

  if(server){
    server.close(async() => {
      console.log("HTTP server closed");

      try{
        await mongoose.connection.close();
      console.log("MongoDB closed");
      } catch(err){
        console.log("Error closing MongoDB:", err)
      }

      process.exit(0);
    });
  } else{
    process.exit(0); 
  }

}

//Kubernetes sends SIGTERM
process.on('SIGTERM', ()=> shutdown('SIGTERM'));

//Ctrl + C locally sends SIGINT
process.on('SIGINT', ()=> shutdown('SIGINT'));