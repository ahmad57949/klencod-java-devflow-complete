import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  TableProperties,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const SpreadsheetsModal: React.FC = () => {
  const { setActiveModal, products, exportDataCSV, settings } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('الكل');

  const categories = ['الكل', ...Array.from(new Set(products.map((p) => p.Category)))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.driver && p.driver.toLowerCase().includes(search.toLowerCase())) ||
      (p.truckNumber && p.truckNumber.toLowerCase().includes(search.toLowerCase()));

    if (!matchSearch) return false;
    if (selectedCat === 'الكل') return true;
    return p.Category === selectedCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <TableProperties className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">جداول البيانات والتقارير</h3>
              <p className="text-xs text-sky-200">عرض جدولي شامل وتصدير البيانات بصيغة Excel / CSV</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث في الجدول..."
                className="w-full pl-3 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0D467D]"
              />
            </div>

            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0D467D]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportDataCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تصدير Excel (CSV)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F8F9FE] text-slate-700 border-b border-slate-200 text-[11px] font-extrabold uppercase">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">اسم المنتج / البضاعة</th>
                  <th className="p-3">الكمية</th>
                  <th className="p-3">سعر الشراء</th>
                  <th className="p-3">سعر البيع</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">السائق / الشاحنة</th>
                  <th className="p-3">حالة الدفع</th>
                  <th className="p-3">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-slate-400 font-bold">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900">{item.title}</td>
                    <td className="p-3 font-extrabold text-[#0D467D]">{item.dates}</td>
                    <td className="p-3 text-slate-700">{item.maps}</td>
                    <td className="p-3 text-emerald-700 font-bold">{item.sell_price}</td>
                    <td className="p-3">
                      <span className="bg-sky-50 text-[#0D467D] px-2 py-0.5 rounded-md font-semibold border border-sky-100">
                        {item.Category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div>{item.driver || '-'}</div>
                      <div className="text-[10px] text-slate-400">{item.truckNumber || ''}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'خالص'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.status === 'خالص' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px] whitespace-nowrap">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            إجمالي السجلات: {filtered.length} صنف مسجل
          </span>
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
