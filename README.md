# A brief description of the application
This code contains a simple todo application with authentication enabled. The application is written in Node.js.

Users can interact with the web application via a graphical interface through any popular browser (Chrome, Firefox, etc).

All the information related to a user (Todo Tasks) will be stored in a database.

Demo: You can see a demo video of the application and its related functionalities, the steps to make it up and running at the link which will be provided separately. More information are provided in the sections below.


# Functionalities
Users can:

- Login to the application with username and password\*

- Add new tasks

- Delete existing tasks

- View their own tasks (each user will see ONLY their tasks)

\* Registration method has been commented in the application and information on how to create your own user will be provided in the "How to build, run and test the application" section below.


# Overview of the technologies adopted
- Node.js has been adopted for the application back-end framework.
  - Express.js has been used as Web Framework for Node.js.

- MongoDB as a database technology.
  - Mongoose has been used as mongodb object modeling for Node.js.
  - As a GUI for MongoDB, Robomongo - Robo 3T has been used. Please find instructions following the guide below.

- The following technologies have been adopted for the front-end:
  - HTML;
  - CSS;
  - Bootstrap (as an open-source library for HTML, CSS and JS which helps to create responsiveness web pages);
  - jQuery (as Javascript library to mainly manipulates the HTML documents);
  - EJS (mainly used with Express to easily build up dynamic web pages by passing parameters).

The technologies above follow the MEAN Stack, with the adoption of HTML and jQuery instead of Angular for the back-end.


#Architectural Pattern
From an architectural point of view, the MVC (Model - View - Control) pattern has been adopted for the development of this application.

The MVC pattern is typically used to split the application into three parts and define a consistent way to develop and deploy your application. I'll go through the project folder structure later on in the README file. Let's explain first the pattern adopted.

The Model part is the most important one as it contains the data model/definition for your project data and it is a kind of an intermediary part between your controller and user views.
It is present in the 'models' directory, where we can find the different schemas utilised. The configuration details are in 'database.js' file in the config folder.

The Controller is the application part that accepts a user input, manipulates the model, and the model will then update the view shown to the final user.

Although we are talking about a basic application with a few functionalities, we may always have the following files responsible for this:
- app.js : or sometimes may be called server.js as well - it will start the application but also contains some other logic for the application itself and for simplicity it is in there;
- routes : the folder which contains the routes definition for the app. A few of them have been encapsulated in the server and db config files for simplicity as I mentioned before;
- controllers : this folder is responsible for containing the controllers file for each of the entities / and functionalities implemented. In this case we have "user" and "task".

The View side is in the 'views' folder. The render used to generate in this case the "todolist.ejs" page is called 'ejs', explained above. "index.html", in the public folder, contains the main page, written in HTML, where a user can login before getting their tasks list and add/view/remove those.

###### Other Pattern adopted
One more pattern that has been adopted in this application is the Registry design pattern. As stated by Martin Fowler, a Registry is a well-known object that other objects can use to find common objects and services.

Navigate through the 'config' folder and 'registrycnf.js' file. That is a registry configuration file in order to add modularity and flexibility to the project. It also contains all the different paths to config, modules, routes, controllers, models that have been largely adopted in this project. And of course it makes it simpler for those that need to be added in the future.

- The functions here are exported for 2 reasons: one is for the lightness of the result's object;
- and second is to avoid circular dependency in the same module that cause parsing stop.


# Security Considerations
The Todo web application requires the end users to be authenticated first.

The home page is a Login page where users need to be correctly registered to login in and view their own tasks and start doing the main operations with them.

- Protocol: If you look at the "app.js" server file, the server is listening on port 80 for HTTP prototol and 443 for HTTPS. The code for HTTPS connectivity has been commented for now and instructions on how to generate an SSL certificate has been provided at the following path: '/certificate/SSL_certificate.txt'.

- Authentication: the Login implemented (as requested) is simply made with username and password. Username is via email format and password is not visible in the GUI while user is typing.

- Password: the password is stored in a database (MongoDB NoSQL db) and is crypted. Every time a user tries to log in to the system, a validation is there to check if the hash password is correct. This add another layer of security.

Please review the "Future developments" section to see suggested improvements as well.


# How to build, run and test the application

## Project structure
Let's have a look at the project folder structure and make comfortable with moving through the different folders.

-todo-app-exercise\
-- bin\
-- certificate\
-- config\
-- controllers\
-- custom_modules\
-- models\
-- node_modules\
-- public\
--- images\
--- javascripts\
--- stylesheets\
-- routes\
-- views\
app.js
package.json
README.md

## Installation
Please make sure to be in the root folder. Basically in within the folder with the "app.js" file which contains the logic to start up your application and accept user requests.

