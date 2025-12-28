'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, Zap, Lock, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Snowfall from '@/components/ui/snowfall';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['hero'];

const Hero = ({ dictionary }: { dictionary: Dictionary }) => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSnowVisible, setIsSnowVisible] = useState(false);

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

      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        setIsSnowVisible(rect.bottom > 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      motionQuery.removeEventListener('change', handleChange);
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-bull');
  
  const parallaxStyle = prefersReducedMotion || isMobile ? {} : {
    transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
  };

  const imageScaleStyle = prefersReducedMotion || isMobile ? {} : {
    transform: `scale(${1 + scrollY * 0.0001}) translateZ(0)`,
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col">
       {isSnowVisible && !isMobile && <Snowfall />}
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
            
            <div className="relative mb-8 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 shadow-lg max-w-md animate-in fade-in-50 duration-700">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <Info className="h-6 w-6 inline-block mr-3 text-primary" />
                    {dictionary.promo.title}
                </h2>
                <p className="text-gray-300 text-base mt-2">{dictionary.promo.subtitle}</p>
                <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p>{dictionary.promo.note}</p>
                </div>
            </div>

            <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-tight text-white md:text-7xl"
              dangerouslySetInnerHTML={{ __html: dictionary.title }}
            />
            <p className="mb-8 max-w-lg text-lg text-gray-300">
              {dictionary.subtitle}
            </p>
            <div className="flex space-x-4 mb-16">
              <Button asChild size="lg">
                <Link href="#pricing">{dictionary.cta.startTrial}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#pricing">{dictionary.cta.viewPlans}</Link>
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
