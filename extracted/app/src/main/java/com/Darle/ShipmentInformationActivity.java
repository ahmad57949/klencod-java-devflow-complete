package com.Darle;

import android.animation.*;
import android.app.*;
import android.content.*;
import android.content.res.*;
import android.graphics.*;
import android.graphics.drawable.*;
import android.media.*;
import android.net.*;
import android.os.*;
import android.text.*;
import android.text.style.*;
import android.util.*;
import android.view.*;
import android.view.View.*;
import android.view.animation.*;
import android.webkit.*;
import android.widget.*;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.github.mikephil.charting.*;
import java.io.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;
import org.json.*;

public class ShipmentInformationActivity extends AppCompatActivity {
	
	private LinearLayout linear38;
	private LinearLayout linear39;
	private View view40;
	private LinearLayout linear41;
	private LinearLayout linear43;
	private LinearLayout linear46;
	private LinearLayout linear48;
	private TextView textview19;
	private TextView textview_status;
	private TextView textview20;
	private LinearLayout linear42;
	private TextView textview21;
	private TextView textview_driver;
	private LinearLayout linear44;
	private LinearLayout linear45;
	private TextView textview22;
	private TextView textview_tons;
	private TextView textview23;
	private TextView textview_price;
	private TextView textview24;
	private LinearLayout linear47;
	private TextView textview25;
	private TextView textview_product;
	private LinearLayout linear49;
	private LinearLayout linear50;
	private TextView textview26;
	private TextView textview_date;
	
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.shipment_information);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		linear38 = findViewById(R.id.linear38);
		linear39 = findViewById(R.id.linear39);
		view40 = findViewById(R.id.view40);
		linear41 = findViewById(R.id.linear41);
		linear43 = findViewById(R.id.linear43);
		linear46 = findViewById(R.id.linear46);
		linear48 = findViewById(R.id.linear48);
		textview19 = findViewById(R.id.textview19);
		textview_status = findViewById(R.id.textview_status);
		textview20 = findViewById(R.id.textview20);
		linear42 = findViewById(R.id.linear42);
		textview21 = findViewById(R.id.textview21);
		textview_driver = findViewById(R.id.textview_driver);
		linear44 = findViewById(R.id.linear44);
		linear45 = findViewById(R.id.linear45);
		textview22 = findViewById(R.id.textview22);
		textview_tons = findViewById(R.id.textview_tons);
		textview23 = findViewById(R.id.textview23);
		textview_price = findViewById(R.id.textview_price);
		textview24 = findViewById(R.id.textview24);
		linear47 = findViewById(R.id.linear47);
		textview25 = findViewById(R.id.textview25);
		textview_product = findViewById(R.id.textview_product);
		linear49 = findViewById(R.id.linear49);
		linear50 = findViewById(R.id.linear50);
		textview26 = findViewById(R.id.textview26);
		textview_date = findViewById(R.id.textview_date);
	}
	
	private void initializeLogic() {
		textview_driver.setText(getIntent().getStringExtra("driver"));
		textview_tons.setText(getIntent().getStringExtra("tons"));
		textview_date.setText(getIntent().getStringExtra("date"));
		textview_price.setText(getIntent().getStringExtra("price"));
		textview_product.setText(getIntent().getStringExtra("product"));
		textview_status.setText(getIntent().getStringExtra("status"));
	}
	
}