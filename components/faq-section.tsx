"use client"

import { useState } from "react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Como vou receber?",
      answer: "Acesso imediato por email + área de membros",
    },
    {
      question: "Por quanto tempo tenho acesso?",
      answer: "Para sempre. É seu.",
    },
    {
      question: "Preciso de equipamentos caros?",
      answer: "Não. Tudo com utensílios que você já tem em casa.",
    },
    {
      question: "As receitas são complicadas?",
      answer: "Zero complicação. Se você sabe fazer um suco, consegue fazer qualquer drink daqui.",
    },
    {
      question: "Funciona mesmo?",
      answer: "Garantia de 7 dias. Se não economizar, devolvo seu dinheiro.",
    },
  ]

  return (
    <section className="faq-section py-20 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">❓ DÚVIDAS FREQUENTES</h2>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item border-b border-gray-200 mb-4">
              <button
                className="faq-question w-full text-left p-5 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-lg flex justify-between items-center transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span
                  className={`faq-icon text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="faq-answer p-5 bg-white">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
