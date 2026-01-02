'use client';

import type { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['vdsVsVps'];

const VdsVsVps = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section id="vds-vs-vps" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {dictionary.intro}
          </p>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">

            {/* VPS Column */}
            <div className="flex flex-col p-4">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-400">VPS</h3>
                <p className="text-sm text-gray-500">{dictionary.infographic.vpsSubtitle}</p>
              </div>
              <div className="relative my-8 flex items-center justify-center min-h-[200px]">
                 <Image src="https://lmhnfvimfkytxnocjkgk.supabase.co/storage/v1/object/public/FXVDS/1_VPS.webp" alt="VPS server illustration" width={400} height={200} className="max-w-full h-auto" />
              </div>
              <div className="mt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">{dictionary.infographic.vpsPower}</p>
                  <div className="w-full h-5 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-slate-500 to-slate-400 animate-vps-power-fluctuation" />
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-gray-300 list-disc list-inside">
                  {dictionary.infographic.vpsPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            </div>

            {/* VDS Column - with a divider for medium screens and up */}
            <div className="flex flex-col p-4 md:border-l md:border-border/50 mt-12 md:mt-0">
               <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-primary">VDS</h3>
                <p className="text-sm text-yellow-600">{dictionary.infographic.vdsSubtitle}</p>
              </div>
               <div className="relative my-8 flex items-center justify-center min-h-[200px]">
                 <Image src="https://lmhnfvimfkytxnocjkgk.supabase.co/storage/v1/object/public/FXVDS/2_VDS.webp" alt="VDS server illustration" width={400} height={200} className="max-w-full h-auto" />
              </div>
              <div className="mt-6">
                <div className="space-y-2">
                  <p className="text-sm text-primary">{dictionary.infographic.vdsPower}</p>
                  <div className="w-full h-5 rounded-full bg-gray-800">
                    <div className="h-full w-full bg-gradient-to-r from-primary to-yellow-400" />
                  </div>
                </div>
                 <ul className="mt-6 space-y-3 text-gray-200 list-disc list-inside">
                   {dictionary.infographic.vdsPoints.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            </div>
            
          </div>
        </div>
        
        <style jsx>{`
            @keyframes vps-power-fluctuation {
                0% { width: 65%; }
                25% { width: 55%; }
                50% { width: 75%; }
                75% { width: 60%; }
                100% { width: 65%; }
            }
            .animate-vps-power-fluctuation {
                animation: vps-power-fluctuation 6s ease-in-out infinite;
            }
        `}</style>

      </div>
    </section>
  );
};

export default VdsVsVps;
