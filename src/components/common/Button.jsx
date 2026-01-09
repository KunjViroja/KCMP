export default function Button({ children, href = '#', variant = 'primary' }) {
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

// Demo
function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5E1DD] to-[#C0D5D6] flex items-center justify-center p-8">
      <div className="flex flex-col gap-6 items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#083A4F] mb-2">KCMP & Associates</h1>
          <p className="text-[#407E8C] text-lg">Chartered Accountants</p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" href="#contact">
            Get Started
          </Button>
          <Button variant="secondary" href="#services">
            Our Services
          </Button>
        </div>
        
        <div className="mt-8 p-6 bg-white/50 backdrop-blur rounded-2xl shadow-lg">
          <p className="text-[#083A4F] text-sm">Hover over the buttons to see the animations!</p>
        </div>
      </div>
    </div>
  );
}