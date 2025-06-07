import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs components must be used within a Tabs provider');
    }
    return context;
};

interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    defaultValue,
    value,
    onValueChange,
    children,
    className = ''
}) => {
    const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || '');

    const activeTab = value !== undefined ? value : internalActiveTab;
    const setActiveTab = (newValue: string) => {
        if (value === undefined) {
            setInternalActiveTab(newValue);
        }
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={`tabs ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

interface TabsListProps {
    children: ReactNode;
    className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
    return (
        <div className={`tabs-list ${className}`}>
            {children}
        </div>
    );
};

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
        <button
            className={`tabs-trigger ${isActive ? 'active' : ''} ${className}`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
};

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) {
        return null;
    }

    return (
        <div className={`tabs-content ${className}`}>
            {children}
        </div>
    );
};

export { }; 