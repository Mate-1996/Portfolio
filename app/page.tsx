"use client";
import { useState, useEffect, useRef, RefObject } from "react";

interface Project {
  id: number;
  title: string;
  tag: string;
  year: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kakuro Game",
    tag: "Game / Puzzle",
    year: "2024",
    description:
      "An interactive Kakuro puzzle game with dynamic grid generation, a friend system, hints, achievements, and full puzzle validation logic.",
    tech: ["Next.js", "TypeScript", "CSS"],
    color: "#e8ff47",
    github: "https://github.com/Mate-1996/Kakuro-Game"
  },
  {
    id: 2,
    title: "Trading Card App",
    tag: "Team / Full-Stack",
    year: "2024",
    description:
      "A collaborative trading card platform that lets users browse, collect, and manage cards, built as a team project with real-time data management.",
    tech: ["React", "JavaScript", "Node.js"],
    color: "#ff6b47",
    github: "https://github.com/CongHuyVHS/prjTradingCard"
  },
  {
    id: 3,
    title: "Moving Services Website",
    tag: "Utility / Full-Stack",
    year: "2024",
    description:
      "A full-stack moving website with customer booking, Firebase Realtime Database, an admin dashboard for managing bookings and reviews, and a responsive booking form.",
    tech: ["Next.js", "TypeScript", "Firebase"],
    color: "#47c5ff",
    github: "https://github.com/Mate-1996/project_moving_website"
  },
];

const skills = [
  { label: "Languages", items: ["Java", "C#", "Python", "JavaScript"] },
  { label: "Web", items: ["HTML", "CSS", "React", "Next.js", "Angular"] },
  { label: "Databases", items: ["SQL", "Firebase"] },
];

const contactLinks = [
  { label: "matechachkiani@gmail.com", href: "mailto:matechachkiani@gmail.com", icon: "✉" },
  { label: "514-690-5424", href: "tel:5146905424", icon: "✆" },
  { label: "github.com/Mate-1996", href: "https://github.com/Mate-1996", icon: "⌥" },
  { label: "linkedin.com/in/mate-chachkhiani", href: "https://www.linkedin.com/in/mate-chachkhiani-191196388", icon: "in" },
  { label: "Sainte-Thérèse, QC", href: null, icon: "◎" },
];

