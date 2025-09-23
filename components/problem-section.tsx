"use client"

import { useEffect, useRef, useState } from "react"

export function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate the final value
          const start = 0
          const end = 3360
          const duration = 2000
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = Math.floor(start + (end - start) * progress)
            setAnimatedValue(current)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          animate()
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="problem-section py-20 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4">
        <p className="text-xl md:text-2xl text-center mb-8 text-gray-800 font-medium">
          Cara, você já parou para calcular quanto gasta por mês em drinks?
        </p>

        <div className="calculation-box bg-white border-l-4 border-red-500 p-8 rounded-lg shadow-lg mb-8">
          <div className="calc-line text-lg mb-3 text-gray-700">Dois drinks no final de semana = R$ 70</div>
          <div className="calc-line text-lg mb-3 text-gray-700">Quatro finais de semana = R$ 280 por mês</div>
          <div className="calc-total text-2xl font-bold text-gray-900">
            Em um ano ={" "}
            <span className="highlight text-red-600 bg-yellow-100 px-2 py-1 rounded">
              R$ {animatedValue.toLocaleString("pt-BR")} jogados fora
            </span>
          </div>
        </div>

        <p className="solution-hook text-xl md:text-2xl font-semibold text-green-600 text-center">
          E se eu te falasse que dá para fazer os MESMOS drinks em casa, com a MESMA qualidade, gastando apenas R$ 3 por
          drink?
        </p>
      </div>
    </section>
  )
}
