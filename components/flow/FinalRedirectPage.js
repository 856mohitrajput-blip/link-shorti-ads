"use client"

import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

const FinalRedirectPage = ({ originalURL }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
        {/* Main Success Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-3xl w-full max-w-xl text-center text-gray-800 transition-all duration-500 ring-4 ring-offset-4 ring-green-500/10">
            
            {/* Success Icon */}
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500 stroke-[1.5] animate-bounce" />
            
            {/* Header */}
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-gray-800 tracking-tight">
                Access Granted!
            </h1>
            
            <p className="text-base sm:text-lg mb-8 text-gray-500 max-w-sm mx-auto">
                Thank you for completing the curated content flow. Your destination link is ready!
            </p>
            
            {/* URL Display Block */}
            <div className="mb-8 p-4 bg-green-50/70 rounded-xl border border-green-100 shadow-inner">
                 <p className="text-sm font-semibold text-green-700 mb-2">
                    Secured Destination URL:
                 </p>
                 <code className="text-base sm:text-lg font-mono font-bold text-green-800 break-words block p-3 bg-white rounded-lg shadow-md ring-1 ring-green-100">
                    {originalURL || "Redirecting..."}
                 </code>
            </div>

            {/* Action Button */}
            <a 
                href={originalURL} 
                target="_blank" 
                rel="noopener noreferrer" 
                // Full rounded button with hover and active effects, matching the AdPage style
                className="w-full inline-flex items-center justify-center py-4 px-8 rounded-full text-xl font-bold transition duration-300 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
                           bg-green-500 text-white hover:bg-green-600 ring-4 ring-green-300/50"
            >
                Go to Link Now 
                <ExternalLink className='w-6 h-6 ml-2' />
            </a>
            
            <p className="mt-6 text-xs text-gray-400">
                (The page is set for immediate redirection to ensure a smooth experience.)
            </p>
        </div>
    </div>
);

export default FinalRedirectPage;
