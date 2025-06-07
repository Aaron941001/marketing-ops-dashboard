import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Eye, MousePointer, Heart, Target, TrendingUp } from 'lucide-react';
import Card from '../UI/Card';

const PaidAdsTab: React.FC = () => {
    const metrics = [
        {
            title: 'Total Spend',
            value: '$45,230',
            icon: DollarSign,
            change: '+8.2%',
            color: 'blue'
        },
        {
            title: 'Impressions',
            value: '3.2M',
            icon: Eye,
            change: '+15.3%',
            color: 'green'
        },
        {
            title: 'Clicks',
            value: '48.2K',
            icon: MousePointer,
            change: '+12.7%',
            color: 'purple'
        },
        {
            title: 'Engagements',
            value: '28.5K',
            icon: Heart,
            change: '+18.4%',
            color: 'red'
        },
        {
            title: 'Web Conversions',
            value: '1,235',
            icon: Target,
            change: '+22.1%',
            color: 'orange'
        },
        {
            title: 'Cost per Conversion',
            value: '$36.64',
            icon: TrendingUp,
            change: '-5.2%',
            color: 'teal'
        }
    ];

    const additionalMetrics = [
        { label: 'CPM (Cost per Mille)', value: '$14.15' },
        { label: 'CPC (Cost per Click)', value: '$0.94' },
        { label: 'CPE (Cost per Engagement)', value: '$1.59' }
    ];

    const impressionsData = [
        { name: 'Mon', impressions: 420000 },
        { name: 'Tue', impressions: 385000 },
        { name: 'Wed', impressions: 510000 },
        { name: 'Thu', impressions: 468000 },
        { name: 'Fri', impressions: 625000 },
        { name: 'Sat', impressions: 580000 },
        { name: 'Sun', impressions: 490000 },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
            green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
            red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
            orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300',
            teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="space-y-6">
            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    const isPositive = metric.change.startsWith('+');
                    const isNegativeGood = metric.title === 'Cost per Conversion';
                    const changeColor = isNegativeGood
                        ? (isPositive ? 'text-red-600' : 'text-green-600')
                        : (isPositive ? 'text-green-600' : 'text-red-600');

                    return (
                        <Card key={index}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                    <p className={`text-sm font-medium ${changeColor}`}>{metric.change}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Additional Metrics */}
            <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cost Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {additionalMetrics.map((metric, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Impressions Chart */}
            <Card>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Paid Impressions per Day</h4>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={impressionsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [value.toLocaleString(), 'Impressions']}
                            labelStyle={{ color: '#374151' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="impressions"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Performance</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Brand Awareness Campaign', budget: '$15,000', spent: '$12,450', performance: 'Excellent' },
                            { name: 'Product Launch Ads', budget: '$20,000', spent: '$18,750', performance: 'Good' },
                            { name: 'Retargeting Campaign', budget: '$8,000', spent: '$7,230', performance: 'Excellent' },
                            { name: 'Lead Generation', budget: '$12,000', spent: '$6,800', performance: 'Average' }
                        ].map((campaign, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                                <h5 className="font-medium text-gray-900 dark:text-white">{campaign.name}</h5>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {campaign.spent} / {campaign.budget}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${campaign.performance === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                        campaign.performance === 'Good' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                        }`}>
                                        {campaign.performance}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Distribution</h4>
                    <div className="space-y-3">
                        {[
                            { platform: 'Facebook Ads', percentage: 35, amount: '$15,830' },
                            { platform: 'Google Ads', percentage: 28, amount: '$12,664' },
                            { platform: 'Instagram Ads', percentage: 20, amount: '$9,046' },
                            { platform: 'LinkedIn Ads', percentage: 12, amount: '$5,428' },
                            { platform: 'Twitter Ads', percentage: 5, amount: '$2,262' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.platform}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.amount}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaidAdsTab; 