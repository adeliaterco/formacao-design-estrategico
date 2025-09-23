export function BonusSection() {
  const bonuses = [
    {
      title: "BÔNUS #1: LISTA DE COMPRAS INTELIGENTE",
      description: "Onde comprar cada ingrediente mais barato + fornecedores que eu uso (economia de até 40%)",
    },
    {
      title: "BÔNUS #2: CALCULADORA DE ECONOMIA",
      description: "Planilha que mostra exatamente quanto você vai economizar por mês (vai se assustar com o valor)",
    },
    {
      title: "BÔNUS #3: DRINKS PARA IMPRESSIONAR",
      description:
        "10 receitas especiais para quando você quiser lacrar com visitas (seus amigos vão achar que você virou bartender profissional)",
    },
  ]

  return (
    <section className="bonus-section py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="bonus-header text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🎁 BÔNUS EXCLUSIVOS <span className="bonus-value text-yellow-600">(VALOR: R$ 47)</span>
          </h2>
        </div>

        <div className="bonus-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonuses.map((bonus, index) => (
            <div key={index} className="bonus-item bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{bonus.title}</h3>
              <p className="text-gray-600 leading-relaxed">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
