
import {
  Server,
  PlayCircle,
  Users,
  Network,
  Lock,
  MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  title: string;
};

const features: Feature[] = [
  { icon: Server, title: 'Windows Server 2025 OS' },
  { icon: PlayCircle, title: 'MT4 / MT5 auto-startup tools' },
  { icon: Users, title: 'Any broker, any Expert Advisor' },
  { icon: Network, title: 'Static IP address' },
  { icon: Lock, title: 'Protected remote access' },
  { icon: MapPin, title: 'Server location: Germany' },
];

const IncludedFeatures = () => {
  return (
    <section className="py-20 md:py-32 bg-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-300">
            Every plan is packed with enterprise-grade features to guarantee performance and peace of mind.
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
