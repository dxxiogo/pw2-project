import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store.ts";
import { createItem } from "@/store/itemSlice.ts";
import FilledButton from "@/components/filled-button.tsx";
import PlaceholderInput from "@/components/text-field.tsx";
import { useNavigate } from "react-router-dom";
import RestaurantSidebar from "@/components/restaurant-sidebar.tsx";

export default function ItemCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.items);
  const restaurant = JSON.parse(localStorage.getItem("restaurant") || "{}");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!restaurant?.id) {
      alert("Restaurante não autenticado!");
      return;
    }

    const result = await dispatch(
      createItem({
        name,
        price: Number(price),
        image,
        restaurantId: restaurant.id,
      })
    );

    if (createItem.fulfilled.match(result)) {
      alert("Item criado com sucesso!");
      navigate(`/restaurant/home`);
    }
  }

  return (
    <div className="flex min-h-screen">
      <RestaurantSidebar />

      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">
          <h1 className="text-2xl font-bold mb-6">Criar Novo Item</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PlaceholderInput
              placeholder="Nome do item"
              value={name}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <PlaceholderInput
              placeholder="Preço"
              value={price.toString()}
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
              type="number"
            />

            <PlaceholderInput
              placeholder="URL da imagem"
              value={image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
            />

            {error && <p className="text-red-600">{error}</p>}

            <FilledButton
              type="submit"
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-full h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Criar Item"}
            </FilledButton>
          </form>
        </div>
      </div>
    </div>
  );
}
