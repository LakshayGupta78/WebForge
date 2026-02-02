import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Smartphone,
    QrCode,
    Package,
    BarChart3,
    Globe,
    MessageSquare
} from 'lucide-react';

const features = [
    {
        icon: Smartphone,
        title: 'Digital Storefront',
        description: 'Create your online shop in minutes. Share your catalog via WhatsApp, SMS, or social media.',
        color: 'bg-green-100 text-green-700',
        size: 'col-span-1 row-span-1 md:col-span-2 md:row-span-1',
    },
    {
        icon: QrCode,
        title: 'QR Payments',
        description: 'Accept UPI, cards, and wallets instantly. Get paid directly to your bank account.',
        color: 'bg-orange-100 text-orange-700',
        size: 'col-span-1 row-span-1',
    },
    {
        icon: Package,
        title: 'Inventory Tracking',
        description: 'Track stock levels in real-time. Get alerts when items are running low.',
        color: 'bg-blue-100 text-blue-700',
        size: 'col-span-1 row-span-1',
    },
    {
        icon: BarChart3,
        title: 'Sales Analytics',
        description: 'Understand your business with simple charts. Know your best-selling items and peak hours.',
        color: 'bg-purple-100 text-purple-700',
        size: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2',
    },
    {
        icon: Globe,
        title: 'Multi-Language',
        description: 'Available in Hindi, Tamil, Telugu, Marathi, Bengali, and more regional languages.',
        color: 'bg-teal-100 text-teal-700',
        size: 'col-span-1 row-span-1',
    },
    {
        icon: MessageSquare,
        title: 'Customer Connect',
        description: 'Send order updates, promotions, and collect feedback automatically.',
        color: 'bg-pink-100 text-pink-700',
        size: 'col-span-1 row-span-1',
    },
];

function FeatureCard({ feature, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                y: -5
            }}
            className={`${feature.size} bg-white rounded-3xl p-8 border border-gray-100 cursor-pointer transition-all`}
        >
            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </motion.div>
    );
}

export function BentoGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="features" ref={ref} className="py-24 bg-[#FFFBF5]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to{' '}
                        <span className="text-green-700">Grow</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Simple tools designed for street vendors. No complicated setup, no hidden fees.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BentoGrid;
