import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Warehouse, ArrowLeftRight } from 'lucide-react';

export const NavigationTabs: React.FC = () => {
  const { activeTab, setActiveTab, products, movements } = useApp();

  const tabs = [
    {
      id: 0,
      label: 'الرئيسية',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 1,
      label: 'المخزن والسيارات',
      icon: Warehouse,
      badge: products.length,
    },
    {
      id: 2,
      label: 'حركة البضائع',
      icon: ArrowLeftRight,
      badge: movements.length,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-3">
      <div className="bg-[#EAF2FA] p-1.5 rounded-full flex items-center justify-between gap-1 shadow-inner border border-[#D5E4F3]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0D467D] text-[#EAF2FA] shadow-md shadow-[#0D467D]/25 scale-[1.02]'
                  : 'bg-transparent text-[#0D467D] hover:bg-[#DCE9F6]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#EAF2FA]' : 'text-[#0D467D]'}`} />
              <span>{tab.label}</span>
              {tab.badge !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#0D467D]/10 text-[#0D467D]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
