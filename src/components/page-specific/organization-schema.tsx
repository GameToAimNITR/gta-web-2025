
'use client';

import Script from 'next/script';

const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Game To Aim",
        "url": "https://game-to-aim-cyber.web.app",
        "logo": "https://game-to-aim-cyber.web.app/GTALogo.svg",
        "foundingDate": "2020",
        "foundingLocation": {
          "@type": "Place",
          "name": "National Institute of Technology, Rourkela"
        },
        "description": "The official game development club of NIT Rourkela, a community of passionate developers, artists, and storytellers creating games across multiple platforms.",
        "sameAs": [
          "https://www.instagram.com/game.to.aim",
          "https://www.linkedin.com/company/game-to-aim/"
        ]
      };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
