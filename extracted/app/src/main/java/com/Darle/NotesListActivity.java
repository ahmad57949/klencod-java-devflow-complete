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
import android.widget.LinearLayout;
import android.widget.ListView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
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

public class NotesListActivity extends AppCompatActivity {
	
	private FloatingActionButton _fab;
	
	private ArrayList<HashMap<String, Object>> note = new ArrayList<>();
	
	private LinearLayout linear1;
	private ListView listview2;
	
	private AlertDialog.Builder d;
	private SharedPreferences notes;
	private Intent i = new Intent();
	
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.notes_list);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		_fab = findViewById(R.id._fab);
		linear1 = findViewById(R.id.linear1);
		listview2 = findViewById(R.id.listview2);
		d = new AlertDialog.Builder(this);
		notes = getSharedPreferences("notes", Activity.MODE_PRIVATE);
		
		listview2.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> _param1, View _param2, int _param3, long _param4) {
				final int _position = _param3;
				notes.edit().putString("note", String.valueOf((long)(_position))).commit();
				i.setClass(getApplicationContext(), CreateandeditActivity.class);
				startActivity(i);
			}
		});
		
		listview2.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
			@Override
			public boolean onItemLongClick(AdapterView<?> _param1, View _param2, int _param3, long _param4) {
				final int _position = _param3;
				d.setMessage("Do you want to delete this note?");
				d.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface _dialog, int _which) {
						note.remove((int)(_position));
						notes.edit().putString("notes", new Gson().toJson(note)).commit();
						((BaseAdapter)listview2.getAdapter()).notifyDataSetChanged();
					}
				});
				d.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface _dialog, int _which) {
						
					}
				});
				d.create().show();
				return true;
			}
		});
		
		_fab.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				i.setClass(getApplicationContext(), CreateandeditActivity.class);
				startActivity(i);
			}
		});
	}
	
	private void initializeLogic() {
	}
	
	@Override
	public void onStart() {
		super.onStart();
		notes.edit().putString("note", "").commit();
		if (!notes.getString("notes", "").equals("")) {
			note = new Gson().fromJson(notes.getString("notes", ""), new TypeToken<ArrayList<HashMap<String, Object>>>(){}.getType());
			listview2.setAdapter(new Listview2Adapter(note));
			((BaseAdapter)listview2.getAdapter()).notifyDataSetChanged();
		}
	}
	public void _SX_CornerRadius_4(final View _view, final String _color1, final String _color2, final double _str, final double _n1, final double _n2, final double _n3, final double _n4) {
		android.graphics.drawable.GradientDrawable gd = new android.graphics.drawable.GradientDrawable();
		
		gd.setColor(Color.parseColor(_color1));
		
		gd.setStroke((int)_str, Color.parseColor(_color2));
		
		gd.setCornerRadii(new float[]{(int)_n1,(int)_n1,(int)_n2,(int)_n2,(int)_n3,(int)_n3,(int)_n4,(int)_n4});
		
		_view.setBackground(gd);
		
		_view.setElevation(8);
	}
	
	
	public void _ColorTitleDialog(final AlertDialog.Builder _dialog, final String _title, final String _color) {
		_dialog.setTitle(Html.fromHtml("<font color=\"#"+_color+"\">"+_title+"</font>"));
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
			LayoutInflater _inflater = getLayoutInflater();
			View _view = _v;
			if (_view == null) {
				_view = _inflater.inflate(R.layout.list_note, null);
			}
			
			final LinearLayout linear57 = _view.findViewById(R.id.linear57);
			final TextView textview49 = _view.findViewById(R.id.textview49);
			final LinearLayout linear60 = _view.findViewById(R.id.linear60);
			final ImageView imageview28 = _view.findViewById(R.id.imageview28);
			final TextView textview50 = _view.findViewById(R.id.textview50);
			final TextView textview51 = _view.findViewById(R.id.textview51);
			
			textview49.setText(note.get((int)_position).get("title").toString());
			linear57.setBackground(new GradientDrawable() { public GradientDrawable getIns(int a, int b) { this.setCornerRadius(a); this.setColor(b); return this; } }.getIns((int)50, 0xFFF9FAFD));
			
			return _view;
		}
	}
}