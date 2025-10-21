"use client"

import React from 'react';

const InvalidURLPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-800 text-white p-8">
        <h1 className="text-4xl font-extrabold mb-4">404 - Not Found 🛑</h1>
        <p className="text-lg">Invalid short URL format.</p>
    </div>
);

export default InvalidURLPage;
