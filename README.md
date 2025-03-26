## How To Run Project Locally
### Project requirements
- Nodejs v20.14.0
- NPM v10.7.0
### Steps
1. Clone the project from the repository.
2. On your terminal navigate to project root.
3. Run command  ```npm i``` to install project dependencies.
4. Run command  ```npm run dev``` to start the development server.
5. On your browser navigate to ```http://localhost:5173``` and you should see the app running.

## Usage Instructions
1. Initially a login screen is presented, navigate to sign up page and create an account. You will be redirected to login page.
2. Login to your registered account at the login page, you will be redirected to home page
3. You can now use the navigation bar to navigate to upload a file  or view uploaded file details.
4. In the details screen you will have a list of previously uploaded files which you can then click view on one file to view button on each row to view the contents of the file.
5. Enjoy

#### - Note: Please note that file data is saved in local storage. Do not upload many files for this test application because browser local storage has a limit of size of data it can store. This might lead to unwanted behavior.

#### - Note: ```axios-mock-adapter``` is used, access token is not secure and it is just for demo purposes

## Some of the best practices implemented in the project
### 1. Feature based folder structure
Each feature folder contains all related files. This improves scalability, enhances modularity reduces cogntive load.

### 2. Separation of Layers (UI, Controller, Model/Data)

UI renders JSX e.g form, Controller handles bussiness logic e.g uploading a file, model defines interaction with api i.e api calls with axios. This improves usability, testability and maintenability. It decouples the code.

### 3. DRY (Don’t Repeat Yourself)

Duplication of code is avoided as much as possible. This reduces time taken in fixing bugs thus saving time and improving consistency.

### 4. Rubust naming conventions

Clear and descriptive names are used for files, variables, functions e.t.c
This automatically makes the code self documenting and improves readability

### 5. Used Vite Instead of Create-React-App

Vite is faster build tool with ES modules and hot module replacement

### 6. Tailwind with Shadcn/UI

Combination of utility first styling from Tailwind css and prebuilt, customizable react components from shadcn/ui ensures rapid development, consistency and easy of customization

### Other best practices included but not limited to are
- Lazy loading and code splitting
- Consistent Formatting with ESLint and Prettier