Assumptions:
- You have Node.js installed on your laptop to run it locally and npm in your path (in case you have Linux/Mac or env variable if you're running Windows).
- You have already installed MongoDB on your locally and you have started the mongo server. Please find a complete tutorial [here](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/).

First run the following command:
- npm install

This will download all the modules for node that have been explicitly declared in the package.json file (and you'll find the new "node_modules" as I mentioned in the structure above).

All the dependencies are up-to-date, but in case you get some warning messages as some of those will become outdated, please run the following command:
- npm audit (to check possible inconsistencies)
- or npm audit fix (directly to solve those)

Now you can easily run it locally, by typing:
- node app.js

You'll get a message similar to:
- Express HTTP server listening on port 80
- Express HTTPS server listening on port 443 (this has been commented from the app.js)

For try it out, open any popular browser and simply type:
- http://localhost:80

The server is now ready to accept requests.

# Database preparation
Before starting the server and accepting new requests, let me show you just one step to test the current environment.

The main page of the web application is a login page - the registration is actually a simple creation of a user entity which was not required for the purpose of this exercise. Anyway all the methods have been provided in the code to make you aware of that, in case you want to implement further developments.

I have used Robomongo - Robo 3T to interact via a GUI with my MongoDB. Please find the open source tool at the following [link](https://robomongo.org/download).

Once you have it installed on your local computer, please open it and proceed as follows, in order to create two different users to play with in your environment:
[Create a new connection first](public/images/Robomongo_NewConnection.png)
This will establish a new connection with all the databases instances that are running locally in your environment. The creation and connection of the "todo-app-db" database (which is specified in the 'config/database.js' file) happens at the time we start the server (app.js).

[Insert a new document in your database](public/images/Robomongo_InsertDocument.png)
We wanna create two simple users (or as many as we want) in order to test the different functionalities of our applications. Every user will be able to see their own tasks.

[Copy the JSON to a new document in the NoSQL DB](public/images/Robomongo_JSON.png)
Copy and paste the following JSON code to create your first document for your first user.
```
{
    "username" : "type_your_email_here",
    "password" : "$2a$08$BoiVnZdx//bl7hZ6wiLy6ezbtexitlO1E.yGE3zhU0kzWYw7Wn362",
    "__v" : 0
}
```
Type your email in username field. The password field is already crypted (plain password is for simplicity "password" only). The newly created object will have an "id" field generated for ourselves as well.

We are now ready to explore the other functionalities of the application and start creating, viewing and removing tasks from a user todo list.


# Other information
- Express Generator: As already explained before, this is a Node.js web application with Express framework in adoption. The **Express Application Generator** has been used to generate the first scheleton of the web application. A complete guide at this [link](https://expressjs.com/en/starter/generator.html).

- Demo App: a video for the application has been provided separately.

- Selenium script: Selenium has been used as Web Browser Automation to run a list of commands and monitor the behaviour of the web application easily and faster. You will see a short example in the video provided.

###### Deployment on Cloud
The current is a Node.js web application, that can be easily run on every Cloud Provider. For the purpose of the exercise, the application will be tested locally but all the necessary commands to re-create the same environment on Cloud will be reported and explained below. Again, this is completely out of scope and it is only an integration to make you aware of other possible deployments types you may use.

Let's choose IBM Cloud Platform as a Cloud provider. If you want to make it up and running on IBM Cloud, please follow the steps below for your information.

- Create an IBM Cloud account if you do not have it yet, at the [link](cloud.ibm.com) and Sign Up.

Remember it is a node js application with a database to connect to. So we'll need to create both components:

- First create a Cloud Foundry runtime (with SDK for Node.js) to host your new application and push the code I gave it to you. Cloud Foundry is a PaaS technology used by IBM Cloud Platform for these runtimes. You can proceed via graphical interface or by using your CLI tool.

  - You need to download IBM CLI tool first before interacting with IBM Cloud Platform commands line. You'll find the link to the instructions at the following website:
https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started

- Let's create now your node js application on Cloud Foundry on IBM Cloud. From the main dashboard of IBM Cloud click on to "Catalog" and search for "SDK for Node.js". Click create and you will be asked to specify a name ("todo-app-exercise" for example) as well as a Cloud Foundry organization, a region where to deploy your app and a space (thinking about a pipeline and devops as well).

- Now let's create a database, Mongo DB in this case, to emulate the environment on local. We wanna use the CLI tool for this particular case.
1. Create the database service instance

ibmcloud cf create-service compose-for-mongodb Standard todo-app-db

2. Create a set of credentials for this service

ibmcloud cf create-service-key todo-db for-local

3. View the credentials and take note of the `url` value

ibmcloud cf service-key todo-db for-local

This will be used to use the database even if you are running it locally. You just need to create the vcap-local.json file I mentioned before, as follows:

{
      "services": {
        "compose-for-mongodb": [
          {
            "credentials": {
              "url":"<URL-FROM-THE-SERVICE-KEY-ABOVE>"
            },
            "label": "compose-for-mongodb",
            "plan": "Lite",
            "name": "todo-db"
          }
        ]
      }
    }

Replace the url with the value retrieved from the service key.

- Go to IBM Cloud dashboard, search for the application, click on that, click on "Connection" and specify the new database service created to connect to the application. This way you have bounded your application to the newly created Compose for MongoDB database (or the newly version Databases for MongoDB available on IBM Cloud Platform or even a different one, Cloudant).

- Push your code on to the Cloud.

ibmcloud push "name of your application"

And that's it, you'll find the application url link on the main dashboard of the IBM Cloud dashboard.


# Future developments
1. In case of a Cloud deployment, a DevOps toolchain would be beneficial to automate the provisioning of the same.

2. Security: as required and normally used, an authentication with username and password has been implemented. Another choice for a larger application development would be "Passport.js", which is a middleware for Node.js and pretty much modular and flexible.

3. For those who like to play with the graphical interface, I have used Bootstrap but of course this can be re-written with any library you want to:)
