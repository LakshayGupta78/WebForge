import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export function Navbar() {
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: t('nav.features'), href: '#features' },
        { name: t('nav.howItWorks'), href: '#how-it-works' },
        { name: t('nav.testimonials'), href: '#testimonials' },
        { name: t('nav.pricing'), href: '#pricing' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">VendorHub</span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-green-700 font-medium transition-colors relative group"
                                whileHover={{ y: -1 }}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-700 transition-all group-hover:w-full" />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Buttons + Language Switcher */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <motion.a
                            href="/login"
                            className="text-gray-700 font-medium hover:text-green-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('nav.signIn')}
                        </motion.a>
                        <motion.a
                            href="/signup"
                            className="bg-green-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-green-800 transition-colors"
                            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(22, 101, 52, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('nav.getStarted')}
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <LanguageSwitcher />
                        <motion.button
                            className="p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="block text-gray-700 font-medium hover:text-green-700"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/signup"
                                className="block w-full text-center bg-green-700 text-white px-5 py-3 rounded-full font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {t('nav.getStarted')}
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;
