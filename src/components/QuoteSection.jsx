import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const QuoteSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [50, 0, -50]);

    return (
        <section ref={ref} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                className="container"
                style={{ opacity, y, textAlign: 'center', maxWidth: '800px' }}
            >
                <p style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    margin: 0
                }}>
                    "The concept of harmonicity, tracing back to Pythagoras' exploration of integer ratios in vibrating strings, has been observed across various natural phenomena... underscoring the self-organizing capacities of biological systems."
                </p>
                <span style={{ display: 'block', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    — The harmonicity of brain dynamics (2024)
                </span>
            </motion.div>
        </section>
    );
};
export default QuoteSection;
