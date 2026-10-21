import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GoodsMovementItem } from '../types';
import {
  ArrowLeftRight,
  Plus,
  Search,
  ShoppingCart,
  ArrowDownLeft,
  ArrowUpRight,
  Trash2,
  Calendar,
  Layers,
  Filter,
} from 'lucide-react';

export const GoodsMovementFragment: React.FC = () => {
  const { movements, deleteMovement, setActiveModal, settings } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [search, setSearch] = useState<string>('');

  const filterTabs = ['الكل', 'بيع', 'شراء', 'إضافة', 'خروج'];

  const filteredMovements = movements.filter((item) => {
    const matchesSearch =
      item.party.toLowerCase().includes(search.toLowerCase()) ||
      (item.product && item.product.toLowerCase().includes(search.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(search.toLowerCase())) ||
      item.type.includes(search);

    if (!matchesSearch) return false;

    if (activeFilter === 'الكل') return true;
    return item.type === activeFilter;
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('هل تريد حذف هذه العملية من سجل حركة البضائع؟')) {
      deleteMovement(id);
    }
  };

  const getBadgeStyle = (type: GoodsMovementItem['type']) => {
    switch (type) {
      case 'بيع':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: ShoppingCart,
          iconBg: 'bg-emerald-100 text-emerald-700',
        };
      case 'شراء':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: ArrowDownLeft,
          iconBg: 'bg-blue-100 text-blue-700',
        };
      case 'تحويل':
        return {
          bg: 'bg-indigo-50',
          text: 'text-indigo-700',
          border: 'border-indigo-200',
          icon: ArrowLeftRight,
          iconBg: 'bg-indigo-100 text-indigo-700',
        };
      case 'مصروف':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: ArrowUpRight,
          iconBg: 'bg-red-100 text-red-700',
        };
      case 'إضافة':
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          border: 'border-teal-200',
          icon: Layers,
          iconBg: 'bg-teal-100 text-teal-700',
        };
      case 'خروج':
      default:
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: ArrowUpRight,
          iconBg: 'bg-amber-100 text-amber-700',
        };
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fadeIn min-h-[70vh]">
      {/* ======================================================== */}
      {/* 1. Header Banner & Filter Pills                          */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#0D467D] tracking-tight">
                حركة البضائع
              </h2>
              <span className="bg-sky-100 text-[#0D467D] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {movements.length} عملية
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              كل العمليات بترتيب زمني مع توثيق الأطراف والمبالغ
            </p>
          </div>

          <button
            onClick={() => setActiveModal('transfer_money')}
            className="flex items-center gap-2 bg-[#0D467D] hover:bg-[#0A3866] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل حركة جديدة</span>
          </button>
        </div>

        {/* Filters and search */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Filter tabs matching goods_movement_fragment.xml */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0D467D] text-white shadow-xs'
                      : 'bg-[#F6F7FB] text-slate-600 hover:bg-slate-200/70 border border-slate-200/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالطرف، البضاعة، التاريخ..."
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#F6F7FB] border border-slate-200/80 text-xs focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. List of Movements                                     */}
      {/* ======================================================== */}
      {filteredMovements.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-700">لا توجد حركات مسجلة</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            لم يتم العثور على أية حركات مطابقة للفلتر المحدد. يمكنك تسجيل عملية تحويل أو بيع أو شراء جديدة.
          </p>
          <button
            onClick={() => setActiveModal('transfer_money')}
            className="inline-flex items-center gap-2 bg-[#0D467D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#0A3866] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل عملية جديدة</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMovements.map((mov) => {
            const style = getBadgeStyle(mov.type);
            const Icon = style.icon;
            const isPositive = mov.amount > 0;
            const isNegative = mov.amount < 0;

            return (
              <div
                key={mov.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                {/* Right side: Icon, Type, Party, Details */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${style.border} ${style.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${style.border} ${style.bg} ${style.text}`}
                      >
                        {mov.type}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        {mov.party}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                      {mov.quantity && (
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {mov.quantity}
                        </span>
                      )}
                      {mov.product && (
                        <span className="text-slate-600 font-medium">
                          {mov.product}
                        </span>
                      )}
                      {mov.notes && (
                        <span className="text-slate-400">· {mov.notes}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{mov.date}</span>
                    </div>
                  </div>
                </div>

                {/* Left side: Amount & Delete button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 shrink-0 gap-1">
                  <div
                    className={`text-base font-extrabold ${
                      isPositive
                        ? 'text-emerald-600'
                        : isNegative
                        ? 'text-red-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {mov.amountText}
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, mov.id)}
                    title="حذف الحركة"
                    className="p-1 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
