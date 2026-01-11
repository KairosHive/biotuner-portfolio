import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X } from "lucide-react";
import './ScrollyTelling.css';

const figures = [
    {
        id: 'glossary',
        src: '/assets/figures/gemini_1.png',
        alt: 'Visual Glossary: Neuroscience and Music Parallels',
        caption: 'Visual Glossary: Mapping the structural parallels between biological oscillations and musical harmony.'
    },
    {
        id: 'pipeline',
        src: '/assets/figures/gemini_2.png',
        alt: 'Harmonic Audification Pipeline',
        caption: 'The Harmonic Audification Pipeline: From raw biosignals to immersive, closed-loop creative feedback.'
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
    const [activeId, setActiveId] = useState('glossary');
    const [expandedImage, setExpandedImage] = useState(null);

    return (
        <>
            <section style={{ padding: 0, position: 'relative' }}>
                <div style={{ marginBottom: '1rem', textAlign: 'center', paddingTop: '2rem' }}>
                    <span style={{ color: 'var(--accent-green)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Theoretical Framework</span>
                    <h2 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        From Signals to Music
                    </h2>
                </div>
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
                                    padding: '1rem',
                                    opacity: activeId === fig.id ? 1 : 0,
                                    transition: 'opacity 0.8s ease-in-out',
                                    pointerEvents: activeId === fig.id ? 'auto' : 'none',
                                    zIndex: activeId === fig.id ? 10 : 0
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
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                        cursor: 'zoom-in'
                                    }}
                                    onClick={() => setExpandedImage(fig)}
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
                        <TextSection id="glossary" activeId={activeId} setActiveId={setActiveId}>
                            <h2>Generative Musical Structures</h2>
                            <p>
                                We map <strong>Neuroscience</strong> (and biological signals) to <strong>Music</strong> using shared harmonic principles.
                            </p>
                            <p>
                                A neural <strong>Power Spectrum</strong> mirrors a <strong>Sound Spectrum</strong>, where oscillation peaks become musical partials. <strong>Frequency Ratios</strong> define <strong>Musical Intervals</strong>, while signal shape dictates <strong>Timbre</strong>.
                            </p>
                            <p>
                                Through <strong>Ratio Folding</strong>, we achieve <strong>Octave Equivalence</strong>, normalizing diverse rhythms into a unified musical scale for creative exploration.
                            </p>
                        </TextSection>

                        <TextSection id="pipeline" activeId={activeId} setActiveId={setActiveId}>
                            <h2>Creative Brain-Computer Interface</h2>
                            <p>
                                The <strong>Harmonic Audification Pipeline</strong> turns raw biosignals into immersive feedback.
                            </p>
                            <p>
                                We extract spectral peaks via <strong>EMD</strong> to create <strong>Adaptive Tunings</strong>, modeling the system's <strong>Time-Varying Harmony</strong> (tension/resolution) in real-time.
                            </p>
                            <p>
                                This drives a <strong>Creative Brain-Computer Interface</strong>, creating a closed loop where users "play" the instrument of their own biology.
                            </p>
                        </TextSection>

                        <div style={{ height: '50vh' }}></div>
                    </div>
                </div>

            </section>
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => setExpandedImage(null)}
                    >
                        <button
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                zIndex: 10000
                            }}
                            onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}
                        >
                            <X size={28} />
                        </button>
                        <div
                            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <TransformWrapper>
                                <TransformComponent wrapperStyle={{ width: "100vw", height: "100vh" }}>
                                    <img
                                        src={expandedImage.src}
                                        alt={expandedImage.alt}
                                        style={{ width: '100vw', height: '100vh', objectFit: 'contain' }}
                                    />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollyTelling;
