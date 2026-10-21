import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Calendar as CalendarIcon, StickyNote, Plus, Bell, ShieldCheck, Download } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { setActiveModal, notes, calendarEvents, settings, products } = useApp();

  const lowStockCount = products.filter((p) => p.quantity <= (settings.lowStockLimit || 10)).length;
  const pendingEventsCount = calendarEvents.filter((e) => !e.completed).length;

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9FE]/95 backdrop-blur-md border-b border-[#E2E8F0]/80 px-4 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Right side in RTL: Logo & App Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D467D] to-[#1E609A] p-1.5 shadow-md shadow-[#0D467D]/15 flex items-center justify-center border border-white/40">
            <img
              src="/images/icon.png"
              alt="Darle Stock"
              className="w-full h-full object-contain filter drop-shadow"
              onError={(e) => {
                // fallback if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#0D467D] leading-tight">
                {settings.companyName || 'Darle Stock'}
              </h1>
              {settings.appLockEnabled && (
                <span title="التطبيق محمي برمز مرور" className="inline-flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 ml-0.5" />
                  مؤمن
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              إدارة المخازن والمبيعات · الإصدار 1.0.0
            </p>
          </div>
        </div>

        {/* Left side in RTL: Quick Action Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Download Complete Project ZIP Button */}
          <a
            href="/Darle_Stock_Complete_App.zip"
            download="Darle_Stock_Complete_App.zip"
            title="تحميل ملف التطبيق والمشروع بالكامل (ZIP)"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer no-underline"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">تحميل التطبيق (ZIP)</span>
          </a>

          {/* Quick Add Product Button */}
          <button
            onClick={() => setActiveModal('add_product')}
            title="إضافة منتج / شحنة جديدة"
            className="flex items-center gap-1.5 bg-[#0D467D] hover:bg-[#0A3660] text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">إضافة بضاعة</span>
          </button>

          {/* Notes List Button */}
          <button
            onClick={() => setActiveModal('notes')}
            title="قائمة الملاحظات"
            className="relative p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <StickyNote className="w-4 h-4 text-[#0D467D]" />
            {notes.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {notes.length}
              </span>
            )}
          </button>

          {/* Calendar Button */}
          <button
            onClick={() => setActiveModal('calendar')}
            title="التقويم والمواعيد"
            className="relative p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4 text-[#0D467D]" />
            {pendingEventsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {pendingEventsCount}
              </span>
            )}
          </button>

          {/* Low Stock Notification Indicator */}
          {lowStockCount > 0 && (
            <button
              onClick={() => setActiveModal('inventory_check')}
              title={`تنبيه: ${lowStockCount} منتجات وصلت لحد المخزون المنخفض`}
              className="relative p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-xs transition-all active:scale-95 cursor-pointer animate-pulse"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {lowStockCount}
              </span>
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={() => setActiveModal('settings')}
            title="الإعدادات وتخصيص التطبيق"
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#0D467D]" />
          </button>
        </div>
      </div>
    </header>
  );
};
