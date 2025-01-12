# WanderLust App

This project is a replica of the Airbnb platform built using the **MongoDB, Express.JS and Node.JS** along with BootStrap-CSS. The goal is to simulate the core features of Airbnb, allowing users to browse listings, book stays, and manage profiles.

---

## Features
- **User Authentication**: Sign up, log in, and manage profiles.
- **Property Listings**: Browse, search, and filter listings.
- **Booking System**: Book properties with date selection.
- **User Dashboard**: View bookings and manage properties.
- **Admin Dashboard**: Approve/reject listings and manage users.

---

## Tech Stack
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Authentication**: 
- Icons from FontAwesome

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
- [**/views/includes**](./views/includes): header and footer files
- [**/views/layouts**](./views/layouts): EJS-mate files
- [**/views/listings**](./views/listings): static files for all listings
- [**/public**](./public): CSS, additional JS etc.


---

## Installation

1. Clone the repository:
