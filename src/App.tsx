import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/TopBar';
import { NavigationTabs } from './components/NavigationTabs';
import { HomeFragment } from './components/HomeFragment';
import { ListCarFragment } from './components/ListCarFragment';
import { GoodsMovementFragment } from './components/GoodsMovementFragment';
import { ShipmentInformationModal } from './components/ShipmentInformationModal';
import { EditProductModal } from './components/EditProductModal';
import { CalculationModal } from './components/CalculationModal';
import { TransferMoneyModal } from './components/TransferMoneyModal';
import { ProfitReportModal } from './components/ProfitReportModal';
import { SpreadsheetsModal } from './components/SpreadsheetsModal';
import { InventoryCheckModal } from './components/InventoryCheckModal';
import { NotesListModal } from './components/NotesListModal';
import { CalendarModal } from './components/CalendarModal';
import { SettingModal } from './components/SettingModal';
import { SplashScreen } from './components/SplashScreen';
import { LockScreen } from './components/LockScreen';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, activeModal, notification, settings } = useApp();

  const [showSplash, setShowSplash] = useState(true);
  const [isLocked, setIsLocked] = useState(settings.appLockEnabled);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isLocked && settings.appLockEnabled) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <TopBar />

      {/* Main Tabs Navigation */}
      <NavigationTabs />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-2">
        {activeTab === 0 && <HomeFragment />}
        {activeTab === 1 && <ListCarFragment />}
        {activeTab === 2 && <GoodsMovementFragment />}
      </main>

      {/* Modals & Dialogs */}
      {activeModal === 'shipment_info' && <ShipmentInformationModal />}
      {activeModal === 'add_product' && <EditProductModal />}
      {activeModal === 'calculation' && <CalculationModal />}
      {activeModal === 'transfer_money' && <TransferMoneyModal />}
      {activeModal === 'profit_report' && <ProfitReportModal />}
      {activeModal === 'spreadsheets' && <SpreadsheetsModal />}
      {activeModal === 'inventory_check' && <InventoryCheckModal />}
      {activeModal === 'notes' && <NotesListModal />}
      {activeModal === 'calendar' && <CalendarModal />}
      {activeModal === 'settings' && <SettingModal />}

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0D467D] text-white px-4 py-3 rounded-2xl shadow-xl shadow-[#0D467D]/25 border border-white/20 animate-slideUp text-xs font-bold max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
