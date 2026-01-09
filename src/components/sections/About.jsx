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

function Button({ children, href = '#', variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:scale-105 hover:shadow-lg active:scale-95';
  
  const styles =
    variant === 'primary'
      ? 'bg-[#083A4F] text-[#E5E1DD] hover:bg-[#407E8C] focus-visible:ring-[#083A4F] shadow-md hover:shadow-[#407E8C]/30'
      : 'bg-[#E5E1DD] text-[#083A4F] border-2 border-[#083A4F] hover:bg-[#C0D5D6] hover:border-[#407E8C] focus-visible:ring-[#083A4F] shadow-sm';

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

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const reasons = [
    { icon: '🎯', text: '360° services spanning audit, tax, advisory, and corporate' },
    { icon: '👥', text: 'Senior-led engagements with responsive teams' },
    { icon: '💡', text: 'Clear, actionable insights—no jargon' },
    { icon: '🛡️', text: 'Strong governance and risk focus without slowing operations' },
    { icon: '🌏', text: 'Pan-India reach with global client experience' }
  ];

  return (
    <section id="about" className="bg-white py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0D5D6]/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-3xl -z-0"></div>
      
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center relative z-10">
        <div className="flex-1 space-y-8">
          <SectionTitle
            eyebrow="About us"
            title="KCMP & Associates – trusted advisors for over three decades"
            description="Established in 1982 and headquartered in Mumbai, we are an established financial advisory firm with more than 55 professionals and a presence across India."
            align="left"
          />
          <p className="text-base text-[#083A4F]/70 leading-relaxed">
            We combine financial accuracy with pragmatic advice, supporting over 100 clients worldwide at every stage of
            their journey—from set-up to stabilisation and beyond. Our teams collaborate across audit, tax, advisory,
            and corporate services to provide a single, reliable partner for your growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#contact">Let's talk</Button>
            <Button variant="secondary" href="#careers">
              Join our team
            </Button>
          </div>
        </div>
        
        <div 
          ref={cardRef}
          className={`flex-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="rounded-2xl border border-[#C0D5D6] bg-gradient-to-br from-white to-[#E5E1DD]/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <h3 className="mb-6 text-xl font-bold text-[#083A4F] flex items-center gap-2">
              <span className="w-1 h-6 bg-[#A58D66] rounded-full"></span>
              Why clients choose us
            </h3>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-sm text-[#083A4F]/80 group transition-all duration-300 hover:translate-x-2"
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <span className="text-lg mt-0.5 group-hover:scale-125 transition-transform duration-300">
                    {reason.icon}
                  </span>
                  <span className="leading-relaxed">{reason.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}