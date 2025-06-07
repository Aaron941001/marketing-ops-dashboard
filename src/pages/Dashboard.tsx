import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/UI/tabs';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Mail,
    Users,
    MousePointer,
    UserMinus,
    Calendar,
    ChevronDown
} from 'lucide-react';
import { useSocialMediaData } from '../hooks/useSocialMediaData';
import { useWebsiteData } from '../hooks/useWebsiteData';
import { useEDMData } from '../hooks/useEDMData';

// Date range state interface
interface DateRange {
    startDate: string;
    endDate: string;
    compareOption: 'Last Month' | 'Previous Year' | 'Custom';
    compareStartDate?: string;
    compareEndDate?: string;
}

// Date Range Picker Component
const DateRangePicker: React.FC<{
    dateRange: DateRange;
    onDateRangeChange: (range: DateRange) => void;
}> = ({ dateRange, onDateRangeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempRange, setTempRange] = useState(dateRange);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const getCompareRange = (range: DateRange) => {
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        if (range.compareOption === 'Last Month') {
            const compareEnd = new Date(start);
            compareEnd.setDate(compareEnd.getDate() - 1);
            const compareStart = new Date(compareEnd);
            compareStart.setDate(compareStart.getDate() - diffDays + 1);
            return `${formatDate(compareStart.toISOString().split('T')[0])} – ${formatDate(compareEnd.toISOString().split('T')[0])}`;
        } else if (range.compareOption === 'Previous Year') {
            const compareStart = new Date(start);
            compareStart.setFullYear(compareStart.getFullYear() - 1);
            const compareEnd = new Date(end);
            compareEnd.setFullYear(compareEnd.getFullYear() - 1);
            return `${formatDate(compareStart.toISOString().split('T')[0])} – ${formatDate(compareEnd.toISOString().split('T')[0])}`;
        }
        return range.compareStartDate && range.compareEndDate
            ? `${formatDate(range.compareStartDate)} – ${formatDate(range.compareEndDate)}`
            : '';
    };

    const handleApply = () => {
        onDateRangeChange(tempRange);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <Calendar className="w-4 h-4 text-gray-500" />
                <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                        {formatDate(dateRange.startDate)} – {formatDate(dateRange.endDate)}
                    </div>
                    <div className="text-xs text-gray-500">
                        vs {getCompareRange(dateRange)}
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Select Date Range</h4>

                        {/* Date Inputs */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={tempRange.startDate}
                                    onChange={(e) => setTempRange({ ...tempRange, startDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={tempRange.endDate}
                                    onChange={(e) => setTempRange({ ...tempRange, endDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Compare To Dropdown */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Compare to</label>
                            <select
                                value={tempRange.compareOption}
                                onChange={(e) => setTempRange({
                                    ...tempRange,
                                    compareOption: e.target.value as DateRange['compareOption']
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Last Month">Last Month</option>
                                <option value="Previous Year">Previous Year</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>

                        {/* Custom Compare Range */}
                        {tempRange.compareOption === 'Custom' && (
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Compare Start</label>
                                    <input
                                        type="date"
                                        value={tempRange.compareStartDate || ''}
                                        onChange={(e) => setTempRange({ ...tempRange, compareStartDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Compare End</label>
                                    <input
                                        type="date"
                                        value={tempRange.compareEndDate || ''}
                                        onChange={(e) => setTempRange({ ...tempRange, compareEndDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// User Journey Visualization Component
const UserJourneyVisualization: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const getFlowLineWidth = (count: number, maxCount: number) => {
        return Math.max(2, (count / maxCount) * 8);
    };

    const maxPageCount = Math.max(...userJourneyData.sessionStart.branches.map(b => b.count));
    const maxEventCount = Math.max(...userJourneyData.sessionStart.branches.flatMap(b => b.events.map(e => e.count)));

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">User Journey Path Visualization</h3>

            <div className="overflow-x-auto">
                <div className="min-w-[800px] flex items-start space-x-8">
                    {/* Session Start */}
                    <div className="flex flex-col items-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">Start</div>
                        <div
                            className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center min-w-[120px] cursor-pointer transition-all duration-200 hover:shadow-md"
                            onMouseEnter={() => setHoveredNode('session_start')}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <div className="font-semibold text-gray-900">{userJourneyData.sessionStart.name}</div>
                            <div className="text-sm text-gray-600">{userJourneyData.sessionStart.count.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Flow Lines to Pages */}
                    <div className="flex flex-col justify-center space-y-8 mt-8">
                        {userJourneyData.sessionStart.branches.map((page, pageIndex) => (
                            <div key={pageIndex} className="flex items-center">
                                <svg width="60" height="4" className="mx-2">
                                    <line
                                        x1="0"
                                        y1="2"
                                        x2="60"
                                        y2="2"
                                        stroke="#3b82f6"
                                        strokeWidth={getFlowLineWidth(page.count, maxPageCount)}
                                        opacity="0.7"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Step +1: Pages */}
                    <div className="flex flex-col space-y-4">
                        <div className="text-xs font-medium text-gray-500 mb-2 text-center">Step +1</div>
                        {userJourneyData.sessionStart.branches.map((page, pageIndex) => (
                            <div key={pageIndex} className="flex items-center space-x-4">
                                <div
                                    className="bg-green-100 border-2 border-green-300 rounded-lg p-3 text-center min-w-[120px] cursor-pointer transition-all duration-200 hover:shadow-md"
                                    onMouseEnter={() => setHoveredNode(`page_${pageIndex}`)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <div className="font-semibold text-gray-900 text-sm">{page.name}</div>
                                    <div className="text-xs text-gray-600">{page.count.toLocaleString()}</div>
                                    <div className="text-xs text-green-600">{page.percentage}%</div>
                                </div>

                                {/* Flow Lines to Events */}
                                <div className="flex space-x-2">
                                    {page.events.map((event, eventIndex) => (
                                        <svg key={eventIndex} width="40" height="4">
                                            <line
                                                x1="0"
                                                y1="2"
                                                x2="40"
                                                y2="2"
                                                stroke="#3b82f6"
                                                strokeWidth={getFlowLineWidth(event.count, maxEventCount)}
                                                opacity="0.6"
                                            />
                                        </svg>
                                    ))}
                                </div>

                                {/* Step +2: Events */}
                                <div className="flex space-x-3">
                                    {page.events.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="bg-purple-100 border-2 border-purple-300 rounded-lg p-2 text-center min-w-[100px] cursor-pointer transition-all duration-200 hover:shadow-md"
                                            onMouseEnter={() => setHoveredNode(`event_${pageIndex}_${eventIndex}`)}
                                            onMouseLeave={() => setHoveredNode(null)}
                                        >
                                            <div className="font-semibold text-gray-900 text-xs">{event.name}</div>
                                            <div className="text-xs text-gray-600">{event.count.toLocaleString()}</div>
                                            <div className="text-xs text-purple-600">{event.percentage}%</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step +2 Label */}
                    <div className="flex flex-col">
                        <div className="text-xs font-medium text-gray-500 mb-2 text-center">Step +2</div>
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredNode && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm text-gray-700">
                        {hoveredNode === 'session_start' && (
                            <span>Starting point for all user sessions</span>
                        )}
                        {hoveredNode.startsWith('page_') && (
                            <span>Page view events and subsequent user actions</span>
                        )}
                        {hoveredNode.startsWith('event_') && (
                            <span>User interaction events on this page</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Platform-specific data for Social Media
const platformData = {
    Facebook: {
        engagement: [
            { month: 'Jan', reactions: 1200, comments: 340, shares: 180, postLinkClicks: 450, otherClicks: 120 },
            { month: 'Feb', reactions: 1350, comments: 420, shares: 220, postLinkClicks: 520, otherClicks: 140 },
            { month: 'Mar', reactions: 1100, comments: 380, shares: 160, postLinkClicks: 480, otherClicks: 110 },
            { month: 'Apr', reactions: 1450, comments: 480, shares: 250, postLinkClicks: 580, otherClicks: 160 },
            { month: 'May', reactions: 1600, comments: 520, shares: 290, postLinkClicks: 620, otherClicks: 180 },
            { month: 'Jun', reactions: 1750, comments: 580, shares: 320, postLinkClicks: 680, otherClicks: 200 },
        ],
        demographics: [
            { age: '18-24', percentage: 25 },
            { age: '25-34', percentage: 35 },
            { age: '35-44', percentage: 25 },
            { age: '45+', percentage: 15 },
        ],
        engagementMetrics: {
            reactions: { organic: '72.3K', paid: '26.2K', total: '98.5K', change: '+14.2%' },
            comments: { organic: '28.1K', paid: '12.4K', total: '40.5K', change: '+18.7%' },
            shares: { organic: '15.2K', paid: '8.9K', total: '24.1K', change: '+22.3%' },
            postLinkClicks: { organic: '32.1K', paid: '13.1K', total: '45.2K', change: '+18.9%' },
            otherClicks: { organic: '8.7K', paid: '3.2K', total: '11.9K', change: '+12.5%' },
        },
        metrics: {
            impressions: { value: '2.4M', change: '+12.5%', isPositive: true },
            organicImpressions: { value: '1.8M', change: '+8.3%', isPositive: true },
            paidImpressions: { value: '600K', change: '+24.7%', isPositive: true },
            engagementRate: { value: '4.1%', change: '+0.3%', isPositive: true },
            organicEngagementRate: { value: '5.2%', change: '+0.5%', isPositive: true },
            paidEngagementRate: { value: '2.8%', change: '+0.1%', isPositive: true },
            postLinkClicks: { value: '45.2K', change: '+18.9%', isPositive: true },
            organicPostLinkClicks: { value: '32.1K', change: '+15.2%', isPositive: true },
            paidPostLinkClicks: { value: '13.1K', change: '+28.4%', isPositive: true },
            engagements: { value: '218.3K', change: '+16.8%', isPositive: true },
            organicEngagements: { value: '156.4K', change: '+13.2%', isPositive: true },
            paidEngagements: { value: '61.9K', change: '+25.1%', isPositive: true },
            uncategorizedEngagements: { value: '0', change: '0%', isPositive: true },
        },
        color: '#1877F2'
    },
    Instagram: {
        engagement: [
            { month: 'Jan', reactions: 2200, comments: 180, shares: 320, postLinkClicks: 280, otherClicks: 150 },
            { month: 'Feb', reactions: 2450, comments: 220, shares: 380, postLinkClicks: 320, otherClicks: 180 },
            { month: 'Mar', reactions: 2100, comments: 160, shares: 290, postLinkClicks: 250, otherClicks: 140 },
            { month: 'Apr', reactions: 2650, comments: 240, shares: 420, postLinkClicks: 380, otherClicks: 200 },
            { month: 'May', reactions: 2800, comments: 280, shares: 450, postLinkClicks: 420, otherClicks: 220 },
            { month: 'Jun', reactions: 3100, comments: 320, shares: 520, postLinkClicks: 480, otherClicks: 250 },
        ],
        demographics: [
            { age: '18-24', percentage: 45 },
            { age: '25-34', percentage: 30 },
            { age: '35-44', percentage: 20 },
            { age: '45+', percentage: 5 },
        ],
        engagementMetrics: {
            reactions: { organic: '118.2K', paid: '38.6K', total: '156.8K', change: '+26.7%' },
            comments: { organic: '14.8K', paid: '6.2K', total: '21.0K', change: '+31.2%' },
            shares: { organic: '22.4K', paid: '9.8K', total: '32.2K', change: '+28.9%' },
            postLinkClicks: { organic: '21.4K', paid: '7.3K', total: '28.7K', change: '+31.2%' },
            otherClicks: { organic: '12.1K', paid: '4.5K', total: '16.6K', change: '+24.8%' },
        },
        metrics: {
            impressions: { value: '3.2M', change: '+18.4%', isPositive: true },
            organicImpressions: { value: '2.1M', change: '+12.7%', isPositive: true },
            paidImpressions: { value: '1.1M', change: '+31.2%', isPositive: true },
            engagementRate: { value: '7.3%', change: '+1.2%', isPositive: true },
            organicEngagementRate: { value: '8.9%', change: '+1.8%', isPositive: true },
            paidEngagementRate: { value: '4.2%', change: '+0.3%', isPositive: true },
            postLinkClicks: { value: '28.7K', change: '+31.2%', isPositive: true },
            organicPostLinkClicks: { value: '21.4K', change: '+28.9%', isPositive: true },
            paidPostLinkClicks: { value: '7.3K', change: '+36.8%', isPositive: true },
            engagements: { value: '255.3K', change: '+28.1%', isPositive: true },
            organicEngagements: { value: '178.9K', change: '+24.6%', isPositive: true },
            paidEngagements: { value: '76.4K', change: '+35.7%', isPositive: true },
            uncategorizedEngagements: { value: '0', change: '0%', isPositive: true },
        },
        color: '#E4405F'
    },
    LinkedIn: {
        engagement: [
            { month: 'Jan', reactions: 450, comments: 120, shares: 80, postLinkClicks: 180, otherClicks: 60 },
            { month: 'Feb', reactions: 520, comments: 140, shares: 95, postLinkClicks: 210, otherClicks: 70 },
            { month: 'Mar', reactions: 480, comments: 110, shares: 70, postLinkClicks: 190, otherClicks: 55 },
            { month: 'Apr', reactions: 580, comments: 160, shares: 110, postLinkClicks: 240, otherClicks: 80 },
            { month: 'May', reactions: 620, comments: 180, shares: 125, postLinkClicks: 260, otherClicks: 90 },
            { month: 'Jun', reactions: 680, comments: 200, shares: 140, postLinkClicks: 290, otherClicks: 100 },
        ],
        demographics: [
            { age: '18-24', percentage: 15 },
            { age: '25-34', percentage: 40 },
            { age: '35-44', percentage: 35 },
            { age: '45+', percentage: 10 },
        ],
        engagementMetrics: {
            reactions: { organic: '23.1K', paid: '5.8K', total: '28.9K', change: '+17.5%' },
            comments: { organic: '8.4K', paid: '2.1K', total: '10.5K', change: '+19.7%' },
            shares: { organic: '6.2K', paid: '1.8K', total: '8.0K', change: '+22.1%' },
            postLinkClicks: { organic: '9.8K', paid: '2.6K', total: '12.4K', change: '+19.7%' },
            otherClicks: { organic: '4.2K', paid: '1.1K', total: '5.3K', change: '+15.3%' },
        },
        metrics: {
            impressions: { value: '890K', change: '+9.2%', isPositive: true },
            organicImpressions: { value: '645K', change: '+6.8%', isPositive: true },
            paidImpressions: { value: '245K', change: '+15.7%', isPositive: true },
            engagementRate: { value: '7.3%', change: '+1.1%', isPositive: true },
            organicEngagementRate: { value: '8.1%', change: '+1.4%', isPositive: true },
            paidEngagementRate: { value: '5.2%', change: '+0.6%', isPositive: true },
            postLinkClicks: { value: '12.4K', change: '+19.7%', isPositive: true },
            organicPostLinkClicks: { value: '9.8K', change: '+17.3%', isPositive: true },
            paidPostLinkClicks: { value: '2.6K', change: '+26.8%', isPositive: true },
            engagements: { value: '64.8K', change: '+18.9%', isPositive: true },
            organicEngagements: { value: '51.7K', change: '+16.2%', isPositive: true },
            paidEngagements: { value: '13.1K', change: '+27.4%', isPositive: true },
            uncategorizedEngagements: { value: '0', change: '0%', isPositive: true },
        },
        color: '#0A66C2'
    },
    TikTok: {
        engagement: [
            { month: 'Jan', reactions: 3200, comments: 850, shares: 420, postLinkClicks: 680, otherClicks: 280 },
            { month: 'Feb', reactions: 3800, comments: 920, shares: 480, postLinkClicks: 780, otherClicks: 320 },
            { month: 'Mar', reactions: 3500, comments: 780, shares: 390, postLinkClicks: 720, otherClicks: 290 },
            { month: 'Apr', reactions: 4200, comments: 1100, shares: 550, postLinkClicks: 890, otherClicks: 380 },
            { month: 'May', reactions: 4600, comments: 1250, shares: 620, postLinkClicks: 980, otherClicks: 420 },
            { month: 'Jun', reactions: 5100, comments: 1400, shares: 720, postLinkClicks: 1120, otherClicks: 480 },
        ],
        demographics: [
            { age: '18-24', percentage: 60 },
            { age: '25-34', percentage: 25 },
            { age: '35-44', percentage: 12 },
            { age: '45+', percentage: 3 },
        ],
        engagementMetrics: {
            reactions: { organic: '681K', paid: '43K', total: '724K', change: '+48.9%' },
            comments: { organic: '92.4K', paid: '18.6K', total: '111.0K', change: '+52.1%' },
            shares: { organic: '48.2K', paid: '12.8K', total: '61.0K', change: '+55.3%' },
            postLinkClicks: { organic: '78.9K', paid: '10.4K', total: '89.3K', change: '+52.1%' },
            otherClicks: { organic: '28.4K', paid: '6.2K', total: '34.6K', change: '+47.8%' },
        },
        metrics: {
            impressions: { value: '8.7M', change: '+42.3%', isPositive: true },
            organicImpressions: { value: '7.9M', change: '+45.1%', isPositive: true },
            paidImpressions: { value: '800K', change: '+28.6%', isPositive: true },
            engagementRate: { value: '11.6%', change: '+2.8%', isPositive: true },
            organicEngagementRate: { value: '12.4%', change: '+3.2%', isPositive: true },
            paidEngagementRate: { value: '6.8%', change: '+1.1%', isPositive: true },
            postLinkClicks: { value: '89.3K', change: '+52.1%', isPositive: true },
            organicPostLinkClicks: { value: '78.9K', change: '+54.7%', isPositive: true },
            paidPostLinkClicks: { value: '10.4K', change: '+38.2%', isPositive: true },
            engagements: { value: '1.02M', change: '+51.2%', isPositive: true },
            organicEngagements: { value: '928K', change: '+53.8%', isPositive: true },
            paidEngagements: { value: '91K', change: '+35.4%', isPositive: true },
            uncategorizedEngagements: { value: '1.2K', change: '+15.3%', isPositive: true },
        },
        color: '#000000'
    },
    YouTube: {
        engagement: [
            { month: 'Jan', reactions: 890, comments: 240, shares: 150, postLinkClicks: 320, otherClicks: 180 },
            { month: 'Feb', reactions: 1020, comments: 280, shares: 180, postLinkClicks: 380, otherClicks: 210 },
            { month: 'Mar', reactions: 950, comments: 220, shares: 140, postLinkClicks: 340, otherClicks: 190 },
            { month: 'Apr', reactions: 1150, comments: 320, shares: 200, postLinkClicks: 420, otherClicks: 240 },
            { month: 'May', reactions: 1280, comments: 360, shares: 230, postLinkClicks: 480, otherClicks: 270 },
            { month: 'Jun', reactions: 1420, comments: 400, shares: 260, postLinkClicks: 540, otherClicks: 300 },
        ],
        demographics: [
            { age: '18-24', percentage: 35 },
            { age: '25-34', percentage: 30 },
            { age: '35-44', percentage: 25 },
            { age: '45+', percentage: 10 },
        ],
        engagementMetrics: {
            reactions: { organic: '118.7K', paid: '29.5K', total: '148.2K', change: '+22.1%' },
            comments: { organic: '21.8K', paid: '8.2K', total: '30.0K', change: '+24.3%' },
            shares: { organic: '14.2K', paid: '5.8K', total: '20.0K', change: '+26.7%' },
            postLinkClicks: { organic: '26.8K', paid: '7.9K', total: '34.7K', change: '+24.3%' },
            otherClicks: { organic: '16.4K', paid: '4.8K', total: '21.2K', change: '+20.8%' },
        },
        metrics: {
            impressions: { value: '1.8M', change: '+16.7%', isPositive: true },
            organicImpressions: { value: '1.3M', change: '+14.2%', isPositive: true },
            paidImpressions: { value: '500K', change: '+23.8%', isPositive: true },
            engagementRate: { value: '14.1%', change: '+1.9%', isPositive: true },
            organicEngagementRate: { value: '15.8%', change: '+2.3%', isPositive: true },
            paidEngagementRate: { value: '9.2%', change: '+0.8%', isPositive: true },
            postLinkClicks: { value: '34.7K', change: '+24.3%', isPositive: true },
            organicPostLinkClicks: { value: '26.8K', change: '+22.1%', isPositive: true },
            paidPostLinkClicks: { value: '7.9K', change: '+31.4%', isPositive: true },
            engagements: { value: '254.1K', change: '+23.6%', isPositive: true },
            organicEngagements: { value: '197.9K', change: '+21.8%', isPositive: true },
            paidEngagements: { value: '56.2K', change: '+29.1%', isPositive: true },
            uncategorizedEngagements: { value: '0', change: '0%', isPositive: true },
        },
        color: '#FF0000'
    },
    X: {
        engagement: [
            { month: 'Jan', reactions: 520, comments: 180, shares: 95, postLinkClicks: 140, otherClicks: 80 },
            { month: 'Feb', reactions: 580, comments: 220, shares: 110, postLinkClicks: 160, otherClicks: 90 },
            { month: 'Mar', reactions: 490, comments: 160, shares: 85, postLinkClicks: 130, otherClicks: 70 },
            { month: 'Apr', reactions: 640, comments: 240, shares: 125, postLinkClicks: 180, otherClicks: 100 },
            { month: 'May', reactions: 720, comments: 280, shares: 140, postLinkClicks: 200, otherClicks: 110 },
            { month: 'Jun', reactions: 780, comments: 320, shares: 160, postLinkClicks: 220, otherClicks: 120 },
        ],
        demographics: [
            { age: '18-24', percentage: 30 },
            { age: '25-34', percentage: 35 },
            { age: '35-44', percentage: 25 },
            { age: '45+', percentage: 10 },
        ],
        engagementMetrics: {
            reactions: { organic: '28.7K', paid: '10.5K', total: '39.2K', change: '+8.9%' },
            comments: { organic: '14.2K', paid: '4.8K', total: '19.0K', change: '+9.8%' },
            shares: { organic: '8.9K', paid: '3.1K', total: '12.0K', change: '+11.2%' },
            postLinkClicks: { organic: '11.2K', paid: '4.4K', total: '15.6K', change: '+9.8%' },
            otherClicks: { organic: '6.8K', paid: '2.2K', total: '9.0K', change: '+7.4%' },
        },
        metrics: {
            impressions: { value: '1.2M', change: '+5.8%', isPositive: true },
            organicImpressions: { value: '890K', change: '+4.2%', isPositive: true },
            paidImpressions: { value: '310K', change: '+9.7%', isPositive: true },
            engagementRate: { value: '7.9%', change: '+0.4%', isPositive: true },
            organicEngagementRate: { value: '8.7%', change: '+0.6%', isPositive: true },
            paidEngagementRate: { value: '6.1%', change: '+0.1%', isPositive: true },
            postLinkClicks: { value: '15.6K', change: '+9.8%', isPositive: true },
            organicPostLinkClicks: { value: '11.2K', change: '+8.4%', isPositive: true },
            paidPostLinkClicks: { value: '4.4K', change: '+13.2%', isPositive: true },
            engagements: { value: '94.8K', change: '+9.1%', isPositive: true },
            organicEngagements: { value: '69.8K', change: '+7.8%', isPositive: true },
            paidEngagements: { value: '25.0K', change: '+12.6%', isPositive: true },
            uncategorizedEngagements: { value: '0', change: '0%', isPositive: true },
        },
        color: '#000000'
    },
};

// Website analytics data
const websiteMetrics = {
    pageviews: { value: '47,291', change: '+12.5%', isPositive: true },
    activeUsers: { value: '3,247', change: '+8.3%', isPositive: true },
    keyActivities: { value: '1,892', change: '-2.1%', isPositive: false },
    totalEvents: { value: '28,456', change: '+15.7%', isPositive: true },
};

const trafficData = [
    { day: 'Mon', current: 3200, previous: 2800 },
    { day: 'Tue', current: 3800, previous: 3200 },
    { day: 'Wed', current: 4200, previous: 3600 },
    { day: 'Thu', current: 3900, previous: 3400 },
    { day: 'Fri', current: 4500, previous: 4100 },
    { day: 'Sat', current: 3600, previous: 3200 },
    { day: 'Sun', current: 3100, previous: 2900 },
];

const realTimeUsers = {
    activeUsers: 127,
    countries: [
        { country: 'United States', users: 45, percentage: 35.4 },
        { country: 'United Kingdom', users: 23, percentage: 18.1 },
        { country: 'Canada', users: 18, percentage: 14.2 },
        { country: 'Australia', users: 15, percentage: 11.8 },
        { country: 'Germany', users: 12, percentage: 9.4 },
        { country: 'France', users: 8, percentage: 6.3 },
        { country: 'Others', users: 6, percentage: 4.7 },
    ],
};

// User journey data
const userJourneyData = {
    sessionStart: {
        name: 'session_start',
        count: 3247,
        branches: [
            {
                name: 'Homepage',
                count: 1965,
                percentage: 60.5,
                events: [
                    { name: 'scroll', count: 1580, percentage: 80.4 },
                    { name: 'click', count: 1245, percentage: 63.4 },
                    { name: 'form_start', count: 392, percentage: 20.0 },
                    { name: 'generate_lead', count: 118, percentage: 6.0 }
                ]
            },
            {
                name: 'Pricing',
                count: 845,
                percentage: 26.0,
                events: [
                    { name: 'scroll', count: 720, percentage: 85.2 },
                    { name: 'click', count: 634, percentage: 75.0 },
                    { name: 'form_start', count: 253, percentage: 30.0 },
                    { name: 'generate_lead', count: 152, percentage: 18.0 }
                ]
            },
            {
                name: 'Schedule Tour',
                count: 437,
                percentage: 13.5,
                events: [
                    { name: 'scroll', count: 350, percentage: 80.1 },
                    { name: 'click', count: 306, percentage: 70.0 },
                    { name: 'form_start', count: 262, percentage: 60.0 },
                    { name: 'generate_lead', count: 175, percentage: 40.0 }
                ]
            }
        ]
    }
};

// Email campaign data
const emailCampaigns = [
    {
        id: 'EDM-2024-001',
        title: 'Black Friday Sale - Up to 70% Off',
        sendDate: '2024-01-15',
        folder: 'Promotional',
        status: 'Sent',
        recipients: 15420,
        opens: { count: 8934, percentage: 57.9 },
        clicks: { count: 2156, percentage: 14.0 },
        unsubscribed: { count: 23, percentage: 0.1 }
    },
    {
        id: 'EDM-2024-002',
        title: 'New Product Launch - Smart Home Collection',
        sendDate: '2024-01-12',
        folder: 'Product Launch',
        status: 'Sent',
        recipients: 12850,
        opens: { count: 7321, percentage: 57.0 },
        clicks: { count: 1542, percentage: 12.0 },
        unsubscribed: { count: 18, percentage: 0.1 }
    },
    {
        id: 'EDM-2024-003',
        title: 'Weekly Newsletter - Tech Trends & Tips',
        sendDate: '2024-01-10',
        folder: 'Newsletter',
        status: 'Sent',
        recipients: 8750,
        opens: { count: 4375, percentage: 50.0 },
        clicks: { count: 875, percentage: 10.0 },
        unsubscribed: { count: 12, percentage: 0.1 }
    },
    {
        id: 'EDM-2024-004',
        title: 'Customer Satisfaction Survey',
        sendDate: '2024-01-08',
        folder: 'Survey',
        status: 'Sent',
        recipients: 5200,
        opens: { count: 2912, percentage: 56.0 },
        clicks: { count: 1040, percentage: 20.0 },
        unsubscribed: { count: 8, percentage: 0.2 }
    },
    {
        id: 'EDM-2024-005',
        title: 'Exclusive Member Benefits Update',
        sendDate: '2024-01-05',
        folder: 'Membership',
        status: 'Sent',
        recipients: 3450,
        opens: { count: 2415, percentage: 70.0 },
        clicks: { count: 690, percentage: 20.0 },
        unsubscribed: { count: 5, percentage: 0.1 }
    },
    {
        id: 'EDM-2024-006',
        title: 'Holiday Season Recap & Thank You',
        sendDate: '2024-01-03',
        folder: 'Seasonal',
        status: 'Sent',
        recipients: 18900,
        opens: { count: 11340, percentage: 60.0 },
        clicks: { count: 1890, percentage: 10.0 },
        unsubscribed: { count: 28, percentage: 0.1 }
    }
];

// Paid ads campaign data
const paidAdsData = {
    Meta: [
        {
            campaignName: 'Black Friday Sale - Conversion Campaign',
            deliveryStatus: 'Active',
            bidStrategy: 'Lowest Cost',
            budget: '$150/day',
            attributionSetting: '7-day click, 1-day view',
            results: { type: 'Conversions', count: 342 },
            reach: 45200,
            impressions: 128500,
            costPerResult: '$4.38',
            amountSpent: '$1,498',
            endDate: '2024-01-31'
        },
        {
            campaignName: 'Brand Awareness - Smart Home Products',
            deliveryStatus: 'Active',
            bidStrategy: 'Cost Cap',
            budget: '$2,500 total',
            attributionSetting: '7-day click, 1-day view',
            results: { type: 'Reach', count: 89500 },
            reach: 89500,
            impressions: 245000,
            costPerResult: '$0.028',
            amountSpent: '$2,106',
            endDate: '2024-02-15'
        },
        {
            campaignName: 'Retargeting - Cart Abandoners',
            deliveryStatus: 'Paused',
            bidStrategy: 'Bid Cap',
            budget: '$75/day',
            attributionSetting: '1-day click, 1-day view',
            results: { type: 'Clicks', count: 1250 },
            reach: 12800,
            impressions: 34500,
            costPerResult: '$1.20',
            amountSpent: '$1,500',
            endDate: '2024-01-25'
        }
    ],
    'Google Ads': [
        {
            campaignName: 'Search - Smart Home Keywords',
            deliveryStatus: 'Active',
            bidStrategy: 'Target CPA',
            budget: '$200/day',
            attributionSetting: 'Last click',
            results: { type: 'Conversions', count: 156 },
            reach: 28400,
            impressions: 89200,
            costPerResult: '$12.82',
            amountSpent: '$2,000',
            endDate: '2024-02-28'
        },
        {
            campaignName: 'Shopping - Product Catalog',
            deliveryStatus: 'Active',
            bidStrategy: 'Maximize Clicks',
            budget: '$300/day',
            attributionSetting: 'Last click',
            results: { type: 'Clicks', count: 2840 },
            reach: 52100,
            impressions: 156000,
            costPerResult: '$1.76',
            amountSpent: '$5,002',
            endDate: '2024-03-15'
        },
        {
            campaignName: 'Display - Competitor Targeting',
            deliveryStatus: 'Ended',
            bidStrategy: 'Target ROAS',
            budget: '$1,200 total',
            attributionSetting: 'Data-driven',
            results: { type: 'Conversions', count: 89 },
            reach: 34500,
            impressions: 125000,
            costPerResult: '$13.48',
            amountSpent: '$1,200',
            endDate: '2024-01-20'
        }
    ],
    'LinkedIn Ads': [
        {
            campaignName: 'B2B Lead Generation - Tech Professionals',
            deliveryStatus: 'Active',
            bidStrategy: 'Maximum Delivery',
            budget: '$100/day',
            attributionSetting: 'Last touch',
            results: { type: 'Leads', count: 45 },
            reach: 8900,
            impressions: 23400,
            costPerResult: '$22.22',
            amountSpent: '$1,000',
            endDate: '2024-02-10'
        },
        {
            campaignName: 'Thought Leadership - Content Promotion',
            deliveryStatus: 'Active',
            bidStrategy: 'Cost Per Click',
            budget: '$50/day',
            attributionSetting: 'Last touch',
            results: { type: 'Clicks', count: 890 },
            reach: 15600,
            impressions: 45200,
            costPerResult: '$1.12',
            amountSpent: '$997',
            endDate: '2024-01-30'
        }
    ],
    'X Ads': [
        {
            campaignName: 'Product Launch - Tech Announcement',
            deliveryStatus: 'Active',
            bidStrategy: 'Automatic Bid',
            budget: '$80/day',
            attributionSetting: 'Last click',
            results: { type: 'Engagements', count: 3420 },
            reach: 28900,
            impressions: 89500,
            costPerResult: '$0.35',
            amountSpent: '$1,197',
            endDate: '2024-02-05'
        },
        {
            campaignName: 'Brand Awareness - Industry Hashtags',
            deliveryStatus: 'Paused',
            bidStrategy: 'Target Cost',
            budget: '$500 total',
            attributionSetting: 'Last click',
            results: { type: 'Impressions', count: 125000 },
            reach: 45600,
            impressions: 125000,
            costPerResult: '$0.004',
            amountSpent: '$500',
            endDate: '2024-01-28'
        }
    ]
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('social-media');
    const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
    const [selectedAdPlatform, setSelectedAdPlatform] = useState('Meta');
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        compareOption: 'Last Month'
    });

    // 使用真實數據 hooks
    const { data: socialMediaData, platforms, loading: socialLoading, error: socialError } = useSocialMediaData();
    const { 
        metrics: websiteMetrics, 
        realtimeUsers, 
        topPages, 
        trafficTrend, 
        loading: websiteLoading, 
        error: websiteError 
    } = useWebsiteData();
    const {
        campaigns: edmCampaigns,
        summary: edmSummary,
        folderStats: edmFolderStats,
        highPerformanceCampaigns: edmHighPerf,
        recentCampaigns: edmRecent,
        loading: edmLoading,
        error: edmError
    } = useEDMData();

    // 從真實資料中獲取可用平台
    const availablePlatforms = platforms.map(p => p.platform_name);
    
    // 確保選擇的平台存在於真實資料中
    useEffect(() => {
        if (availablePlatforms.length > 0 && !availablePlatforms.includes(selectedPlatform)) {
            setSelectedPlatform(availablePlatforms[0]);
        }
    }, [availablePlatforms, selectedPlatform]);

    // 獲取當前平台的顏色
    const getCurrentPlatformColor = () => {
        const platform = platforms.find(p => p.platform_name === selectedPlatform);
        return platform?.platform_color || '#000000';
    };

    const currentPlatformData = platformData[selectedPlatform as keyof typeof platformData];
    const currentAdCampaigns = paidAdsData[selectedAdPlatform as keyof typeof paidAdsData];

    const handleDateRangeChange = (newRange: DateRange) => {
        setDateRange(newRange);
        // Here you would typically trigger data refetch based on the new date range
        console.log('Date range changed:', newRange);
    };

    const MetricCard = ({ label, value, change, isPositive }: { label: string; value: string; change: string; isPositive: boolean }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">{label}</h4>
                <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {change}
                </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
    );

    // 加載狀態組件
    const LoadingCard = () => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
        </div>
    );

    // 錯誤狀態組件
    const ErrorCard = ({ message }: { message: string }) => (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 text-sm">{message}</div>
        </div>
    );

    // 處理真實社交媒體數據
    const getRealSocialMediaMetrics = () => {
        if (!socialMediaData || socialMediaData.length === 0) {
            return null;
        }

        // 按平台分組數據 - 使用新的資料結構
        const platformMetrics = socialMediaData.reduce((acc, item) => {
            const platformName = item.platform_name || 'Unknown';
            if (!acc[platformName]) {
                acc[platformName] = [];
            }
            acc[platformName].push(item);
            return acc;
        }, {} as Record<string, typeof socialMediaData>);

        // 獲取當前選擇平台的最新數據
        const currentData = platformMetrics[selectedPlatform];
        if (!currentData || currentData.length === 0) {
            return null;
        }

        const latest = currentData[0]; // 最新數據
        const previous = currentData[1]; // 前一天數據

        const calculateChange = (current: number, prev: number) => {
            if (!prev) return '+0%';
            const change = ((current - prev) / prev) * 100;
            return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
        };

        return {
            impressions: {
                value: latest.impressions?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.impressions || 0, previous.impressions || 0) : '+0%',
                isPositive: !previous || (latest.impressions || 0) >= (previous.impressions || 0)
            },
            organicImpressions: {
                value: latest.organic_impressions?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.organic_impressions || 0, previous.organic_impressions || 0) : '+0%',
                isPositive: !previous || (latest.organic_impressions || 0) >= (previous.organic_impressions || 0)
            },
            engagements: {
                value: latest.engagements?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.engagements || 0, previous.engagements || 0) : '+0%',
                isPositive: !previous || (latest.engagements || 0) >= (previous.engagements || 0)
            },
            engagementRate: {
                value: `${parseFloat(latest.engagement_rate || '0').toFixed(2)}%`,
                change: previous ? calculateChange(parseFloat(latest.engagement_rate || '0'), parseFloat(previous.engagement_rate || '0')) : '+0%',
                isPositive: !previous || parseFloat(latest.engagement_rate || '0') >= parseFloat(previous.engagement_rate || '0')
            },
            followers: {
                value: latest.followers?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.followers || 0, previous.followers || 0) : '+0%',
                isPositive: !previous || (latest.followers || 0) >= (previous.followers || 0)
            }
        };
    };

    const realSocialMetrics = getRealSocialMediaMetrics();

    // 處理真實網站數據
    const getRealWebsiteMetrics = () => {
        if (!websiteMetrics || websiteMetrics.length === 0) {
            return {
                pageviews: { value: '0', change: '+0%', isPositive: true },
                activeUsers: { value: '0', change: '+0%', isPositive: true },
                keyActivities: { value: '0', change: '+0%', isPositive: true },
                totalEvents: { value: '0', change: '+0%', isPositive: true }
            };
        }

        const latest = websiteMetrics[0]; // 最新數據
        const previous = websiteMetrics[1]; // 前一天數據

        const calculateChange = (current: number, prev: number) => {
            if (!prev) return '+0%';
            const change = ((current - prev) / prev) * 100;
            return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
        };

        return {
            pageviews: {
                value: latest.page_views?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.page_views || 0, previous.page_views || 0) : '+0%',
                isPositive: !previous || (latest.page_views || 0) >= (previous.page_views || 0)
            },
            activeUsers: {
                value: latest.active_users?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.active_users || 0, previous.active_users || 0) : '+0%',
                isPositive: !previous || (latest.active_users || 0) >= (previous.active_users || 0)
            },
            keyActivities: {
                value: latest.key_events?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.key_events || 0, previous.key_events || 0) : '+0%',
                isPositive: !previous || (latest.key_events || 0) >= (previous.key_events || 0)
            },
            totalEvents: {
                value: latest.total_events?.toLocaleString() || '0',
                change: previous ? calculateChange(latest.total_events || 0, previous.total_events || 0) : '+0%',
                isPositive: !previous || (latest.total_events || 0) >= (previous.total_events || 0)
            }
        };
    };

    const realWebsiteMetrics = getRealWebsiteMetrics();

    // 處理真實流量趨勢資料
    const getRealTrafficData = () => {
        if (!trafficTrend || trafficTrend.length === 0) {
            return [];
        }

        // 取最近7天的資料
        const recentData = trafficTrend.slice(0, 7).reverse(); // 反轉以獲得正確的時間順序
        
        return recentData.map((item, index) => {
            const date = new Date(item.date);
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            return {
                day: dayNames[date.getDay()],
                current: item.page_views,
                previous: index < recentData.length - 1 ? recentData[index + 1]?.page_views || 0 : 0
            };
        });
    };

    const realTrafficData = getRealTrafficData();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Dashboard</h1>
                            <p className="text-gray-600">Track your marketing performance across all channels</p>
                        </div>
                        <DateRangePicker
                            dateRange={dateRange}
                            onDateRangeChange={handleDateRangeChange}
                        />
                    </div>
                </div>

                {/* Platform Performance Section - Moved to Top */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Performance</h2>

                    {/* Tabs moved to the very top */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="social-media" className="text-sm font-medium">Social Media</TabsTrigger>
                            <TabsTrigger value="website" className="text-sm font-medium">Website</TabsTrigger>
                            <TabsTrigger value="edm" className="text-sm font-medium">EDM</TabsTrigger>
                            <TabsTrigger value="paid-ads" className="text-sm font-medium">Paid Ads</TabsTrigger>
                        </TabsList>

                        <TabsContent value="social-media" className="space-y-6">
                            {/* Platform Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Select Platform</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                    {availablePlatforms.map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => setSelectedPlatform(platform)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedPlatform === platform
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Platform Header */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                    style={{ backgroundColor: getCurrentPlatformColor() }}
                                >
                                    {selectedPlatform[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{selectedPlatform} Engagement Analytics</h3>
                                    <p className="text-gray-600">Engagement trends and performance metrics for {selectedPlatform}</p>
                                </div>
                            </div>

                            {/* New Metrics Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Key Performance Metrics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {socialLoading ? (
                                        <>
                                            <LoadingCard />
                                            <LoadingCard />
                                            <LoadingCard />
                                            <LoadingCard />
                                            <LoadingCard />
                                            <LoadingCard />
                                        </>
                                    ) : socialError ? (
                                        <div className="col-span-3">
                                            <ErrorCard message={socialError} />
                                        </div>
                                    ) : realSocialMetrics ? (
                                        <>
                                            <MetricCard
                                                label="Impressions"
                                                value={realSocialMetrics.impressions.value}
                                                change={realSocialMetrics.impressions.change}
                                                isPositive={realSocialMetrics.impressions.isPositive}
                                            />
                                            <MetricCard
                                                label="Organic Impressions"
                                                value={realSocialMetrics.organicImpressions.value}
                                                change={realSocialMetrics.organicImpressions.change}
                                                isPositive={realSocialMetrics.organicImpressions.isPositive}
                                            />
                                            <MetricCard
                                                label="Engagement Rate"
                                                value={realSocialMetrics.engagementRate.value}
                                                change={realSocialMetrics.engagementRate.change}
                                                isPositive={realSocialMetrics.engagementRate.isPositive}
                                            />
                                            <MetricCard
                                                label="Followers"
                                                value={realSocialMetrics.followers.value}
                                                change={realSocialMetrics.followers.change}
                                                isPositive={realSocialMetrics.followers.isPositive}
                                            />
                                            <MetricCard
                                                label="Engagements"
                                                value={realSocialMetrics.engagements.value}
                                                change={realSocialMetrics.engagements.change}
                                                isPositive={realSocialMetrics.engagements.isPositive}
                                            />
                                        </>
                                    ) : (
                                        <div className="col-span-3">
                                            <div className="text-center text-gray-500 py-8">
                                                No data available for {selectedPlatform}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Engagement Line Chart */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Trends</h3>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={currentPlatformData.engagement}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="month" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="reactions"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                            name="Reactions"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="comments"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                            name="Comments"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="shares"
                                            stroke="#f59e0b"
                                            strokeWidth={3}
                                            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                                            name="Shares"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="postLinkClicks"
                                            stroke="#ef4444"
                                            strokeWidth={3}
                                            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                            name="Post Link Clicks"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="otherClicks"
                                            stroke="#8b5cf6"
                                            strokeWidth={3}
                                            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                                            name="Other Clicks"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Engagement Metrics Table */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Engagement Metrics</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Metric
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Organic
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Paid
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    % Change
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Reactions
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.reactions.organic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.reactions.paid}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {currentPlatformData.engagementMetrics.reactions.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {currentPlatformData.engagementMetrics.reactions.change}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Comments
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.comments.organic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.comments.paid}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {currentPlatformData.engagementMetrics.comments.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {currentPlatformData.engagementMetrics.comments.change}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Shares
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.shares.organic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.shares.paid}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {currentPlatformData.engagementMetrics.shares.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {currentPlatformData.engagementMetrics.shares.change}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Post Link Clicks
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.postLinkClicks.organic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.postLinkClicks.paid}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {currentPlatformData.engagementMetrics.postLinkClicks.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {currentPlatformData.engagementMetrics.postLinkClicks.change}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Other Clicks
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.otherClicks.organic}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {currentPlatformData.engagementMetrics.otherClicks.paid}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {currentPlatformData.engagementMetrics.otherClicks.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                    {currentPlatformData.engagementMetrics.otherClicks.change}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="website" className="space-y-6">
                            {/* Website Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {websiteLoading ? (
                                    <>
                                        <LoadingCard />
                                        <LoadingCard />
                                        <LoadingCard />
                                        <LoadingCard />
                                    </>
                                ) : websiteError ? (
                                    <div className="col-span-4">
                                        <ErrorCard message={websiteError} />
                                    </div>
                                ) : (
                                    <>
                                        <MetricCard
                                            label="Pageviews"
                                            value={realWebsiteMetrics.pageviews.value}
                                            change={realWebsiteMetrics.pageviews.change}
                                            isPositive={realWebsiteMetrics.pageviews.isPositive}
                                        />
                                        <MetricCard
                                            label="Active Users"
                                            value={realWebsiteMetrics.activeUsers.value}
                                            change={realWebsiteMetrics.activeUsers.change}
                                            isPositive={realWebsiteMetrics.activeUsers.isPositive}
                                        />
                                        <MetricCard
                                            label="Key Activities"
                                            value={realWebsiteMetrics.keyActivities.value}
                                            change={realWebsiteMetrics.keyActivities.change}
                                            isPositive={realWebsiteMetrics.keyActivities.isPositive}
                                        />
                                        <MetricCard
                                            label="Total Events"
                                            value={realWebsiteMetrics.totalEvents.value}
                                            change={realWebsiteMetrics.totalEvents.change}
                                            isPositive={realWebsiteMetrics.totalEvents.isPositive}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Traffic Comparison Chart */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">7-Day Traffic Comparison</h3>
                                <div className="flex items-center space-x-6 mb-4">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-gray-600">Current Period</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                                        <span className="text-sm text-gray-600">Previous Period</span>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={realTrafficData.length > 0 ? realTrafficData : trafficData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="day" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="current"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                            name="Current Period"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="previous"
                                            stroke="#9ca3af"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            dot={{ fill: '#9ca3af', strokeWidth: 2, r: 3 }}
                                            name="Previous Period"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Top Pages Panel */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Top Pages</h3>
                                <div className="space-y-4">
                                    {topPages && topPages.length > 0 ? (
                                        topPages.slice(0, 5).map((page, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{page.page_path}</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${parseFloat(page.percentage || '0')}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="ml-4 text-right">
                                                    <p className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">{parseFloat(page.percentage || '0').toFixed(1)}%</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500 py-4">
                                            No page data available
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Real-time Users Panel */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Real-time Users</h3>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                        <span className="text-sm text-gray-600">Live</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{realtimeUsers?.total_users || 0}</div>
                                    <div className="text-sm text-gray-600">Active users in the past 30 minutes</div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-4">Users by Country</h4>
                                    <div className="space-y-3">
                                        {realtimeUsers?.by_country && Array.isArray(realtimeUsers.by_country) ? 
                                            realtimeUsers.by_country.map((country: any, index: number) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center flex-1">
                                                        <span className="text-sm text-gray-700 w-24 truncate">{country.country || 'Unknown'}</span>
                                                        <div className="flex-1 mx-3">
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                                    style={{ width: `${country.percentage || 0}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-gray-500 w-8 text-right">{country.users || 0}</span>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center text-gray-500 py-4">
                                                    No country data available
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* User Journey Path Visualization */}
                            <UserJourneyVisualization />
                        </TabsContent>

                        <TabsContent value="edm" className="space-y-6">
                            {/* EDM Summary Cards */}
                            {edmSummary && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <MetricCard
                                        label="Total Campaigns"
                                        value={edmSummary.total_campaigns?.toLocaleString() || '0'}
                                        change="+0%"
                                        isPositive={true}
                                    />
                                    <MetricCard
                                        label="Total Recipients"
                                        value={edmSummary.total_recipients?.toLocaleString() || '0'}
                                        change="+0%"
                                        isPositive={true}
                                    />
                                    <MetricCard
                                        label="Avg Open Rate"
                                        value={`${parseFloat(edmSummary.avg_open_rate || '0').toFixed(1)}%`}
                                        change="+0%"
                                        isPositive={true}
                                    />
                                    <MetricCard
                                        label="Avg Click Rate"
                                        value={`${parseFloat(edmSummary.avg_click_rate || '0').toFixed(1)}%`}
                                        change="+0%"
                                        isPositive={true}
                                    />
                                </div>
                            )}

                            {/* Folder Performance */}
                            {edmFolderStats && edmFolderStats.length > 0 && (
                                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Performance by Folder</h3>
                                    <div className="space-y-4">
                                        {edmFolderStats.slice(0, 5).map((folder, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-gray-900">{folder.folder || 'Default'}</span>
                                                        <span className="text-sm text-gray-500">{folder.campaign_count} campaigns</span>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Recipients: </span>
                                                            <span className="font-medium">{folder.total_recipients?.toLocaleString() || '0'}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Open Rate: </span>
                                                            <span className="font-medium text-blue-600">{parseFloat(folder.avg_open_rate || '0').toFixed(1)}%</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Click Rate: </span>
                                                            <span className="font-medium text-green-600">{parseFloat(folder.avg_click_rate || '0').toFixed(1)}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recent Campaigns */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Recent Campaigns</h3>
                                    <div className="text-sm text-gray-500">
                                        {edmLoading ? 'Loading...' : `${edmRecent.length} campaigns`}
                                    </div>
                                </div>

                                {edmLoading ? (
                                    <div className="space-y-4">
                                        <LoadingCard />
                                        <LoadingCard />
                                        <LoadingCard />
                                    </div>
                                ) : edmError ? (
                                    <ErrorCard message={edmError} />
                                ) : edmRecent && edmRecent.length > 0 ? (
                                    <div className="space-y-4">
                                        {edmRecent.map((campaign, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                                {/* Campaign Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <Mail className="w-5 h-5 text-blue-500" />
                                                            <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                                                        </div>
                                                        {campaign.subject && (
                                                            <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                                                        )}
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span>ID: {campaign.campaign_id}</span>
                                                            <span>•</span>
                                                            <span>Sent: {new Date(campaign.send_date).toLocaleDateString()}</span>
                                                            <span>•</span>
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                                {campaign.folder || 'Default'}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                                campaign.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                                {campaign.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Metrics Grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {/* Recipients */}
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center mb-2">
                                                            <Users className="w-4 h-4 text-gray-500 mr-2" />
                                                            <span className="text-sm font-medium text-gray-600">Recipients</span>
                                                        </div>
                                                        <div className="text-xl font-bold text-gray-900">
                                                            {campaign.recipients?.toLocaleString() || '0'}
                                                        </div>
                                                    </div>

                                                    {/* Opens */}
                                                    <div className="bg-blue-50 rounded-lg p-3">
                                                        <div className="flex items-center mb-2">
                                                            <Mail className="w-4 h-4 text-blue-500 mr-2" />
                                                            <span className="text-sm font-medium text-gray-600">Opens</span>
                                                        </div>
                                                        <div className="text-xl font-bold text-gray-900">
                                                            {campaign.opens?.toLocaleString() || '0'}
                                                        </div>
                                                        <div className="text-sm text-blue-600 font-medium">
                                                            {parseFloat(campaign.open_rate || '0').toFixed(1)}%
                                                        </div>
                                                    </div>

                                                    {/* Clicks */}
                                                    <div className="bg-green-50 rounded-lg p-3">
                                                        <div className="flex items-center mb-2">
                                                            <MousePointer className="w-4 h-4 text-green-500 mr-2" />
                                                            <span className="text-sm font-medium text-gray-600">Clicks</span>
                                                        </div>
                                                        <div className="text-xl font-bold text-gray-900">
                                                            {campaign.clicks?.toLocaleString() || '0'}
                                                        </div>
                                                        <div className="text-sm text-green-600 font-medium">
                                                            {parseFloat(campaign.click_rate || '0').toFixed(1)}%
                                                        </div>
                                                    </div>

                                                    {/* Unsubscribed */}
                                                    <div className="bg-red-50 rounded-lg p-3">
                                                        <div className="flex items-center mb-2">
                                                            <UserMinus className="w-4 h-4 text-red-500 mr-2" />
                                                            <span className="text-sm font-medium text-gray-600">Unsubscribed</span>
                                                        </div>
                                                        <div className="text-xl font-bold text-gray-900">
                                                            {campaign.unsubscriptions?.toLocaleString() || '0'}
                                                        </div>
                                                        <div className="text-sm text-red-600 font-medium">
                                                            {parseFloat(campaign.unsubscribe_rate || '0').toFixed(1)}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No campaigns available
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="paid-ads" className="space-y-6">
                            {/* Ad Platform Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Select Ad Platform</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {Object.keys(paidAdsData).map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => setSelectedAdPlatform(platform)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedAdPlatform === platform
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Platform Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{selectedAdPlatform} Ad Campaigns</h3>
                                    <p className="text-gray-600">Campaign performance and metrics for {selectedAdPlatform}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {currentAdCampaigns.length} campaigns
                                </div>
                            </div>

                            {/* Campaign Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {currentAdCampaigns.map((campaign, index) => (
                                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                                        {/* Campaign Header */}
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{campaign.campaignName}</h4>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.deliveryStatus === 'Active' ? 'bg-green-100 text-green-700' :
                                                    campaign.deliveryStatus === 'Paused' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {campaign.deliveryStatus}
                                                </span>
                                                <span className="text-sm text-gray-500">•</span>
                                                <span className="text-sm text-gray-600">Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Campaign Metrics */}
                                        <div className="space-y-3">
                                            {/* Bid Strategy & Budget */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bid Strategy</div>
                                                    <div className="text-sm font-medium text-gray-900">{campaign.bidStrategy}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Budget</div>
                                                    <div className="text-sm font-medium text-gray-900">{campaign.budget}</div>
                                                </div>
                                            </div>

                                            {/* Attribution Setting */}
                                            <div>
                                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Attribution</div>
                                                <div className="text-sm font-medium text-gray-900">{campaign.attributionSetting}</div>
                                            </div>

                                            {/* Results */}
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">{campaign.results.type}</div>
                                                <div className="text-xl font-bold text-blue-900">{campaign.results.count.toLocaleString()}</div>
                                            </div>

                                            {/* Performance Metrics */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reach</div>
                                                    <div className="text-sm font-semibold text-gray-900">{campaign.reach.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Impressions</div>
                                                    <div className="text-sm font-semibold text-gray-900">{campaign.impressions.toLocaleString()}</div>
                                                </div>
                                            </div>

                                            {/* Cost Metrics */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cost per Result</div>
                                                    <div className="text-sm font-semibold text-gray-900">{campaign.costPerResult}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount Spent</div>
                                                    <div className="text-sm font-semibold text-gray-900">{campaign.amountSpent}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 