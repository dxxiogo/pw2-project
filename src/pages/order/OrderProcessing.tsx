
import { Home, Trash2, Clock } from 'lucide-react';
import Sidebar from '../../components/sidebar.tsx';
import ProductCard from '../../components/order-item.tsx';

export default function OrderProcessing() {
  return (
 <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Pedido</h1>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center">
            <span className="mr-1">Cancelar</span>
            <Trash2 size={16} />
          </button>
        </div>

        {/* Endereço */}
        <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm flex items-start space-x-4 mb-4">
          <div className="text-red-500 mt-1">
            <Home size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Casa</h2>
            <p className="text-sm text-gray-500">Bairro Centro</p>
            <p className="text-sm text-gray-500">Cajazeiras PB</p>
            <p className="text-sm text-gray-500">Rua das Flores, nº 117</p>
          </div>
        </div>

        {/* Status do pedido */}
        <div className="bg-gray-300 text-gray-800 text-sm font-medium rounded-md px-4 py-2 flex items-center mb-6">
          <Clock size={16} className="mr-2" />
          Aguardando confirmação
        </div>

        {/* Lista de itens */}
        <div className="space-y-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
