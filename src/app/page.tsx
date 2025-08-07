"use client"
import { useState, useEffect, useMemo } from 'react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: "Bal.rs",
    description: "A load balancer in Rust that provides better security due to RUST's thread efficiency and memory management. It uses log files to dynamically change algorithms for load balancing, while also checking server health and implementing queueing for better management and to prevent downtime.",
    tags: ["Rust", "Load Balancer", "Distributed Systems", "Security", "Algorithms"],
    githubUrl: "https://github.com/rohancyriac029/rohan029-bal.rs"
  },
  {
    title: "AI Inventory Arbitrage",
    description: "Built an interactive inventory management and arbitrage system leveraging ML agents for decision-making and LLMs for analyzing strategy rationale. This enables autonomous optimization of supply chain operations with a user-friendly UI and real-time performance insights connected to the Gemini API.",
    tags: ["AI", "ML", "LLM", "Gemini API", "Inventory Management", "Supply Chain Optimization"],
    githubUrl: "https://github.com/rohancyriac029/Elysium"
  },
  {
    title: "Elysium - Community Support Platform",
    description: "A community support platform for individuals with rare diseases and addiction recovery. It features role-based authentication, real-time messaging, ML-powered user matching, and NLP-driven chatbot support.",
    tags: ["React", "Node.js", "Machine Learning", "NLP", "Real-time Chat", "Community Platform"],
    githubUrl: "https://github.com/rohancyriac029/Elysium"
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [typewriterText, setTypewriterText] = useState<string>('');
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);

  // Fix: useMemo to prevent the array from changing on every render, resolving the ESLint warning.
  const typewriterWords = useMemo(() => ['Developer', 'AI Enthusiast', 'Problem Solver', 'Innovator'], []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterIndex < currentWord.length) {
        setTypewriterText(currentWord.substring(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      } else if (isDeleting && typewriterIndex > 0) {
        setTypewriterText(currentWord.substring(0, typewriterIndex - 1));
        setTypewriterIndex(typewriterIndex - 1);
      } else if (!isDeleting && typewriterIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typewriterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % typewriterWords.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, wordIndex, typewriterWords]); // Fix: Added typewriterWords to the dependency array

  // Function to handle scroll and update active section
  const handleScroll = () => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
        setActiveSection(section);
        return;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        body {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .typewriter-cursor::after {
          content: '|';
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .slide-in-left { animation: slideInFromLeft 0.8s ease-out; }
        .slide-in-right { animation: slideInFromRight 0.8s ease-out; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out; }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .custom-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
        }
        
        .accent-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
        }
        
        .card-glass {
          backdrop-filter: blur(16px);
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
      `}</style>

      <div className="custom-gradient text-slate-200 min-h-screen">
        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 glass-effect shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <div className="text-2xl font-bold text-slate-100 slide-in-left">
              &lt;rohan.dev/&gt;
            </div>
            <div className="flex items-center space-x-8">
              {['about', 'projects', 'contact'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`font-medium transition-all duration-300 hover:text-blue-400 capitalize ${
                    activeSection === section ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-300'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6">
          {/* Hero Section */}
          <section id="hero" className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="space-y-6 fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight">
                {/* Fix: Replaced unescaped apostrophe with `&apos;` */}
                Hi, I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                  Rohan Cyriac Suraj
                </span>
              </h1>
              <div className="text-2xl md:text-3xl font-medium text-slate-300 h-16 flex items-center justify-center">
                <span className="typewriter-cursor">
                  {typewriterText}
                </span>
              </div>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400 leading-relaxed">
                A passionate software developer interested in the fields of{' '}
                <span className="font-semibold text-blue-400">Gen AI</span> and{' '}
                <span className="font-semibold text-blue-400">distributed systems</span>.
                Crafting innovative solutions with clean code and creative thinking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 accent-gradient text-white font-medium rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-code mr-2"></i>
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-medium rounded-lg hover:bg-blue-400 hover:text-slate-900 transition-all duration-300"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Get In Touch
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-100">
                {/* Fix: Wrapped comment-like text in braces */}
                <span className="text-blue-400">{`//`}</span> About Me
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="text-lg leading-relaxed text-slate-300 mb-6">
                    Passionate learner focused on delivering impactful results through creativity and innovation. 
                    Experienced in tackling dynamic challenges and crafting intuitive user experiences.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-300 mb-8">
                    Currently expanding knowledge in AI/ML and exploring distributed systems concepts.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-3 text-center">
                        <i className="fas fa-code text-blue-400 mr-2"></i>
                        Languages & Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Python', 'C', 'C++', 'MERN', 'Rust'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-slate-700/50 text-blue-300 rounded-full text-sm font-medium border border-slate-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-3 text-center">
                        <i className="fas fa-database text-blue-400 mr-2"></i>
                        Databases
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['SQL', 'NoSQL'].map(db => (
                          <span key={db} className="px-3 py-1 bg-slate-700/50 text-purple-300 rounded-full text-sm font-medium border border-slate-600">
                            {db}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-3 text-center">
                        <i className="fas fa-project-diagram text-blue-400 mr-2"></i>
                        Project Fields
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['AI/ML', 'Distributed Systems', 'ARM Code', 'Computer Networks', 'Arduino'].map(field => (
                          <span key={field} className="px-3 py-1 bg-slate-700/50 text-indigo-300 rounded-full text-sm font-medium border border-slate-600">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-100">
              {/* Fix: Wrapped comment-like text in braces */}
              <span className="text-blue-400">{`//`}</span> My Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="card-glass p-6 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-slate-600/30 group hover:transform hover:scale-105 fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-4">
                    <i className="fas fa-folder-open text-blue-400 text-xl mr-3"></i>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-slate-700/70 text-slate-300 text-xs px-2 py-1 rounded-md font-medium border border-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                  >
                    <i className="fab fa-github mr-2"></i>
                    View on GitHub
                    <i className="fas fa-external-link-alt ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              ))}
            </div>
          </section>
          <div className="mb-8 justify-center items-center flex">
                <a
                  href="https://github.com/rohancyriac029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center px-8 py-4 border-2 border-blue-400 text-blue-400 font-medium rounded-lg hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105 group"
                >
                  <i className="fab fa-github text-2xl mb-2 group-hover:rotate-12 transition-transform duration-300"></i>
                  Go to My Other Projects
                </a>
              </div>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-100">
                {/* Fix: Wrapped comment-like text in braces */}
                <span className="text-blue-400">{`//`}</span> Let&apos;s Connect
              </h2>
              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                {/* Fix: Replaced unescaped apostrophe with `&apos;` */}
                I&apos;m currently open to new opportunities and exciting collaborations. 
                Whether you have a project in mind or just want to chat about tech, feel free to reach out!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <a
                  href="mailto:rohancyriac572@gmail.com"
                  className="px-8 py-4 accent-gradient text-white font-medium rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <i className="fas fa-envelope mr-3"></i>
                  rohancyriac572@gmail.com
                </a>
              </div>
              
              
              
              <div className="flex justify-center space-x-8">
                <a
                  href="https://github.com/rohancyriac029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-github text-3xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/rohan-cyriac-6a71b930a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-linkedin text-3xl"></i>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-slate-600 bg-slate-800/60 backdrop-blur-sm">
          <p className="text-slate-400 font-mono">
            © 2025 Rohan Cyriac Suraj. Crafted with <i className="fas fa-heart text-red-400"></i> and code.
          </p>
        </footer>
      </div>
    </>
  );
}