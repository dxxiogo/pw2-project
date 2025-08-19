import { Home, Trash2 } from "lucide-react";
import Sidebar from "../../components/sidebar.tsx";
import { Link } from "react-router-dom";
import FilledButton from "../../components/filled-button.tsx";

export default function OrderAddress() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Endereço</h1>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center">
            <span className="mr-1">Cancelar</span>
            <Trash2 size={16} />
          </button>
        </div>

        {/* Lista de endereços */}
        <div className="space-y-4 mb-8">
          {['Casa', 'Prédio', 'Condomínio'].map((tipo, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm flex items-start space-x-4"
            >
              <div className="text-red-500 mt-1">
                <Home size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">{tipo}</h2>
                <p className="text-sm text-gray-500">Bairro Centro</p>
                <p className="text-sm text-gray-500">Cajazeiras PB</p>
                <p className="text-sm text-gray-500">Rua das Flores, nº 117</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botão de adicionar novo endereço */}
        <div className="mb-6">
          <button
            className="w-full border border-red-500 text-red-500 text-sm font-medium py-2 rounded-md hover:bg-red-50 transition"
            onClick={() => alert('Adicionar novo endereço')}
          >
            Adicionar
          </button>
        </div>

        <Link to="/order/processing" className="block">
        <FilledButton>
          Confirmar <span className="ml-auto font-semibold">R$ 115,00</span>
        </FilledButton>
        </Link>
      </div>
    </div>
  );
}
