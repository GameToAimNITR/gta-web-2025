import placeholderImages from '@/lib/placeholder-images.json';

export interface Game {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  aiHint: string;
  techStack: string[];
  developers: string[];
}

export const games: Game[] = [
  {
    title: 'CampusSurvivalVR',
    description: 'Immersive VR survival on a photorealistic campus.',
    longDescription:
      'An immersive VR survival game on a photorealistic 3D campus, featuring visceral physics combat, all built with Unity. Fight your way through familiar locations and uncover the secrets behind the outbreak.',
    image: placeholderImages.games.campusSurvivalVR,
    aiHint: 'zombie apocalypse campus',
    techStack: ['Unity', 'C#', 'Oculus SDK', 'Blender'],
    developers: ['Jax', 'Glitch', 'Vertex'],
  },
  {
    title: 'CampusQuestVR',
    description: 'A VR treasure hunt across campus.',
    longDescription:
      'A VR treasure hunt game set in our campus environment where players collect clues and solve riddles to find a hidden treasure. Explores innovative uses of VR for puzzle-solving.',
    image: placeholderImages.games.campusQuestVR,
    aiHint: 'treasure map campus',
    techStack: ['Unity', 'C#', 'SteamVR', 'Figma'],
    developers: ['Vesper', 'Cipher'],
  },
  {
    title: 'NeonRush',
    description: 'Advanced physics-based racer with dynamic visuals.',
    longDescription:
      'Advanced force-based physics with damage, dynamic LOD environments, and intense neon conditions via custom bloom and volumetric lighting. A high-speed, high-stakes racing experience.',
    image: placeholderImages.games.neonRush,
    aiHint: 'neon city car',
    techStack: ['Unreal Engine', 'C++', 'Niagara', 'Houdini'],
    developers: ['Glitch', 'Byte', 'Shard'],
  },
  {
    title: 'Project Exodus',
    description:
      'The world is collapsing, and you must decide who deserves to escape on the last ship.',
    longDescription:
      'The world is on the brink of collapse, but the company you work for, GENSIS, has secured a coveted position on the last escape ship—GENESIS. But there’s a catch: before you can board, you must spend three days determining who else deserves a spot, or lose yours too. Armed with the S.C.A.L.E. system (Schematic Chart for Analysis of all Living Entities), your task is to scrutinize potential passengers, verify IDs, analyze health metrics, and cross-check their data. Every decision shapes humanity’s fate—and your own.',
    image: placeholderImages.games.projectExodus,
    aiHint: 'sci-fi moral decision spaceship',
    techStack: ['Unity', 'Blender', 'Krita', 'Audacity'],
    developers: ['Aditya Rout'],
  },
  {
    title: 'iCaThNa',
    description:
      'Survive waves of evil shapes out to destroy you in this short action game.',
    longDescription:
      'A short little game made in about a week. The evil shapes are after you and they won’t stop until you’re dead. How many of them can you take out before your impending DOOM?',
    image: placeholderImages.games.iCaThNa,
    aiHint: 'minimal shooter geometric enemies',
    techStack: ['Unity', 'Krita', 'Audacity'],
    developers: ['Aditya Rout'],
  },
  {
    title: 'Late Again!',
    description:
      'Help Square rush through a magical house to make it to his teleportation class on time.',
    longDescription:
      'Square did it again! Oversleeping is his specialty, but being late for his magic class? That’s a whole other story. Today’s lesson is teleportation! Navigate through tricky passages and puzzles using magical skills like Time Reversal and Gravity Switching to make it to class—before detention with Mr. Pentagon!',
    image: placeholderImages.games.lateAgain,
    aiHint: 'magic puzzle time reversal gravity',
    techStack: ['Unity', 'Krita', 'Audacity'],
    developers: ['Aditya Rout', 'Bidyendu Das'],
  },
  {
    title: 'Dusk Born',
    description:
      'Defend a cursed Gothic village from nightly monster attacks and uncover its dark secrets.',
    longDescription:
      'You arrive in a mysterious European Gothic village under siege by monsters every night. The terrified villagers refuse to shelter you. Seeking answers, you meet Maria, who reveals the tragic curse behind it all. Fight off waves of skeletons and uncover the chilling truth before dawn.',
    image: placeholderImages.games.duskBorn,
    aiHint: 'gothic horror village night monsters',
    techStack: ['Unity'],
    developers: ['Aditya Rout', 'Bidyendu Das', 'Sumit Kumar Sahu', 'Shivom Arpan Behera'],
  },
  {
    title: 'Battle Board',
    description: 'LUDO meets turn-based combat!',
    longDescription:
      'Battle Board combines the casual fun of LUDO with the strategic depth of turn-based combat. Plan your moves, outwit your opponents, and battle your way to victory on a dynamic board of chaos.',
    image: placeholderImages.games.battleBoard,
    aiHint: 'board game combat ludo strategy',
    techStack: ['Unity', 'Blender', 'Krita'],
    developers: [
      'Anshuman Behera',
      'Animesh Tripathy',
      'Aditya Rout',
      'Bidyendu Das',
      'Sumit Kumar Sahu',
    ],
  },
  {
    title: 'NULLZONE',
    description:
      'A small, fast-paced action shooter with procedural maps and intense gameplay.',
    longDescription:
      'NULLZONE is a small, performance-optimized action-packed shooter featuring procedural map generation. Expect tight gameplay, snappy controls, and raw combat intensity. Currently in development—some sound effects may be missing!',
    image: placeholderImages.games.nullZone,
    aiHint: 'sci-fi shooter procedural maps',
    techStack: ['Raylib', 'Libresprite', 'C/C++', 'GLSL'],
    developers: ['Animesh Tripathy'],
  },
  {
    title: 'ILLUSIONS',
    description:
      'A surreal game exploring the theme “All that glitters is not gold.”',
    longDescription:
      'Created for the Technex Jam on the theme “All that glitters is not gold,” ILLUSIONS explores perception and deception through a unique visual and gameplay experience powered by Godot.',
    image: placeholderImages.games.illusions,
    aiHint: 'illusion fantasy deceptive beauty',
    techStack: ['Godot Engine'],
    developers: ['Animesh Tripathy', 'Mohit Naik'],
  },
];
