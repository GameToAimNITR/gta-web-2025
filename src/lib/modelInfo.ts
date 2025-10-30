export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  url?: string;
  fallback: {
    geometry: 'box' | 'sphere' | 'torus';
    color: string;
  };
}

export const models: ModelInfo[] = [
  {
    id: 'christmas-tree',
    name: 'Christmas Tree',
    description: 'A low poly Christmas tree for those who like it lowwww.',
    url: 'https://res.cloudinary.com/dwwvl1ysj/image/upload/v1761742799/Cloudinary%203D/models/GTAChristmas_r1k0nn.glb',
    fallback: {
      geometry: 'sphere',
      color: '#2ecc71', // green
    },
  },
  {
    id: 'construction-crane',
    name: 'Construction Crane',
    description: 'A detailed 3D construction crane capturing industrial strength and structure.',
    url: 'https://res.cloudinary.com/dwwvl1ysj/image/upload/v1761743081/Cloudinary%203D/models/Crane_kazsj4.glb',
    fallback: {
      geometry: 'torus',
      color: '#f1c40f', // yellow
    },
  },
  {
    id: 'modern-building',
    name: 'Modern Building',
    description: 'A sleek, contemporary architectural structure symbolizing urban innovation.',
    url: '',
    fallback: {
      geometry: 'box',
      color: '#95a5a6', // gray
    },
  },
  {
    id: 'the-auric-whisper',
    name: 'The Auric Whisper',
    description:
      'Forged in the heart of a golden dawn, The Auric Whisper is a rapier of elegance and precision. Its hilt, crafted from molten copper and coiled with gilded threads, symbolizes nobility and discipline. The blade — long, slender, and perfectly balanced — glows faintly under light, as though whispering the secrets of every duel it has seen.',
    url: '',
    fallback: {
      geometry: 'box',
      color: '#FFD700', // gold
    },
  },
  {
    id: 'stand-by-me-doraemon',
    name: 'Stand by me Doraemon!',
    description: 'A wave to childhood nostalgia!',
    url: 'https://res.cloudinary.com/dwwvl1ysj/image/upload/v1761743473/Cloudinary%203D/optimizations/rsf8fl151ejzi5zd8geo.glb',
    fallback: {
      geometry: 'sphere',
      color: '#00aaff', // blue
    },
  },
  {
    id: 'study-table',
    name: 'Study Table',
    description:
      'This 3D model represents a cozy and minimal study setup designed to feel calm and realistic. The warm lighting, simple wooden desk, and soft chair create a space that feels inviting and focused. Small details like the glowing desk lamp, indoor plant, and wall art add a personal touch, bringing life and balance to the scene. The goal was to capture the simplicity of a real workspace while keeping it visually clean and comfortable.',
    url: '',
    fallback: {
      geometry: 'box',
      color: '#deb887', // light brown
    },
  },
  {
    id: 'dustfall-outpost',
    name: 'The Dustfall Outpost',
    description:
      'In this 3D scene, I wanted to capture a quiet, futuristic alley that feels both real and slightly unreal. I focused on the lighting and mood—soft neon reflections, faint glows, and textures that tell a story without words. The space felt more peaceful and open, allowing the light and atmosphere to take the spotlight. My goal was to make the viewer pause for a second, as if standing in that still, glowing moment between reality and imagination.',
    url: '',
    fallback: {
      geometry: 'torus',
      color: '#9b59b6', // purple
    },
  },
];
