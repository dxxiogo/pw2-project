


import { Star, User } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/sidebar.tsx";
import RestaurantPreview from "../../components/restaurant-preview.tsx";
import { Link } from "react-router-dom";
import ItemPreview from "../../components/item-preview.tsx";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className="w-5 h-5"
        />
      ))}
    </div>
  );
};

const reviews = [
  {
    rating: 4,
    text: "Gostei muito da comida, só deixaram a desejar no atendimento.",
  },
  {
    rating: 5,
    text: "Uma das melhores pizzas que já comi. A entrega também foi tudo dentro do prazo.",
  },
  {
    rating: 2,
    text: "Odiei, a comida veio fria e com 2 moscas mortas. Além de ter demorado 2 horas para chegar. Não comprem aqui",
  },
];

export default function Restaurant() {
    const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  return (
 <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-white w-full">

        <section className="mt-8 px-8 w-full">
            <RestaurantPreview />
        </section>

        <section className="mt-8 px-8">
          <div className="flex gap-4 overflow-x-auto">
            <Link to="/item/1">
            <ItemPreview />
            </Link>
            <ItemPreview />
            <ItemPreview />
            <ItemPreview />
          </div>
        </section>

         <div className="flex flex-col md:flex-row gap-8 px-4 py-8">
      {/* Lado esquerdo: avaliações */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold">Avaliações</h2>
        {reviews.map((review, index) => (
          <div key={index} className="flex gap-4">
            <User className="w-5 h-5 mt-1" />
            <div>
              <StarRating rating={review.rating} />
              <p className="text-sm mt-1">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

 <div className="flex-1 space-y-4">
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              fill={i < newRating ? "currentColor" : "none"}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setNewRating(i + 1)}
            />
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
          placeholder="Feedback"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button className="w-full bg-red-600 text-white rounded py-2 font-medium hover:bg-red-700 transition">
          Adicionar
        </button>
      </div>
    </div>

      </div>
    </div>
  );
}
