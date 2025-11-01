
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
  // Primary sort: by graduation year, descending
  if (a.year !== b.year) return b.year - a.year;

  // Secondary sort: by role priority
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
    'Video Editing Team',
  ];

  const getBestRoleIndex = (member: Member) => {
    const memberRoles = member.role.split(',').map(r => r.trim());
    let bestIndex = Infinity;
    for (const role of memberRoles) {
      const index = roleOrder.findIndex(orderedRole => role === orderedRole);
      if (index !== -1 && index < bestIndex) {
        bestIndex = index;
      }
    }
    return bestIndex;
  };

  const aIndex = getBestRoleIndex(a);
  const bIndex = getBestRoleIndex(b);

  if (aIndex !== Infinity && bIndex !== Infinity) {
    if (aIndex !== bIndex) return aIndex - bIndex;
  } else if (aIndex !== Infinity) {
    return -1; // a has a ranked role, b doesn't
  } else if (bIndex !== Infinity) {
    return 1; // b has a ranked role, a doesn't
  }

  // Tertiary sort: alphabetically by name
  return a.name.localeCompare(b.name);
});


export const years: Year[] = [...new Set(members.map(m => m.year))].sort((a, b) => b - a) as Year[];
