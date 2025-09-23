"use client"

import { useState, useEffect } from "react"

export function ScarcitySection() {
  const [spotsRemaining, setSpotsRemaining] = useState(47)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining((prev) => Math.max(1, prev - Math.floor(Math.random() * 2)))
    }, 30000) // Decrease every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const progressPercentage = ((500 - spotsRemaining) / 500) * 100

  return (
    <section className="scarcity-section py-20 bg-red-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="scarcity-header mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">⚠️ ÚLTIMAS VAGAS DA PROMOÇÃO</h2>
          <p className="text-xl">Essa promoção é só para os primeiros 500 compradores. Depois volta para R$ 47.</p>
        </div>

        <div className="scarcity-counter bg-white text-gray-900 p-6 rounded-xl mb-8 inline-block">
          <p className="text-xl mb-4">
            Vagas restantes: <span className="font-bold text-red-600 text-2xl">{spotsRemaining}</span>/500
          </p>
          <div className="progress-bar bg-gray-200 h-5 rounded-full overflow-hidden w-80">
            <div
              className="progress-fill bg-red-600 h-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="final-benefits">
          <p className="text-xl font-bold mb-6">Não perca a chance de:</p>
          <ul className="benefits-list text-left max-w-md mx-auto space-y-3">
            <li className="flex items-center">
              <span className="mr-3">✅</span>
              Economizar mais de R$ 3.000 por ano
            </li>
            <li className="flex items-center">
              <span className="mr-3">✅</span>
              Impressionar qualquer visita
            </li>
            <li className="flex items-center">
              <span className="mr-3">✅</span>
              Ter os drinks dos bares caros na sua casa
            </li>
            <li className="flex items-center">
              <span className="mr-3">✅</span>
              Virar o "bartender" da turma
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
