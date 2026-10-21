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
import android.widget.HorizontalScrollView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import androidx.annotation.*;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.github.mikephil.charting.*;
import java.io.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;
import org.json.*;

public class GoodsMovementFragmentActivity extends Fragment {
	
	private String fontName = "";
	private String typeace = "";
	
	private FrameLayout frame_layout104;
	private ScrollView vscroll4;
	private LinearLayout linear105;
	private LinearLayout linear106;
	private HorizontalScrollView hscroll4;
	private LinearLayout linear108;
	private TextView textview135;
	private TextView textview136;
	private LinearLayout linear107;
	private CardView cardview19;
	private CardView cardview20;
	private CardView cardview21;
	private CardView cardview22;
	private CardView cardview23;
	private TextView textview137;
	private TextView textview138;
	private TextView textview139;
	private TextView textview140;
	private TextView textview141;
	private RelativeLayout relativelayout5;
	private RelativeLayout relativelayout6;
	private RelativeLayout relativelayout7;
	private RelativeLayout relativelayout8;
	private View view109;
	private CardView card_transfer;
	private CardView cardview24;
	private LinearLayout linear110;
	private LinearLayout linear111;
	private TextView textview144;
	private TextView textview145;
	private TextView textview142;
	private TextView textview143;
	private TextView textview146;
	private View view112;
	private CardView cardview25;
	private CardView cardview26;
	private LinearLayout linear113;
	private LinearLayout linear114;
	private TextView textview149;
	private TextView textview150;
	private TextView textview147;
	private TextView textview148;
	private TextView textview151;
	private View view115;
	private CardView cardview27;
	private CardView cardview28;
	private LinearLayout linear116;
	private LinearLayout linear117;
	private TextView textview154;
	private TextView textview155;
	private TextView textview152;
	private TextView textview153;
	private TextView textview156;
	private View view118;
	private CardView cardview29;
	private CardView cardview30;
	private LinearLayout linear119;
	private LinearLayout linear120;
	private TextView textview159;
	private TextView textview160;
	private TextView textview157;
	private TextView textview158;
	private TextView textview161;
	
	@NonNull
	@Override
	public View onCreateView(@NonNull LayoutInflater _inflater, @Nullable ViewGroup _container, @Nullable Bundle _savedInstanceState) {
		View _view = _inflater.inflate(R.layout.goods_movement_fragment, _container, false);
		initialize(_savedInstanceState, _view);
		initializeLogic();
		return _view;
	}
	
	private void initialize(Bundle _savedInstanceState, View _view) {
		frame_layout104 = _view.findViewById(R.id.frame_layout104);
		vscroll4 = _view.findViewById(R.id.vscroll4);
		linear105 = _view.findViewById(R.id.linear105);
		linear106 = _view.findViewById(R.id.linear106);
		hscroll4 = _view.findViewById(R.id.hscroll4);
		linear108 = _view.findViewById(R.id.linear108);
		textview135 = _view.findViewById(R.id.textview135);
		textview136 = _view.findViewById(R.id.textview136);
		linear107 = _view.findViewById(R.id.linear107);
		cardview19 = _view.findViewById(R.id.cardview19);
		cardview20 = _view.findViewById(R.id.cardview20);
		cardview21 = _view.findViewById(R.id.cardview21);
		cardview22 = _view.findViewById(R.id.cardview22);
		cardview23 = _view.findViewById(R.id.cardview23);
		textview137 = _view.findViewById(R.id.textview137);
		textview138 = _view.findViewById(R.id.textview138);
		textview139 = _view.findViewById(R.id.textview139);
		textview140 = _view.findViewById(R.id.textview140);
		textview141 = _view.findViewById(R.id.textview141);
		relativelayout5 = _view.findViewById(R.id.relativelayout5);
		relativelayout6 = _view.findViewById(R.id.relativelayout6);
		relativelayout7 = _view.findViewById(R.id.relativelayout7);
		relativelayout8 = _view.findViewById(R.id.relativelayout8);
		view109 = _view.findViewById(R.id.view109);
		card_transfer = _view.findViewById(R.id.card_transfer);
		cardview24 = _view.findViewById(R.id.cardview24);
		linear110 = _view.findViewById(R.id.linear110);
		linear111 = _view.findViewById(R.id.linear111);
		textview144 = _view.findViewById(R.id.textview144);
		textview145 = _view.findViewById(R.id.textview145);
		textview142 = _view.findViewById(R.id.textview142);
		textview143 = _view.findViewById(R.id.textview143);
		textview146 = _view.findViewById(R.id.textview146);
		view112 = _view.findViewById(R.id.view112);
		cardview25 = _view.findViewById(R.id.cardview25);
		cardview26 = _view.findViewById(R.id.cardview26);
		linear113 = _view.findViewById(R.id.linear113);
		linear114 = _view.findViewById(R.id.linear114);
		textview149 = _view.findViewById(R.id.textview149);
		textview150 = _view.findViewById(R.id.textview150);
		textview147 = _view.findViewById(R.id.textview147);
		textview148 = _view.findViewById(R.id.textview148);
		textview151 = _view.findViewById(R.id.textview151);
		view115 = _view.findViewById(R.id.view115);
		cardview27 = _view.findViewById(R.id.cardview27);
		cardview28 = _view.findViewById(R.id.cardview28);
		linear116 = _view.findViewById(R.id.linear116);
		linear117 = _view.findViewById(R.id.linear117);
		textview154 = _view.findViewById(R.id.textview154);
		textview155 = _view.findViewById(R.id.textview155);
		textview152 = _view.findViewById(R.id.textview152);
		textview153 = _view.findViewById(R.id.textview153);
		textview156 = _view.findViewById(R.id.textview156);
		view118 = _view.findViewById(R.id.view118);
		cardview29 = _view.findViewById(R.id.cardview29);
		cardview30 = _view.findViewById(R.id.cardview30);
		linear119 = _view.findViewById(R.id.linear119);
		linear120 = _view.findViewById(R.id.linear120);
		textview159 = _view.findViewById(R.id.textview159);
		textview160 = _view.findViewById(R.id.textview160);
		textview157 = _view.findViewById(R.id.textview157);
		textview158 = _view.findViewById(R.id.textview158);
		textview161 = _view.findViewById(R.id.textview161);
	}
	
	private void initializeLogic() {
	}
	
}