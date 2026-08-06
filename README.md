<!-- testing Autter AI tracking -->
The folder structure designed by our software architects ensures adherence to best practices:

- `controllers`: Contains the logic for handling incoming requests and returning responses to the client.
- `models`: Defines the data models and interacts directly with the database.
- `routes`: Manages the routes of your API, directing requests to the appropriate controller.
- `middlewares`: Houses custom middleware functions, including authentication and rate limiting.
- `.env`: Stores environment variables, such as database connection strings and the JWT secret.
- `app.js`: The main entry point of your application, where you configure the Express app and connect all the pieces.
- `db.js`: Manages the database connection.
- `package.json`: Keeps track of npm packages and scripts necessary for your project.
- `docker-compose.yml`: 
-`k8s`/
   `deployment.yaml`
   `service.yaml`

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
- **Containerization:** Docker
- **Container Orchestration:** Kubernetes
- **API Testing:** Postman
- **Templating Engine:** EJS
- **Validation:** validator
- **Environment Variables:** dotenv
- **Middleware:** CORS, cookie-parser
- **Testing:** Mocha, Chai, Chai HTTP
- **Development:** Nodemon, Cross-Env
- **Version Control:** Git, GitHub

## ✨ Features

- User registration and login
- JWT authentication and authorization
- Password hashing with bcrypt
- CRUD operations for dog listings
- MongoDB database integration
- Protected API routes
- Input validation
- Error handling
- Unit and integration testing
- Docker containerization
- Kubernetes deployment
- Graceful shutdown support using SIGTERM and SIGINT

## 🐳 Docker

Build the Docker image:

```bash
docker build -t dog-adoption-api .
```

Run the container:

```bash
docker run -p 3000:3000 \
  --env-file .env \
  dog-adoption-api
```

The API will be available at:

```
http://localhost:3000
```

## ☸️ Kubernetes

Deploy the application:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Check the deployment:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

View pod logs:

```bash
kubectl logs <pod-name>
```
## Graceful Shutdown

The application supports graceful shutdown for both local development and Kubernetes deployments.

- **SIGTERM** is handled when Kubernetes terminates a Pod.
- **SIGINT** is handled when stopping the server locally (Ctrl+C).
- The server stops accepting new requests before closing the MongoDB connection, helping prevent interrupted requests and resource leaks.

## Architecture

```
Client
   │
   ▼
Express API
   │
   ▼
MongoDB

Docker Container
       │
       ▼
 Kubernetes Deployment
```



View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Dog%20Adoption%20Platform%20Rubric.pdf)
