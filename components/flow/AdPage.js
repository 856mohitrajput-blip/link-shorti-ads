"use client"

import React, { useMemo } from 'react';
import { CheckCircle, TrendingUp, Shield, Zap, Clock, DollarSign } from 'lucide-react';

// --- MOCK AdBanner Component (from previous step for single-file coherence) ---
const AdBanner = ({ size = 'large' }) => {
    const adDimensions = {
        large: { desktop: 'h-[120px] max-w-5xl mx-auto', mobile: 'h-[90px] w-full', iconSize: 32, textSize: 'text-xl' },
        medium: { desktop: 'h-[90px] max-w-4xl mx-auto', mobile: 'h-[70px] w-full', iconSize: 24, textSize: 'text-lg' },
        small: { desktop: 'h-[60px] max-w-3xl mx-auto', mobile: 'h-[50px] w-full', iconSize: 18, textSize: 'text-base' },
    };

    const dimensions = adDimensions[size] || adDimensions.large;

    return (
        <div 
            className={`
                my-6 p-4 flex items-center justify-center rounded-2xl 
                bg-white border border-gray-100 shadow-lg shadow-gray-200/50 
                transition-all duration-300
                ${dimensions.mobile} sm:${dimensions.desktop}
            `}
        >
            <div className="flex items-center space-x-3 text-gray-500">
                <Clock className="text-indigo-400" size={dimensions.iconSize} strokeWidth={2.5} />
                <p className={`font-semibold ${dimensions.textSize} tracking-wide text-gray-600`}>
                    Curated Partner Content Placeholder
                </p>
                <DollarSign className="text-green-500" size={dimensions.iconSize} strokeWidth={2.5} />
            </div>
        </div>
    );
};
// -----------------------------------------------------------------------------

const CryptoBlogContent = () => (
    <div className="text-left p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner text-gray-800 border-l-4 border-indigo-500 max-h-[60vh] md:max-h-[50vh] overflow-y-auto ring-1 ring-indigo-100">
        <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-4 flex items-center">
            <TrendingUp className="w-7 h-7 mr-3 text-indigo-500" />
            The Future of Finance: Understanding Decentralized Crypto
        </h3>
        <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
            Cryptocurrency, often heralded as the **digital evolution of money**, is far more than just Bitcoin. It represents a paradigm shift away from centralized banking systems toward **Decentralized Finance (DeFi)**. At its core, crypto relies on **blockchain technology**—a distributed, immutable ledger that transparently records transactions across many computers. This eliminates the need for intermediaries like banks, giving users unprecedented control over their assets.
        </p>
        <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
            **Key Concept: The Blockchain.** Think of the blockchain as a chain of blocks, where each block contains a list of verified transactions. Once a block is added to the chain, it cannot be altered or deleted. This fundamental immutability is what provides the security and trust in the system. Mining or staking are the processes used to validate these transactions and add new blocks.
        </p>
        <p className="text-sm font-semibold text-gray-600 italic">
            Disclaimer: Cryptocurrency investments are highly volatile and risky. Always conduct your own research (DYOR).
        </p>
    </div>
);

const InsuranceBlogContent = () => (
    <div className="text-left p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner text-gray-800 border-l-4 border-teal-500 max-h-[60vh] md:max-h-[50vh] overflow-y-auto ring-1 ring-teal-100">
        <h3 className="text-2xl md:text-3xl font-extrabold text-teal-700 mb-4 flex items-center">
            <Shield className="w-7 h-7 mr-3 text-teal-500" />
            Navigating Health Coverage: Essential Tips for Choosing the Right Policy
        </h3>
        <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
            Choosing the right health insurance is one of the most critical financial decisions you will make. It acts as a safety net, protecting you from crippling medical debt. The core principle of insurance is **risk pooling**: many individuals pay premiums, and those funds are used to cover the unexpected, high-cost health expenses of the few who need it.
        </p>
        <div className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
            **Understanding Key Terms:** When evaluating a policy, familiarize yourself with these terms:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>**Premium:** The fixed monthly or annual payment to maintain coverage.</li>
                <li>**Deductible:** The amount you must pay out-of-pocket before your insurance coverage kicks in.</li>
            </ul>
        </div>
        <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
            **Policy Types (HMO vs. PPO):**
            **HMOs** (Health Maintenance Organizations) usually have lower premiums and copays but require you to stay within a network of providers. **PPOs** (Preferred Provider Organizations) offer more flexibility.
        </p>
        <p className="text-sm font-semibold text-gray-600 italic">
            Recommendation: Review your expected annual medical usage before selecting a plan with a high deductible.
        </p>
    </div>
);

