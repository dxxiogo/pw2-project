import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledButton from "../components/filled-button.tsx";
import PlaceholderInput from "../components/text-field.tsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setErrorMsg("");

  if (!email || !password) {
    setErrorMsg("Por favor, preencha email e senha.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    if (!res.ok) throw new Error("Falha na conexão com o servidor.");

    const data = await res.json();
    

    if (data.length > 0) {
      const user =data[0];
      localStorage.setItem("user", JSON.stringify({ id: user.id}));
      navigate("/home");
    } else {
      setErrorMsg("Email ou senha inválidos!");
    }
  } catch (error: any) {
    setErrorMsg(error.message || "Erro desconhecido ao tentar logar.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-screen bg-gray-100 items-center">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-8 mb-30">
        <img
          src="/assets/logo.png"
          alt="Welcome"
          width={200}
          height={80}
          className="mb-8 mt-2 self-center mr-60"
        />
        <h1 className="text-3xl font-bold mb-4 mt-4 w-full text-left max-w-xl">
          Login
        </h1>

        <form onSubmit={handleLogin} className="w-full">
          <PlaceholderInput
            placeholder="digite seu email"
            className="mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PlaceholderInput
            placeholder="digite sua senha"
            className="mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {errorMsg && (
            <p className="text-red-600 mb-4">{errorMsg}</p>
          )}

          <div className="flex flex-row gap-4 w-full max-w-full">
            <FilledButton
              type="submit"
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-full h-16 text-xl cursor-pointer"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </FilledButton>

            <FilledButton
              colorClass="bg-white hover:bg-red-700 text-red-600 border border-red-600 hover:text-white"
              className="w-full h-16 text-xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              Voltar
            </FilledButton>
          </div>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="/assets/hamburguer.png"
          alt="Hamburguer"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
