import { useState } from 'react';

function Logo({ variant = 'default' }) {
  const isFooter = variant === 'footer';
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Your logo images - separate for navbar and footer */}
        <img 
          src={isFooter ? "/logo-footer.png" : "/logo-navbar.png"}
          alt="KCMP & Associates Logo" 
          className={`${isFooter ? 'h-40' : 'h-24'} w-auto object-contain ${
            !isFooter ? 'rounded-xl bg-[#E5E1DD]/95 backdrop-blur-lg p-2' : ''
          }`}
        />
      </div>
    </div>
  );
}

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState('');

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Phone', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#083A4F] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#407E8C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company info */}
            <div className="space-y-4">
              <Logo variant="footer" />
              <p className="text-sm text-[#C0D5D6]/80 leading-relaxed pl-3">
                Trusted financial advisors since 1982, providing comprehensive solutions for businesses across India.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3 pl-3 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#407E8C]/20 flex items-center justify-center text-[#C0D5D6] hover:bg-[#407E8C] hover:text-[#E5E1DD] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#A58D66] uppercase tracking-wider">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink('')}
                    className="text-sm text-[#C0D5D6] hover:text-[#E5E1DD] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span 
                      className={`w-0 h-0.5 bg-[#A58D66] transition-all duration-300 ${
                        hoveredLink === link.name ? 'w-4' : 'w-0'
                      }`}
                    ></span>
                    <span className={`transition-transform duration-300 ${
                      hoveredLink === link.name ? 'translate-x-1' : ''
                    }`}>
                      {link.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#A58D66] uppercase tracking-wider">
                Get In Touch
              </h4>
              <div className="space-y-3 text-sm text-[#C0D5D6]">
                <div className="flex items-start gap-3 group hover:text-[#E5E1DD] transition-colors duration-300">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98987 52053</span>
                </div>
                <div className="flex items-start gap-3 group hover:text-[#E5E1DD] transition-colors duration-300">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@kcmpassociates.com</span>
                </div>
                <div className="flex items-start gap-3 group hover:text-[#E5E1DD] transition-colors duration-300">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>The Millenium, Rajkot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#407E8C]/30 to-transparent mb-8"></div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#C0D5D6]/60">
              © {new Date().getFullYear()} KCMP & Associates. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[#C0D5D6]/60">
              <a href="#" className="hover:text-[#E5E1DD] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#E5E1DD] transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom accent */}
        <div className="h-1 bg-gradient-to-r from-[#083A4F] via-[#A58D66] to-[#407E8C]"></div>
      </div>
    </footer>
  );
}

// Demo
function Demo() {
  return (
    <div className="min-h-screen bg-[#E5E1DD]">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#083A4F] mb-4">Scroll down to see the footer</h1>
          <p className="text-[#407E8C]">↓</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}