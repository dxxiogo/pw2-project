import { Link } from "react-router-dom";
import HeaderSearch from "../../components/search-header.tsx";
import Sidebar from "../../components/sidebar.tsx";
import ItemPreview from "../../components/item-preview.tsx";
import RestaurantPreview from "../../components/restaurant-preview.tsx";


export default function Home() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-white">
        <HeaderSearch />

        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Melhores avaliados</h2>
          <div className="flex gap-4 overflow-x-auto  ">
            {[1, 2, 3, 4].map((id) => (
              <Link key={id} to={`/restaurant/${id}`} className="block">
                <ItemPreview />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 px-8">
          <h2 className="text-xl font-bold mb-4">Melhores avaliados</h2>
          <div className="flex gap-4 overflow-x-auto">
            {[1, 2, 3, 4].map((id) => (
              <Link key={id} to={`/restaurant/${id}`} className="block">
                <RestaurantPreview />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}