import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import TechMarquee from './components/TechMarquee';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import CallButton from './components/CallButton';
import Header from './components/Header';
import Footer from './components/Footer';
import PlaceholderSection from './components/PlaceholderSection';


export default function Home() {
  const blogPosts = [
    {
      title: 'The Future of AI Scalability',
      date: 'MAR 2026',
      excerpt: 'Exploring how quantum-inspired algorithms are reshaping the Silicon Valley tech stack and what it means for enterprise architecture.',
      image: '/images/blog_1.png'
    },
    {
      title: 'Engineering for 10M+ Users',
      date: 'FEB 2026',
      excerpt: 'Lessons learned from scaling Lahore\'s biggest multi-vendor marketplace to handle massive peak-hour traffic without latency.',
      image: '/images/blog_2.png'
    },
    {
      title: 'The Antique Modern Aesthetic',
      date: 'JAN 2026',
      excerpt: 'How we blend classic mathematical precision with modern WebGL and 3D interactions to create premium digital experiences.',
      image: '/images/blog_3.png'
    }
  ];

  const lifeEvents = [
    {
      caption: 'Deep-dive architectural session in our Lahore hub.',
      image: '/images/life_1.png'
    },
    {
      caption: 'Unwinding at the Shanwo Tech creative lounge.',
      image: '/images/life_2.png'
    },
    {
      caption: 'Celebrating another successful Silicon Valley deployment.',
      image: '/images/life_3.png'
    }
  ];

  const careerOpenings = [
    {
      title: 'Full Stack Architect',
      description: 'Master of Next.js, Java, and scalable cloud systems. Join our elite engineering pod.',
      image: '/images/career_1.png'
    },
    {
      title: 'UI/UX Visionary',
      description: 'A designer with the soul of an artist and the precision of a mathematician.',
      image: '/images/career_2.png'
    },
    {
      title: 'Backend Engineer (C#/.NET)',
      description: 'Building the enterprise-grade foundation for the next generation of global apps.',
      image: '/images/career_3.png'
    }
  ];

  return (
    <main>
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="services">
        <ServicesGrid />
      </div>
      <TechMarquee />
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="blogs">
        <PlaceholderSection title="Blogs" id="blogs" type="alt" items={blogPosts} category="blog" />
      </div>
      <div id="careers">
        <PlaceholderSection title="Careers" id="careers" items={careerOpenings} category="career" />
      </div>
      <div id="life">
        <PlaceholderSection title="Life at Shanwo" id="life" type="alt" items={lifeEvents} category="life" />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
      <CallButton />
    </main>
  );
}
