import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Trophy, LockKeyhole, Terminal, Rocket, Users, CheckCircle, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FeatureCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: FeatureCard[] = [
  {
    icon: Zap,
    title: 'Built for Speed',
    description: 'Our infrastructure is optimized and uses high-frequency CPUs for ultra-fast strategy calculations.',
  },
  {
    icon: ShieldCheck,
    title: 'Unmatched Reliability',
    description: 'We use enterprise-grade hardware to ensure your trading is never interrupted.',
  },
  {
    icon: Trophy,
    title: 'Expertise You Can Trust',
    description: 'Founded by traders, for traders. We understand your needs.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure VPN Tunnel Connection',
    description: 'Each VDS is isolated on its own encrypted network.',
  },
  {
    icon: Terminal,
    title: 'Optimized for All Trading Platforms',
    description: 'MT4, MT5, cTrader, and more. Ready for any setup.',
  },
  {
    icon: Rocket,
    title: 'Blazing-Fast Trade Execution',
    description: 'NVMe SSD delivers 5–10× the speed of traditional SATA SSDs.',
  },
];

const stats = [
    {
        icon: Users,
        text: "Optimised for High-Volume Copy Trading"
    },
    {
        icon: Server,
        text: "Enterprise-Grade Hardware"
    },
    {
        icon: CheckCircle,
        text: "99.99% Uptime SLA"
    }
];

const WhyFxvds = () => {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-gradient-to-b from-background to-blue-950/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Why Choose FXVDS?</h2>
          <p className="mt-4 text-lg text-gray-400">
            We’re not just another hosting provider. We’re traders who built the platform we always wanted.
          </p>
        </div>

        <div className="mt-16 max-w-5xl mx-auto p-4 rounded-lg bg-card/50 border border-border/70">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg">
                        <stat.icon className="h-8 w-8 text-primary shrink-0" />
                        <span className="font-semibold text-white text-base">{stat.text}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/50 border-border/70 text-left p-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFxvds;
