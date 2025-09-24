// lib/structured-data.ts
// Structured data (JSON-LD) for SEO

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Full Scope Media",
  "description": "Premium real estate photography, videography, drone footage, 3D tours, virtual staging, corporate headshots, personal portraits, and graduation photography services.",
  "url": "https://fullscope-media.com",
  "logo": "https://fullscope-media.com/Logonobckgrndblack.svg",
  "image": "https://fullscope-media.com/Logonobckgrndblack.svg",
  "telephone": "+1-XXX-XXX-XXXX", // Update with actual phone
  "email": "ry@fullscope-media.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Your City", // Update with actual location
    "addressRegion": "Your State",
    "addressCountry": "US"
  },
  "sameAs": [
    // Add your social media URLs
    // "https://www.instagram.com/fullscopemedia",
    // "https://www.facebook.com/fullscopemedia"
  ],
  "serviceType": [
    "Real Estate Photography",
    "Real Estate Videography",
    "Drone Photography",
    "3D Virtual Tours",
    "Virtual Staging",
    "Floor Plans",
    "Corporate Headshots",
    "Personal Portraits",
    "Graduation Photography"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 0, // Update with actual coordinates
      "longitude": 0
    },
    "geoRadius": "50 miles"
  },
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-17:00", // Update with actual hours
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

export const realEstateServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Real Estate Photography Services",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Full Scope Media"
  },
  "description": "Professional real estate photography and videography services including interior/exterior photography, drone footage, 3D tours, and virtual staging.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "$$"
  }
};

export const photographyServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Photography Services",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Full Scope Media"
  },
  "description": "Professional photography services including corporate headshots, personal portraits, graduation photography, and real estate photography.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "$$"
  }
};