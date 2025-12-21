'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Choose Your Power', href: '/#pricing' },
  { name: 'Why Choose Us', href: '/#why-us' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      if (!isHomePage) {
        setActiveSection('');
        return;
      }

      const sections = navLinks.map(link => {
        const id = link.href.substring(2); // remove '/#'
        return id ? document.getElementById(id) : null;
      });
      let currentSection = 'home';

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            currentSection = section.id;
          }
        }
      });

      if(window.scrollY < 200) currentSection = 'home';

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const NavLink = ({ href, name, id }: { href: string; name: string; id: string }) => (
    <Link href={href} passHref>
      <span
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (href.startsWith('/#')) {
            if (isHomePage) {
              e.preventDefault();
              const targetId = href.substring(2);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
                });
              }
            }
          }
        }}
        className={cn(
          'relative text-sm font-medium text-gray-300 transition-colors hover:text-white',
          'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 after:origin-left',
          activeSection === id && isHomePage && 'text-white after:scale-x-100'
        )}
      >
        {name}
      </span>
    </Link>
  );

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'bg-black/60 backdrop-blur-md shadow-lg' : 'bg-transparent'
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="FXVDS Home" className="shrink-0">
          <Logo className="h-8 w-32" />
        </Link>
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.href} name={link.name} id={link.href.substring(2)} />
          ))}
        </nav>
        <div className="hidden items-center space-x-4 md:flex">
          <Button asChild>
            <Link href="/#pricing">Start Free Trial</Link>
          </Button>
        </div>
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/90 border-l-border/50 backdrop-blur-lg">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8 flex items-center justify-between">
                  <Link href="/" aria-label="FXVDS Home" className="shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo className="h-8 w-32" />
                  </Link>
                </div>
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.name} href={link.href} name={link.name} id={link.href.substring(2)} />
                  ))}
                </nav>
                <div className="mt-auto">
                   <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/#pricing">Start Free Trial</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
