import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Truck,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  Share2,
  Trash2,
  DollarSign,
  MapPin,
  FileText,
  CreditCard,
} from 'lucide-react';

export const ShipmentInformationModal: React.FC = () => {
  const {
    selectedProductForView,
    setSelectedProductForView,
    setActiveModal,
    updateProduct,
    deleteProduct,
    showToast,
  } = useApp();

  if (!selectedProductForView) return null;

  const item = selectedProductForView;
  const isPaid = item.status === 'خالص';

  const handleToggleStatus = () => {
    const newStatus = isPaid ? 'لم يتم الدفع' : 'خالص';
    updateProduct(item.id, { status: newStatus });
    setSelectedProductForView({ ...item, status: newStatus });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `*بوليصة حمولة - Darle Stock*\n` +
      `📦 البضاعة: ${item.title}\n` +
      `⚖️ الكمية: ${item.dates}\n` +
      `🚚 السائق: ${item.driver || 'غير محدد'}\n` +
      `🔢 رقم الشاحنة: ${item.truckNumber || 'غير محدد'}\n` +
      `💰 السعر: ${item.maps}\n` +
      `📍 الوجهة: ${item.destination || 'المخزن الرئيسي'}\n` +
      `📅 التاريخ: ${item.time}\n` +
      `📌 الحالة: ${item.status}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('تم نسخ تفاصيل الحمولة إلى الحافظة لمشاركتها');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`هل أنت متأكد من حذف حمولة "${item.title}"؟`)) {
      deleteProduct(item.id);
      setSelectedProductForView(null);
      setActiveModal(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header - matching shipment_information.xml */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#175A9C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <Truck className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">بيانات الحمولة</h3>
              <p className="text-xs text-sky-200">تفاصيل شحنة النقل وسند التوصيل</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedProductForView(null);
              setActiveModal(null);
            }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Status banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-600">حالة الدفع المالية:</span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isPaid
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {item.status}
              </span>
              <button
                onClick={handleToggleStatus}
                className="text-[11px] font-bold text-[#0D467D] hover:underline cursor-pointer"
              >
                (تغيير إلى {isPaid ? 'لم يتم الدفع' : 'خالص'})
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. اسم السائق (textview_driver) */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                اسم السائق
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0D467D]" />
                {item.driver || 'غير محدد'}
              </p>
            </div>

            {/* 2. رقم الشاحنة */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                رقم الشاحنة / السيارة
              </span>
              <p className="text-sm font-bold text-slate-800">
                {item.truckNumber || 'غير مسجل'}
              </p>
            </div>

            {/* 3. كمية الطن (textview_tons) */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                كمية الحمولة
              </span>
              <p className="text-base font-extrabold text-[#0D467D]">
                {item.dates}
              </p>
            </div>

            {/* 4. نوع البضاعة (textview_product) */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                نوع البضاعة / التصنيف
              </span>
              <p className="text-sm font-bold text-slate-800">
                {item.Category}
              </p>
            </div>

            {/* 5. اسم المنتج الكامل */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100 sm:col-span-2">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                اسم الصنف المسجل
              </span>
              <p className="text-sm font-extrabold text-slate-900">
                {item.title}
              </p>
            </div>

            {/* 6. السعر (textview_price) */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                سعر الشراء / التكلفة
              </span>
              <p className="text-sm font-extrabold text-slate-800">
                {item.maps}
              </p>
            </div>

            {/* 7. سعر البيع */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                سعر البيع المقترح
              </span>
              <p className="text-sm font-extrabold text-emerald-700">
                {item.sell_price}
              </p>
            </div>

            {/* 8. التاريخ والوقت (textview_date) */}
            <div className="bg-[#F8F9FE] p-3.5 rounded-2xl border border-slate-100 sm:col-span-2">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                تاريخ ووقت التسجيل
              </span>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {item.time}
              </p>
            </div>

            {/* 9. الوجهة والملاحظات (إن وجدت) */}
            {(item.destination || item.notes) && (
              <div className="bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100 sm:col-span-2">
                {item.destination && (
                  <p className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0D467D]" />
                    <span>الوجهة: {item.destination}</span>
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-slate-500 flex items-start gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                    <span>ملاحظات: {item.notes}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة إيصال</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>حذف</span>
            </button>
            <button
              onClick={() => {
                setSelectedProductForView(null);
                setActiveModal(null);
              }}
              className="px-5 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold hover:bg-[#0A3866] transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
