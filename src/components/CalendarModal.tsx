import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  DollarSign,
  ClipboardList,
} from 'lucide-react';

export const CalendarModal: React.FC = () => {
  const { setActiveModal, calendarEvents, addCalendarEvent, deleteCalendarEvent, toggleCalendarEventCompleted } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // New Event Form State
  const [isAdding, setIsAdding] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('10:00 ص');
  const [eventType, setEventType] = useState<'شحنة' | 'موعد دفع' | 'استلام بضاعة' | 'جرد' | 'ملاحظة'>('شحنة');
  const [eventDriver, setEventDriver] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNamesArabic = [
    'يناير (كانون الثاني)',
    'فبراير (شباط)',
    'مارس (آذار)',
    'أبريل (نيسان)',
    'مايو (أيار)',
    'يونيو (حزيران)',
    'يوليو (تموز)',
    'أغسطس (آب)',
    'سبتمبر (أيلول)',
    'أكتوبر (تشرين الأول)',
    'نوفمبر (تشرين الثاني)',
    'ديسمبر (كانون الأول)',
  ];

  const daysOfWeek = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    addCalendarEvent({
      title: eventTitle.trim(),
      date: selectedDate,
      time: eventTime.trim(),
      type: eventType,
      driver: eventDriver.trim() || undefined,
      notes: eventNotes.trim() || undefined,
    });

    setEventTitle('');
    setEventDriver('');
    setEventNotes('');
    setIsAdding(false);
  };

  // Events on the selected day
  const eventsForSelectedDay = calendarEvents.filter((ev) => ev.date === selectedDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Header matching KalendarView */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <CalendarIcon className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">التقويم وجدول الشحنات</h3>
              <p className="text-xs text-sky-200">مواعيد وصول الشاحنات، استحقاقات الدفع، والجرد</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Calendar Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-[#F8F9FE] p-3 rounded-2xl border border-slate-100">
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-2xs cursor-pointer"
              title="الشهر التالي"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-sm font-bold text-[#0D467D]">
              {monthNamesArabic[month]} {year}
            </span>

            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-2xs cursor-pointer"
              title="الشهر السابق"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Days Grid */}
          <div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isSelected = selectedDate === dateKey;
                const isToday =
                  new Date().toISOString().split('T')[0] === dateKey;
                const hasEvents = calendarEvents.some((e) => e.date === dateKey);

                return (
                  <button
                    key={dayNum}
                    onClick={() => {
                      setSelectedDate(dateKey);
                      setIsAdding(false);
                    }}
                    className={`h-10 rounded-xl flex flex-col items-center justify-center relative text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D467D] text-white shadow-md shadow-[#0D467D]/25'
                        : isToday
                        ? 'bg-sky-100 text-[#0D467D] border border-sky-300'
                        : 'bg-[#F9FAFD] hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {hasEvents && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-amber-300' : 'bg-[#0D467D]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schedule for Selected Day */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700">
                مواعيد يوم: <span className="text-[#0D467D]">{selectedDate}</span>
              </h4>

              <button
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-1 text-xs font-bold text-[#0D467D] hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAdding ? 'إلغاء' : 'إضافة موعد'}</span>
              </button>
            </div>

            {/* Add Event Form */}
            {isAdding && (
              <form onSubmit={handleAddEventSubmit} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    عنوان الموعد / الشحنة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="مثال: وصول شاحنة حديد تسليح، تحصيل دفعة..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0D467D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      نوع الحدث
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold focus:outline-none"
                    >
                      <option value="شحنة">شحنة وصول / تفريغ</option>
                      <option value="موعد دفع">موعد سداد / تحصيل</option>
                      <option value="استلام بضاعة">استلام بضاعة</option>
                      <option value="جرد">جرد مخزني</option>
                      <option value="ملاحظة">ملاحظة عامة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      الوقت
                    </label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="10:30 ص"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    اسم السائق أو الطرف (اختياري)
                  </label>
                  <input
                    type="text"
                    value={eventDriver}
                    onChange={(e) => setEventDriver(e.target.value)}
                    placeholder="مثال: أبو فهد العراقي"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0D467D] text-white text-xs font-bold cursor-pointer"
                >
                  حفظ الموعد في التقويم
                </button>
              </form>
            )}

            {/* List of events for the date */}
            {eventsForSelectedDay.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                لا توجد مواعيد أو شحنات مجدولة لهذا اليوم
              </p>
            ) : (
              <div className="space-y-2">
                {eventsForSelectedDay.map((ev) => (
                  <div
                    key={ev.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                      ev.completed
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-[#F8F9FE] border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1">
                      <button
                        onClick={() => toggleCalendarEventCompleted(ev.id)}
                        className="cursor-pointer"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 ${
                            ev.completed ? 'text-emerald-600' : 'text-slate-300 hover:text-emerald-500'
                          }`}
                        />
                      </button>
                      <div>
                        <h5
                          className={`text-xs font-bold text-slate-800 ${
                            ev.completed ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {ev.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{ev.time}</span>
                          <span>• {ev.type}</span>
                          {ev.driver && <span>• السائق: {ev.driver}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteCalendarEvent(ev.id)}
                      className="p-1 rounded-lg text-slate-300 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
