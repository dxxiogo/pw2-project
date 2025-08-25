import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, User } from "lucide-react";
import Sidebar from "../../components/sidebar.tsx";
import ItemPreview from "../../components/item-preview.tsx";

type Item = {
  id: number;
  name: string;
  image: string;
  price: number;
  restaurantId: number;
};

type Review = {
  id: number;
  rating: number;
  text: string;
  restaurantId: number;
};

type RestaurantData = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  items: number[];
};

// 🔥 StarRating ajustado para mostrar meia estrela
const StarRating = ({ rating }: { rating: number }) => {
  if (!rating) rating = 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-1 text-yellow-400 items-center">
      {/* estrelas cheias */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
      ))}

      {/* meia estrela */}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          <Star className="w-5 h-5 text-gray-300 fill-current absolute top-0 left-0" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
        </div>
      )}

      {/* estrelas vazias */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" />
      ))}

      {/* número ao lado */}
      <span className="ml-2 text-sm font-medium text-gray-900">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function Restaurant() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    if (!id) return;

    // Buscar restaurante
    fetch(`http://localhost:3001/restaurants/${id}`)
      .then(res => res.json())
      .then(data => setRestaurant(data));

    fetch(`http://localhost:3001/items?restaurantId=${id}`)
      .then(res => res.json())
      .then(data => setItems(data));

    fetch(`http://localhost:3001/reviews?restaurantId=${id}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        if (data.length > 0) {
          const media = data.reduce((acc: number, r: Review) => acc + r.rating, 0) / data.length;
          setRestaurant(prev => prev ? { ...prev, rating: media, reviews: data.length } : prev);
        }
      });
  }, [id]);

  const handleAddReview = async () => {
    if (!newRating || !newText.trim()) {
      alert("Preencha a nota e o feedback");
      return;
    }

    const newReview = {
      restaurantId: restaurant!.id,
      rating: newRating,
      text: newText
    };

    try {
      const res = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
      });

      if (!res.ok) throw new Error("Erro ao adicionar avaliação");

      const savedReview = await res.json();

      const updatedReviews = [savedReview, ...reviews];
      setReviews(updatedReviews);
      setNewRating(0);
      setNewText("");

      // Atualizar média no restaurante
      const media = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
      setRestaurant(prev => prev ? { ...prev, rating: media, reviews: updatedReviews.length } : prev);

    } catch (err) {
      console.error(err);
      alert("Erro ao enviar avaliação");
    }
  };

  if (!restaurant) return <p>Carregando restaurante...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-white w-full p-8 space-y-8 ml-10 -mt-5">

        <section className="flex gap-8 items-center">
          <div className="w-1/3 h-96 flex-shrink-0">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-600">{restaurant.description}</p>

            {/* usa o StarRating aqui */}
            <div className="flex items-center space-x-2">
              <StarRating rating={restaurant.rating} />
              <p className="text-sm text-gray-500">{restaurant.reviews} avaliações</p>
            </div>
          </div>
        </section>

        {/* Itens */}
        <section>
          <h2 className="text-xl font-bold mb-4">Itens</h2>
          <div className="flex gap-4 overflow-x-auto">
            {items.map(item => (
              <Link key={item.id} to={`/item/${item.id}`} className="block">
                <ItemPreview
                  name={item.name}
                  image={item.image}
                  description=""
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Avaliações */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold">Avaliações</h2>
            {reviews.map(review => (
              <div key={review.id} className="flex gap-4">
                <User className="w-5 h-5 mt-1" />
                <div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm mt-1">{review.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nova avaliação */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-bold">Deixe sua avaliação</h2>
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${i < newRating ? "fill-current" : "text-gray-300"}`}
                  onClick={() => setNewRating(i + 1)}
                />
              ))}
            </div>
            <textarea
              className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
              placeholder="Escreva seu feedback..."
              value={newText}
              onChange={e => setNewText(e.target.value)}
            />
            <button
              onClick={handleAddReview}
              className="w-full bg-red-600 text-white rounded py-2 font-medium hover:bg-red-700 transition cursor-pointer"
            >
              Adicionar
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
