import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is a Forex VDS?',
    answer:
      'A Forex Virtual Dedicated Server (VDS) is a private server optimized for trading. It runs 24/7, independent of your own computer, providing a stable, high-speed environment to run your trading platforms and automated strategies (Expert Advisors) without interruptions.',
  },
  {
    question: 'What’s the difference between a VDS and a VPS?',
    answer:
      'A Virtual Dedicated Server (VDS) provides dedicated resources (CPU, RAM) from a physical server, offering more stable performance than a Virtual Private Server (VPS), which shares resources among multiple users. For trading, VDS is superior as it prevents performance degradation from other users’ activities.',
  },
  {
    question: 'VDS and VPS make sense — but what exactly is a VPN, and do I need one?',
    answer:
      'A VPN (Virtual Private Network) is an encrypted security layer that creates a private connection between you and your VDS. It protects your data, trading activity, and server access from external threats — even on unsecured networks.',
  },
  {
    question: 'Does a VPN really protect me, even if someone gets my login details?',
    answer: (
      <>
        <p>
          Yes — and this is where the VPN truly matters. With FXVDS, access to your server is protected not only by login credentials, but also by a private VPN tunnel. That means even if someone somehow obtains your username and password, they still cannot access your server unless they are connected through the VPN.
        </p>
      </>
    ),
  },
  {
    question: 'Can I use FXVDS for automated or 24/7 trading?',
    answer: (
      <>
        <p className="mb-4">
          Absolutely. Our VDS is designed for 24/7 operation, making it ideal for running automated trading strategies, Expert Advisors (EAs), and trading bots without interruption, even when your personal computer is off.
        </p>
        <p>VDS gives you power,</p>
        <p>VPN gives you privacy,</p>
        <p>and together they give you peace of mind while trading.</p>
      </>
    ),
  },
  {
    question: 'Why are FXVDS servers so affordable?',
    answer: (
      <>
        <p className="mb-4">
          We own and operate our own hardware and have optimized our infrastructure specifically for forex trading. By eliminating unnecessary overhead and focusing only on performance that matters, we are able to offer institutional-grade power at a competitive price.
        </p>
        <p>
          All FXVDS servers are located in Germany, ensuring reliable infrastructure, strong data protection standards, and low-latency connections for European traders.
        </p>
      </>
    )
  },
  {
    question: 'Does server location matter?',
    answer: (
      <>
        <p className="mb-4">
          Yes — but not as much as many providers claim. Server performance is far more important than simply being “close” to a broker. If a server is underpowered or unstable, trade execution will be slow regardless of its location. High-frequency CPUs, fast memory, and a stable infrastructure have a much greater impact on execution speed than distance alone.
        </p>
        <p>
          That said, FXVDS servers are located in Germany, offering an excellent balance of performance, reliability, and low-latency connections to major European trading infrastructure — at some of the most competitive prices available for dedicated trading servers.
        </p>
      </>
    ),
  },
  {
    question: 'What’s the difference between a Static IP and a Dedicated IP address?',
    answer:
      'A static IP is an address that does not change, which is important for brokers who may require a consistent IP for security. A dedicated IP is an address used only by you. All our plans include a static IP, and because your VDS is isolated, it functions as your dedicated IP.',
  },
  {
    question: 'Is FXVDS suitable for professional copy trading and trade mirroring software?',
    answer:
      'Yes. FXVDS is highly recommended for users running professional copy trading and trade mirroring solutions, including Anton Nel Mirror Trading Manager software and similar platforms. Dedicated CPU resources, stable performance, and 24/7 uptime ensure reliable trade replication across hundreds of connected follower accounts.',
  },
  {
    question: 'Why is a VDS important for mirror trading software?',
    answer:
      'Mirror trading software requires continuous connectivity, low execution delays, and consistent system performance. A dedicated VDS ensures the trading manager remains online at all times and can process trade signals reliably without interruptions caused by local system or internet issues.',
  },
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
                <AccordionContent className="text-gray-400 text-base prose prose-invert prose-p:text-gray-400">
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
