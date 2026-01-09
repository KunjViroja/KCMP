import { useState, useEffect, useRef } from 'react';

function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`flex flex-col gap-4 ${alignment} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-[#407E8C] inline-flex items-center gap-2">
          <span className="w-8 h-0.5 bg-[#A58D66]"></span>
          {eyebrow}
          <span className="w-8 h-0.5 bg-[#A58D66]"></span>
        </span>
      )}
      {title && (
        <h2 className="text-4xl md:text-5xl font-bold text-[#083A4F] leading-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-3xl text-lg text-[#083A4F]/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Industries() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  // Sample industries data - replace with your actual data
  const industries = [
    { title: 'Technology', icon: '💻' },
    { title: 'Manufacturing', icon: '🏭' },
    { title: 'Healthcare', icon: '🏥' },
    { title: 'Financial Services', icon: '💰' },
    { title: 'Real Estate', icon: '🏢' },
    { title: 'Retail', icon: '🛍️' },
    { title: 'Education', icon: '📚' },
    { title: 'Hospitality', icon: '🏨' },
    { title: 'Energy', icon: '⚡' },
    { title: 'Automotive', icon: '🚗' },
    { title: 'Pharmaceuticals', icon: '💊' },
    { title: 'E-commerce', icon: '📦' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="industries" 
      ref={sectionRef}
      className="bg-gradient-to-b from-[#E5E1DD]/30 to-white py-16 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0D5D6]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-3xl"></div>
      
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 relative z-10">
        <SectionTitle
          eyebrow="Who we serve"
          title="Experience across sectors and geographies"
          description="From global conglomerates to fast-growing start-ups, we bring sector knowledge and local expertise to every engagement."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex flex-col items-center gap-4 rounded-2xl border-2 bg-gradient-to-br from-[#E5E1DD]/30 to-white/90 p-6 text-center shadow-sm cursor-pointer group transition-all duration-500 ${
                hoveredIndex === index 
                  ? 'border-[#A58D66] shadow-xl -translate-y-2 from-[#E5E1DD]/40 to-white/80' 
                  : 'border-[#A58D66]/40 hover:border-[#A58D66]/60'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div 
                className={`text-5xl transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                }`}
              >
                {industry.icon}
              </div>
              <div className={`text-sm font-semibold transition-colors duration-300 ${
                hoveredIndex === index ? 'text-[#407E8C]' : 'text-[#083A4F]'
              }`}>
                {industry.title}
              </div>
              
              {/* Animated border accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A58D66] to-[#407E8C] rounded-b-2xl transition-all duration-500 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div 
          className={`mt-6 p-6 rounded-2xl border border-[#A58D66]/40 bg-gradient-to-br from-[#E5E1DD]/30 to-white/90 backdrop-blur-sm shadow-lg transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#083A4F] mb-2 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#A58D66] rounded-full"></span>
                Industry-Specific Expertise
              </h3>
              <p className="text-[#083A4F]/70 leading-relaxed">
                Our sector-focused teams understand the unique challenges and opportunities in your industry, delivering tailored solutions that drive growth.
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-[#083A4F] text-[#E5E1DD] rounded-full font-semibold hover:bg-[#407E8C] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Discuss your sector
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Demo
function Demo() {
  return (
    <div className="min-h-screen">
      <Industries />
    </div>
  );
}