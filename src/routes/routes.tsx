// src/routes/AppRouter.tsx

import Item from "@/pages/item/Item.tsx";
import Login from "@/pages/Login.tsx";
import Order from "@/pages/order/Order.tsx";
import OrderAddress from "@/pages/order/OrderAddress.tsx";
import OrderProcessing from "@/pages/order/OrderProcessing.tsx";
import Restaurant from "@/pages/restaurant/Restaurant.tsx";
import RestaurantRegistration from "@/pages/restaurant/RestaurantRegistration.tsx";
import SignUp from "@/pages/SignUp.tsx";
import WelcomePage from "@/pages/WelcomePage.tsx";
import { Home } from "lucide-react";
import { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// Simulação de autenticação (troque depois por contexto real de auth)
const useAuth = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

// Componente de rota privada
function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant-registration" element={<RestaurantRegistration />} />

        {/* Rotas Privadas */}
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

        {/* Fluxo de pedido */}
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

        {/* Rota padrão caso não encontre */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
