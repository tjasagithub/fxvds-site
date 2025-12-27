
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['cta'];

const Cta = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <section id="cta" className="py-20 md:py-32 bg-blue-950/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
            {dictionary.title}
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            {dictionary.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg">
              <Link href="#pricing">{dictionary.startTrial}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#pricing">{dictionary.comparePlans}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
