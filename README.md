# Microservice Notes App

This is a project done purely for educational purposes, i wanted to try to gain experience in some new technologies such as AWS, Kubernetes, Golang and Terraform.

The application has been inspired by the Google Keep application and is a web-based note taking service where the notes will be stored in the cloud.

## Services

### Login Service

This service handles all login, signup and authentication management. It has endpoints for signing up as a new user, signing in, verifying token and refreshing token. The authentication is based on JWT tokens. This service is written in Golang.

### Notes Api Service

This service is responsible for handling all things related to the users notes, CRUD operations. All requests to this service must contain a valid JWT token, this token is then validated through the Login Service. This service is written in Java Spring Boot.

### Notes Frontend

The GUI for the application, written in React Js.

## Run instructions

### Backend

The backend services can easily be started locally through the docker-compose in the root of this project. This will spin up the Notes Api Service (port 12345), the Login Service (port 8080), a MongoDB instance and Mongo-Express for easy DB admin access.

### Frontend

The frontend uses the yarn package manager and can easily be started locally through the `yar dev` command which will serve the frontend on localhost:3000


## Deployment

This project uses terraform for deployment to an AWS EKS cluster. The process is fully automated and the service can be deployed through the `terraform apply` command. The project also has Github actions setup to update the deployment or fully deploy from scratch by a commit to master.
