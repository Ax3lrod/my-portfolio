import { use } from "react";
import { projectArchive } from "@/const/projectArchive";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetail from "./components/ProjectDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectArchive.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.subtitle || project.description.slice(0, 150),
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [
        {
          url: typeof project.cover === "string" ? project.cover : "",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = use(params);

  const project = projectArchive.find((p) => p.slug === slug);

  const currentIndex = projectArchive.findIndex((p) => p.slug === slug);
  const nextProject =
    projectArchive[(currentIndex + 1) % projectArchive.length];

  if (!project) {
    return notFound();
  }

  return (
    <ProjectDetail
      project={project}
      nextProject={nextProject}
      currentIndex={currentIndex}
      totalProject={projectArchive.length}
    />
  );
}
