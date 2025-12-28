"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Snowfall = ({
  snowflakeCount = 150,
  className,
}: {
  snowflakeCount?: number;
  className?: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const snowflakes = useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: snowflakeCount }).map((_, i) => {
      const animationDuration = Math.random() * 10 + 15; // Slower: 15-25s
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${Math.random() * 10}s`,
        opacity: Math.random() * 0.4 + 0.3, // Opacity between 0.3 and 0.7
        transform: `scale(${Math.random() * 0.6 + 0.4})`, // Scale between 0.4 and 1.0
        filter: `blur(${Math.random() * 1.5}px)`, // Add blur for softness
      };
      return <div key={i} className={cn("snowflake", className)} style={style} />;
    });
  }, [snowflakeCount, className, isClient]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">{snowflakes}</div>;
};

export default Snowfall;
