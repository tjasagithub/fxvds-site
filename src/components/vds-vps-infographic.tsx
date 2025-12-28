
import React from 'react';
import { Server, Users, User, Cpu, Zap } from 'lucide-react';
import type { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['vdsVsVps']['infographic'];

const VdsVpsInfographic = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* VPS Side */}
      <div className="flex flex-col items-center p-6 rounded-lg bg-card/20 border border-border/50">
        <h3 className="text-2xl font-bold text-white mb-4">VPS</h3>
        <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">{dictionary.vpsLabel}</p>
        <div className="relative w-full aspect-video flex flex-col items-center justify-center">
            <Server className="w-24 h-24 text-gray-500 opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
                <Users className="w-12 h-12 text-gray-400" />
            </div>
             <div className="absolute top-8 left-4 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-5 h-5 text-yellow-500/50" />
            </div>
            <div className="absolute bottom-8 right-4 animate-pulse" style={{ animationDelay: '1s' }}>
                <Zap className="w-6 h-6 text-yellow-500/70" />
            </div>
        </div>
        <div className="w-full mt-4">
            <p className="text-sm text-center text-gray-400 font-medium">CPU / RAM</p>
            <div className="w-full bg-gray-700/50 rounded-full h-3 mt-2 overflow-hidden">
                <div className="bg-yellow-500/50 h-3 rounded-full animate-pulse" style={{ width: '60%', animation: 'pulse 3s infinite ease-in-out' }}></div>
            </div>
        </div>
      </div>

      {/* VDS Side */}
      <div className="flex flex-col items-center p-6 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="text-2xl font-bold text-primary mb-4">VDS</h3>
        <p className="text-sm font-semibold text-primary/70 mb-6 uppercase tracking-wider">{dictionary.vdsLabel}</p>
         <div className="relative w-full aspect-video flex flex-col items-center justify-center">
            <Server className="w-24 h-24 text-primary/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
                <User className="w-12 h-12 text-primary" />
            </div>
             <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                 <Cpu className="w-16 h-16 text-primary/80 animate-pulse" />
             </div>
        </div>
         <div className="w-full mt-4">
            <p className="text-sm text-center text-primary/80 font-medium">CPU / RAM</p>
            <div className="w-full bg-primary/10 rounded-full h-3 mt-2">
                <div className="bg-primary h-3 rounded-full" style={{ width: '100%' }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VdsVpsInfographic;
