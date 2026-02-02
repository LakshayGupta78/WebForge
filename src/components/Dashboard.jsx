import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
    Wallet,
    TrendingUp,
    Users,
    Bell,
    Settings,
    LogOut,
    Share2,
    Download,
    Copy,
    CheckCircle,
    IndianRupee,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Store,
    ChevronRight,
    Smartphone,
    CreditCard,
    Edit3,
    Save,
    QrCode,
    Gift,
    ShoppingBag,
    BarChart3,
    MessageSquare,
    Star,
    Zap,
    Target
} from 'lucide-react';

// Mock transaction data
const mockTransactions = [
    { id: 1, customer: 'Amit S.', amount: 150, time: '2 mins ago', type: 'credit' },
    { id: 2, customer: 'Priya K.', amount: 320, time: '15 mins ago', type: 'credit' },
    { id: 3, customer: 'Rahul M.', amount: 85, time: '1 hour ago', type: 'credit' },
    { id: 4, customer: 'Bank Transfer', amount: 2000, time: 'Yesterday', type: 'debit' },
    { id: 5, customer: 'Neha R.', amount: 450, time: 'Yesterday', type: 'credit' },
];

// Generate UPI Payment URL for QR
function generateUPIUrl(upiId, name, amount = '') {
    if (!upiId) return '';
    const params = new URLSearchParams({
        pa: upiId,
        pn: name || 'Vendor',
        cu: 'INR',
    });
    if (amount) params.append('am', amount);
    return `upi://pay?${params.toString()}`;
}

