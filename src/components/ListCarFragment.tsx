import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import {
  Search,
  Plus,
  Trash2,
  Truck,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  DollarSign,
  Scale,
} from 'lucide-react';

export const ListCarFragment: React.FC = () => {
  const {
    products,
    deleteProduct,
    setSelectedProductForView,
    setActiveModal,
    totalStockQuantity,
    settings,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');

  const currency = settings.currency || 'د.ع';

  // Categories from products
  const categories = ['الكل', 'خالص', 'لم يتم الدفع', 'حديد وبناء', 'إسمنت', 'مواد أولية'];

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.driver && p.driver.toLowerCase().includes(search.toLowerCase())) ||
      (p.truckNumber && p.truckNumber.toLowerCase().includes(search.toLowerCase())) ||
      p.Category.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (selectedFilter === 'الكل') return true;
    if (selectedFilter === 'خالص') return p.status === 'خالص';
    if (selectedFilter === 'لم يتم الدفع') return p.status === 'لم يتم الدفع';
    return p.Category.includes(selectedFilter);
  });

  const handleItemClick = (item: ProductItem) => {
    setSelectedProductForView(item);
    setActiveModal('shipment_info');
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`هل أنت متأكد من حذف "${title}" من قائمة المخزن والشاحنات؟`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fadeIn relative min-h-[70vh]">
      {/* ======================================================== */}
      {/* 1. Header & Stock Metric Banner                          */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#124C7E] tracking-tight">
                المخزن والسيارات
              </h2>
              <span className="bg-[#124C7E]/10 text-[#124C7E] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {products.length} أصناف
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              متابعة كميات البضائع، حمولات الشاحنات، والسائقين وحالات الدفع
            </p>
          </div>

          {/* Quick Metrics (إجمالي الطن والمخزون) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-[#F6F7FB] px-4 py-2.5 rounded-2xl border border-slate-200/60">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0D467D] flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">إجمالي الأطنان</p>
                <p className="text-sm font-extrabold text-[#0D467D]">
                  {totalStockQuantity.toLocaleString('en-US')} {settings.defaultUnit || 'طن'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('add_product')}
              className="flex items-center gap-1.5 bg-[#0D467D] hover:bg-[#0A3866] text-white text-xs font-bold px-3.5 py-3 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة حمولة</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. Live Search Bar & Filters                             */}
        {/* ======================================================== */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث باسم المنتج، السائق، رقم الشاحنة أو التصنيف..."
              className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-[#F6F7FB] border border-slate-200/80 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] transition-all text-slate-800"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                مسح
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#0D467D] text-white shadow-xs'
                    : 'bg-[#F6F7FB] text-slate-600 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Products & Trucks List (matching list.xml)             */}
      {/* ======================================================== */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-700">لا توجد بضائع أو شاحنات مطابقة</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            لم يتم العثور على أية نتائج للبحث الحالي. يمكنك تعديل كلمات البحث أو إضافة بضاعة جديدة للمخزن.
          </p>
          <button
            onClick={() => setActiveModal('add_product')}
            className="inline-flex items-center gap-2 bg-[#0D467D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#0A3866] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل بضاعة جديدة</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredProducts.map((item) => {
            const isPaid = item.status === 'خالص';
            const isLow = item.quantity <= (settings.lowStockLimit || 10);

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all cursor-pointer relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Status Badge & Category & Delete */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        {item.status}
                      </span>

                      <span className="bg-sky-50 text-[#0D467D] text-[11px] font-semibold px-2 py-0.5 rounded-md border border-sky-100">
                        {item.Category}
                      </span>

                      {isLow && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-200 animate-pulse">
                          مخزون منخفض
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDelete(e, item.id, item.title)}
                        title="حذف من المخزن"
                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Quantity */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-[#0D467D] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-left shrink-0">
                      <span className="text-sm font-extrabold text-[#0D467D] bg-[#F6F7FB] px-2.5 py-1 rounded-xl border border-slate-200/60 inline-block">
                        {item.dates}
                      </span>
                    </div>
                  </div>

                  {/* Driver & Truck row */}
                  <div className="bg-[#F8F9FE] p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white text-[#0D467D] flex items-center justify-center border border-slate-200/60 shadow-2xs">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-[11px]">
                          {item.driver || 'سائق غير محدد'}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.truckNumber || 'رقم الشاحنة غير مسجل'}
                        </p>
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="text-[11px] text-slate-400 block">سعر الشراء</span>
                      <span className="font-bold text-slate-700 text-xs">{item.maps}</span>
                    </div>
                  </div>
                </div>

                {/* Footer: Date & Details prompt */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.time}</span>
                  </div>

                  <span className="text-[#0D467D] font-bold group-hover:underline flex items-center gap-0.5">
                    بيانات الحمولة
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. Floating Action Button (+ FAB) matching Sketchware     */}
      {/* ======================================================== */}
      <button
        onClick={() => setActiveModal('add_product')}
        title="إضافة منتج أو حمولة جديدة"
        className="fixed bottom-6 left-6 z-30 w-14 h-14 rounded-full bg-[#0D467D] hover:bg-[#0A3866] text-white flex items-center justify-center shadow-xl shadow-[#0D467D]/35 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-white"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
};
