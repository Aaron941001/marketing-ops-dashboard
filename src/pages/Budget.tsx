import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import {
    DollarSign,
    TrendingUp,
    AlertTriangle,
    Edit3,
    Save,
    X,
    Calendar,
    Target,
    TrendingDown,
    Zap,
    CheckCircle,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

interface BudgetItem {
    id: string;
    channel: string;
    allocated: number;
    spent: number;
    remaining: number;
    burnRate: number;
    category: 'paid-ads' | 'content' | 'tools' | 'influencer';
    gradient: string;
}

const Budget: React.FC = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        {
            id: '1',
            channel: 'Google Ads',
            allocated: 25000,
            spent: 18750,
            remaining: 6250,
            burnRate: 75,
            category: 'paid-ads',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            id: '2',
            channel: 'Facebook Ads',
            allocated: 20000,
            spent: 16400,
            remaining: 3600,
            burnRate: 82,
            category: 'paid-ads',
            gradient: 'from-blue-600 to-indigo-600'
        },
        {
            id: '3',
            channel: 'LinkedIn Ads',
            allocated: 15000,
            spent: 8200,
            remaining: 6800,
            burnRate: 55,
            category: 'paid-ads',
            gradient: 'from-blue-700 to-purple-600'
        },
        {
            id: '4',
            channel: 'Content Marketing',
            allocated: 12000,
            spent: 7800,
            remaining: 4200,
            burnRate: 65,
            category: 'content',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            id: '5',
            channel: 'Email Marketing',
            allocated: 8000,
            spent: 5200,
            remaining: 2800,
            burnRate: 65,
            category: 'content',
            gradient: 'from-green-600 to-teal-600'
        },
        {
            id: '6',
            channel: 'SEO Tools',
            allocated: 6000,
            spent: 4800,
            remaining: 1200,
            burnRate: 80,
            category: 'tools',
            gradient: 'from-purple-500 to-indigo-500'
        },
        {
            id: '7',
            channel: 'Influencer Marketing',
            allocated: 18000,
            spent: 22500,
            remaining: -4500,
            burnRate: 125,
            category: 'influencer',
            gradient: 'from-pink-500 to-rose-500'
        }
    ]);

    const [tempValues, setTempValues] = useState<{ allocated: number, spent: number }>({ allocated: 0, spent: 0 });

    const totalBudget = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
    const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
    const totalRemaining = totalBudget - totalSpent;
    const overBudgetItems = budgetItems.filter(item => item.burnRate > 100);
    const averageBurnRate = budgetItems.reduce((sum, item) => sum + item.burnRate, 0) / budgetItems.length;

    const monthlyData = [
        { month: 'Jan', budget: 95000, spent: 87200, variance: -7800 },
        { month: 'Feb', budget: 102000, spent: 94800, variance: -7200 },
        { month: 'Mar', budget: 98000, spent: 101200, variance: 3200 },
        { month: 'Apr', budget: 110000, spent: 108500, variance: -1500 },
        { month: 'May', budget: 104000, spent: 98700, variance: -5300 },
        { month: 'Jun', budget: 108000, spent: 0, variance: 0 },
    ];

    const burnForecastData = [
        { week: 'Week 1', actual: 20000, projected: 22000 },
        { week: 'Week 2', actual: 38000, projected: 40000 },
        { week: 'Week 3', actual: 58000, projected: 59000 },
        { week: 'Week 4', actual: 78000, projected: 77000 },
        { week: 'Week 5', actual: 0, projected: 95000 },
        { week: 'Week 6', actual: 0, projected: 110000 },
    ];

    const categoryData = [
        { name: 'Paid Ads', value: budgetItems.filter(item => item.category === 'paid-ads').reduce((sum, item) => sum + item.spent, 0), color: '#0ea5e9' },
        { name: 'Content', value: budgetItems.filter(item => item.category === 'content').reduce((sum, item) => sum + item.spent, 0), color: '#10b981' },
        { name: 'Tools', value: budgetItems.filter(item => item.category === 'tools').reduce((sum, item) => sum + item.spent, 0), color: '#8b5cf6' },
        { name: 'Influencer', value: budgetItems.filter(item => item.category === 'influencer').reduce((sum, item) => sum + item.spent, 0), color: '#f59e0b' },
    ];

    const handleEdit = (item: BudgetItem) => {
        setEditingId(item.id);
        setTempValues({ allocated: item.allocated, spent: item.spent });
    };

    const handleSave = (id: string) => {
        setBudgetItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        allocated: tempValues.allocated,
                        spent: tempValues.spent,
                        remaining: tempValues.allocated - tempValues.spent,
                        burnRate: Math.round((tempValues.spent / tempValues.allocated) * 100)
                    }
                    : item
            )
        );
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setTempValues({ allocated: 0, spent: 0 });
    };

    const getBurnRateColor = (burnRate: number) => {
        if (burnRate > 100) return 'text-red-600 dark:text-red-400';
        if (burnRate > 80) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-green-600 dark:text-green-400';
    };

    const getBurnRateBackground = (burnRate: number) => {
        if (burnRate > 100) return 'bg-red-100 dark:bg-red-900/30';
        if (burnRate > 80) return 'bg-yellow-100 dark:bg-yellow-900/30';
        return 'bg-green-100 dark:bg-green-900/30';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="slide-up">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Track, manage and optimize your marketing spend</p>
                    </div>
                    <button className="modern-btn modern-btn-primary">
                        <DollarSign className="w-4 h-4" />
                        <span>Add Budget Item</span>
                    </button>
                </div>
            </div>

            {/* Alert Banner */}
            {overBudgetItems.length > 0 && (
                <div className="slide-up">
                    <div className="modern-card border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
                        <div className="p-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                                        Budget Overspend Alert
                                    </h3>
                                    <p className="text-sm text-red-700 dark:text-red-300">
                                        {overBudgetItems.length} channel(s) have exceeded their allocated budget: {' '}
                                        <span className="font-medium">{overBudgetItems.map(item => item.channel).join(', ')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalBudget.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toLocaleString()}</p>
                            <div className="flex items-center mt-1">
                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600 dark:text-green-400">
                                    {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                                </span>
                            </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining</p>
                            <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                ${Math.abs(totalRemaining).toLocaleString()}
                            </p>
                            <div className="flex items-center mt-1">
                                {totalRemaining >= 0 ? (
                                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm ${totalRemaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
                                </span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-2xl shadow-lg ${totalRemaining >= 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}>
                            {totalRemaining >= 0 ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                                <AlertTriangle className="w-6 h-6 text-white" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="modern-card metric-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Burn Rate</p>
                            <p className={`text-2xl font-bold ${getBurnRateColor(averageBurnRate)}`}>
                                {averageBurnRate.toFixed(1)}%
                            </p>
                            <div className="flex items-center mt-1">
                                <Zap className="w-4 h-4 text-purple-500 mr-1" />
                                <span className="text-sm text-purple-600 dark:text-purple-400">
                                    {overBudgetItems.length} over budget
                                </span>
                            </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 slide-up">
                {/* Monthly Budget vs Spend */}
                <div className="modern-card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span>Monthly Budget vs Spend</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="budget" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Spending by Category */}
                <div className="modern-card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span>Spending by Category</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                nameKey="name"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spent']}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Budget Items Table */}
            <div className="modern-card slide-up">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span>Budget Allocation</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Channel</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Allocated</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Spent</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Remaining</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Burn Rate</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgetItems.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.gradient}`} />
                                                <span className="font-medium text-gray-900 dark:text-white">{item.channel}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    value={tempValues.allocated}
                                                    onChange={(e) => setTempValues(prev => ({ ...prev, allocated: Number(e.target.value) }))}
                                                    className="modern-input w-24"
                                                />
                                            ) : (
                                                <span className="text-gray-900 dark:text-white">${item.allocated.toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    value={tempValues.spent}
                                                    onChange={(e) => setTempValues(prev => ({ ...prev, spent: Number(e.target.value) }))}
                                                    className="modern-input w-24"
                                                />
                                            ) : (
                                                <span className="text-gray-900 dark:text-white">${item.spent.toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`font-medium ${item.remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                ${Math.abs(item.remaining).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBurnRateBackground(item.burnRate)} ${getBurnRateColor(item.burnRate)}`}>
                                                {item.burnRate}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                {editingId === item.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSave(item.id)}
                                                            className="modern-btn modern-btn-primary p-1"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={handleCancel}
                                                            className="modern-btn modern-btn-secondary p-1"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="modern-btn modern-btn-secondary p-1"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Burn Rate Forecast */}
            <div className="modern-card slide-up">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <TrendingDown className="w-5 h-5 text-orange-500" />
                        <span>Burn Rate Forecast</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={burnForecastData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="week" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
                            <Line type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Budget; 