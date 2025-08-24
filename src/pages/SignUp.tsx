import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledButton from "../components/filled-button.tsx";
import PlaceholderInput from "../components/text-field.tsx";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name || !formData.email || !formData.cpf || !formData.password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        navigate("/home"); 
        alert("usuario criado com sucesso")
      } else {
        setError("Erro ao cadastrar usuário");
      }
    } catch (err) {
      setError("Servidor inacessível");
    }
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
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Cadastro de Cliente</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <PlaceholderInput
            name="name"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="cpf"
            placeholder="Digite seu CPF"
            value={formData.cpf}
            onChange={handleChange}
          />
          <PlaceholderInput
            name="password"
            placeholder="Digite sua senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="flex-1 h-16 text-xl"
              type="submit"
            >
              Cadastrar
            </FilledButton>
            <FilledButton
              colorClass="bg-white hover:bg-red-700 text-red-600 border border-red-600 hover:text-white"
              className="flex-1 h-16 text-xl"
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
