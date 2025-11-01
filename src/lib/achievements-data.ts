
import placeholderImages from '@/lib/placeholder-images.json';

export interface Achievement {
  title: string;
  description: string;
  image: string;
  aiHint: string;
  xp: number;
  progress: number;
  videoUrl: string;
}

export const achievements: Achievement[] = [
  {
    title: 'GTA x IGDC Game Jam',
    description:
      'Collaborated with India Game Developer Conference for Inter IIT Tech Meet 12.0, hosting a national-level Game Jam that connected students with industry leaders and showcased innovative game design talent.',
    image: '/achievments/igdc.png',
    aiHint: 'game jam event',
    xp: 600,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
  title: 'HIT Games Conference Summit 2023',
  description:
    'Represented NIT Rourkela at the international HIT Games Conference Summit 2023 in Bangalore, engaging with over 20,000 gaming professionals and 5,000 brands.',
  image: '/achievments/hiit.png',
  aiHint: 'gaming conference event',
  xp: 700,
  progress: 100,
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
 {
    title: 'Campus Survival VR',
    description:
      'Presented a multiplayer cooperative zombie shooter set in a VR recreation of NIT Rourkela during Innovision 2024, attracting 300+ participants and acclaim for technical and creative excellence.',
    image: '/achievments/csvr.png',
    aiHint: 'vr zombie shooter',
    xp: 550,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'ICS Mental Health Week – VR Experience',
    description:
      'Developed an immersive VR experience visualizing stress, anxiety, and peer pressure for ICS Mental Health Week 2024, promoting awareness and showcasing VR’s power for social impact.',
    image: '/achievments/ics_mh.png',
    aiHint: 'mental health vr',
    xp: 400,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'GTA Game Exhibition 2025',
    description:
      'Hosted the annual Game Exhibition on Jan 14, 2025, featuring Campus Survival VR, IGDC Game Jam winners, and projects from new members—celebrating creativity and innovation across the club.',
    image: '/achievments/igdc.png',
    aiHint: 'game showcase',
    xp: 500,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Selectors Six Workshop',
    description:
      'Conducted a six-day hands-on induction workshop for 70+ participants, covering Unity development and Blender 3D art, fostering creativity, collaboration, and technical growth.',
    image: '/achievments/ssw.png',
    aiHint: 'workshop training',
    xp: 450,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Ray Tracing Workshop – Simulating Light in Games',
    description:
      'Delivered an advanced session on ray tracing led by Bidyendu Das, teaching participants light physics, rendering algorithms, and real-time simulation using Raylib.',
    image: '/achievments/rtw.png',
    aiHint: 'ray tracing graphics',
    xp: 500,
    progress: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];
