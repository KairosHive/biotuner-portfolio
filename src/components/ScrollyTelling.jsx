import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollyTelling.css';

const figures = [
    // ... (rest of the file content until the style block)
    {
        id: 'intro',
        src: '/assets/figures/gemini_1.png',
        alt: 'Abstract visualization of biological rhythms',
        caption: 'Biological rhythms harbor rich, self-organizing structures.'
    },

    {
        id: 'future',
        src: '/assets/figures/gemini_2.png',
        alt: 'Artistic representation of bio-digital convergence',
        caption: 'Symbiotic creative practices bridging diverse ontologies.'
    }
];

const TextSection = ({ id, activeId, setActiveId, children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            if (v > 0 && v < 1) {
                setActiveId(id);
            }
        });
        return unsubscribe;
    }, [id, setActiveId, scrollYProgress]);

    return (
        <motion.div
            ref={ref}
            className={`text-section ${activeId === id ? 'active' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-20% 0px -20% 0px" }}
        >
            <div className="glass-panel content-box">
                {children}
            </div>
        </motion.div>
    );
};

const ScrollyTelling = () => {
    const [activeId, setActiveId] = useState('intro');

    return (
        <section style={{ padding: 0, position: 'relative' }}>
            <div className="scrolly-layout">
                <div className="sticky-visual">
                    {figures.map((fig) => (
                        <div
                            key={fig.id}
                            className="visual-container"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                opacity: activeId === fig.id ? 1 : 0,
                                transition: 'opacity 0.8s ease-in-out', // CSS transition is often smoother than JS motion for simple opacity
                                pointerEvents: 'none'
                            }}
                        >
                            <img
                                src={fig.src}
                                alt={fig.alt}
                                style={{
                                    maxHeight: '70vh',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                }}
                            />
                            <p
                                style={{
                                    marginTop: '1.5rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    background: 'rgba(0,0,0,0.4)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    backdropFilter: 'blur(4px)'
                                }}
                            >
                                {fig.caption}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="scrolling-text">
                    <TextSection id="intro" activeId={activeId} setActiveId={setActiveId}>
                        <h2>Generative Musical Structures</h2>
                        <p>
                            Biological rhythms—whether measured in heartbeats, plant electrophysiology, or neural oscillations—harbor rich, self‑organizing structures that offer profound artistic potential.
                        </p>
                        <blockquote style={{ borderLeft: '3px solid var(--accent-green)', paddingLeft: '1.5rem', fontStyle: 'italic', margin: '2rem 0' }}>
                            "The concept of harmonicity, tracing back to Pythagoras' exploration of integer ratios in vibrating strings, has been observed across various natural phenomena... underscoring the self-organizing capacities of biological systems."
                        </blockquote>
                    </TextSection>



                    <TextSection id="future" activeId={activeId} setActiveId={setActiveId}>
                        <h2>Toward Symbiosis</h2>
                        <p>
                            By fostering these connections, creative practices serve as a bridge for diverse ontologies, offering a window into the musicality of self-organizing dynamics.
                        </p>
                        <p>
                            We move away from human-centric music towards a form of <em>embodied musical communication</em> that permeates life itself.
                        </p>
                    </TextSection>

                    <div style={{ height: '50vh' }}></div>
                </div>
            </div>

        </section>
    );
};

export default ScrollyTelling;