function useIntersection(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isVisible;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref, { threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        border: `1px solid ${hovered ? project.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        background: hovered
          ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
          : "rgba(255,255,255,0.02)",
        transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: project.color,
          opacity: hovered ? 0.07 : 0,
          filter: "blur(50px)",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: project.color,
            }}
          >
            {project.tag}
          </span>
          <h3
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "#f5f5f0",
              margin: "5px 0 0",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h3>
        </div>
        <span style={{ fontSize: "28px", userSelect: "none" }}></span>
      </div>

      <p
        style={{
          color: "rgba(245,245,240,0.5)",
          fontSize: "13.5px",
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "20px",
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "10px",
              fontFamily: "'Space Mono', monospace",
              padding: "3px 10px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(245,245,240,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          fontFamily: "'Space Mono', monospace",
          color: project.color,
          textDecoration: "none",
          letterSpacing: "0.05em",
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
          (e.currentTarget.style.gap = "14px")
        }
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
          (e.currentTarget.style.gap = "8px")
        }
      >
        View on GitHub <span>→</span>
      </a>
    </div>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [cvHovered, setCvHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const heroVisible = useIntersection(heroRef, { threshold: 0.05 });
  const aboutVisible = useIntersection(aboutRef, { threshold: 0.1 });
  const skillsVisible = useIntersection(
    skillsRef as RefObject<HTMLElement | null>,
    { threshold: 0.1 }
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0c0c0e;
          color: #f5f5f0;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        ::selection { background: #e8ff47; color: #0c0c0e; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0c0e; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #e8ff47 !important; }
        .contact-link { transition: color 0.2s ease; }
        .contact-link:hover { color: #e8ff47 !important; }
        @media (max-width: 600px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .pfp { display: none; }
          .cv-label { display: none; }
        }
      `}</style>

      {/* Fixed dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrollY > 60 ? "rgba(12,12,14,0.88)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            letterSpacing: "-0.02em",
          }}
        >
          MC<span style={{ color: "#e8ff47" }}>.</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {["About", "Skills", "Projects"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "rgba(245,245,240,0.4)",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {item}
            </a>
          ))}

          {/* ── CV Download Button ── */}
          <a
            href="/Mate_Chachkhiani_CV.pdf"
            download="Mate_Chachkhiani_CV.pdf"
            onMouseEnter={() => setCvHovered(true)}
            onMouseLeave={() => setCvHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: cvHovered ? "#0c0c0e" : "#e8ff47",
              background: cvHovered ? "#e8ff47" : "transparent",
              border: "1px solid #e8ff47",
              borderRadius: "6px",
              padding: "7px 14px",
              transition: "all 0.2s ease",
              boxShadow: cvHovered ? "0 0 20px rgba(232,255,71,0.25)" : "none",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M6 1v7M3 5.5l3 3 3-3M1 10h10"
                stroke={cvHovered ? "#0c0c0e" : "#e8ff47"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="cv-label">Resume</span>
          </a>
        </div>
      </nav>

      {/* ── HERO / ABOUT ── */}
      <section
        id="about"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 40px 80px",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "52px",
            alignItems: "center",
          }}
        >
          {/* Left — name + bio + contacts */}
          <div>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e8ff47",
                marginBottom: "20px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s ease 0.1s",
              }}
            >
              Computer Science Student · Frontend Developer
            </p>

            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 8vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                marginBottom: "6px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              Mate
            </h1>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 8vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                marginBottom: "30px",
                background: "linear-gradient(90deg, #f5f5f0, rgba(245,245,240,0.3))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease 0.28s",
              }}
            >
              Chachkhiani
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "rgba(245,245,240,0.48)",
                lineHeight: 1.8,
                maxWidth: "430px",
                fontWeight: 300,
                marginBottom: "36px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s ease 0.36s",
              }}
            >
              Motivated Computer Science student at LaSalle College with a strong foundation
              in programming, algorithms, and software development. Passionate about learning
              new technologies, collaborating in teams, and building innovative solutions.
            </p>

            {/* Contact info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "11px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s ease 0.46s",
              }}
            >
              {contactLinks.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(245,245,240,0.4)",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <span style={{ color: "#e8ff47", fontSize: "14px", width: "16px" }}>{c.icon}</span>
                    {c.label}
                  </a>
                ) : (
                  <span
                    key={c.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(245,245,240,0.3)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <span style={{ color: "#e8ff47", fontSize: "14px", width: "16px" }}>{c.icon}</span>
                    {c.label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right — profile picture */}
          <div
            className="pfp"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.9)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "190px",
                height: "190px",
                borderRadius: "50%",
                border: "2px solid rgba(232,255,71,0.2)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 0 48px rgba(232,255,71,0.07), 0 0 0 8px rgba(232,255,71,0.03)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pfp.jpg"
                alt="Mate Chachkhiani"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            opacity: heroVisible ? 0.3 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <div style={{ width: "36px", height: "1px", background: "rgba(245,245,240,0.3)" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        ref={aboutRef}
        style={{
          padding: "0 40px 100px",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)",
            }}
          >
            Skills & Stack
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div
          ref={skillsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
            opacity: skillsVisible ? 1 : 0,
            transform: skillsVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {skills.map((group) => (
            <div
              key={group.label}
              style={{
                padding: "20px 22px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#e8ff47",
                  marginBottom: "12px",
                }}
              >
                {group.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(245,245,240,0.6)",
                      padding: "3px 9px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Spoken languages card */}
          <div
            style={{
              padding: "20px 22px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#e8ff47",
                marginBottom: "12px",
              }}
            >
              Spoken Languages
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { lang: "English", level: "Highly proficient" },
                { lang: "French", level: "Highly proficient" },
                { lang: "Georgian", level: "Moderate" },
              ].map(({ lang, level }) => (
                <div
                  key={lang}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(245,245,240,0.6)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {lang}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "'Space Mono', monospace",
                      color: "rgba(245,245,240,0.28)",
                    }}
                  >
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{
          padding: "0 40px 120px",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)",
            }}
          >
            Selected work
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "rgba(245,245,240,0.2)",
            }}
          >
            {projects.length} projects
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "rgba(245,245,240,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          © 2024 Mate Chachkhiani
        </span>
        <a
          href="mailto:matechachkiani@gmail.com"
          className="contact-link"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "rgba(245,245,240,0.2)",
            textDecoration: "none",
          }}
        >
          matechachkiani@gmail.com
        </a>
      </footer>
    </>
  );
}