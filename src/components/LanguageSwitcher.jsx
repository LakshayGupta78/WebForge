import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function LanguageSwitcher() {
    const { language, setLanguage, languages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(l => l.code === language);

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Globe className="w-4 h-4" />
                <span>{currentLang?.nativeName}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-green-50' : ''
                                        }`}
                                    whileHover={{ x: 2 }}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className={`font-medium ${language === lang.code ? 'text-green-700' : 'text-gray-900'}`}>
                                            {lang.nativeName}
                                        </span>
                                        <span className="text-xs text-gray-500">{lang.name}</span>
                                    </div>
                                    {language === lang.code && (
                                        <Check className="w-4 h-4 text-green-600" />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LanguageSwitcher;
