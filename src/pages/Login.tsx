import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice.ts";
import { RootState, AppDispatch } from "@/store/store.ts";
import { useNavigate } from "react-router-dom";
import FilledButton from "../components/filled-button.tsx";
import PlaceholderInput from "../components/text-field.tsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error} = useSelector((state: RootState) => state.auth);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    if (!error) navigate("/home");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 items-center">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-8">
        <img src="/assets/logo.png" alt="Welcome" width={200} height={80} className="mb-8 mt-2 self-center" />
        <h1 className="text-3xl font-bold mb-4 mt-4">Login</h1>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <PlaceholderInput placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PlaceholderInput placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <FilledButton
            type="submit"
            colorClass="bg-red-600 hover:bg-red-700 text-white"
            className="w-full h-16 text-xl"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </FilledButton>
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
