import { useState, useEffect } from 'react';

function Button({ children, href = '#', variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:scale-105 hover:shadow-lg active:scale-95';
  
  const styles =
    variant === 'primary'
      ? 'bg-[#E5E1DD] text-[#083A4F] hover:bg-[#A58D66] hover:text-[#E5E1DD] focus-visible:ring-[#E5E1DD] shadow-md hover:shadow-[#A58D66]/30'
      : 'bg-transparent text-[#E5E1DD] border-2 border-[#E5E1DD] hover:bg-[#E5E1DD] hover:text-[#083A4F] focus-visible:ring-[#E5E1DD] shadow-sm';

  return (
    <a href={href} className={`${base} ${styles} group relative overflow-hidden`}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { key: 'years', target: 40, label: 'Years of advisory', delay: 200, suffix: '+' },
    { key: 'clients', target: 1000, label: 'Clients supported', delay: 400, suffix: '+' },
    { key: 'professionals', target: 55, label: 'Professionals', delay: 600, suffix: '+' },
    { key: 'groups', target: 3, label: 'Group Firms', delay: 800, suffix: '+' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const duration = 2000; // 2 seconds
    const steps = 60; // Number of animation steps
    const stepDuration = duration / steps;
    
    stats.forEach((stat) => {
      let currentStep = 0;
      const increment = stat.target / steps;
      
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts(prev => ({
            ...prev,
            [stat.key]: Math.min(Math.floor(increment * currentStep), stat.target)
          }));
        } else {
          clearInterval(timer);
        }
      }, stepDuration);
    });
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offset = 80; // Offset for fixed navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const deliverables = [
    { icon: '🌏', text: 'Entry and expansion strategy for India' },
    { icon: '📊', text: 'Audit, internal controls and risk assurance' },
    { icon: '💼', text: 'Tax and regulatory guidance thats practical' },
    { icon: '📈', text: 'Transaction support and valuations' },
    { icon: '🏢', text: 'Corporate and secretarial services' }
  ];

  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    professionals: 0,
    groups: 0
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#083A4F] via-[#407E8C] to-[#083A4F] text-[#E5E1DD] min-h-screen flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#083A4F]/80 via-[#083A4F]/70 to-[#407E8C]/80"></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute -left-10 top-10 h-96 w-96 rounded-full bg-[#E5E1DD]/20 blur-3xl transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-[#A58D66]/30 blur-3xl transition-transform duration-300"
          style={{
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`
          }}
        />
        <div 
          className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-[#C0D5D6]/20 blur-3xl transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:py-16 z-10">
        {/* Left content */}
        <div 
          className={`flex-1 space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A58D66]/20 border border-[#A58D66]/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#A58D66] rounded-full animate-pulse"></span>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#A58D66]">
              Trusted business advisors
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Chartered Accountants with{' '}
            <span className="text-[#A58D66] inline-block hover:scale-105 transition-transform duration-300">
              clarity
            </span>{' '}
            and{' '}
            <span className="text-[#C0D5D6] inline-block hover:scale-105 transition-transform duration-300">
              confidence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C0D5D6] max-w-2xl leading-relaxed">
            We pair financial discipline with practical insight to help businesses set up, stay compliant, and scale
            with certainty across India and beyond.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#contact">Talk to us</Button>
            <Button variant="secondary" href="#services">
              View services
            </Button>
          </div>


        </div>

        {/* Right content - Services card */}
        <div 
          className={`flex-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg border border-white/20 hover:border-[#A58D66]/50 transition-all duration-500 hover:shadow-[#A58D66]/20 hover:-translate-y-2">
            <div className="rounded-xl border border-white/20 bg-gradient-to-br from-white/5 to-transparent p-6">
              <div className="mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#A58D66] rounded-full"></span>
                <div className="text-lg font-bold text-[#A58D66]">What we deliver</div>
              </div>
              <ul className="space-y-4">
                {deliverables.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-base leading-relaxed text-[#E5E1DD]/90 group hover:text-[#E5E1DD] transition-all duration-300 hover:translate-x-2 cursor-pointer"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                  >
                    <span className="text-xl mt-0.5 group-hover:scale-125 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-[#C0D5D6]/60">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// Demo
function Demo() {
  return (
    <div>
      <Hero />
      <div className="h-screen bg-[#E5E1DD] flex items-center justify-center">
        <h2 className="text-4xl font-bold text-[#083A4F]">Rest of your website continues here...</h2>
      </div>
    </div>
  );
}