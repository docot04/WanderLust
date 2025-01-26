# WanderLust App

A replica of the Airbnb platform built using **MongoDB, Express.JS and Node.JS**. The goal is to simulate the core features of Airbnb, allowing users to browse and add listings, manage profiles using **MVC Architecture** and **RESTful APIs**.

---

## Features
- **User Authentication**:
  - Secure signup and login functionality using Passport.js
  - Password hashing for enhanced security
- **Property Listings**: 
  - Browse a wide range of properties with detailed descriptions, photos and prices
  - Add, edit or delete listings as a host
- **Search Listings**:
  - Search Listings based on their Title, Location etc
  - View Listings using their tags
- **Listing Reviews**:
  - Post reviews and ratings on property listings
  - Edit or delete personal reviews and ratings
- **User Dashboard**:
  - View and manage listings in a centralized dashboard
  - Manage hosted properties for users with hosting privileges
- **Responsive Design with Modern UI/UX**:
  - Clean, intuitive interface optimized for both desktop and phone
- **Database Integration**:
  - Persistent storage of user data, property listings, and booking details
  - Storage and retrieval of user reviews and ratings

---

## Tech Stack
- **Backend**        : Node.JS and Express.JS
- **Database**       : MongoDB (Local)
- **Authentication** : Passport.JS (Local Strategy)
- **Styling**        : Bootstrap with customizations

---

## Unimplemented Features
- Account Deletion

---

## Routes
### Listings
- **/listings**
  - GET : view all listings (index route)
  - POST : creates a new listing
- **/listings/new**
  - GET : display form to add a new listing
- **/listings/:id**
  - GET : show listing details
  - PUT : update a listing
  - DELETE : delete a listing
- **/listings/filter/tag/:tag**
  - GET : show all listings with a particular tag
- **/listings/user/:userId**
  - GET : show all listings belonging to a particular user
### Reviews
- **/listings/:id/reviews**
  - POST : create a new review
- **/:reviewId**
  - DELETE : delete a specific review
### Authentication
- **/signup**
  - GET : display signup form
  - POST : create a new user and login
- **/login**
  - GET : display a login form
  - POST : authenticate and log in existing user
- **/logout**
  - GET : log out current user

---

## Codebase Structure
- [**/models**](./models): (Database Logic) MongoDB Schema for Users, Listings and Reviews and object for Listing Filters
- [**/views**](./views): (Frontend presentation) EJS templates for frontend rendering 
- [**/controllers**](./controllers): (Backend request flow) Callback functions for all routes
- [**/routes**](./routes): Express routers for handling route definitions
- [**/schemaValidation**](./schemaValidation): JOI validation for MongoDB Schema
- [**/public**](./public): Static assets including CSS and JS files
- [**/utils**](./utils): Utility modules
- [**/init**](./init): Sample listing data generator for database initialization

---

## Acknowledgments
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Review Rating Element: [Starability by LunarLogic](https://github.com/LunarLogic/starability/tree/master)

---
