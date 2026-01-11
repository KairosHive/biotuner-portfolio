import { motion } from 'framer-motion';

import AudioPlayer from './AudioPlayer';

const ExternalWorks = ({ items }) => {
    if (!items) return null;

    return (
        <section id="external" className="container">
            <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                <span style={{ color: 'var(--accent-green)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Collaborations & Portfolio</span>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Sonic Experiments</h2>
                <p style={{ margin: '0 auto', maxWidth: '700px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    A collection of audio documentations and artistic collaborations exploring the sonification of biological signals.
                    These works demonstrate how physiological data—from neural oscillations to plant bio-signals—can be translated into meaningful musical structures.
                </p>
            </div>

            {items.map((collab, index) => (
                <motion.div
                    key={collab.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: index !== items.length - 1 ? '6rem' : '0' }}
                >
                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--accent-clay)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Portfolio</span>
                        <h2 style={{ textAlign: 'center' }}>{collab.name}</h2>
                        <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
                            {collab.description}
                        </p>
                        {collab.profile_url && (
                            <a
                                href={collab.profile_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '1rem',
                                    color: 'var(--accent-clay)',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                    transition: 'border-color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--accent-clay)'}
                                onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                            >
                                {collab.profile_title || 'Visit Profile'} →
                            </a>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {collab.works.map(work => {
                            const isExternal = work.url.startsWith('http');

                            if (!isExternal) {
                                return (
                                    <motion.div
                                        key={work.id}
                                        className="glass-panel"
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        style={{ display: 'block', textDecoration: 'none' }}
                                    >
                                        <AudioPlayer
                                            title={work.title}
                                            description=""
                                            src={work.url}
                                        />
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.a
                                    key={work.id}
                                    href={work.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-panel"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    style={{ display: 'block', textDecoration: 'none' }}
                                >
                                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-clay)', letterSpacing: '0.05em' }}>{collab.name}</span>
                                    <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{work.title}</h3>
                                    <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--accent-green)' }}>
                                        Listen on YouTube Music →
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>
            ))}
        </section>
    );
};

export default ExternalWorks;
