
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
  // Role priority list
  const roleOrder = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Code Head',
    '3D Head',
    'Design Head',
    'Content and PR Head',
    'Code Team',
    '3D Team',
    'Game and Design Team',
    'Web Dev Team',
    'Content and PR Team',
    'Video Editing Team',
  ];

  // Helper function to get the highest priority role index for a member
  const getRoleIndex = (member: Member) => {
    const memberRoles = member.role.split(',').map(r => r.trim());
    let bestIndex = Infinity;
    for (const role of memberRoles) {
      const index = roleOrder.indexOf(role);
      if (index !== -1 && index < bestIndex) {
        bestIndex = index;
      }
    }
    // If no role is found in the order list, return Infinity to sort it last
    return bestIndex === Infinity ? roleOrder.length : bestIndex;
  };

  // Primary sort: by graduation year, descending
  if (a.year !== b.year) {
    return b.year - a.year;
  }

  // Secondary sort: by role priority
  const aIndex = getRoleIndex(a);
  const bIndex = getRoleIndex(b);
  if (aIndex !== bIndex) {
    return aIndex - bIndex;
  }
  
  // Tertiary sort: alphabetically by name
  return a.name.localeCompare(b.name);
});


export const years: Year[] = [...new Set(members.map(m => m.year))].sort((a, b) => b - a) as Year[];
