
import type { Metadata } from 'next';
import { Space_Grotesk, Orbitron, VT323 } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@/components/root-providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-vt323',
});

const title = 'Game To Aim | NIT Rourkela Game Development Club';
const description =
  'The official website for Game To Aim (GTA), the game development club of NIT Rourkela. Explore our student-made games, 3D models, and join our community of creators.';
const url = 'https://game-to-aim-cyber.web.app';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Game To Aim`,
  },
  description: description,
  keywords: [
    'Game To Aim',
    'NIT Rourkela',
    'Game Development Club',
    'Student Game Projects',
    'Game Jam NIT Rourkela',
    'Unity',
    'Unreal Engine',
    'VR Development',
  ],
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'Game To Aim',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Game To Aim Club Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: url,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable} ${vt323.variable} dark`}>
      <body className="font-body antialiased">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
