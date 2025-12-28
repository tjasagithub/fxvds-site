
import type { getDictionary } from '@/lib/get-dictionary';
import InlineVpsVdsSvg from '../InlineVpsVdsSvg';

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

        <div className="mt-8 max-w-5xl mx-auto">
          <InlineVpsVdsSvg />
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
