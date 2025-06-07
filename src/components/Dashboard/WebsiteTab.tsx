import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, Activity } from 'lucide-react';
import Card from '../UI/Card';

const WebsiteTab: React.FC = () => {
    const metrics = [
        {
            title: 'Pageviews',
            value: '125,430',
            icon: Eye,
            change: '+8.2%',
            color: 'blue'
        },
        {
            title: 'Active Users',
            value: '12,543',
            icon: Users,
            change: '+12.1%',
            color: 'green'
        },
        {
            title: 'Key Events',
            value: '2,845',
            icon: Activity,
            change: '+5.7%',
            color: 'purple'
        },
        {
            title: 'Total Events',
            value: '45,231',
            icon: Activity,
            change: '+3.4%',
            color: 'orange'
        }
    ];

    const realtimeUsers = 1247;

    const trafficData = [
        { name: '7 days ago', visitors: 1840 },
        { name: '6 days ago', visitors: 2200 },
        { name: '5 days ago', visitors: 1980 },
        { name: '4 days ago', visitors: 2450 },
        { name: '3 days ago', visitors: 2100 },
        { name: '2 days ago', visitors: 2780 },
        { name: 'Yesterday', visitors: 2640 },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
            green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
            orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="space-y-6">
            {/* Real-time Users */}
            <Card>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Users</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active in the past 30 minutes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{realtimeUsers.toLocaleString()}</span>
                    </div>
                </div>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <Card key={index}>
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                    <p className="text-sm text-green-600 dark:text-green-400">{metric.change}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Traffic Trend */}
            <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">7-Day Traffic Trend</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="visitors"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Top Pages */}
            <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Pages</h4>
                <div className="space-y-3">
                    {[
                        { page: '/products/marketing-suite', views: 15420, percentage: 32 },
                        { page: '/blog/content-strategy-tips', views: 8750, percentage: 18 },
                        { page: '/pricing', views: 6820, percentage: 14 },
                        { page: '/about', views: 4920, percentage: 10 },
                        { page: '/contact', views: 3680, percentage: 8 },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.page}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="ml-4 text-right">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.views.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default WebsiteTab; 