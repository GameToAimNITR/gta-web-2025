
'use client';

import ShowcaseSection from '@/components/sections/showcase';
import { useEffect } from 'react';


export default function ShowcasePage() {
    useEffect(() => {
        document.title = '3D Asset Showcase | Game To Aim - NIT Rourkela';
    }, []);

  return <ShowcaseSection />;
}
