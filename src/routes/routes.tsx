// src/routes/AppRouter.tsx

import Home from "@/pages/home/Home.tsx";
import Item from "@/pages/item/Item.tsx";
import Login from "@/pages/Login.tsx";
import Order from "@/pages/order/Order.tsx";
import OrderAddress from "@/pages/order/OrderAddress.tsx";
import OrderProcessing from "@/pages/order/OrderProcessing.tsx";
import Restaurant from "@/pages/restaurant/Restaurant.tsx";
import RestaurantRegistration from "@/pages/restaurant/RestaurantRegistration.tsx";
import SignUp from "@/pages/SignUp.tsx";
import WelcomePage from "@/pages/WelcomePage.tsx";
import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


const useAuth = () => {
  const user = localStorage.getItem("user");
  return user;
};


function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ useAuth() ? <Home/> : <WelcomePage /> } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurant/:id"
          element={
            <PrivateRoute>
              <Restaurant />
            </PrivateRoute>
          }
        />
        <Route
          path="/item/:id"
          element={
            <PrivateRoute>
              <Item />
            </PrivateRoute>
          }
        />

        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/address"
          element={
            <PrivateRoute>
              <OrderAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/processing"
          element={
            <PrivateRoute>
              <OrderProcessing />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
