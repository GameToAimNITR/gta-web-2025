
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Joystick,
  Component,
  Trophy,
  Users,
  Send,
  Info
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLenis } from '@studio-freight/react-lenis';
import type { ComponentType } from 'react';

interface NavLink {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
  { href: '/#about', label: 'About', Icon: Info },
  { href: '/#games', label: 'Games', Icon: Joystick },
  { href: '/#achievements', label: 'Achievements', Icon: Trophy },
  { href: '/#member-access', label: 'Members', Icon: Users },
  { href: '/#contact', label: 'Contact', Icon: Send },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Effect for sliding underline
  useEffect(() => {
    if (navRef.current && activeLink) {
      const activeLinkElement = navRef.current.querySelector(`[data-href="${activeLink}"]`) as HTMLElement;
      if (activeLinkElement) {
        const { offsetLeft, offsetWidth } = activeLinkElement;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
      } else {
        setUnderlineStyle({ ...underlineStyle, opacity: 0 });
      }
    } else {
      setUnderlineStyle({ ...underlineStyle, opacity: 0 });
    }
  }, [activeLink, navRef, pathname]);

  // Effect for setting active link based on scroll/path
  useEffect(() => {
    const isHomePage = pathname === '/';
    
    if (!isHomePage) {
        const matchingLink = navLinks.find(link => pathname.startsWith(link.href));
        setActiveLink(matchingLink?.href || pathname);
        return;
    }

    const handleScroll = () => {
        const scrollPosition = (lenis?.scroll || 0) + window.innerHeight / 2;
        let currentSectionId = '';

        const sections = navLinks
          .map(link => link.href.startsWith('/#') ? document.getElementById(link.href.substring(2)) : null)
          .filter(Boolean) as HTMLElement[];

        for (const section of sections) {
            if (section.offsetTop <= scrollPosition) {
                currentSectionId = '/#' + section.id;
            }
        }
        
        setActiveLink(currentSectionId);
    };

    if (lenis && isHomePage) {
        lenis.on('scroll', handleScroll);
        handleScroll(); // Set initial state
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, [pathname, lenis]);

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (isSheetOpen) setIsSheetOpen(false);

    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => document.body.classList.remove('is-nav-scrolling'), 800);

      const targetId = href.substring(1);
      lenis?.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
      });
      setActiveLink(href);
    } else if (href.startsWith('/#')) {
        e.preventDefault();
        router.push(`/${href}`);
    }
  };

  const NavLinkComponent = ({ href, label, Icon, isMobile = false }: NavLink & { isMobile?: boolean }) => {
    const finalIsActive = activeLink === href;

    if (isMobile) {
      return (
        <Link 
          href={href}
          data-href={href}
          onClick={(e) => handleNavLinkClick(e, href)}
          className={cn(
            'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-primary/10 hover:border-l-2 hover:border-primary',
            finalIsActive && 'bg-primary/20 border-l-2 border-primary'
          )}
        >
          <Icon className={cn(
            "h-5 w-5 transition-colors",
            finalIsActive ? 'text-primary' : 'text-muted-foreground'
          )} />
          <span className={cn(
            "text-lg font-semibold transition-colors",
            finalIsActive ? 'text-primary' : 'text-foreground'
          )}>{label}</span>
        </Link>
      );
    }

    return (
      <Link 
        href={href}
        data-href={href}
        onClick={(e) => handleNavLinkClick(e, href)}
        className={cn(
            'cyber-nav-link',
            finalIsActive && 'text-primary-foreground'
        )}
      >
        <Icon className={cn("h-4 w-4 transition-colors group-hover:text-primary", finalIsActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
        <span className="nav-link-text">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 cyber-header animate-entry animate-slide-in-top is-visible">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/GTALogo.svg"
              alt="GTA Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-lg tracking-wider">
              GAME TO AIM
            </span>
          </Link>
        </div>
        <nav ref={navRef} className="relative hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkComponent key={link.href} {...link} />
          ))}
          <div className="sliding-box" style={underlineStyle} />
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] cyber-header border-l-border/60">
              <div className="flex flex-col h-full">
                <div className="mb-6 pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/GTALogo.svg"
                      alt="GTA Logo"
                      width={32}
                      height={32}
                    />
                    <span className="font-bold text-lg tracking-wider">GAME TO AIM</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Navigation Menu</p>
                </div>
                <nav className="flex-1 space-y-2 pt-2">
                  {navLinks.map((link, index) => (
                    <div
                      key={`${link.href}-mobile`}
                      className="animate-entry animate-slide-in-left is-visible"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <NavLinkComponent {...link} isMobile />
                    </div>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
