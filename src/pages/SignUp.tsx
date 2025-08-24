import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/authSlice.ts";
import { RootState, AppDispatch } from "@/store/store.ts";
import { useNavigate } from "react-router-dom";
import FilledButton from "../components/filled-button.tsx";
import PlaceholderInput from "../components/text-field.tsx";

export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Imagem */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="/assets/hamburguer.png"
          alt="Hamburguer"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <img src="/assets/logo.png" alt="Logo" width={200} height={80} className="mb-6" />
        <h1 className="text-3xl font-bold mb-8">Cadastro de Cliente</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <PlaceholderInput name="name" placeholder="Digite seu nome" value={formData.name} onChange={handleChange} />
          <PlaceholderInput name="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} />
          <PlaceholderInput name="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange} />
          <PlaceholderInput name="password" placeholder="Digite sua senha" type="password" value={formData.password} onChange={handleChange} />

          <FilledButton type="submit" colorClass="bg-red-600 text-white w-full h-16 text-xl" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </FilledButton>
        </form>
      </div>
    </div>
  );
}
