
import {
  Server,
  PlayCircle,
  Users,
  Network,
  Lock,
  MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['includedFeatures'];

const IncludedFeatures = ({ dictionary }: { dictionary: Dictionary }) => {
  const features: { icon: LucideIcon; title: string }[] = [
    { icon: Server, title: dictionary.features.os },
    { icon: Lock, title: dictionary.features.access },
    { icon: Network, title: dictionary.features.ip },
    { icon: PlayCircle, title: dictionary.features.autostart },
    { icon: Users, title: dictionary.features.compatibility },
    { icon: MapPin, title: dictionary.features.location },
  ];

  return (
    <section className="py-20 md:py-32 bg-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-300">
            {dictionary.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedFeatures;
