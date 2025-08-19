import { Link } from "react-router-dom";
import FilledButton from "../components/filled-button.tsx";


export default function WelcomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-8 mb-30" >
        <img
          src="/assets/logo.png"
          alt="Welcome"
          width={200}
          height={80}
          className="mb-8 mt-2 self-center mr-60"
        />
        <h1 className="text-3xl font-bold mb-8 mt-4 w-full text-left max-w-xl">
          Seja Bem-vindo!
        </h1>
        <div className="flex flex-col gap-4 w-full max-w-xl">
          <Link to="/signup">
            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-full h-12 text-lg cursor-pointer"
            >
              Cadastrar Cliente
            </FilledButton>
          </Link>
          <Link to="/restaurant-registration">
            <FilledButton
              colorClass="bg-yellow-500 hover:bg-yellow-600 text-white"
              className="w-full h-12 text-lg cursor-pointer"
            >
              Cadastro de Restaurante
            </FilledButton>
          </Link>
          <h1 className="text-3xl font-bold mb-8 mt-4 w-full text-left">
            Já possui uma conta?
          </h1>
          <Link to="/login">
            <FilledButton
              colorClass="bg-transparent text-red-600 hover:bg-red-600 hover:text-white border border-red-600 hover:border-transparent"
              className="w-full h-12 text-lg cursor-pointer"
            >
              Entrar
            </FilledButton>
          </Link>
        </div>
      </div>
      {/* Coluna da direita: imagem hamburguer */}
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