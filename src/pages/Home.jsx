import NavBar from '../components/sections/NavBar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Industries from '../components/sections/Industries';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-sand">
      <NavBar />
      <Hero />
      <Services />
      <Industries />
      <About />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

