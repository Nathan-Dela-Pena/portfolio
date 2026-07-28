import { MEDIA } from "./media.js";

export const PROJECTS = [
  {
    id: "prj-fomo",
    name: "Fomo",
    dates: "Jan — May 2026",
    award: "1st Place — Senior Design",
    href: "https://fomo-app.dev/links",
    linkLabel: "Visit site",
    image: MEDIA.fomoLogo,
    imageAlt: "Fomo logo: the word fomo with an orange map pin forming the first o",
    printWidth: "74%",
    printRotation: "-1.5deg",
    tech: ["TypeScript", "React Native", "Convex", "Python", "Mapbox", "Clerk"],
    bullets: [
      "Cross-platform events app for web, iOS, and Android in a monorepo with a real-time Convex backend",
      "Automated Python pipeline ingesting the Ticketmaster API into Convex, surfacing paid events alongside user listings across all 3 platforms",
    ],
  },
  {
    id: "prj-podz",
    name: "Podz Liability Fund",
    dates: "Jan — May 2026",
    href: "https://podz-liability-fund.onrender.com/",
    linkLabel: "Live demo",
    image: MEDIA.podzCover,
    imageAlt: "Podz Liability Fund home screen: a magic 8-ball on a dark blue field",
    printWidth: "54%",
    printRotation: "1.6deg",
    tech: ["Python", "PyTorch", "YOLO", "Flask", "pandas", "NumPy"],
    bullets: [
      "Multimodal system of 5 ML models (BiLSTM, CNN, fusion network, XGBoost, per-player ensemble) predicting NBA points-prop outcomes across 1,400+ game sequences",
      "Improved AUROC 4.7% over baseline via ensemble modeling; deployed a Flask REST API on Render serving daily confidence-ranked predictions",
    ],
  },
  {
    id: "prj-rebel",
    name: "Rebel Locate",
    dates: "Jan — May 2025",
    href: "https://github.com/Nathan-Dela-Pena/Rebel-Locate",
    linkLabel: "View code",
    tech: ["Python", "PyTorch", "torchvision", "Shapely", "Pillow (EXIF)", "NumPy"],
    bullets: [
      "KNN geolocation model predicting campus buildings from EXIF metadata at 99.06% accuracy",
      "Fine-tuned an AlexNet CNN to classify photo locations from imagery alone at 82.42% accuracy",
    ],
  },
];
