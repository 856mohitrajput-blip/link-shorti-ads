"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';

// Real API calls
const verifyRecaptcha = async (token) => {
    const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });
    return response.json();
};

const getLinkDetails = async (shortUrl) => {
    const response = await fetch('/api/get-link-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shortUrl }),
    });
    return response.json();
};

export default function VerifyPage({ params }) {
    const router = useRouter();
    const [shortURL, setShortURL] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);


    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setShortURL(resolvedParams.shortURL);
            setIsLoading(false);
        };
        resolveParams();
    }, [params]);



    const onRecaptchaLoad = useCallback(() => {
        setRecaptchaLoaded(true);
    }, []);

    const handleRecaptchaError = useCallback(() => {
        setError('reCAPTCHA verification failed. Please try again.');
    }, []);

    const handleRecaptchaSuccess = useCallback(async (token) => {
        setIsVerifying(true);
        setError(null);
        
        try {
            // First verify reCAPTCHA token with Google
            const recaptchaResult = await verifyRecaptcha(token);
            
            if (!recaptchaResult.success) {
                setError(recaptchaResult.error || 'reCAPTCHA verification failed');
                return;
            }

            // Then verify the link exists
            const linkData = await getLinkDetails(shortURL);
            
            if (linkData.error) {
                setError(linkData.error);
                return;
            }

            // Store link data in sessionStorage for next steps
            sessionStorage.setItem('linkData', JSON.stringify({
                originalUrl: linkData.originalUrl,
                userEmail: linkData.userEmail,
                shortURL: shortURL,
                recaptchaToken: token,
                verifiedAt: new Date().toISOString()
            }));

            // Redirect to first blog page
            router.push(`/blog/crypto/${shortURL}`);
        } catch (error) {
            console.error('Error during verification:', error);
            setError('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    }, [shortURL, router]);

    // Set up global callback for reCAPTCHA
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onRecaptchaSuccess = (token) => {
                handleRecaptchaSuccess(token);
            };
            window.onRecaptchaError = () => {
                handleRecaptchaError();
            };
        }
    }, [handleRecaptchaSuccess, handleRecaptchaError]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-cyan-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading verification...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Script
                src="https://www.google.com/recaptcha/api.js"
                onLoad={onRecaptchaLoad}
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
                <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <Image 
                                src="/logo.jpg" 
                                alt="LinkShorti Logo" 
                                width={64}
                                height={64}
                                className="w-16 h-16 mx-auto rounded-2xl shadow-lg object-cover"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Verification</h1>
                        <p className="text-gray-600">Please verify you&apos;re human to continue to your destination</p>
                    </div>



                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-center mb-6">
                        {recaptchaLoaded && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                            <div
                                className="g-recaptcha"
                                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                data-callback="onRecaptchaSuccess"
                                data-error-callback="onRecaptchaError"
                            ></div>
                        ) : (
                            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-yellow-700 text-sm">
                                    {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY 
                                        ? 'reCAPTCHA site key not configured' 
                                        : 'Loading reCAPTCHA...'}
                                </p>
                            </div>
                        )}
                    </div>

                    {isVerifying && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                            <p className="text-gray-600 text-sm">Verifying...</p>
                        </div>
                    )}

                    <div className="text-center text-xs text-gray-500 mt-6">
                        <p>Protected by reCAPTCHA</p>
                        <p>Google Privacy Policy and Terms of Service apply</p>
                    </div>
                </div>
            </div>


        </>
    );
}