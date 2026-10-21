import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowRightLeft, DollarSign, User, FileText, CheckCircle2 } from 'lucide-react';

export const TransferMoneyModal: React.FC = () => {
  const { setActiveModal, addMovement, settings, showToast } = useApp();

  const currency = settings.currency || 'د.ع';

  const [operationType, setOperationType] = useState<'تحويل' | 'بيع' | 'شراء' | 'مصروف'>('تحويل');
  const [amount, setAmount] = useState<string>('');
  const [party, setParty] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('يرجى إدخال مبلغ مالي صحيح');
      return;
    }
    if (!party.trim()) {
      setError('يرجى كتابة اسم الطرف أو البيان');
      return;
    }

    const numAmount = parseFloat(amount);
    let signedAmount = numAmount;
    let amountText = '';

    if (operationType === 'تحويل') {
      signedAmount = -numAmount;
      amountText = `-${numAmount.toLocaleString('en-US')} ${currency}`;
    } else if (operationType === 'مصروف' || operationType === 'شراء') {
      signedAmount = -numAmount;
      amountText = `-${numAmount.toLocaleString('en-US')} ${currency}`;
    } else {
      signedAmount = numAmount;
      amountText = `+${numAmount.toLocaleString('en-US')} ${currency}`;
    }

    addMovement({
      type: operationType,
      amount: signedAmount,
      amountText,
      party: party.trim(),
      product: product.trim() || undefined,
      quantity: quantity.trim() ? `${quantity} ${settings.defaultUnit || 'طن'}` : undefined,
      notes: notes.trim() || undefined,
      icon: operationType === 'تحويل' ? '↔' : operationType === 'بيع' ? '🛒' : operationType === 'شراء' ? '▣' : '▤',
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#175A9C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <ArrowRightLeft className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">تسجيل حركة نقدية / تحويل</h3>
              <p className="text-xs text-sky-200">صرف، إيداع، تحويل بين الصناديق، أو تسجيل مدفوعات</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Operation Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              نوع العملية المالية <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'تحويل', label: 'تحويل ↔' },
                { id: 'بيع', label: 'إيراد / بيع 🛒' },
                { id: 'شراء', label: 'شراء ▣' },
                { id: 'مصروف', label: 'مصروف ▤' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setOperationType(t.id as any)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    operationType === t.id
                      ? 'bg-[#0D467D] text-white border-[#0D467D] shadow-xs'
                      : 'bg-[#F8F9FE] text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              المبلغ ({currency}) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError('');
                }}
                placeholder="مثال: 500,000"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border border-slate-200 text-xs sm:text-sm font-extrabold focus:outline-none focus:border-[#0D467D] text-slate-900"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {currency}
              </span>
            </div>
          </div>

          {/* Party */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              الطرف / المستلم / المصدر <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={party}
              onChange={(e) => {
                setParty(e.target.value);
                if (error) setError('');
              }}
              placeholder="مثال: شركة الإعمار الحديث، السائق أبو فهد، وقود شاحنة..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F3F6FA] border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0D467D] text-slate-800"
            />
          </div>

          {/* Optional Product and Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                البضاعة المرتبطة (اختياري)
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="مثال: حديد تسليح"
                className="w-full px-3 py-2 rounded-xl bg-[#F3F6FA] border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D] text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الكمية (اختياري)
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="مثال: 5 طن"
                className="w-full px-3 py-2 rounded-xl bg-[#F3F6FA] border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D] text-slate-800"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              بيان / ملاحظات العملية
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="تفاصيل الشيك، رقم الإيصال، تسوية فروقات..."
              className="w-full px-3 py-2 rounded-xl bg-[#F3F6FA] border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D] text-slate-800 resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0D467D] hover:bg-[#0A3866] text-white text-sm font-bold shadow-lg shadow-[#0D467D]/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تسجيل الحركة وحفظها في السجل</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
