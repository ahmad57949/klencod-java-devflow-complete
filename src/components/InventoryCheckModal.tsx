import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Save,
  RotateCcw,
} from 'lucide-react';

export const InventoryCheckModal: React.FC = () => {
  const { setActiveModal, products, updateProduct, addMovement, showToast, settings } = useApp();

  // Map of product id -> physical count string
  const [counts, setCounts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      initial[p.id] = String(p.quantity);
    });
    return initial;
  });

  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleCountChange = (id: string, val: string) => {
    setCounts((prev) => ({ ...prev, [id]: val }));
  };

  const handleApplyReconciliation = () => {
    let changedCount = 0;

    products.forEach((p) => {
      const inputVal = counts[p.id];
      const parsed = parseFloat(inputVal);

      if (!isNaN(parsed) && parsed !== p.quantity) {
        const diff = parsed - p.quantity;
        const diffText = diff > 0 ? `+${diff}` : `${diff}`;

        updateProduct(p.id, {
          quantity: parsed,
          dates: `${parsed} ${p.unit}`,
        });

        addMovement({
          type: diff > 0 ? 'إضافة' : 'خروج',
          amount: 0,
          amountText: `${diffText} ${p.unit} (تسوية جرد)`,
          party: 'تسوية جرد مخزني دوري',
          product: p.title,
          quantity: `${Math.abs(diff)} ${p.unit}`,
          notes: notes[p.id] || `تعديل الرصيد الفعلي من ${p.quantity} إلى ${parsed}`,
          icon: '▣',
        });

        changedCount++;
      }
    });

    if (changedCount > 0) {
      showToast(`تمت تسوية وتحديث أرصدة ${changedCount} أصناف بنجاح`);
    } else {
      showToast('لم يتم رصد أية فروقات بين الجرد الفعلي والدفتري');
    }

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <ClipboardCheck className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">جرد المخزون والمطابقة الفعلية</h3>
              <p className="text-xs text-sky-200">مقارنة الرصيد الدفتري المسجل مع العد الفعلي على أرض الواقع</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-100 flex items-center gap-3 text-amber-900 text-xs shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            قم بإدخال الكمية الفعلية الموجودة في المستودع. سيقوم النظام بحساب الفارق (عجز أو زيادة) وتحديث المخزون وتسجيل حركة التسوية تلقائياً.
          </p>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {products.map((item) => {
            const systemQty = item.quantity;
            const currentInput = counts[item.id] ?? String(systemQty);
            const actualQty = parseFloat(currentInput);
            const diff = isNaN(actualQty) ? 0 : actualQty - systemQty;

            return (
              <div
                key={item.id}
                className="bg-[#F8F9FE] p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-[#0D467D] border border-slate-200/60">
                      {item.Category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    الرصيد الدفتري: <span className="font-bold text-slate-700">{systemQty} {item.unit}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Actual count input */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-0.5">
                      العد الفعلي ({item.unit})
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={currentInput}
                      onChange={(e) => handleCountChange(item.id, e.target.value)}
                      className="w-24 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-center focus:outline-none focus:border-[#0D467D]"
                    />
                  </div>

                  {/* Variance indicator */}
                  <div className="w-20 text-center">
                    <span className="block text-[10px] font-bold text-slate-400 mb-0.5">الفارق</span>
                    <span
                      className={`text-xs font-extrabold px-2 py-1 rounded-lg inline-block ${
                        diff === 0
                          ? 'bg-slate-100 text-slate-600'
                          : diff > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {diff > 0 ? `+${diff}` : diff} {item.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              const resetObj: Record<string, string> = {};
              products.forEach((p) => (resetObj[p.id] = String(p.quantity)));
              setCounts(resetObj);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-200/70 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة ضبط الأرقام</span>
          </button>

          <button
            onClick={handleApplyReconciliation}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#0D467D] hover:bg-[#0A3866] text-white text-xs font-bold shadow-md shadow-[#0D467D]/20 transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>اعتماد وتطبيق تسوية الجرد</span>
          </button>
        </div>
      </div>
    </div>
  );
};
