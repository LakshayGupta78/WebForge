import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Phone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import DotPattern from './ui/DotPattern';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function SignIn() {
    const navigate = useNavigate();
    const { sendOTP, verifyOTP } = useAuth();

    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        setError('');

        const result = await sendOTP(phone, 'recaptcha-container-signin');

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
            // Check if user has a profile
            try {
                const userDoc = await getDoc(doc(db, 'vendors', result.user.uid));
                if (userDoc.exists()) {
                    navigate('/dashboard');
                } else {
                    // User verified but has no profile -> Redirect to signup to finish setup
                    navigate('/signup');
                }
            } catch (error) {
                console.error('Error checking profile:', error);
                setError('Failed to verify account. Please try again.');
            }
        } else {
            setError(result.error || 'Invalid OTP');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center relative overflow-hidden">
            <DotPattern width={24} height={24} className="opacity-30" />

            {/* reCAPTCHA container with unique ID */}
            <div id="recaptcha-container-signin"></div>

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
                                    Welcome Back
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Sign in to your dashboard
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
                                    Enter code sent to +91 {phone}
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
                    </AnimatePresence>
                </motion.div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    New to VendorHub?{' '}
                    <a href="/signup" className="text-green-700 font-medium hover:underline">
                        Create Account
                    </a>
                </p>
            </motion.div>
        </div>
    );
}

export default SignIn;
