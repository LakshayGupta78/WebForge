import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import DotPattern from './ui/DotPattern';

export function Hero() {
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFBF5]">
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

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 text-center"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Empowering 10,000+ Street Vendors
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight max-w-5xl mx-auto"
                >
                    Take Your Street{' '}
                    <span className="text-green-700">Business</span>{' '}
                    <br className="hidden sm:block" />
                    to the{' '}
                    <span className="relative inline-block">
                        <span className="relative z-10">Digital World</span>
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
                    className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                >
                    Accept digital payments, manage inventory, and connect with customers —
                    all from your mobile phone. No technical skills required.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        href="#get-started"
                        className="group inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-all"
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(22, 101, 52, 0.25)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Start Free Today
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
                        Watch Demo
                    </motion.a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-gray-200"
                >
                    <p className="text-gray-500 text-sm mb-6">Trusted by vendors across India</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
                        {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map((city) => (
                            <span key={city} className="text-gray-700 font-medium text-lg">
                                {city}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { value: '10K+', label: 'Active Vendors' },
                        { value: '₹50Cr+', label: 'Transactions' },
                        { value: '4.9★', label: 'App Rating' },
                        { value: '24/7', label: 'Support' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-green-700">{stat.value}</div>
                            <div className="text-gray-600 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
