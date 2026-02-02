import { createContext, useContext, useState, useEffect } from 'react';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [vendorData, setVendorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                // Fetch vendor data from Firestore
                const vendorDoc = await getDoc(doc(db, 'vendors', user.uid));
                if (vendorDoc.exists()) {
                    setVendorData(vendorDoc.data());
                }
            } else {
                setVendorData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Setup reCAPTCHA
    const setupRecaptcha = (containerId) => {
        // Clear any existing verifier first
        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch (e) {
                console.log('Clearing existing recaptcha');
            }
            window.recaptchaVerifier = null;
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
            callback: () => {
                console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
                window.recaptchaVerifier = null;
            }
        });
        return window.recaptchaVerifier;
    };

    // Send OTP
    const sendOTP = async (phoneNumber, containerId) => {
        try {
            const recaptchaVerifier = setupRecaptcha(containerId);
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
            console.log('Sending OTP to:', formattedPhone);
            const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
            setConfirmationResult(result);
            console.log('OTP sent successfully');
            return { success: true };
        } catch (error) {
            console.error('Error sending OTP:', error);
            // Reset recaptcha on error
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (e) { }
                window.recaptchaVerifier = null;
            }
            return { success: false, error: error.message };
        }
    };

    // Verify OTP
    const verifyOTP = async (otp) => {
        try {
            if (!confirmationResult) {
                throw new Error('No confirmation result. Please request OTP first.');
            }
            const result = await confirmationResult.confirm(otp);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return { success: false, error: error.message };
        }
    };

    // Create/Update vendor profile
    const createVendorProfile = async (vendorInfo) => {
        console.log('createVendorProfile called with:', vendorInfo);
        console.log('Current user:', user);

        if (!user) {
            console.error('No user found when creating profile');
            return { success: false, error: 'Not authenticated. Please try signing in again.' };
        }

        try {
            const vendorRef = doc(db, 'vendors', user.uid);
            const vendorId = `VH${Date.now().toString(36).toUpperCase()}`;

            const vendorProfile = {
                ...vendorInfo,
                vendorId,
                phone: user.phoneNumber,
                uid: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                qrCode: `https://pay.vendorhub.in/${vendorId}`,
                totalTransactions: 0,
                totalEarnings: 0,
                isActive: true,
            };

            console.log('Saving vendor profile:', vendorProfile);
            await setDoc(vendorRef, vendorProfile, { merge: true });
            console.log('Profile saved successfully');

            setVendorData(vendorProfile);

            return { success: true, vendorId };
        } catch (error) {
            console.error('Error creating vendor profile:', error);
            return { success: false, error: error.message };
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setVendorData(null);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        vendorData,
        loading,
        sendOTP,
        verifyOTP,
        createVendorProfile,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
