package com.Darle;

import android.animation.*;
import android.app.*;
import android.app.Activity;
import android.content.*;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.*;
import android.graphics.*;
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
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.github.mikephil.charting.*;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.io.InputStream;
import java.text.*;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.*;
import org.json.*;

public class CreateandeditActivity extends AppCompatActivity {
	
	private FloatingActionButton _fab;
	private double notenum = 0;
	
	private ArrayList<HashMap<String, Object>> note = new ArrayList<>();
	
	private LinearLayout linear5;
	private LinearLayout linear1;
	private View view2;
	private TextView textview1;
	private CardView cardview2;
	private EditText edittext1;
	
	private Intent i = new Intent();
	private SharedPreferences notes;
	
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.createandedit);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		_fab = findViewById(R.id._fab);
		linear5 = findViewById(R.id.linear5);
		linear1 = findViewById(R.id.linear1);
		view2 = findViewById(R.id.view2);
		textview1 = findViewById(R.id.textview1);
		cardview2 = findViewById(R.id.cardview2);
		edittext1 = findViewById(R.id.edittext1);
		notes = getSharedPreferences("notes", Activity.MODE_PRIVATE);
		
		_fab.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				if (notenum == -1) {
					{
						HashMap<String, Object> _item = new HashMap<>();
						_item.put("title", edittext1.getText().toString());
						note.add(_item);
					}
				} else {
					note.get((int)notenum).put("title", edittext1.getText().toString());
				}
				notes.edit().putString("notes", new Gson().toJson(note)).commit();
				finish();
			}
		});
	}
	
	private void initializeLogic() {
		if (!notes.getString("notes", "").equals("")) {
			note = new Gson().fromJson(notes.getString("notes", ""), new TypeToken<ArrayList<HashMap<String, Object>>>(){}.getType());
		}
		if (!notes.getString("note", "").equals("")) {
			notenum = Double.parseDouble(notes.getString("note", ""));
			edittext1.setText(note.get((int)notenum).get("title").toString());
		} else {
			notenum = -1;
		}
		linear1.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFFFFFFF));
		edittext1.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF9FAFD));
	}
	
	public void _SX_CornerRadius_4(final View _view, final String _color1, final String _color2, final double _str, final double _n1, final double _n2, final double _n3, final double _n4) {
		android.graphics.drawable.GradientDrawable gd = new android.graphics.drawable.GradientDrawable();
		
		gd.setColor(Color.parseColor(_color1));
		
		gd.setStroke((int)_str, Color.parseColor(_color2));
		
		gd.setCornerRadii(new float[]{(int)_n1,(int)_n1,(int)_n2,(int)_n2,(int)_n3,(int)_n3,(int)_n4,(int)_n4});
		
		_view.setBackground(gd);
		
		_view.setElevation(8);
	}
	
	
	public void _circleRipple(final String _color, final View _v) {
		android.content.res.ColorStateList clrb = new android.content.res.ColorStateList(new int[][]{new int[]{}}, new int[]{Color.parseColor(_color)});
		android.graphics.drawable.RippleDrawable ripdrb = new android.graphics.drawable.RippleDrawable(clrb , null, null);
		_v.setBackground(ripdrb);
	}
	
}