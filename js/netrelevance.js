$(document).ready(function() {
	
	//create global vars for positioning...
	var _globalVars = new Object();
	_globalVars.screenHeight = window.innerHeight ? window.innerHeight:$(window).height(); 
	_globalVars.screenWidth = window.innerWidth ? window.innerWidth:$(window).width(); 
	_globalVars.headerHeight = 66;
	_globalVars.headerWidth = _globalVars.screenWidth;
	_globalVars.offset = _globalVars.headerWidth * 0.09;
	
	//alert(_globalVars.screenWidth);
	//booleans to determine if panels are open or closed
	_globalVars.settingsEnabled = false;
	_globalVars.dateChooseEnabled = false;
	
	//pointers to selected items in the app
	//the 2 and 3 set vars below are for dev only!!!
	_globalVars.selectedViewBy = 2;
	_globalVars.selectedDataType = 3;
	_globalVars.currentSelectedCompany = 0;
	_globalVars.alt1SelectedCompany = 0;
	_globalVars.alt2SelectedCompany = 0;
	_globalVars.alt3SelectedCompany = 0;
		
	//adjust for spacing discrepancies
	if(_globalVars.screenWidth > 1100){
		_globalVars.footerOffset = _globalVars.headerWidth * 0.145;
	}else{
		_globalVars.footerOffset = _globalVars.headerWidth * 0.164;
	}
	
	//init Kinetic Stage obj and create all layers for the app
	var stage = new Kinetic.Stage({
	  container: "app_container",
	  width: _globalVars.screenWidth,
	  height: _globalVars.screenHeight
	});	
	
	var backgroundLayer = new Kinetic.Layer();	
	var footerElementsLayer = new Kinetic.Layer();
	
	var createBg = function(){
		//create background...
		var rectConfig = {
			x: 0,
			y: 0,
			width: _globalVars.headerWidth,
			height: _globalVars.headerHeight,
			fill: "#f3f2f0",
			stroke: "#f3f2f0",
	        strokeWidth: 0
		}
		var headerRect = new Kinetic.Rect(rectConfig);	
		backgroundLayer.add(headerRect);
		
		//create background...
		var footerRectConfig = {
			x: 0,
			y: _globalVars.screenHeight - _globalVars.headerHeight,
			width: _globalVars.headerWidth,
			height: _globalVars.headerHeight,
			fill: "#f3f2f0",
			stroke: "#f3f2f0",
	        strokeWidth: 0
		}
		var footerRect = new Kinetic.Rect(footerRectConfig);
		backgroundLayer.add(footerRect);	
	}
	
	//create the header...
	var createHeaderElements = function(){					
		//set default x/y coordinates for header text
		var fontSize = Math.abs(_globalVars.headerHeight * 0.18);
		var leftPos = _globalVars.headerWidth * 0.074;
		var topPos = 10;
		var textComponentWidth =  _globalVars.headerWidth * 0.09;
		var menuOffset = _globalVars.headerWidth * 0.02;
		
		//create logo...
		var tempScale =  (_globalVars.headerHeight * 0.8) / 47;
		var tempHeight = 47 * tempScale;
		var tempWidth = 179 * tempScale;
		$("#logo").css("left", _globalVars.screenWidth - 190);
		$("#logo").css("top", 5);
		$("#header").css("top", _globalVars.headerHeight *0.1);

		//create current company...	
		var xoffset = leftPos;
		$("#currCompanyHolder").css("left", 88);
		$("#currCompanyHolder").css("top", topPos);
		$("#currCompanyHolder").css("width", 92);
		$("#currCompanyHolder").css("height", _globalVars.headerHeight / 2);
		$("#currCompanyHolder").css("font-size", 12);
		$("#currCompany").css("top", topPos);
		$("#currCompany").css("font-size", 18);
		
		//create date range...
		xoffset += (textComponentWidth * 1.2 + menuOffset);
		$("#dateRangeHolder").css("left", 206);
		$("#dateRangeHolder").css("top", topPos);
		$("#dateRangeHolder").css("width", 200);
		$("#dateRangeHolder").css("height", _globalVars.headerHeight / 2);
		$("#dateRangeHolder").css("font-size", 12);
		$("#dateRange").css("top", topPos);
		$("#dateRange").css("font-size", 18);
		
		//create relevance
		xoffset += (textComponentWidth * 2.1 + menuOffset);
		$("#relevanceHolder").css("left", 427);
		$("#relevanceHolder").css("top", topPos);
		$("#relevanceHolder").css("width", 86);
		$("#relevanceHolder").css("height", _globalVars.headerHeight / 2);
		$("#relevanceHolder").css("font-size", 12);
		$("#relevance").css("top", topPos);
		$("#relevance").css("font-size", 18);
		
		//create trust
		xoffset += (textComponentWidth * 0.8 + menuOffset);
		$("#trustHolder").css("left", 536);
		$("#trustHolder").css("top", topPos);
		$("#trustHolder").css("width", 96);
		$("#trustHolder").css("height", _globalVars.headerHeight / 2);
		$("#trustHolder").css("font-size", 12);
		$("#trust").css("top", topPos);
		$("#trust").css("font-size", 18);
		
		//create exposure
		xoffset += ( textComponentWidth * 1 + menuOffset);
		$("#exposureHolder").css("left", 651);
		$("#exposureHolder").css("top", topPos);
		$("#exposureHolder").css("width", 106);
		$("#exposureHolder").css("height", _globalVars.headerHeight / 2);
		$("#exposureHolder").css("font-size", 12);
		$("#exposure").css("top", topPos);
		$("#exposure").css("font-size", 18);
	}
	
	var createFooterElements = function(){
		
		//global position vars for text...
		var fontSize = Math.abs(_globalVars.headerHeight * 0.18);
		var leftPos = _globalVars.headerWidth * 0.074;
		var topPos = _globalVars.screenHeight - (_globalVars.headerHeight * 0.7);
		var textComponentWidth =  120;
		var footerXoffset = leftPos;
		//create footer exposure text...		
		$("#exposureFooterHolder").css("left", 55);
		$("#exposureFooterHolder").css("top", topPos);
		$("#exposureFooterHolder").css("width", textComponentWidth);
		$("#exposureFooterHolder").css("height", 64);
		$("#exposureFooterHolder").css("font-size", 12);
		$("#exposureFooterHeader").css("top", topPos);
		$("#exposureFooterHeader").css("font-size", 18);	
		
		//Create and add footer circles
		footerXoffset += textComponentWidth;
		var groupConfig = {
			x: 190,
			y: _globalVars.screenHeight - (_globalVars.headerHeight * 1.2)
		}
		var footerCircleGroup = new Kinetic.Group(groupConfig);
		
		var xpos = 0;
		for(var i=1; i<11; i++){
			var multiplier = 0.03 * i;
			var footerCircleGroupConfig = {
				x: xpos,
				y: _globalVars.headerHeight - (_globalVars.headerHeight * multiplier),
				radius: 65 * multiplier,
				fill: "#c5bfb5",
				stroke: "#c5bfb5",
				strokeWidth:0
			}
			
			if(i != 10) xpos += (_globalVars.headerHeight * multiplier * 2) + (_globalVars.headerHeight* 0.2);
			var circle = new Kinetic.Circle(footerCircleGroupConfig);
			footerCircleGroup.add(circle);
		}
		
		//Create plus sign and minus over last circle.....
		var minusConfig = {
			x:0,
			y:(_globalVars.headerHeight * 0.68),
			width:6,
			height: 2,
			fill: "#828282",
			stroke: "#828282",
			strokeWidth:0
		}
		
		var plusHconfig = {
			x: xpos -(_globalVars.headerHeight * 0.10),
			y: (_globalVars.headerHeight * 0.68),
			width:_globalVars.headerHeight * 0.21,
			height: _globalVars.headerHeight * 0.04,
			fill: "#828282",
			stroke: "#828282",
			strokeWidth:0
		}
		
		var plusVconfig = {
			x:xpos - (_globalVars.headerHeight * 0.02),
			y:(_globalVars.headerHeight * 0.60),
			width: _globalVars.headerHeight * 0.04,
			height:_globalVars.headerHeight * 0.21,
			fill: "#828282",
			stroke: "#828282",
			strokeWidth:0
		}
		
		var minusBar = new Kinetic.Rect(minusConfig);
		var plusVbar = new Kinetic.Rect(plusVconfig);
		var plusHbar = new Kinetic.Rect(plusHconfig);
		
		//Add plus sign and minus sign
		footerCircleGroup.add(minusBar);
		footerCircleGroup.add(plusVbar);
		footerCircleGroup.add(plusHbar);
		
		
		//create footer exposure text...	
		footerXoffset += (xpos * 1.3);	
		$("#trustFooterHolder").css("left", 560);
		$("#trustFooterHolder").css("top", topPos);
		$("#trustFooterHolder").css("width", 125);
		$("#trustFooterHolder").css("height", _globalVars.headerHeight / 2);
		$("#trustFooterHeader").css("font-size", 18);
			
		//create gradient bar in footer
		footerXoffset += (textComponentWidth * 1.1);
		var gradxpos = 688;
		var gradypos = _globalVars.screenHeight - (_globalVars.headerHeight * 0.80);
		
		var groupConfig = {
			x: gradxpos,
			y: gradypos  
		}
		var footerGroupGradient = new Kinetic.Group(groupConfig);
		
		var colors = ["#c10505", "#aa2122", "#89494c", "#64767a", "#3fa2a8", "#20c8cf", "#0be1e9"];
		var barXIndex = 0;
		var barWidth = 41;
		var barHeight = 8;
		
		for(var i=0; i<7; i++){
			var barConfig = {
				x: barXIndex,
				y: 0,
				width:barWidth,
				height:barHeight,
				fill: colors[i],
				stroke: colors[i],
				strokeWidth:0
			}
			barXIndex += barWidth;
			var gradBar = new Kinetic.Rect(barConfig);
			footerGroupGradient.add(gradBar);
		}
		
		//Add all Kinetic Groups of the footer
		footerElementsLayer.add(footerCircleGroup);	
		footerElementsLayer.add(footerGroupGradient);
		
		//create footer trust bar text...		
		$("#trustFooterBarHolder").css("left", 688);
		$("#trustFooterBarHolder").css("top", gradypos + (barHeight*1.5));
		$("#trustFooterBarHolder").css("width", barWidth * 7);
		$("#trustFooterBarHolder").css("height", _globalVars.headerHeight / 2);
		$("#trustFooterBarHolder").css("font-size", 10);
		
		//create footer slider bar with circle
		var groupConfig = {
			x: gradxpos,
			y: gradypos + 5 
		}
		var footerGroupBarDot = new Kinetic.Group(groupConfig);
		
		var barConfig = {
			x: 0,
			y: barHeight * 3.66,
			width: barXIndex / 2.8,
			height: 2,
			fill: "#f78e1e",
			stroke: "#f78e1e",
			strokeWidth: 0	
		}
		var sliderBar = new Kinetic.Rect(barConfig);
		
		var circConfig = {
			x: 52,
			y:30,
			radius: barHeight / 2,
			fill: "#f78e1e",
			stroke: "#f78e1e",
			strokeWidth: 0
		}
		var sliderCircle = new Kinetic.Circle(circConfig);
		
		footerGroupBarDot.add(sliderBar);
		footerGroupBarDot.add(sliderCircle);
		footerElementsLayer.add(footerGroupBarDot);	
		
		
		//create trend line text...		
		$("#trendLineFooterHolder").css("left", 830);
		$("#trendLineFooterHolder").css("top", gradypos + 30);
		$("#trendLineFooterHolder").css("width", barWidth * 7);
		$("#trendLineFooterHolder").css("height", _globalVars.headerHeight / 2);
		$("#trendLineFooterHolder").css("font-size", 10);
	}
	
	//add all elements to the visual layer...
	createBg();
	createHeaderElements();
	createFooterElements();
	stage.add(backgroundLayer);
	stage.add(footerElementsLayer);
	
	//-------------------------------------------------------//
	//---------BEGIN SETTINGS TOOLBAR------------------------//
	//-------------------------------------------------------//
	
	//-----------helper function for placement of settings headers
	var alignHeaderType = function(target, fsize, ypos){
		var targetDiv = $("#" + target);
		var width = barWidth * 0.7;
		var left = barWidth * 0.07;
		
		targetDiv.css("width", width);
		targetDiv.css("font-size", fsize);
		targetDiv.css("left", left); 
		targetDiv.css("top",ypos); 
	}
	
	//globar vars used for sizing and placement for
	//all elements on the settings tab
	var barWidth = 279;
	var barHeight = _globalVars.screenHeight;
	var barArea = 335;
	
	//---------global configs for for all sub-panels of settings menu
	var tempScaleFactor = (barWidth * 0.0045);
	
	var closeXconfig = {
		drawFunc: function() {
			var context = this.getContext();
			context.beginPath();
			context.moveTo(3,0);
			context.lineTo(7, 4);
			context.lineTo(11, 0);
			context.lineTo(14, 3);
			context.lineTo(11, 7);
			context.lineTo(14, 11);
			context.lineTo(11, 14);
			context.lineTo(7, 11);
			context.lineTo(3, 14);
			context.lineTo(0, 11);
			context.lineTo(3, 7);
			context.lineTo(0, 4);
			context.closePath();
			this.fill();
			this.stroke();
		  },
		  fill: "#ffffff",
		  stroke: "#ffffff",
		  strokeWidth: 0,
		  x:barWidth * 0.030,
		  y:barWidth * 0.030,
		  scale:[tempScaleFactor,tempScaleFactor]
	}
	
	var subpanelBgConfig = {
		x:0,
		y:0,
		width: barWidth * 0.95,
		height: _globalVars.screenHeight,
		fill: "#616161",
		stroke: "#616161",
		strokeWidth:0
	}
	
	//create initial stage and layer
	var settingsStage = new Kinetic.Stage({
	  container: "settings_container",
	  width: barWidth * 1.2, //the multiplies is used for teh ornage magnifying icon
	  height:barHeight
	});	
	var settingsBGLayer = new Kinetic.Layer();
	
	//add background
	$("#settings_container").css("width", barWidth);
	$("#settings_container").css("height", barHeight);
	$("#settings_container").css("left", -barWidth * 0.95); 
	//$("#settings_container").css("left",0); 
	
	var settingsBGconfig = {
		x:0,
		y:0,
		width:barWidth,
		height:barHeight,
		fill: "#828282",
		stroke: "#828282",
		strokeWidth:0	
	}	
	var bgRectangle = new Kinetic.Rect(settingsBGconfig);
	
	var orangeBarConfig = {
		x:0,
		y:0,
		width:barWidth,
		height:_globalVars.headerHeight,
		fill: "#f78e1e",
		stroke: "#f78e1e",
		strokeWidth:0	
	}
	
	var closeBtnBGConfig = {
		x:0,
		y:0,
		width: barWidth * 0.122,
		height: barWidth * 0.122,
		fill: "#f78e1e",
		stroke: "#f78e1e",
		strokeWidth: 0
	}
	
	//add "SETTINGS" header text
	var fontSize = barWidth * 0.1;
	var tempTop = ( _globalVars.headerHeight / 2 ) - (fontSize / 2);
	$("#settingsHeader").css("font-size", 24);
	$("#settingsHeader").css("top", 0);
	$("#settingsHeader").css("left", 0);
	
	//create group to hold orange bullets
	var bulletYs = [ 85, 176, 240, 300];
	
	var bulletGroupConfig = {
		x:barWidth * 0.07,
		y:0
	}
	var bulletGroup = new Kinetic.Group(bulletGroupConfig);
	
	//add orange bullets
	for(var i=0; i<4; i++){
		var orangeBulletConfig = {
		  drawFunc: function() {
			var context = this.getContext();
			context.beginPath();
			context.moveTo(4,0);
			context.lineTo(13, 10);
			context.lineTo(4, 20);
			context.lineTo(0, 15);
			context.lineTo(5, 10);
			context.lineTo(0, 5);
			context.closePath();
			this.fill();
			this.stroke();
		  },
		  fill: "#f78e1e",
		  stroke: "#f78e1e",
		  strokeWidth: 0,
		  x:0,
		  y:bulletYs[i]
		}
		var orangeBullet = new Kinetic.Shape(orangeBulletConfig);
		bulletGroup.add(orangeBullet);
	}
	
	//position and stylize date range text in settings
	textYHolderpos = 82;
	textYpos = 0;
	textXpos = barWidth * 0.18;
	textFontSizeSmall = 12;
	textFontSizeLarge = 20;
	
	$("#dataRangeChooseHolder").css("top", textYHolderpos);
	$("#dataRangeChooseHolder").css("left", textXpos);
	$("#dataRangeChooseHolder").css("width", barWidth * 0.7);
	
	$("#dateRangeSettingsHeader").css("top", 0);
	$("#dateRangeSettingsHeader").css("left", 0);
	$("#dateRangeSettingsHeader").css("font-size", textFontSizeSmall);
	
	//set the initial date range for today
	var tempTime = new Date();
	var tempMonth = tempTime.getMonth() + 1;
	var tempDay = tempTime.getDate();
	var tempYear = tempTime.getFullYear();
	var fullDate = tempMonth + "/" + tempDay + "/" + tempYear;
	
	textYpos += textFontSizeSmall * 1.1;
	$("#dateRangeStart").css("top", textYpos);
	$("#dateRangeStart").css("left", 0);
	$("#dateRangeStart").css("font-size", textFontSizeLarge);
	$("#dateRangeStart").html(fullDate);
	
	textYpos += textFontSizeLarge *1.1;
	$("#dateRangeEnd").css("top", textYpos);
	$("#dateRangeEnd").css("left", 0);
	$("#dateRangeEnd").css("font-size", textFontSizeLarge);
	$("#dateRangeEnd").html(fullDate);
	
	
	//position and stylize date view by text in settings
	textYpos = 170;
	textYHolderpos =  0;
	$("#viewByHolder").css("top", textYHolderpos);
	$("#viewByHolder").css("left", textXpos);
	$("#viewByHolder").css("width", barWidth * 0.7);
	
	$("#viewbyHeader").css("top", textYpos);
	$("#viewbyHeader").css("left", 0);
	$("#viewbyHeader").css("font-size", textFontSizeSmall);
	
	textYpos += textFontSizeSmall * 1.2;
	$("#viewbyOption").css("top", textYpos);
	$("#viewbyOption").css("left", 0);
	$("#viewbyOption").css("font-size", textFontSizeLarge);
	
	
	//position and stylize data type text in settings
	textYpos = 235;
	textYHolderpos =  0;
	$("#dataTypeHolder").css("top", textYHolderpos);
	$("#dataTypeHolder").css("left", textXpos);
	$("#dataTypeHolder").css("width", barWidth * 0.7);
	
	$("#dataTypeHeader").css("top", textYpos);
	$("#dataTypeHeader").css("left", 0);
	$("#dataTypeHeader").css("font-size", textFontSizeSmall);
	
	textYpos += textFontSizeSmall * 1.2;
	$("#dataTypeOption").css("top", textYpos);
	$("#dataTypeOption").css("left", 0);
	$("#dataTypeOption").css("font-size", textFontSizeLarge);
	
	//position and stylize companies text in settings
	textYpos = (_globalVars.headerHeight * 1.4) + (_globalVars.headerHeight * 1.8) + (_globalVars.headerHeight * 1.4);
	textYHolderpos =  0;
	$("#comaniesHolder").css("top", textYHolderpos);
	$("#comaniesHolder").css("left", textXpos);
	$("#comaniesHolder").css("width", barWidth * 0.7);
	
	textYpos = 295;
	$("#companiesHeader").css("top", textYpos);
	$("#companiesHeader").css("left", 0);
	$("#companiesHeader").css("font-size", textFontSizeSmall);
	
	textYpos += textFontSizeSmall * 1.2;
	$("#companiesOption").css("top", textYpos);
	$("#companiesOption").css("left", 0);
	$("#companiesOption").css("font-size", textFontSizeLarge);
	
	//add horizontal divider line
	var lineXpos = barWidth * 0.07;
	var tempWidth = barWidth * 0.85;
	var lineYs = [ 78, 110, 140, 172];
	
	var dividerLinesGroupConfig = {
		x:lineXpos,
		y:0
	}
	
	var dividerLinesGroup = new Kinetic.Group(dividerLinesGroupConfig);
	
	for(var i=0; i<4; i++){
		var lineConfig = {
			x:0,
			y:lineYs[i],
			points: [0, lineYs[i], tempWidth, lineYs[i]],
			stroke:"#aaa9a9",
			strokeWidth:1
		}
		var divLine = new Kinetic.Line(lineConfig);
		
		dividerLinesGroup.add(divLine);
	}

	//add all the layers and elements to display layers and stage
	settingsBGLayer.add(bgRectangle);
	settingsBGLayer.add(bulletGroup);
	settingsBGLayer.add(dividerLinesGroup);
	settingsStage.add(settingsBGLayer);
	
	
	//-------create date picker section-------------------//
	//hide the date picker initially
	$("#dateChooseHolder").css("margin-left", -barWidth * 1.2);
	//create new stage element
	var dateChooseStage = new Kinetic.Stage({
	  container: "dateChooseHolder",
	  width: barWidth * 0.95,
	  height:_globalVars.screenHeight,
	  x:0,
   	  y:64,
	});	
	var dateChooseBGLayer = new Kinetic.Layer();
	
	
	//add background
	$("#dateChooseHolder").css("width", barWidth * 0.95);
	$("#dateChooseHolder").css("height", _globalVars.screenHeight);
	$("#dateChooseHolder").css("left",0); 
	
	
	//create holding group first
	var dateChooseGroupConfig = {
		x:0,
		y:0,
		width: barWidth * 0.95,
		height: _globalVars.screenHeight
	}
	var dateChooseGroup = new Kinetic.Group(dateChooseGroupConfig);
	
	//create gray bg
	var dateChooseBg = new Kinetic.Rect(subpanelBgConfig);
	
	//add date choose close button	
	var closeDateBtnGroupConfig = {
		x:barWidth * 0.75,
		y:barWidth * 0.07,
		width: barWidth * 0.122,
		height: barWidth * 0.122
	}
	var closeDateBtnGroup = new Kinetic.Group(closeDateBtnGroupConfig);
	
	//add orange button background
	var closeDateBtnBG = new Kinetic.Rect(closeBtnBGConfig);
	
	//add white X as a shape
	var closeDateX = new Kinetic.Shape(closeXconfig);
	
	//add date range output text
	var ypos = barWidth * 0.27;
	alignHeaderType("dateOutputHeader", 12, ypos);
	
	ypos += barWidth * 0.06;
	alignHeaderType("dateOutputStart", 20, ypos);
	
	ypos += barWidth * 0.09;
	alignHeaderType("dateOutputEnd", 20, ypos);
	
	//position "start date" and "end date" text
	$("#datePickerStart span.dateChoosePreTxt").css("top", barWidth * 0.025);
	$("#datePickerEnd span.dateChoosePreTxt").css("top", barWidth * 0.025);
	$("#datePickerStart span.dateChoosePreTxt").css("font-size", barWidth * 0.04);
	$("#datePickerEnd span.dateChoosePreTxt").css("font-size", barWidth * 0.04);
	//-----add the actual date pickers-----//
	//position 1st container and child elements
	ypos += barWidth * 0.13;
	$("#datePickerStart").css("width", barWidth * 0.80);
	$("#datePickerStart").css("left",barWidth * 0.07); 
	$("#datePickerStart").css("top",ypos);
	
	
	//helper function to update look of calendar
	//date picker helper function to bypass some of the jquery UI formatting issues	
	var refreshDatePicker = function(targetPicker){
		var targetDiv = null;
		if(targetPicker == "start"){
			targetDiv = $("#datePickerStart");
		}else if(targetPicker == "end"){
			targetDiv = $("#datePickerEnd");
		}
		targetDiv.css("opacity", 0);
		setTimeout( function(){
		$(".ui-state-default").css("font-size", barWidth * 0.04);
		$(".ui-state-default").css("padding", barWidth * 0.02);
		$(".ui-datepicker th").css("font-size", barWidth * 0.04);
		$(".ui-datepicker th").css("padding", barWidth * 0.02);
		$(".ui-datepicker-title").css("font-size", barWidth * 0.05);
		$(".ui-datepicker-title").css("margin-top", barWidth * 0.08);
		$(".ui-datepicker-title").css("margin-bottom", barWidth * 0.02);
		$("a.ui-datepicker-prev").css("top", barWidth * 0.06);
		$("a.ui-datepicker-prev").css("left", barWidth * 0.02);
		$("a.ui-datepicker-next").css("top", barWidth * 0.06);
		$("a.ui-datepicker-next").css("left", barWidth * 0.70);
		$(".ui-icon").css("width", barWidth * 0.06);
		$(".ui-icon").css("height", barWidth * 0.06);	
		targetDiv.animate({
			opacity:1,
			duration: "fast"
		});
		}, 0020);
	}
	
	//add ui date picker
	$("#datePickerStart").datepicker({
		inline: true,
		beforeShow: function(input, inst) {		
			refreshDatePicker("start");	
		},
		onSelect: function(dateText, inst) { 
			refreshDatePicker("start");
			$("#dateOutputStart").html(dateText);
			$("#dateRangeStart").html(dateText);
		},
		onChangeMonthYear: function(year, month, inst) {
			refreshDatePicker("start");
		}
		
	});
	
	//add end-date date picker
	ypos += barWidth * 0.8;
	$("#datePickerEnd").css("width", barWidth * 0.80);
	$("#datePickerEnd").css("left",barWidth * 0.07); 
	$("#datePickerEnd").css("top",ypos);
	
	$("#datePickerEnd").datepicker({
		inline: true,
		beforeShow: function(input, inst) {
			refreshDatePicker("end");
		},
		onSelect: function(dateText, inst) { 
			refreshDatePicker("end");
			$("#dateOutputEnd").html(dateText);
			$("#dateRangeEnd").html(dateText);
		},
		onChangeMonthYear: function(year, month, inst) {
			refreshDatePicker("end");
		}
	});
	
	
	closeDateBtnGroup.add(closeDateBtnBG);
	closeDateBtnGroup.add(closeDateX);
	
	dateChooseGroup.add(dateChooseBg);
	dateChooseBGLayer.add(dateChooseGroup);
	dateChooseBGLayer.add(closeDateBtnGroup);
	dateChooseStage.add(dateChooseBGLayer);
	
	//---create the view by settings holder and components
	$("#viewByChooseHolder").css("margin-left", -barWidth * 1.2);
	//create new stage element
	var viewByStage = new Kinetic.Stage({
	  container: "viewByChooseHolder",
	  width: barWidth * 0.95,
	  height:_globalVars.screenHeight,
	  x:0,
   	  y:64,
	});	
	var viewByBGLayer = new Kinetic.Layer();
	
	//add background
	$("#viewByChooseHolder").css("width", barWidth * 0.95);
	$("#viewByChooseHolder").css("height", _globalVars.screenHeight);
	$("#viewByChooseHolder").css("left",0); 
	
	//create holding group first
	var viewByGroupConfig = {
		x:0,
		y:0,
		width: barWidth * 0.95,
		height: _globalVars.screenHeight
	}
	var viewByGroup = new Kinetic.Group(viewByGroupConfig);
	
	//create gray bg
	var viewbyBg = new Kinetic.Rect(subpanelBgConfig);
	
	//add date choose close button	
	var closeViewbyBtnGroupConfig = {
		x:barWidth * 0.75,
		y:barWidth * 0.07,
		width: barWidth * 0.122,
		height: barWidth * 0.122
	}
	var closeViewbyBtnGroup = new Kinetic.Group(closeViewbyBtnGroupConfig);
	
	//add orange button background
	var closeViewbyBtnBG = new Kinetic.Rect(closeBtnBGConfig);
	
	//add white X as a shape
	var closeViewbyX = new Kinetic.Shape(closeXconfig);
	
	//add view by header and selected text
	var ypos = barWidth * 0.27;
	alignHeaderType("viewByOutputHeader", (barWidth * 0.05), ypos);
	
	ypos += barWidth * 0.06;
	alignHeaderType("viewByOutputSelected", (barWidth * 0.07), ypos);
	
	//add divider lines
	//add horizontal divider line
	var lineXpos = barWidth * 0.07;
	var tempWidth = barWidth * 0.80;
	var lineYs = [33,  103];
	
	var dividerLinesGroupConfig = {
		x:lineXpos,
		y:0
	}
	var dividerLinesGroup = new Kinetic.Group(dividerLinesGroupConfig);
	
	for(var i=0; i<2; i++){
		var lineConfig = {
			x:0,
			y:lineYs[i],
			points: [0, lineYs[i], tempWidth, lineYs[i]],
			stroke:"#aaa9a9",
			strokeWidth:1
		}
		var divLine = new Kinetic.Line(lineConfig);
		
		dividerLinesGroup.add(divLine);
	}
	
	ypos = 140;
	//place the li items in order and resize
	$("#viewByChooseHolder ul").css("font-size", 16);
	$("#viewByChooseHolder ul").css("left",barWidth * 0.12); 
	$("#viewByChooseHolder ul").css("top",ypos); 
	$("#viewByChooseHolder ul li").css("height", barWidth * 0.06);
	$("#viewByChooseHolder ul li").css("width", barWidth * 0.06);
	$("#viewByChooseHolder ul li span").css("padding-left", barWidth * 0.09)
	
	ypos = barWidth * 0.10;
	$("#viewByChooseHolder ul li:nth-child(2)").css("top",ypos); 
	ypos += barWidth * 0.10;
	$("#viewByChooseHolder ul li:nth-child(3)").css("top",ypos); 
	ypos += barWidth * 0.10;
	$("#viewByChooseHolder ul li:nth-child(4)").css("top",ypos); 
	
	var targetLi = "#viewByChooseHolder ul li:nth-child(" + _globalVars.selectedViewBy + ")";
	$(targetLi).addClass("selectedLi");
	
	//add all view by elements to stage
	closeViewbyBtnGroup.add(closeViewbyBtnBG);
	closeViewbyBtnGroup.add(closeViewbyX);
	
	viewByBGLayer.add(viewbyBg);
	viewByBGLayer.add(closeViewbyBtnGroup);
	viewByBGLayer.add(dividerLinesGroup);
	viewByStage.add(viewByBGLayer);


	//-------------Add Data Type Chooose Panel-----------------------//	
	$("#dataTypeOutputHolder").css("margin-left", -barWidth * 1.2);
	//create new stage element
	var dataTypeStage = new Kinetic.Stage({
	  container: "dataTypeOutputHolder",
	  width: barWidth * 0.95,
	  height:_globalVars.screenHeight,
	  x:0,
   	  y:64,
	});	
	var dataTypeBGLayer = new Kinetic.Layer();
	
	//add background
	$("#dataTypeOutputHolder").css("width", barWidth * 0.95);
	$("#dataTypeOutputHolder").css("height", _globalVars.screenHeight);
	$("#dataTypeOutputHolder").css("left",0); 
	
	//create holding group first
	var dataTypeGroupConfig = {
		x:0,
		y:0,
		width: barWidth * 0.95,
		height: _globalVars.screenHeight
	}
	var  dataTypeGroup = new Kinetic.Group(dataTypeGroupConfig);
	
	//create gray bg
	var dataTypeBg = new Kinetic.Rect(subpanelBgConfig);
	
	//add date choose close button	
	var closedataTypeBtnGroupConfig = {
		x:barWidth * 0.75,
		y:barWidth * 0.07,
		width: barWidth * 0.122,
		height: barWidth * 0.122
	}
	var closedataTypeBtnGroup = new Kinetic.Group(closedataTypeBtnGroupConfig);
	
	//add orange button background
	var closedataTypeBtnBG = new Kinetic.Rect(closeBtnBGConfig);
	
	//add white X as a shape
	var closedataTypeX = new Kinetic.Shape(closeXconfig);

	//add data type header and selected text
	var ypos = barWidth * 0.27;
	alignHeaderType("dataTypeOutputHeader", (barWidth * 0.05), ypos);
	
	ypos += barWidth * 0.06;
	alignHeaderType("dataTypeOutputSelected", (barWidth * 0.07), ypos);
	
	
	//add divider lines
	//add horizontal divider line
	var lineXpos = barWidth * 0.07;
	var tempWidth = barWidth * 0.80;
	var lineYs = [33,  88];
	
	var dividerLinesGroupConfig = {
		x:lineXpos,
		y:0
	}
	var dividerLinesGroup = new Kinetic.Group(dividerLinesGroupConfig);
	
	for(var i=0; i<2; i++){
		var lineConfig = {
			x:0,
			y:lineYs[i],
			points: [0, lineYs[i], tempWidth, lineYs[i]],
			stroke:"#aaa9a9",
			strokeWidth:1
		}
		var divLine = new Kinetic.Line(lineConfig);
		
		dividerLinesGroup.add(divLine);
	}
	
	ypos = 150;
	//place the li items in order and resize
	$("#dataTypeOutputHolder ul").css("font-size", 16);
	$("#dataTypeOutputHolder ul").css("left",barWidth * 0.12); 
	$("#dataTypeOutputHolder ul").css("top",ypos); 
	$("#dataTypeOutputHolder ul li").css("height", barWidth * 0.06);
	$("#dataTypeOutputHolder ul li").css("width", barWidth * 0.06);
	$("#dataTypeOutputHolder ul li span").css("width", barWidth * 0.6);
	$("#dataTypeOutputHolder ul li span").css("padding-left", barWidth * 0.09)
	
	ypos = barWidth * 0.10;
	$("#dataTypeOutputHolder ul li:nth-child(2)").css("top",ypos); 
	ypos += barWidth * 0.10;
	$("#dataTypeOutputHolder ul li:nth-child(3)").css("top",ypos); 

	var targetDataLi = "#dataTypeOutputHolder ul li:nth-child(" + _globalVars.selectedDataType + ")";
	$(targetDataLi).addClass("selectedLi");
	
	//add all data type elements to stage
	dataTypeBGLayer.add(dataTypeBg);
	dataTypeBGLayer.add(dividerLinesGroup);
	closedataTypeBtnGroup.add(closedataTypeBtnBG);
	closedataTypeBtnGroup.add(closedataTypeX);
	dataTypeBGLayer.add(closedataTypeBtnGroup);
	dataTypeStage.add(dataTypeBGLayer);
	
	
	//-- Add Choose Company Panel------------------------------//
	$("#chooseCompanyHolder").css("margin-left", -barWidth * 1.2);
	//create new stage element
	var chooseCompanyStage = new Kinetic.Stage({
	  container: "chooseCompanyHolder",
	  width: barWidth * 0.95,
	  height:_globalVars.screenHeight,
	  x:0,
   	  y:64,
	});	
	var chooseCompanyBGLayer = new Kinetic.Layer();
	
	//add background
	$("#chooseCompanyHolder").css("width", barWidth * 0.95);
	$("#chooseCompanyHolder").css("height", _globalVars.screenHeight);
	$("#chooseCompanyHolder").css("left",0); 
	
	//create holding group first
	var chooseCompanyGroupConfig = {
		x:0,
		y:0,
		width: barWidth * 0.95,
		height: _globalVars.screenHeight
	}
	var  chooseCompanyGroup = new Kinetic.Group(chooseCompanyGroupConfig);
	
	//create gray bg
	var chooseCompanyBg = new Kinetic.Rect(subpanelBgConfig);
	
	//add choose company close button	
	var closechooseCompanyBtnGroupConfig = {
		x:barWidth * 0.75,
		y:barWidth * 0.07,
		width: barWidth * 0.122,
		height: barWidth * 0.122
	}
	var closechooseCompanyBtnGroup = new Kinetic.Group(closechooseCompanyBtnGroupConfig);
	
	//add orange button background
	var closechooseCompanyBtnBG = new Kinetic.Rect(closeBtnBGConfig);
	
	//add white X as a shape
	var closechooseCompanyX = new Kinetic.Shape(closeXconfig);
	
	//add choose company header and selected text
	var ypos = barWidth * 0.27;
	alignHeaderType("chooseCompanyHeader", (barWidth * 0.05), ypos);
	
	ypos += barWidth * 0.06;
	alignHeaderType("chooseCompanySelected", (barWidth * 0.07), ypos);
	
	//add divider lines
	//add horizontal divider line
	var lineXpos = barWidth * 0.07;
	var tempWidth = barWidth * 0.80;
	var lineYs = [33,  172];
	
	var dividerLinesGroupConfig = {
		x:lineXpos,
		y:0
	}
	var dividerLinesGroup = new Kinetic.Group(dividerLinesGroupConfig);
	
	for(var i=0; i<2; i++){
		var lineConfig = {
			x:0,
			y:lineYs[i],
			points: [0, lineYs[i], tempWidth, lineYs[i]],
			stroke:"#aaa9a9",
			strokeWidth:1
		}
		var divLine = new Kinetic.Line(lineConfig);
		
		dividerLinesGroup.add(divLine);
	}
	
	var positionDropdown = function(parent, dropdown){
		var parentDiv = parent;
		var dropdownDiv = dropdown;
		$("#" + parentDiv).css("width", barWidth * 0.80);
		$("#" + parentDiv).css("left",barWidth * 0.07); 
		$("#" + parentDiv).css("top", ypos); 
		$("#" + parentDiv + " span").css("font-size", 12);
		$("#" + parentDiv + " span").css("z-index", 100);
		$("#" + dropdownDiv).css("margin-top", barWidth * 0.02); 
		$("#" + dropdownDiv).css("padding", barWidth * 0.03); 
		$("#" + dropdownDiv).css("font-size", barWidth * 0.06); 	
		$("#" + dropdownDiv).css("width", barWidth * 0.75);	
		$("#" + parentDiv + " > div#dropdownOptionsHolder").css("padding", barWidth * 0.03); 
		$("#" + parentDiv + " > div#dropdownOptionsHolder").css("width", barWidth * 0.756);	
		$("#" + parentDiv + " > div#dropdownOptionsHolder > div").css("padding", barWidth * 0.02);	
		$("#" + parentDiv + " > div#dropdownOptionsHolder > div span").css("padding-left", barWidth * 0.09);	
		$("#" + parentDiv + " > div#dropdownOptionsHolder").css("margin-top", barWidth * 0.145);
	};
	
	ypos = 145;
	positionDropdown("choosePrimaryCompany", "primarydropdown");
	
	ypos = 208;
	positionDropdown("chooseSecondaryCompany1", "altCompany1dropdown");
	
	ypos = 268;
	positionDropdown("chooseSecondaryCompany2", "altCompany2dropdown");
	
	ypos = 328;
	positionDropdown("chooseSecondaryCompany3", "altCompany3dropdown");

	chooseCompanyBGLayer.add(chooseCompanyBg);
	chooseCompanyBGLayer.add(dividerLinesGroup);
	closechooseCompanyBtnGroup.add(closechooseCompanyBtnBG);
	closechooseCompanyBtnGroup.add(closechooseCompanyX);
	chooseCompanyBGLayer.add(closechooseCompanyBtnGroup);
	chooseCompanyStage.add(chooseCompanyBGLayer);

	

	//------add events for the settings buttons----------//

	//----event handlers for canvas elements
	$("#settingsHeader").click(function(){ toggleSettingsPanel() });
	
	closeDateBtnGroup.on("mousedown touchstart", function(){ toggleSubSettingsPanel("dateChooseHolder") });
	closeViewbyBtnGroup.on("mousedown touchstart", function(){ toggleSubSettingsPanel("viewByChooseHolder") });
	closedataTypeBtnGroup.on("mousedown touchstart", function(){ toggleSubSettingsPanel("dataTypeOutputHolder") });
	closechooseCompanyBtnGroup.on("mousedown touchstart", function(){ toggleSubSettingsPanel("chooseCompanyHolder") });
	
	//set trigger events for non-canvas elements
	$("#dataRangeChooseHolder").click(function(){
		toggleSubSettingsPanel("dateChooseHolder");
	});
	
	$("#viewByHolder").click(function(){
		toggleSubSettingsPanel("viewByChooseHolder");
	});
	
	$("#dataTypeHolder").click(function(){
		toggleSubSettingsPanel("dataTypeOutputHolder");
	});
	
	$("#comaniesHolder").click(function(){
		toggleSubSettingsPanel("chooseCompanyHolder");
	});
	
	$("#viewByChooseHolder ul li").click(function(event){
		var prevTargetLi = "#viewByChooseHolder ul li:nth-child(" + _globalVars.selectedViewBy + ")";
		$(prevTargetLi).removeClass("selectedLi");
		_globalVars.selectedViewBy = $(this).attr("alt");
		$(this).addClass("selectedLi");
		
		//Update output selection divs to show new selection
		$("#viewByOutputSelected").html( $(this).attr("name") );
		$("#viewbyOption").html( $(this).attr("name") );
	});
	
	$("#dataTypeOutputHolder ul li").click(function(event){
		var prevTargetLi = "#dataTypeOutputHolder ul li:nth-child(" + _globalVars.selectedDataType + ")";
		$(prevTargetLi).removeClass("selectedLi");
		_globalVars.selectedDataType = $(this).attr("alt");
		$(this).addClass("selectedLi");
		
		//Update output selection div to show new selection
		$("#dataTypeOutputSelected").html( $(this).attr("name") );
		$("#dataTypeOption").html( $(this).attr("name") );
	});
	
	//create functions and events for choose company(s) dropdown
	$("#primarydropdown").click(function(){
		toggleDropdown("primarydropdown", "choosePrimaryCompany > div#dropdownOptionsHolder", "choosePrimaryCompany");
	});
	
	$("#altCompany1dropdown").click(function(){
		toggleDropdown("altCompany1dropdown", "chooseSecondaryCompany1 > div#dropdownOptionsHolder", "chooseSecondaryCompany1");
	});
	
	$("#altCompany2dropdown").click(function(){
		toggleDropdown("altCompany2dropdown", "chooseSecondaryCompany2 > div#dropdownOptionsHolder", "chooseSecondaryCompany2");
	});
	
	$("#altCompany3dropdown").click(function(){
		toggleDropdown("altCompany3dropdown", "chooseSecondaryCompany3 > div#dropdownOptionsHolder", "chooseSecondaryCompany3");
	});
	
	
	var toggleDropdown = function(parent, target, holder){
		var targetDiv = $("#" + target);	
		var parentDiv = $("#" + parent);
		var holder = $("#" + holder);
		
		//hack to overcome menus not showing up properly 
		//first we reset the z-index of all menus
		$("#choosePrimaryCompany").css("z-index", "145");
		$("#chooseSecondaryCompany1").css("z-index", "145");
		$("#chooseSecondaryCompany2").css("z-index", "145");
		$("#chooseSecondaryCompany3").css("z-index", "145");
		//next move the current menu to the top
		holder.css("z-index", "146");
		
		//hide/show dropdown
		var isShown = targetDiv.css("display");
		if(isShown == "none"){
			targetDiv.css("display", "block");
			parentDiv.css("background-color", "#c5bfb5");
			parentDiv.css("color", "#fff");
			parentDiv.css("background-image", "url('images/drop_down_arrow_on.png')");
		}else{
			targetDiv.css("display", "none");
			
			if(parent == "primarydropdown"){
				parentDiv.css("color", "#f78e1e");
				parentDiv.css("background-color", "#f3f2f0");
				parentDiv.css("background-image", "url('images/drop_down_arrow.png')");
			}else{
				parentDiv.css("background-color", "#787878");
				parentDiv.css("color", "#c8c8c8");
				parentDiv.css("background-image", "url('images/drop_down_arrow_dark.png')");
			}
		}		
	}
	
	$("#choosePrimaryCompany div#dropdownOptionsHolder > div").click(function(event){
		chooseFromDropdown($(this), "primarydropdown", "choosePrimaryCompany div#dropdownOptionsHolder");
	});
	
	$("#chooseSecondaryCompany1 div#dropdownOptionsHolder > div").click(function(event){
		chooseFromDropdown($(this), "altCompany1dropdown", "chooseSecondaryCompany1 div#dropdownOptionsHolder");
	});
	
	$("#chooseSecondaryCompany2 div#dropdownOptionsHolder > div").click(function(event){
		chooseFromDropdown($(this), "altCompany2dropdown", "chooseSecondaryCompany2 div#dropdownOptionsHolder");
	});
	
	$("#chooseSecondaryCompany3 div#dropdownOptionsHolder > div").click(function(event){
		chooseFromDropdown($(this), "altCompany3dropdown", "chooseSecondaryCompany3 div#dropdownOptionsHolder");
	});
	
	var chooseFromDropdown = function(target, parent, holder){
		var prevTargetDiv = "#" + holder + " > div:nth-child(" + _globalVars.currentSelectedCompany + ")";
		$(prevTargetDiv).removeClass("selectedDropdown");
		_globalVars.currentSelectedCompany = $(target).attr("alt");
		$(target).addClass("selectedDropdown");
		//Update output selection divs to show new selection
		$("#" + parent).html( $(target).attr("name") );
		
		if(parent == "primarydropdown"){
			$("#companiesOption").html( $(target).attr("name") );
		}
		toggleDropdown(parent, holder);
	}
	
	
	//these are the actual function that do the animations
	var toggleSettingsPanel = function(){
		//move the settings div and disable/enable the app
		var xpos = 0;
		if(_globalVars.settingsEnabled == true){
			$("#app_curtain").css("display", "none");
			xpos = -barWidth * 0.95;
			_globalVars.settingsEnabled = false;
		}else{
			$("#app_curtain").css("display", "block");
			$("#app_curtain").css("opacity", 0);
			$("#app_curtain").animate({opacity:0.8},{duration:500, easing:"easeOutBack"});
			xpos = 0;
			_globalVars.settingsEnabled = true;
		}
		
		$("#settings_container").animate(
			{
				left:xpos}, 
			{
				duration:500, 
				easing: "easeOutBack"
			}
		);
	};
	
	var toggleSubSettingsPanel = function(target){
		var targetDiv = null;
		if(target == "dateChooseHolder"){
			targetDiv = $("#dateChooseHolder");
		}else if(target == "viewByChooseHolder"){
			targetDiv = $("#viewByChooseHolder");
		}else if(target == "dataTypeOutputHolder"){
			targetDiv = $("#dataTypeOutputHolder");	
		}else if(target == "chooseCompanyHolder"){
			targetDiv = $("#chooseCompanyHolder");	
		}
		
		var xpos = 0;
		if(_globalVars.dateChooseEnabled == true){
			xpos = -barWidth * 1.2;
			_globalVars.dateChooseEnabled = false;
		}else{
			xpos = 0;
			_globalVars.dateChooseEnabled = true;
		}
		
		targetDiv.animate(
			{
				"margin-left":xpos}, 
			{
				duration:500, 
				easing: "easeOutBack"
			}
		);
	}
	
	//-------------------------------------------------------//
	//---------END SETTINGS TOOLBAR------------------------//
	//-------------------------------------------------------//
	
	//this is for dev only <---------------------
	var app_chart = new Chart();
	app_chart.init(_globalVars.screenWidth, _globalVars.screenHeight);
	app_chart.plotLines();
	app_chart.createDateRange("07/01/2012", "07/26/2012", "day");

	//array order is: day, exposure, relevance, trust
	var testPoints = new Array([0, 10, 10, -0.96], [3, 0.4, 15, 0.3], [13, 90, 5, 0.1]);
	app_chart.plotPoints(testPoints);
	app_chart.plotTrendline([0.5, 1.2, 2, 1.5, 49, 15, 89, 10, 15, 0.4, 0.2, 0.5, 1, 1, 2, 3, 4, 6, 2, 8, 12, 4, 5, 0.5, 0.2]);
	app_chart.render();
});

//redraw on resize
window.onresize = function(event) {
    //window.location = "index.php";
}