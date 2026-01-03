
import { getDictionary } from '@/lib/get-dictionary';
import { Lock } from 'lucide-react';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['securityHighlight'];

const SecurityHighlight = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-8 w-8 text-primary/80" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            {dictionary.headline}
          </h2>
          <p className="mt-3 text-lg text-gray-400">
            {dictionary.subtext}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecurityHighlight;
