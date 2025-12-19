import { Send, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from './contact-form';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-t from-background to-blue-950/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Get in Touch</h2>
              <p className="text-lg text-gray-400">
                Have questions or need a custom solution? Our team is here to help.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Send className="h-6 w-6 text-primary" />
                <span className="text-gray-300">Telegram: <a href="https://t.me/fxvds_support" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">@fxvds_support</a></span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-gray-300">Email: <a href="mailto:info@fxvds.com" className="font-semibold text-white hover:underline">info@fxvds.com</a></span>
              </div>
            </div>
          </div>
          <div>
            <Card className="bg-card/50 border-border/70">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
