
import Link from 'next/link';
import Logo from '@/components/logo';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Logo className="h-10 w-40" />
            <p className="text-sm text-gray-400 max-w-sm">
              High-performance Forex VDS for traders who demand the best.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/#why-us" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Plans & Pricing</Link></li>
              <li><Link href="/#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <Link href="/legal">
                <h3 className="font-semibold text-white mb-4 hover:text-primary transition-colors">
                Legal
                </h3>
            </Link>
            <ul className="space-y-2">
              <li><Link href="/legal#privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal#terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal#cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
              <li><Link href="/legal#impressum" className="text-sm text-gray-400 hover:text-white transition-colors">Impressum</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FXVDS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
