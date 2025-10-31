import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 relative z-10">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <Image src="/GTALogo.svg" alt="Game To Aim Logo" width={24} height={24} className="h-6 w-6 object-contain"/>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Spawned by GAME TO AIM — NIT Rourkela’s official guild of game creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
