import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

const Gallery = ({ items }) => {
    if (!items) return null;
    return (
        <section id="compositions" className="container">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--accent-clay)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Portfolio</span>
                    <h2 style={{ textAlign: 'center' }}>Sonic Experiments</h2>
                    <p style={{ textAlign: 'center', margin: '0 auto' }}>
                        Improvisations where harmonic information derived from brain (EEG) signals of the player modulates microtonal scales in real-time, creating unique non-reproducible progressions.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {items.map(item => (
                        <AudioPlayer
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            src={item.filename}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
export default Gallery;
