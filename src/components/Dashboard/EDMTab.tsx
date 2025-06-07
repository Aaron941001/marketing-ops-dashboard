import React, { useState } from 'react';
import { Mail, Users, MousePointer, UserMinus } from 'lucide-react';
import Card from '../UI/Card';

const EDMTab: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState('all');

    const campaigns = [
        {
            id: 1,
            name: 'Summer Sale 2024',
            region: 'Global',
            sentTime: '2024-05-25 10:00',
            recipients: 45230,
            openRate: 28.5,
            clickRate: 4.2,
            unsubscribeRate: 0.3
        },
        {
            id: 2,
            name: 'Product Launch Newsletter',
            region: 'North America',
            sentTime: '2024-05-24 14:30',
            recipients: 18450,
            openRate: 32.1,
            clickRate: 6.8,
            unsubscribeRate: 0.2
        },
        {
            id: 3,
            name: 'Weekly Industry Updates',
            region: 'Europe',
            sentTime: '2024-05-23 09:00',
            recipients: 12340,
            openRate: 25.8,
            clickRate: 3.4,
            unsubscribeRate: 0.1
        },
        {
            id: 4,
            name: 'Customer Success Stories',
            region: 'Asia Pacific',
            sentTime: '2024-05-22 16:15',
            recipients: 8920,
            openRate: 30.2,
            clickRate: 5.1,
            unsubscribeRate: 0.2
        },
        {
            id: 5,
            name: 'Feature Update Announcement',
            region: 'Global',
            sentTime: '2024-05-21 11:45',
            recipients: 38750,
            openRate: 26.7,
            clickRate: 4.9,
            unsubscribeRate: 0.4
        }
    ];

    const filteredCampaigns = selectedRegion === 'all'
        ? campaigns
        : campaigns.filter(campaign => campaign.region === selectedRegion);

    const totalMetrics = {
        totalSent: campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0),
        avgOpenRate: campaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / campaigns.length,
        avgClickRate: campaigns.reduce((sum, campaign) => sum + campaign.clickRate, 0) / campaigns.length,
        avgUnsubscribeRate: campaigns.reduce((sum, campaign) => sum + campaign.unsubscribeRate, 0) / campaigns.length
    };

    const regions = ['Global', 'North America', 'Europe', 'Asia Pacific'];

    return (
        <div className="space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sent</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalMetrics.totalSent.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Open Rate</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalMetrics.avgOpenRate.toFixed(1)}%</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                            <MousePointer className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Click Rate</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalMetrics.avgClickRate.toFixed(1)}%</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                            <UserMinus className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Unsubscribe</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalMetrics.avgUnsubscribeRate.toFixed(1)}%</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Campaigns Table */}
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email Campaigns</h4>
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">All Regions</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Campaign Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Region</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Sent Time</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Recipients</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Open Rate</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Click Rate</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Unsubscribe Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{campaign.name}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full dark:bg-blue-900 dark:text-blue-300">
                                            {campaign.region}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{campaign.sentTime}</td>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">{campaign.recipients.toLocaleString()}</td>
                                    <td className="py-3 px-4">
                                        <span className={`font-medium ${campaign.openRate > 30 ? 'text-green-600' :
                                                campaign.openRate > 25 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {campaign.openRate}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`font-medium ${campaign.clickRate > 5 ? 'text-green-600' :
                                                campaign.clickRate > 3 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {campaign.clickRate}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`font-medium ${campaign.unsubscribeRate < 0.2 ? 'text-green-600' :
                                                campaign.unsubscribeRate < 0.4 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {campaign.unsubscribeRate}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default EDMTab; 