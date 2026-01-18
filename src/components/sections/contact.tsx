
'use client';

import { Mail, Phone, User, Handshake, UserPlus, Instagram, Linkedin, Users } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Typewriter from '@/components/typewriter';
import Link from 'next/link';

const presidentInfo = {
  role: 'President',
  name: 'Bidyendu Das',
  email: 'dasbidyendu22@gmail.com',
  phone: '+91-8018108430',
};

const JOIN_US_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfaKcVCfLCq4Nt5klTXbhhFj6ox1dpbwPSeGUJQbCbhN7iOuQ/viewform?usp=sf_link';
const COLLABORATE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeEz-xeGZA0Av_0CWYYADY--ZgLh8Pt2YTkI9QF5et8IuQRWw/viewform?usp=header';
const INSTAGRAM_URL = 'https://www.instagram.com/game.to.aim?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
const LINKEDIN_URL = 'https://www.linkedin.com/company/game-to-aim/ ';
const COMMUNITY_URL = 'https://chat.whatsapp.com/J5yYZf1OL6rL6VOS1iYKnL';


export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-12 md:py-16 lg:py-24 px-4 flex items-center justify-center min-h-screen parallax-section">
      <div className={cn("terminal-container w-full max-w-5xl", { "is-active": isVisible })}>
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <p className="text-sm text-muted-foreground font-code">/dev/tty.contact</p>
        </div>
        <div className="terminal-body space-y-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">
              <Typewriter text="Get In Touch" speed={50} delay={isVisible ? 500 : 99999} />
            </h2>
            <p className={cn("mt-4 text-lg text-muted-foreground animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.2s' }}>
              Ready to create the future? Connect with us.
            </p>
          </div>
          
          <div className={cn("max-w-4xl mx-auto p-4 md:p-6 border border-primary/20 bg-card/50 backdrop-blur-sm rounded-lg animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-12 gap-y-4 text-center">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-bold text-lg">{presidentInfo.name}</span>
                  <span className="text-sm text-muted-foreground"> ({presidentInfo.role})</span>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${presidentInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">{presidentInfo.email}</a>
              </div>
               <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${presidentInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{presidentInfo.phone}</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className={cn("flex flex-col md:flex-row items-center gap-8 animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '1.8s' }}>
              <Link href={JOIN_US_FORM_URL} target="_blank" rel="noopener noreferrer" className="contact-card-button group">
                <UserPlus className="w-12 h-12 text-accent transition-all duration-300 group-hover:scale-110" />
                <span className="font-bold text-lg mt-2">Join Us</span>
                <span className="text-sm text-muted-foreground mt-1">Become a member</span>
              </Link>
              <Link href={COLLABORATE_FORM_URL} target="_blank" rel="noopener noreferrer" className="contact-card-button group">
                <Handshake className="w-12 h-12 text-accent transition-all duration-300 group-hover:scale-110" />
                <span className="font-bold text-lg mt-2">Collaborate</span>
                <span className="text-sm text-muted-foreground mt-1">Partner with us</span>
              </Link>
            </div>
            <div className={cn("flex items-center gap-6 animate-content-slide-in", { 'is-visible': isVisible })} style={{ animationDelay: '2.1s' }}>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Follow us on Instagram">
                    <Instagram className="w-7 h-7" />
                    <span className="sr-only">Instagram</span>
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Connect with us on LinkedIn">
                    <Linkedin className="w-7 h-7" />
                    <span className="sr-only">LinkedIn</span>
                </a>
                <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Join our community chat">
                    <Users className="w-7 h-7" />
                    <span className="sr-only">Community</span>
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
