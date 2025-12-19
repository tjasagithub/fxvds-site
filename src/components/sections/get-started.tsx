type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: 'Choose Your Plan',
    description: 'Select the VDS plan that best fits your trading needs.',
  },
  {
    title: 'We Prepare Everything',
    description: 'Once your order is confirmed, our team provisions and configures your server. Your secure login details are delivered straight to your email within 24–72 hours.',
  },
  {
    title: 'Start Trading',
    description: 'Connect to your VDS through a secure connection, install your trading platforms, and trade with confidence — 24/7.',
  },
];

const GetStarted = () => {
  return (
    <section id="get-started" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Get Started in 3 Simple Steps</h2>
          <p className="mt-4 text-lg text-gray-400">
            Launch your professional trading environment with FXVDS — simple, guided, and built for reliability.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
