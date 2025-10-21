"use client"

import React, { use } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const BrandingLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center py-20">
                <div className="mb-8">
                    <Image 
                        src="/logo.jpg" 
                        alt="LinkShorti Logo" 
                        width={80}
                        height={80}
                        className="w-20 h-20 mx-auto rounded-2xl shadow-xl object-cover"
                    />
                </div>
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 mb-6">
                    LinkShorti
                </h1>
                <p className="text-2xl text-gray-600 mb-4 font-light">
                    URL Shortener & Link Management
                </p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Transform your links into powerful marketing tools. Shorten, track, and monetize your URLs with our advanced platform.
                </p>
            </header>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                    <p className="text-gray-600">Create shortened links instantly with our optimized infrastructure and global CDN.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                        <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
                    <p className="text-gray-600">Track clicks, locations, devices, and more with detailed real-time analytics.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Monetization</h3>
                    <p className="text-gray-600">Earn revenue from your links with our integrated advertising platform.</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="text-center mb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">50M+</div>
                        <p className="text-gray-600">Links Shortened</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                        <p className="text-gray-600">Uptime Guarantee</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">10M+</div>
                        <p className="text-gray-600">Monthly Clicks</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who trust LinkShorti for their URL shortening needs. Create your first link in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Start Shortening Links
                    </button>
                    <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-12 text-gray-500">
                <p>&copy; 2024 LinkShorti. All rights reserved.</p>
                <p className="mt-2">Secure, reliable, and fast URL shortening service.</p>
            </footer>
        </div>
    </div>
);

const InvalidURLPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
        <div className="max-w-xl w-full p-10 bg-white rounded-3xl shadow-2xl text-center border-t-4 border-yellow-500">
            <div className="text-6xl mb-4 text-yellow-500">🚫</div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Invalid URL Format
            </h2>
            <p className="text-lg text-gray-600 mb-6">
                The link structure provided does not match our expected format. Please ensure you are using a single path segment.
            </p>
            <p className="mt-6 text-sm text-gray-500">
                Example: linkshort.com/<span className="font-bold">mylinkid</span>
            </p>
        </div>
    </div>
);

const getPathDetails = (params) => {
    const shortURL = params.shortURL;
    const isRoot = !shortURL || shortURL.length === 0;
    const pathSegment = isRoot ? null : shortURL[0];
    const isInvalidMultiSegment = !isRoot && shortURL.length > 1;

    return { pathSegment, isRoot, isInvalidMultiSegment };
}

export default function App({ params }) {
    const resolvedParams = use(params);
    const { pathSegment, isRoot, isInvalidMultiSegment } = getPathDetails(resolvedParams);

    // Handle invalid multi-segment URLs
    if (isInvalidMultiSegment) {
        return <InvalidURLPage />;
    }

    // Handle root page
    if (isRoot) {
        return <BrandingLandingPage />;
    }

    // Handle single path segment - redirect to verification
    if (pathSegment) {
        redirect(`/verify/${pathSegment}`);
    }

    return <BrandingLandingPage />;
}