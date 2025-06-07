import React, { useState } from 'react';
import { Calendar, Filter, List, Grid3X3, Plus, Edit, Eye, Video, Image, Type } from 'lucide-react';
import Card from '../components/UI/Card';

interface Post {
    id: string;
    platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'xiaohongshu' | 'wechat';
    contentType: 'video' | 'image' | 'text';
    time: string;
    caption: string;
    tags: string[];
    status: 'scheduled' | 'published' | 'draft';
}

const SocialScheduler: React.FC = () => {
    const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'weekly'>('calendar');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const platforms = [
        { id: 'facebook', name: 'Facebook', color: 'bg-blue-500' },
        { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
        { id: 'twitter', name: 'X (Twitter)', color: 'bg-black' },
        { id: 'youtube', name: 'YouTube', color: 'bg-red-500' },
        { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600' },
        { id: 'tiktok', name: 'TikTok', color: 'bg-gray-800' },
        { id: 'xiaohongshu', name: 'Xiaohongshu', color: 'bg-red-400' },
        { id: 'wechat', name: 'WeChat', color: 'bg-green-500' },
    ];

    const contentTypes = [
        { id: 'video', name: 'Video', icon: Video },
        { id: 'image', name: 'Image', icon: Image },
        { id: 'text', name: 'Text', icon: Type },
    ];

    // Sample posts data
    const posts: Post[] = [
        {
            id: '1',
            platform: 'facebook',
            contentType: 'image',
            time: '09:00',
            caption: 'Check out our latest product launch! 🚀 #ProductLaunch #Innovation',
            tags: ['ProductLaunch', 'Innovation'],
            status: 'scheduled'
        },
        {
            id: '2',
            platform: 'instagram',
            contentType: 'video',
            time: '15:30',
            caption: 'Behind the scenes of our photo shoot ✨ #BTS #Creative',
            tags: ['BTS', 'Creative'],
            status: 'scheduled'
        },
        {
            id: '3',
            platform: 'linkedin',
            contentType: 'text',
            time: '10:00',
            caption: 'Exciting industry insights from our latest research report.',
            tags: ['Research', 'Insights'],
            status: 'published'
        }
    ];

    const togglePlatformFilter = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        );
    };

    const toggleContentTypeFilter = (typeId: string) => {
        setSelectedContentTypes(prev =>
            prev.includes(typeId)
                ? prev.filter(id => id !== typeId)
                : [...prev, typeId]
        );
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const getPostsForDay = (day: number) => {
        // This would normally filter posts by the actual date
        // For demo purposes, we'll show sample posts on certain days
        if (day === 15 || day === 20 || day === 25) {
            return posts.slice(0, Math.floor(Math.random() * 3) + 1);
        }
        return [];
    };

    const formatMonth = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const PostCard: React.FC<{ post: Post }> = ({ post }) => {
        const platform = platforms.find(p => p.id === post.platform);
        const ContentIcon = contentTypes.find(t => t.id === post.contentType)?.icon || Type;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${platform?.color}`}></div>
                        <ContentIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{post.time}</span>
                    </div>
                    <div className="flex space-x-1">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.caption}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const CalendarView = () => {
        const days = getDaysInMonth(currentDate);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="grid grid-cols-7 gap-1">
                {weekDays.map(day => (
                    <div key={day} className="p-3 text-center font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="min-h-[120px] p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        {day && (
                            <>
                                <div className="font-semibold text-gray-900 dark:text-white mb-2">{day}</div>
                                <div className="space-y-1">
                                    {getPostsForDay(day).map(post => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const ListView = () => (
        <div className="space-y-4">
            {posts.map(post => (
                <Card key={post.id} className="p-4">
                    <PostCard post={post} />
                </Card>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Social Media Scheduler
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Plan and schedule your social media content across all platforms
                    </p>
                </div>

                {/* Header Controls */}
                <Card className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-4">
                            {/* View Mode Toggles */}
                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'calendar'
                                        ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('weekly')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'weekly'
                                        ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                        ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Month Navigation */}
                            {viewMode === 'calendar' && (
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => navigateMonth('prev')}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                    >
                                        ←
                                    </button>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {formatMonth(currentDate)}
                                    </h2>
                                    <button
                                        onClick={() => navigateMonth('next')}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                <Plus className="w-4 h-4" />
                                <span>New Post</span>
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Filters */}
                <Card className="mb-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filters
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Platform Filter */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Platforms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {platforms.map(platform => (
                                        <button
                                            key={platform.id}
                                            onClick={() => togglePlatformFilter(platform.id)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPlatforms.includes(platform.id)
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                                                <span>{platform.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Type Filter */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Content Type</h4>
                                <div className="flex flex-wrap gap-2">
                                    {contentTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => toggleContentTypeFilter(type.id)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedContentTypes.includes(type.id)
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <type.icon className="w-4 h-4" />
                                                <span>{type.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Content Area */}
                <Card className="min-h-[600px]">
                    {viewMode === 'calendar' ? <CalendarView /> : <ListView />}
                </Card>
            </div>
        </div>
    );
};

export default SocialScheduler;