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
      const animationDuration = Math.random() * 15 + 20; // Slower: 20-35s
      const initialX = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 20; // Horizontal drift between -10vw and +10vw

      const style: React.CSSProperties = {
        '--initial-x': `${initialX}vw`,
        '--drift-x': `${driftX}vw`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${Math.random() * 15}s`,
        opacity: Math.random() * 0.4 + 0.4, // Opacity between 0.4 and 0.8
        transform: `scale(${Math.random() * 0.7 + 0.5})`, // Scale between 0.5 and 1.2
        filter: `blur(${Math.random() * 1.5 + 0.5}px)`, // Add blur for softness
        width: `${Math.random() * 3 + 2}px`, // size between 2px and 5px
        height: `${Math.random() * 3 + 2}px`,
      };

      return <div key={i} className={cn("snowflake", className)} style={style} />;
    });
  }, [snowflakeCount, className, isClient]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">{snowflakes}</div>;
};

export default Snowfall;
