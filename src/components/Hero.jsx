import { motion } from 'framer-motion';
import SignalIcons from './SignalIcons';

const Hero = () => {
    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: 0, paddingBottom: 0 }}>
            <div className="breathing-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="container"
            >
                <span style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontSize: '0.9rem',
                    color: 'var(--accent-green)',
                    display: 'block',
                    marginBottom: '1rem'
                }}>
                    Artistic Documentation
                </span>
                <h1
                    style={{ marginBottom: '1.5rem', fontSize: '4rem', lineHeight: 1.1, cursor: 'pointer' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Biotuner
                </h1>
                <p style={{ margin: '0 auto 2rem', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: '45ch', lineHeight: 1.5 }}>
                    Treating the harmonic architecture of various signal sources as a compositional medium.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="#compositions" className="btn">Listen</a>
                    <a href="#concept" className="btn">Explore</a>
                </div>

                <SignalIcons />
            </motion.div>
        </section>
    );
};

export default Hero;
