"use client";

export interface Project {
  index: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  websiteUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  isActive: boolean;
  tilt: { x: number; y: number };
  isDragging: boolean;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>, idx: number) => void;
  onMouseLeave: (idx: number) => void;
}

export default function ProjectCard({
  project,
  idx,
  isActive,
  tilt,
  isDragging,
  onMouseMove,
  onMouseLeave,
}: ProjectCardProps) {
  return (
    <div
      className={`card ${isActive ? "active" : ""}`}
      onMouseMove={(e) => onMouseMove(e, idx)}
      onMouseLeave={() => onMouseLeave(idx)}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isActive ? "translateY(-6px)" : "translateY(0)"}`,
        transition: isDragging
          ? "none"
          : "transform 0.6s var(--ease-spring), border-color 0.3s ease",
      }}
    >
      {/* Card top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="card-index">{project.index} /</span>
        <div
          className="pulse-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
      </div>

      {/* Title */}
      <h3 className="card-title">{project.title}</h3>

      {/* Description */}
      <p className="card-description">{project.description}</p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          [ VIEW ON GITHUB ]
          <span className="arrow">→</span>
        </a>
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            [ LIVE SITE ]
            <span className="arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
