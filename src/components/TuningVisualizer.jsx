import { useRef, useEffect, useState } from 'react';

const TuningVisualizer = ({ intervals, size = 300 }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isVertical, setIsVertical] = useState(false);

    // Standard 12-TET intervals in cents for comparison
    const standardTuning = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
    const intervalNames = {
        0: 'Unison', 100: 'm2', 200: 'M2', 300: 'm3', 400: 'M3',
        500: 'P4', 600: 'TT', 700: 'P5', 800: 'm6', 900: 'M6',
        1000: 'm7', 1100: 'M7', 1200: 'Octave'
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const checkSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.getBoundingClientRect().width;
                setIsVertical(width < 500);
            }
        };

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setIsVertical(entry.contentRect.width < 500);
            }
        });

        resizeObserver.observe(containerRef.current);
        checkSize(); // Initial check

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Support high DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        const width = rect.width;
        const height = isVertical ? 500 : 160; // Taller for vertical, slightly taller for horiz labels

        // Update canvas resolution check to avoid clear loop if no change? 
        // Actually we need to set these triggering a clear/redraw.
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const padding = 40;
        const trackThickness = 40;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Helper to get Position from Cents
        const getPos = (cents) => {
            const ratio = cents / 1200;
            if (isVertical) {
                // Vertical: 0 at Bottom ... 1200 at Top
                const drawHeight = height - (padding * 2);
                return (height - padding) - (ratio * drawHeight);
            } else {
                // Horizontal: 0 at Left ... 1200 at Right
                const drawWidth = width - (padding * 2);
                return padding + (ratio * drawWidth);
            }
        };

        // Track Dimensions
        const trackX = isVertical ? (width - trackThickness) / 2 : padding;
        const trackY = isVertical ? padding : (height - trackThickness) / 2;
        const trackW = isVertical ? trackThickness : (width - padding * 2);
        const trackH = isVertical ? (height - padding * 2) : trackThickness;

        // -- Background Track --
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(trackX, trackY, trackW, trackH);

        // -- Draw 12-TET Grid (Reference) --
        standardTuning.forEach(cents => {
            const pos = getPos(cents);

            ctx.beginPath();
            if (isVertical) {
                ctx.moveTo(trackX - 8, pos);
                ctx.lineTo(trackX + trackW + 8, pos);
            } else {
                ctx.moveTo(pos, trackY - 8);
                ctx.lineTo(pos, trackY + trackH + 8);
            }

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Label
            // Only draw standard labels if we have enough space or it's vertical?
            // Vertical always has height room. Horizontal has width constraint.

            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = '10px "Outfit", sans-serif';
            const label = intervalNames[cents] || cents;

            if (isVertical) {
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, trackX - 15, pos);
            } else {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                // Alternate labels if crowded?
                // With < 500px switch, we have > 500px for horizontal. 12 steps. 40px per step. 
                // "m2" is small enough. "Unison" might crowd.
                // Stagger:
                const isEven = (cents % 200 === 0);
                const labelY = trackY + trackH + (isEven ? 10 : 22);
                ctx.fillText(label, pos, labelY);
            }
        });

        // -- Draw Bio-Tuning Intervals --
        if (intervals) {
            intervals.forEach((cents, i) => {
                const pos = getPos(cents);

                // Draw Marker
                ctx.beginPath();
                if (isVertical) {
                    ctx.moveTo(trackX, pos);
                    ctx.lineTo(trackX + trackW, pos);
                } else {
                    ctx.moveTo(pos, trackY);
                    ctx.lineTo(pos, trackY + trackH);
                }

                ctx.strokeStyle = '#5d7052'; // accent-green
                ctx.lineWidth = 2;

                // Highlight Octave/Unison
                if (cents < 1 || cents > 1199) {
                    ctx.strokeStyle = '#e6e1d3'; // text-primary
                    ctx.lineWidth = 3;
                }
                ctx.stroke();

                // Label (Cents)
                ctx.fillStyle = '#8c6a5d'; // accent-clay
                if (cents < 1 || cents > 1199) ctx.fillStyle = '#e6e1d3';

                ctx.font = 'bold 11px "Outfit", sans-serif';

                if (isVertical) {
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(Math.round(cents), trackX + trackW + 15, pos);
                } else {
                    ctx.textAlign = 'center';
                    // Put Bio Labels ABOVE the track to separate from 12-TET
                    const labelY = trackY - 15;
                    // Stagger if close?
                    // Simple stagger
                    const stagger = (i % 2 !== 0);
                    ctx.fillText(Math.round(cents), pos, stagger ? labelY - 12 : labelY);
                }
            });
        }

    }, [intervals, isVertical]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: isVertical ? '500px' : '160px', position: 'relative', transition: 'height 0.3s ease' }}>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: isVertical ? 'auto' : '50%',
                right: isVertical ? '1rem' : 'auto',
                transform: isVertical ? 'none' : 'translateX(-50%)',
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                gap: isVertical ? '0.5rem' : '2rem',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.4)',
                textAlign: isVertical ? 'right' : 'center',
                paddingBottom: isVertical ? '1rem' : '0'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: isVertical ? 'flex-end' : 'flex-start' }}>
                    <span style={{ width: 8, height: 8, border: '1px dashed rgba(255,255,255,0.3)' }}></span> 12-TET
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: isVertical ? 'flex-end' : 'flex-start' }}>
                    <span style={{ width: 8, height: 8, background: '#5d7052' }}></span> Bio-Interval
                </span>
            </div>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default TuningVisualizer;