// UPI QR Card with editable UPI ID
function UPIQRCard({ vendorData, onUpdateUPI }) {
    const [isEditing, setIsEditing] = useState(false);
    const [upiId, setUpiId] = useState(vendorData?.upiId || '');
    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);

    // Sync local state when vendorData loads/changes
    useEffect(() => {
        if (vendorData?.upiId) {
            setUpiId(vendorData.upiId);
        }
    }, [vendorData?.upiId]);

    const paymentUrl = generateUPIUrl(upiId, vendorData?.businessName);
    const hasUPI = upiId && upiId.includes('@');

    const handleSaveUPI = async () => {
        if (!upiId.includes('@')) {
            alert('Please enter a valid UPI ID (e.g., yourname@upi)');
            return;
        }
        setSaving(true);
        await onUpdateUPI(upiId);
        setSaving(false);
        setIsEditing(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: `Pay ${vendorData?.businessName}`,
                text: `Scan to pay ${vendorData?.businessName} via UPI: ${upiId}`,
                url: paymentUrl,
            });
        }
    };

    const handleDownload = () => {
        const svg = document.getElementById('vendor-qr-code');
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = 400;
            canvas.height = 400;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 400, 400);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `${vendorData?.businessName || 'VendorHub'}-QR.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <motion.div
                className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 rounded-3xl p-6 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full">
                        <defs>
                            <pattern id="wallet-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#wallet-pattern)" />
                    </svg>
                </div>

                {/* Header */}
                <div className="relative flex items-center justify-between mb-4">
                    <div>
                        <p className="text-green-200 text-sm font-medium flex items-center gap-1">
                            <QrCode className="w-4 h-4" /> Payment QR
                        </p>
                        <h3 className="text-white text-xl font-bold">{vendorData?.businessName || 'Your Shop'}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <Store className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* UPI ID Input/Display */}
                <div className="relative bg-white/10 backdrop-blur rounded-xl p-3 mb-4">
                    <p className="text-green-200 text-xs mb-1">UPI ID</p>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="yourname@upi"
                                className="flex-1 bg-white/20 text-white placeholder-green-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30"
                                autoFocus
                            />
                            <motion.button
                                onClick={handleSaveUPI}
                                disabled={saving}
                                className="bg-white text-green-700 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {saving ? '...' : <><Save className="w-4 h-4" /> Save</>}
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <p className="text-white font-mono font-semibold">
                                {upiId || 'Not set - Click to add'}
                            </p>
                            <motion.button
                                onClick={() => setIsEditing(true)}
                                className="text-green-200 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Edit3 className="w-4 h-4" />
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* QR Code */}
                <motion.div
                    className="bg-white rounded-2xl p-4 mb-4 flex items-center justify-center min-h-[200px]"
                    whileHover={{ scale: 1.02 }}
                >
                    {hasUPI ? (
                        <QRCodeSVG
                            id="vendor-qr-code"
                            value={paymentUrl}
                            size={180}
                            level="H"
                            includeMargin={true}
                            bgColor="#FFFFFF"
                            fgColor="#166534"
                        />
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="font-medium">Enter your UPI ID</p>
                            <p className="text-sm">to generate payment QR</p>
                        </div>
                    )}
                </motion.div>

                {/* Vendor ID */}
                <div className="relative text-center mb-4">
                    <p className="text-green-200 text-xs">Vendor ID</p>
                    <p className="text-white text-lg font-mono font-bold tracking-wider">
                        {vendorData?.vendorId || 'VH-DEMO123'}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="relative grid grid-cols-3 gap-2">
                    <motion.button
                        onClick={handleShare}
                        disabled={!hasUPI}
                        className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl p-3 hover:bg-white/20 transition-all disabled:opacity-50"
                        whileHover={{ scale: hasUPI ? 1.05 : 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Share2 className="w-5 h-5 text-white" />
                        <span className="text-white text-xs">Share</span>
                    </motion.button>

                    <motion.button
                        onClick={handleDownload}
                        disabled={!hasUPI}
                        className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl p-3 hover:bg-white/20 transition-all disabled:opacity-50"
                        whileHover={{ scale: hasUPI ? 1.05 : 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download className="w-5 h-5 text-white" />
                        <span className="text-white text-xs">Download</span>
                    </motion.button>

                    <motion.button
                        onClick={handleCopy}
                        disabled={!hasUPI}
                        className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl p-3 hover:bg-white/20 transition-all disabled:opacity-50"
                        whileHover={{ scale: hasUPI ? 1.05 : 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {copied ? (
                            <CheckCircle className="w-5 h-5 text-green-300" />
                        ) : (
                            <Copy className="w-5 h-5 text-white" />
                        )}
                        <span className="text-white text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Card Shadow */}
            <div className="absolute -bottom-3 left-4 right-4 h-8 bg-green-900/30 rounded-3xl blur-xl -z-10" />
        </motion.div>
    );
}

// Bento Grid Stats Card
function BentoCard({ icon: Icon, label, value, change, changeType, size = 'normal', color = 'green', children }) {
    const sizeClasses = {
        normal: 'col-span-1',
        wide: 'col-span-2',
        tall: 'col-span-1 row-span-2',
    };

    const colorClasses = {
        green: 'bg-green-100 text-green-700',
        orange: 'bg-orange-100 text-orange-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm ${sizeClasses[size]} h-full min-h-[140px] flex flex-col`}
        >
            {Icon && (
                <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium min-w-[48px] justify-end ${change ? (changeType === 'up' ? 'text-green-600' : 'text-red-500') : 'text-transparent'}`}>
                        {change ? (
                            <>
                                {changeType === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {change}
                            </>
                        ) : (
                            <span>-</span>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-auto">
                {label && <p className="text-gray-500 text-sm mb-1">{label}</p>}
                {value && <p className="text-2xl font-bold text-gray-900">{value}</p>}
            </div>
            {children}
        </motion.div>
    );
}

// Transaction Item
function TransactionItem({ transaction }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    {transaction.type === 'credit' ? (
                        <ArrowDownRight className="w-5 h-5 text-green-600" />
                    ) : (
                        <ArrowUpRight className="w-5 h-5 text-orange-600" />
                    )}
                </div>
                <div>
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {transaction.time}
                    </p>
                </div>
            </div>
            <p className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-orange-600'}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
            </p>
        </motion.div>
    );
}

// Quick Action Button
function QuickAction({ icon: Icon, label, onClick, color = 'green' }) {
    const colorClasses = {
        green: 'bg-green-100 text-green-700',
        orange: 'bg-orange-100 text-orange-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <motion.button
            onClick={onClick}
            className="flex flex-col items-center gap-2 p-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-700">{label}</span>
        </motion.button>
    );
}

export function Dashboard() {
    const navigate = useNavigate();
    const { user, vendorData, logout } = useAuth();
    const [localVendorData, setLocalVendorData] = useState(null);

    useEffect(() => {
        if (vendorData) {
            setLocalVendorData(vendorData);
        }
    }, [vendorData]);

    // Demo data if not logged in
    const demoVendorData = {
        vendorId: 'VHDEMO123',
        businessName: 'Demo Shop',
        vendorName: 'Demo User',
        upiId: '',
        totalTransactions: 127,
        totalEarnings: 45250,
    };

    const data = localVendorData || vendorData || demoVendorData;

    const handleUpdateUPI = async (upiId) => {
        console.log('handleUpdateUPI called with:', upiId);
        console.log('user:', user);
        console.log('vendorData:', vendorData);

        // Always update local state first for immediate UI feedback
        setLocalVendorData(prev => ({ ...(prev || data), upiId }));

        if (user) {
            try {
                console.log('Saving UPI to Firestore for user:', user.uid);
                const vendorRef = doc(db, 'vendors', user.uid);
                await updateDoc(vendorRef, { upiId });
                console.log('UPI saved successfully!');
            } catch (error) {
                console.error('Error updating UPI:', error);
                alert('Failed to save UPI ID: ' + error.message);
            }
        } else {
            console.log('No user logged in, UPI saved locally only');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">V</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900">{data.businessName}</h1>
                                <p className="text-xs text-gray-500">{data.vendorId}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <motion.button
                                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bell className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Settings className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={handleLogout}
                                className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-100"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogOut className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column - QR Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <UPIQRCard vendorData={data} onUpdateUPI={handleUpdateUPI} />

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-4"
                        >
                            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                            <div className="grid grid-cols-4 gap-2">
                                <QuickAction icon={Smartphone} label="Request" color="green" />
                                <QuickAction icon={Users} label="Customers" color="blue" />
                                <QuickAction icon={ShoppingBag} label="Products" color="orange" />
                                <QuickAction icon={Gift} label="Offers" color="purple" />
                            </div>
                        </motion.div>

                        {/* Tip Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Pro Tip</h3>
                                    <p className="text-orange-100 text-sm">
                                        Print your QR and place at stall. Customers can scan & pay instantly!
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Bento Grid */}
                    <div className="lg:col-span-8">
                        {/* Stats Bento Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <BentoCard
                                icon={IndianRupee}
                                label="Today's Earnings"
                                value="₹2,450"
                                change="+12%"
                                changeType="up"
                                color="green"
                            />
                            <BentoCard
                                icon={TrendingUp}
                                label="This Week"
                                value="₹18,320"
                                change="+8%"
                                changeType="up"
                                color="blue"
                            />
                            <BentoCard
                                icon={Users}
                                label="Customers"
                                value="127"
                                change="+5%"
                                changeType="up"
                                color="purple"
                            />
                            <BentoCard
                                icon={Star}
                                label="Rating"
                                value="4.8★"
                                color="orange"
                            />
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {/* Total Earnings Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-green-100">Total Earnings</p>
                                    <Wallet className="w-6 h-6 text-green-200" />
                                </div>
                                <p className="text-4xl font-bold mb-2">₹{(data.totalEarnings || 45250).toLocaleString()}</p>
                                <p className="text-green-200 text-sm">+₹4,200 from last month</p>
                            </motion.div>

                            {/* Goal Progress Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-gray-500">Monthly Goal</p>
                                    <Target className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">₹50,000</p>
                                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '72%' }}></div>
                                </div>
                                <p className="text-sm text-gray-500">72% achieved • ₹14,000 to go</p>
                            </motion.div>
                        </div>

                        {/* Transactions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                                <button className="text-green-700 text-sm font-medium flex items-center gap-1 hover:underline">
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div>
                                {mockTransactions.map((transaction) => (
                                    <TransactionItem key={transaction.id} transaction={transaction} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Bottom Row - Feature Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-blue-50 rounded-2xl p-5 border border-blue-100 cursor-pointer"
                            >
                                <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold text-gray-900">Analytics</h3>
                                <p className="text-sm text-gray-500">View detailed insights</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-purple-50 rounded-2xl p-5 border border-purple-100 cursor-pointer"
                            >
                                <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
                                <h3 className="font-semibold text-gray-900">Feedback</h3>
                                <p className="text-sm text-gray-500">24 new reviews</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-orange-50 rounded-2xl p-5 border border-orange-100 cursor-pointer"
                            >
                                <Gift className="w-8 h-8 text-orange-600 mb-3" />
                                <h3 className="font-semibold text-gray-900">Promotions</h3>
                                <p className="text-sm text-gray-500">Create offers</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