const CircularProgressBar = ({ duration, timer, color, index, total }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = duration - timer;
    const dashoffset = circumference - (progress / duration) * circumference;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background track */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                />
                {/* Progress arc */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800">
                <span className="text-5xl font-extrabold text-gray-900 drop-shadow-sm">{timer}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Seconds</span>
                <span className="text-xs font-semibold mt-1 text-indigo-500">Step {index + 1} / {total}</span>
            </div>
        </div>
    );
};

const AdPage = ({ type, timer, onContinue, index, total }) => {
    const isTimerZero = timer === 0;
    const isCrypto = type === 'CRYPTO';
    const duration = useMemo(() => {
        // Mocking PAGE_SEQUENCE lookup for duration
        const MOCK_SEQUENCE = [ { duration: 3 }, { duration: 3 }, { duration: 3 }, { duration: 3 }, ];
        return MOCK_SEQUENCE[index]?.duration || 5; 
    }, [index]);

    const theme = useMemo(() => isCrypto ? {
        color: 'indigo',
        primary: 'text-indigo-600',
        bg: 'bg-indigo-50',
        title: 'Essential Financial Intelligence',
        subtitle: 'Curated Crypto insights to help you navigate the digital asset landscape.'
    } : {
        color: 'teal',
        primary: 'text-teal-600',
        bg: 'bg-teal-50',
        title: 'Crucial Health & Wealth Protection',
        subtitle: 'Key strategies for choosing insurance and safeguarding your most valuable assets.'
    }, [isCrypto]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div 
                className={`w-full max-w-4xl p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-3xl transform transition duration-500 
                    ring-4 ring-offset-4 ring-${theme.color}-500/10 hover:shadow-2xl`}
            >
                {/* Header Bar */}
                <div className={`text-center py-4 rounded-xl mb-6 border-b-2 border-dashed border-${theme.color}-200`}>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold ${theme.primary}`}>
                        <span className='mr-2'>{isCrypto ? '💰' : '🩺'}</span> {theme.title}
                    </h2>
                    <p className={`text-sm sm:text-base mt-1 text-gray-500`}>
                        {theme.subtitle}
                    </p>
                </div>

                {/* Ad Content */}
                <AdBanner size="small" />
                <div className="mt-6 mb-8">
                    {isCrypto ? <CryptoBlogContent /> : <InsuranceBlogContent />}
                </div>
                <AdBanner size="medium" />

                {/* Timer and Action Area */}
                <div className={`mt-8 p-6 ${theme.bg} rounded-2xl flex flex-col items-center justify-center space-y-6 shadow-inner border border-${theme.color}-100`}>
                    
                    <CircularProgressBar 
                        duration={duration} 
                        timer={timer} 
                        color={theme.color === 'indigo' ? '#6366f1' : '#14b8a6'} 
                        index={index} 
                        total={total}
                    />

                    <div className='w-full'>
                        {isTimerZero ? (
                            <div className="text-xl font-bold text-green-600 flex items-center justify-center animate-pulse">
                                <CheckCircle className='w-6 h-6 mr-2' /> Access Granted!
                            </div>
                        ) : (
                            <p className="text-base font-semibold text-gray-600">
                                Please review the content. Destination link unlocks when the timer reaches 0.
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onContinue}
                        disabled={!isTimerZero}
                        className={`w-full py-4 px-6 rounded-full text-xl font-bold transition duration-300 shadow-xl transform 
                            ${isTimerZero 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] ring-4 ring-indigo-300/50' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-80 shadow-none'
                            }` }
                    >
                        {isTimerZero ? (
                            <span className='flex items-center justify-center'>
                                Continue to Next Step <Zap className='w-6 h-6 ml-2' />
                            </span>
                        ) : `Please Wait (${timer}s remaining)`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdPage;
