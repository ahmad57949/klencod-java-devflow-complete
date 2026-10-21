import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Settings,
  User,
  Package,
  Coins,
  Bell,
  Moon,
  Globe,
  Cloud,
  RotateCcw,
  Download,
  Lock,
  Info,
  Check,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const SettingModal: React.FC = () => {
  const {
    setActiveModal,
    settings,
    updateSettings,
    exportDataJSON,
    importDataJSON,
    exportDataCSV,
    resetAllData,
    showToast,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [userName, setUserName] = useState(settings.userName);
  const [phone, setPhone] = useState(settings.phone);
  const [lowStockLimit, setLowStockLimit] = useState(String(settings.lowStockLimit));
  const [currency, setCurrency] = useState(settings.currency);
  const [lowStockAlert, setLowStockAlert] = useState(settings.lowStockAlert);
  const [darkMode, setDarkMode] = useState(settings.darkMode);
  const [appLockEnabled, setAppLockEnabled] = useState(settings.appLockEnabled);
  const [appPin, setAppPin] = useState(settings.appPin);

  const [activeSection, setActiveSection] = useState<'main' | 'account' | 'stock' | 'currency' | 'pin'>('main');

  const currenciesList = [
    { code: 'د.ع', name: 'الدينار العراقي' },
    { code: 'ر.س', name: 'الريال السعودي' },
    { code: 'ج.م', name: 'الجنيه المصري' },
    { code: '$', name: 'الدولار الأمريكي' },
    { code: 'د.إ', name: 'الدرهم الإماراتي' },
    { code: 'د.ك', name: 'الدينار الكويتي' },
  ];

  const handleSaveProfile = () => {
    updateSettings({
      companyName,
      userName,
      phone,
    });
    setActiveSection('main');
  };

  const handleSaveStock = () => {
    const limit = parseInt(lowStockLimit, 10) || 10;
    updateSettings({ lowStockLimit: limit });
    setActiveSection('main');
  };

  const handleSelectCurrency = (currCode: string) => {
    setCurrency(currCode);
    updateSettings({ currency: currCode });
    setActiveSection('main');
  };

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    updateSettings({ darkMode: next });
  };

  const handleToggleAlert = () => {
    const next = !lowStockAlert;
    setLowStockAlert(next);
    updateSettings({ lowStockAlert: next });
  };

  const handleToggleLock = () => {
    const next = !appLockEnabled;
    setAppLockEnabled(next);
    updateSettings({ appLockEnabled: next });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#F7F8FC] w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header - matching setting.xml textview29 & textview30 */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#175A9C] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-white">الإعدادات</h2>
            <p className="text-xs text-sky-200">تخصيص التطبيق وإدارة البيانات</p>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Hidden File Input for Data Restore */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".json"
          className="hidden"
        />

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-slate-800">
          {activeSection === 'account' ? (
            /* Account Sub-form */
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-[#0D467D]">بيانات الحساب والمنشأة</h4>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  رجوع
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم الشركة / المنشأة
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم المدير / المسؤول
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رقم الهاتف للتواصل
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSection('main')}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold cursor-pointer"
                >
                  حفظ التعديلات
                </button>
              </div>
            </div>
          ) : activeSection === 'stock' ? (
            /* Stock Limit Sub-form */
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-[#0D467D]">إعدادات حد المخزون</h4>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  رجوع
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تحديد الحد الأدنى لكمية المخزون للتنبيه (بالأطنان)
                </label>
                <input
                  type="number"
                  value={lowStockLimit}
                  onChange={(e) => setLowStockLimit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-[#0D467D]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  عند وصول أي مادة إلى هذه الكمية أو أقل، سيتم إرسال تنبيه في الشاشة الرئيسية.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSaveStock}
                  className="px-6 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold cursor-pointer"
                >
                  تأكيد وحفظ
                </button>
              </div>
            </div>
          ) : activeSection === 'currency' ? (
            /* Currency Picker Sub-form */
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-[#0D467D]">اختيار العملة الافتراضية</h4>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  رجوع
                </button>
              </div>

              <div className="space-y-2">
                {currenciesList.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCurrency(c.code)}
                    className={`w-full p-3 rounded-2xl border text-right flex items-center justify-between transition-all cursor-pointer ${
                      currency === c.code
                        ? 'bg-sky-50 border-[#0D467D] text-[#0D467D] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs">{c.name} ({c.code})</span>
                    {currency === c.code && <Check className="w-4 h-4 text-[#0D467D]" />}
                  </button>
                ))}
              </div>
            </div>
          ) : activeSection === 'pin' ? (
            /* PIN Lock Sub-form */
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-[#0D467D]">رمز قفل التطبيق</h4>
                <button
                  onClick={() => setActiveSection('main')}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  رجوع
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رمز الحماية (4 أرقام)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={appPin}
                  onChange={(e) => setAppPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-center tracking-widest focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({ appPin });
                    setActiveSection('main');
                  }}
                  className="px-6 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold cursor-pointer"
                >
                  حفظ الرمز
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* Main Settings List - matching all cards in setting.xml   */
            /* ======================================================== */
            <>
              {/* 1. cardview7: الحساب (Account) */}
              <div
                onClick={() => setActiveSection('account')}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0D467D] flex items-center justify-center font-bold text-base border border-sky-100">
                    ♙
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0D467D] transition-colors">
                      الحساب والمنشأة
                    </h4>
                    <p className="text-xs text-slate-400">
                      {userName} · {companyName}
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0D467D]" />
              </div>

              {/* 2. cardview8: إعدادات المخزن (Warehouse Settings) */}
              <div
                onClick={() => setActiveSection('stock')}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-base border border-indigo-100">
                    ▣
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0D467D] transition-colors">
                      إعدادات المخزن
                    </h4>
                    <p className="text-xs text-slate-400">
                      حد المخزون المنخفض: {settings.lowStockLimit || 10} طن
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0D467D]" />
              </div>

              {/* 3. cardview9: العملة (Currency) */}
              <div
                onClick={() => setActiveSection('currency')}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base border border-emerald-100">
                    ﷼
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0D467D] transition-colors">
                      العملة الافتراضية
                    </h4>
                    <p className="text-xs text-slate-400">
                      العملة الحالية: {currency}
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0D467D]" />
              </div>

              {/* 4. cardview2: الإشعارات (Notifications) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-base border border-amber-100">
                      ♧
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        تنبيه المخزون المنخفض
                      </h4>
                      <p className="text-xs text-slate-400">
                        تنبيه فوري عند انخفاض كمية أي منتج
                      </p>
                    </div>
                  </div>
                  {/* Switch toggle */}
                  <button
                    onClick={handleToggleAlert}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      lowStockAlert ? 'bg-[#0D467D]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        lowStockAlert ? '-translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 5. cardview10: الوضع الليلي (Dark Mode) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-base border border-slate-200">
                    ☾
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      الوضع الليلي (Dark Mode)
                    </h4>
                    <p className="text-xs text-slate-400">
                      مظهر داكن ومريح للعين
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleDarkMode}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    darkMode ? 'bg-[#0D467D]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      darkMode ? '-translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 6. cardview11: اللغة (Language) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-base border border-teal-100">
                    A
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">اللغة</h4>
                    <p className="text-xs text-slate-400">اللغة العربية (افتراضي)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0D467D] bg-sky-50 px-2.5 py-1 rounded-lg">
                  العربية
                </span>
              </div>

              {/* 7. cardview12: النسخ الاحتياطي وتصدير البيانات (Backup & Export) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  إدارة وحفظ البيانات
                </h4>

                {/* Backup */}
                <button
                  onClick={exportDataJSON}
                  className="w-full p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between text-right cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Cloud className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#0D467D]">
                      النسخ الاحتياطي (تنزيل ملف JSON)
                    </span>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Restore */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between text-right cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#0D467D]">
                      استعادة البيانات (رفع ملف نسخة سابقة)
                    </span>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Export Excel */}
                <button
                  onClick={exportDataCSV}
                  className="w-full p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between text-right cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#0D467D]">
                      تصدير البيانات بصيغة Excel (CSV)
                    </span>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Download Complete Project ZIP */}
                <a
                  href="/Darle_Stock_Complete_App.zip"
                  download="Darle_Stock_Complete_App.zip"
                  className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 transition-colors flex items-center justify-between text-right cursor-pointer group no-underline"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        تحميل ملف التطبيق والمشروع بالكامل (ZIP)
                      </span>
                      <span className="text-[10px] text-emerald-700">
                        يشمل الكود المصدري، الخطوط، الصور، وحزمة الإنتاج (dist)
                      </span>
                    </div>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 text-emerald-600" />
                </a>
              </div>

              {/* 8. cardview13: قفل التطبيق (App Lock) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-base border border-rose-100">
                    ⌑
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      قفل التطبيق برمز PIN
                    </h4>
                    <p className="text-xs text-slate-400">
                      {appLockEnabled ? `الرمز مفعل: ••••` : 'غير مفعل'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {appLockEnabled && (
                    <button
                      onClick={() => setActiveSection('pin')}
                      className="text-xs font-bold text-[#0D467D] hover:underline cursor-pointer"
                    >
                      تغيير
                    </button>
                  )}
                  <button
                    onClick={handleToggleLock}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      appLockEnabled ? 'bg-[#0D467D]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        appLockEnabled ? '-translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 9. About Darle Stock Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D467D] to-[#1E609A] p-2 flex items-center justify-center shrink-0 shadow-md shadow-[#0D467D]/15">
                  <img src="/images/icon.png" alt="Darle Stock" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-extrabold text-[#0D467D]">
                    Darle Stock
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    إدارة المخزون والمبيعات وشاحنات النقل بسهولة
                  </p>
                  <span className="text-[11px] font-bold text-slate-400 mt-1 block">
                    الإصدار 1.0.0 · جاهز للرفع والإنتاج
                  </span>
                </div>
              </div>

              {/* Reset Data Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('هل تريد بالتأكيد إعادة ضبط المصنع ومسح كافة البيانات المدخلة؟')) {
                      resetAllData();
                    }
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  إعادة ضبط المصنع واستعادة البيانات الافتراضية
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
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
