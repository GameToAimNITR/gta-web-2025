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
      'A short little game made in about a week. The evil shapes are after you and they won’t stop until you’re dead. How many of them can you take out before your impending DOOM??',
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
      'You arrive in a mysterious European Gothic village, where shadows lengthen with each passing moment. The village is under siege by monsters every night, and the terrified villagers refuse to provide you with shelter. Seeking answers, you encounter a woman named Maria, who reveals the tragic backstory of the cursed village. That night, you prepare for the inevitable attack, fending off waves of skeletons with your blade and resolve. Victory feels within reach—until the truth is unveiled.',
    image: placeholderImages.games.duskBorn,
    aiHint: 'gothic horror village night monsters action',
    techStack: ['Unity'],
    developers: ['Aditya Rout', 'Bidyendu Das', 'Sumit Kumar Sahu', 'Shivom Arpan Behera'],
  },
  {
    title: 'Battle Board',
    description: 'LUDO meets turn-based combat!',
    longDescription:
      'Battle Board combines the casual fun of LUDO with the strategic depth of turn-based combat. Plan your moves, outwit your opponents, and battle your way to victory on a dynamic board of chaos. LUDO meets Turn-based combat!!',
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
      'NULLZONE is a small, performance-optimized action-packed shooter featuring procedural map generation. Expect tight gameplay, snappy controls, and raw combat intensity. Currently in development—some sound effects may be missing! A small performant action packed shooter game with procedural maps (Currently in development, expect missing sound effects)',
    image: placeholderImages.games.nullZone,
    aiHint: 'sci-fi shooter procedural maps action',
    techStack: ['Raylib', 'Libresprite', 'C/C++', 'GLSL'],
    developers: ['Animesh Tripathy'],
  },
  {
    title: 'ILLUSIONS',
    description:
      'A surreal game exploring the theme “All that glitters is not gold.”',
    longDescription:
      'Created for the Technex Jam on the theme “All that glitters is not gold,” ILLUSIONS explores perception and deception through a unique visual and gameplay experience powered by Godot. A game made for the technex jam on the theme "All that glitters is not gold"',
    image: placeholderImages.games.illusions,
    aiHint: 'illusion fantasy deceptive beauty puzzle',
    techStack: ['Godot Engine'],
    developers: ['Animesh Tripathy', 'Mohit Naik'],
  },
// --- New Entries from User Data ---
  {
    title: 'Set Ablaze',
    description:
      'A high-speed racing game where powerful cars blaze down an endless highway.',
    longDescription:
      'Set Ablaze is a high-speed racing game where powerful cars blaze down an endless highway. Dodge obstacles, master your reflexes, and race through thrilling environments as the speed keeps rising. Collect power-ups, unlock upgrades, and push your limits to stay ahead. How far can you go before the road takes you down?',
    image: placeholderImages.games.setAblaze,
    aiHint: 'high-speed car endless highway racing',
    techStack: ['Unity'],
    developers: ['Omkar Anmol Choudhuary'],
  },
  {
    title: 'Red Orbit',
    description:
      'A fast-paced space platformer where you play as a mineral delivery astronaut.',
    longDescription:
      'A fast paced space plaformer where we play as a mineral delivery astronaut.',
    image: placeholderImages.games.redOrbit,
    aiHint: 'space platformer astronaut action',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul Kumar Mahato', 'Narayan Satapathy', 'Vivek Kumar'],
  },
  {
    title: 'MedAid',
    description: 'A first aid response simulator.',
    longDescription: 'A first aid response simulator',
    image: placeholderImages.games.medAid,
    aiHint: 'first aid simulator medical simulation',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul', 'Vivek', 'Narayan'],
  },
  {
    title: 'Aurat',
    description: 'Based on the famous bollywood movie Stree.',
    longDescription: 'Based on the famous bollywood movie Stree.',
    image: placeholderImages.games.aurat,
    aiHint: 'bollywood horror stree adventure',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul', 'Vivek', 'Narayan'],
  },
  {
    title: 'Eco-Builder',
    description: 'A city building simulator focusing on sustainable development.',
    longDescription:
      'A city building simulator focusing on sustainable development.',
    image: placeholderImages.games.ecoBuilder,
    aiHint: 'city building sustainable simulation strategy',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul', 'Vivek', 'Narayan'],
  },
  {
    title: 'Chrono Warfare',
    description: 'Travel to the future to destroy the robot control center and end their rule.',
    longDescription:
      'Robots from the future apocalyptic world have come to attack through time machine.. To save everyone you have to use the time machine to go to future and find their control center to destroy their energy reactor and thus ending thier rule.',
    image: placeholderImages.games.chronoWarfare,
    aiHint: 'time travel robot sci-fi action',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul', 'Narayan'],
  },
  {
    title: 'OnTime',
    description: 'A pizza delivery guy delivering pizzas amongst an apocalypse.',
    longDescription: 'A pizza delivery guy delivering pizzas amongst an apocalypse.',
    image: placeholderImages.games.onTime,
    aiHint: 'pizza delivery apocalypse adventure',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul', 'Vivek', 'Narayan'],
  },
  {
    title: 'DEPTH: Lost Into The Abyss',
    description:
      'Adventurous game where we fight creatures into the depth of Abyss, discovering new things.',
    longDescription:
      'Adventurous game where we fight creatures into the depth of Abyss, discovering new things.',
    image: placeholderImages.games.depthLostIntoTheAbyss,
    aiHint: 'abyss creatures deep sea adventure action',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul'],
  },
  {
    title: 'Fatman',
    description: 'Eat healthy food and slash junk food to earn points.',
    longDescription: 'Eat healthy food and slash junk food to earn points.',
    image: placeholderImages.games.fatman,
    aiHint: 'healthy food casual action',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul'],
  },
  {
    title: 'Undead Havoc',
    description:
      'A fast-paced, action-packed survival game against endless waves of the undead.',
    longDescription:
      'Undead Havoc is a fast-paced, action-packed survival game where the undead never stop coming. Your mission is simple: kill as many zombies as you can and survive wave after wave of relentless horror. Armed with a weapon and your wits, you’ll face swarms of flesh-hungry monsters that grow stronger, faster, and more brutal with each passing wave. Every second counts, every bullet matters — can you survive the Undead Havoc?',
    image: placeholderImages.games.undeadHavoc,
    aiHint: 'zombie survival horror action',
    techStack: ['Unity', 'C#', 'Blender'],
    developers: ['Rahul'],
  },
];
