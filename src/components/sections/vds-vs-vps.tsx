
import { CheckCircle2 } from 'lucide-react';
import type { getDictionary } from '@/lib/get-dictionary';
import VdsVpsInfographic from '../vds-vps-infographic';

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

        <div className="mt-16 max-w-5xl mx-auto">
          <VdsVpsInfographic dictionary={dictionary.infographic} />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div className="bg-card/30 border border-border/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">{dictionary.vps.title}</h3>
            <ul className="space-y-3">
              {dictionary.vps.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gray-500 mt-0.5 shrink-0" />
                  <span className="text-gray-400">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-lg ring-1 ring-primary/30">
            <h3 className="text-2xl font-bold text-primary mb-4">{dictionary.vds.title}</h3>
            <ul className="space-y-3">
              {dictionary.vds.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary/80 mt-0.5 shrink-0" />
                  <span className="text-white">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white">{dictionary.benefits.title}</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {dictionary.benefits.points.map((point, index) => (
                    <div key={index} className="bg-card/20 p-4 rounded-lg">
                        <p className="font-semibold text-gray-300">{point}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default VdsVsVps;
