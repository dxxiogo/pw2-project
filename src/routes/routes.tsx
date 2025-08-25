import Home from "@/pages/home/Home.tsx";
import Item from "@/pages/item/client/Item.tsx";
import Login from "@/pages/Login.tsx";
import Order from "@/pages/order/Order.tsx";
import OrderAddress from "@/pages/order/OrderAddress.tsx";
import OrderProcessing from "@/pages/order/OrderProcessing.tsx";
import Restaurant from "@/pages/restaurant/Restaurant.tsx";
import RestaurantLogin from "@/pages/restaurant/RestaurantLogin.tsx";
import RestaurantRegistration from "@/pages/restaurant/RestaurantRegistration.tsx";
import RestaurantHome from "@/pages/restaurant/RestaurantHome.tsx"; // novo
import SignUp from "@/pages/SignUp.tsx";
import WelcomePage from "@/pages/WelcomePage.tsx";

import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemCreate from "@/pages/item/restaurant/ItemCreate.tsx";
import RestaurantItemView from "@/pages/item/restaurant/RestaurantItemView.tsx";

const useUserAuth = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

const useRestaurantAuth = () => {
  const restaurant = localStorage.getItem("restaurant");
  return !!restaurant;
};

function PrivateUserRoute({ children }: { children: JSX.Element }) {
  const isAuth = useUserAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

function PrivateRestaurantRoute({ children }: { children: JSX.Element }) {
  const isAuth = useRestaurantAuth();
  return isAuth ? children : <Navigate to="/restaurant-login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />
        <Route path="/restaurant-login" element={<RestaurantLogin />} />

        <Route
          path="/home"
          element={
            <PrivateUserRoute>
              <Home />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/item/:id"
          element={
            <PrivateUserRoute>
              <Item />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateUserRoute>
              <Order />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/order/address"
          element={
            <PrivateUserRoute>
              <OrderAddress />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/order/processing"
          element={
            <PrivateUserRoute>
              <OrderProcessing />
            </PrivateUserRoute>
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <PrivateUserRoute>
              <Restaurant />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/restaurant/home"
          element={
            <PrivateRestaurantRoute>
              <RestaurantHome />
            </PrivateRestaurantRoute>
          }
        />
        <Route
          path="/restaurant/item/:id"
          element={
            <PrivateRestaurantRoute>
              <RestaurantItemView />
            </PrivateRestaurantRoute>
          }
        />
        <Route
          path="/restaurant/create-item"
          element={
            <PrivateRestaurantRoute>
              <ItemCreate />
            </PrivateRestaurantRoute>
          }
        />
        <Route
          path="/restaurant/edit-item/:id"
          element={
            <PrivateRestaurantRoute>
              <ItemCreate />
            </PrivateRestaurantRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
