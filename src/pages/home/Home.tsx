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

type Review = {
  id: number;
  restaurantId: number;
  rating: number;
  comment: string;
};

// Função utilitária para buscar do cache
async function fetchFromCache(url: string) {
  if ("caches" in window) {
    const cache = await caches.open("api-cache");
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return cachedResponse.json();
    }
  }
  throw new Error("Sem conexão e sem cache disponível");
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Itens
    fetch("http://localhost:3001/items")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar itens");
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch(async (err) => {
        try {
          const cached = await fetchFromCache("http://localhost:3001/items");
          setItems(cached);
        } catch (cacheErr) {
          setError(err.message);
        }
      })
      .finally(() => setLoadingItems(false));

    // Restaurantes
    fetch("http://localhost:3001/restaurants")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar restaurantes");
        return res.json();
      })
      .then(async (restaurantsData: Restaurant[]) => {
        const updatedRestaurants = await Promise.all(
          restaurantsData.map(async (rest) => {
            try {
              const res = await fetch(
                `http://localhost:3001/reviews?restaurantId=${rest.id}`
              );
              const reviews: Review[] = await res.json();
              let rating = rest.rating;
              if (reviews.length > 0) {
                rating =
                  reviews.reduce((acc, r) => acc + r.rating, 0) /
                  reviews.length;
              }
              return { ...rest, rating, reviews: reviews.length };
            } catch {
              // Se offline, não atualiza rating/reviews
              return rest;
            }
          })
        );
        setRestaurants(updatedRestaurants);
      })
      .catch(async (err) => {
        try {
          const cached = await fetchFromCache("http://localhost:3001/restaurants");
          setRestaurants(cached);
        } catch (cacheErr) {
          setError(err.message);
        }
      })
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

      <div className="flex-1 bg-white ml-16">
        <HeaderSearch
          location="Cajazeiras, PB"
          placeholder="Busque restaurantes ou itens..."
          onSearch={(value) => setSearchQuery(value)}
        />

        {error && <p className="text-red-600 p-4">{error}</p>}

        {/* Itens */}
        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Itens populares</h2>
          {loadingItems ? (
            <p>Carregando itens...</p>
          ) : filteredItems.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {filteredItems.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`} className="block">
                  <ItemPreview
                    name={item.name}
                    image={item.image}
                    description={restaurantMap[item.restaurantId]}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p>Nenhum item encontrado.</p>
          )}
        </section>

        {/* Restaurantes */}
        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Restaurantes</h2>
          {loadingRestaurants ? (
            <p>Carregando restaurantes...</p>
          ) : filteredRestaurants.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {filteredRestaurants.map((rest: Restaurant) => (
                <Link
                  key={rest.id}
                  to={`/restaurant/${rest.id}`}
                  className="block"
                >
                  <RestaurantPreview
                    name={rest.name}
                    image={rest.image}
                    rating={Number(rest.rating?.toFixed(1))}
                    reviews={rest.reviews}
                    description={rest.description}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p>Nenhum restaurante encontrado.</p>
          )}
        </section>
      </div>
    </div>
  );
}
