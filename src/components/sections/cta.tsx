import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Cta = () => {
  return (
    <section id="cta" className="py-20 md:py-32 bg-blue-950/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
            Ready to Elevate Your Trading?
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Experience the difference of a professional trading environment. Start your free trial today and trade with confidence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg">
              <Link href="#pricing">Start Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#pricing">Compare Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
