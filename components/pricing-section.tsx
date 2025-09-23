export function PricingSection() {
  return (
    <section className="pricing-section py-20 bg-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="pricing-header mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">💰 INVESTIMENTO HOJE</h2>
        </div>

        <div className="price-container bg-white p-12 rounded-2xl shadow-xl max-w-lg mx-auto mb-8">
          <div className="old-price text-xl text-gray-500 mb-4">
            <span className="strikethrough line-through text-red-500">De R$ 47</span> por apenas
          </div>

          <div className="current-price text-6xl md:text-7xl font-black text-green-600 mb-6">R$ 9,90</div>

          <div className="payment-details">
            <p className="payment-terms text-lg mb-2 text-gray-700">Pagamento único - Acesso imediato</p>
            <p className="payment-methods text-gray-500">💳 Pague no PIX, Cartão ou Boleto</p>
          </div>
        </div>

        <div className="cta-container">
          <button className="cta-button-primary bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-10 rounded-xl text-xl transform hover:scale-105 transition-all duration-200 shadow-lg">
            QUERO ECONOMIZAR R$ 3.000 POR ANO AGORA!
          </button>
        </div>
      </div>
    </section>
  )
}
