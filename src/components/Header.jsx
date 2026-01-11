import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const toggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { href: "#concept", label: "Concept" },
        { href: "#external", label: "Listen" },
        { href: "#tunings", label: "Tunings" },
    ];

    return (
        <>
            <motion.nav
                className={`header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="header-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    BIOTUNER
                </div>

                {/* Desktop Nav */}
                <div className="header-nav desktop-only">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="header-link">{link.label}</a>
                    ))}
                    <a href="https://biotuner.kairos-creation.org" target="_blank" rel="noopener noreferrer" className="header-link engine-link">Engine</a>
                </div>

                {/* Mobile Hamburger */}
                <div className="mobile-toggle" onClick={toggleMenu}>
                    <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu-links">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    className="mobile-link"
                                    onClick={closeMenu}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="https://biotuner.kairos-creation.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-link mobile-engine-link"
                                onClick={closeMenu}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Tuner Engine <span style={{ fontSize: '0.8em' }}>↗</span>
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
