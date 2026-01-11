import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Concept = () => {
    return (
        <section id="concept" className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>

            {/* Introduction of Core Ideas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                        "Music is a hidden arithmetic exercise of the soul, which does not know that it is counting."
                    </h3>
                    <p style={{ color: 'var(--accent-green)', fontStyle: 'italic', marginBottom: '1rem', fontWeight: 600 }}>
                        — Gottfried Wilhelm von Leibniz
                    </p>
                    <p>
                        Harmonic relationships provide an intuitive framework for understanding complex oscillatory systems. By mapping time-series data to musical intervals, we uncover the hidden consonance and dissonance within natural dynamics.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                        "Physical matter is music solidified."
                    </h3>
                    <p style={{ color: 'var(--accent-clay)', fontStyle: 'italic', marginBottom: '1rem', fontWeight: 600 }}>
                        — attributed to Pythagoras
                    </p>
                    <p>
                        Biotuner extracts tuning systems and scales from any time-series data displaying a spectrum. Whether from the body, plants, gravitational waves, or other signal sources, this toolbox invites artists to step into unexplored sonic territory, composing with the harmonic architecture inherent in the measured signal.
                    </p>
                </motion.div>
            </div>

            {/* Remaining content intentionally removed as per user request to use ScrollyTelling instead for these visuals */}

        </section>
    );
};

export default Concept;
