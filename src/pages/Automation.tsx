import React, { useState } from 'react';
import {
    Zap,
    Play,
    Pause,
    Settings,
    Clock,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    TestTube,
    Calendar,
    TrendingUp,
    Users,
    Mail,
    Database
} from 'lucide-react';

interface Workflow {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    lastTriggered: string;
    executions: number;
    successRate: number;
    trigger: string;
    category: 'social' | 'email' | 'data' | 'analytics';
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
}

const workflows: Workflow[] = [
    {
        id: '1',
        name: 'Social Media Auto-Post',
        description: 'Automatically publish scheduled content across all social platforms',
        status: 'active',
        lastTriggered: '2 minutes ago',
        executions: 1247,
        successRate: 98.5,
        trigger: 'Schedule',
        category: 'social',
        icon: Users,
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: '2',
        name: 'Email Campaign Automation',
        description: 'Send personalized email campaigns based on user behavior',
        status: 'active',
        lastTriggered: '15 minutes ago',
        executions: 892,
        successRate: 94.2,
        trigger: 'User Action',
        category: 'email',
        icon: Mail,
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        id: '3',
        name: 'Lead Scoring & Nurturing',
        description: 'Automatically score and nurture leads through the sales funnel',
        status: 'inactive',
        lastTriggered: '2 hours ago',
        executions: 356,
        successRate: 87.8,
        trigger: 'Form Submit',
        category: 'analytics',
        icon: TrendingUp,
        gradient: 'from-purple-500 to-indigo-500'
    },
    {
        id: '4',
        name: 'Data Sync & Backup',
        description: 'Sync customer data across platforms and create automated backups',
        status: 'active',
        lastTriggered: '1 hour ago',
        executions: 2134,
        successRate: 99.1,
        trigger: 'Schedule',
        category: 'data',
        icon: Database,
        gradient: 'from-orange-500 to-amber-500'
    },
    {
        id: '5',
        name: 'Performance Reporting',
        description: 'Generate and distribute weekly performance reports',
        status: 'active',
        lastTriggered: '3 hours ago',
        executions: 76,
        successRate: 100,
        trigger: 'Weekly',
        category: 'analytics',
        icon: Calendar,
        gradient: 'from-pink-500 to-rose-500'
    },
    {
        id: '6',
        name: 'A/B Test Management',
        description: 'Automatically manage and rotate A/B test variations',
        status: 'inactive',
        lastTriggered: '1 day ago',
        executions: 234,
        successRate: 92.3,
        trigger: 'Traffic Split',
        category: 'analytics',
        icon: TestTube,
        gradient: 'from-indigo-500 to-purple-500'
    }
];

const WorkflowCard: React.FC<{ workflow: Workflow }> = ({ workflow }) => {
    const [isRunning, setIsRunning] = useState(false);
    const Icon = workflow.icon;

    const toggleWorkflow = () => {
        setIsRunning(!isRunning);
    };

    const testWorkflow = () => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 2000);
    };

    return (
        <div className="modern-card group hover:scale-[1.02] transition-all duration-300">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${workflow.gradient} shadow-lg group-hover:scale-110 transition-all duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{workflow.description}</p>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${workflow.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                        {workflow.status === 'active' ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : (
                            <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="capitalize">{workflow.status}</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{workflow.executions.toLocaleString()}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Executions</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{workflow.successRate}%</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{workflow.trigger}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Trigger Type</p>
                    </div>
                </div>

                {/* Last Triggered */}
                <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last triggered:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{workflow.lastTriggered}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleWorkflow}
                            className={`modern-btn flex items-center space-x-2 px-4 py-2 ${workflow.status === 'active'
                                    ? 'modern-btn-secondary'
                                    : 'modern-btn-primary'
                                }`}
                            disabled={isRunning}
                        >
                            {isRunning ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : workflow.status === 'active' ? (
                                <Pause className="w-4 h-4" />
                            ) : (
                                <Play className="w-4 h-4" />
                            )}
                            <span>
                                {isRunning ? 'Running...' : workflow.status === 'active' ? 'Pause' : 'Start'}
                            </span>
                        </button>

                        <button
                            onClick={testWorkflow}
                            className="modern-btn modern-btn-secondary px-4 py-2"
                            disabled={isRunning}
                        >
                            <TestTube className="w-4 h-4" />
                            <span>Test</span>
                        </button>
                    </div>

                    <button className="modern-btn modern-btn-secondary p-2">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Automation: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [categoryFilter, setCategoryFilter] = useState<'all' | 'social' | 'email' | 'data' | 'analytics'>('all');

    const filteredWorkflows = workflows.filter(workflow => {
        const statusMatch = filter === 'all' || workflow.status === filter;
        const categoryMatch = categoryFilter === 'all' || workflow.category === categoryFilter;
        return statusMatch && categoryMatch;
    });

    const categories = [
        { id: 'all', name: 'All Categories', icon: Zap },
        { id: 'social', name: 'Social Media', icon: Users },
        { id: 'email', name: 'Email Marketing', icon: Mail },
        { id: 'data', name: 'Data Management', icon: Database },
        { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="slide-up">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Automation Center</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage and monitor your automated workflows</p>
                    </div>
                    <button className="modern-btn modern-btn-primary">
                        <Zap className="w-4 h-4" />
                        <span>Create Workflow</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 slide-up">
                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Workflows</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{workflows.length}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {workflows.filter(w => w.status === 'active').length}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Executions</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {workflows.reduce((sum, w) => sum + w.executions, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                            <RefreshCw className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Success Rate</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="modern-card slide-up">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                {['all', 'active', 'inactive'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilter(status as any)}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${filter === status
                                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setCategoryFilter(category.id as any)}
                                            className={`flex items-center space-x-2 px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${categoryFilter === category.id
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{category.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 slide-up">
                {filteredWorkflows.map((workflow) => (
                    <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
            </div>

            {filteredWorkflows.length === 0 && (
                <div className="modern-card text-center py-12">
                    <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workflows found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Try adjusting your filters or create a new workflow to get started.
                    </p>
                    <button className="modern-btn modern-btn-primary">
                        <Zap className="w-4 h-4" />
                        <span>Create Your First Workflow</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Automation; 