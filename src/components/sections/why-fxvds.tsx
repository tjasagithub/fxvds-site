
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Trophy, LockKeyhole, Terminal, Rocket, Users, CheckCircle, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['whyFxvds'];

const WhyFxvds = ({ dictionary }: { dictionary: Dictionary }) => {
  const features: { icon: LucideIcon; title: string; description: string }[] = dictionary.features.map(f => {
    let icon = Zap;
    switch(f.icon) {
      case 'ShieldCheck': icon = ShieldCheck; break;
      case 'Trophy': icon = Trophy; break;
      case 'LockKeyhole': icon = LockKeyhole; break;
      case 'Terminal': icon = Terminal; break;
      case 'Rocket': icon = Rocket; break;
    }
    return { ...f, icon };
  });

  const stats = dictionary.stats.map(s => {
    let icon = Users;
    switch(s.icon) {
      case 'Server': icon = Server; break;
      case 'CheckCircle': icon = CheckCircle; break;
    }
    return { ...s, icon };
  });


  return (
    <section id="why-us" className="py-20 md:py-32 bg-gradient-to-b from-background to-blue-950/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-4">
                        <stat.icon className="h-10 w-10 text-primary" />
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
