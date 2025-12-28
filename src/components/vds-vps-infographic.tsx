
import React from 'react';
import { Server, Users, User, Cpu, Zap, Shield, Minus, Plus } from 'lucide-react';
import type { getDictionary } from '@/lib/get-dictionary';
import { cn } from '@/lib/utils';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['vdsVsVps']['infographic'];

const VdsVpsInfographic = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* VPS Side */}
      <div className="flex flex-col items-center p-6 rounded-lg bg-card/20 border border-border/50 h-full">
        <h3 className="text-2xl font-bold text-white">VPS</h3>
        <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">{dictionary.vpsLabel}</p>
        <div className="relative w-full aspect-[4/3] flex flex-col items-center justify-center bg-black/20 p-4 rounded-md border border-border/30 overflow-hidden">
            <Server className="w-48 h-48 text-gray-700/50 absolute -right-8 -bottom-8" />
            
            {/* Users */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 p-1.5 rounded bg-gray-800/50 border border-gray-700/50 text-xs text-gray-400"><Users className="w-4 h-4 text-gray-500" /> <span>User 1</span></div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-gray-800/50 border border-gray-700/50 text-xs text-gray-400"><Users className="w-4 h-4 text-gray-500" /> <span>User 2</span></div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-gray-800/50 border border-gray-700/50 text-xs text-gray-400"><Users className="w-4 h-4 text-gray-500" /> <span>User 3</span></div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-gray-800/50 border border-gray-700/50 text-xs text-gray-400"><Users className="w-4 h-4 text-gray-500" /> <span>...etc</span></div>
            </div>

            {/* Contention Sparks */}
            <Zap className="w-5 h-5 text-yellow-500/50 absolute top-1/2 left-1/2 animate-ping" style={{ animationDuration: '3s' }} />
            <Zap className="w-6 h-6 text-red-500/50 absolute top-1/4 right-1/4 animate-ping" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />

            {/* Resource Bars */}
            <div className="absolute bottom-4 right-4 w-1/3">
                <p className="text-xs text-gray-400 font-medium">CPU / RAM</p>
                <div className="w-full bg-gray-700/50 rounded-full h-3 mt-2 overflow-hidden">
                    <div className="bg-yellow-500/50 h-3 rounded-full animate-pulse" style={{ width: '60%', animation: 'pulse 3s infinite ease-in-out' }}></div>
                </div>
            </div>
        </div>
        <ul className="mt-6 space-y-3 w-full">
            {(dictionary.vpsPoints || []).map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                    <Minus className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                    <span className="text-gray-400">{point}</span>
                </li>
            ))}
        </ul>
      </div>

      {/* VDS Side */}
      <div className="flex flex-col items-center p-6 rounded-lg bg-primary/5 border border-primary/20 h-full">
        <h3 className="text-2xl font-bold text-primary">VDS</h3>
        <p className="text-sm font-semibold text-primary/70 mb-6 uppercase tracking-wider">{dictionary.vdsLabel}</p>
        <div className="relative w-full aspect-[4/3] flex flex-col items-center justify-center bg-black/20 p-4 rounded-md border border-primary/20 overflow-hidden">
            <Server className="w-48 h-48 text-primary/10 absolute -right-8 -bottom-8" />
            
            {/* Single User */}
            <div className="absolute top-4 left-4 flex items-center gap-2 p-2 rounded bg-primary/10 border border-primary/20 text-sm text-primary/90">
                <User className="w-5 h-5" /> <span>You</span>
            </div>

            {/* Shield Icon */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <Shield className="w-20 h-20 text-primary/30" />
             </div>

            {/* Resource Bars */}
            <div className="absolute bottom-4 right-4 w-1/3">
                <p className="text-xs text-primary/80 font-medium">CPU / RAM</p>
                <div className="w-full bg-primary/10 rounded-full h-3 mt-2">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
        <ul className="mt-6 space-y-3 w-full">
            {(dictionary.vdsPoints || []).map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                    <Plus className="h-4 w-4 text-primary/80 mt-0.5 shrink-0" />
                    <span className="text-white">{point}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default VdsVpsInfographic;
