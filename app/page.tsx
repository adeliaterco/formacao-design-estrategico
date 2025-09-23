"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Clock, Users, DollarSign, Star, CheckCircle, Shield, Play, Zap, TrendingUp, Award, Heart, Eye } from "lucide-react"
import Script from "next/script"
import Image from "next/image"

// GA otimizado com debounce
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, props);
        });
        queue = [];
      }
    }, 300);
  };
})();

// Hook para Intersection Observer com fallback
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Fallback para browsers antigos
    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [vagasRestantes, setVagasRestantes] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [clientesVisualizando, setClientesVisualizando] = useState(127);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Refs para lazy loading
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [priceRef, priceInView] = useIntersectionObserver({ threshold: 0.1 });

  // Controle do carregamento do vídeo
  useEffect(() => {
    // Carrega script da Vturb
    const loadVturbScript = () => {
      if (document.querySelector('script[src*="converteai.net"]')) {
        setVideoLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cc431968f1a0ddac9f82d8/v4/player.js";
      script.async = true;
      
      script.onload = () => {
        setTimeout(() => {
          setVideoLoaded(true);
        }, 1500);
      };
      
      script.onerror = () => {
        console.warn('Erro ao carregar script Vturb');
        setVideoLoaded(true); // Remove fallback mesmo com erro
      };
      
      document.head.appendChild(script);
    };

    // Carrega imediatamente se estiver visível
    if (heroInView) {
      loadVturbScript();
    }
  }, [heroInView]);

  // Timer otimizado - só roda quando visível
  useEffect(() => {
    if (!heroInView) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [heroInView]);

  // Simulação de atividade em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setVagasRestantes(prev => {
        const newValue = prev > 2 ? prev - 1 : Math.floor(Math.random() * 3) + 3;
        return newValue;
      });
      
      setClientesVisualizando(prev => {
        const variation = Math.floor(Math.random() * 10) - 5;
        return Math.max(120, Math.min(150, prev + variation));
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // CTA CORRIGIDO PARA MOBILE
  const handleCTA = useCallback((e, origem) => {
    // Previne comportamentos padrão
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return; // Previne múltiplos cliques
    
    setIsLoading(true);
    
    // Debounce para evitar múltiplos toques
    setTimeout(() => {
      enviarEvento('cta_click', { origem, timestamp: Date.now() });
      
      // Haptic feedback em mobile
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      // Redirecionamento para o link da estrutura base
      window.open('https://pay.cakto.com.br/9srbzh8_523261', '_blank');
      
      // Reset do loading após um tempo curto apenas para UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 100);
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Scripts de tracking da estrutura base */}
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

      {/* VTURB PRELOAD OTIMIZADO */}
      <Script dangerouslySetInnerHTML={{
        __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`
      }} />

      {/* HERO SECTION OTIMIZADA */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-2 py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        
        <div className="glass-hero max-w-5xl mx-auto p-6 relative z-10 fade-in-mobile">
          
          {/* PROVA SOCIAL IMEDIATA */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="social-proof-badge">
              <Eye className="w-4 h-4 inline mr-1" />
              <span aria-label={`${clientesVisualizando} pessoas visualizando agora`}>
                {clientesVisualizando} vendo agora
              </span>
            </Badge>
            <Badge className="social-proof-badge">
              <Users className="w-4 h-4 inline mr-1" />
              <span aria-label={`Restam apenas ${vagasRestantes} vagas`}>
                Restam {vagasRestantes} vagas
              </span>
            </Badge>
          </div>

          {/* HEADLINE PRINCIPAL */}
          <h1 className="headline-mobile">
            GANHE R$ 2.500+ POR MÊS<br />
            COM DESIGN DE SOBRANCELHAS
          </h1>
          
          <p className="subtitle-mobile">
            <strong>Método exclusivo</strong> que transformou 1.500+ mulheres em especialistas requisitadas. <strong>Mesmo começando do zero!</strong>
          </p>

          {/* VÍDEO VTURB CORRIGIDO */}
          <div className="relative max-w-3xl mx-auto mb-6">
            <Card className="glass-card-mobile p-3">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <div className="video-container">
                  {/* FALLBACK ENQUANTO CARREGA */}
                  <div 
                    className={`video-fallback ${videoLoaded ? 'hidden' : ''}`}
                  >
                    <div className="text-center">
                      <Play className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-pulse" />
                      <p className="text-white font-semibold">Carregando vídeo...</p>
                      <p className="text-slate-300 text-sm mt-2">Aguarde alguns segundos</p>
                    </div>
                  </div>
                  
                  {/* PLAYER VTURB */}
                  <div 
                    id="vid-68cc431968f1a0ddac9f82d8" 
                    style={{
                      display: 'block',
                      margin: '0 auto',
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                      position: 'relative',
                      zIndex: 2
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* CTA PRINCIPAL CORRIGIDO */}
          <div className="text-center mb-4">
            <Button 
              onClick={(e) => handleCTA(e, 'hero')}
              disabled={isLoading}
              className="btn-primary-mobile gpu-accelerated"
              aria-label="Clique para garantir sua vaga no curso e começar a faturar R$ 2.500 por mês"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  PROCESSANDO
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  QUERO FATURAR R$ 2.500+/MÊS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-300 mb-4">
            ⚡ Acesso imediato • 💎 Recupere o investimento no 1º cliente
          </p>

          {/* TIMER COMPACTO MELHORADO */}
          <div className="timer-compact max-w-xs mx-auto">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 font-bold text-xs uppercase">Oferta termina em:</span>
            </div>
            <div className="flex justify-center gap-2" role="timer" aria-live="polite" aria-label={`Tempo restante: ${timeLeft.hours} horas, ${timeLeft.minutes} minutos, ${timeLeft.seconds} segundos`}>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">H</div>
              </div>
              <div className="timer-digit-small">:</div>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">M</div>
              </div>
              <div className="timer-digit-small">:</div>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">S</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO POTENCIAL DE GANHOS COMPACTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-3">
            💰 SEU POTENCIAL DE GANHOS
          </h2>
          <p className="text-lg text-center text-slate-300 mb-8">
            Baseado em R$ 55 por atendimento
          </p>

          <div className="calculator-mobile max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4">RENDA MENSAL REAL:</h3>
            
            <div className="earning-row">
              <span>1 cliente/dia</span>
              <span className="earning-value">R$ 1.210</span>
            </div>
            
            <div className="earning-row">
              <span>2 clientes/dia</span>
              <span className="earning-value">R$ 2.420</span>
            </div>
            
            <div className="earning-row">
              <span>3 clientes/dia</span>
              <span className="earning-value">R$ 3.630</span>
            </div>

            <div className="mt-4 p-3 bg-white/20 rounded-xl">
              <p className="font-bold text-sm">
                🎯 Com apenas 2 clientes/dia = R$ 2.500+/mês!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PREÇO ANTECIPADA */}
      <section ref={priceRef} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="price-section-mobile relative z-10">
            <div className="relative z-20">
              <h2 className="text-3xl font-bold text-white mb-4">
                🔥 OFERTA EXCLUSIVA!
              </h2>
              
              <div className="mb-6">
                <div className="price-old-mobile">De R$ 297,00</div>
                <div className="price-new-mobile">R$ 37</div>
                <p className="text-slate-300">Pagamento único • Sem mensalidades</p>
              </div>

              <Card className="glass-card-mobile p-4 mb-6">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">✅ VOCÊ RECEBE:</h3>
                  <div className="grid grid-cols-1 gap-2 text-left text-sm">
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>Curso completo (14h de conteúdo)</span>
                    </div>
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>Certificado de conclusão</span>
                    </div>
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>Acesso vitalício + atualizações</span>
                    </div>
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>Suporte especializado</span>
                    </div>
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>Comunidade exclusiva</span>
                    </div>
                    <div className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>BÔNUS: Guia atração de clientes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mb-4">
                <Button 
                  onClick={(e) => handleCTA(e, 'price')}
                  disabled={isLoading}
                  className="btn-primary-mobile gpu-accelerated"
                  aria-label="Garantir minha vaga no curso por R$ 37"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      PROCESSANDO
                      <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      GARANTIR MINHA VAGA AGORA
                      <Zap className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-center text-slate-300 text-sm">
                💎 Se paga no primeiro cliente!<br />
                🛡️ Garantia de 7 dias
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO INSTRUTORA COMPACTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card-mobile p-6">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <Image
                  src="https://amandateixeiraoficial.com.br/wp-content/uploads/2024/11/Design-sem-nome-9.png"
                  alt="Amanda Teixeira, instrutora do curso de design de sobrancelhas"
                  width={200}
                  height={300}
                  className="rounded-2xl mx-auto mb-4"
                  loading="lazy"
                />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Amanda Teixeira
                </h2>
                <p className="text-slate-300 text-sm mb-4">
                  CEO do Studio Amanda Teixeira Beauty • 8+ anos de experiência • 1.500+ alunas formadas • 300+ clientes mensais
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    8+ anos experiência
                  </Badge>
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    1.500+ alunas
                  </Badge>
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    300+ clientes/mês
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* DEPOIMENTOS COMPACTOS */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            ⭐ RESULTADOS REAIS
          </h2>
          
          <div className="space-y-4">
            <Card className="testimonial-compact">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4283.webp"
                    alt="Foto de Mariana Silva, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      Antes cobrava R$20. Hoje cobro R$55 e agenda lotada! Se pagou na primeira semana.
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Mariana Silva, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="testimonial-compact">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4284.webp"
                    alt="Foto de Juliana Costa, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      Zero experiência na área. Com o método da Amanda, resultados profissionais desde o 1º atendimento!
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Juliana Costa, RJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="testimonial-compact">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/05/IMG_6297.jpg"
                    alt="Foto de Fernanda Oliveira, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      Bônus de atração foi divisor de águas! 12 novas clientes em 1 mês. Renda extra de R$2.500!
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Fernanda Oliveira, MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTEÚDO DO CURSO RESUMIDO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            📚 O QUE VOCÊ APRENDE
          </h2>
          
          <div className="grid gap-4">
            <Card className="glass-card-mobile p-4">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                  <h3 className="text-lg font-bold text-white">Fundamentos</h3>
                </div>
                <p className="text-slate-300 text-sm">Anatomia, materiais e protocolos profissionais</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                  <h3 className="text-lg font-bold text-white">Simetria Facial</h3>
                </div>
                <p className="text-slate-300 text-sm">Modelagem personalizada para cada formato de rosto</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                  <h3 className="text-lg font-bold text-white">Técnicas Avançadas</h3>
                </div>
                <p className="text-slate-300 text-sm">Spa de sobrancelhas, técnica de pinçamento e esferas cromoterapia</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 border-2 border-amber-400">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">🎁</div>
                  <h3 className="text-lg font-bold text-amber-400">BÔNUS</h3>
                </div>
                <p className="text-slate-300 text-sm">Como atrair 10 clientes em 30 dias + estratégias de vendas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GARANTIA COMPACTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card-mobile p-6 text-center">
            <CardContent className="p-0">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">
                🛡️ GARANTIA DE 7 DIAS
              </h2>
              <p className="text-slate-300 mb-4">
                100% do seu dinheiro de volta se não ficar satisfeita. Sem perguntas, sem burocracia.
              </p>
              <p className="text-amber-400 font-bold">
                O RISCO É TODO NOSSO!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA FINAL OTIMIZADO */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 TRANSFORME SUA VIDA AGORA!
          </h2>
          <p className="text-lg text-slate-300 mb-6">
            Por apenas <span className="text-amber-400 font-bold text-xl">R$ 37,00</span> você tem acesso a tudo que precisa para conquistar sua independência financeira.
          </p>
          
          <Button 
            onClick={(e) => handleCTA(e, 'final')}
            disabled={isLoading}
            className="btn-primary-mobile text-lg py-5 px-8 gpu-accelerated"
            aria-label="Transformar minha vida agora com o curso de design de sobrancelhas"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                PROCESSANDO
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                QUERO TRANSFORMAR MINHA VIDA
                <Heart className="ml-2 w-6 h-6" />
              </span>
            )}
          </Button>
          
          <p className="text-slate-300 mt-4 text-sm">
            ⚡ Acesso imediato • 🛡️ Garantia 7 dias • 💎 Zero riscos
          </p>
        </div>
      </section>

      {/* RODAPÉ MINIMALISTA */}
      <footer className="py-6 px-4 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2024 Amanda Teixeira Oficial - Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  )
}