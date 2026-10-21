import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, GoodsMovementItem, NoteItem, CalendarEventItem, AppSettings } from '../types';

interface AppContextType {
  // Navigation
  activeTab: number;
  setActiveTab: (tab: number) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedProductForView: ProductItem | null;
  setSelectedProductForView: (product: ProductItem | null) => void;

  // Data
  products: ProductItem[];
  movements: GoodsMovementItem[];
  notes: NoteItem[];
  calendarEvents: CalendarEventItem[];
  settings: AppSettings;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Metrics
  totalStockQuantity: number;
  totalRevenues: number;
  totalExpenses: number;
  netVaultBalance: number;
  activeClientsCount: number;
  totalOperationsCount: number;

  // Actions - Products
  addProduct: (product: Omit<ProductItem, 'id' | 'time'>) => void;
  updateProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Actions - Movements
  addMovement: (movement: Omit<GoodsMovementItem, 'id' | 'date'>) => void;
  deleteMovement: (id: string) => void;

  // Actions - Notes
  addNote: (title: string, content?: string) => void;
  updateNote: (id: string, title: string, content?: string) => void;
  deleteNote: (id: string) => void;

  // Actions - Calendar
  addCalendarEvent: (event: Omit<CalendarEventItem, 'id'>) => void;
  deleteCalendarEvent: (id: string) => void;
  toggleCalendarEventCompleted: (id: string) => void;

  // Actions - Settings & Data Management
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  exportDataCSV: () => void;
  resetAllData: () => void;

  // Notifications
  notification: string | null;
  showToast: (message: string) => void;
}

const defaultSettings: AppSettings = {
  companyName: 'شركة دارلي لإدارة المخازن والمبيعات',
  userName: 'أحمد محمد فراج',
  phone: '07701234567',
  currency: 'د.ع',
  lowStockLimit: 10,
  lowStockAlert: true,
  darkMode: false,
  appLockEnabled: false,
  appPin: '1234',
  defaultUnit: 'طن',
};

const initialProducts: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'حديد تسليح 12 ملم عالي المتانة',
    dates: '15 طن',
    maps: '850,000 د.ع',
    sell_price: '920,000 د.ع',
    unit: 'طن',
    quantity: 15,
    Category: 'حديد وبناء',
    time: '26/10/2026 - 10:30 ص',
    driver: 'أبو فهد العراقي',
    truckNumber: 'بغداد 4821',
    status: 'خالص',
    destination: 'موقع مشروع الأمل السكني',
    notes: 'شحنة نخب أول، مطابقة للمواصفات العراقية القياسية.',
  },
  {
    id: 'prod-2',
    title: 'إسمنت بورتلاندي مقاوم للأملاح',
    dates: '25 طن',
    maps: '110,000 د.ع',
    sell_price: '125,000 د.ع',
    unit: 'طن',
    quantity: 25,
    Category: 'إسمنت',
    time: '25/10/2026 - 08:15 ص',
    driver: 'كرار جاسم',
    truckNumber: 'بابل 1904',
    status: 'خالص',
    destination: 'مخزن رقم 2 - الجناح الأوسط',
    notes: 'تخزين في مكان جاف ومعزول عن الرطوبة.',
  },
  {
    id: 'prod-3',
    title: 'رمل سيليكا مغسول خشن',
    dates: '30 طن',
    maps: '45,000 د.ع',
    sell_price: '60,000 د.ع',
    unit: 'طن',
    quantity: 30,
    Category: 'مواد أولية',
    time: '24/10/2026 - 02:40 م',
    driver: 'حيدر علي الربيعي',
    truckNumber: 'النجف 7712',
    status: 'لم يتم الدفع',
    destination: 'شركة الإعمار الحديث',
    notes: 'متبقي دفعة بقيمة 1,350,000 د.ع تستحق نهاية الأسبوع.',
  },
  {
    id: 'prod-4',
    title: 'حصى مكسر نمرة 1 ممتاز',
    dates: '20 طن',
    maps: '55,000 د.ع',
    sell_price: '70,000 د.ع',
    unit: 'طن',
    quantity: 20,
    Category: 'مواد أولية',
    time: '23/10/2026 - 11:20 ص',
    driver: 'عمر طارق',
    truckNumber: 'الأنبار 3105',
    status: 'خالص',
    destination: 'ساحة التخزين الخارجية',
  },
  {
    id: 'prod-5',
    title: 'طابوق جمهوري أحمر معزول',
    dates: '8 طن',
    maps: '180,000 د.ع',
    sell_price: '210,000 د.ع',
    unit: 'طن',
    quantity: 8,
    Category: 'طابوق',
    time: '22/10/2026 - 04:10 م',
    driver: 'محمد سعيد',
    truckNumber: 'كربلاء 5520',
    status: 'لم يتم الدفع',
    destination: 'ورشة البناء المركزية',
    notes: 'تحت حد المخزون المنخفض (أقل من 10 طن).',
  },
  {
    id: 'prod-6',
    title: 'سيراميك أرضيات 60x60 نخب أول',
    dates: '12 طن',
    maps: '320,000 د.ع',
    sell_price: '390,000 د.ع',
    unit: 'طن',
    quantity: 12,
    Category: 'سيراميك وإنهاءات',
    time: '20/10/2026 - 09:50 ص',
    driver: 'علي مهدي الزبيدي',
    truckNumber: 'البصرة 8431',
    status: 'خالص',
    destination: 'معرض دارلي المركزي',
  },
];

