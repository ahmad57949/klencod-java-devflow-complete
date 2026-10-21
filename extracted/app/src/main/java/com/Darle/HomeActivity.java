package com.Darle;

import android.animation.*;
import android.app.*;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.*;
import android.content.DialogInterface;
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
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.PagerAdapter;
import androidx.viewpager.widget.ViewPager;
import androidx.viewpager.widget.ViewPager.OnAdapterChangeListener;
import androidx.viewpager.widget.ViewPager.OnPageChangeListener;
import com.github.mikephil.charting.*;
import java.io.*;
import java.io.InputStream;
import java.text.*;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.*;
import org.json.*;

public class HomeActivity extends AppCompatActivity {
	
	private HashMap<String, Object> map = new HashMap<>();
	private String graph_data_string = "";
	
	private ArrayList<HashMap<String, Object>> graph_data = new ArrayList<>();
	
	private LinearLayout linear1;
	private RelativeLayout relativelayout3;
	private ViewPager viewpager1;
	private LinearLayout linear17;
	private LinearLayout linear36;
	private CardView cardview19;
	private LinearLayout linear37;
	private ImageView imageview23;
	private TextView textview29;
	private ImageView imageview22;
	private CardView cardview2;
	private LinearLayout linear19;
	private TextView textview24;
	private TextView textview26;
	private TextView textview25;
	
	private AlertDialog.Builder Dialog;
	private FragmentFragmentAdapter fragment;
	private SharedPreferences Date;
	private SharedPreferences sh;
	private Intent Int = new Intent();
	
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.home);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		linear1 = findViewById(R.id.linear1);
		relativelayout3 = findViewById(R.id.relativelayout3);
		viewpager1 = findViewById(R.id.viewpager1);
		linear17 = findViewById(R.id.linear17);
		linear36 = findViewById(R.id.linear36);
		cardview19 = findViewById(R.id.cardview19);
		linear37 = findViewById(R.id.linear37);
		imageview23 = findViewById(R.id.imageview23);
		textview29 = findViewById(R.id.textview29);
		imageview22 = findViewById(R.id.imageview22);
		cardview2 = findViewById(R.id.cardview2);
		linear19 = findViewById(R.id.linear19);
		textview24 = findViewById(R.id.textview24);
		textview26 = findViewById(R.id.textview26);
		textview25 = findViewById(R.id.textview25);
		Dialog = new AlertDialog.Builder(this);
		fragment = new FragmentFragmentAdapter(getApplicationContext(), getSupportFragmentManager());
		Date = getSharedPreferences("Date", Activity.MODE_PRIVATE);
		sh = getSharedPreferences("sh", Activity.MODE_PRIVATE);
		
		linear37.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				Int.setClass(getApplicationContext(), SettingActivity.class);
				startActivity(Int);
			}
		});
		
		textview24.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				textview24.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFF0D467D));
				textview24.setTextColor(0xFFEAF2FA);
				textview25.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview25.setTextColor(0xFF0D467D);
				textview26.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview26.setTextColor(0xFF0D467D);
				viewpager1.setCurrentItem(0, true);
			}
		});
		
		textview26.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				textview24.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview24.setTextColor(0xFF0D467D);
				textview25.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview25.setTextColor(0xFF0D467D);
				textview26.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFF0D467D));
				textview26.setTextColor(0xFFEAF2FA);
				viewpager1.setCurrentItem(1, true);
			}
		});
		
		textview25.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				textview24.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview24.setTextColor(0xFF0D467D);
				textview25.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFF0D467D));
				textview25.setTextColor(0xFFEAF2FA);
				textview26.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFEAF2FA));
				textview26.setTextColor(0xFF0D467D);
				viewpager1.setCurrentItem(2, true);
			}
		});
	}
	
	private void initializeLogic() {
		textview24.setTypeface(Typeface.createFromAsset(getAssets(),"fonts/ont_bold.ttf"), 1);
		textview25.setTypeface(Typeface.createFromAsset(getAssets(),"fonts/ont_bold.ttf"), 1);
		textview26.setTypeface(Typeface.createFromAsset(getAssets(),"fonts/ont_bold.ttf"), 1);
		textview24.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFF0D467D));
		textview24.setTextColor(0xFFE3F2FD);
		textview25.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)350, 0xFFE3F2FD));
		textview25.setTextColor(0xFF0D467D);
		fragment.setTabCount(3);
		viewpager1.setAdapter(fragment);
		fragment.notifyDataSetChanged();
	}
	
	public class FragmentFragmentAdapter extends FragmentStatePagerAdapter {
		// This class is deprecated, you should migrate to ViewPager2:
		// https://developer.android.com/reference/androidx/viewpager2/widget/ViewPager2
		Context context;
		int tabCount;
		
		public FragmentFragmentAdapter(Context context, FragmentManager manager) {
			super(manager);
			this.context = context;
		}
		
		public void setTabCount(int tabCount) {
			this.tabCount = tabCount;
		}
		
		@Override
		public int getCount() {
			return tabCount;
		}
		
		@Override
		public CharSequence getPageTitle(int _position) {
			return "";
		}
		
		
		@Override
		public Fragment getItem(int _position) {
			if (_position == 0) {
				return new HomeFragmentFragmentActivity();
			}
			if (_position == 1) {
				return new ListCarFragmentActivity();
			}
			if (_position == 2) {
				return new GoodsMovementFragmentActivity();
			}
			return new Fragment();
		}
		
	}
	
	public void _ui() {
		
	}
	
}