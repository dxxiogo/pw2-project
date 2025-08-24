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

// hook para verificar autenticação
const useAuth = () => {
  const user = localStorage.getItem("user");
  return !!user; // true ou false
};

// componente de rota privada
function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial sempre WelcomePage */}
        <Route path="/" element={<WelcomePage />} />

        {/* Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />

        {/* Rotas privadas */}
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

        {/* Rota coringa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
