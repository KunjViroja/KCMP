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
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:scale-105 hover:shadow-lg active:scale-95';
  
  const styles =
    variant === 'primary'
      ? 'bg-[#083A4F] text-[#E5E1DD] hover:bg-[#407E8C] focus-visible:ring-[#083A4F] shadow-md hover:shadow-[#407E8C]/30'
      : 'bg-transparent text-[#083A4F] border-2 border-[#083A4F] hover:bg-[#083A4F] hover:text-[#E5E1DD] focus-visible:ring-[#083A4F] shadow-sm';

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href;
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={`${base} ${styles} group relative overflow-hidden`}>
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

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const services = [
    {
      icon: '🔍',
      title: 'Audit & Assurance',
      subtitle: 'Financial statement audits with depth',
      description: 'Statutory, internal, and special audits that meet regulatory standards while uncovering actionable insights for improved controls.',
      cta: 'Learn more'
    },
    {
      icon: '💼',
      title: 'Tax Advisory',
      subtitle: 'Direct and indirect tax planning',
      description: 'Proactive tax strategies, compliance support, and representation before authorities to optimize your tax position.',
      cta: 'Explore services'
    },
    {
      icon: '📊',
      title: 'Business Advisory',
      subtitle: 'Strategic guidance for growth',
      description: 'Market entry strategies, business planning, and operational improvements tailored to your industry and goals.',
      cta: 'Get started'
    },
    {
      icon: '📈',
      title: 'Transaction Services',
      subtitle: 'M&A and valuation support',
      description: 'Due diligence, business valuations, and transaction structuring to help you make informed investment decisions.',
      cta: 'Discuss deals'
    },
    {
      icon: '🏢',
      title: 'Corporate Services',
      subtitle: 'Company secretarial and compliance',
      description: 'Entity formation, statutory compliance, board support, and corporate governance services across jurisdictions.',
      cta: 'View offerings'
    },
    {
      icon: '⚖️',
      title: 'Risk & Compliance',
      subtitle: 'Governance and internal controls',
      description: 'Risk assessments, internal control frameworks, and regulatory compliance to strengthen your governance posture.',
      cta: 'Strengthen controls'
    }
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

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="bg-[#E5E1DD] py-16 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#407E8C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-3xl"></div>
      
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 relative z-10">
        <SectionTitle
          eyebrow="What we do"
          title="Full-service advisory, compliance and assurance"
          description="We cover the lifecycle of your business from entry and set-up to scale, ensuring governance, tax efficiency and strategic clarity along the way."
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#083A4F] text-[#E5E1DD] flex items-center justify-center shadow-xl hover:bg-[#407E8C] transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#083A4F] text-[#E5E1DD] flex items-center justify-center shadow-xl hover:bg-[#407E8C] transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)` 
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <article className="flex h-full flex-col gap-4 rounded-2xl border-2 p-6 md:p-8 shadow-lg transition-all duration-500 bg-gradient-to-br from-[#E5E1DD]/50 to-white/80 border-[#A58D66]/60 hover:border-[#407E8C] hover:shadow-xl mx-auto max-w-3xl min-h-[400px]">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#C0D5D6]/30 to-[#407E8C]/20 transition-all duration-500 hover:scale-110">
                      <span className="text-3xl">{service.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#407E8C]">
                        {service.title}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-[#083A4F]">
                        {service.subtitle}
                      </h3>
                      
                      <p className="text-base text-[#083A4F]/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Button variant="secondary" href="#contact">
                        {service.cta}
                      </Button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[#407E8C]' 
                    : 'bg-[#C0D5D6] hover:bg-[#407E8C]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div 
          className={`mt-6 rounded-2xl bg-gradient-to-br from-[#E5E1DD]/50 to-white/80 border-2 border-[#A58D66]/60 shadow-lg transition-all duration-1000 delay-700 overflow-hidden max-w-5xl mx-auto ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-5">
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-7 bg-[#083A4F] rounded-full"></div>
                <h3 className="text-lg font-bold text-[#083A4F]">
                  Need a custom solution?
                </h3>
              </div>
              <p className="text-[#083A4F]/70 leading-relaxed text-sm pl-3">
                Every business is unique. Let's discuss how we can tailor our services to meet your specific needs and drive your success.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#contact');
                  if (target) {
                    window.scrollTo({
                      top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="px-5 py-2 bg-[#083A4F] text-[#E5E1DD] rounded-full font-semibold text-sm hover:bg-[#407E8C] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg inline-block whitespace-nowrap"
              >
                Schedule a consultation
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
      <Services />
    </div>
  );
}