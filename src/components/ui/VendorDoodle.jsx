import { motion } from 'framer-motion';

// Corporate Memphis style illustration of a street vendor
export function VendorDoodle({ className = '' }) {
    return (
        <motion.svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
        >
            {/* Background decorative elements */}
            <motion.circle
                cx="320"
                cy="80"
                r="30"
                fill="#FED7AA"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
            />
            <motion.circle
                cx="60"
                cy="320"
                r="20"
                fill="#BBF7D0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
            />
            <motion.circle
                cx="350"
                cy="280"
                r="15"
                fill="#FECACA"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
            />

            {/* Abstract shapes */}
            <motion.path
                d="M50 100 Q80 80 100 100 T150 100"
                stroke="#166534"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            />
            <motion.rect
                x="330"
                y="180"
                width="25"
                height="25"
                rx="5"
                fill="#EA580C"
                initial={{ rotate: 0 }}
                animate={{ rotate: 45 }}
                transition={{ delay: 0.5 }}
                style={{ transformOrigin: '342px 192px' }}
            />

            {/* Food Cart */}
            <motion.g
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* Cart body */}
                <rect x="100" y="200" width="150" height="100" rx="15" fill="#166534" />
                <rect x="110" y="210" width="130" height="40" rx="8" fill="#15803D" />

                {/* Cart wheels */}
                <circle cx="130" cy="310" r="20" fill="#374151" />
                <circle cx="130" cy="310" r="10" fill="#6B7280" />
                <circle cx="220" cy="310" r="20" fill="#374151" />
                <circle cx="220" cy="310" r="10" fill="#6B7280" />

                {/* Cart handle */}
                <rect x="250" y="230" width="60" height="8" rx="4" fill="#374151" />
                <rect x="300" y="230" width="8" height="60" rx="4" fill="#374151" />

                {/* Umbrella */}
                <rect x="172" y="120" width="6" height="90" fill="#EA580C" />
                <path d="M100 130 Q175 60 250 130 Z" fill="#EA580C" />
                <path d="M120 130 Q175 80 230 130 Z" fill="#FB923C" />
            </motion.g>

            {/* Vendor Person */}
            <motion.g
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {/* Body */}
                <rect x="260" y="170" width="60" height="80" rx="20" fill="#166534" />

                {/* Head */}
                <circle cx="290" cy="140" r="35" fill="#FBBF24" />
                <circle cx="290" cy="140" r="30" fill="#FCD34D" />

                {/* Face */}
                <circle cx="280" cy="135" r="4" fill="#374151" />
                <circle cx="300" cy="135" r="4" fill="#374151" />
                <path d="M280 150 Q290 160 300 150" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Arms */}
                <rect x="240" y="180" width="25" height="10" rx="5" fill="#FCD34D" />
                <rect x="315" y="175" width="35" height="12" rx="6" fill="#FCD34D" />

                {/* Phone in hand */}
                <g transform="translate(335, 165)">
                    <rect x="0" y="0" width="30" height="50" rx="5" fill="#1F2937" />
                    <rect x="3" y="5" width="24" height="35" rx="2" fill="#FFFFFF" />
                    {/* QR Code on phone */}
                    <rect x="8" y="10" width="14" height="14" fill="#166534" />
                    <rect x="10" y="12" width="4" height="4" fill="#FFFFFF" />
                    <rect x="16" y="12" width="4" height="4" fill="#FFFFFF" />
                    <rect x="10" y="18" width="4" height="4" fill="#FFFFFF" />
                    <rect x="16" y="18" width="4" height="4" fill="#FFFFFF" />
                </g>
            </motion.g>

            {/* Floating elements */}
            <motion.g
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
                {/* UPI/Money symbols */}
                <circle cx="80" cy="180" r="18" fill="#BBF7D0" />
                <text x="80" y="186" textAnchor="middle" fill="#166534" fontWeight="bold" fontSize="16">₹</text>
            </motion.g>

            <motion.g
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
            >
                <circle cx="350" cy="120" r="15" fill="#DBEAFE" />
                <text x="350" y="125" textAnchor="middle" fill="#1D4ED8" fontWeight="bold" fontSize="12">✓</text>
            </motion.g>

            {/* Stars/sparkles */}
            <motion.path
                d="M320 50 L323 58 L332 58 L325 63 L328 72 L320 67 L312 72 L315 63 L308 58 L317 58 Z"
                fill="#FBBF24"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ transformOrigin: '320px 61px' }}
            />
        </motion.svg>
    );
}

export default VendorDoodle;
