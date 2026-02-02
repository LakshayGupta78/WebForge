import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Ramesh Kumar',
        role: 'Fruit Vendor, Mumbai',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Before VendorHub, I was losing customers to shops with Paytm. Now I accept all payments and my sales have increased by 40%!',
        rating: 5,
    },
    {
        name: 'Lakshmi Devi',
        role: 'Street Food, Chennai',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'The Tamil language support made it so easy to use. I can track my daily sales and know exactly how much I\'m earning.',
        rating: 5,
    },
    {
        name: 'Mohammad Irfan',
        role: 'Vegetable Cart, Delhi',
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
        content: 'My customers love that I can send them my product list on WhatsApp. Getting repeat orders has become so simple.',
        rating: 5,
    },
    {
        name: 'Priya Sharma',
        role: 'Flower Seller, Jaipur',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: 'The inventory alerts saved my business! I never run out of stock during festivals anymore. Best decision I made.',
        rating: 5,
    },
];

function TestimonialCard({ testimonial, index }) {
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
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
        >
            {/* Quote Icon */}
            <Quote className="w-10 h-10 text-green-200 mb-4" />

            {/* Content */}
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{testimonial.content}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-100"
                />
                <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="testimonials" ref={ref} className="py-24 bg-[#FFFBF5]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Success Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Loved by{' '}
                        <span className="text-green-700">Vendors</span>{' '}
                        Everywhere
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of street vendors who have transformed their business with VendorHub.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
