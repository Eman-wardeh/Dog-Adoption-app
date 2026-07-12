The folder structure designed by our software architects ensures adherence to best practices:

- `controllers`: Contains the logic for handling incoming requests and returning responses to the client.
- `models`: Defines the data models and interacts directly with the database.
- `routes`: Manages the routes of your API, directing requests to the appropriate controller.
- `middlewares`: Houses custom middleware functions, including authentication and rate limiting.
- `.env`: Stores environment variables, such as database connection strings and the JWT secret.
- `app.js`: The main entry point of your application, where you configure the Express app and connect all the pieces.
- `db.js`: Manages the database connection.
- `package.json`: Keeps track of npm packages and scripts necessary for your project.

This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

## Completion
● TheAPIplatform contains New User Registration functionality
● TheAPIplatform contains User Authentication functionality for existing users
● TheAPIplatform contains New Dog Registration functionality
● TheAPIplatform contains Dog Adoption functionality
● TheAPIplatform contains Dog Removal functionality
● TheAPIplatform contains Dog Listing functionality for Registered Dogs
● TheAPIplatform contains Dog Listing functionality for Adopted Dogs
● Theisatest folder with test cases for testing API endpoints

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT, bcrypt
- **Templating Engine:** EJS
- **Validation:** validator
- **Environment Variables:** dotenv
- **Middleware:** CORS, cookie-parser
- **Testing:** Mocha, Chai, Chai HTTP
- **Development:** Nodemon, Cross-Env

## ✨ Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- CRUD operations for dog listings
- MongoDB database integration
- Input validation
- Protected API routes
- Error handling
- Unit and integration testing



View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Dog%20Adoption%20Platform%20Rubric.pdf)
