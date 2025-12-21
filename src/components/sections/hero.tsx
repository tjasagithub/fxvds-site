'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, Zap, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Snowfall from '@/components/ui/snowfall';

const highlights: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}[] = [
  {
    icon: CalendarDays,
    title: '7 Day Free Trial',
    subtitle: 'No payment upfront',
  },
  {
    icon: Zap,
    title: 'Guaranteed Performance',
    subtitle: 'Reserved CPU & RAM',
  },
  {
    icon: Lock,
    title: 'Private Connection',
    subtitle: 'Isolated & secure environment',
  },
];

const SantaHatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-8 w-8 inline-block mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path
      d="M32.9,64.8c0,0-19.4,3.2-19.4,19.4c0,10.6,8.7,19.3,19.4,19.3s19.4-8.7,19.4-19.3 C52.3,68,32.9,64.8,32.9,64.8z"
      fill="#FFF"
      stroke="#FFF"
    />
    <path
      d="M 95,35 C 95,35 95,35.3 95,36 C 95,49.2 84,60 71,60 C 60,60 55,51 55,51 C 55,51 60,49 63,46 C 66,43 70,36 70,36 C 70,36 40,25 25,35 C 10,45 20,65 20,65 L 45,65"
      stroke="#E53935"
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSnowVisible, setIsSnowVisible] = useState(false);

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

  const heroImageId = isMobile ? 'hero-bull-mobile' : 'hero-bull';
  const heroImage = PlaceHolderImages.find((img) => img.id === heroImageId);
  
  const parallaxStyle = prefersReducedMotion ? {} : {
    transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
  };

  const imageScaleStyle = prefersReducedMotion ? {} : {
    transform: `scale(${1 + scrollY * 0.0001}) translateZ(0)`,
  };

  return (
    <section id="home" ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
       {isSnowVisible && <Snowfall />}
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
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-20 flex flex-1 items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl text-left">
            
            <div className="relative mb-8 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 shadow-lg max-w-md animate-in fade-in-50 duration-700">
                
                <h2 className="text-xl font-bold text-white flex items-center">
                    <SantaHatIcon />
                    Santa’s Trading Boost
                </h2>
                <p className="text-primary font-semibold text-lg mt-2">7 days free trial + 50% off the first month</p>
                <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p>Use code: <code className="font-mono bg-white/10 px-1 py-0.5 rounded">HOLIDAY50</code></p>
                    <p>Valid until January 3rd</p>
                </div>
            </div>

            <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              Trade without limits.
              <br />
              Power that’s yours.
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-300">
              Experience unmatched speed, reliability, and stability with virtual dedicated servers built for traders who demand the best.
            </p>
            <div className="flex space-x-4">
              <Button asChild size="lg">
                <Link href="#pricing">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#pricing">View Plans</Link>
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
