# WanderLust App (WIP)

A replica of the Airbnb platform built using **MongoDB, Express.JS and Node.JS**. The goal is to simulate the core features of Airbnb, allowing users to browse listings, book stays, and manage profiles.

---

## Features
- **User Authentication**: Secure sign up, log in, and profile management.
- **Property Listings**: Browse, search, and filter listings.
- **Booking System**: Book properties with date selection.
- **User Dashboard**: View bookings and manage properties.
- **Admin Dashboard**: Approve/reject listings and manage users.

---

## Tech Stack
- **Backend**        : Node.js and Express.js
- **Database**       : MongoDB (Local)
- **Authentication** : (WIP)
- **Styling**        : Bootstrap with customizations

---

## Routes
- **/listings**         : GET         -> all listings
- **/listings/:id**     : GET         -> show specific listing
- **/listings/new**     : GET & POST  -> add new listing
- **/listings/:id/edit**: GET & PUT   -> edit existing listing
- **/listings/:id**     : DELETE      -> delete existing listing

---

## Code Structure
- [**/init**](./init): randomly generated sample data to initialize the database
- [**/models**](./models): definitions for all the schemas used
- [**/views**](./views): static files (all EJS files used)
-- [**/views/includes**](./views/includes): header and footer files
-- [**/views/layouts**](./views/layouts): EJS-mate files
-- [**/views/listings**](./views/listings): static files for all listings
- [**/public**](./public): CSS, additional JS etc.

---

## Future Features
- User Database and Authentication
- Payment gateway integration
- Enhanced Search and Filter

--

## Installation
1. Clone the repository (`git clone https://github.com/docot04/WanderLust`)
2. Install Node.JS & npm and run `npm install` to install dependencies
3. Run `nodemon app.js` from root directory

---

## Acknowledgments
- icons from [Font Awesome](https://fontawesome.com/)
- listing images from [Unsplash](https://unsplash.com/)
- fonts from [Google Fonts](https://fonts.google.com/)
