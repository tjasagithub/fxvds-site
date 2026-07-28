'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, Zap, Lock, Info, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n.config';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['hero'];

const Hero = ({ dictionary, lang }: { dictionary: Dictionary, lang: Locale }) => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const promoRef = useRef<HTMLDivElement>(null);

  const highlights: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
  }[] = [
    {
      icon: CalendarDays,
      title: dictionary.highlights.trial.title,
      subtitle: dictionary.highlights.trial.subtitle,
    },
    {
      icon: Zap,
      title: dictionary.highlights.performance.title,
      subtitle: dictionary.highlights.performance.subtitle,
    },
    {
      icon: Lock,
      title: dictionary.highlights.connection.title,
      subtitle: dictionary.highlights.connection.subtitle,
    },
  ];

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleChange = () => setPrefersReducedMotion(motionQuery.matches);
    motionQuery.addEventListener('change', handleChange);

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0 });

    const currentRef = heroRef.current;
    if (currentRef) observer.observe(currentRef);

    const handleScroll = () => {
      if (isVisible) setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      motionQuery.removeEventListener('change', handleChange);
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);
  
  useEffect(() => {
    if (!isPromoVisible) return;
    
    const sectionEl = heroRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (promoRef.current && !promoRef.current.contains(event.target as Node)) {
        setIsPromoVisible(false);
      }
    };

    if (sectionEl) {
      sectionEl.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isPromoVisible]);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-bull');
  
  const parallaxStyle = prefersReducedMotion || isMobile ? {} : {
    transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
  };

  const imageScaleStyle = prefersReducedMotion || isMobile ? {} : {
    transform: `scale(${1 + scrollY * 0.0001}) translateZ(0)`,
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col">
       <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 md:hidden"
          style={{
            background: `
              linear-gradient(
                155deg,
                rgba(255,255,255,0.28) 0%,
                rgba(255,255,255,0.20) 18%,
                rgba(255,255,255,0.12) 35%,
                rgba(255,255,255,0.06) 55%,
                rgba(0,0,0,0) 75%
              )
            `,
          }}
        />
      
      {!isMobile ? (
        <div
          className="absolute inset-0 z-0"
          style={parallaxStyle}
        >
          {heroImage && (
            <div style={{ willChange: 'transform' }} className="h-full w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover object-[70%_50%]"
                style={imageScaleStyle}
                quality={90}
                priority
                data-ai-hint={heroImage.imageHint}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
         <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 to-background" />
      )}

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-20 flex flex-1 items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl text-left">
            
            <div className="mb-8 min-h-[140px] flex flex-col justify-center">
              {isPromoVisible ? (
                <div ref={promoRef} className="relative p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 shadow-lg max-w-md animate-in fade-in-50 duration-700">
                    <button onClick={() => setIsPromoVisible(false)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white rounded-full transition-colors hover:bg-white/10 z-10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close notice</span>
                    </button>
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <Info className="h-6 w-6 inline-block mr-3 text-primary" />
                        {dictionary.promo.earlyBirdTitle}
                    </h2>
                    <p className="text-gray-300 text-base mt-2">{dictionary.promo.earlyBirdBody}</p>
                    <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p>{dictionary.promo.earlyBirdNote}</p>
                    </div>
                </div>
                ) : (
                <div className="flex items-center justify-start animate-in fade-in-50 duration-700">
                    <Button variant="outline" size="sm" onClick={() => setIsPromoVisible(true)} className="bg-transparent border-primary/30 text-gray-300 hover:bg-primary/10 hover:text-white hover:border-primary/50">
                        <Info className="h-4 w-4 mr-2 text-primary/80" />
                        {dictionary.promo.earlyBirdTitle}
                    </Button>
                </div>
              )}
            </div>

            <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-tight text-white md:text-7xl"
              dangerouslySetInnerHTML={{ __html: dictionary.title }}
            />
            <p className="mb-8 max-w-lg text-lg text-gray-300">
              {(() => {
                const subtitleText = dictionary.subtitle;
                const highlightEn = "virtual dedicated servers";
                const highlightDe = "virtuellen dedizierten Servern";
                const highlightPhrase = lang === 'de' ? highlightDe : highlightEn;

                if (!subtitleText.includes(highlightPhrase)) {
                  return subtitleText;
                }

                const parts = subtitleText.split(highlightPhrase);

                return (
                  <>
                    {parts[0]}
                    <span
                      className="font-bold text-primary"
                    >
                      {highlightPhrase}
                    </span>
                    {parts[1]}
                  </>
                );
              })()}
            </p>
            <div className="flex space-x-4 mb-16">
              <Button asChild size="lg">
                <Link href="#pricing">{dictionary.cta.startTrial}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#why-us">{dictionary.cta.viewPlans}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20 pb-12">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl grid grid-cols-3 gap-8 text-left">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="flex items-center gap-3">
                  <highlight.icon className="h-7 w-7 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">{highlight.title}</p>
                    <p className="text-xs text-gray-400">{highlight.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
