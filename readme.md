This web application is an online platform where buyers can buy used cars from the dealers.

# Backend

## Authentication

- Any user can signup using email and password once.
  Api endpoint for signup -

- The user can login using the same email and password that is used at the time of registration
  Api endpoint for login -

- The passwords are encrypted and only the user can know the original password.

## Original Manufacturing Equipment (OEM Specs)

- The OEM specs are the specs provided by the manufacturer at the time of release of the vehicle.
- The vehicles related to those OEM specs present in the backend server can be listed in the BUYC corp i.e the web application and buyers can choose from these limited stock

- Api endpoints to post and get routes are:

1. Post route -
2. Get route -

- The Get api has queries like name, year and color to get the required data from the server.

- The Schema for OEM Specs is {name: String,
  year: Number,
  price: Number,
  colors: Array,
  mileage: Number,
  power: Number,
  max_speed: Number}

## Market Place

- This a main page where the details of the cars that are for sale are been shown.Buyers can select from various options and can buy by contacting the dealer.

- The Schema for market place is {name: String,
  year: Number,
  kms_on_odometer: Number,
  major_scratches: Number,
  original_paint: String,
  number_of_accidents: Number,
  number_of_previous_buyers: Number,
  registration_place: String}

- There are post, get, patch, delete api end points for market place.Except get route all the other routes are private and can be accessed by the one who listed that car product in the website.

- The api end points are:

1. Post route -
2. Get route -
3. Patch route -
4. Delete route -

## Car Details

- The cars displayed in the dashboard of the website are only the cars that match the manufacturers who provided the OEM specs. This <b>Car Details</b> page is a little bit more about the car like image and description apart from technical information

- The Schema for car details is {image: String,
  title: String,
  description: Array}

- There are only Post and Get routes for the car details

1. Post route -
2. Get route -

# Frontend

- There are majorly 4 pages that combines the entire website

### Signup Page

<img width="1440" alt="Screenshot 2023-06-09 at 11 58 10 AM" src="https://github.com/ram718/buy_cars/assets/110825928/5468b1bb-16dd-4ee2-93ea-078587858c2b">

### Login Page
<img width="1440" alt="Screenshot 2023-06-09 at 11 57 43 AM" src="https://github.com/ram718/buy_cars/assets/110825928/943690ad-3ae9-459e-bf12-8f7519176f94">

### Add Cars Page
<img width="1440" alt="Screenshot 2023-06-09 at 11 58 57 AM" src="https://github.com/ram718/buy_cars/assets/110825928/2a6f9ef4-bef2-4424-8e40-315331c1f639">


### Dashboard Page
<img width="1440" alt="Screenshot 2023-06-09 at 11 58 40 AM" src="https://github.com/ram718/buy_cars/assets/110825928/e7d073e3-978a-4119-903e-eba240c64adf">

<img width="1440" alt="Screenshot 2023-06-09 at 11 58 48 AM" src="https://github.com/ram718/buy_cars/assets/110825928/b83031a1-3567-47fc-bc9d-882e01a52423">

- The backend API's are used to build the frontend part of this full stack application.
