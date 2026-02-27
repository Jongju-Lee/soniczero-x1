---
description: Project Structure for SonicZero X1
---

Project Structure for SonicZero X1

Please follow this directory structure for all code generation and implementation.

soniczero-x1/
├── public/                 # Static Assets
│   └── assets/
│       ├── images/         # Product & Background Images
│       ├── videos/         # Background Videos for Hero Section
│       └── icons/          # SVG Icons
├── src/
│   ├── components/         # [Components] Reusable UI Units
│   │   ├── common/         # Atomic components (Button, Input, Badge)
│   │   └── modules/        # Complex components (Accordion, FeatureCard)
│   ├── layouts/            # [Layouts] Page Skeleton
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   ├── sections/           # [Sections] Content blocks organized by page domain
│   │   ├── home/           # Main Landing Page Sections (Main, Storytelling, Cta)
│   │   ├── technology/     # Technology Page Sections (TechAnc, TechFeatures)
│   │   ├── specs/          # Specifications Page Sections
│   │   ├── shop/           # Shop Page Sections
│   │   └── support/        # Support Page Sections
│   ├── styles/             # [SCSS 7-1 Architecture]
│   │   ├── abstracts/      # _variables.scss, _mixins.scss
│   │   ├── base/           # _reset.scss, _base.scss
│   │   ├── components/     # Component-specific styles
│   │   ├── layout/         # Layout-specific styles
│   │   ├── sections/       # Section-specific styles
│   │   ├── utils/          # _helpers.scss
│   │   └── style.scss      # Main entry point for SCSS bundling
│   ├── hooks/              # Custom Hooks (GSAP logic, etc.)
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Root Component
│   └── main.jsx            # Entry Point
├── package.json
└── README.md