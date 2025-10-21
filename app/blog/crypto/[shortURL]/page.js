"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function CryptoBlogPage({ params }) {
    const router = useRouter();
    const [shortURL, setShortURL] = useState('');
    const [timer, setTimer] = useState(15); // 15 seconds
    const [linkData, setLinkData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setShortURL(resolvedParams.shortURL);

            // Get link data from sessionStorage
            const storedData = sessionStorage.getItem('linkData');
            if (storedData) {
                const data = JSON.parse(storedData);
                setLinkData(data);

                // Track impression
                await fetch('/api/update-statistics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: data.userEmail,
                        location: 'Rest of World'
                    }),
                });
            } else {
                // Redirect back to verify if no data
                router.push(`/verify/${resolvedParams.shortURL}`);
                return;
            }
            setIsLoading(false);
        };
        resolveParams();
    }, [params, router]);

    useEffect(() => {
        if (timer > 0 && !isLoading) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isLoading]);

    const handleContinue = () => {
        if (timer === 0) {
            router.push(`/blog/finance/${shortURL}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Please wait...</p>
                </div>
            </div>
        );
    }

    const timePercentage = ((15 - timer) / 15) * 100;
    const isReady = timer === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">


                {/* Blog Article */}
                <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="relative mb-8">
                            <Image
                                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop"
                                alt="Bitcoin cryptocurrency"
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h1 className="text-3xl font-bold leading-tight mb-2">
                                    Bitcoin Hits New All-Time High: What This Means for Investors
                                </h1>
                                <p className="text-orange-200">Cryptocurrency • 3 min read</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
                                Cryptocurrency markets are experiencing unprecedented growth and institutional adoption. Learn about the latest trends, investment opportunities, and revolutionary technologies shaping the digital asset landscape.
                            </p>

                            <div className="space-y-8 mb-8">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Bitcoin has reached a new all-time high of $73,000, marking a significant milestone in the cryptocurrency&apos;s 15-year journey. This surge comes amid growing institutional adoption, increasing mainstream acceptance of digital assets, and the approval of multiple Bitcoin ETFs. The total cryptocurrency market cap has exceeded $2.8 trillion, representing a 340% increase from the previous cycle low.
                                </p>

                                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl border border-orange-200">
                                    <div className="flex items-center justify-center mb-4">
                                        <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-semibold">
                                            ₿ Loading Real-Time Crypto Data... Please Wait
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 text-sm">Fetching live market prices and trading volumes...</p>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Major corporations like Tesla, MicroStrategy, Square, and El Salvador have added Bitcoin to their treasury reserves, signaling a fundamental shift in how traditional businesses and governments view cryptocurrency. The recent approval of Bitcoin ETFs by the SEC has opened the floodgates for retail investors to gain exposure to crypto through traditional investment vehicles, with over $50 billion in assets under management within the first year.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cryptocurrency</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Volume</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YTD Performance</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Use Case</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bitcoin (BTC)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.44T</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$28.5B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+168%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Digital Gold</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ethereum (ETH)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$445B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15.2B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+85%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Smart Contracts</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Solana (SOL)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$108B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3.8B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+892%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High Performance</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cardano (ADA)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$32B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1.2B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+45%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sustainability</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Polygon (MATIC)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$9.8B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$890M</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+127%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Layer 2 Scaling</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Ethereum, the second-largest cryptocurrency, has also seen substantial gains, driven by the explosive growth of decentralized finance (DeFi) applications, non-fungible tokens (NFTs), and the successful transition to Proof-of-Stake consensus. The Ethereum ecosystem now hosts over $100 billion in total value locked (TVL) across various DeFi protocols, making it the backbone of decentralized finance.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop"
                                        alt="Ethereum blockchain network"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                    <Image
                                        src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop"
                                        alt="DeFi trading interface"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-2xl border border-purple-200">
                                    <div className="text-center">
                                        <div className="animate-pulse mb-4">
                                            <div className="h-4 bg-purple-300 rounded w-3/4 mx-auto mb-2"></div>
                                            <div className="h-4 bg-purple-300 rounded w-1/2 mx-auto"></div>
                                        </div>
                                        <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 font-semibold">
                                            🔗 Continue to DeFi Analysis
                                        </button>
                                        <p className="text-purple-600 text-sm mt-2">Loading decentralized finance data...</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Rise of Decentralized Finance (DeFi)</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Decentralized Finance has emerged as one of the most transformative applications of blockchain technology. DeFi protocols enable users to lend, borrow, trade, and earn yield on their cryptocurrency holdings without traditional intermediaries. Popular platforms like Uniswap, Aave, Compound, and MakerDAO have collectively processed over $4 trillion in transaction volume, demonstrating the massive demand for decentralized financial services.
                                </p>

                                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Crypto Investment Strategies</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">For Beginners:</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• Start with 1-5% of total portfolio</li>
                                                <li>• Focus on Bitcoin and Ethereum initially</li>
                                                <li>• Use reputable exchanges (Coinbase, Kraken, Binance)</li>
                                                <li>• Consider hardware wallets for security</li>
                                                <li>• Dollar-cost average to reduce volatility</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Advanced Strategies:</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• Diversify across different blockchain ecosystems</li>
                                                <li>• Explore DeFi yield farming opportunities</li>
                                                <li>• Consider staking for passive income</li>
                                                <li>• Monitor regulatory developments closely</li>
                                                <li>• Use stop-losses and take-profit orders</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Emerging Trends: Layer 2 Solutions and Web3</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Layer 2 scaling solutions like Polygon, Arbitrum, and Optimism are addressing Ethereum&apos;s scalability challenges by processing transactions off the main chain while maintaining security. These solutions have reduced transaction costs by over 90% and increased throughput by 100x, making DeFi accessible to a broader audience. The Web3 ecosystem, built on these foundations, is creating new paradigms for digital ownership, identity, and social interaction.
                                </p>

                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Blockchain Ecosystem Comparison</h3>
                                    <div className="grid md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-2xl mb-2">₿</div>
                                            <div className="font-semibold text-sm">Bitcoin</div>
                                            <div className="text-xs text-gray-500 mt-1">7 TPS</div>
                                            <div className="text-xs text-gray-500">$2-50 fees</div>
                                        </div>
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl mb-2">Ξ</div>
                                            <div className="font-semibold text-sm">Ethereum</div>
                                            <div className="text-xs text-gray-500 mt-1">15 TPS</div>
                                            <div className="text-xs text-gray-500">$5-100 fees</div>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-2xl mb-2">◎</div>
                                            <div className="font-semibold text-sm">Solana</div>
                                            <div className="text-xs text-gray-500 mt-1">65,000 TPS</div>
                                            <div className="text-xs text-gray-500">$0.001 fees</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl mb-2">⟠</div>
                                            <div className="font-semibold text-sm">Polygon</div>
                                            <div className="text-xs text-gray-500 mt-1">7,000 TPS</div>
                                            <div className="text-xs text-gray-500">$0.01 fees</div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    For investors considering crypto exposure, experts recommend starting with established cryptocurrencies like Bitcoin and Ethereum, which have proven track records, strong developer communities, and institutional backing. Dollar-cost averaging is often suggested as a strategy to mitigate the inherent volatility of cryptocurrency markets. Risk management is crucial - never invest more than you can afford to lose, and consider crypto as a high-risk, high-reward component of a diversified portfolio.
                                </p>

                                <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-2xl border border-red-200">
                                    <div className="flex items-center justify-center mb-4">
                                        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-semibold">
                                            ⚠️ Risk Assessment Loading... Please Wait
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 text-sm">Calculating portfolio risk metrics and volatility analysis...</p>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Landscape and Future Outlook</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    The regulatory environment for cryptocurrencies is rapidly evolving. The European Union&apos;s Markets in Crypto-Assets (MiCA) regulation, the US SEC&apos;s ongoing enforcement actions, and various central bank digital currency (CBDC) initiatives are shaping the future of digital assets. While regulatory clarity brings legitimacy and institutional confidence, it also introduces compliance requirements that may affect innovation and market dynamics.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulatory Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Legislation</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">United States</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Developing</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Various Bills in Congress</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mixed signals</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">European Union</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Clear Framework</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">MiCA Regulation</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Positive clarity</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Singapore</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Crypto-Friendly</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Payment Services Act</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Innovation hub</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Japan</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Well-Regulated</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Virtual Currency Act</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mature market</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-center my-8">
                                    <button className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full hover:from-orange-700 hover:to-red-700 transition duration-300 font-semibold shadow-lg">
                                        📊 Access Live Crypto Portfolio Tracker
                                    </button>
                                    <p className="text-gray-500 text-sm mt-2">Monitor real-time prices and manage your crypto investments</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-orange-500 to-yellow-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-xl font-bold mb-3">🚀 Explore More</h3>
                                    <p className="text-sm opacity-90 mb-4">Discover trending crypto insights and market analysis</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        Read More Articles
                                    </button>
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-xl font-bold mb-3">📊 Market Data</h3>
                                    <p className="text-sm opacity-90 mb-4">Get real-time cryptocurrency prices and charts</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        View Live Prices
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Bitcoin</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Ethereum</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">DeFi</span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">NFTs</span>
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Trading</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with timer */}
                    <footer className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-16 h-16">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-gray-200" strokeWidth="5" stroke="currentColor" fill="transparent" r="25" cx="32" cy="32" />
                                        <circle
                                            className="text-orange-600 transition-all duration-300"
                                            strokeWidth="5"
                                            strokeDasharray={2 * Math.PI * 25}
                                            strokeDashoffset={(100 - timePercentage) / 100 * (2 * Math.PI * 25)}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="25"
                                            cx="32"
                                            cy="32"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
                                        {timer}
                                    </span>
                                </div>
                                <p className="text-lg text-gray-700 font-medium">
                                    {isReady ? (
                                        <span className="text-green-600 font-bold">Article read! Ready to continue</span>
                                    ) : (
                                        <span>Continue available in <span className="text-orange-600 font-bold">{timer}</span> seconds</span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={!isReady}
                                className={`px-10 py-4 font-semibold rounded-full shadow-lg transition duration-300 text-lg ${isReady
                                    ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 transform hover:scale-105 shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isReady ? 'Next → Finance' : 'Please Wait...'}
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}