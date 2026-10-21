export interface ProductItem {
  id: string;
  title: string;        // اسم المنتج / البضاعة
  dates: string;        // الكمية مع الوحدة مثل '5 طن'
  maps: string;         // سعر الشراء مثل '850,000 د.ع' أو 'Done'
  sell_price: string;   // سعر البيع
  unit: string;         // الوحدة (طن، كجم، كيس، كرتونة، قطعة)
  quantity: number;     // الكمية كرقم للحسابات
  Category: string;     // التصنيف
  time: string;         // تاريخ الإضافة
  driver?: string;      // اسم السائق
  truckNumber?: string; // رقم الشاحنة
  status: 'خالص' | 'لم يتم الدفع' | 'مدفوع جزئياً'; // حالة الدفع
  notes?: string;       // ملاحظات إضافية
  destination?: string; // جهة التوصيل أو العميل
}

export interface GoodsMovementItem {
  id: string;
  type: 'بيع' | 'شراء' | 'تحويل' | 'مصروف' | 'إضافة' | 'خروج';
  amount: number;       // قيمة رقمية
  amountText: string;   // نص منسق مثل '+4,750,000 د.ع' أو '-50 د.ع'
  party: string;        // الطرف أو العميل أو المورد
  date: string;         // تاريخ ووقت الحركة
  quantity?: string;    // الكمية
  product?: string;     // اسم البضاعة
  notes?: string;       // بيان أو تفاصيل
  icon?: string;        // أيقونة ↔، 🛒، ▣، ▤
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  time: string;
  category?: string;
  color?: string;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  date: string;         // YYYY-MM-DD
  time: string;
  type: 'شحنة' | 'موعد دفع' | 'استلام بضاعة' | 'جرد' | 'ملاحظة';
  driver?: string;
  notes?: string;
  completed?: boolean;
}

export interface AppSettings {
  companyName: string;
  userName: string;
  phone: string;
  currency: string;
  lowStockLimit: number;
  lowStockAlert: boolean;
  darkMode: boolean;
  appLockEnabled: boolean;
  appPin: string;
  defaultUnit: string;
}

export interface VaultSummary {
  balance: number;
  totalExpenses: number;
  totalRevenues: number;
  clientsCount: number;
  operationsCount: number;
  totalStockQuantity: number;
}
