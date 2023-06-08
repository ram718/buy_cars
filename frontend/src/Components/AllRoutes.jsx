import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import CarDetails from "./CarDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/cardetails" element={<CarDetails />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
};

export default AllRoutes;
