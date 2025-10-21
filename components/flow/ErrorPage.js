"use client"

import React from 'react';

const ErrorPage = ({ pathSegment }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-600 text-white p-8">
        <h1 className="text-4xl font-extrabold mb-4">API Error 🛑</h1>
        <p className="text-lg">
            Could not resolve the link or connect to the backend.
        </p>
        <p className="mt-4 text-sm font-mono break-words max-w-lg p-2 bg-red-700 rounded">
            Check the console for details on: **/{pathSegment}**
        </p>
    </div>
);

export default ErrorPage;