const initialMovements: GoodsMovementItem[] = [
  {
    id: 'mov-1',
    type: 'تحويل',
    amount: -50,
    amountText: '-50 د.ع',
    party: 'الطرف: bb nn',
    date: '26 سبتمبر 2026 · 10:41 م',
    notes: 'تحويل عمولة وتسوية فروق صندوقية سريعة',
    icon: '↔',
  },
  {
    id: 'mov-2',
    type: 'بيع',
    amount: 4750000,
    amountText: '+4,750,000 د.ع',
    party: 'شركة الإعمار الحديث',
    quantity: 'الكمية: 5 طن',
    product: 'حديد تسليح عالي المتانة',
    date: '26 سبتمبر 2026 · 6:15 ص',
    notes: 'فاتورة مبيعات رقم #1084 - تم الدفع نقداً',
    icon: '🛒',
  },
  {
    id: 'mov-3',
    type: 'شراء',
    amount: -8500000,
    amountText: '-8,500,000 د.ع',
    party: 'مجزر الحديد العام ومصنع الصلب',
    quantity: 'الكمية: 10 طن',
    product: 'خامات حديد وقضبان بناء',
    date: '24 سبتمبر 2026 · 4:15 ص',
    notes: 'شراء دفعة استراتيجية لتدعيم رصيد المخزن',
    icon: '▣',
  },
  {
    id: 'mov-4',
    type: 'مصروف',
    amount: -350000,
    amountText: '-350,000 د.ع',
    party: 'أجور نقل ووقود الشاحنات',
    date: '23 سبتمبر 2026 · 11:15 ص',
    notes: 'تفويل وصيانة دورية لأسطول سيارات النقل 3105 و 4821',
    icon: '▤',
  },
  {
    id: 'mov-5',
    type: 'بيع',
    amount: 2200000,
    amountText: '+2,200,000 د.ع',
    party: 'مقاولات الفرات الأوسط',
    quantity: 'الكمية: 18 طن',
    product: 'إسمنت بورتلاندي',
    date: '22 سبتمبر 2026 · 2:30 م',
    notes: 'تسليم في موقع جسر الكوفة',
    icon: '🛒',
  },
  {
    id: 'mov-6',
    type: 'إضافة',
    amount: 0,
    amountText: '+15 طن',
    party: 'توريد مصنع السندباد',
    quantity: 'الكمية: 15 طن',
    product: 'رمل سيليكا مغسول',
    date: '20 سبتمبر 2026 · 9:00 ص',
    notes: 'استلام وفحص مخزني سليم',
    icon: '▣',
  },
  {
    id: 'mov-7',
    type: 'خروج',
    amount: 0,
    amountText: '-5 طن',
    party: 'مكتب الرشيد الهندسي',
    quantity: 'الكمية: 5 طن',
    product: 'طابوق جمهوري أحمر',
    date: '19 سبتمبر 2026 · 3:20 م',
    notes: 'صرف بضاعة وفق إذن الإخراج رقم #99',
    icon: '▤',
  },
];

const initialNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'مراجعة دفعة حديد التسليح وتأكيد استلام الوزن على القبان المعتمد.',
    content: 'يجب التأكد من شهادة المنشأ ورقم الصهر ومطابقة وزن الشاحنة فارغة ومحملة.',
    time: '10:00 ص',
    category: 'المخزن',
  },
  {
    id: 'note-2',
    title: 'التواصل مع السائق كرار لتفريغ حمولة الإسمنت في مخزن رقم 2.',
    content: 'تأكيد وصول الشاحنة في الموعد لتفادي ازدحام البوابة وتجهيز الرافعة الشوكية.',
    time: '11:30 ص',
    category: 'السيارات',
  },
  {
    id: 'note-3',
    title: 'تجهيز كشف حساب شركة الإعمار الحديث قبل نهاية الأسبوع.',
    content: 'مراجعة المبالغ المستحقة وإرسال إشعار الدفع عبر الواتساب للمحاسب.',
    time: '01:15 م',
    category: 'المالية',
  },
  {
    id: 'note-4',
    title: 'جرد دوري لقسم الطابوق والسيراميك والتأكد من عدم وجود كسر.',
    content: 'تسجيل التالف إن وجد في سجل الهوالك لمطابقة الرصيد الدفتري.',
    time: '04:45 م',
    category: 'جرد',
  },
];

