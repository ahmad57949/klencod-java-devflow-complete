import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Delete, ShieldCheck, ArrowRight } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const { settings, showToast } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const targetPin = settings.appPin || '1234';

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const next = pin + num;
      setPin(next);
      setError(false);

      if (next.length === 4) {
        if (next === targetPin) {
          onUnlock();
        } else {
          setError(true);
          showToast('رمز PIN غير صحيح');
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FE] text-[#0D467D] p-6 animate-fadeIn">
      <div className="w-full max-w-xs flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#0D467D] text-white flex items-center justify-center shadow-xl shadow-[#0D467D]/25">
          <Lock className="w-8 h-8 text-sky-200" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#0D467D]">تطبيق دارلي مؤمن</h2>
          <p className="text-xs text-slate-500 mt-1">أدخل رمز المرور PIN المكون من 4 أرقام للمتابعة</p>
        </div>

        {/* PIN Dots */}
        <div className="flex items-center justify-center gap-4 my-2">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  error
                    ? 'bg-red-500 animate-shake'
                    : isFilled
                    ? 'bg-[#0D467D] scale-110'
                    : 'bg-slate-300'
                }`}
              />
            );
          })}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handlePress(digit)}
              className="w-16 h-16 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-xl font-extrabold text-[#0D467D] shadow-xs border border-slate-200 flex items-center justify-center cursor-pointer transition-all mx-auto"
            >
              {digit}
            </button>
          ))}
          <div />
          <button
            onClick={() => handlePress('0')}
            className="w-16 h-16 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-xl font-extrabold text-[#0D467D] shadow-xs border border-slate-200 flex items-center justify-center cursor-pointer transition-all mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-slate-500 shadow-xs border border-slate-200 flex items-center justify-center cursor-pointer transition-all mx-auto"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          الرمز الافتراضي للتجربة: <span className="font-bold text-slate-600">{targetPin}</span>
        </p>
      </div>
    </div>
  );
};
