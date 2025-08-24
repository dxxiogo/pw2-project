import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRestaurant } from "@/store/restaurantAuthSlice.ts";
import { RootState, AppDispatch } from "@/store/store.ts";
import { useNavigate } from "react-router-dom";
import FilledButton from "@/components/filled-button.tsx";
import PlaceholderInput from "@/components/text-field.tsx";

export default function RestaurantRegistration() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.restaurantAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnpj: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerRestaurant(formData));

    if (registerRestaurant.fulfilled.match(result)) {
      navigate(`/restaurant/home`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center">
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="/assets/hamburguer.png"
          alt="Hamburguer"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-8">
        <img
          src="/assets/logo.png"
          alt="Welcome"
          width={200}
          height={80}
          className="mb-8 mt-2 self-center"
        />
        <h1 className="text-3xl font-bold mb-8 mt-4 w-full text-left max-w-xl">
          Cadastro de Restaurante
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <PlaceholderInput
            name="name"
            placeholder="Digite o nome do restaurante"
            className="mb-4 w-full"
            value={formData.name}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="email"
            placeholder="Digite seu email"
            className="mb-4 w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="cnpj"
            placeholder="Digite seu CNPJ"
            className="mb-4 w-full"
            value={formData.cnpj}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="password"
            placeholder="Digite sua senha"
            type="password"
            className="mb-4 w-full"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex flex-row gap-4 w-full max-w-full mt-6">
            <FilledButton
              type="submit"
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-full h-16 text-xl cursor-pointer"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </FilledButton>

            <FilledButton
              colorClass="bg-white hover:bg-red-700 text-red-600 border border-red-600 hover:text-white"
              className="w-full h-16 text-xl cursor-pointer"
              onClick={() => navigate("/")}
              type="button"
            >
              Voltar
            </FilledButton>
          </div>
        </form>
      </div>
    </div>
  );
}
