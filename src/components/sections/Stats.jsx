import { useState, useEffect, useRef } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({});
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Sample stats data - replace with your actual data
  const stats = [
    { label: 'Years of Experience', value: 15, suffix: '+', icon: '📅' },
    { label: 'Active Clients', value: 1000, suffix: '+', icon: '🤝' },
    { label: 'Team Members', value: 55, suffix: '+', icon: '👥' },
    { label: 'Group Firms', value: 3, suffix: '+', icon: '🏢' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts(prev => ({
            ...prev,
            [stat.label]: Math.min(Math.floor(increment * currentStep), stat.value)
          }));
        } else {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-[#083A4F] via-[#083A4F] to-[#407E8C] py-14 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A58D66] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C0D5D6] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A58D66]/20 border border-[#A58D66]/30 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 bg-[#A58D66] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold uppercase tracking-wide text-[#A58D66]">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E1DD]">
            Trusted by businesses across India
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`rounded-2xl border-2 backdrop-blur-sm p-6 text-center transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                hoveredIndex === index
                  ? 'border-[#A58D66] bg-gradient-to-br from-white/20 to-[#407E8C]/30 -translate-y-3 shadow-2xl shadow-[#A58D66]/20'
                  : 'border-white/20 bg-white/10 hover:border-[#A58D66]/50'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              {/* Icon */}
              <div 
                className={`text-4xl mb-3 transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                }`}
              >
                {item.icon}
              </div>

              {/* Animated counter */}
              <div className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-300 ${
                hoveredIndex === index ? 'text-[#A58D66]' : 'text-[#E5E1DD]'
              }`}>
                {counts[item.label] || 0}{item.suffix}
              </div>

              {/* Label */}
              <div className={`text-sm font-medium transition-colors duration-300 ${
                hoveredIndex === index ? 'text-[#E5E1DD]' : 'text-[#C0D5D6]'
              }`}>
                {item.label}
              </div>

              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#A58D66]/30 to-transparent rounded-bl-full transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}></div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#407E8C] via-[#A58D66] to-[#407E8C] transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-[#A58D66]/10 blur-xl transition-opacity duration-500 -z-10 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div 
          className={`mt-8 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#C0D5D6] text-lg max-w-2xl mx-auto leading-relaxed">
            Building lasting relationships through exceptional service and measurable results
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#A58D66]"></div>
            <div className="w-2 h-2 bg-[#A58D66] rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#A58D66]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Demo
function Demo() {
  return (
    <div className="min-h-screen bg-[#E5E1DD]">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#083A4F] mb-4">Scroll down to see stats animate</h1>
          <p className="text-[#407E8C]">↓</p>
        </div>
      </div>
      <Stats />
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-[#083A4F]">More content here...</h2>
      </div>
    </div>
  );
}