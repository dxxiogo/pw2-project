import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar.tsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const msgOrder={
    "pending":"pedido pendente",
    "confirmed":"aguardando confirmação do restaurante",
    "canceled":"pedido cancelado",
    "delivered":"pedido entregue com sucesso"
  }

  // carregar todos os pedidos do usuário
  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:3001/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Erro ao buscar pedidos:", err));
  }, [user]);

  // confirmar pedido → muda status para "confirmed"
  const handleConfirmOrder = async (orderId: number) => {
    await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "confirmed" } : o))
    );
  };

  // excluir pedido
  const handleDeleteOrder = async (orderId: number) => {
    await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "DELETE",
    });

    setOrders((prev) => prev.filter((o) => o.id !== orderId));
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
                  <p className="text-m text-red-600">{msgOrder[order.status as keyof typeof msgOrder]}</p>
                </div>

                <div className="mb-2">
                  {order.items.map((item: any) => (
                    <p key={item.id} className="text-sm">
                      {item.quantity}x {item.name} — R${item.price}
                    </p>
                  ))}
                </div>

                {order.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleConfirmOrder(order.id)}
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
      </div>
    </div>
  );
}
