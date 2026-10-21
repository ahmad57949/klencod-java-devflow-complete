import React from 'react';
import { useApp } from '../context/AppContext';
import { X, TrendingUp, DollarSign, Printer, ArrowUpRight, ArrowDownRight, PieChart, BarChart3 } from 'lucide-react';

export const ProfitReportModal: React.FC = () => {
  const { setActiveModal, totalRevenues, totalExpenses, products, settings } = useApp();

  const currency = settings.currency || 'د.ع';
  const formatMoney = (val: number) => val.toLocaleString('en-US');

  const netProfit = totalRevenues - totalExpenses;
  const margin = totalRevenues > 0 ? ((netProfit / totalRevenues) * 100).toFixed(1) : '0';

  // Category Breakdown estimation
  const categoriesMap: Record<string, { count: number; totalTons: number }> = {};
  products.forEach((p) => {
    if (!categoriesMap[p.Category]) {
      categoriesMap[p.Category] = { count: 0, totalTons: 0 };
    }
    categoriesMap[p.Category].count += 1;
    categoriesMap[p.Category].totalTons += p.quantity;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <TrendingUp className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">تقرير الأرباح والمبيعات</h3>
              <p className="text-xs text-sky-200">تحليل الأداء المالي، هوامش الربح وتكاليف التشغيل</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Main Profit Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0D467D] text-white p-5 rounded-2xl shadow-md space-y-3">
            <span className="text-xs font-semibold text-sky-200">صافي الأرباح التشغيلية</span>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold tracking-tight">
                {netProfit >= 0 ? '+' : ''}{formatMoney(netProfit)}{' '}
                <span className="text-sm font-normal text-sky-200">{currency}</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold">
                هامش ربح {margin}%
              </span>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>إجمالي عوائد المبيعات</span>
              </div>
              <p className="text-lg font-extrabold text-emerald-950">
                {formatMoney(totalRevenues)} <span className="text-xs font-normal">{currency}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100">
              <div className="flex items-center gap-2 text-red-800 text-xs font-bold mb-1">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
                <span>تكلفة المشتريات والوقود</span>
              </div>
              <p className="text-lg font-extrabold text-red-950">
                {formatMoney(totalExpenses)} <span className="text-xs font-normal">{currency}</span>
              </p>
            </div>
          </div>

          {/* Breakdown by Category */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#0D467D]" />
              توزيع الأصناف وحمولات المخزن
            </h4>

            <div className="space-y-2">
              {Object.entries(categoriesMap).map(([cat, data]) => {
                const totalTonsAll = products.reduce((a, b) => a + b.quantity, 0) || 1;
                const pct = Math.round((data.totalTons / totalTonsAll) * 100);

                return (
                  <div key={cat} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">{cat}</span>
                      <span className="text-slate-500 font-medium">
                        {data.totalTons} طن ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-[#0D467D] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة التقرير</span>
          </button>

          <button
            onClick={() => setActiveModal(null)}
            className="px-6 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold hover:bg-[#0A3866] transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
