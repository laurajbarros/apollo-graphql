## GraphQL API project for Dial.work


## Data Structure:
The User has three main characteristics:
- Basic Info
- Profile
- Job Application

Basic Info is a way to identify the User, have an unique id, and later on to have Auth.
Profile is one Array of objects that have field and value, and can be whatever the profile information there is. This was created like an Array of objects, as it can have multiple values, with different field names and properties.
Job Application is an Array of Objects, with a more complex structure: a Job Application object has the Application details regarding the Company and Position, but also an Application field, which has the same data structure as the Profile, as it will be used to add/update information to the Profile itself.

## Schema:

User {
  `_id`: ID!
  name: String
  lastName: String
  profile: [Attributes]
  jobapplication: [JobApplication]
}

type Attributes {
  field: String
  value: String
}

type JobApplication {
  id: ID
  company: String
  url: String
  source: String
  platform: String
  application: [Attributes]
}


## Queries and Mutations
The possible Queries and Mutations are as following:

1) - Retrieve all Users (The User object contains all profiles and Job Applications)
2) - Retrieve user by ID (same as above, you get all the information on User)
3) - Create a User with or without Profile fields
4) - Update User Information
5) - Delete User with ID
6) - Update User Profile with User ID (all Fields can be updated or new ones added)
7) - Delete Profile Information (all information or some fields)
8) - Create Job Application (This creates a new application for this user, and uses the Profile information created for this application to update the User Profile).

## Queries and Mutations format:
1) users: [User]
2) user (`_id`: ID!): User!
3) createUser (user: inputUser!): UserResponse!:
4) updateUser(`_id`: ID!, user: inputUser): UserResponse!
5) deleteUser(`_id`: ID!): UserResponse!
6) updateProfile (`_id`: ID!, profile: [Fields]!): UserResponse!
7) deleteProfile (`_id`: ID!): UserResponse!
   deleteFieldProfile (`_id`: ID!, field: String!): UserResponse!
8) createJobApplication(`_id`: ID!, application: Application!): UserResponse!

How to structure the inputs:
  input inputUser {
    name: String
    lastName: String
    profile: [Fields]
  }

  input Fields {
    field: String
    value: String
  }

  input Application {
    id: ID
    company: String!
    url: String
    source: String
    platform: String
    application: [Fields]
  }

## API Response

type UserResponse {
  success: Boolean!
  message: String
  users: [User]
}

## Motivation and Ideas
In a more in deeph implementation, we can have a Profile with pre determined fields (most popular ones), and also customFields (for the ones that can come up, so it can populate). I would also have a dictionary of field names, like alias. I think this would be interesting for cases where the words are representing the same aptitude.

## List of next features/enhancements:
Add tests
Change Schema to Object to have profiles as hash table
Add alias list for field names
Add CustomFields and Basic Fields

## Tech used
Built with:

- Apollo Server
- GraphQL
- Express
- MongoDB/Mongoose

## Installation

In order to have the project running you have to have MongoDB running in the background:
(check mongoDB documentation to install it globally)

### sudo mongod

In the project directory, you can run:

### `npm install`

Installs all the dependencies.

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:4000] to view the Apollo playground in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

## Credits

Project done by Laura J Barros
