import FilledButton from "../../components/filled-button.tsx";
import Sidebar from "../../components/sidebar.tsx";


export default function Item() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 bg-white flex flex-col items-center py-10">
        {/* Imagem do produto */}
        <img
          src="/assets/panqueca.png"
          alt="Panqueca Recheada"
          className="rounded-xl w-[600px] h-[220px] object-cover mb-8"
        />

        {/* Nome e descrição */}
        <div className="w-[600px]">
          <h1 className="text-2xl font-bold mb-2">Panqueca Recheada</h1>
          <p className="text-gray-400 mb-6">Recheada com doce de leite e carinho.</p>

          {/* Observação */}
          <textarea
            placeholder="Observação"
            className="w-full h-28 border border-gray-300 rounded-lg p-3 mb-8 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="flex gap-4 mb-8">
            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-56 h-12 text-xl font-semibold  cursor-pointer"
            >  -
            </FilledButton>

            <span className="border border-gray-500 w-40 text-center rounded-lg mb-8 p-3 bg-gray-300 font-bold" >1</span>
            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-56 h-12 text-xl font-semibold cursor-pointer"
            >
              +
            </FilledButton>
            <FilledButton
              colorClass="bg-red-600 hover:bg-red-700 text-white"
              className="w-56 h-12 text-lg font-semibold cursor-pointer pt-1"
            >
              Adicionar R$ 20,00
            </FilledButton>
            </div>
          </div>
        </div>
      </div>
  );
}
