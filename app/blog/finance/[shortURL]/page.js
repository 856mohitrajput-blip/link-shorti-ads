"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function FinanceBlogPage({ params }) {
    const router = useRouter();
    const [shortURL, setShortURL] = useState('');
    const [timer, setTimer] = useState(12); // 12 seconds
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
            router.push(`/blog/tech/${shortURL}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Please wait...</p>
                </div>
            </div>
        );
    }

    const timePercentage = ((12 - timer) / 12) * 100;
    const isReady = timer === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">


                {/* Blog Article */}
                <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-10">
                        <div className="relative mb-8">
                            <Image 
                                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop" 
                                alt="Financial investment charts" 
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h1 className="text-3xl font-bold leading-tight mb-2">
                                    Smart Investment Strategies for 2024: Building Wealth in Uncertain Times
                                </h1>
                                <p className="text-blue-200">Finance • 4 min read</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
                                Navigate the complex financial landscape with proven investment strategies that protect and grow your wealth in today&apos;s volatile economic environment.
                            </p>

                            <div className="space-y-8 mb-8">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    The financial markets in 2024 present both unprecedented opportunities and significant challenges. With inflation concerns, geopolitical tensions, technological disruptions, and central bank policy shifts, investors need a sophisticated, well-balanced approach to wealth building. The S&P 500 has experienced over 20% volatility this year, making strategic planning more crucial than ever.
                                </p>

                                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl border border-green-200">
                                    <div className="flex items-center justify-center mb-4">
                                        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-semibold">
                                            💰 Calculating Portfolio Returns... Please Wait
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 text-sm">Analyzing market data and risk metrics...</p>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Diversification remains the cornerstone of smart investing, but the traditional approaches are evolving. A balanced portfolio should include stocks, bonds, real estate, and alternative investments. The classic 60/40 stock-to-bond ratio is being reconsidered as bonds face interest rate pressures and inflation concerns. Modern portfolio theory suggests a more dynamic allocation based on market conditions and economic cycles.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Class</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conservative (%)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moderate (%)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aggressive (%)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Return</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">US Stocks</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">70%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8-12%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">International Stocks</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6-10%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bonds</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-6%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">REITs</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4-8%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alternatives</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-15%</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cash</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4-5%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Advanced Portfolio Allocation Strategies</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Growth-Focused (Ages 20-40):</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• 70-80% Growth stocks and index funds</li>
                                                <li>• 15-25% International diversification</li>
                                                <li>• 5-10% Real estate investment trusts (REITs)</li>
                                                <li>• 5-10% Alternative investments (commodities, crypto)</li>
                                                <li>• 5% Cash and emergency funds</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Balanced Approach (Ages 40-60):</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• 50-60% Stocks (mix of growth and value)</li>
                                                <li>• 20-30% Bonds and fixed income</li>
                                                <li>• 10-15% International exposure</li>
                                                <li>• 5-10% REITs and real estate</li>
                                                <li>• 5-10% Cash and short-term securities</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop" 
                                        alt="Financial charts and analysis" 
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                    <Image 
                                        src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop" 
                                        alt="Investment portfolio dashboard" 
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Dollar-cost averaging continues to be an effective strategy for long-term investors, particularly in volatile markets. By investing a fixed amount regularly regardless of market conditions, you reduce the impact of market volatility and benefit from compound growth over time. Studies show that investors who consistently apply dollar-cost averaging over 20+ years typically outperform those who try to time the market.
                                </p>

                                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl border border-yellow-200">
                                    <div className="text-center">
                                        <div className="animate-bounce mb-4">
                                            <span className="text-4xl">⏰</span>
                                        </div>
                                        <button className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 font-semibold">
                                            📈 Continue to Advanced Strategies
                                        </button>
                                        <p className="text-yellow-700 text-sm mt-2">Loading investment calculators...</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Funds and Risk Management</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Emergency funds are more critical than ever in today&apos;s uncertain economic climate. Financial experts now recommend 6-12 months of expenses in high-yield savings accounts, with some suggesting even more for freelancers or those in volatile industries. This provides stability and prevents the need to liquidate investments during market downturns. Current high-yield savings accounts offer 4-5% APY, making them attractive for emergency funds.
                                </p>

                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Emergency Fund Calculator</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-red-50 rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">3-6 Months</div>
                                            <div className="text-sm text-gray-600">Minimum Recommended</div>
                                            <div className="text-xs text-gray-500 mt-1">Stable employment</div>
                                        </div>
                                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                            <div className="text-2xl font-bold text-yellow-600">6-9 Months</div>
                                            <div className="text-sm text-gray-600">Moderate Risk</div>
                                            <div className="text-xs text-gray-500 mt-1">Variable income</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">9-12 Months</div>
                                            <div className="text-sm text-gray-600">High Security</div>
                                            <div className="text-xs text-gray-500 mt-1">Self-employed</div>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax-Advantaged Investment Strategies</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Maximizing tax-advantaged accounts is crucial for long-term wealth building. For 2024, 401(k) contribution limits have increased to $23,000 ($30,500 for those 50+), while IRA limits remain at $7,000 ($8,000 for those 50+). Roth conversions during market downturns can be particularly advantageous, allowing you to pay taxes on temporarily depressed asset values.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2024 Limit</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age 50+ Catch-up</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Treatment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">401(k)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$23,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,500</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pre-tax contributions</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Roth 401(k)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$23,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,500</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">After-tax contributions</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Traditional IRA</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Deductible (income limits)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Roth IRA</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tax-free growth</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HSA</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$4,150 (individual)</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Triple tax advantage</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-center my-8">
                                    <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-semibold shadow-lg">
                                        🎯 Access Premium Investment Tools
                                    </button>
                                    <p className="text-gray-500 text-sm mt-2">Unlock advanced portfolio analysis and recommendations</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-bold mb-3">💼 Investment Tools</h3>
                                    <p className="text-sm opacity-90 mb-4">Professional portfolio management</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        Explore Tools
                                    </button>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-bold mb-3">📈 Market Analysis</h3>
                                    <p className="text-sm opacity-90 mb-4">Expert financial insights</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        View Analysis
                                    </button>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-lg font-bold mb-3">🎯 Planning</h3>
                                    <p className="text-sm opacity-90 mb-4">Retirement & wealth planning</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        Start Planning
                                    </button>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Categories</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl mb-2">📊</div>
                                        <div className="text-sm font-medium">Stocks</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl mb-2">🏠</div>
                                        <div className="text-sm font-medium">Real Estate</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl mb-2">💰</div>
                                        <div className="text-sm font-medium">Bonds</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl mb-2">🌍</div>
                                        <div className="text-sm font-medium">International</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with timer */}
                    <footer className="p-8 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-16 h-16">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-gray-200" strokeWidth="5" stroke="currentColor" fill="transparent" r="25" cx="32" cy="32" />
                                        <circle
                                            className="text-blue-600 transition-all duration-300"
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
                                        <span>Continue available in <span className="text-blue-600 font-bold">{timer}</span> seconds</span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={!isReady}
                                className={`px-10 py-4 font-semibold rounded-full shadow-lg transition duration-300 text-lg ${
                                    isReady
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-xl'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isReady ? 'Next → Tech' : 'Please Wait...'}
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}