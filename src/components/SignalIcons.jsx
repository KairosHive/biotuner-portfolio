import { motion } from 'framer-motion';

const icons = [
    {
        name: "Brain",
        path: (
            <>
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 18v-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 10a2 2 0 1 1-4 0" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <path d="M15 10a2 2 0 1 0 4 0" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </>
        )
    },
    {
        name: "Organoid",
        path: (
            <>
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeOpacity="0.4" />
                <circle cx="10" cy="10" r="2.5" />
                <circle cx="15" cy="13" r="2" />
                <circle cx="11" cy="15" r="1.5" />
                <circle cx="14" cy="9" r="1.5" />
            </>
        )
    },
    {
        name: "Heart",
        path: (
            <>
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 6v2" strokeLinecap="round" />
                <path d="M12 12v3" strokeLinecap="round" />
            </>
        )
    },
    {
        name: "Plant",
        path: (
            <>
                <path d="M12 21v-4" strokeLinecap="round" />
                <path d="M12 17c0-3 2.5-5 5.5-5.5" strokeLinecap="round" />
                <path d="M12 17c0-3-2.5-5-5.5-5.5" strokeLinecap="round" />
                <path d="M12 12V3" strokeLinecap="round" />
                <path d="M12 8c2.5 0 4.5-1.5 5-4" strokeLinecap="round" />
                <path d="M12 8c-2.5 0-4.5-1.5-5-4" strokeLinecap="round" />
            </>
        )
    },
    {
        name: "Sensors",
        path: (
            <>
                <rect x="7" y="4" width="10" height="16" rx="2" strokeWidth="1.5" />
                <path d="M10 12l1 2l2-4l1 2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
            </>
        )
    },
    {
        name: "Grav. Waves",
        path: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 22a10 10 0 0 1 -10 -10" strokeOpacity="0.3" strokeLinecap="round" />
                <path d="M12 18a6 6 0 0 1 -6 -6" strokeOpacity="0.5" strokeLinecap="round" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.3" strokeLinecap="round" />
                <path d="M12 6a6 6 0 0 1 6 6" strokeOpacity="0.5" strokeLinecap="round" />
            </>
        )
    },
    {
        name: "Science",
        path: (
            <>
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(45 12 12)" strokeOpacity="0.6" />
                <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(-45 12 12)" strokeOpacity="0.6" />
            </>
        )
    }
];

const SignalIcons = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '3.5rem auto 0'
        }}>
            {icons.map((icon, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'help'
                    }}
                    title={icon.name}
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-green)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 2px rgba(97, 218, 166, 0.3))' }}
                    >
                        {icon.path}
                    </svg>
                    <span style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        opacity: 0.7
                    }}>
                        {icon.name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default SignalIcons;
