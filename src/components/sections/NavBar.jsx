import { useState, useEffect } from 'react';

function Logo({ variant = 'default' }) {
  const isFooter = variant === 'footer';
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Your logo images - separate for navbar and footer */}
        <img 
          src={isFooter ? "/logo-footer.png" : "/logo-navbar.png"}
          alt="KCMP & Associates Logo" 
          className={`${isFooter ? 'h-16' : 'h-20'} w-auto object-contain ${
            !isFooter ? 'rounded-xl bg-[#E5E1DD]/95 backdrop-blur-lg p-2' : ''
          }`}
        />
      </div>
    </div>
  );
}

function Button({ children, href = '#', variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:scale-105 hover:shadow-lg active:scale-95';
  
  const styles =
    variant === 'primary'
      ? 'bg-[#083A4F] text-[#E5E1DD] hover:bg-[#407E8C] focus-visible:ring-[#083A4F] shadow-md hover:shadow-[#407E8C]/30'
      : 'bg-[#E5E1DD] text-[#083A4F] border-2 border-[#083A4F] hover:bg-[#C0D5D6] hover:border-[#407E8C] focus-visible:ring-[#083A4F] shadow-sm';

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

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Sample nav links - replace with your actual data
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#careers' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
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
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#E5E1DD]/95 backdrop-blur-lg shadow-lg border-b border-[#C0D5D6]' 
          : 'bg-[#E5E1DD]/90 backdrop-blur border-b border-[#C0D5D6]/60'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="cursor-pointer"
        >
          <Logo variant="default" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-2 transition-all duration-300 group ${
                  isActive ? 'text-[#407E8C]' : 'text-[#083A4F] hover:text-[#407E8C]'
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#407E8C] to-[#A58D66] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <Button href="#contact">Contact Us</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
            open 
              ? 'border-[#407E8C] bg-[#407E8C] text-[#E5E1DD] rotate-90' 
              : 'border-[#C0D5D6] bg-[#E5E1DD] text-[#083A4F] hover:border-[#407E8C] hover:bg-[#C0D5D6]'
          }`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle navigation"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden border-t border-[#C0D5D6] bg-[#E5E1DD]/98 backdrop-blur-lg transition-all duration-500 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#407E8C] text-[#E5E1DD]' 
                    : 'text-[#083A4F] hover:bg-[#C0D5D6] hover:text-[#407E8C]'
                }`}
                style={{
                  transitionDelay: open ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mt-3">
            <Button href="#contact">Contact Us</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Demo
function Demo() {
  return (
    <div>
      <NavBar />
      <div id="home" className="h-screen bg-gradient-to-br from-[#083A4F] to-[#407E8C] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#E5E1DD]">Home Section</h1>
      </div>
      <div id="services" className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#083A4F]">Services Section</h1>
      </div>
      <div id="industries" className="h-screen bg-[#E5E1DD] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#083A4F]">Industries Section</h1>
      </div>
      <div id="about" className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#083A4F]">About Section</h1>
      </div>
      <div id="careers" className="h-screen bg-[#E5E1DD] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#083A4F]">Careers Section</h1>
      </div>
      <div id="contact" className="h-screen bg-[#407E8C] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-[#E5E1DD]">Contact Section</h1>
      </div>
    </div>
  );
}