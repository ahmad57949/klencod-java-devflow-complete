import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  Calculator,
  ArrowRightLeft,
  ArrowDownRight,
  ArrowUpRight,
  Users,
  Layers,
  Warehouse,
  Truck,
  TrendingUp,
  TableProperties,
  ArrowLeftRight,
  ClipboardCheck,
  PlusCircle,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const HomeFragment: React.FC = () => {
  const {
    setActiveTab,
    setActiveModal,
    totalExpenses,
    totalRevenues,
    netVaultBalance,
    activeClientsCount,
    totalOperationsCount,
    settings,
    products,
    movements,
  } = useApp();

  const currency = settings.currency || 'د.ع';

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('en-US');
  };

  const lowStockProducts = products.filter(
    (p) => p.quantity <= (settings.lowStockLimit || 10)
  );

  return (
    <div className="space-y-5 pb-8 animate-fadeIn">
      {/* ======================================================== */}
      {/* 1. Main Vault Card (الخزنة الرئيسية) - cardview53         */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D467D] via-[#105191] to-[#0A3866] text-white p-6 shadow-xl shadow-[#0D467D]/20 border border-white/10">
        {/* Subtle background graphics */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Wallet className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h3 className="text-base font-bold text-sky-100">الخزنة الرئيسية</h3>
                <p className="text-xs text-sky-200/80">رصيد الصندوق المالي الفعلي</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-sky-100 border border-white/15">
              حساب نشط
            </span>
          </div>

          {/* Amount Display */}
          <div className="my-5">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-baseline gap-2">
              <span className={netVaultBalance < 0 ? 'text-amber-300' : 'text-white'}>
                {netVaultBalance < 0 ? '-' : '+'}
                {formatMoney(Math.abs(netVaultBalance || 50))}
              </span>
              <span className="text-lg font-semibold text-sky-200">{currency}</span>
            </div>
            <p className="text-xs text-sky-200/90 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              التحديث التلقائي مع كل حركة بيع وشراء ومصروف
            </p>
          </div>

          {/* Action Buttons: الحسبة & تحويل المال */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setActiveModal('calculation')}
              id="b_calc"
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-98 backdrop-blur-sm border border-white/20 transition-all font-bold text-xs sm:text-sm cursor-pointer group shadow-sm"
            >
              <Calculator className="w-4 h-4 text-sky-200 group-hover:scale-110 transition-transform" />
              <span>الحسبة</span>
            </button>

            <button
              onClick={() => setActiveModal('transfer_money')}
              id="b_transfer"
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-98 backdrop-blur-sm border border-white/20 transition-all font-bold text-xs sm:text-sm cursor-pointer group shadow-sm"
            >
              <ArrowRightLeft className="w-4 h-4 text-sky-200 group-hover:scale-110 transition-transform" />
              <span>تحويل المال</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. 4 Summary Metric Cards (الإيرادات، المصروفات، العملاء...) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: إجمالي المصروفات */}
        <div
          onClick={() => setActiveModal('calculation')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">إجمالي المصروفات</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 group-hover:scale-105 transition-transform">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800">
            {formatMoney(totalExpenses)} <span className="text-xs font-normal text-slate-500">{currency}</span>
          </div>
          <p className="text-[11px] text-red-600/90 font-medium mt-1">
            مشتريات + وقود ومصاريف
          </p>
        </div>

        {/* Card 2: إجمالي الإيرادات */}
        <div
          onClick={() => setActiveModal('profit_report')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">إجمالي الإيرادات</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800">
            {formatMoney(totalRevenues)} <span className="text-xs font-normal text-slate-500">{currency}</span>
          </div>
          <p className="text-[11px] text-emerald-600/90 font-medium mt-1">
            مبيعات وعوائد الشحنات
          </p>
        </div>

        {/* Card 3: عدد العملاء */}
        <div
          onClick={() => setActiveTab(1)}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">عدد العملاء والموردين</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0D467D] flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800">
            {activeClientsCount} <span className="text-xs font-normal text-slate-500">طرف نشط</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            شركات وسائقين ومقاولين
          </p>
        </div>

        {/* Card 4: عدد العمليات */}
        <div
          onClick={() => setActiveTab(2)}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">عدد العمليات</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800">
            {totalOperationsCount} <span className="text-xs font-normal text-slate-500">حركة مسجلة</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            شحن وتوريد ومبيعات
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Low Stock Banner Warning (if any)                         */}
      {/* ======================================================== */}
      {lowStockProducts.length > 0 && (
        <div
          onClick={() => setActiveModal('inventory_check')}
          className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-amber-900 cursor-pointer hover:bg-amber-100/70 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">
                تنبيه: {lowStockProducts.length} مواد وصلت لحد المخزون المنخفض!
              </p>
              <p className="text-[11px] text-amber-700">
                مثل: {lowStockProducts.map((p) => p.title).slice(0, 2).join('، ')} ...
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
            فحص الجرد
          </span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. Main Services (الخدمات الرئيسية) - 7 interactive cards  */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#0D467D]">
            الخدمات الرئيسية
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            جميع الخيارات والأقسام مفعلة
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. المخزن (card_warehouse) */}
          <button
            onClick={() => setActiveTab(1)}
            id="card_warehouse"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0D467D]/10 text-[#0D467D] flex items-center justify-center mb-2.5 group-hover:bg-[#0D467D] group-hover:text-white transition-all">
              <Warehouse className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">المخزن</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              {products.length} بضائع مسجلة
            </span>
          </button>

          {/* 2. السيارات والشاحنات (card_cars) */}
          <button
            onClick={() => setActiveTab(1)}
            id="card_cars"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">السيارات</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              تتبع الشاحنات والسائقين
            </span>
          </button>

          {/* 3. تقرير الأرباح (card_profit_report) */}
          <button
            onClick={() => setActiveModal('profit_report')}
            id="card_profit_report"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">تقرير الأرباح</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              حساب هوامش الربح
            </span>
          </button>

          {/* 4. جداول البيانات (card_spreadsheets) */}
          <button
            onClick={() => setActiveModal('spreadsheets')}
            id="card_spreadsheets"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2.5 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <TableProperties className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">جداول البيانات</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              تقارير وتصدير إكسل
            </span>
          </button>

          {/* 5. حركة البضائع (card_goods_movement) */}
          <button
            onClick={() => setActiveTab(2)}
            id="card_goods_movement"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">حركة البضائع</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              سجل زمني لجميع الحركات
            </span>
          </button>

          {/* 6. جرد المخزون (card_inventory_check) */}
          <button
            onClick={() => setActiveModal('inventory_check')}
            id="card_inventory_check"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">جرد المخزون</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              المطابقة والفروقات
            </span>
          </button>

          {/* 7. إضافة منتج (card_add_product) */}
          <button
            onClick={() => setActiveModal('add_product')}
            id="card_add_product"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-[#0D467D]/30 transition-all text-center cursor-pointer group active:scale-95 col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">إضافة منتج</span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              تسجيل بضاعة جديدة
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Quick Cargo Overview Banner                            */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
            <img src="/images/truck.png" alt="شاحنات" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">
              أسطول الشاحنات ونقل البضائع
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              متابعة الأطنان المنقولة، أجور النقل، وتفريغ الشحنات بالساعة والدقيقة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab(1)}
            className="flex-1 sm:flex-none text-xs font-bold bg-[#0D467D] text-white px-4 py-2.5 rounded-xl hover:bg-[#0A3866] transition-colors cursor-pointer text-center"
          >
            عرض الشاحنات
          </button>
          <button
            onClick={() => setActiveModal('spreadsheets')}
            className="flex-1 sm:flex-none text-xs font-bold bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer text-center"
          >
            تصدير تقرير
          </button>
        </div>
      </div>
    </div>
  );
};
