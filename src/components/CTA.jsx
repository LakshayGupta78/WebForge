import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export function CTA() {
    return (
        <section id="get-started" className="py-24 bg-green-700 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Ready to Transform Your{' '}
                        <br className="hidden sm:block" />
                        Street Business?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="text-xl text-green-100 max-w-2xl mx-auto mb-10"
                    >
                        Join 10,000+ vendors who are already growing their business digitally.
                        Start free, upgrade when you're ready.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#signup"
                            className="group inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all"
                            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="tel:+919876543210"
                            className="group inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-500 transition-all border border-green-500"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Phone className="w-5 h-5" />
                            Talk to Us
                        </motion.a>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-green-200"
                    >
                        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-4 h-4" />
                            +91 98765 43210
                        </a>
                        <span className="hidden sm:block">•</span>
                        <a href="mailto:help@vendorhub.in" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                            help@vendorhub.in
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default CTA;
