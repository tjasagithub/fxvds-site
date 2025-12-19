import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is a Forex VDS?',
    answer: 'A Forex Virtual Dedicated Server (VDS) is a private server optimized for trading. It runs 24/7, independent of your own computer, providing a stable, high-speed environment to run your trading platforms and automated strategies (Expert Advisors) without interruptions.',
  },
  {
    question: 'What’s the difference between a VDS and a VPS?',
    answer: 'A Virtual Dedicated Server (VDS) provides dedicated resources (CPU, RAM) from a physical server, offering more stable performance than a Virtual Private Server (VPS), which shares resources among multiple users. For trading, VDS is superior as it prevents performance degradation from other users\' activities.',
  },
  {
    question: 'What is an encrypted security layer, and why do I need it?',
    answer: 'Our encrypted security layer uses a VPN tunnel to create a private, secure connection to your VDS. This protects your trading activity and personal data from external threats, ensuring your strategies and account information remain confidential.',
  },
  {
    question: 'Why are FXVDS servers so affordable?',
    answer: 'We own and operate our hardware and have optimized our infrastructure specifically for forex trading. By eliminating unnecessary overhead and focusing on core performance, we can offer institutional-grade power at a competitive price.',
  },
  {
    question: 'Does server location matter?',
    answer: 'Yes. Server location is critical for reducing latency—the time it takes for your trades to reach your broker. Our servers in Germany are strategically located to provide low-latency connections to major European liquidity providers, resulting in faster execution.',
  },
  {
    question: 'What’s the difference between a Static IP and a Dedicated IP address?',
    answer: 'A static IP is an address that does not change, which is important for brokers who may require a consistent IP for security. A dedicated IP is an address used only by you. All our plans include a static IP, and because your VDS is isolated, it functions as your dedicated IP.',
  },
  {
    question: 'Can I use FXVDS for automated or 24/7 trading?',
    answer: 'Absolutely. Our VDS is designed for 24/7 operation, making it ideal for running automated trading strategies, Expert Advisors (EAs), and trading bots without interruption, even when your personal computer is off.',
  },
  {
    question: 'Is FXVDS suitable for professional copy trading and trade mirroring software?',
    answer: 'Yes. FXVDS is highly recommended for users running professional copy trading and trade mirroring solutions, including Anton Nel Mirror Trading Manager software and similar platforms. Dedicated CPU resources, stable performance, and 24/7 uptime ensure reliable trade replication across hundreds of connected follower accounts.',
  },
  {
    question: 'Why is a VDS important for mirror trading software?',
    answer: 'Mirror trading software requires continuous connectivity, low execution delays, and consistent system performance. A dedicated VDS ensures the trading manager remains online at all times and can process trade signals reliably without interruptions caused by local system or internet issues.',
  }
];

const Faq = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/70">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>Got more questions? <a href="#contact" className="text-primary hover:underline">Feel free to reach out.</a></p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
