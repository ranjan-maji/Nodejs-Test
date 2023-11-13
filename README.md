Node.js Test API
This repository contains a Node.js API for testing purposes. Below are instructions on how to run the project and use the provided Postman collection for testing.

How to Run

1. Clone the Repository: git clone https://github.com/ranjan-maji/Nodejs-Test.git

cd Nodejs-Test

2. Install Dependencies:
   npm install
3. Run the Project:

npm start

The API will be running at http://localhost:3000.

Postman Collection
I have created a Postman collection to help you test the API. Click the button below to import the collection:
https://api.postman.com/collections/27303272-30ba5b4f-f752-44b3-a644-b0e5e33f24c7?access_key=PMAT-01HF4EC5NKVPBDKBEH6MA1969B

Project Structure
    src
        db
          index.js: SQLite database configuration.
        models
          Vehicle.js: Model for the Vehicle entity.
        routes
          vehicles.js: API routes for handling vehicles.
        validations
          vehicleValidation.js: Validation schema for vehicle data.
    index.js: Main entry point for the application.
.gitignore: Specifies intentionally untracked files to ignore.
package.json: Manifest file for Node.js projects.
seed.js: Script to seed initial data into the database.
Dockerfile: Configuration file for building a Docker image.
.dockerignore: Specifies files to exclude when building a Docker image
