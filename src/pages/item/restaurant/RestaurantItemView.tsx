import FilledButton from "@/components/filled-button.tsx";
import Sidebar from "@/components/sidebar.tsx";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById, deleteItem } from "@/store/itemSlice.ts";
import type { RootState, AppDispatch } from "@/store/store.ts"; 

export default function RestaurantItemView() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentItem, loading } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(Number(id)));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (!currentItem) return;

    const confirmDelete = window.confirm("Tem certeza que deseja excluir este item?");
    if (!confirmDelete) return;

    const result = await dispatch(deleteItem(currentItem.id));

    if (deleteItem.fulfilled.match(result)) {
      alert("Item deletado com sucesso!");
      navigate(`/restaurant/home`);
    } else {
      alert("Erro ao deletar item");
    }
  };

  const handleUpdate = () => {
    if (!currentItem) return;
    navigate(`/restaurant/edit-item//${currentItem.id}`);
  };

  if (loading) return <p>Carregando item...</p>;
  if (!currentItem) return <p>Item não encontrado</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-white flex flex-col items-center py-10">
        <img
          src={currentItem.image}
          alt={currentItem.name}
          className="rounded-xl w-[600px] h-[220px] object-cover mb-8"
        />

        <div className="w-[600px]">
          <h1 className="text-2xl font-bold mb-4">{currentItem.name}</h1>
          <p className="text-lg text-gray-700 mb-2">
            Preço: R$ {currentItem.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            ID do restaurante: {currentItem.restaurantId}
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
