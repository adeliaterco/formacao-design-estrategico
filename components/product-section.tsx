export function ProductSection() {
  const drinks = [
    { name: "Mojito Profissional", price: "R$ 28" },
    { name: "Caipirinha Premium", price: "R$ 22" },
    { name: "Gin Tônica Especial", price: "R$ 35" },
    { name: "Whisky Sour Autêntico", price: "R$ 42" },
    { name: "+ 46 receitas dos drinks mais pedidos", price: "" },
  ]

  const features = [
    "Ingredientes exatos (sem erro)",
    "Passo a passo simples",
    "Dicas profissionais dos bartenders",
    "Custo real de cada drink",
  ]

  return (
    <section className="product-section py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="product-header text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">📖 MANUAL DO DRINK CASEIRO</h2>
          <h3 className="text-2xl md:text-3xl text-gray-600 italic">50 Receitas dos Drinks Mais Caros dos Bares</h3>
        </div>

        <div className="drinks-list max-w-4xl mx-auto mb-12">
          {drinks.map((drink, index) => (
            <div
              key={index}
              className="drink-item flex items-center p-4 mb-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="checkmark text-2xl mr-4">✅</span>
              <span className="drink-name font-semibold text-lg flex-grow text-gray-900">{drink.name}</span>
              {drink.price && <span className="bar-price text-gray-500 italic">(que custa {drink.price} no bar)</span>}
            </div>
          ))}
        </div>

        <div className="features-section max-w-3xl mx-auto">
          <h4 className="text-2xl font-bold text-center mb-6 text-gray-900">Cada receita com:</h4>

          <div className="features-table bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="text-lg text-gray-700">- {feature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
