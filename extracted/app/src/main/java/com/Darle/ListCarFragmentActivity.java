package com.Darle;

import android.animation.*;
import android.app.*;
import android.app.Activity;
import android.content.*;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.*;
import android.graphics.*;
import android.graphics.Typeface;
import android.graphics.drawable.*;
import android.media.*;
import android.net.*;
import android.net.Uri;
import android.os.*;
import android.os.Bundle;
import android.text.*;
import android.text.style.*;
import android.util.*;
import android.view.*;
import android.view.View;
import android.view.View.*;
import android.view.animation.*;
import android.webkit.*;
import android.widget.*;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.github.mikephil.charting.*;
import com.google.android.material.card.*;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.io.InputStream;
import java.text.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.regex.*;
import org.json.*;
import android.view.inputmethod.InputMethodManager;

public class ListCarFragmentActivity extends Fragment {
	
	private FloatingActionButton _fab;
	private HashMap<String, Object> map = new HashMap<>();
	private String Done = "";
	
	private ArrayList<HashMap<String, Object>> listmap = new ArrayList<>();
	
	private LinearLayout linear14;
	private LinearLayout linear17;
	private TextView textview20;
	private TextView txt_product_count;
	private MaterialCardView cardview2;
	private EditText et_search;
	private ListView listview2;
	private ImageView imageview1;
	private LinearLayout linear18;
	private LinearLayout linear19;
	private TextView textview22;
	private TextView textview21;
	private TextView txt_total_stock;
	
	private SharedPreferences sh;
	private AlertDialog customDialogs;
	private Calendar cal = Calendar.getInstance();
	private SharedPreferences ton;
	private Intent in = new Intent();
	
	@NonNull
	@Override
	public View onCreateView(@NonNull LayoutInflater _inflater, @Nullable ViewGroup _container, @Nullable Bundle _savedInstanceState) {
		View _view = _inflater.inflate(R.layout.list_car_fragment, _container, false);
		initialize(_savedInstanceState, _view);
		initializeLogic();
		return _view;
	}
	
