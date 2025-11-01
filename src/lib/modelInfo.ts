
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
    id: 'stand-by-me-doraemon',
    name: 'Stand by me Doraemon!',
    description: 'A wave to childhood nostalgia!',
    url: 'https://res.cloudinary.com/dwwvl1ysj/image/upload/v1761743473/Cloudinary%203D/optimizations/rsf8fl151ejzi5zd8geo.glb',
    fallback: {
      geometry: 'sphere',
      color: '#00aaff', // blue
    },
  }
];
