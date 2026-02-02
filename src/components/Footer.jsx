import { motion } from 'framer-motion';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';

const footerLinks = {
    Product: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Demo', href: '#demo' },
        { name: 'Updates', href: '#updates' },
    ],
    Company: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Partners', href: '#partners' },
        { name: 'Press', href: '#press' },
    ],
    Support: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact', href: '#contact' },
        { name: 'Community', href: '#community' },
        { name: 'Tutorials', href: '#tutorials' },
    ],
    Legal: [
        { name: 'Privacy', href: '#privacy' },
        { name: 'Terms', href: '#terms' },
        { name: 'Refunds', href: '#refunds' },
        { name: 'Cookies', href: '#cookies' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <span className="text-2xl font-bold text-white">VendorHub</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering street vendors across India to go digital.
                            Simple tools, powerful results.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <MapPin className="w-4 h-4" />
                                <span>Mumbai, Maharashtra, India</span>
                            </a>
                            <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <Phone className="w-4 h-4" />
                                <span>+91 98765 43210</span>
                            </a>
                            <a href="mailto:help@vendorhub.in" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <Mail className="w-4 h-4" />
                                <span>help@vendorhub.in</span>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-white font-semibold mb-4">{title}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2025 VendorHub. All rights reserved. Made with ❤️ in India.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
