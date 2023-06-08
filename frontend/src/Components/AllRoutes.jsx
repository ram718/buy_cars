import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import CarDetails from "./CarDetails";
import AddCar from "../Pages/AddCar";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/cardetails"
        element={
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
