import type { Member } from './types';

export const byte: Member = {
  id: 8,
  name: 'Byte',
  role: 'Backend Developer',
  year: 2022,
  image: 'https://placehold.co/400x400.png',
  aiHint: 'server room',
  skills: [
    { name: 'Node.js', level: 92 },
    { name: 'Databases', level: 85 },
    { name: 'API Design', level: 88 },
  ],
  specialAbility: 'Data Weaver',
  bio: 'The silent guardian of the server room. Ensures our game data flows smoothly and securely across the network.',
  githubUrl: '#',
  linkedinUrl: '#',
};
