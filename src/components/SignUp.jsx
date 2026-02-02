import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Phone, ArrowRight, CheckCircle, Loader2, Store, User, MapPin } from 'lucide-react';
import DotPattern from './ui/DotPattern';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function SignUp() {
    const navigate = useNavigate();
    const { sendOTP, verifyOTP, createVendorProfile, user, vendorData, loading: authLoading } = useAuth();

    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Profile
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Profile fields
    const [vendorName, setVendorName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [location, setLocation] = useState('');

    // Auto-redirect if user already logged in with profile (returning user)
    useEffect(() => {
        if (!authLoading && user && vendorData) {
            console.log('Returning user detected, redirecting to dashboard');
            navigate('/dashboard');
        }
    }, [user, vendorData, authLoading, navigate]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        setError('');

        const result = await sendOTP(phone, 'recaptcha-container');

        if (result.success) {
            setStep(2);
        } else {
            setError(result.error || 'Failed to send OTP');
        }
        setLoading(false);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (otp.length < 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        const result = await verifyOTP(otp);

        if (result.success) {
            // Check if user already has a vendor profile immediately
            try {
                const userDoc = await getDoc(doc(db, 'vendors', result.user.uid));
                if (userDoc.exists()) {
                    console.log('User already has profile, redirecting...');
                    navigate('/dashboard');
                    return;
                }
            } catch (error) {
                console.error('Error checking existing profile:', error);
            }

            // Only proceed to profile creation if no profile exists
            setStep(3);
        } else {
            setError(result.error || 'Invalid OTP');
        }
        setLoading(false);
    };

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        if (!vendorName || !businessName || !businessType || !location) {
            setError('Please fill all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Add a small delay to ensure user state is synced
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = await createVendorProfile({
                vendorName,
                businessName,
                businessType,
                location,
            });

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Failed to create profile');
                setLoading(false);
            }
        } catch (err) {
            console.error('Profile creation error:', err);
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };

    const businessTypes = [
        'Food & Beverages',
        'Fruits & Vegetables',
        'Clothing & Textiles',
        'Electronics & Accessories',
        'Handicrafts & Art',
        'General Store',
        'Other',
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center relative overflow-hidden">
            <DotPattern width={24} height={24} className="opacity-30" />

            {/* reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">V</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">VendorHub</span>
                    </a>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${s < step
                                    ? 'bg-green-600 text-white'
                                    : s === step
                                        ? 'bg-green-700 text-white ring-4 ring-green-200'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                            {s < 3 && (
                                <div className={`w-12 h-1 rounded ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <motion.div
                    layout
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                    <AnimatePresence mode="wait">
                        {/* Step 1: Phone Number */}
                        {step === 1 && (
                            <motion.form
                                key="phone"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSendOTP}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Enter Your Phone Number
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    We'll send you a one-time password to verify
                                </p>

                                <div className="relative mb-6">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-medium">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="9876543210"
                                        className="w-full pl-24 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mb-4">{error}</p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={loading || phone.length < 10}
                                    className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send OTP <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <motion.form
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleVerifyOTP}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Verify OTP
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Enter the 6-digit code sent to +91 {phone}
                                </p>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full text-center px-4 py-4 border-2 border-gray-200 rounded-2xl text-2xl font-bold tracking-widest focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                        maxLength={6}
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mb-4">{error}</p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Verify <CheckCircle className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    Change phone number
                                </button>
                            </motion.form>
                        )}

                        {/* Step 3: Profile Setup */}
                        {step === 3 && (
                            <motion.form
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleCreateProfile}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Set Up Your Profile
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Tell us about your business
                                </p>

                                <div className="space-y-4 mb-6">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={vendorName}
                                            onChange={(e) => setVendorName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={businessName}
                                            onChange={(e) => setBusinessName(e.target.value)}
                                            placeholder="Business/Shop Name"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>

                                    <select
                                        value={businessType}
                                        onChange={(e) => setBusinessType(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-gray-700"
                                    >
                                        <option value="">Select Business Type</option>
                                        {businessTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>

                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Location (e.g., Andheri, Mumbai)"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mb-4">{error}</p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={loading || !vendorName || !businessName || !businessType || !location}
                                    className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Create My Shop <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-green-700 font-medium hover:underline">
                        Sign in
                    </a>
                </p>
            </motion.div>
        </div>
    );
}

export default SignUp;
