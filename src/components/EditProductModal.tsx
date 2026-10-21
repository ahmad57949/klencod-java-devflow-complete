import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Package, Truck, DollarSign, Layers, MapPin, Tag } from 'lucide-react';

export const EditProductModal: React.FC = () => {
  const { setActiveModal, addProduct, settings } = useApp();

  const currency = settings.currency || 'د.ع';

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [unit, setUnit] = useState(settings.defaultUnit || 'طن');
  const [sellPrice, setSellPrice] = useState('');
  const [category, setCategory] = useState('');
  const [driver, setDriver] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [status, setStatus] = useState<'خالص' | 'لم يتم الدفع'>('خالص');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const commonUnits = ['طن', 'كجم', 'كيس', 'كرتونة', 'باليت', 'متر مكعب', 'قطعة'];
  const commonCategories = ['حديد وبناء', 'إسمنت', 'مواد أولية', 'طابوق', 'سيراميك وإنهاءات', 'أخشاب', 'أغذية', 'عام'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!productName.trim()) newErrors.productName = 'أدخل اسم المنتج';
    if (!quantity.trim() || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      newErrors.quantity = 'أدخل كمية رقمية صحيحة';
    }
    if (!buyPrice.trim()) newErrors.buyPrice = 'أدخل سعر الشراء';
    if (!unit.trim()) newErrors.unit = 'أدخل الوحدة';
    if (!sellPrice.trim()) newErrors.sellPrice = 'أدخل سعر البيع';
    if (!category.trim()) newErrors.category = 'أدخل التصنيف';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const numQty = parseFloat(quantity.replace(/,/g, '.'));
    const formattedBuyPrice = buyPrice.includes(currency) ? buyPrice : `${buyPrice} ${currency}`;
    const formattedSellPrice = sellPrice.includes(currency) ? sellPrice : `${sellPrice} ${currency}`;

    addProduct({
      title: productName.trim(),
      quantity: numQty,
      unit: unit.trim(),
      dates: `${numQty} ${unit.trim()}`,
      maps: formattedBuyPrice,
      sell_price: formattedSellPrice,
      Category: category.trim(),
      driver: driver.trim() || undefined,
      truckNumber: truckNumber.trim() || undefined,
      status,
      destination: destination.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header matching edittext.xml */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#15538F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <Package className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">إضافة منتج / حمولة جديدة</h3>
              <p className="text-xs text-sky-200">تسجيل بضاعة جديدة في المخزن وسجل الشاحنات</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            id="btn_close"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form Body matching edittext1 - edittext6 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* edittext1: اسم المنتج */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              اسم المنتج / البضاعة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edittext1"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                if (errors.productName) setErrors({ ...errors, productName: '' });
              }}
              placeholder="مثال: حديد تسليح 12 ملم عالي المتانة"
              className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                errors.productName ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
              }`}
            />
            {errors.productName && (
              <p className="text-[11px] text-red-500 mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Row: الكمية (edittext2) والوحدة (edittext4) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الكمية <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="any"
                id="edittext2"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) setErrors({ ...errors, quantity: '' });
                }}
                placeholder="مثال: 15"
                className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                  errors.quantity ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
                }`}
              />
              {errors.quantity && (
                <p className="text-[11px] text-red-500 mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الوحدة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edittext4"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  if (errors.unit) setErrors({ ...errors, unit: '' });
                }}
                placeholder="طن، كجم، كيس..."
                className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                  errors.unit ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
                }`}
              />
              {/* Quick unit pills */}
              <div className="flex items-center gap-1 mt-1 overflow-x-auto pb-0.5">
                {commonUnits.slice(0, 4).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row: سعر الشراء (edittext3) وسعر البيع (edittext5) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                سعر الشراء / التكلفة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edittext3"
                value={buyPrice}
                onChange={(e) => {
                  setBuyPrice(e.target.value);
                  if (errors.buyPrice) setErrors({ ...errors, buyPrice: '' });
                }}
                placeholder={`مثال: 850,000`}
                className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                  errors.buyPrice ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
                }`}
              />
              {errors.buyPrice && (
                <p className="text-[11px] text-red-500 mt-1">{errors.buyPrice}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                سعر البيع <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edittext5"
                value={sellPrice}
                onChange={(e) => {
                  setSellPrice(e.target.value);
                  if (errors.sellPrice) setErrors({ ...errors, sellPrice: '' });
                }}
                placeholder={`مثال: 920,000`}
                className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                  errors.sellPrice ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
                }`}
              />
              {errors.sellPrice && (
                <p className="text-[11px] text-red-500 mt-1">{errors.sellPrice}</p>
              )}
            </div>
          </div>

          {/* edittext6: التصنيف */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              التصنيف <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edittext6"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setErrors({ ...errors, category: '' });
              }}
              placeholder="مثال: حديد وبناء، إسمنت، مواد أولية..."
              className={`w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D467D]/20 focus:border-[#0D467D] text-slate-800 ${
                errors.category ? 'border-red-400 bg-red-50/30' : 'border-slate-200/80'
              }`}
            />
            {/* Quick category pills */}
            <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto pb-0.5">
              {commonCategories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-[#0D467D]/10 hover:text-[#0D467D] text-slate-600 cursor-pointer whitespace-nowrap"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* بيانات الشاحنة والسائق وحالة الدفع */}
          <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
            <h4 className="text-xs font-bold text-[#0D467D] flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              بيانات النقل والسائق (اختياري)
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  اسم السائق
                </label>
                <input
                  type="text"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  placeholder="مثال: أبو فهد العراقي"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  رقم الشاحنة
                </label>
                <input
                  type="text"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  placeholder="مثال: بغداد 4821"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  حالة الدفع
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'خالص' | 'لم يتم الدفع')}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#0D467D]"
                >
                  <option value="خالص">خالص (مدفوع)</option>
                  <option value="لم يتم الدفع">لم يتم الدفع (آجل)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  الوجهة / العميل
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="موقع المشروع أو اسم العميل"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D]"
                />
              </div>
            </div>
          </div>

          {/* زر إضافة المنتج - button2 matching edittext.xml */}
          <div className="pt-2">
            <button
              type="submit"
              id="button2"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0D467D] hover:bg-[#0A3866] text-white text-sm font-bold shadow-lg shadow-[#0D467D]/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>إضافة المنتج للمخزن</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
