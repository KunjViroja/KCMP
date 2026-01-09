import { useState, useEffect, useRef } from 'react';

export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
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
        <span 
          className="text-sm font-semibold uppercase tracking-wider text-[#407E8C] inline-flex items-center gap-2"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="w-8 h-0.5 bg-[#A58D66]"></span>
          {eyebrow}
          <span className="w-8 h-0.5 bg-[#A58D66]"></span>
        </span>
      )}
      {title && (
        <h2 
          className="text-4xl md:text-5xl font-bold text-[#083A4F] leading-tight"
          style={{ transitionDelay: '200ms' }}
        >
          {title}
        </h2>
      )}
      {description && (
        <p 
          className="max-w-3xl text-lg text-[#083A4F]/70 leading-relaxed"
          style={{ transitionDelay: '300ms' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Demo
function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5E1DD] via-[#C0D5D6] to-[#E5E1DD] py-20 px-8">
      <div className="max-w-6xl mx-auto space-y-32">
        {/* Centered Example */}
        <section className="space-y-12">
          <SectionTitle
            eyebrow="Welcome to"
            title="KCMP & Associates"
            description="Professional chartered accountants providing comprehensive financial solutions for businesses and individuals across all sectors."
            align="center"
          />
          <div className="h-px bg-gradient-to-r from-transparent via-[#A58D66] to-transparent"></div>
        </section>

        {/* Left Aligned Example */}
        <section className="space-y-12">
          <SectionTitle
            eyebrow="Our Services"
            title="Comprehensive Financial Solutions"
            description="From audit and assurance to tax planning and business advisory, we provide tailored solutions that drive growth and ensure compliance."
            align="left"
          />
        </section>

        {/* Another Centered Example */}
        <section className="space-y-12">
          <SectionTitle
            eyebrow="Get in Touch"
            title="Let's Discuss Your Financial Goals"
            description="Schedule a consultation with our expert team to explore how we can help your business thrive."
            align="center"
          />
        </section>

        <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl shadow-lg">
          <p className="text-[#083A4F] text-sm">Scroll to see the fade-in animations!</p>
        </div>
      </div>
    </div>
  );
}
