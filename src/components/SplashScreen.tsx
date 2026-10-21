import React, { useEffect } from 'react';
import { Lottie } from 'lottie-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Auto-proceed after 2.4 seconds just like MainActivity.java
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FE] text-[#0D467D] p-6 animate-fadeIn">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* Animated Lottie Logo from edarat_almakhanzen_lottie_hq-1.json */}
        <div className="w-64 h-48 flex items-center justify-center">
          <Lottie
            src="/edarat_almakhanzen_lottie_hq-1.json"
            className="w-full h-full object-contain"
            autoplay
            loop
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D467D] to-[#1E609A] p-1.5 shadow-md shadow-[#0D467D]/20">
              <img src="/images/icon.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#0D467D] tracking-tight">
              Darle Stock
            </h1>
          </div>
          <p className="text-sm font-bold text-slate-500">
            إدارة المخازن والمبيعات وحركة الشاحنات
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-2 h-2 rounded-full bg-[#0D467D] animate-ping" />
          <span className="text-xs font-semibold text-slate-400">جاري تحميل البيانات...</span>
        </div>

        {/* Skip button for quick review */}
        <button
          onClick={onFinish}
          className="text-xs text-slate-400 hover:text-[#0D467D] underline pt-2 cursor-pointer"
        >
          تخطي العرض
        </button>
      </div>
    </div>
  );
};