const initialEvents: CalendarEventItem[] = [
  {
    id: 'ev-1',
    title: 'وصول شاحنة حديد تسليح 15 طن',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 ص',
    type: 'شحنة',
    driver: 'أبو فهد العراقي',
    notes: 'تفريغ في الساحة الجنوبية',
    completed: false,
  },
  {
    id: 'ev-2',
    title: 'موعد تحصيل دفعة شركة الإعمار (1,350,000 د.ع)',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '01:00 م',
    type: 'موعد دفع',
    notes: 'استلام شيك أو تحويل بنكي',
    completed: false,
  },
  {
    id: 'ev-3',
    title: 'جرد مخزني أسبوعي شامل',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    time: '04:00 م',
    type: 'جرد',
    notes: 'مطابقة الأرصدة مع أمين المستودع',
    completed: false,
  },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProductForView, setSelectedProductForView] = useState<ProductItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // Persistent States
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('darle_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [movements, setMovements] = useState<GoodsMovementItem[]>(() => {
    try {
      const saved = localStorage.getItem('darle_movements');
      return saved ? JSON.parse(saved) : initialMovements;
    } catch {
      return initialMovements;
    }
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('darle_notes');
      return saved ? JSON.parse(saved) : initialNotes;
    } catch {
      return initialNotes;
    }
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEventItem[]>(() => {
    try {
      const saved = localStorage.getItem('darle_calendar');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('darle_settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('darle_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('darle_movements', JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    localStorage.setItem('darle_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('darle_calendar', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('darle_settings', JSON.stringify(settings));
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  // Calculations
  const totalStockQuantity = products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);

  // Calculate Revenues (مبيعات + إيرادات)
  const totalRevenues = movements
    .filter((m) => m.amount > 0)
    .reduce((acc, m) => acc + m.amount, 0) || 6950000;

  // Calculate Expenses (مشتريات + مصاريف)
  const totalExpenses = Math.abs(
    movements
      .filter((m) => m.amount < 0)
      .reduce((acc, m) => acc + m.amount, 0)
  ) || 8850000;

  // Vault Balance
  const netVaultBalance = totalRevenues - totalExpenses; // or -50 if starting with mock

  // Unique clients and total operations
  const activeClientsCount = new Set([
    ...products.map((p) => p.destination || p.driver).filter(Boolean),
    ...movements.map((m) => m.party).filter(Boolean),
  ]).size || 12;

  const totalOperationsCount = movements.length + products.length;

  // Product Actions
  const addProduct = (item: Omit<ProductItem, 'id' | 'time'>) => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString('ar-EG')} - ${now.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newProd: ProductItem = {
      ...item,
      id: `prod-${Date.now()}`,
      time: timeStr,
    };

    setProducts([newProd, ...products]);

    // Also record movement
    const newMovement: GoodsMovementItem = {
      id: `mov-${Date.now()}`,
      type: 'إضافة',
      amount: 0,
      amountText: `+${item.quantity} ${item.unit}`,
      party: item.driver ? `السائق: ${item.driver}` : (item.destination || 'توريد جديد للمخزن'),
      quantity: `${item.quantity} ${item.unit}`,
      product: item.title,
      date: `${now.toLocaleDateString('ar-EG')} · ${now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`,
      notes: `إضافة منتج جديد للمخزن (${item.Category})`,
      icon: '▣',
    };
    setMovements([newMovement, ...movements]);

    showToast(`تمت إضافة "${item.title}" إلى المخزن بنجاح`);
  };

  const updateProduct = (id: string, updated: Partial<ProductItem>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('تم تحديث بيانات المنتج بنجاح');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts(products.filter((p) => p.id !== id));
    showToast(`تم حذف ${prod?.title || 'المنتج'} من المخزن`);
  };

  // Movement Actions
  const addMovement = (mov: Omit<GoodsMovementItem, 'id' | 'date'>) => {
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('ar-EG')} · ${now.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newMov: GoodsMovementItem = {
      ...mov,
      id: `mov-${Date.now()}`,
      date: dateStr,
    };

    setMovements([newMov, ...movements]);
    showToast(`تم تسجيل عملية ${mov.type} بنجاح`);
  };

  const deleteMovement = (id: string) => {
    setMovements(movements.filter((m) => m.id !== id));
    showToast('تم حذف الحركة بنجاح');
  };

  // Notes Actions
  const addNote = (title: string, content = '') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title,
      content,
      time: timeStr,
    };
    setNotes([newNote, ...notes]);
    showToast('تم حفظ الملاحظة بنجاح');
  };

  const updateNote = (id: string, title: string, content = '') => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, title, content } : n)));
    showToast('تم تعديل الملاحظة');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    showToast('تم حذف الملاحظة');
  };

  // Calendar Actions
  const addCalendarEvent = (ev: Omit<CalendarEventItem, 'id'>) => {
    const newEvent: CalendarEventItem = {
      ...ev,
      id: `ev-${Date.now()}`,
      completed: false,
    };
    setCalendarEvents([newEvent, ...calendarEvents]);
    showToast('تم جدولة الموعد في التقويم');
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(calendarEvents.filter((e) => e.id !== id));
    showToast('تم حذف الموعد من التقويم');
  };

  const toggleCalendarEventCompleted = (id: string) => {
    setCalendarEvents(
      calendarEvents.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings({ ...settings, ...newSettings });
    showToast('تم حفظ الإعدادات بنجاح');
  };

  const exportDataJSON = () => {
    const data = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      products,
      movements,
      notes,
      calendarEvents,
      settings,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `darle_stock_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تنزيل النسخة الاحتياطية بنجاح');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.movements) setMovements(parsed.movements);
      if (parsed.notes) setNotes(parsed.notes);
      if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
      if (parsed.settings) setSettings(parsed.settings);
      showToast('تمت استعادة البيانات بنجاح!');
      return true;
    } catch {
      showToast('الملف غير صالح، يرجى اختيار ملف نسخة احتياطية صحيح');
      return false;
    }
  };

  const exportDataCSV = () => {
    const headers = ['المعرف', 'اسم المنتج/البضاعة', 'الكمية', 'الوحدة', 'سعر الشراء', 'سعر البيع', 'التصنيف', 'السائق', 'رقم الشاحنة', 'حالة الدفع', 'التاريخ والوقت'];
    const rows = products.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.quantity,
      p.unit,
      `"${p.maps}"`,
      `"${p.sell_price}"`,
      `"${p.Category}"`,
      `"${p.driver || ''}"`,
      `"${p.truckNumber || ''}"`,
      p.status,
      `"${p.time}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `darle_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('تم تصدير جدول البيانات بتنسيق CSV (Excel)');
  };

  const resetAllData = () => {
    setProducts(initialProducts);
    setMovements(initialMovements);
    setNotes(initialNotes);
    setCalendarEvents(initialEvents);
    setSettings(defaultSettings);
    showToast('تمت إعادة ضبط المصنع للبيانات');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedProductForView,
        setSelectedProductForView,
        products,
        movements,
        notes,
        calendarEvents,
        settings,
        searchQuery,
        setSearchQuery,
        totalStockQuantity,
        totalRevenues,
        totalExpenses,
        netVaultBalance,
        activeClientsCount,
        totalOperationsCount,
        addProduct,
        updateProduct,
        deleteProduct,
        addMovement,
        deleteMovement,
        addNote,
        updateNote,
        deleteNote,
        addCalendarEvent,
        deleteCalendarEvent,
        toggleCalendarEventCompleted,
        updateSettings,
        exportDataJSON,
        importDataJSON,
        exportDataCSV,
        resetAllData,
        notification,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
