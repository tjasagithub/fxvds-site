
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['faq'];

const Faq = ({ dictionary }: { dictionary: Dictionary }) => {
  const faqs = dictionary.questions;

  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">{dictionary.title}</h2>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/70">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base prose prose-invert prose-p:text-gray-400">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p dangerouslySetInnerHTML={{ __html: dictionary.moreQuestions.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
