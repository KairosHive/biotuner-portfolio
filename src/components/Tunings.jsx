import { useState } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import TuningVisualizer from './TuningVisualizer';

const Tunings = ({ items }) => {
    const [activeTab, setActiveTab] = useState('Harmonic');

    if (!items) return null;

    const harmonicItems = items.filter(i => i.type === 'Harmonic');
    const dissonanceItems = items.filter(i => i.type === 'Dissonance Curve');

    const displayedItems = activeTab === 'Harmonic' ? harmonicItems : dissonanceItems;

    return (
        <section id="tunings" className="container" style={{ alignItems: 'flex-start', paddingTop: '4rem' }}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ width: '100%' }}
            >
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--accent-green)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Demonstration</span>
                    <h2>Bio-Tunings</h2>
                    <p style={{ margin: '0 auto', maxWidth: '600px', marginBottom: '2rem' }}>
                        Scales derived from physiological data often deviate from standard equal temperament.
                        Below, compare the 12-TET grid (dashed lines) with the bio-intervals (solid lines).
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Want to generate your own scales? The experimental <strong>Biotuner Engine</strong> invites you to create tunings from your own time-series data. Note that this tool assumes some familiarity with signal processing concepts.
                        </p>
                        <a
                            href="https://biotuner.kairos-creation.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="header-link engine-link"
                            style={{ display: 'inline-block', fontSize: '0.8rem', marginTop: '0.5rem' }}
                        >
                            Try the Engine
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['Harmonic', 'Dissonance Curve'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                fontFamily: 'var(--font-serif)',
                                borderBottom: activeTab === tab ? '1px solid var(--text-primary)' : '1px solid transparent',
                                paddingBottom: '0.5rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab}s
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gap: '3rem' }}>
                    {displayedItems.map(item => (
                        <motion.div
                            key={item.id}
                            className="glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px" }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}
                        >
                            {/* Left: Info & Audio */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 300px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem' }}>{item.title || item.id.replace(/_/g, ' ')}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.description}</p>
                                </div>
                                <AudioPlayer
                                    src={item.filename}
                                    title=""
                                    description=""
                                    isEmbedded={true}
                                />
                            </div>

                            {/* Right: Visualization */}
                            <div style={{ padding: '1rem 0', flex: '2 1 300px' }}>
                                {item.intervals && (
                                    <TuningVisualizer intervals={item.intervals} />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
export default Tunings;
