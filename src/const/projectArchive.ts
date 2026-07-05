export const projectArchive = [
  {
    title: "Big Data Final Project",
    subtitle: "Steam Spam/Bot Review Detection System",
    description:
      "Architected a hybrid data lakehouse system (Kafka, PySpark, Trino) to process 6.4M+ reviews. Engineered an ML pipeline (Isolation Forest, K-Means, BERT) and built a FastAPI/Streamlit dashboard for real-time visualization.",
    year: 2024,
    role: "System Architect & Lead Developer",
    startDate: "2024-03-01",
    endDate: "2024-07-01",
    techStack: [
      "Kafka",
      "PySpark",
      "Trino",
      "FastAPI",
      "Docker",
      "Machine Learning",
    ],
    cover: "steam-review-spam-detector-cover",
    slug: "steam-review-detection",
    repoLink: "https://github.com/Ax3lrod/final-project-big-data",
    liveLink: null,
    contributions: [
      {
        title: "Hybrid Architecture Design",
        description:
          "Architected a complete data lakehouse system integrating real-time ingestion with Kafka, batch preprocessing with PySpark, and distributed SQL querying using Trino.",
        image: "projects/steam-review-detection/architecture",
      },
      {
        title: "Streaming & Ingestion Layer",
        description:
          "Developed Kafka producers and consumers for real-time ingestion of over 6.4 million Steam reviews, implementing a raw and clean layer storage strategy directly in MinIO.",
        image: "projects/steam-review-detection/streaming",
      },
      {
        title: "Advanced ML Pipeline (Unsupervised & BERT)",
        description:
          "Engineered an ensemble anomaly detection system using Isolation Forest and K-Means clustering for auto-labeling, followed by a Hybrid BERT Classifier fused with engineered linguistic features to predict spam probability with high confidence.",
        image: "projects/steam-review-detection/ml-pipeline",
      },
      {
        title: "API, Dashboard & Orchestration",
        description:
          "Developed a FastAPI backend to serve model inferences and a Streamlit/React dashboard for real-time visualization. Created an automated orchestration script (run_all.sh) to synchronize the deployment of 9+ containerized services.",
        image: "projects/steam-review-detection/fastapi",
      },
    ],
  },
  {
    title: "SustainaMap",
    subtitle: "Air Pollution Awareness Web Application",
    description:
      "Developed an interactive map-based platform using Leaflet to monitor ecological data. Built location-based reporting features with Zod validation, delivering a modern UI with HeroUI and Framer Motion.",
    year: 2025,
    role: "Lead Frontend Developer",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Leaflet.js",
      "TypeScript",
      "Tanstack Query",
    ],
    cover: "sustainamapCover",
    slug: "sustainamap",
    repoLink: "https://github.com/Ax3lrod/sustainamap-fe",
    liveLink: null,
    contributions: [
      {
        title: "Interactive Mapping System",
        description:
          "Architected a robust mapping interface using Leaflet to visualize complex environmental data layers, including forest monitoring and PLTU (Power Plant) distribution across regions.",
        image: "projects/sustainamap/map-system",
      },
      {
        title: "Dynamic Layer Management",
        description:
          "Developed a dynamic toggle system for switching between different ecological data views, improving the platform's utility for environmental researchers.",
        image: "projects/sustainamap/layer-management",
      },
      {
        title: "Verified Reporting Pipeline",
        description:
          "Built a location-based reporting feature using React-Dropzone for media evidence upload and Zod for strict schema validation, ensuring data integrity for community environmental reports.",
        image: "projects/sustainamap/reporting",
      },
      {
        title: "Modern Interactive UI under Hackathon Constraints",
        description:
          "Sliced and implemented a professional dashboard using HeroUI and Framer Motion, delivering a highly responsive and immersive user experience under tight hackathon deadlines.",
        image: "projects/sustainamap/ui-dashboard",
      },
    ],
  },
  {
    title: "ShareITS (GENICS 2.0)",
    subtitle: "Academic Resource Sharing Platform",
    description:
      "Led the development of a final project for an intensive 30-day web development bootcamp. Operated as Project Manager for Team 2, managing the overall development lifecycle, encompassing both frontend and backend.",
    year: 2024,
    role: "Project Manager / Fullstack Developer",
    startDate: "2024-10-16",
    endDate: "2024-12-09",
    techStack: ["Node.js", "Express", "TypeScript", "Next.js", "React"],
    cover: "shareitscover2",
    slug: "share-its-genics",
    repoLink: "https://github.com/Ax3lrod/GENICS-Team-2-Frontend",
    liveLink: null,
    contributions: [
      {
        title: "Backend Architecture & API Design",
        description:
          "Led the backend development, establishing the architecture, RESTful routing, and robust database integrations using TypeScript, Node.js, and Express.",
        image: "projects/share-its-genics/module-list",
      },
      {
        title: "Seamless Frontend Integration",
        description:
          "Actively contributed to the frontend repository, ensuring seamless API integration, state management synchronization, and responsive UI components rendering.",
        image: "projects/share-its-genics/lecturer-list",
      },
      {
        title: "Agile Execution & Project Delivery",
        description:
          "Managed the rapid software development lifecycle during a high-intensity 30-day full-stack engineering bootcamp, mimicking real-world cross-functional collaboration.",
        image: "projects/share-its-genics/create-account",
      },
    ],
  },
];
