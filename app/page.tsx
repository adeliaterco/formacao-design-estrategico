"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Script from "next/script"
import Image from "next/image"

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 30,
    seconds: 0,
  })

  const [scarcityCount, setScarcityCount] = useState(47)

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

  useEffect(() => {
    const scarcityTimer = setInterval(() => {
      setScarcityCount((prev) => Math.max(1, prev - 1))
    }, 180000)

    return () => clearInterval(scarcityTimer)
  }, [])

  const handleCTAClick = () => {
    window.open("https://pay.cakto.com.br/9srbzh8_523261", "_blank")
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white px-4 py-8">
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <link rel="preconnect" href="https://api6.ipify.org" />
        <link rel="preconnect" href="https://comprarplanseguro.shop" />
        <link rel="preconnect" href="https://nutricaoalimentos.shop" />

        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            window.pixelId = "689b7d76a6b30cd48709aaec";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>

        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="lazyOnload"
        />

        <Image
          src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-moody-atmospheric-product-shot-adverti_KDlaFuM0T0WTyLNWM805ew_BPBTrbOPS8C2IKHg8724aw.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center w-full max-w-sm mx-auto">
          <h1
            className="text-2xl font-black mb-3 leading-tight"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            PARE DE PAGAR R$ 35 POR DRINK
          </h1>
          <h2
            className="text-lg font-bold text-yellow-400 mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            Faça os Mesmos em Casa por R$ 3
          </h2>
          <p className="text-sm text-gray-300 mb-4" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}>
            Os 50 drinks mais pedidos dos bares caros + segredos que os bartenders não querem que você saiba
          </p>

          <Badge className="bg-red-600 text-white py-1 px-3 text-xs mb-4 animate-pulse block w-fit mx-auto">
            🔥 LIBERADO POR TEMPO LIMITADO
          </Badge>

          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 mb-6 w-full border border-white/10">
            <div className="text-xs mb-2 text-gray-300">OFERTA EXPIRA EM:</div>
            <div className="flex gap-1 justify-center">
              <div className="text-center flex-1">
                <div className="bg-red-600 rounded px-2 py-1 text-lg font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs mt-1">HORAS</div>
              </div>
              <div className="text-center flex-1">
                <div className="bg-red-600 rounded px-2 py-1 text-lg font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs mt-1">MIN</div>
              </div>
              <div className="text-center flex-1">
                <div className="bg-red-600 rounded px-2 py-1 text-lg font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs mt-1">SEG</div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCTAClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full text-base w-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            QUERO ECONOMIZAR AGORA! 💰
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Você Está Cansado de...</h2>
          <div className="space-y-4">
            <Card className="p-4 border-l-4 border-red-500">
              <CardContent className="p-0">
                <h3 className="font-bold text-red-600 mb-1 text-sm">💸 Pagar Caro por Drinks</h3>
                <p className="text-gray-700 text-sm">R$ 35-50 por drink que custa R$ 3 para fazer</p>
              </CardContent>
            </Card>
            <Card className="p-4 border-l-4 border-red-500">
              <CardContent className="p-0">
                <h3 className="font-bold text-red-600 mb-1 text-sm">😤 Drinks Aguados</h3>
                <p className="text-gray-700 text-sm">Bebidas fracas que não valem o preço</p>
              </CardContent>
            </Card>
            <Card className="p-4 border-l-4 border-red-500">
              <CardContent className="p-0">
                <h3 className="font-bold text-red-600 mb-1 text-sm">🏠 Não Saber Fazer em Casa</h3>
                <p className="text-gray-700 text-sm">Depender sempre de bares e baladas</p>
              </CardContent>
            </Card>
            <Card className="p-4 border-l-4 border-red-500">
              <CardContent className="p-0">
                <h3 className="font-bold text-red-600 mb-1 text-sm">👥 Impressionar Visitas</h3>
                <p className="text-gray-700 text-sm">Não conseguir fazer drinks profissionais</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Agora Você Pode Fazer os Drinks Mais Caros em Casa!</h2>

          <div className="space-y-4 mb-6">
            <Card className="p-4 border-l-4 border-green-500">
              <CardContent className="p-0 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/professional-mojito.png"
                    alt="Mojito Profissional"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-green-600 text-sm">✅ Mojito Profissional</h3>
                    <p className="text-xs text-gray-600">(que custa R$ 28 no bar)</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">Receita completa + técnicas secretas</p>
              </CardContent>
            </Card>

            <Card className="p-4 border-l-4 border-green-500">
              <CardContent className="p-0 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/premium-caipirinha.png"
                    alt="Caipirinha Premium"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-green-600 text-sm">✅ Caipirinha Premium</h3>
                    <p className="text-xs text-gray-600">(que custa R$ 22 no bar)</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">Segredo do açúcar e da cachaça ideal</p>
              </CardContent>
            </Card>

            <Card className="p-4 border-l-4 border-green-500">
              <CardContent className="p-0 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/gin-tonic-special.png"
                    alt="Gin Tônica Especial"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-green-600 text-sm">✅ Gin Tônica Especial</h3>
                    <p className="text-xs text-gray-600">(que custa R$ 35 no bar)</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">Proporção perfeita + guarnições especiais</p>
              </CardContent>
            </Card>

            <Card className="p-4 border-l-4 border-green-500">
              <CardContent className="p-0 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/whisky-sour-cocktail.png"
                    alt="Whisky Sour Autêntico"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-green-600 text-sm">✅ Whisky Sour Autêntico</h3>
                    <p className="text-xs text-gray-600">(que custa R$ 42 no bar)</p>
                  </div>
                </div>
                <p className="text-gray-700 text-xs">Técnica da espuma + balanceamento perfeito</p>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleCTAClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full text-base w-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            QUERO APRENDER AGORA! 🍹
          </Button>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-8 px-4 bg-yellow-50">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">🎁 BÔNUS EXCLUSIVOS (Valor: R$ 67)</h2>

          <div className="space-y-4 mb-6">
            <Card className="p-4 border-2 border-yellow-400">
              <CardContent className="p-0">
                <h3 className="font-bold text-yellow-600 mb-1 text-sm">🥃 BÔNUS #1: Guia de Whisky (R$ 23)</h3>
                <p className="text-gray-700 text-xs">Como escolher o whisky certo para cada drink</p>
              </CardContent>
            </Card>
            <Card className="p-4 border-2 border-yellow-400">
              <CardContent className="p-0">
                <h3 className="font-bold text-yellow-600 mb-1 text-sm">
                  🍸 BÔNUS #2: Drinks para Impressionar (R$ 27)
                </h3>
                <p className="text-gray-700 text-xs">15 receitas exclusivas para ocasiões especiais</p>
              </CardContent>
            </Card>
            <Card className="p-4 border-2 border-yellow-400">
              <CardContent className="p-0">
                <h3 className="font-bold text-yellow-600 mb-1 text-sm">📱 BÔNUS #3: App de Calculadora (R$ 17)</h3>
                <p className="text-gray-700 text-xs">Calcule proporções perfeitas automaticamente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xl font-bold mb-6">Oferta Especial de Lançamento</h2>

          <Card className="bg-white text-gray-800 p-6 mb-6">
            <CardContent className="p-0">
              <div className="text-center">
                <div className="text-sm text-gray-500 line-through mb-2">De R$ 97</div>
                <div className="text-3xl font-bold text-green-600 mb-3">R$ 7,90</div>
                <div className="text-sm text-gray-600 mb-3">Pagamento único</div>
                <Badge className="bg-red-600 text-white mb-3">85% OFF</Badge>
                <div className="text-xs text-gray-500">⚠️ Apenas {scarcityCount} vagas restantes</div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleCTAClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full text-base w-full transform hover:scale-105 transition-all duration-300 shadow-lg mb-4"
          >
            GARANTIR MINHA VAGA! 🔥
          </Button>

          <div className="text-xs text-gray-300">🔒 Compra 100% Segura | ✅ Garantia de 7 dias</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">O Que Nossos Alunos Dizem</h2>

          <div className="space-y-4">
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.24.05.png"
                    alt="Carlos Silva"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm">Carlos Silva</h4>
                    <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Economizei mais de R$ 800 no primeiro mês! Os drinks ficam idênticos aos do bar."
                </p>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/prova-1-50-drinks.png"
                    alt="Ana Costa"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm">Ana Costa</h4>
                    <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Agora sou a bartender da família! Todo mundo quer vir na minha casa."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Perguntas Frequentes</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm text-left">É difícil fazer os drinks?</AccordionTrigger>
              <AccordionContent className="text-sm">
                Não! Todas as receitas são explicadas passo a passo, com medidas exatas. Qualquer pessoa
                consegue fazer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm text-left">Preciso de equipamentos caros?</AccordionTrigger>
              <AccordionContent className="text-sm">
                Não! Ensinamos como fazer drinks profissionais com utensílios que você já tem em casa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm text-left">Tem garantia?</AccordionTrigger>
              <AccordionContent className="text-sm">
                Sim! 7 dias de garantia total. Se não gostar, devolvemos 100% do seu dinheiro.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm text-left">Como recebo o material?</AccordionTrigger>
              <AccordionContent className="text-sm">
                Imediatamente após a compra, você recebe o acesso completo por email.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 px-4 bg-green-600 text-white">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">Última Chance!</h2>
          <p className="text-sm mb-4">Não perca esta oportunidade única de economizar milhares de reais por ano</p>

          <Button
            onClick={handleCTAClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-full text-base w-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            GARANTIR AGORA POR R$ 7,90! 🚀
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-sm mx-auto">
          <p className="text-xs text-gray-400 mb-3">© 2024 Manual:50 drinks mais pedidos dos bares caros. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
