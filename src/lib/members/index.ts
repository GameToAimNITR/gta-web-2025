
import type { Member, Year } from './types';

import { adityaArunav } from './adityaArunav';
import { adityaRout } from './adityaRout';
import { animeshTripathy } from './animesh-tripathy';
import { anshumanBehera } from './anshuman-behera';
import { anubhabDas } from './anubhabDas';
import { atreyeeSaha } from './atreyeeSaha';
import { bidyenduDas } from './bidyenduDas';
import { chinmayVijayKumar } from './chinmay-vijay-kumar';
import { dikeshBhuarya } from './dikesh-bhuarya';
import { girikJai } from './girikJai';
import { mehulBhatia } from './mehul-bhatia';
import { mohitRanjanNaik } from './mohit-ranjan-naik';
import { narayanSatapathy } from './narayanSatapathy';
import { omkarAnmolChoudhuary } from './omkar-anmol-choudhuary';
import { pitrodaYashLalitbhai } from './pitroda-yash-lalitbhai';
import { prayasBharadwaj } from './prayas-bharadwaj';
import { priyanshuSahoo } from './priyanshuSahoo';
import { rahulKumarMahato } from './rahul-kumar-mahato';
import { rudranshPandey } from './rudransh-pandey';
import { sSwagatikaSahoo } from './s-swagatika-sahoo';
import { sagarSarangi } from './sagarSarangi';
import { shaktiPrasadSahoo } from './shakti-prasad-sahoo';
import { shivomArpanBehera } from './shivomArpanBehera';
import { shubhamPrakash } from './shubham-prakash';
import { sivanshuSurya } from './sivanshuSurya';
import { sumitKumarSahu } from './sumitKumarSahu';

export const members: Member[] = [
  adityaArunav,
  adityaRout,
  animeshTripathy,
  anshumanBehera,
  anubhabDas,
  atreyeeSaha,
  bidyenduDas,
  chinmayVijayKumar,
  dikeshBhuarya,
  girikJai,
  mehulBhatia,
  mohitRanjanNaik,
  narayanSatapathy,
  omkarAnmolChoudhuary,
  pitrodaYashLalitbhai,
  prayasBharadwaj,
  priyanshuSahoo,
  rahulKumarMahato,
  rudranshPandey,
  sSwagatikaSahoo,
  sagarSarangi,
  shaktiPrasadSahoo,
  shivomArpanBehera,
  shubhamPrakash,
  sivanshuSurya,
  sumitKumarSahu,
].sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;

  const roleOrder = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Code Head',
    '3D Head',
    'Design Head',
    'Content PR head',
    'Code Team',
    '3D Team',
    'Game and Design Team',
    'Web Dev Team',
    'Content and PR Team',
    'Video Editing Team'
  ];
  
  const aIndex = roleOrder.findIndex(role => a.role.includes(role));
  const bIndex = roleOrder.findIndex(role => b.role.includes(role));

  // If both roles are in the order list, sort by their index
  if (aIndex !== -1 && bIndex !== -1) {
    if (aIndex !== bIndex) return aIndex - bIndex;
  }
  // If only one role is in the list, it comes first
  else if (aIndex !== -1) {
    return -1;
  }
  else if (bIndex !== -1) {
    return 1;
  }

  // Finally, alphabetically by name if roles are the same or not in the list
  return a.name.localeCompare(b.name);
});

export const years: Year[] = [...new Set(members.map(m => m.year))].sort((a, b) => b - a) as Year[];
