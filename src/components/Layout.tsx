import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BarChart3,
    Zap,
    DollarSign,
    Calendar,
    FolderOpen,
    Sun,
    Moon,
    TrendingUp
} from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const navigation = [
        {
            name: 'Dashboard',
            href: '/',
            icon: BarChart3,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            name: 'Automation',
            href: '/automation',
            icon: Zap,
            gradient: 'from-purple-500 to-indigo-500'
        },
        {
            name: 'Budget',
            href: '/budget',
            icon: DollarSign,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            name: 'Social Scheduler',
            href: '/social-scheduler',
            icon: Calendar,
            gradient: 'from-pink-500 to-rose-500'
        },
        {
            name: 'File Manager',
            href: '/file-manager',
            icon: FolderOpen,
            gradient: 'from-orange-500 to-amber-500'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Modern Navigation Header */}
            <header className="modern-nav sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo & Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    MarketingOps
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`nav-item relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                            }`}
                                    >
                                        <div className={`p-1 rounded-lg ${isActive ? `bg-gradient-to-r ${item.gradient}` : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'} transition-all duration-200`}>
                                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                                        </div>
                                        <span className="hidden lg:block">{item.name}</span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="modern-btn modern-btn-secondary w-10 h-10 p-0 rounded-xl"
                        >
                            {isDark ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div className="md:hidden modern-nav border-t border-white/20 dark:border-gray-700/50 fixed bottom-0 left-0 right-0 z-50">
                <div className="flex justify-around items-center py-2 px-4">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${isActive
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-lg ${isActive ? `bg-gradient-to-r ${item.gradient}` : 'bg-gray-100 dark:bg-gray-700'} transition-all duration-200`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                                </div>
                                <span className="text-xs font-medium">{item.name.split(' ')[0]}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
                <div className="fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout; 