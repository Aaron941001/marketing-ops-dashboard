import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Eye, Heart } from 'lucide-react';
import Card from '../UI/Card';

const SocialMediaTab: React.FC = () => {
    const [selectedPlatforms, setSelectedPlatforms] = useState(['Facebook', 'Instagram', 'X']);
    const [dateRange, setDateRange] = useState('7d');

    const platforms = ['Facebook', 'Instagram', 'X (Twitter)', 'YouTube', 'LinkedIn', 'TikTok', 'Xiaohongshu', 'WeChat'];

    const metrics = [
        {
            title: 'Total Impressions',
            value: '2.4M',
            change: '+12.5%',
            trend: 'up',
            organic: '1.8M',
            paid: '600K'
        },
        {
            title: 'Engagement Rate',
            value: '4.2%',
            change: '+0.8%',
            trend: 'up',
            organic: '3.8%',
            paid: '5.1%'
        },
        {
            title: 'Link Clicks',
            value: '48.2K',
            change: '-2.1%',
            trend: 'down',
            organic: '28.1K',
            paid: '20.1K'
        }
    ];

    const chartData = [
        { name: 'Mon', impressions: 340000, engagement: 14200 },
        { name: 'Tue', impressions: 385000, engagement: 16100 },
        { name: 'Wed', impressions: 420000, engagement: 17800 },
        { name: 'Thu', impressions: 398000, engagement: 16600 },
        { name: 'Fri', impressions: 445000, engagement: 18700 },
        { name: 'Sat', impressions: 520000, engagement: 22100 },
        { name: 'Sun', impressions: 490000, engagement: 20500 },
    ];

    const topPost = {
        platform: 'Instagram',
        content: 'Behind the scenes of our latest product photoshoot 📸✨',
        engagement: '15.2K',
        reach: '450K'
    };

    const handlePlatformToggle = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platform Filters</h3>
                    <div className="flex flex-wrap gap-2">
                        {platforms.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => handlePlatformToggle(platform)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedPlatforms.includes(platform)
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                    <Card key={index}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                <div className="flex items-center mt-1">
                                    {metric.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                    <span className={`text-sm ml-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {metric.change}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Organic: {metric.organic}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Paid: {metric.paid}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Chart and Top Post */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Impressions & Engagement Trend</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Post</h4>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full dark:bg-pink-900 dark:text-pink-300">
                                {topPost.platform}
                            </span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium">{topPost.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{topPost.engagement}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{topPost.reach}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SocialMediaTab; 