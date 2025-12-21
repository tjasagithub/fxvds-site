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
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 8 + 7}s`, // Slower animation
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.2,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
      };
      return <div key={i} className={cn("snowflake", className)} style={style} />;
    });
  }, [snowflakeCount, className, isClient]);

  if (!isClient) {
    return null;
  }

  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">{snowflakes}</div>;
};

export default Snowfall;
