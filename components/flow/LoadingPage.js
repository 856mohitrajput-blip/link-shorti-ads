"use client"

import React from 'react';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LoadingPage = ({ pathSegment }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-b-4"></div>
        <p className="mt-6 text-xl">Looking up **/{pathSegment}** on {NEXT_PUBLIC_BASE_URL}...</p>
    </div>
);

export default LoadingPage;
