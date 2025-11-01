
'use client';

import ShowcaseSection from '@/components/sections/showcase';
import { useEffect } from 'react';


// This metadata is not used because the page is client-rendered.
// For SEO, this should be a server component or use generateMetadata.
// export const metadata: Metadata = {
//     title: '3D Asset Showcase',
//     description: 'Explore the 3D models and assets created by the students at Game To Aim. See the building blocks of our virtual worlds.',
//     alternates: {
//         canonical: '/showcase',
//     },
// };


export default function ShowcasePage() {
    useEffect(() => {
        document.title = '3D Asset Showcase | Game To Aim - NIT Rourkela';
    }, []);

  return <ShowcaseSection />;
}
