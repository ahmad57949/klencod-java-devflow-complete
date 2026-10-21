import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calculator,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  Printer,
  Copy,
  Check,
  Scale,
} from 'lucide-react';

export const CalculationModal: React.FC = () => {
  const { setActiveModal, totalRevenues, totalExpenses, netVaultBalance, settings, products, showToast } = useApp();

  const currency = settings.currency || 'د.ع';

  // Quick tons * price calculator
  const [calcTons, setCalcTons] = useState<string>('10');
  const [calcPricePerTon, setCalcPricePerTon] = useState<string>('850000');
  const [calcDiscount, setCalcDiscount] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  const tonsNum = parseFloat(calcTons) || 0;
  const priceNum = parseFloat(calcPricePerTon) || 0;
  const discountNum = parseFloat(calcDiscount) || 0;
  const subTotal = tonsNum * priceNum;
  const grandTotal = Math.max(0, subTotal - discountNum);

  const profit = totalRevenues - totalExpenses;
  const profitMargin = totalRevenues > 0 ? ((profit / totalRevenues) * 100).toFixed(1) : '0';

  const formatMoney = (val: number) => val.toLocaleString('en-US');

  const handleCopySummary = () => {
    const summary =
      `*كشف الحسبة المالية - Darle Stock*\n` +
      `📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n` +
      `💰 إجمالي الإيرادات: ${formatMoney(totalRevenues)} ${currency}\n` +
      `📉 إجمالي المصروفات: ${formatMoney(totalExpenses)} ${currency}\n` +
      `📊 صافي الأرباح: ${formatMoney(profit)} ${currency} (${profitMargin}%)\n` +
      `🏦 رصيد الخزنة الفعلي: ${formatMoney(Math.abs(netVaultBalance))} ${currency}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    showToast('تم نسخ كشف الحسبة بنجاح');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <Calculator className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">الحسبة والصندوق المالي</h3>
              <p className="text-xs text-sky-200">ملخص الحسابات النقدية وهوامش الأرباح والحاسبة السريعة</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Main Financial Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                إجمالي الإيرادات
              </span>
              <p className="text-base font-extrabold text-emerald-600">
                +{formatMoney(totalRevenues)}
              </p>
              <span className="text-[10px] text-slate-400">{currency}</span>
            </div>

            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                إجمالي المصروفات
              </span>
              <p className="text-base font-extrabold text-red-600">
                -{formatMoney(totalExpenses)}
              </p>
              <span className="text-[10px] text-slate-400">{currency}</span>
            </div>

            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                صافي الفارق / الربح
              </span>
              <p className={`text-base font-extrabold ${profit >= 0 ? 'text-[#0D467D]' : 'text-amber-600'}`}>
                {profit >= 0 ? '+' : ''}{formatMoney(profit)}
              </p>
              <span className="text-[10px] text-slate-400">{currency} ({profitMargin}%)</span>
            </div>
          </div>

          {/* Quick Ton / Load Price Calculator */}
          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0D467D] flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                حاسبة حمولات الأطنان السريعة
              </h4>
              <span className="text-[10px] text-slate-400">حساب فوري للشاحنة</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  الوزن (طن)
                </label>
                <input
                  type="number"
                  value={calcTons}
                  onChange={(e) => setCalcTons(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-center focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  سعر الطن ({currency})
                </label>
                <input
                  type="number"
                  value={calcPricePerTon}
                  onChange={(e) => setCalcPricePerTon(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-center focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  خصم / تسوية
                </label>
                <input
                  type="number"
                  value={calcDiscount}
                  onChange={(e) => setCalcDiscount(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-center focus:outline-none focus:border-[#0D467D]"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-white p-3 rounded-xl border border-sky-200/60 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">المجموع الصافي للحمولة:</span>
              <div className="text-left">
                <span className="text-base font-extrabold text-[#0D467D]">
                  {formatMoney(grandTotal)}
                </span>
                <span className="text-xs text-slate-500 mr-1">{currency}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Notes */}
          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h5 className="font-bold text-slate-800 mb-1">ملاحظات الحسبة:</h5>
            <p>• يتم احتساب حركة المبيعات والمشتريات بشكل فوري ومربوطة بالخزنة المركزية.</p>
            <p>• الشحنات المؤجلة (لم يتم الدفع) لا تضاف إلى رصيد الصندوق النقدي حتى يتم سدادها.</p>
            <p>• يمكنك استعراض كافة تفاصيل كل حركة عبر تبويب «حركة البضائع».</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ' : 'نسخ كشف الحسبة'}</span>
          </button>

          <button
            onClick={() => setActiveModal(null)}
            className="px-6 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold hover:bg-[#0A3866] transition-colors cursor-pointer"
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
};