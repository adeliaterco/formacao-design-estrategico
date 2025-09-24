"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Clock, Users, DollarSign, Star, CheckCircle, Shield, Play, Zap, TrendingUp, Award, Heart, Eye, AlertTriangle, X } from "lucide-react"
import Script from "next/script"
import Image from "next/image"

// GA otimizado com debounce (mantido)
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

// Hook para Intersection Observer com fallback (mantido)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
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
  const [vturbReady, setVturbReady] = useState(false);
  const [novasVagas24h, setNovasVagas24h] = useState(47);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(true);
  
  // Refs para lazy loading
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [priceRef, priceInView] = useIntersectionObserver({ threshold: 0.1 });

  // ✅ CONTROLE CORRIGIDO DO VÍDEO VTURB (mantido)
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkVturbPlayer = () => {
      const player = document.querySelector('vturb-smartplayer#vid-68cc431968f1a0ddac9f82d8');
      const hasContent = player && (
        player.innerHTML.trim() !== '' || 
        player.shadowRoot ||
        player.querySelector('iframe') ||
        player.querySelector('video') ||
        window.ConvertPlayer
      );
      
      if (hasContent) {
        console.log('✅ Vturb SmartPlayer carregado com sucesso');
        setVideoLoaded(true);
        setVturbReady(true);
        return true;
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        console.log('⚠️ Timeout - removendo fallback após 20s');
        setVideoLoaded(true);
        return true;
      }
      
      return false;
    };
    
    if (checkVturbPlayer()) return;
    
    const interval = setInterval(() => {
      if (checkVturbPlayer()) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Timer otimizado (mantido)
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

  // Simulação de atividade em tempo real (mantido + melhorado)
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

      setNovasVagas24h(prev => {
        const variation = Math.floor(Math.random() * 6) - 3;
        return Math.max(40, Math.min(55, prev + variation));
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // ✅ CTA CORRIGIDO PARA FACEBOOK INITIATE CHECKOUT (mantido)
  const handleCTA = useCallback((e, origem) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    console.log(`🎯 CTA clicado - Origem: ${origem}`);
    
    // ✅ FACEBOOK PIXEL - INITIATE CHECKOUT (PRINCIPAL)
    if (typeof window !== 'undefined') {
      
      // Método 1: Via fbq direta (se disponível)
      if (window.fbq) {
        try {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'Formação Design de Sobrancelhas',
            content_category: 'Curso Online',
            content_ids: ['formacao-design-sobrancelhas'],
            value: 37.00,
            currency: 'BRL',
            num_items: 1,
            origem: origem,
            button_text: e.target.innerText || 'CTA Button',
            timestamp: Date.now()
          });
          console.log('✅ InitiateCheckout disparado via fbq - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro fbq:', error);
        }
      }
      
      // Método 2: Via UTMify (seu pixel principal)
      if (window.utmify) {
        try {
          if (window.utmify.track) {
            window.utmify.track('InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              content_category: 'Curso Online',
              value: 37.00,
              currency: 'BRL',
              origem: origem
            });
            console.log('✅ InitiateCheckout disparado via utmify.track - Origem:', origem);
          }
          
          if (window.utmify.pixel && window.utmify.pixel.track) {
            window.utmify.pixel.track('InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              value: 37.00,
              currency: 'BRL'
            });
            console.log('✅ InitiateCheckout disparado via utmify.pixel.track - Origem:', origem);
          }
        } catch (error) {
          console.warn('⚠️ Erro UTMify:', error);
        }
      }
      
      // Método 3: Via objeto pixel global (backup)
      if (window.pixel && window.pixel.track) {
        try {
          window.pixel.track('InitiateCheckout', {
            content_name: 'Formação Design de Sobrancelhas',
            value: 37.00,
            currency: 'BRL',
            origem: origem
          });
          console.log('✅ InitiateCheckout disparado via pixel.track - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro pixel global:', error);
        }
      }
      
      // Método 4: Via dataLayer (para GTM/Facebook)
      if (window.dataLayer) {
        try {
          window.dataLayer.push({
            event: 'facebook_initiate_checkout',
            ecommerce: {
              currency: 'BRL',
              value: 37.00,
              items: [{
                item_name: 'Formação Design de Sobrancelhas',
                item_category: 'Curso Online',
                price: 37.00,
                quantity: 1
              }]
            },
            origem: origem,
            timestamp: Date.now()
          });
          console.log('✅ InitiateCheckout disparado via dataLayer - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro dataLayer:', error);
        }
      }
      
      // Método 5: Disparo manual via eval (último recurso)
      try {
        const pixelCode = `
          if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              value: 37.00,
              currency: 'BRL'
            });
          }
        `;
        eval(pixelCode);
        console.log('✅ InitiateCheckout disparado via eval - Origem:', origem);
      } catch (error) {
        console.warn('⚠️ Erro eval:', error);
      }
    }
    
    // Tracking genérico (manter o seu)
    enviarEvento('cta_click', { origem, timestamp: Date.now() });
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // 🎯 REDIRECIONAMENTO COM DELAY PARA GARANTIR TRACKING
    setTimeout(() => {
      console.log('🚀 Redirecionando para checkout...');
      window.location.href = 'https://pay.cakto.com.br/qpmz3oi_299505';
    }, 800);
    
    // Reset para UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Scripts de tracking da estrutura base */}
      <link rel="preconnect" href="https://cdn.utmify.com.br" />
      <link rel="preconnect" href="https://api6.ipify.org" />
      <link rel="preconnect" href="https://comprarplanseguro.shop" />
      <link rel="preconnect" href="https://nutricaoalimentos.shop" />
      <link rel="preconnect" href="https://amandateixeiraoficial.com.br" />

      {/* ✅ PRELOAD DAS IMAGENS CRÍTICAS */}
      <link
        rel="preload"
        as="image"
        href="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
        type="image/webp"
      />

      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          window.pixelId = "68d352fa2bbdabf114779dac";
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

      <Script
        src="https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cc431968f1a0ddac9f82d8/v4/player.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Script Vturb V4 carregado com sucesso');
          setTimeout(() => {
            const player = document.querySelector('vturb-smartplayer#vid-68cc431968f1a0ddac9f82d8');
            if (player) {
              console.log('✅ Player encontrado após script load');
              setVturbReady(true);
            }
          }, 2000);
        }}
        onError={(e) => {
          console.warn('❌ Erro ao carregar script Vturb V4:', e);
          setVideoLoaded(true);
        }}
      />

      <Script 
        id="vturb-preload"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`
        }} 
      />

      {/* ✅ BANNER DE URGÊNCIA NO TOPO */}
      {showUrgencyBanner && (
        <div className="bg-red-600 text-white text-center py-3 px-4 relative z-50">
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>🚨 SEJA RÁPIDA! Esta promoção pode EXPIRAR a qualquer momento!</span>
            <button 
              onClick={() => setShowUrgencyBanner(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-200"
              aria-label="Fechar banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ✅ HERO SECTION OTIMIZADA PARA MOBILE */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-2 py-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        
        <div className="glass-hero max-w-5xl mx-auto relative z-10 fade-in-mobile">
          
          {/* ✅ PROVA SOCIAL MELHORADA */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <Badge className="social-proof-badge text-xs">
              <Eye className="w-3 h-3 inline mr-1" />
              <span aria-label={`${clientesVisualizando} pessoas visualizando agora`}>
                {clientesVisualizando} vendo agora
              </span>
            </Badge>
            <Badge className="social-proof-badge text-xs">
              <Users className="w-3 h-3 inline mr-1" />
              <span aria-label={`Restam apenas ${vagasRestantes} vagas`}>
                Restam {vagasRestantes} vagas
              </span>
            </Badge>
          </div>

          {/* ✅ HEADLINE COMPACTA PARA MOBILE */}
          <h1 className="headline-mobile">
            GANHE R$ 2.500+ POR MÊS COM SOBRANCELHAS
            <span className="text-amber-400">MESMO SENDO INICIANTE!</span>
            <span className="text-slate-300">
              Método que permite cobrar R$ 55 por atendimento em 30 dias
            </span>
          </h1>
          
          {/* ✅ SUBHEADLINE COMPACTA */}
          <p className="subtitle-mobile">
            Já funcionou para <strong>1.500+ mulheres</strong> que começaram do zero e hoje faturam <strong>R$ 2.500+/mês</strong>.
          </p>

          {/* ✅ VÍDEO VTURB OTIMIZADO PARA MOBILE */}
          <div className="relative max-w-3xl mx-auto mb-4">
            <Card className="glass-card-mobile p-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                
                <vturb-smartplayer 
                  id="vid-68cc431968f1a0ddac9f82d8"
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    width: '100%',
                    height: '100%',
                    minHeight: '250px', // Reduzido de 300px
                    borderRadius: '12px',
                    position: 'relative',
                    zIndex: 20
                  }}
                />
                
                {!videoLoaded && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl"
                    style={{ zIndex: 5 }}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-white font-semibold text-sm">Carregando vídeo...</p>
                      <p className="text-slate-300 text-xs mt-1">Aguarde alguns segundos</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* ✅ CTA PRINCIPAL OTIMIZADO */}
          <div className="text-center mb-3">
            <Button 
              onClick={(e) => handleCTA(e, 'hero')}
              disabled={isLoading}
              className="btn-primary-mobile gpu-accelerated"
              aria-label="Garantir minha vaga por R$ 37 antes que o preço volte para R$ 297"
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
                  QUERO COMEÇAR AGORA POR R$ 37
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-slate-300 mb-3">
            ⚡ Acesso imediato • 💎 Se paga no primeiro cliente • 🛡️ Garantia 7 dias
          </p>

          {/* ✅ TIMER COMPACTO MELHORADO */}
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
            
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-2 mt-3">
              <p className="text-red-300 text-xs text-center font-bold">
                ⚠️ Após o timer, preço volta para R$ 297
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ SEÇÃO: PARA VOCÊ SE QUER... */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            Este curso é perfeito <span className="text-amber-400">para você se quer...</span>
          </h2>
          
          <div className="grid gap-3 mt-6">
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">Trocar a CLT por uma profissão valorizada e lucrativa</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">Começar do zero e aprender passo a passo sem enrolação</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">Conquistar uma renda extra de R$ 2.500+ por mês</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">Se destacar no mercado com uma técnica moderna e exclusiva</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">Trabalhar com algo prazeroso, ajudando mulheres a se sentirem mais bonitas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ SEÇÃO POTENCIAL DE GANHOS MELHORADA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            💰 SEU POTENCIAL DE GANHOS
          </h2>
          <p className="text-center text-slate-300 mb-6 text-sm">
            Baseado em R$ 55 por atendimento (preço mínimo do mercado)
          </p>

          <div className="calculator-mobile max-w-lg mx-auto">
            <h3 className="text-lg font-bold mb-3 text-white text-center">RENDA MENSAL REAL:</h3>
            
            <div className="earning-row">
              <span>1 cliente/dia</span>
              <span className="earning-value">R$ 1.210</span>
            </div>
            
            <div className="earning-row bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400">
              <span>2 clientes/dia (META REAL)</span>
              <span className="earning-value text-xl">R$ 2.420</span>
            </div>
            
            <div className="earning-row">
              <span>3 clientes/dia</span>
              <span className="earning-value">R$ 3.630</span>
            </div>

            <div className="mt-3 p-3 bg-white/20 rounded-xl">
              <p className="font-bold text-sm text-white text-center">
                🎯 Com apenas 2 clientes/dia = R$ 2.500+/mês!
              </p>
              <p className="text-xs mt-1 text-slate-300 text-center">
                Nossas alunas cobram até R$ 80 por atendimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ QUEBRA DE OBJEÇÕES MELHORADA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            ❓ AINDA TEM DÚVIDAS?
          </h2>
          
          <div className="space-y-3">
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2 text-sm">
                  "Nunca fiz sobrancelhas antes..."
                </h3>
                <p className="text-slate-300 text-xs">
                  ✅ Perfeito! O método foi criado para iniciantes. Você aprende do zero ao profissional em passos simples e práticos.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2 text-sm">
                  "E se não conseguir clientes?"
                </h3>
                <p className="text-slate-300 text-xs">
                  ✅ Impossível! O BÔNUS "Como Atrair 10 Clientes em 30 Dias" ensina estratégias testadas e aprovadas por 1.500+ alunas.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2 text-sm">
                  "R$ 55 por atendimento é muito?"
                </h3>
                <p className="text-slate-300 text-xs">
                  ✅ É o preço MÍNIMO do mercado! Nossas alunas cobram até R$ 80. Você vai se surpreender com a valorização.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2 text-sm">
                  "Não tenho tempo para estudar..."
                </h3>
                <p className="text-slate-300 text-xs">
                  ✅ São apenas 14h de conteúdo direto ao ponto. Você pode assistir no seu ritmo, quando quiser. Acesso vitalício!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ SEÇÃO PREÇO COM STACK DE VALOR MASSIVO */}
      <section ref={priceRef} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="price-section-mobile relative z-10">
            <div className="relative z-20">
              <h2 className="section-title-mobile">
                🔥 OFERTA EXCLUSIVA!
              </h2>
              
              {/* ✅ STACK DE VALOR MASSIVO */}
              <Card className="glass-card-mobile p-3 border-2 border-amber-400 mb-4">
                <CardContent className="p-0">
                  <h3 className="text-amber-400 font-bold mb-3 text-center text-base">
                    🎁 VOCÊ RECEBE HOJE (Valor Total: R$ 594)
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Curso Completo (14h de conteúdo)</span>
                      <span className="text-slate-300 text-xs"><s>R$ 297</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Certificado Profissional</span>
                      <span className="text-slate-300 text-xs"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Como Atrair 10 Clientes em 30 Dias</span>
                      <span className="text-slate-300 text-xs"><s>R$ 197</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Suporte Especializado</span>
                      <span className="text-slate-300 text-xs"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Comunidade Exclusiva</span>
                      <span className="text-slate-300 text-xs"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-1">
                      <span className="text-white text-xs">✅ Acesso Vitalício + Atualizações</span>
                      <span className="text-slate-300 text-xs"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="bg-green-500/20 p-2 rounded-lg mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-300 font-bold text-sm">TOTAL HOJE:</span>
                        <span className="text-green-300 font-bold text-xl">R$ 37</span>
                      </div>
                      <p className="text-green-300 text-xs text-center mt-1">
                        Economia de R$ 557 (94% OFF)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mb-4">
                <div className="price-old-mobile">De R$ 297,00</div>
                <div className="price-new-mobile">R$ 37</div>
                <p className="text-slate-300 text-sm">Pagamento único • Sem mensalidades</p>
              </div>

              <div className="text-center mb-3">
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

              <p className="text-center text-slate-300 text-xs">
                💎 Se paga no primeiro cliente!<br />
                🛡️ Garantia de 7 dias • ⚡ Acesso imediato
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO INSTRUTORA COMPACTA - ✅ OTIMIZADA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card-mobile p-4">
            <CardContent className="p-0">
              <div className="text-center mb-4">
                <Image
                  src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
                  alt="Amanda Teixeira, instrutora do curso de design de sobrancelhas"
                  width={150}
                  height={225}
                  className="rounded-2xl mx-auto mb-3"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  Amanda Teixeira
                </h2>
                <p className="text-slate-300 text-xs mb-3">
                  CEO do Studio Amanda Teixeira Beauty • 8+ anos de experiência • 1.500+ alunas formadas • 300+ clientes mensais
                </p>
                
                <div className="flex flex-wrap justify-center gap-1">
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

      {/* ✅ SEÇÃO: ANTES E DEPOIS VISUAL - OTIMIZADA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            ⭐ VEJA OS RESULTADOS <span className="text-amber-400">REAIS DA TÉCNICA</span>
          </h2>
          <p className="text-center text-slate-300 mb-6 text-sm">
            Você também será capaz de entregar resultados assim - mesmo começando do zero
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "744AC0AD-B13A-43F3-8ABB-B170FC0955FF-scaled.webp",
              "1BE356B6-B9B0-4CA6-B01B-CE7B04708035-scaled.webp",
              "5AF3165D-93B2-40EF-9E8B-C6DD855D2967-scaled.webp",
              "5827B0FF-270B-4DE6-B93E-E5739BC7C828-scaled.webp",
              "B4FBE6B4-78FB-41D6-BA43-7E37720C2E6C-scaled.webp",
              "2DB3B625-5AA4-49A0-82AB-C76F5575FDD4-scaled.webp"
            ].map((filename, index) => (
              <Card key={filename} className="glass-card-mobile p-1 hover:scale-105 transition-transform duration-300">
                <Image
                  src={`https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/${filename}`}
                  alt={`Resultado antes e depois de sobrancelha ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg w-full h-auto"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ DEPOIMENTOS COMPACTOS MELHORADOS - OTIMIZADOS */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            ⭐ O QUE AS ALUNAS ESTÃO FALANDO
          </h2>
          
          <div className="space-y-3">
            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4283.webp"
                    alt="Foto de Mariana Silva, aluna do curso"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div>
                    <p className="text-slate-200 text-xs mb-1">
                      "Primeira semana: R$ 385. Segundo mês: R$ 2.100. Hoje tenho lista de espera! O método da Amanda é incrível."
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

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4284.webp"
                    alt="Foto de Juliana Costa, aluna do curso"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div>
                    <p className="text-slate-200 text-xs mb-1">
                      "Zero experiência. Com o método da Amanda, R$ 55 por cliente desde o 1º atendimento! Não acreditava que seria possível."
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

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/bcfdb98d0af7f3d9c62c0ce159374d41.webp"
                    alt="Foto de Fernanda Oliveira, aluna do curso"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div>
                    <p className="text-slate-200 text-xs mb-1">
                      "Bônus de atração foi divisor de águas! 12 novas clientes em 1 mês. Renda extra de R$2.500! Mudou minha vida."
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

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/41a107079cc917227948951a6bcc2e20.webp"
                    alt="Foto de Carolina Santos, aluna do curso"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div>
                    <p className="text-slate-200 text-xs mb-1">
                      "Saí do desemprego para R$ 3.200/mês em 3 meses. Hoje tenho meu próprio studio. Gratidão eterna à Amanda!"
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Carolina Santos, PR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTEÚDO DO CURSO RESUMIDO */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            📚 O QUE VOCÊ VAI APRENDER
          </h2>
          
          <div className="grid gap-3">
            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">1</div>
                  <h3 className="text-base font-bold text-white">Fundamentos Profissionais</h3>
                </div>
                <p className="text-slate-300 text-xs">Anatomia facial, materiais profissionais e protocolos de segurança</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">2</div>
                  <h3 className="text-base font-bold text-white">Simetria Facial Perfeita</h3>
                </div>
                <p className="text-slate-300 text-xs">Modelagem personalizada para cada formato de rosto e biotipo</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">3</div>
                  <h3 className="text-base font-bold text-white">Técnicas Avançadas</h3>
                </div>
                <p className="text-slate-300 text-xs">Spa de sobrancelhas, técnica de pinçamento e cromoterapia exclusiva</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-3 border-2 border-amber-400 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">🎁</div>
                  <h3 className="text-base font-bold text-amber-400">BÔNUS EXCLUSIVO</h3>
                </div>
                <p className="text-slate-300 text-xs">Como atrair 10 clientes em 30 dias + estratégias de vendas e fidelização</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ RECAPITULAÇÃO FINAL */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            Recapitulando: Tudo o que você leva hoje por apenas <span className="text-amber-400">R$ 37</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lista do que recebe */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">✅ VOCÊ RECEBE:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Curso completo com 14h de conteúdo</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Certificado de conclusão profissional</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Acesso vitalício + atualizações</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Suporte especializado</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Comunidade exclusiva de alunas</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">BÔNUS: Como atrair 10 clientes em 30 dias</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Garantia incondicional de 7 dias</span>
                </div>
              </div>
            </div>
            
            {/* CTA Box */}
            <Card className="glass-card-mobile p-4">
              <CardContent className="p-0 text-center">
                <div className="mb-3">
                  <div className="text-slate-400 line-through text-base">De: R$ 297,00</div>
                  <div className="text-3xl font-bold text-amber-400">R$ 37</div>
                  <div className="text-slate-300 text-sm">Pagamento único</div>
                </div>
                
                <Button 
                  onClick={(e) => handleCTA(e, 'recap')}
                  disabled={isLoading}
                  className="btn-primary-mobile w-full mb-3"
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
                      QUERO COMEÇAR AGORA SEM RISCO
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  )}
                </Button>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-center text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    <span>Acesso Imediato</span>
                  </div>
                  <div className="flex items-center justify-center text-green-400">
                    <Shield className="w-3 h-3 mr-1" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center justify-center text-green-400">
                    <Zap className="w-3 h-3 mr-1" />
                    <span>Se paga no 1º cliente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GARANTIA COMPACTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card-mobile p-4 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">
                🛡️ GARANTIA INCONDICIONAL DE 7 DIAS
              </h2>
              <p className="text-slate-300 mb-3 text-sm">
                100% do seu dinheiro de volta se não ficar satisfeita. Sem perguntas, sem burocracia, sem complicação.
              </p>
              <p className="text-amber-400 font-bold text-base">
                O RISCO É TODO NOSSO!
              </p>
              <p className="text-slate-300 text-xs mt-1">
                Você pode testar todo o conteúdo por 7 dias completos
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ✅ FAQ MELHORADO */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title-mobile">
            ❓ PERGUNTAS FREQUENTES
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-3 text-sm">
                Preciso ter experiência prévia?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-3 pb-3 text-xs">
                Não! O curso foi criado especificamente para iniciantes. Você aprende do absoluto zero até se tornar uma profissional confiante, com método passo a passo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-3 text-sm">
                Quanto tempo leva para começar a atender?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-3 pb-3 text-xs">
                Em média, nossas alunas começam a atender em 2-3 semanas. O curso tem 14h de conteúdo que você pode assistir no seu ritmo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-3 text-sm">
                Como funciona a garantia?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-3 pb-3 text-xs">
                Você tem 7 dias para testar todo o conteúdo. Se não ficar satisfeita, devolvemos 100% do valor sem perguntas ou burocracia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-3 text-sm">
                Preciso comprar materiais caros?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-3 pb-3 text-xs">
                Não! Ensinamos como começar com um investimento mínimo e onde comprar materiais de qualidade com preços acessíveis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-3 text-sm">
                O acesso é vitalício mesmo?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-3 pb-3 text-xs">
                Sim! Você terá acesso para sempre, incluindo todas as atualizações futuras do curso, sem custo adicional.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ✅ CTA FINAL OTIMIZADO COM URGÊNCIA MÁXIMA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* ✅ URGÊNCIA FINAL MAIS FORTE */}
          <div className="bg-red-500/20 border border-red-400 rounded-lg p-3 mb-4">
            <p className="text-red-300 text-base font-bold text-center">
              🚨 ÚLTIMAS {vagasRestantes} VAGAS DISPONÍVEIS
            </p>
            <p className="text-red-300 text-xs text-center mt-1">
              Após esgotar, próxima turma apenas em Novembro por R$ 497
            </p>
            <p className="text-red-300 text-xs text-center mt-1">
              +{novasVagas24h} mulheres garantiram vaga nas últimas 24h
            </p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3">
            🚀 TRANSFORME SUA VIDA AGORA!
          </h2>
          <p className="text-base text-slate-300 mb-4">
            Por apenas <span className="text-amber-400 font-bold text-xl">R$ 37,00</span> você tem acesso a tudo que precisa para conquistar sua independência financeira trabalhando com sobrancelhas.
          </p>
          
          <Button 
            onClick={(e) => handleCTA(e, 'final')}
            disabled={isLoading}
            className="btn-primary-mobile text-base py-4 px-6 gpu-accelerated mb-3"
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
                GARANTIR ANTES QUE ACABE
                <AlertTriangle className="ml-2 w-5 h-5" />
              </span>
            )}
          </Button>
          
          <p className="text-slate-300 text-xs">
            ⚡ Acesso imediato • 🛡️ Garantia 7 dias • 💎 Zero riscos • 🎯 Se paga no 1º cliente
          </p>
        </div>
      </section>

      {/* RODAPÉ MINIMALISTA */}
      <footer className="py-4 px-4 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-xs">
          <p>© 2024 Amanda Teixeira Oficial - Todos os direitos reservados</p>
          <p className="mt-1 text-xs">
            Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho de uma estratégia não deve ser interpretada como uma garantia de resultados.
          </p>
        </div>
      </footer>
    </main>
  )
}
