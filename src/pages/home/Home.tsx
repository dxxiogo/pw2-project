import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSearch from "../../components/search-header.tsx";
import Sidebar from "../../components/sidebar.tsx";
import ItemPreview from "../../components/item-preview.tsx";
import RestaurantPreview from "../../components/restaurant-preview.tsx";

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  restaurantId: number;
};

type Restaurant = {
  id: number;
  name: string;
  description: string;
  image?: string;
  rating: number;
  reviews: number;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar itens");
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingItems(false));

    fetch("http://localhost:3001/restaurants")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar restaurantes");
        return res.json();
      })
      .then((data: Restaurant[]) => setRestaurants(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingRestaurants(false));
  }, []);

  // filtros de busca
  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const restaurantMap = Object.fromEntries(
    restaurants.map((r) => [r.id, r.name])
  );
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-white">
        <HeaderSearch
          location="Cajazeiras, PB"
          placeholder="Busque restaurantes ou itens..."
          onSearch={(value) => setSearchQuery(value)}
        />

        {error && <p className="text-red-600 p-4">{error}</p>}

        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Itens populares</h2>
          {loadingItems ? (
            <p>Carregando itens...</p>
          ) : filteredItems.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {filteredItems.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`} className="block">
                  <ItemPreview name={item.name} image={item.image} description={restaurantMap[item.restaurantId]} />
                </Link>
              ))}
            </div>
          ) : (
            <p>Nenhum item encontrado.</p>
          )}
        </section>

 <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Restaurantes</h2>
          <div className="flex gap-4 overflow-x-auto">
            {restaurants.map((rest: any) => (
              <Link key={rest.id} to={`/restaurant/${rest.id}`} className="block">
                <RestaurantPreview
                  name={rest.name}
                  image={rest.image}
                  rating={rest.rating}
                  reviews={rest.reviews}
                  description={rest.description}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
