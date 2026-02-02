import { createContext, useContext, useState, useEffect } from 'react';

// Translations
const translations = {
    en: {
        // Navbar
        nav: {
            features: 'Features',
            howItWorks: 'How It Works',
            testimonials: 'Testimonials',
            pricing: 'Pricing',
            signIn: 'Sign In',
            getStarted: 'Get Started Free',
        },
        // Hero
        hero: {
            badge: 'Empowering 10,000+ Street Vendors',
            title1: 'Take Your Street',
            titleHighlight: 'Business',
            title2: 'to the',
            title3: 'Digital World',
            subtitle: 'Accept digital payments, manage inventory, and connect with customers — all from your mobile phone. No technical skills required.',
            cta1: 'Start Free Today',
            cta2: 'Watch Demo',
            trusted: 'Trusted by vendors across India',
            stats: {
                vendors: 'Active Vendors',
                transactions: 'Transactions',
                rating: 'App Rating',
                support: 'Support',
            },
        },
        // Features
        features: {
            title: 'Everything You Need to',
            titleHighlight: 'Grow',
            subtitle: 'Simple tools designed for street vendors. No complicated setup, no hidden fees.',
            items: {
                storefront: {
                    title: 'Digital Storefront',
                    description: 'Create your online shop in minutes. Share your catalog via WhatsApp, SMS, or social media.',
                },
                qr: {
                    title: 'QR Payments',
                    description: 'Accept UPI, cards, and wallets instantly. Get paid directly to your bank account.',
                },
                inventory: {
                    title: 'Inventory Tracking',
                    description: 'Track stock levels in real-time. Get alerts when items are running low.',
                },
                analytics: {
                    title: 'Sales Analytics',
                    description: 'Understand your business with simple charts. Know your best-selling items and peak hours.',
                },
                language: {
                    title: 'Multi-Language',
                    description: 'Available in Hindi, Tamil, Telugu, Marathi, Bengali, and more regional languages.',
                },
                connect: {
                    title: 'Customer Connect',
                    description: 'Send order updates, promotions, and collect feedback automatically.',
                },
            },
        },
        // How It Works
        howItWorks: {
            badge: 'Simple Process',
            title: 'Start Selling in',
            titleHighlight: '4 Easy Steps',
            subtitle: 'Go from zero to digital in under 10 minutes. We guide you every step of the way.',
            cta: 'Start Your Journey',
            steps: {
                signup: { title: 'Sign Up Free', description: 'Register with just your phone number. No documents needed to get started.' },
                setup: { title: 'Set Up Shop', description: 'Add your products with photos. Our AI helps you write descriptions in your language.' },
                share: { title: 'Share & Sell', description: 'Share your digital shop link on WhatsApp. Customers can browse and order easily.' },
                paid: { title: 'Get Paid', description: 'Receive payments directly to your bank or UPI. Track all sales in one place.' },
            },
        },
        // Testimonials
        testimonials: {
            badge: 'Success Stories',
            title: 'Loved by',
            titleHighlight: 'Vendors',
            title2: 'Everywhere',
            subtitle: 'Join thousands of street vendors who have transformed their business with VendorHub.',
        },
        // CTA
        cta: {
            title: 'Ready to Transform Your',
            title2: 'Street Business?',
            subtitle: 'Join 10,000+ vendors who are already growing their business digitally. Start free, upgrade when you\'re ready.',
            button1: 'Get Started Free',
            button2: 'Talk to Us',
        },
        // Footer
        footer: {
            tagline: 'Empowering street vendors across India to go digital. Simple tools, powerful results.',
            copyright: '© 2025 VendorHub. All rights reserved. Made with ❤️ in India.',
        },
        // Dashboard
        dashboard: {
            paymentQr: 'Payment QR',
            vendorId: 'Vendor ID',
            share: 'Share',
            download: 'Download',
            copyLink: 'Copy Link',
            copied: 'Copied!',
            todayEarnings: "Today's Earnings",
            totalEarnings: 'Total Earnings',
            customers: 'Customers',
            recentTransactions: 'Recent Transactions',
            viewAll: 'View All',
            proTip: 'Pro Tip',
            proTipText: 'Print your QR code and place it at your stall for easy payments. Customers can scan and pay instantly!',
            printQr: 'Print QR Code',
        },
        // Signup
        signup: {
            enterPhone: 'Enter Your Phone Number',
            phoneSubtitle: "We'll send you a one-time password to verify",
            sendOtp: 'Send OTP',
            verifyOtp: 'Verify OTP',
            otpSubtitle: 'Enter the 6-digit code sent to',
            verify: 'Verify',
            changePhone: 'Change phone number',
            setupProfile: 'Set Up Your Profile',
            profileSubtitle: 'Tell us about your business',
            yourName: 'Your Name',
            businessName: 'Business/Shop Name',
            selectType: 'Select Business Type',
            location: 'Location (e.g., Andheri, Mumbai)',
            createShop: 'Create My Shop',
            haveAccount: 'Already have an account?',
            signIn: 'Sign in',
        },
    },
    hi: {
        // Navbar
        nav: {
            features: 'विशेषताएं',
            howItWorks: 'कैसे काम करता है',
            testimonials: 'समीक्षाएं',
            pricing: 'मूल्य',
            signIn: 'साइन इन',
            getStarted: 'मुफ्त शुरू करें',
        },
        // Hero
        hero: {
            badge: '10,000+ स्ट्रीट वेंडर्स को सशक्त बना रहे हैं',
            title1: 'अपने स्ट्रीट',
            titleHighlight: 'व्यापार',
            title2: 'को',
            title3: 'डिजिटल दुनिया में ले जाएं',
            subtitle: 'डिजिटल भुगतान स्वीकार करें, इन्वेंट्री प्रबंधित करें, और ग्राहकों से जुड़ें — सब कुछ अपने मोबाइल फोन से। कोई तकनीकी कौशल आवश्यक नहीं।',
            cta1: 'आज मुफ्त शुरू करें',
            cta2: 'डेमो देखें',
            trusted: 'पूरे भारत में वेंडर्स द्वारा विश्वसनीय',
            stats: {
                vendors: 'सक्रिय वेंडर्स',
                transactions: 'लेन-देन',
                rating: 'ऐप रेटिंग',
                support: 'सहायता',
            },
        },
        // Features
        features: {
            title: 'आपको जो कुछ भी चाहिए',
            titleHighlight: 'बढ़ने के लिए',
            subtitle: 'स्ट्रीट वेंडर्स के लिए बनाए गए सरल टूल्स। कोई जटिल सेटअप नहीं, कोई छुपी फीस नहीं।',
            items: {
                storefront: {
                    title: 'डिजिटल स्टोरफ्रंट',
                    description: 'मिनटों में अपनी ऑनलाइन दुकान बनाएं। WhatsApp, SMS या सोशल मीडिया के जरिए अपना कैटलॉग शेयर करें।',
                },
                qr: {
                    title: 'QR भुगतान',
                    description: 'UPI, कार्ड और वॉलेट तुरंत स्वीकार करें। सीधे अपने बैंक खाते में पेमेंट पाएं।',
                },
                inventory: {
                    title: 'इन्वेंट्री ट्रैकिंग',
                    description: 'रियल-टाइम में स्टॉक लेवल ट्रैक करें। आइटम कम होने पर अलर्ट पाएं।',
                },
                analytics: {
                    title: 'सेल्स एनालिटिक्स',
                    description: 'सरल चार्ट से अपना बिज़नेस समझें। अपने बेस्ट-सेलिंग आइटम और पीक आवर्स जानें।',
                },
                language: {
                    title: 'बहु-भाषा',
                    description: 'हिंदी, तमिल, तेलुगु, मराठी, बंगाली और अन्य क्षेत्रीय भाषाओं में उपलब्ध।',
                },
                connect: {
                    title: 'ग्राहक कनेक्ट',
                    description: 'ऑर्डर अपडेट, प्रमोशन भेजें और स्वचालित रूप से फीडबैक एकत्र करें।',
                },
            },
        },
        // How It Works
        howItWorks: {
            badge: 'सरल प्रक्रिया',
            title: 'बेचना शुरू करें',
            titleHighlight: '4 आसान स्टेप्स में',
            subtitle: '10 मिनट से कम में डिजिटल हो जाएं। हम हर कदम पर आपका मार्गदर्शन करते हैं।',
            cta: 'अपनी यात्रा शुरू करें',
            steps: {
                signup: { title: 'मुफ्त साइन अप', description: 'बस अपने फोन नंबर से रजिस्टर करें। शुरू करने के लिए कोई दस्तावेज़ नहीं चाहिए।' },
                setup: { title: 'शॉप सेट अप', description: 'फोटो के साथ अपने प्रोडक्ट्स जोड़ें। हमारी AI आपकी भाषा में विवरण लिखने में मदद करती है।' },
                share: { title: 'शेयर और बेचें', description: 'WhatsApp पर अपनी डिजिटल शॉप लिंक शेयर करें। ग्राहक आसानी से ब्राउज़ और ऑर्डर कर सकते हैं।' },
                paid: { title: 'पेमेंट पाएं', description: 'सीधे अपने बैंक या UPI में पेमेंट प्राप्त करें। एक जगह पर सभी बिक्री ट्रैक करें।' },
            },
        },
        // Testimonials
        testimonials: {
            badge: 'सफलता की कहानियां',
            title: '',
            titleHighlight: 'वेंडर्स',
            title2: 'द्वारा पसंद किया गया',
            subtitle: 'हज़ारों स्ट्रीट वेंडर्स से जुड़ें जिन्होंने VendorHub के साथ अपना बिज़नेस बदल दिया है।',
        },
        // CTA
        cta: {
            title: 'अपने स्ट्रीट बिज़नेस को',
            title2: 'बदलने के लिए तैयार?',
            subtitle: '10,000+ वेंडर्स से जुड़ें जो पहले से ही डिजिटल रूप से अपना बिज़नेस बढ़ा रहे हैं। मुफ्त शुरू करें।',
            button1: 'मुफ्त शुरू करें',
            button2: 'हमसे बात करें',
        },
        // Footer
        footer: {
            tagline: 'पूरे भारत में स्ट्रीट वेंडर्स को डिजिटल बनाने में सशक्त। सरल टूल्स, शक्तिशाली परिणाम।',
            copyright: '© 2025 VendorHub। सर्वाधिकार सुरक्षित। भारत में ❤️ से बनाया गया।',
        },
        // Dashboard
        dashboard: {
            paymentQr: 'भुगतान QR',
            vendorId: 'वेंडर आईडी',
            share: 'शेयर',
            download: 'डाउनलोड',
            copyLink: 'लिंक कॉपी करें',
            copied: 'कॉपी हो गया!',
            todayEarnings: 'आज की कमाई',
            totalEarnings: 'कुल कमाई',
            customers: 'ग्राहक',
            recentTransactions: 'हाल के लेन-देन',
            viewAll: 'सभी देखें',
            proTip: 'प्रो टिप',
            proTipText: 'अपना QR कोड प्रिंट करें और आसान भुगतान के लिए अपने स्टॉल पर लगाएं। ग्राहक स्कैन करके तुरंत भुगतान कर सकते हैं!',
            printQr: 'QR कोड प्रिंट करें',
        },
        // Signup
        signup: {
            enterPhone: 'अपना फोन नंबर दर्ज करें',
            phoneSubtitle: 'हम आपको सत्यापित करने के लिए एक OTP भेजेंगे',
            sendOtp: 'OTP भेजें',
            verifyOtp: 'OTP सत्यापित करें',
            otpSubtitle: 'भेजे गए 6-अंकीय कोड दर्ज करें',
            verify: 'सत्यापित करें',
            changePhone: 'फोन नंबर बदलें',
            setupProfile: 'अपनी प्रोफाइल सेट करें',
            profileSubtitle: 'हमें अपने व्यापार के बारे में बताएं',
            yourName: 'आपका नाम',
            businessName: 'व्यापार/दुकान का नाम',
            selectType: 'व्यापार प्रकार चुनें',
            location: 'स्थान (जैसे, अंधेरी, मुंबई)',
            createShop: 'मेरी दुकान बनाएं',
            haveAccount: 'पहले से खाता है?',
            signIn: 'साइन इन करें',
        },
    },
    ur: {
        // Navbar
        nav: {
            features: 'خصوصیات',
            howItWorks: 'کیسے کام کرتا ہے',
            testimonials: 'تعریفیں',
            pricing: 'قیمت',
            signIn: 'سائن ان',
            getStarted: 'مفت شروع کریں',
        },
        // Hero
        hero: {
            badge: '10,000+ سٹریٹ وینڈرز کو بااختیار بنا رہے ہیں',
            title1: 'اپنے سٹریٹ',
            titleHighlight: 'کاروبار',
            title2: 'کو',
            title3: 'ڈیجیٹل دنیا میں لے جائیں',
            subtitle: 'ڈیجیٹل ادائیگیاں قبول کریں، انوینٹری کا انتظام کریں، اور گاہکوں سے جڑیں — سب کچھ اپنے موبائل فون سے۔ کوئی تکنیکی مہارت کی ضرورت نہیں۔',
            cta1: 'آج مفت شروع کریں',
            cta2: 'ڈیمو دیکھیں',
            trusted: 'پورے بھارت میں وینڈرز کا بھروسہ',
            stats: {
                vendors: 'فعال وینڈرز',
                transactions: 'لین دین',
                rating: 'ایپ ریٹنگ',
                support: 'سپورٹ',
            },
        },
        // Features
        features: {
            title: 'آپ کو جو کچھ بھی چاہیے',
            titleHighlight: 'بڑھنے کے لیے',
            subtitle: 'سٹریٹ وینڈرز کے لیے بنائے گئے سادہ ٹولز۔ کوئی پیچیدہ سیٹ اپ نہیں، کوئی چھپی فیس نہیں۔',
            items: {
                storefront: {
                    title: 'ڈیجیٹل سٹور فرنٹ',
                    description: 'منٹوں میں اپنی آن لائن دکان بنائیں۔ واٹس ایپ، ایس ایم ایس یا سوشل میڈیا کے ذریعے اپنا کیٹلاگ شیئر کریں۔',
                },
                qr: {
                    title: 'QR ادائیگیاں',
                    description: 'UPI، کارڈز اور والٹس فوری طور پر قبول کریں۔ براہ راست اپنے بینک اکاؤنٹ میں ادائیگی وصول کریں۔',
                },
                inventory: {
                    title: 'انوینٹری ٹریکنگ',
                    description: 'ریئل ٹائم میں اسٹاک کی سطح ٹریک کریں۔ آئٹمز کم ہونے پر الرٹس حاصل کریں۔',
                },
                analytics: {
                    title: 'سیلز اینالیٹکس',
                    description: 'سادہ چارٹس سے اپنا کاروبار سمجھیں۔ اپنے بہترین فروخت ہونے والے آئٹمز اور پیک اوقات جانیں۔',
                },
                language: {
                    title: 'کثیر زبان',
                    description: 'ہندی، تامل، تیلگو، مراٹھی، بنگالی اور مزید علاقائی زبانوں میں دستیاب۔',
                },
                connect: {
                    title: 'کسٹمر کنیکٹ',
                    description: 'آرڈر اپڈیٹس، پروموشنز بھیجیں اور خود بخود فیڈبیک جمع کریں۔',
                },
            },
        },
        // How It Works
        howItWorks: {
            badge: 'سادہ عمل',
            title: 'فروخت شروع کریں',
            titleHighlight: '4 آسان اقدامات میں',
            subtitle: '10 منٹ سے کم میں ڈیجیٹل ہو جائیں۔ ہم ہر قدم پر آپ کی رہنمائی کرتے ہیں۔',
            cta: 'اپنا سفر شروع کریں',
            steps: {
                signup: { title: 'مفت سائن اپ', description: 'صرف اپنے فون نمبر سے رجسٹر کریں۔ شروع کرنے کے لیے کوئی دستاویزات کی ضرورت نہیں۔' },
                setup: { title: 'شاپ سیٹ اپ', description: 'تصاویر کے ساتھ اپنی مصنوعات شامل کریں۔ ہماری AI آپ کی زبان میں تفصیل لکھنے میں مدد کرتی ہے۔' },
                share: { title: 'شیئر اور فروخت کریں', description: 'واٹس ایپ پر اپنی ڈیجیٹل شاپ لنک شیئر کریں۔ گاہک آسانی سے براؤز اور آرڈر کر سکتے ہیں۔' },
                paid: { title: 'ادائیگی وصول کریں', description: 'براہ راست اپنے بینک یا UPI میں ادائیگیاں وصول کریں۔ ایک جگہ پر تمام فروخت ٹریک کریں۔' },
            },
        },
        // Testimonials
        testimonials: {
            badge: 'کامیابی کی کہانیاں',
            title: '',
            titleHighlight: 'وینڈرز',
            title2: 'کا پسندیدہ',
            subtitle: 'ہزاروں سٹریٹ وینڈرز سے جڑیں جنہوں نے VendorHub کے ساتھ اپنا کاروبار بدل دیا ہے۔',
        },
        // CTA
        cta: {
            title: 'اپنے سٹریٹ کاروبار کو',
            title2: 'بدلنے کے لیے تیار؟',
            subtitle: '10,000+ وینڈرز سے جڑیں جو پہلے سے ہی ڈیجیٹل طور پر اپنا کاروبار بڑھا رہے ہیں۔ مفت شروع کریں۔',
            button1: 'مفت شروع کریں',
            button2: 'ہم سے بات کریں',
        },
        // Footer
        footer: {
            tagline: 'پورے بھارت میں سٹریٹ وینڈرز کو ڈیجیٹل بنانے میں بااختیار۔ سادہ ٹولز، طاقتور نتائج۔',
            copyright: '© 2025 VendorHub۔ جملہ حقوق محفوظ ہیں۔ بھارت میں ❤️ سے بنایا گیا۔',
        },
        // Dashboard
        dashboard: {
            paymentQr: 'ادائیگی QR',
            vendorId: 'وینڈر آئی ڈی',
            share: 'شیئر',
            download: 'ڈاؤن لوڈ',
            copyLink: 'لنک کاپی کریں',
            copied: 'کاپی ہو گیا!',
            todayEarnings: 'آج کی کمائی',
            totalEarnings: 'کل کمائی',
            customers: 'گاہک',
            recentTransactions: 'حالیہ لین دین',
            viewAll: 'سب دیکھیں',
            proTip: 'پرو ٹپ',
            proTipText: 'اپنا QR کوڈ پرنٹ کریں اور آسان ادائیگیوں کے لیے اپنے سٹال پر لگائیں۔ گاہک سکین کر کے فوری ادائیگی کر سکتے ہیں!',
            printQr: 'QR کوڈ پرنٹ کریں',
        },
        // Signup
        signup: {
            enterPhone: 'اپنا فون نمبر درج کریں',
            phoneSubtitle: 'ہم آپ کو تصدیق کے لیے ایک OTP بھیجیں گے',
            sendOtp: 'OTP بھیجیں',
            verifyOtp: 'OTP تصدیق کریں',
            otpSubtitle: 'بھیجا گیا 6 ہندسوں کا کوڈ درج کریں',
            verify: 'تصدیق کریں',
            changePhone: 'فون نمبر بدلیں',
            setupProfile: 'اپنی پروفائل سیٹ کریں',
            profileSubtitle: 'ہمیں اپنے کاروبار کے بارے میں بتائیں',
            yourName: 'آپ کا نام',
            businessName: 'کاروبار/دکان کا نام',
            selectType: 'کاروبار کی قسم منتخب کریں',
            location: 'مقام (مثلاً، اندھیری، ممبئی)',
            createShop: 'میری دکان بنائیں',
            haveAccount: 'پہلے سے اکاؤنٹ ہے؟',
            signIn: 'سائن ان کریں',
        },
    },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Check localStorage or default to 'en'
        if (typeof window !== 'undefined') {
            return localStorage.getItem('vendorhub-lang') || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('vendorhub-lang', language);
        // Set RTL for Urdu
        document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const value = {
        language,
        setLanguage,
        t,
        languages: [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
            { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
        ],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
