import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store.ts";
import { createItem, updateItem } from "@/store/itemSlice.ts";
import FilledButton from "@/components/filled-button.tsx";
import PlaceholderInput from "@/components/text-field.tsx";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantSidebar from "@/components/restaurant-sidebar.tsx";

export default function ItemForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const restaurant = JSON.parse(localStorage.getItem("restaurant") || "{}");

  // 🔹 Buscar o item direto na API se for edição
  useEffect(() => {
    const loadItem = async () => {
      if (id) {
        // tenta pegar do Redux primeiro
        let item = items.find((i) => i.id === Number(id));

        if (!item) {
          // se não achar, busca direto na API
          const res = await fetch(`http://localhost:3001/items/${id}`);
          if (res.ok) {
            item = await res.json();
          }
        }

        if (item) {
          setName(item.name);
          setPrice(item.price);
          setImage(item.image);
        }
      }
    };

    loadItem();
  }, [id, items]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!restaurant?.id) {
      alert("Restaurante não autenticado!");
      return;
    }

    if (id) {
      // 🔹 Atualização
      const result = await dispatch(
        updateItem({
          id: Number(id),
          name,
          price: Number(price),
          image,
          restaurantId: Number(restaurant.id),
        })
      );

      if (updateItem.fulfilled.match(result)) {
        alert("Item atualizado com sucesso!");
        navigate(`/restaurant/home`);
      }
    } else {
      // 🔹 Criação
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
  }

  return (
    <div className="flex min-h-screen">
      <RestaurantSidebar />

      <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">
          <h1 className="text-2xl font-bold mb-6">
            {id ? "Editar Item" : "Criar Novo Item"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PlaceholderInput
              placeholder="Nome do item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <PlaceholderInput
              placeholder="Preço"
              value={price.toString()}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />

            <PlaceholderInput
              placeholder="URL da imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            {error && <p className="text-red-600">{error}</p>}

            <FilledButton
              type="submit"
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-full h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Salvando..." : id ? "Atualizar Item" : "Criar Item"}
            </FilledButton>
          </form>
        </div>
      </div>
    </div>
  );
}
