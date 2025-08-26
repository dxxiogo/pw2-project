import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.tsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [confirmingOrder, setConfirmingOrder] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const msgOrder = {
    pending: "pedido pendente",
    confirmed: "aguardando confirmação do restaurante",
    canceled: "pedido cancelado",
    delivered: "pedido entregue com sucesso",
  };

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:3001/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Erro ao buscar pedidos:", err));
  }, [user]);

  // excluir pedido
  const handleDeleteOrder = async (orderId: string) => {
    await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "DELETE",
    });
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // confirmar pedido
const handleConfirmOrder = async (orderId: number, paymentMethod: string, address: string) => {
  await fetch(`http://localhost:3001/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "confirmed", paymentMethod, address }),
  });

  setOrders((prev) =>
    prev.map((o) =>
      o.id === orderId ? { ...o, status: "confirmed", paymentMethod, address } : o
    )
  );

  setConfirmingOrder(null);
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-15">
        <h1 className="text-2xl font-semibold mb-6">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">Você não possui pedidos.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Pedido #{order.id}</p>
                  <p className="text-m text-red-600">
                    {msgOrder[order.status as keyof typeof msgOrder]}
                  </p>
                </div>

                <div className="mb-2">
                  {order.items.map((item: any, index: number) => (
                    <p key={index} className="text-sm">
                      {item.quantity || 1}x {item.name} — R${item.price}
                    </p>
                  ))}
                </div>

                {order.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setConfirmingOrder(order)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      {confirmingOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fundo desfocado */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>
      
          <div className="relative bg-white rounded-lg p-6 w-96 z-10">
            <h2 className="text-lg font-semibold mb-4">
              Confirmar Pedido #{confirmingOrder.id}
            </h2>
      
            <label className="block mb-2 text-sm font-medium">Forma de pagamento</label>
            <select
              id="payment-method"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            >
              <option>Cartão de crédito</option>
              <option>Dinheiro</option>
              <option>PIX</option>
            </select>
      
            <label className="block mb-2 text-sm font-medium">Endereço</label>
            <input
              type="text"
              defaultValue={user?.address || ""}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              id="order-address"
            />
      
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setConfirmingOrder(null)}
                className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const payment = (document.getElementById(
                    "payment-method"
                  ) as HTMLSelectElement).value;
                  const address = (document.getElementById(
                    "order-address"
                  ) as HTMLInputElement).value;
                
                  handleConfirmOrder(confirmingOrder.id, payment, address);
                }}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
