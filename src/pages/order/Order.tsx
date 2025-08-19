import { Link } from "react-router-dom";
import ProductCard from "../../components/order-item.tsx";
import Sidebar from "../../components/sidebar.tsx";
import FilledButton from "../../components/filled-button.tsx";

export default function Order() {
  return (
 <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Pedido</h1>

        {/* Header do pedido */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="/la-brasa-logo.png" // substitua pela sua imagem real
              alt="Logo do Restaurante"
              className="w-16 h-16 rounded-md border object-cover"
            />
            <div>
              <p className="font-semibold">La Brasa</p>
              <p className="text-sm text-gray-500">Pedido 00883</p>
              <p className="text-xs text-gray-400 mt-1">20/03/2025 08:10</p>
            </div>
          </div>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center">
            <span className="mr-1">Cancelar</span>
            🗑️
          </button>
        </div>

        {/* Lista de produtos */}
        <div className="space-y-4 mb-8">
          {[...Array(5)].map((_, index) => (
            <ProductCard
              key={index}
              image="/sopa.jpg" // substitua pela imagem real
              title="Sopa de Salmão"
              quantity="01x"
              price="R$ 15,00"
              onRemove={() => console.log('Remover produto')}
            />
          ))}
        </div>

        {/* Resumo do pedido */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">R$ 100,00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Descontos</span>
            <span className="text-gray-900 font-medium">R$ 00,00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Entrega</span>
            <span className="text-gray-900 font-medium">R$ 15,00</span>
          </div>

          <input
            type="text"
            placeholder="Cupom"
            className="mt-4 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <Link to="/order/address" className="block mt-4">
          <FilledButton >
            Avançar <span className="ml-auto font-semibold">R$ 115,00</span>
          </FilledButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
