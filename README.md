# Express User CRUD App

This is an Express.js application that provides CRUD (Create, Read, Delete) operations for managing user data using MongoDB and Mongoose. It allows you to store user information such as first name, last name, city, email, phone number, and profile image.

## Prerequisites

Before running this project, ensure that you have the following installed:

- Node.js (version 12 or higher)
- MongoDB (running instance or connection URI)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/express-user-crud-app.git

2. Navigate to the project directory:
    ```bash
    cd express-user-crud-app

3. Install the dependencies:
    ```bash
    yarn install

4. Set up the environment variables:
    a. Create a .env file in the project root directory.
    b. Define the following variables in the .env file:
        ```bash
        PORT=4000
        MONGODB_URI=mongodb://localhost:27017/your-database-name

5. Start the application:
    ```bash
    yarn start

6. Test the application:
    ```bash
    yarn test