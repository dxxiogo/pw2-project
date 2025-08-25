import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSearch from "../../components/search-header.tsx";
import ItemPreview from "../../components/item-preview.tsx";
import RestaurantSidebar from "../../components/restaurant-sidebar.tsx";

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  restaurantId: number;
};

export default function RestaurantHome() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const restaurantId = JSON.parse(localStorage.getItem("restaurant") || "null")?.id;

  useEffect(() => {
    fetch(`http://localhost:3001/items?restaurantId=${restaurantId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar itens");
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <RestaurantSidebar />

      <div className="flex-1 bg-white ml-16">
        <HeaderSearch
          location="Painel do Restaurante"
          placeholder="Buscar item..."
          onSearch={(value) => setSearchQuery(value)}
        />

        {error && <p className="text-red-600 p-4">{error}</p>}

        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Meus Itens</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Link key={item.id} to={`/restaurant/item/${item.id}`}>
                  <ItemPreview
                    name={item.name}
                    image={item.image}
                    description={`R$ ${item.price.toFixed(2)}`}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p>Nenhum item encontrado.</p>
          )}
        </section>
      </div>
    </div>
  );
}
