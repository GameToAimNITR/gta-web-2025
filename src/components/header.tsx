
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Gamepad2,
  Brain,
  Info,
  Joystick,
  Component,
  Trophy,
  Users,
  Send,
  FileText,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLenis } from '@studio-freight/react-lenis';
// import type { ElementType } from 'react';
import type { ComponentType } from 'react';
import { useRouter } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  // Icon: ElementType;
  Icon: ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { href: '/#about', label: 'About', Icon: Info },
  { href: '/#games', label: 'Games', Icon: Joystick },
  { href: '/#showcase', label: 'Showcase', Icon: Component },
  { href: '/#achievements', label: 'Achievements', Icon: Trophy },
  { href: '/#contact', label: 'Contact', Icon: Send },
  { href: '/#member-access', label: 'Members', Icon: Users },
  { href: '/form-builder', label: 'Form Builder', Icon: FileText },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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
    if (pathname !== '/') {
      setActiveLink(pathname);
      return;
    }

    const handleScroll = () => {
        if (isNavigatingRef.current) return;

        const scrollPosition = (lenis?.scroll || 0) + window.innerHeight / 2;
        let currentSectionId = '';

        const sections = navLinks
          .map(link => document.getElementById(link.href.substring(2)))
          .filter(Boolean) as HTMLElement[];

        for (const section of sections) {
            if (section.offsetTop <= scrollPosition) {
                currentSectionId = '/#' + section.id;
            }
        }

        // Handle hero section edge case
        if ((lenis?.scroll || 0) < window.innerHeight / 2) {
          currentSectionId = '/#about'; // Or a dedicated hero link
        }

        setActiveLink(currentSectionId);
    };

    if (lenis) {
        lenis.on('scroll', handleScroll);
    }

    // Set initial state
    handleScroll();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, lenis]);

  const handleNavLinkClick = (e: React.MouseEvent, href: string, isExternal = false) => {
    if (isSheetOpen) setIsSheetOpen(false);

    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => document.body.classList.remove('is-nav-scrolling'), 800);

      const targetId = href.substring(1);
      lenis?.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
        onComplete: () => {
          isNavigatingRef.current = false;
        }
      });

      isNavigatingRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => { isNavigatingRef.current = false; }, 1500);

      // Immediately set active link on click for better responsiveness
      setActiveLink(href);
    } else if (!isExternal) {
        // Normal Next.js navigation for other internal pages
        router.push(href);
    }
  };

  const NavLinkComponent = ({ href, label, Icon, isMobile = false, isExternal = false }: NavLink & { isMobile?: boolean }) => {
    const isActive = pathname.startsWith(href) && href !== '/';
    const isHomepageHashLink = activeLink === href && pathname === '/';
    const finalIsActive = isActive || isHomepageHashLink;

    const linkProps = {
      "data-href": href,
      onClick: (e: React.MouseEvent) => handleNavLinkClick(e, href, isExternal),
      className: cn(
        isMobile ? 'flex items-center gap-3 text-lg font-semibold' : 'cyber-nav-link',
        finalIsActive && !isMobile && 'text-primary-foreground'
      ),
      ...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })
    };

    return (
      <Link href={href} {...linkProps}>
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
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                The main navigation links for the website.
              </SheetDescription>
              <div className="flex flex-col h-full">
                <nav className="flex-1 space-y-4 pt-6">
                  {navLinks.map((link) => (
                    <NavLinkComponent key={`${link.href}-mobile`} {...link} isMobile />
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
