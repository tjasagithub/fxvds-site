
'use client';

import { Separator } from '@/components/ui/separator';

const platforms = [
  'MetaTrader 4',
  'MetaTrader 5',
  'cTrader',
  'Mirror Trading Manager',
  'TradingView',
  'NinjaTrader',
  'Thinkorswim',
  'Interactive Brokers',
  'Binance',
  'Bybit',
  'Deribit',
];

const PlatformSlider = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">
            Built for the tools professional traders use
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 bg-primary/70 rounded-full" />
        </div>
      </div>
      
      <div className="relative mt-12 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="fx-ticker">
            <div className="group flex w-max">
                <div className="fx-ticker-track flex items-center shrink-0">
                  {[...platforms, ...platforms].map((platform, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-8 py-2 text-lg font-medium text-gray-300 transition-colors hover:text-white cursor-default">
                        {platform}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-primary/50" />
                    </div>
                  ))}
                </div>
            </div>
        </div>

        <div className="hidden motion-reduce:flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
           {platforms.map((platform, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="px-4 py-2 text-lg font-medium text-gray-300">
                {platform}
              </span>
               {index < platforms.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-primary/50 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
       <div className="container mx-auto px-4 md:px-6 mt-12 text-center">
         <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          All trademarks are the property of their respective owners. FXVDS is not affiliated with or endorsed by these companies.
        </p>
      </div>
    </section>
  );
};

export default PlatformSlider;
