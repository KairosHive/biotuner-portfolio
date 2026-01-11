import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = ({ title, description, src, isEmbedded = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      document.querySelectorAll('audio').forEach(el => {
        if (el !== audioRef.current) el.pause();
      });
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const container = e.target.closest('.progress-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioRef.current.duration;
    if (duration) {
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  // Style variant if embedded in a larger card vs standalone
  const containerStyle = isEmbedded
    ? { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }
    : { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' };

  const Wrapper = isEmbedded ? 'div' : motion.div;
  const wrapperProps = isEmbedded
    ? {}
    : {
      className: "glass-panel",
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true }
    };

  return (
    <Wrapper {...wrapperProps} style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {(title || description) && (
          <div>
            {title && <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{title}</h3>}
            {description && <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{description}</p>}
          </div>
        )}
        <button
          onClick={togglePlay}
          style={{
            background: 'var(--text-primary)',
            border: 'none',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--bg-color)',
            flexShrink: 0,
            marginLeft: (title || description) ? '0' : 'auto'
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
        </button>
      </div>

      <div
        className="progress-container"
        onClick={handleSeek}
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--accent-green)',
            borderRadius: '2px'
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </Wrapper>
  );
};

export default AudioPlayer;
