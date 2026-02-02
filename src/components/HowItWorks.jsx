import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Store, Smartphone, Wallet } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Sign Up Free',
        description: 'Register with just your phone number. No documents needed to get started.',
        color: 'bg-green-700',
    },
    {
        number: '02',
        icon: Store,
        title: 'Set Up Shop',
        description: 'Add your products with photos. Our AI helps you write descriptions in your language.',
        color: 'bg-orange-600',
    },
    {
        number: '03',
        icon: Smartphone,
        title: 'Share & Sell',
        description: 'Share your digital shop link on WhatsApp. Customers can browse and order easily.',
        color: 'bg-blue-600',
    },
    {
        number: '04',
        icon: Wallet,
        title: 'Get Paid',
        description: 'Receive payments directly to your bank or UPI. Track all sales in one place.',
        color: 'bg-purple-600',
    },
];

export function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="how-it-works" ref={ref} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Start Selling in{' '}
                        <span className="text-orange-600">4 Easy Steps</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Go from zero to digital in under 10 minutes. We guide you every step of the way.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 20,
                                    delay: index * 0.15,
                                }}
                                className="relative text-center"
                            >
                                {/* Icon Circle */}
                                <motion.div
                                    className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    <step.icon className="w-8 h-8 text-white" />
                                </motion.div>

                                {/* Step Number */}
                                <span className="text-5xl font-bold text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 -z-10">
                                    {step.number}
                                </span>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <motion.a
                        href="#get-started"
                        className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition-all"
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(22, 101, 52, 0.25)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Start Your Journey
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

export default HowItWorks;
