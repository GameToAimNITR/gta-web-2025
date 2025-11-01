
import GamesSection from '@/components/sections/games';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Games',
    description: 'Explore the full library of games developed by the members of Game To Aim, the game development club at NIT Rourkela. From VR experiences to mobile puzzlers, see what our students have created.',
    alternates: {
        canonical: '/games',
    },
};


export default function GamesPage() {
  return <GamesSection />;
}
