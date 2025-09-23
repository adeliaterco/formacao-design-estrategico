export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Cara, fiz o gin tônica seguindo a receita... minha esposa falou que estava melhor que o do bar que a gente vai. Já economizei R$ 240 só no primeiro mês!",
      author: "Carlos, 34 anos, São Paulo",
    },
    {
      quote:
        "Impressionei meus amigos na festa de aniversário. Todo mundo perguntando onde aprendi a fazer drinks assim. E gastei R$ 45 para fazer drinks para 15 pessoas!",
      author: "Mariana, 28 anos, Rio de Janeiro",
    },
  ]

  return (
    <section className="testimonials-section py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          👥 QUEM JÁ ESTÁ ECONOMIZANDO:
        </h2>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial bg-white p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 text-6xl text-gray-300">"</div>
              <blockquote className="text-lg italic leading-relaxed mb-6 text-gray-700 relative z-10">
                {testimonial.quote}
              </blockquote>
              <cite className="font-bold text-gray-900 not-italic">- {testimonial.author}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
