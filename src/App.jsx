import React, { useState, useEffect } from 'react';

function TypewriterHero() {
  const fullText = "Hello, I’m Ismail,\na developer\n& UI-UX designer.";
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (!isDeleting && index < fullText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex((prev) => prev + 1);
      }, 55);
    } else if (!isDeleting && index === fullText.length) {
      // Pause after finishing typing before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && index > 0) {
      // Deleting backwards (slightly faster than typing)
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, index - 1));
        setIndex((prev) => prev - 1);
      }, 25);
    } else if (isDeleting && index === 0) {
      // Pause on empty text before retyping
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.15] max-w-2xl whitespace-pre-line min-h-[140px] sm:min-h-[190px]">
      {displayText}
      <span className="inline-block w-[3px] h-[0.85em] bg-black ml-1 align-baseline animate-pulse" />
    </h1>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const projects = [
    {
      id: 1,
      title: 'TaxShield Advisor',
      category: 'Finance | Web & Mobile App',
      badge: 'LIVE',
      image: '/taxshield.png',
      link: 'https://www.taxshieldadvisor.com/',
    },
    {
      id: 2,
      title: 'Vyreka Web Platform',
      category: 'Community | Full-Stack & Maintenance',
      badge: 'LIVE',
      image: '/vyreka.png',
      link: 'https://vyreka.vercel.app/',
    },
    {
      id: 3,
      title: 'ClientFlow — Business CRM & Pipeline',
      category: 'SaaS | CRM, Pipelines & Contact Ops',
      badge: 'CASE STUDY',
      image: '/dashboard.png',
      link: null,
    },
    {
      id: 4,
      title: 'CoreOps — Internal Management Portal',
      category: 'Enterprise | RBAC, APIs & Data Models',
      badge: 'ARCHITECTURE',
      image: '/team-management.webp',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-theme-bg text-black font-sans selection:bg-black selection:text-white flex flex-col justify-between">

      {/* Centered Top Nav */}
      <nav className="w-full pt-12 pb-16 flex justify-center items-center gap-10 sm:gap-14 text-sm sm:text-base uppercase tracking-[0.18em] font-medium text-black">
        <button
          onClick={() => setActiveTab('home')}
          className={`transition-all duration-200 ${
            activeTab === 'home'
              ? 'text-black font-bold underline underline-offset-8 decoration-2'
              : 'text-black/50 hover:text-black'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`transition-all duration-200 ${
            activeTab === 'resume'
              ? 'text-black font-bold underline underline-offset-8 decoration-2'
              : 'text-black/50 hover:text-black'
          }`}
        >
          Resume
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`transition-all duration-200 ${
            activeTab === 'info'
              ? 'text-black font-bold underline underline-offset-8 decoration-2'
              : 'text-black/50 hover:text-black'
          }`}
        >
          Info
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 w-full flex-1 text-black">

        {/* ================= HOME VIEW ================= */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="pt-6 pb-28 sm:pb-36">
              <TypewriterHero />
            </section>

            {/* Work Grid */}
            <section className="pt-4 pb-16">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-black text-left">
                WORK
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 max-w-2xl mx-auto justify-items-center">
                {projects.map((project) => {
                  const cardContent = (
                    <>
                      {/* Compact thumbnail container */}
                      <div className="w-full aspect-[16/10] max-h-44 rounded-lg overflow-hidden bg-white border border-black/10 mb-2.5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm group-hover:shadow-md pointer-events-none flex items-center justify-center p-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Metadata row */}
                      <div className="flex justify-between items-start text-xs pt-0.5">
                        <div>
                          <h3 className="font-semibold text-black group-hover:opacity-75 transition-opacity flex items-center gap-1 text-[13px]">
                            {project.title}
                            {project.link && (
                              <span className="text-[10px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                ↗
                              </span>
                            )}
                          </h3>
                          <p className="text-black/50 text-[11px] mt-0.5">
                            {project.category}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-medium tracking-wider text-black/40">
                          {project.badge}
                        </span>
                      </div>
                    </>
                  );

                  return project.link ? (
                    <a
                      key={project.id}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block cursor-pointer w-full max-w-[330px]"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div key={project.id} className="group block cursor-default w-full max-w-[330px]">
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ================= RESUME VIEW ================= */}
        {activeTab === 'resume' && (
          <div className="pt-4 pb-24 text-black">
            <div className="flex justify-between items-baseline mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">
                Resume
              </h1>
            </div>

            {/* Work Experience */}
            <section className="mb-14 border-t border-black/10 pt-8">
              <h2 className="text-base font-bold text-black tracking-tight mb-8">
                Work Experience
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 text-sm">
                <div className="text-xs text-black/50 tracking-wide md:col-span-1">
                  June 2026 — Present
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-black">Web Developer & Maintainer</h3>
                  <p className="text-xs text-black/70 mb-3">Vyreka</p>
                  <ul className="space-y-2 text-xs text-black/80 leading-relaxed list-disc list-outside ml-3">
                    <li>Designed and engineered the official web platform from scratch using modern web technologies.</li>
                    <li>Actively maintain system stability, performance, and uptime for ongoing daily usage.</li>
                    <li>Continuously roll out new features, UI improvements, and enhancements based directly on community feedback.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-xs text-black/50 tracking-wide md:col-span-1">
                  Feb 2025 — Jul 2025
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-black">Full Stack Developer Intern</h3>
                  <p className="text-xs text-black/70 mb-3">Engineering Studio</p>
                  <ul className="space-y-2 text-xs text-black/80 leading-relaxed list-disc list-outside ml-3">
                    <li>Engineered full-stack features using React, Node.js, and relational schema backends.</li>
                    <li>Built responsive user interfaces translating design prototypes into production-ready frontends.</li>
                    <li>Containerized services and coordinated deployment pipelines using Docker and Git.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-14 border-t border-black/10 pt-8">
              <h2 className="text-base font-bold text-black tracking-tight mb-8">
                Education
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-sm">
                <div className="text-xs text-black/50 tracking-wide md:col-span-1">
                  2023 — 2026
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-black">Bachelor of Computer Applications (BCA)</h3>
                  <p className="text-xs text-black/70 mt-1">
                    ACME Degree College, Osmania University
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-xs text-black/50 tracking-wide md:col-span-1">
                  2021 — 2023
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-black">Intermediate</h3>
                  <p className="text-xs text-black/70 mt-1">
                    Sultan-Ul-Uloom Junior College
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="border-t border-black/10 pt-8">
              <h2 className="text-base font-bold text-black tracking-tight mb-8">
                Skills
              </h2>
              <div className="space-y-3 text-xs leading-relaxed text-black/80">
                <p>
                  <span className="font-bold text-black">Languages & Backend:</span> Python, Django, JavaScript, Node.js, HTML, CSS, RESTful APIs
                </p>
                <p>
                  <span className="font-bold text-black">Frontend & UI Design:</span> React, Framer, Tailwind CSS, Component Systems, Responsive UI
                </p>
                <p>
                  <span className="font-bold text-black">DevOps & Database:</span> PostgreSQL/MySQL, Docker, Kubernetes (K8s), Git, CI/CD Maintenance
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ================= INFO VIEW ================= */}
        {activeTab === 'info' && (
          <div className="pt-4 pb-24 text-black max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mb-10">
              A little about me.
            </h1>

            <div className="space-y-6 text-base sm:text-lg text-black/80 leading-relaxed font-normal">
              <p>
                Hey there! I’m <span className="font-semibold text-black">Mohammed Ismail Ahmed</span>, a designer and full-stack developer based in Hyderabad.
              </p>

              <p>
                I enjoy living at the intersection of design systems and functional code. Whether sketching wireframes in Framer and Figma or building out full-stack applications with React, Node.js, and Python/Django, I care deeply about how software feels just as much as how it runs under the hood.
              </p>

              <p>
                When I’m not debugging layouts or configuring Docker containers, you’ll probably find me exploring clean digital aesthetics, contributing tech support at Vyreka, or testing out new side-project concepts.
              </p>

              <p className="pt-4">
                Always open to interesting projects, good conversations, or collaborating on something ambitious. Feel free to say hi!
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Global Minimal Footer */}
      <footer className="max-w-4xl mx-auto px-6 w-full border-t border-black/10 py-14 text-black">
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-start gap-8 sm:gap-16 md:gap-24 text-sm sm:text-base text-black/70">
          <div className="max-w-xs leading-relaxed">
            Thanks for making it this far without closing the tab! If you have thoughts, critique, or just want to tell me how great (or wildly misguided) something is, reach out through any of the links provided there. My inbox is always open :)
          </div>
          <div>
            <p className="text-sm font-semibold text-black tracking-wide mb-2">
              Reach out
            </p>
            <div className="flex flex-col space-y-1.5 text-sm sm:text-base font-normal">
              <a href="mailto:mismailahmed46@gmail.com"
                className="text-black/80 hover:text-black transition-colors">
                Email
              </a>

              <a href="https://www.linkedin.com/in/mohammedismail02/" target="_blank" rel="noreferrer"
                className="text-black/80 hover:text-black transition-colors">
                LinkedIn
              </a>

              <a href="https://wa.me/919000218293" target="_blank" rel="noreferrer"
                className="text-black/80 hover:text-black transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}