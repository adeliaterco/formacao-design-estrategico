"use client"

import { useState, useEffect } from "react"

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="hero-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/colorful-cocktails.png')] bg-cover bg-center opacity-20"></div>
      <div className="container relative z-10 text-center py-20">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">PARE DE PAGAR R$ 35 POR DRINK</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4">Faça os Mesmos em Casa por R$ 3</h2>
        <h3 className="text-lg md:text-xl text-gray-300 italic mb-8 max-w-4xl mx-auto">
          Os 50 drinks mais pedidos dos bares caros + segredos que os bartenders não querem que você saiba
        </h3>

        <div className="urgency-banner bg-red-600 text-white py-4 px-6 rounded-lg mb-8 inline-block">
          🔥 LIBERADO POR TEMPO LIMITADO - PROMOÇÃO DE LANÇAMENTO
        </div>

        <div className="countdown-timer bg-black/50 backdrop-blur-sm rounded-xl p-6 inline-block">
          <div className="text-sm mb-2 text-gray-300">OFERTA EXPIRA EM:</div>
          <div className="flex gap-4 text-3xl md:text-4xl font-bold">
            <div className="text-center">
              <div className="bg-red-600 rounded-lg px-3 py-2 min-w-[60px]">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-xs mt-1">HORAS</div>
            </div>
            <div className="text-center">
              <div className="bg-red-600 rounded-lg px-3 py-2 min-w-[60px]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-xs mt-1">MIN</div>
            </div>
            <div className="text-center">
              <div className="bg-red-600 rounded-lg px-3 py-2 min-w-[60px]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-xs mt-1">SEG</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
