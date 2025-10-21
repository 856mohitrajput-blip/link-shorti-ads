"use client"

import React from 'react';
import { Target, DollarSign } from 'lucide-react';

const AdBanner = ({ size = 'large' }) => {
    // Defines standard sizes for desktop and mobile responsiveness
    const adDimensions = {
        large: {
            desktop: 'h-[120px] max-w-5xl mx-auto',
            mobile: 'h-[90px] w-full',
            iconSize: 32,
            textSize: 'text-xl',
        },
        medium: {
            desktop: 'h-[90px] max-w-4xl mx-auto',
            mobile: 'h-[70px] w-full',
            iconSize: 24,
            textSize: 'text-lg',
        },
        small: {
            desktop: 'h-[60px] max-w-3xl mx-auto',
            mobile: 'h-[50px] w-full',
            iconSize: 18,
            textSize: 'text-base',
        },
    };

    const dimensions = adDimensions[size] || adDimensions.large;

    return (
        <div 
            className={`
                my-6 p-4 flex items-center justify-center rounded-2xl 
                bg-white border border-gray-100 shadow-lg shadow-gray-200/50 
                transition-all duration-300 transform hover:shadow-xl
                ${dimensions.mobile} sm:${dimensions.desktop}
            `}
        >
            <div className="flex items-center space-x-3 text-gray-500">
                <Target className="text-indigo-400" size={dimensions.iconSize} strokeWidth={2.5} />
                <p className={`font-semibold ${dimensions.textSize} tracking-wide text-gray-600`}>
                    Curated Partner Content
                </p>
                <DollarSign className="text-green-500" size={dimensions.iconSize} strokeWidth={2.5} />
            </div>
            {/* Real ad content would replace this placeholder */}
        </div>
    );
};

export default AdBanner;
