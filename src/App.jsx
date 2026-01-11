import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import Concept from './components/Concept';
import Gallery from './components/Gallery';
import Tunings from './components/Tunings';
import QuoteSection from './components/QuoteSection';
import ScrollyTelling from './components/ScrollyTelling';
import ExternalWorks from './components/ExternalWorks';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/assets/manifest.json')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error("Failed to load manifest", err));
  }, []);

  return (
    <div className="app">
      <Header />

      <Hero />

      <Concept />

      <ExternalWorks items={data?.external_works} />

      <Gallery items={data?.compositions} />

      <ScrollyTelling />

      <Tunings items={data?.tunings} />

      <footer style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '4rem'
      }}>
        <p style={{ margin: '0 auto 1rem', fontSize: '0.9rem' }}>
          Biotuner is a python toolbox for the sonification of various biological and non-biological signals. This website documents the aesthetic outcomes of the biotuner. More to read in a peer-reviewed paper submitted to Organised Sound.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <a href="https://github.com/AntoineBellemare/biotuner" target="_blank" rel="noopener noreferrer">Toolbox GitHub</a>
          <a href="https://biotuner.kairos-creation.org" target="_blank" rel="noopener noreferrer">Biotuner Engine</a>
        </div>
        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>
          &copy; {new Date().getFullYear()} Biotuner by <a href="https://kairos-hive.org" target="_blank" rel="noopener noreferrer">Kairos Hive</a>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
