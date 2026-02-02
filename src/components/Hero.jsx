import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import DotPattern from './ui/DotPattern';
import VendorDoodle from './ui/VendorDoodle';

export function Hero() {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFBF5]">
            {/* Dot Pattern Background */}
            <DotPattern
                width={24}
                height={24}
                cx={1}
                cy={1}
                cr={1}
                className="opacity-40"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFFBF5]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                {t('hero.badge')}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                        >
                            {t('hero.title1')}{' '}
                            <span className="text-green-700">{t('hero.titleHighlight')}</span>{' '}
                            <br className="hidden sm:block" />
                            {t('hero.title2')}{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10">{t('hero.title3')}</span>
                                <motion.span
                                    className="absolute bottom-2 left-0 w-full h-4 bg-orange-200 -z-10"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1, duration: 0.6 }}
                                />
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-col sm:flex-row items-start gap-4"
                        >
                            <motion.a
                                href="/signup"
                                className="group inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-all"
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(22, 101, 52, 0.25)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t('hero.cta1')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="#demo"
                                className="group inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                    <Play className="w-4 h-4 text-orange-600 ml-0.5" />
                                </div>
                                {t('hero.cta2')}
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {[
                                { value: '10K+', label: t('hero.stats.vendors') },
                                { value: '₹50Cr+', label: t('hero.stats.transactions') },
                                { value: '4.9★', label: t('hero.stats.rating') },
                                { value: '24/7', label: t('hero.stats.support') },
                            ].map((stat) => (
                                <div key={stat.label} className="text-left">
                                    <div className="text-2xl md:text-3xl font-bold text-green-700">{stat.value}</div>
                                    <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <VendorDoodle className="w-full max-w-lg h-auto" />
                    </motion.div>
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-gray-200 text-center lg:text-left"
                >
                    <p className="text-gray-500 text-sm mb-4">{t('hero.trusted')}</p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 opacity-60">
                        {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map((city) => (
                            <span key={city} className="text-gray-700 font-medium">
                                {city}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
