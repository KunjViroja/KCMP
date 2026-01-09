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

function Button({ children, onClick, variant = 'primary' }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer';
  
  const styles =
    variant === 'primary'
      ? 'bg-[#083A4F] text-[#E5E1DD] hover:bg-[#407E8C] focus-visible:ring-[#083A4F] shadow-md hover:shadow-[#407E8C]/30'
      : 'bg-[#E5E1DD] text-[#083A4F] border-2 border-[#083A4F] hover:bg-[#C0D5D6] hover:border-[#407E8C] focus-visible:ring-[#083A4F] shadow-sm';

  return (
    <div 
      onClick={onClick}
      className={`${base} ${styles} group relative overflow-hidden`}
    >
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
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      city: '',
      message: ''
    });
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const contactDetails = [
    { icon: '📞', label: 'Phone', value: '+91 98987 52053' },
    { icon: '📧', label: 'Email', value: 'info@kcmpassociates.com' },
    { icon: '📍', label: 'Address', value: 'KCMP & Associates (CA), The Millenium, Rajkot' }
  ];

  return (
    <section id="contact" className="bg-[#E5E1DD] py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#407E8C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A58D66]/10 rounded-full blur-3xl"></div>
      
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start relative z-10">
        <div className="flex-1 space-y-8">
          <SectionTitle
            eyebrow="Contact"
            title="Let's start a conversation"
            description="Tell us about your needs—whether it's a new set-up, a complex tax matter, or strengthening governance."
            align="left"
          />
          <div className="rounded-2xl border border-[#407E8C]/30 bg-gradient-to-br from-[#C0D5D6]/40 to-white/50 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="text-base font-bold text-[#407E8C] mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#A58D66] rounded-full"></span>
              Contact details
            </div>
            <ul className="space-y-4">
              {contactDetails.map((detail, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-4 text-sm text-[#083A4F] p-3 rounded-lg hover:bg-white/50 transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {detail.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-[#407E8C] text-xs uppercase tracking-wide">
                      {detail.label}
                    </div>
                    <div className="mt-1">{detail.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex-1 space-y-6 rounded-2xl border border-[#407E8C]/30 bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#083A4F] mb-2 block">
                Your Name*
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                className={`w-full rounded-lg border-2 px-4 py-3 text-sm bg-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'name'
                    ? 'border-[#083A4F] ring-4 ring-[#083A4F]/10'
                    : 'border-[#C0D5D6] hover:border-[#407E8C]'
                }`}
                placeholder="Jane Doe"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#083A4F] mb-2 block">
                Your Email*
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className={`w-full rounded-lg border-2 px-4 py-3 text-sm bg-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'email'
                    ? 'border-[#083A4F] ring-4 ring-[#083A4F]/10'
                    : 'border-[#C0D5D6] hover:border-[#407E8C]'
                }`}
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#083A4F] mb-2 block">
                Mobile Number
              </span>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                onFocus={() => setFocusedField('mobile')}
                onBlur={() => setFocusedField('')}
                className={`w-full rounded-lg border-2 px-4 py-3 text-sm bg-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'mobile'
                    ? 'border-[#083A4F] ring-4 ring-[#083A4F]/10'
                    : 'border-[#C0D5D6] hover:border-[#407E8C]'
                }`}
                placeholder="+91"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#083A4F] mb-2 block">
                City
              </span>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField('')}
                className={`w-full rounded-lg border-2 px-4 py-3 text-sm bg-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'city'
                    ? 'border-[#083A4F] ring-4 ring-[#083A4F]/10'
                    : 'border-[#C0D5D6] hover:border-[#407E8C]'
                }`}
                placeholder="Mumbai"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-[#083A4F] mb-2 block">
              Your Message
            </span>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              rows="4"
              className={`w-full rounded-lg border-2 px-4 py-3 text-sm bg-white transition-all duration-300 focus:outline-none resize-none ${
                focusedField === 'message'
                  ? 'border-[#083A4F] ring-4 ring-[#083A4F]/10'
                  : 'border-[#C0D5D6] hover:border-[#407E8C]'
              }`}
              placeholder="Tell us how we can help"
            />
          </label>
          <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </div>
      </div>
    </section>
  );
}