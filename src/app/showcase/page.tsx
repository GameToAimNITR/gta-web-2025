
'use client';

import ShowcaseSection from '@/components/sections/showcase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '3D Asset Showcase',
    description: 'Explore the 3D models and assets created by the students at Game To Aim. See the building blocks of our virtual worlds.',
    alternates: {
        canonical: '/showcase',
    },
};


export default function ShowcasePage() {
  return <ShowcaseSection />;
}
