"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function TechBlogPage({ params }) {
    const router = useRouter();
    const [shortURL, setShortURL] = useState('');
    const [timer, setTimer] = useState(10); // 10 seconds
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
            router.push(`/redirect/${shortURL}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Please wait...</p>
                </div>
            </div>
        );
    }

    const timePercentage = ((10 - timer) / 10) * 100;
    const isReady = timer === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">


                {/* Blog Article */}
                <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-10">
                        <div className="relative mb-8">
                            <Image
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
                                alt="AI and machine learning technology"
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h1 className="text-3xl font-bold leading-tight mb-2">
                                    AI Revolution: How Machine Learning is Transforming Industries
                                </h1>
                                <p className="text-purple-200">Technology • 3 min read</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
                                Discover how artificial intelligence and machine learning are reshaping business operations across every industry, creating unprecedented opportunities for innovation and growth.
                            </p>

                            <div className="space-y-8 mb-8">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Artificial Intelligence has moved from science fiction to everyday reality. From healthcare diagnostics to autonomous vehicles, AI is revolutionizing how we work, live, and interact with technology. The global AI market is projected to reach $1.8 trillion by 2030, representing a compound annual growth rate of 32.9%.
                                </p>

                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200">
                                    <div className="flex items-center justify-center mb-4">
                                        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 font-semibold">
                                            ⏳ Loading AI Insights... Please Wait
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 text-sm">Processing advanced machine learning data...</p>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Machine learning algorithms are now capable of processing vast amounts of data to identify patterns, make predictions, and automate complex decision-making processes. This capability is transforming industries at an unprecedented pace. Companies like Google, Microsoft, and Amazon are investing billions in AI research and development.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Technology</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Size (2024)</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Rate</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Players</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Machine Learning</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$209.91B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38.8%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google, Microsoft, IBM</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Natural Language Processing</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$26.84B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25.7%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">OpenAI, Google, Meta</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Computer Vision</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$17.38B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7.8%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NVIDIA, Intel, Amazon</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Robotics</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$31.12B</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">26.9%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Boston Dynamics, Tesla, ABB</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">🤖 AI Applications by Industry</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• <strong>Healthcare:</strong> Diagnostic imaging, drug discovery, personalized medicine, robotic surgery</li>
                                        <li>• <strong>Finance:</strong> Fraud detection, algorithmic trading, credit scoring, robo-advisors</li>
                                        <li>• <strong>Retail:</strong> Personalized recommendations, inventory management, price optimization, chatbots</li>
                                        <li>• <strong>Manufacturing:</strong> Predictive maintenance, quality control, supply chain optimization, autonomous robots</li>
                                        <li>• <strong>Transportation:</strong> Autonomous vehicles, route optimization, traffic management, logistics</li>
                                        <li>• <strong>Education:</strong> Personalized learning, automated grading, virtual tutors, content creation</li>
                                        <li>• <strong>Agriculture:</strong> Crop monitoring, precision farming, livestock management, weather prediction</li>
                                    </ul>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
                                        alt="AI neural network visualization"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                    <Image
                                        src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
                                        alt="Machine learning algorithms"
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    The democratization of AI tools means that businesses of all sizes can now leverage machine learning capabilities. Cloud-based AI services from providers like AWS, Google Cloud, and Microsoft Azure have made advanced analytics accessible without requiring extensive technical expertise. Small startups can now access the same AI capabilities that were once exclusive to tech giants.
                                </p>

                                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                                    <div className="text-center">
                                        <div className="animate-pulse mb-4">
                                            <div className="h-4 bg-blue-300 rounded w-3/4 mx-auto mb-2"></div>
                                            <div className="h-4 bg-blue-300 rounded w-1/2 mx-auto"></div>
                                        </div>
                                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold">
                                            🔄 Continue Reading... (Processing)
                                        </button>
                                        <p className="text-blue-600 text-sm mt-2">Analyzing content relevance...</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Future of AI: Emerging Trends and Technologies</h2>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Looking ahead, several emerging AI trends are set to reshape the technological landscape. Generative AI, exemplified by models like GPT-4 and DALL-E, is revolutionizing content creation, code generation, and creative industries. Edge AI is bringing intelligence closer to data sources, reducing latency and improving privacy. Quantum machine learning promises to solve complex problems that are currently intractable for classical computers.
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white p-4 rounded-lg shadow-md border">
                                        <h4 className="font-bold text-gray-900 mb-2">🧠 Generative AI</h4>
                                        <p className="text-sm text-gray-600">Creating human-like content, code, and media</p>
                                        <div className="mt-3">
                                            <div className="bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Adoption: 85%</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-md border">
                                        <h4 className="font-bold text-gray-900 mb-2">⚡ Edge AI</h4>
                                        <p className="text-sm text-gray-600">Processing data locally on devices</p>
                                        <div className="mt-3">
                                            <div className="bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Adoption: 65%</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-md border">
                                        <h4 className="font-bold text-gray-900 mb-2">🔬 Quantum ML</h4>
                                        <p className="text-sm text-gray-600">Quantum-enhanced machine learning</p>
                                        <div className="mt-3">
                                            <div className="bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Adoption: 15%</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    However, with great power comes great responsibility. As AI becomes more prevalent, discussions around ethics, privacy, and the future of work become increasingly important. Organizations must balance innovation with responsible AI practices. The European Union&apos;s AI Act and similar regulations worldwide are establishing frameworks for ethical AI development and deployment.
                                </p>

                                <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-500">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ AI Ethics Considerations</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Key Challenges:</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• Algorithmic bias and fairness</li>
                                                <li>• Data privacy and security</li>
                                                <li>• Job displacement concerns</li>
                                                <li>• Transparency and explainability</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">Best Practices:</h4>
                                            <ul className="space-y-1 text-gray-700 text-sm">
                                                <li>• Diverse development teams</li>
                                                <li>• Regular bias audits</li>
                                                <li>• Human oversight mechanisms</li>
                                                <li>• Clear governance frameworks</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center my-8">
                                    <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 font-semibold shadow-lg">
                                        📊 View More AI Statistics & Trends
                                    </button>
                                    <p className="text-gray-500 text-sm mt-2">Click to explore detailed market analysis</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-xl font-bold mb-3">🤖 AI Resources</h3>
                                    <p className="text-sm opacity-90 mb-4">Latest AI tools and machine learning guides</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        Explore AI Tools
                                    </button>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-2xl text-white">
                                    <h3 className="text-xl font-bold mb-3">💻 Developer Hub</h3>
                                    <p className="text-sm opacity-90 mb-4">Code tutorials and programming resources</p>
                                    <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-sm">
                                        Browse Tutorials
                                    </button>
                                </div>
                            </div>

                            <div className="bg-purple-50 p-6 rounded-2xl mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Tech Trends 2024</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                        <span className="text-2xl">🚀</span>
                                        <div>
                                            <div className="font-semibold text-sm">Artificial Intelligence</div>
                                            <div className="text-xs text-gray-500">Machine Learning & Deep Learning</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                        <span className="text-2xl">🔗</span>
                                        <div>
                                            <div className="font-semibold text-sm">Blockchain Technology</div>
                                            <div className="text-xs text-gray-500">Web3 & Decentralized Apps</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                        <span className="text-2xl">☁️</span>
                                        <div>
                                            <div className="font-semibold text-sm">Cloud Computing</div>
                                            <div className="text-xs text-gray-500">Serverless & Edge Computing</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                        <span className="text-2xl">🛡️</span>
                                        <div>
                                            <div className="font-semibold text-sm">Cybersecurity</div>
                                            <div className="text-xs text-gray-500">Zero Trust & AI Security</div>
                                        </div>
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
                                            className="text-purple-600 transition-all duration-300"
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
                                        <span className="text-green-600 font-bold">All articles read! Ready to continue</span>
                                    ) : (
                                        <span>Continue available in <span className="text-purple-600 font-bold">{timer}</span> seconds</span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={!isReady}
                                className={`px-10 py-4 font-semibold rounded-full shadow-lg transition duration-300 text-lg ${isReady
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isReady ? 'Continue to Destination →' : 'Please Wait...'}
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}