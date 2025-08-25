import FilledButton from "../../../components/filled-button.tsx";
import Sidebar from "../../../components/sidebar.tsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type ItemData = {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurantId: number;
};

export default function Item() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Buscar o item pelo id
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/items/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => console.error("Erro ao carregar item:", err));
  }, [id]);

  const handleAddOrder = async () => {
    if (!item) return;

    const order = {
      userId: user.id,
      restaurantId: item.restaurantId,
      items: [
        {
          id: item.id,
          name: item.name,
          quantity,
          price: item.price,
          note
        }
      ],
      status: "pending"
    };

    try {
      const res = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Erro ao criar pedido");

      alert("Pedido adicionado com sucesso!");
      setQuantity(1);
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar pedido");
    }
  };

  if (!item) return <p>Carregando item...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-white flex flex-col items-center py-10 ">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-xl w-[600px] h-[220px] object-cover mb-8"
        />

        <div className="w-[600px]">
          <h1 className="text-2xl font-bold mb-2">{item.name}</h1>

          <textarea
            placeholder="Observação"
            className="w-full h-28 border border-gray-300 rounded-lg p-3 mb-8 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <FilledButton
              colorClass="bg-gray-200 hover:bg-red-600 text-black"
              className="w-16 h-12 text-xl font-bold flex items-center justify-center cursor-pointer"
              onClick={decrease}
            >
              -
            </FilledButton>

            <span className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-lg text-lg font-bold">
              {quantity}
            </span>

            <FilledButton
              colorClass="bg-gray-200 hover:bg-red-600 text-black"
              className="w-16 h-12 text-xl font-bold flex items-center justify-center cursor-pointer"
              onClick={increase}
            >
              +
            </FilledButton>

            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white flex-1"
              className="h-15 text-lg font-semibold cursor-pointer"
              onClick={handleAddOrder}
            >
              Adicionar R$ {(item.price * quantity).toFixed(2)}
            </FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