	private void initialize(Bundle _savedInstanceState, View _view) {
		_fab = _view.findViewById(R.id._fab);
		linear14 = _view.findViewById(R.id.linear14);
		linear17 = _view.findViewById(R.id.linear17);
		textview20 = _view.findViewById(R.id.textview20);
		txt_product_count = _view.findViewById(R.id.txt_product_count);
		cardview2 = _view.findViewById(R.id.cardview2);
		et_search = _view.findViewById(R.id.et_search);
		listview2 = _view.findViewById(R.id.listview2);
		imageview1 = _view.findViewById(R.id.imageview1);
		linear18 = _view.findViewById(R.id.linear18);
		linear19 = _view.findViewById(R.id.linear19);
		textview22 = _view.findViewById(R.id.textview22);
		textview21 = _view.findViewById(R.id.textview21);
		txt_total_stock = _view.findViewById(R.id.txt_total_stock);
		sh = getContext().getSharedPreferences("sh", Activity.MODE_PRIVATE);
		ton = getContext().getSharedPreferences("ton", Activity.MODE_PRIVATE);
		
		listview2.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> _param1, View _param2, int _param3, long _param4) {
				final int _position = _param3;
				// اسم السائق
				in.putExtra(
				"driver",
				listmap.get((int)_position).get("title").toString()
				.replace("/اسم السائق", "")
				.trim()
				);
				
				// كمية الطن
				in.putExtra(
				"tons",
				listmap.get((int)_position).get("dates").toString()
				.replace("/", "")
				.trim()
				);
				
				// التاريخ والوقت
				in.putExtra(
				"date",
				listmap.get((int)_position).get("time").toString()
				.replace("/التاريخ-الوقت", "")
				.trim()
				);
				
				
				// ================================
				// السعر / حالة الدفع
				// ================================
				
				String mapsValue = listmap.get((int)_position).get("maps").toString().trim();
				
				if (mapsValue.contains("Done")) {
					
					// إذا كانت Done موجودة
					// لا نرسل السعر في price
					// ونرسل الحالة خالص في status
					
					in.putExtra(
					"status",
					"خالص"
					);
					
				} else {
					
					// إذا كانت Done غير موجودة
					// نرسل السعر في price
					in.putExtra(
					"status",
					"لم يتم الدفع "
					);
					in.putExtra(
					"price",
					mapsValue
					);
				}
				
				
				// نوع البضاعة
				in.putExtra(
				"product",
				listmap.get((int)_position).get("Category").toString()
				.trim()
				);
				
				
				// فتح صفحة معلومات الحمولة
				in.setClass(
				getContext().getApplicationContext(),
				ShipmentInformationActivity.class
				);
				
				startActivity(in);
			}
		});
		
		listview2.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
			@Override
			public boolean onItemLongClick(AdapterView<?> _param1, View _param2, int _param3, long _param4) {
				final int _position = _param3;
				listmap.remove((int)(_position));
				sh.edit().putString("date", new Gson().toJson(listmap)).commit();
				((BaseAdapter)listview2.getAdapter()).notifyDataSetChanged();
				return true;
			}
		});
		
		_fab.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				// ================================================
				// إنشاء Dialog
				// ================================================
				
				customDialogs =
				new AlertDialog.Builder(getActivity()).create();
				
				
				// ================================================
				// إنشاء LayoutInflater
				// ================================================
				
				LayoutInflater customDialogsLI =
				LayoutInflater.from(getActivity());
				
				
				// ================================================
				// تحميل واجهة الـDialog
				// ================================================
				
				View customDialogsCV =
				customDialogsLI.inflate(
				R.layout.edittext,
				null
				);
				
				customDialogs.setView(customDialogsCV);
				
				customDialogs.setCancelable(false);
				
				
				// ================================================
				// تعريف عناصر الـDialog
				// ================================================
				
				// اسم المنتج
				final EditText edit1 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext1
				);
				
				// الكمية
				final EditText edit2 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext2
				);
				
				// سعر الشراء
				final EditText edit3 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext3
				);
				
				// الوحدة
				final EditText edit4 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext4
				);
				
				// سعر البيع
				final EditText edit5 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext5
				);
				
				// التصنيف
				final EditText edit6 =
				(EditText) customDialogsCV.findViewById(
				R.id.edittext6
				);
				
				// زر الإغلاق
				final TextView closeButton =
				(TextView) customDialogsCV.findViewById(
				R.id.btn_close
				);
				
				// زر إضافة المنتج
				final TextView addButton =
				(TextView) customDialogsCV.findViewById(
				R.id.button2
				);
				
				
				// ================================================
				// تغيير شكل حقول الإدخال
				// ================================================
				
				edit1.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				edit2.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				edit3.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				edit4.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				edit5.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				edit6.setBackground(
				new android.graphics.drawable.GradientDrawable() {
					
					public android.graphics.drawable.GradientDrawable getIns(
					int radius,
					int color
					) {
						
						this.setCornerRadius(radius);
						this.setColor(color);
						
						return this;
					}
					
				}.getIns(
				50,
				0xFFF3F6FA
				)
				);
				
				
				// ================================================
				// تفعيل حقول الإدخال
				// ================================================
				
				edit1.setEnabled(true);
				edit1.setFocusable(true);
				edit1.setFocusableInTouchMode(true);
				
				edit2.setEnabled(true);
				edit2.setFocusable(true);
				edit2.setFocusableInTouchMode(true);
				
				edit3.setEnabled(true);
				edit3.setFocusable(true);
				edit3.setFocusableInTouchMode(true);
				
				edit4.setEnabled(true);
				edit4.setFocusable(true);
				edit4.setFocusableInTouchMode(true);
				
				edit5.setEnabled(true);
				edit5.setFocusable(true);
				edit5.setFocusableInTouchMode(true);
				
				edit6.setEnabled(true);
				edit6.setFocusable(true);
				edit6.setFocusableInTouchMode(true);
				
				
				// ================================================
				// زر إغلاق Dialog
				// ================================================
				
				closeButton.setOnClickListener(
				new View.OnClickListener() {
					
					@Override
					public void onClick(View _view) {
						
						customDialogs.dismiss();
						
					}
				}
				);
				
				
				// ================================================
				// زر إضافة المنتج
				// ================================================
				
				addButton.setOnClickListener(
				new View.OnClickListener() {
					
					@Override
					public void onClick(View _view) {
						
						
						// ========================================
						// قراءة البيانات
						// ========================================
						
						String productName =
						edit1.getText().toString().trim();
						
						String quantity =
						edit2.getText().toString().trim();
						
						String buyPrice =
						edit3.getText().toString().trim();
						
						String unit =
						edit4.getText().toString().trim();
						
						String sellPrice =
						edit5.getText().toString().trim();
						
						String category =
						edit6.getText().toString().trim();
						
						
						// ========================================
						// التحقق من اسم المنتج
						// ========================================
						
						if (productName.equals("")) {
							
							edit1.setError("أدخل اسم المنتج");
							edit1.requestFocus();
							
							return;
						}
						
						
						// ========================================
						// التحقق من الكمية
						// ========================================
						
						if (quantity.equals("")) {
							
							edit2.setError("أدخل الكمية");
							edit2.requestFocus();
							
							return;
						}
						
						
						// ========================================
						// التحقق من الوحدة
						// ========================================
						
						if (unit.equals("")) {
							
							edit4.setError("أدخل الوحدة");
							edit4.requestFocus();
							
							return;
						}
						
						
						// ========================================
						// التحقق من سعر الشراء
						// ========================================
						
						if (buyPrice.equals("")) {
							
							edit3.setError("أدخل سعر الشراء");
							edit3.requestFocus();
							
							return;
						}
						
						
						// ========================================
						// التحقق من سعر البيع
						// ========================================
						
						if (sellPrice.equals("")) {
							
							edit5.setError("أدخل سعر البيع");
							edit5.requestFocus();
							
							return;
						}
						
						
						// ========================================
						// إنشاء Map
						// ========================================
						
						map = new HashMap<>();
						
						
						// ========================================
						// اسم المنتج
						// ========================================
						
						map.put(
						"title",
						productName
						);
						
						
						// ========================================
						// الكمية + الوحدة
						// ========================================
						
						map.put(
						"dates",
						quantity + " " + unit
						);
						
						
						// ========================================
						// سعر الشراء
						// ========================================
						
						map.put(
						"maps",
						buyPrice + "م.ج"
						);
						
						
						// ========================================
						// سعر البيع
						// ========================================
						
						map.put(
						"sell_price",
						sellPrice + "م.ج"
						);
						
						
						// ========================================
						// الوحدة
						// ========================================
						
						map.put(
						"unit",
						unit
						);
						
						
						// ========================================
						// الكمية الرقمية
						// ========================================
						
						map.put(
						"quantity",
						quantity
						);
						
						
						// ========================================
						// التصنيف
						// ========================================
						
						map.put(
						"Category",
						category
						);
						
						
						// ========================================
						// التاريخ والوقت
						// ========================================
						
						String currentTime =
						new SimpleDateFormat(
						"dd/MM/yyyy - hh:mm a",
						java.util.Locale.getDefault()
						).format(
						Calendar.getInstance().getTime()
						);
						
						map.put(
						"time",
						currentTime
						);
						
						
						// ========================================
						// إضافة المنتج في بداية القائمة
						// ========================================
						
						listmap.add(
						0,
						map
						);
						
						
						// ========================================
						// حساب إجمالي الكمية
						// ========================================
						
						double totalQuantity = 0;
						
						for (
						int i = 0;
						i < listmap.size();
						i++
						) {
							
							try {
								
								String quantityText =
								listmap.get(i)
								.get("quantity")
								.toString();
								
								quantityText =
								quantityText
								.replace(",", ".")
								.trim();
								
								double value =
								Double.parseDouble(
								quantityText
								);
								
								totalQuantity += value;
								
							} catch (Exception e) {
								
								// تجاهل القيمة غير الصالحة
								
							}
						}
						
						
						// ========================================
						// حساب إجمالي أسعار الشراء
						// ========================================
						
						double totalBuyMoney = 0;
						
						for (
						int i = 0;
						i < listmap.size();
						i++
						) {
							
							try {
								
								String moneyText =
								listmap.get(i)
								.get("maps")
								.toString();
								
								moneyText =
								moneyText
								.replace("م.ج", "")
								.replace(",", ".")
								.replace(" ", "")
								.trim();
								
								double money =
								Double.parseDouble(
								moneyText
								);
								
								totalBuyMoney += money;
								
							} catch (Exception e) {
								
								// تجاهل القيمة غير الصالحة
								
							}
						}
						
						
						// ========================================
						// تحويل إجمالي الكمية إلى String
						// ========================================
						
						final String totalQuantityString;
						
						if (
						totalQuantity ==
						(long) totalQuantity
						) {
							
							totalQuantityString =
							String.valueOf(
							(long) totalQuantity
							);
							
						} else {
							
							totalQuantityString =
							String.valueOf(
							totalQuantity
							);
						}
						
						
						// ========================================
						// تحويل إجمالي المال إلى String
						// ========================================
						
						final String totalMoneyString;
						
						if (
						totalBuyMoney ==
						(long) totalBuyMoney
						) {
							
							totalMoneyString =
							String.valueOf(
							(long) totalBuyMoney
							);
							
						} else {
							
							totalMoneyString =
							String.valueOf(
							totalBuyMoney
							);
						}
						
						
						// ========================================
						// حفظ إجمالي الكمية
						// ========================================
						
						ton.edit()
						.putString(
						"n",
						totalQuantityString
						)
						.commit();
						
						
						// ========================================
						// حفظ إجمالي المال
						// ========================================
						
						ton.edit()
						.putString(
						"money",
						totalMoneyString + "م.ج"
						)
						.commit();
						
						
						// ========================================
						// حفظ القائمة كاملة
						// ========================================
						
						sh.edit()
						.putString(
						"date",
						new Gson().toJson(
						listmap
						)
						)
						.apply();
						
						
						// ========================================
						// حفظ إجمالي الكمية
						// ========================================
						
						sh.edit()
						.putString(
						"total_ton",
						totalQuantityString
						)
						.apply();
						
						
						// ========================================
						// حفظ إجمالي المال
						// ========================================
						
						sh.edit()
						.putString(
						"total_money",
						totalMoneyString + "م.ج"
						)
						.apply();
						
						
						// ========================================
						// تحديث ListView
						// ========================================
						
						listview2.setAdapter(
						new Listview2Adapter(
						listmap
						)
						);
						
						
						// ========================================
						// تحديث Adapter
						// ========================================
						
						if (
						listview2.getAdapter()
						instanceof BaseAdapter
						) {
							
							(
							(BaseAdapter)
							listview2.getAdapter()
							).notifyDataSetChanged();
							
						}
						
						
						// ========================================
						// إغلاق Dialog
						// ========================================
						
						customDialogs.dismiss();
						
					}
				}
				);
				
				
				// =================================================
				// إظهار Dialog
				// =================================================
				
				customDialogs.show();
				
				
				// =================================================
				// إعداد Window
				// =================================================
				
				if (customDialogs.getWindow() != null) {
					
					final android.view.Window window =
					customDialogs.getWindow();
					
					
					// =============================================
					// خلفية شفافة
					// =============================================
					
					window.setBackgroundDrawable(
					new android.graphics.drawable.ColorDrawable(
					android.graphics.Color.TRANSPARENT
					)
					);
					
					
					// =============================================
					// عرض الهاتف بالكامل
					// =============================================
					
					window.setLayout(
					android.view.WindowManager.LayoutParams.MATCH_PARENT,
					android.view.WindowManager.LayoutParams.WRAP_CONTENT
					);
					
					
					// =============================================
					// وضع Dialog أسفل الشاشة
					// =============================================
					
					window.setGravity(
					android.view.Gravity.BOTTOM
					);
					
					
					// =============================================
					// ضبط مكان Dialog
					// =============================================
					
					android.view.WindowManager.LayoutParams params =
					window.getAttributes();
					
					params.width =
					android.view.WindowManager.LayoutParams.MATCH_PARENT;
					
					params.height =
					android.view.WindowManager.LayoutParams.WRAP_CONTENT;
					
					params.gravity =
					android.view.Gravity.BOTTOM;
					
					params.x = 0;
					
					params.y = 0;
					
					window.setAttributes(params);
					
					
					// =============================================
					// Animation
					// =============================================
					
					window.setWindowAnimations(
					android.R.style.Animation_InputMethod
					);
					
					
					// =============================================
					// إعداد الكيبورد
					// =============================================
					
					window.setSoftInputMode(
					android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
					|
					android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE
					);
				}
				
				
				// =================================================
				// التركيز على اسم المنتج
				// =================================================
				
				edit1.requestFocus();
				
				edit1.setSelection(
				edit1.getText().length()
				);
				
				
				// =================================================
				// إظهار الكيبورد
				// =================================================
				
				edit1.postDelayed(
				new Runnable() {
					
					@Override
					public void run() {
						
						android.view.inputmethod.InputMethodManager imm =
						(android.view.inputmethod.InputMethodManager)
						getActivity()
						.getSystemService(
						Context.INPUT_METHOD_SERVICE
						);
						
						if (imm != null) {
							
							imm.showSoftInput(
							edit1,
							android.view.inputmethod.InputMethodManager.SHOW_IMPLICIT
							);
							
						}
						
					}
					
				},
				300
				);
				
				
				// =================================================
				// التأكد من الخلفية الشفافة
				// =================================================
				
				if (customDialogs.getWindow() != null) {
					
					customDialogs.getWindow().setBackgroundDrawable(
					new android.graphics.drawable.ColorDrawable(
					android.graphics.Color.TRANSPARENT
					)
					);
					
				}
				edit1.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF3F6FA));
				edit2.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF3F6FA));
				edit3.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF3F6FA));
				edit4.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF3F6FA));
			}
		});
	}
	
	private void initializeLogic() {
		if (!sh.getString("date", "").equals("")) {
			listmap = new Gson().fromJson(sh.getString("date", ""), new TypeToken<ArrayList<HashMap<String, Object>>>(){}.getType());
			listview2.setAdapter(new Listview2Adapter(listmap));
			((BaseAdapter)listview2.getAdapter()).notifyDataSetChanged();
		}
		_ui();
	}
	
	public void _ui() {
		
		int[] colorsCRNDO = {Color.parseColor("#FFFFFF"), Color.parseColor("#FEFEFE")};
		android.graphics.drawable.GradientDrawable CRNDO = new android.graphics.drawable.GradientDrawable(
		android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM, colorsCRNDO);
		CRNDO.setCornerRadius(25);
		CRNDO.setStroke(2, Color.parseColor("#DFDFDF"));
		listview2.setElevation(1f);
		listview2.setBackground(CRNDO);
		{
			android.graphics.drawable.GradientDrawable UiDesigner = new android.graphics.drawable.GradientDrawable();
			int d = (int) getContext().getApplicationContext().getResources().getDisplayMetrics().density;
			int clrs [] = {Color.parseColor("#FFF6F7FB"),Color.parseColor("#FFF6F7FB")};
			UiDesigner= new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP, clrs);
			UiDesigner.setCornerRadii(new float[]{
				d*20,d*20,d*20 ,d*20,d*20,d*20 ,d*20,d*20});
			UiDesigner.setStroke(d*1,Color.parseColor("#FFD2D2D2"));
			et_search.setElevation(d*0);
			android.graphics.drawable.RippleDrawable UiDesignerPro = new android.graphics.drawable.RippleDrawable(new android.content.res.ColorStateList(new int[][]{new int[]{}}, new int[]{Color.parseColor("#FFFFFFFF")}), UiDesigner, null);
			et_search.setBackground(UiDesignerPro);
			et_search.setClickable(true);
		}
	}
	
	public class Listview2Adapter extends BaseAdapter {
		
		ArrayList<HashMap<String, Object>> _data;
		
		public Listview2Adapter(ArrayList<HashMap<String, Object>> _arr) {
			_data = _arr;
		}
		
		@Override
		public int getCount() {
			return _data.size();
		}
		
		@Override
		public HashMap<String, Object> getItem(int _index) {
			return _data.get(_index);
		}
		
		@Override
		public long getItemId(int _index) {
			return _index;
		}
		
		@Override
		public View getView(final int _position, View _v, ViewGroup _container) {
			LayoutInflater _inflater = getActivity().getLayoutInflater();
			View _view = _v;
			if (_view == null) {
				_view = _inflater.inflate(R.layout.list, null);
			}
			
			final androidx.cardview.widget.CardView cardview2 = _view.findViewById(R.id.cardview2);
			final LinearLayout click = _view.findViewById(R.id.click);
			final RelativeLayout relativelayout2 = _view.findViewById(R.id.relativelayout2);
			final LinearLayout linear11 = _view.findViewById(R.id.linear11);
			final LinearLayout linear14 = _view.findViewById(R.id.linear14);
			final LinearLayout linear17 = _view.findViewById(R.id.linear17);
			final LinearLayout linear21 = _view.findViewById(R.id.linear21);
			final TextView status = _view.findViewById(R.id.status);
			final TextView textview_date = _view.findViewById(R.id.textview_date);
			final TextView textview30 = _view.findViewById(R.id.textview30);
			final LinearLayout linear13 = _view.findViewById(R.id.linear13);
			final LinearLayout linear12 = _view.findViewById(R.id.linear12);
			final TextView textview8 = _view.findViewById(R.id.textview8);
			final TextView textview1 = _view.findViewById(R.id.textview1);
			final TextView textview7 = _view.findViewById(R.id.textview7);
			final TextView textview_n = _view.findViewById(R.id.textview_n);
			final LinearLayout linear16 = _view.findViewById(R.id.linear16);
			final LinearLayout linear15 = _view.findViewById(R.id.linear15);
			final TextView textview10 = _view.findViewById(R.id.textview10);
			final TextView textview_timer = _view.findViewById(R.id.textview_timer);
			final TextView textview9 = _view.findViewById(R.id.textview9);
			final TextView textview5 = _view.findViewById(R.id.textview5);
			final TextView delete = _view.findViewById(R.id.delete);
			final View view18 = _view.findViewById(R.id.view18);
			final TextView edit = _view.findViewById(R.id.edit);
			
			textview_date.setText(listmap.get((int)_position).get("title").toString());
			textview1.setText(listmap.get((int)_position).get("dates").toString());
			textview_timer.setText(listmap.get((int)_position).get("time").toString());
			textview_n.setText(listmap.get((int)_position).get("maps").toString());
			Animation animation; animation = AnimationUtils.loadAnimation( getContext().getApplicationContext(), android.R.anim.slide_in_left ); animation.setDuration(100); click.startAnimation(animation); animation = null;
			textview_n.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View _view) {
					
					if (listmap.get((int)_position).containsKey("maps")) {
						
						if (!sh.getString("date", "").equals("")) {
							
							// تعديل نفس العنصر بدون add أو remove
							listmap.get((int)_position).put(
							"maps",
							"Done"
							);
							
							// تحديث النص مباشرة
							textview_n.setText("Done");
							
							// تغيير الخلفية
							textview_n.setBackground(
							new GradientDrawable() {
								public GradientDrawable getIns(int a, int b) {
									this.setCornerRadius(a);
									this.setColor(b);
									return this;
								}
							}.getIns((int)50, 0xFFE8EAF6)
							);
							
							textview_n.setTextColor(0xFF3D64A7);
							
							// حفظ القائمة
							sh.edit()
							.putString("date", new Gson().toJson(listmap))
							.commit();
							
							// تحديث الـ ListView
							((BaseAdapter)listview2.getAdapter()).notifyDataSetChanged();
						}
					}
				}
			});
			{
				android.graphics.drawable.GradientDrawable UiDesigner = new android.graphics.drawable.GradientDrawable();
				int d = (int) getContext().getApplicationContext().getResources().getDisplayMetrics().density;
				int clrs [] = {Color.parseColor("#FFECFDF5"),Color.parseColor("#FFECFDF5")};
				UiDesigner= new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP, clrs);
				UiDesigner.setCornerRadii(new float[]{
					d*18,d*18,d*18 ,d*18,d*18,d*18 ,d*18,d*18});
				UiDesigner.setStroke(d*1,Color.parseColor("#D2F9E4"));
				status.setElevation(d*0);
				android.graphics.drawable.RippleDrawable UiDesignerPro = new android.graphics.drawable.RippleDrawable(new android.content.res.ColorStateList(new int[][]{new int[]{}}, new int[]{Color.parseColor("#FFFFFFFF")}), UiDesigner, null);
				status.setBackground(UiDesignerPro);
				status.setClickable(false);
			}
			delete.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)35, 0xFFFFEBEE));
			status.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview30.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview_date.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview7.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview_n.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview8.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview1.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview9.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview5.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview10.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			textview_timer.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			delete.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			edit.setTypeface(Typeface.createFromAsset(getContext().getAssets(),"fonts/ont_bold.ttf"), 0);
			
			return _view;
		}
	}
}