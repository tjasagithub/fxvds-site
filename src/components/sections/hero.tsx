'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, Zap, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-bull');

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-[70%_50%]"
            style={{
              transform: `scale(${1 + scrollY * 0.0001})`,
              filter: 'brightness(0.7)',
            }}
            quality={90}
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl text-left">

            <div className="mb-12 grid grid-cols-3 gap-4 text-center">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="flex flex-col items-center gap-2">
                  <highlight.icon className="h-7 w-7 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-white">{highlight.title}</p>
                    <p className="text-xs text-gray-400">{highlight.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              High-Performance Forex VDS
            </p>
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
    </section>
  );
};

export default Hero;
