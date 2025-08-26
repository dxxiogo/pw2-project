import FilledButton from "@/components/filled-button.tsx";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantSidebar from "@/components/restaurant-sidebar.tsx";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurantId: number;
};

export default function RestaurantItemView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:3001/items/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar item");
        const data: Item = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!item) return;

    const confirmDelete = window.confirm("Tem certeza que deseja excluir este item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/items/${item.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Item deletado com sucesso!");
        navigate("/restaurant/home");
      } else {
        alert("Erro ao deletar item");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar item");
    }
  };

  const handleUpdate = () => {
    if (!item) return;
    navigate(`/restaurant/edit-item/${item.id}`);
  };

  if (loading) return <p>Carregando item...</p>;
  if (!item) return <p>Item não encontrado</p>;

  return (
    <div className="flex min-h-screen">
      <RestaurantSidebar />

      <div className="flex-1 bg-white flex flex-col items-center py-10">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-xl w-[600px] h-[220px] object-cover mb-8"
        />

        <div className="w-[600px]">
          <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
          <p className="text-lg text-gray-700 mb-2">
            Preço: R$ {item.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            ID do restaurante: {item.restaurantId}
          </p>

          <div className="flex gap-4">
            <FilledButton
              colorClass="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              className="h-12 text-lg font-semibold cursor-pointer"
              onClick={handleUpdate}
            >
              Atualizar
            </FilledButton>

            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white flex-1"
              className="h-12 text-lg font-semibold cursor-pointer"
              onClick={handleDelete}
            >
              Deletar
            </FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
