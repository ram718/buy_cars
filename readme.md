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
