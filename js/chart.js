//Main chart class
function Chart(){
	
	//set init global chart vars...
	this.chartWidth = 0;
	this.chartHeight = 0;
	this.chartX = 0;
	this.chartY = 0;
	this.chartStage = null;	
	this.graphLayerConfig = {};
	this.plotLineGroup = null;
	this.plotLine = null;
	this.plotXStart = 0;
	this.plotYStart = 0;
	this.plotYNumber1 = 0;
	this.plotYNumber2 = 0;
	this.plotYNumber3 = 0;
	this.plotSectorHeight = 0;
	this.verticalPlotXGroup1 = null;
	this.verticalPlotXGroup2 = null;
	this.verticalPlotXGroup3 = null;
	this.horizontalPlotYGroup = null;
	this.horizontalGrayPlotYGroup = null;
	this.dateSeparator = null;
	this.notchLength = null;
	this.startDate = null;
	this.endDate = null;
	this.datesArray = null;
	this.pointsGroup = null;
	this.pointsArray = null;
	this.trustColorArray = null;
	this.trendLinePoints = null;
	this.trendPointsGroup = null;
	this.trendLine = null;
	this.pointDetailsStage = null;
	this.pointDetailsLayer = null;
	this.closePointDetailsButton = null;
	this.selectedPoint = null;
	
	//init the app...
	this.init = function(width, height){
		this.chartWidth = width * 0.98;
		this.chartHeight = height * 0.88;
		this.chartX = this.chartWidth * 0.03 ;
		this.chartY = this.chartHeight * 0.152;
		this.plotXStart = this.chartWidth*0.06;
		this.plotYStart = this.chartHeight*0.76;
		this.plotSectorHeight = this.chartHeight * 0.76 / 3;
		this.trustColorArray = new Array("#c10505", "#aa2122", "#89494c", "#64767a", "#3fa2a8", "#20c8cf", "#0be1e9");
		
		//create the main stage
		this.chartStage = new Kinetic.Stage({
			container: "appChart",
			width: this.chartWidth,
			height:this.chartHeight,
			x:this.chartX,
			y:this.chartY,
		});	
		
		//create and add bg layer
		this.graphLayerConfig = {
			x:0,
			y:0,
			width: this.chartWidth,
			height:this.chartHeight
		}		
		this.graphLayer = new Kinetic.Layer(this.graphLayerConfig);
		
		//create point details stage
		this.pointDetailsStage = new Kinetic.Stage({
			container: "tabsCloseBtn",
			width:0,
			height:0,
			x:0,
			y:0,
			scale:[1,1]
		});
		//create point details layer
		var pointDetailsLayerConfig = {
			x:0,
			y:0,
			width:width,
			height:height
		}
		this.pointDetailsLayer = new Kinetic.Layer(pointDetailsLayerConfig);
				
		//format details screen and popup screen
		this.formatPointDetailsScreen(height, width);
		this.formatPointPopupScreen();
	}//end init method
	
	this.formatPointDetailsScreen = function(height, width){
		//this.showPointDetails();
		//set the positioning/size of the graph point details window
		$("#tabs").css("margin-top", 50);
		$("#content-wrapper").css("top", 140);
		$("#content-wrapper").css("height", height);
		$("#top-content, #top-influencers, #top-twitter").css("width", this.chartWidth*0.99);
		$("#top-content, #top-influencers, #top-twitter").css("margin-left", this.chartWidth*0.015);
		//$("#tabs li").css("font-size", this.chartWidth * 0.020);
		$(".top-content-content h2").css("font-size", 26);
		$(".top-content-content p").css("font-size", 12);
		$(".top-content-content p").css("line-height", "1.5em");
		$(".top-content-score, .top-content-rank").css("font-size", 36);
		$(".top-content-rank, .top-content-score").css("margin-left", 26);
		$(".top-content-rank, .top-content-score").css("margin-right", 0);
		$(".top-content-content").css("margin-left", 37);
		$(".top-content-content a").css("font-size", 12);
		$(".top-content-content a.inlineLink").css("display", "inline");
		$(".top-content-content a.inlineLink").css("float", "none");
		//calculate height of graph
		$("#top-content, #top-influencers, #top-twitter").css("height", this.chartHeight * 0.82);
		$(".top-content-title").css("font-size", 12);
		$(".top-content-title").css("margin-left", 37);
		$(".top-content-title").css("margin-right", 0);
		$(".top-content-title").css("margin-top", this.chartWidth*0.02);
		$(".top-content-headshot").css("margin-top", 8);
		$(".top-content-headshot").css("margin-left", this.chartWidth*0.02);
		$(".top-content-headshot").css("margin-left", this.chartWidth*0.02);
		$(".tweetInfo").css("margin-top", this.chartWidth*0.01);
		$(".tweetInfo").css("margin-bottom", this.chartWidth*0.01);
		//
		$("#tabsCloseBtn").css("top", 8);
				
		
		//create close handler for trend point detail popup
		//and the point detail popup
		$("#trendDetailClose").click(function(){
			$("#trend-detail-wrapper").css("left", -999);
		});
		
		$("#pointDetailClose").click(function(){
			$("#point-detail-wrapper").css("left", -999);
		});

		this.assignTabHandlers();
	}
	
	this.formatPointPopupScreen = function(){
		//$("#bottom p").css("left", -999);
		//
	}
	
	
	//function to create the xy plot lines
	this.plotLines = function(){
	
		//create group to hold the plot xy lines
		this.plotLineGroup = new Kinetic.Group();
		
		//create the graph lines
		var pointArray = [ this.plotXStart, 0, this.plotXStart, (this.chartHeight*0.8) ];
		var tempConfig = this.createLineConfig(pointArray);
		this.plotLine = new Kinetic.Line(tempConfig);
		this.graphLayer.add(this.plotLine);
		
		var pointArray = [ (this.chartWidth*0.043), (this.chartHeight*0.76), (this.chartWidth), (this.chartHeight*0.76) ];
		var tempConfig = this.createLineConfig(pointArray);
		this.plotLine = new Kinetic.Line(tempConfig);
		this.graphLayer.add(this.plotLine);
		
		//plot the short vertical lines
		//start 0.1 - 1 group
		var vPlotXConfig = {
			x:0,
			y: this.plotSectorHeight * 2
		};
		this.verticalPlotXGroup1 = new Kinetic.Group(vPlotXConfig);
		this.createYAxisDashes("0-1");
		this.createXYAxisBGlines("0-1");
		
		//1-10 group
		var vPlotXConfig = {
			x:0,
			y: this.plotSectorHeight * 1
		};
		this.verticalPlotXGroup2 = new Kinetic.Group(vPlotXConfig);
		this.createYAxisDashes("1-10");
		this.createXYAxisBGlines("1-10");
		
		//10-100 group
		var vPlotXConfig = {
			x:0,
			y:0
		};
		this.verticalPlotXGroup3 = new Kinetic.Group(vPlotXConfig);
		this.createYAxisDashes("10-100");
		this.createXYAxisBGlines("10-100");
		
		//1,10, and 100 y axis markers		
		this.graphLayer.add(this.verticalPlotXGroup1);
		this.graphLayer.add(this.verticalPlotXGroup2);
		this.graphLayer.add(this.verticalPlotXGroup3);
		
		
		//create y axis text markers
		var fSize = this.chartHeight * 0.020;
		var mLeft = this.chartHeight * 0.04;
		
		var mTop = this.plotSectorHeight * 3 - (fSize/2);
		var zeroMarkerConfig = {
			x:mLeft,
			y:mTop,
			text: "0",
			fontSize: fSize,
			fontFamily: "Arial",
			textFill: "#666"		
		}		
		var zeroMarker = new Kinetic.Text(zeroMarkerConfig);
		
		var mTop = this.plotSectorHeight * 2 - (fSize/2);
		var oneMarkerConfig = {
			x:mLeft,
			y:mTop,
			text: "1",
			fontSize: fSize,
			fontFamily: "Arial",
			textFill: "#666"		
		}		
		var oneMarker = new Kinetic.Text(oneMarkerConfig);
		
		var mTop = this.plotSectorHeight - (fSize/2);
		var tenMarkerConfig = {
			x:mLeft,
			y:mTop,
			text: "10",
			fontSize: fSize,
			fontFamily: "Arial",
			textFill: "#666"		
		}		
		var tenMarker = new Kinetic.Text(tenMarkerConfig);
		
		var mTop = 0 - (fSize/2);
		var hundredMarkerConfig = {
			x:mLeft,
			y:mTop,
			text: "100",
			fontSize: fSize,
			fontFamily: "Arial",
			textFill: "#666"		
		}		
		var hundredMarker = new Kinetic.Text(hundredMarkerConfig);
		
		this.graphLayer.add(zeroMarker);
		this.graphLayer.add(oneMarker);
		this.graphLayer.add(tenMarker);
		this.graphLayer.add(hundredMarker);
		
		$("#hundredMarker").css("font-size", fSize);
		$("#hundredMarker").css("left", mLeft);
		$("#hundredMarker").css("top", mTop);
		
		var mTop = (this.chartY + this.plotSectorHeight) - (fSize/2);
		$("#tenMarker").css("font-size", fSize);
		$("#tenMarker").css("left", mLeft);
		$("#tenMarker").css("top", mTop);
		
		var mTop = (this.chartY + (this.plotSectorHeight*2)) - (fSize/2);
		$("#oneMarker").css("font-size", fSize);
		$("#oneMarker").css("left", mLeft);
		$("#oneMarker").css("top", mTop);
		
		var fSize = this.chartHeight * 0.025;
		var mLeft = -(fSize*2);
		var mTop = (this.chartHeight/2) - (fSize/2);
		$("#yAxisHeading").css("font-size", fSize);
		$("#yAxisHeading").css("left", mLeft);
		$("#yAxisHeading").css("top", mTop);
	}
	
	//function to create vertical dashes on x axis
	this.createYAxisDashes = function(range){
		var tempY = null;	
		if(range == "0-1"){
			for(var i=0; i<1; i+=0.1){
				tempY = ((Math.log(i)/Math.log(10)+1) * this.plotSectorHeight);
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ (this.chartWidth*0.043), tempY, this.plotXStart, tempY];
				var tempConfig = this.createLineConfig(pointArray);
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup1.add(this.plotLine);
			}			
		}else if(range == "1-10"){
			for(var i=1; i<11; i++){
				tempY = ((Math.log(i)/Math.log(10)+1) * this.plotSectorHeight )/2;
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ (this.chartWidth*0.043), tempY, this.plotXStart, tempY];
				var tempConfig = this.createLineConfig(pointArray);
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup2.add(this.plotLine);
			}
		}else if(range == "10-100"){
			for(var i=10; i<110; i+=10){
				tempY = ((Math.log(i)/Math.log(10)) * this.plotSectorHeight )/2;
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ (this.chartWidth*0.043), tempY, this.plotXStart, tempY];
				var tempConfig = this.createLineConfig(pointArray);
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup3.add(this.plotLine);
			}
		}
	}
	
	//function to create vertical dashes on x axis
	this.createXYAxisBGlines = function(range){
		var tempY = null;	
		if(range == "0-1"){
			for(var i=0.2; i<1; i+=0.1){
				tempY = ((Math.log(i)/Math.log(10)+1) * this.plotSectorHeight);
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ this.plotXStart, tempY, this.chartWidth, tempY];
				var tempConfig = this.createLineConfig(pointArray, "#e6e6e6");
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup1.add(this.plotLine);
			}			
		}else if(range == "1-10"){
			for(var i=1; i<11; i++){
				tempY = ((Math.log(i)/Math.log(10)+1) * this.plotSectorHeight )/2;
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ this.plotXStart, tempY, this.chartWidth, tempY];
				var tempConfig = this.createLineConfig(pointArray, "#e6e6e6");
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup2.add(this.plotLine);
			}
		}else if(range == "10-100"){
			for(var i=10; i<110; i+=10){
				tempY = ((Math.log(i)/Math.log(10)) * this.plotSectorHeight )/2;
				tempY = this.plotSectorHeight - tempY;
				var pointArray = [ this.plotXStart, tempY, this.chartWidth, tempY];
				var tempConfig = this.createLineConfig(pointArray, "#e6e6e6");
				this.plotLine = new Kinetic.Line(tempConfig);
				this.verticalPlotXGroup3.add(this.plotLine);
			}
		}
	}
	
	//helper function to compile and return config array for lines
	this.createLineConfig = function(linePoints, color){
		var strokeColor = "#828282";
		if(color != null){
			strokeColor = color;
		}
		var lineConfig = {
			points: linePoints,
			stroke: strokeColor,
			strokeWidth:1,
			lineCap: "round",
			lineJoin: "round"
		}
		
		return lineConfig;
	}	
	
	//----------------------------------------------
	//create date range ticks and horizontal lines
	this.createDateRange = function(start, end, viewType){
		this.datesArray = new Array();
		var oneDay = 24*60*60*1000; 
		this.startDate = new Date(start);
		this.endDate = new Date(end);
		var dayPointer = this.startDate.getTime();		
		var dayDiff = (this.endDate - this.startDate)/oneDay;
		this.dateSeparator = (this.chartWidth - this.plotXStart)/ (dayDiff+1.3);
		this.notchLength = (this.chartHeight*0.8) - this.plotYStart;
		var dateText = null;
		var fSize = this.notchLength/2.3;

		//add days to the dates array
		for(var i=0; i<dayDiff+1; i++){
			this.datesArray[i] = new Date(dayPointer);
			dayPointer += oneDay;
		}
		
		//add group and plot points on stage
		var hPlotConfig = {
			x:this.plotXStart,
			y:this.plotYStart,	
		}
		this.horizontalPlotYGroup = new Kinetic.Group(hPlotConfig);
		
		var hGrayPlotConfig = {
			x:this.plotXStart,
			y:0
		}
		this.horizontalGrayPlotYGroup = new Kinetic.Group(hGrayPlotConfig);
		
		//plot vertial ticks and dates
		var notchPosition = 0;
		for(var i=0; i < this.datesArray.length; i++){
			
			//add small ticks
			var pointArray = [notchPosition, 0, notchPosition, this.notchLength];
			var tempConfig = this.createLineConfig(pointArray);
			this.plotLine = new Kinetic.Line(tempConfig);
			notchPosition += this.dateSeparator;
			this.horizontalPlotYGroup.add(this.plotLine);
			
			//add long gray lines
			var pointArray = [notchPosition, 0, notchPosition, this.plotYStart];
			var tempConfig = this.createLineConfig(pointArray, "#e6e6e6");
			this.plotLine = new Kinetic.Line(tempConfig);
			this.horizontalGrayPlotYGroup.add(this.plotLine);
			
			//add the text
			var tempDay = this.datesArray[i].getDate();
			var tempMonth = this.datesArray[i].getMonth()+1;
			if(tempDay < 10) tempDay = "0" + tempDay;
			if(tempMonth < 10) tempMonth = "0" + tempMonth;
			dateText = tempMonth + "/" + tempDay;
			var textConfig = {
				x: notchPosition - (fSize*1.8),
				y: this.notchLength *1.4,
				text: dateText,
			  	fontSize: fSize,
			  	fontFamily: "Arial",
			  	textFill: "#666"
			}
			dateText = new Kinetic.Text(textConfig);
			this.horizontalPlotYGroup.add(dateText);
			
		}
		
		this.graphLayer.add(this.horizontalPlotYGroup);
		this.graphLayer.add(this.horizontalGrayPlotYGroup);
		
	}//end date generation method
	
	//public function to plot points
	this.plotPoints = function(points){
		this.pointsArray = points;
		var pointsGroupConfig = {
			x:this.plotXStart + this.dateSeparator,
			y:0
		}
		this.pointsGroup = new Kinetic.Group(pointsGroupConfig);
		
		//plot each individual point
		for(var i=0; i< points.length; i++){
			this.plotPoint(points[i], i);	
		}
	}	
	
	//function to plot each individual point
	this.plotPoint = function(point, pID){
		var self = this;
		var tempY = 0;
		var relevance = 0;

		//cposition based upon relevance
		var relevance = point[1];
		tempY = this.setlog10Ypos(relevance);
		
		//color based upon trust score
		//this.trustColorArray
		var pointTrust = parseFloat(point[3]);
		var trustColor = "";
		if(pointTrust <= -0.66){
			trustColor = this.trustColorArray[0];
		}else if(pointTrust > -0.66 && pointTrust <= -0.33){
			trustColor = this.trustColorArray[1];
		}else if(pointTrust > -0.33 && pointTrust <= -0.1){
			trustColor = this.trustColorArray[2];
		}else if(pointTrust > -.1 && pointTrust <= 0.1){
			trustColor = this.trustColorArray[3];
		}else if(pointTrust >0.1 && pointTrust <= 0.33){
			trustColor = this.trustColorArray[4];
		}else if(pointTrust >0.33 && pointTrust <= 0.66){
			trustColor = this.trustColorArray[5];
		}else if(pointTrust > 0.66){
			trustColor = this.trustColorArray[6];
		}
		
		var xpos = point[0] * this.dateSeparator;
		var pointConfig = {
			x:xpos,
			y:tempY,
			radius:point[2],
			fill: trustColor,
			stroke: trustColor,
			strokeWidth: 0,
			listening: true,
			name: "gPoint_" + pID
		}
		
		var testPoint = new Kinetic.Circle(pointConfig);
		this.pointsGroup.add(testPoint);
		this.graphLayer.add(this.pointsGroup);
		
		//add event handlers for circle points
		this.addPointHandlers(testPoint, "point", xpos);
		
	}
	
	this.plotTrendline = function(points){
		this.trendLinePoints = points;
		
		var pointsGroupConfig = {
			x:this.plotXStart + this.dateSeparator,
			y:0
		}
		this.trendPointsGroup = new Kinetic.Group(pointsGroupConfig);
		
		for(var i=0; i< this.trendLinePoints.length; i++){
			var xpos = i * this.dateSeparator;
			var ypos = this.setlog10Ypos(this.trendLinePoints[i]);
			var pointConfig = {
				x:xpos,
				y:ypos,
				radius:6,
				fill: "#f78e1e",
				stroke: "#f78e1e",
				strokeWidth: 0,
				listening: true,
				name: "tlPoint_" + i
			}
			var trendPoint = new Kinetic.Circle(pointConfig);
			this.trendPointsGroup.add(trendPoint);
			
			this.addPointHandlers(trendPoint, "tlpoint");
		}
		
		//add the actual line now
		var xOffest = this.plotXStart + this.dateSeparator;
		var initY = 0;
		var separator = this.dateSeparator;
		
		var log10points = new Array();
		
		for(var i=0; i< points.length; i++){
			log10points[i] = this.setlog10Ypos(points[i]);
		}
		var tLineConfig = {
			drawFunc: function(){
				var context = this.getContext();
				context.beginPath();
				//context.moveTo(this.dateSeparator, oldPoint);			
				//context.quadraticCurveTo(midX, midY, (this.dateSeparator*2), newPoint);
				context.moveTo(xOffest, log10points[0]);
				
				for(var i=0; i< points.length; i++){
					var xControl1 = (i*separator) + (separator/2) + xOffest;
					var yControl1 = log10points[i];
					var xControl2 = (i*separator) + (separator/2) + xOffest;
					var yControl2 = log10points[i+1];
					var newPointX = (i*separator) + (separator) + xOffest;
					var newPointY = log10points[i+1];
					var midY = log10points[i+1];
					//console.log(newX);
					//context.quadraticCurveTo(midX, midY, newX, newPoint);
					context.bezierCurveTo(xControl1, yControl1, xControl2, yControl2, newPointX, newPointY);

				}
				//context.closePath();
				//this.fill();
				this.stroke();
			},
			fill:"#f78e1e",
			stroke: "#f78e1e",
			strokeWidth:3,
			x:0,
			y:0
		}
		this.trendLine = new Kinetic.Shape(tLineConfig);
		
		this.graphLayer.add(this.trendLine);
		this.graphLayer.add(this.trendPointsGroup);
	}
	
	//helper function to set y position of dots on chart
	this.setlog10Ypos = function(ypos){
		var log10point = ypos;
		var log10Y = 0;
		if(log10point > 0 && log10point <= 1){
				log10Y = ((Math.log(log10point)/Math.log(10)+1) * this.plotSectorHeight);
				log10Y = this.plotSectorHeight - log10Y + (this.plotSectorHeight*2);
		}else if(log10point > 1 && log10point <= 10){
				log10Y = ((Math.log(log10point)/Math.log(10)+1) * this.plotSectorHeight )/2;
				log10Y = this.plotSectorHeight - log10Y + + (this.plotSectorHeight);
		}else if(log10point > 10){
				log10Y = ((Math.log(log10point)/Math.log(10)) * this.plotSectorHeight )/2;
				log10Y = this.plotSectorHeight - log10Y;
		}
		
		return log10Y;
	}
	
	//event handlers for this class below
	this.addPointHandlers = function(targetPoint, type, xpos){
		var self = this;
		var eventTypes = new Array("mousedown", "touchstart");
		var pointer = 0;
		var yOffset = this.chartY + (this.chartHeight / 2);
		var xOffset = this.chartWidth/2;
		var trendPoints = this.trendLinePoints;
		var gPoints = this.pointsArray;
		var delta = 0;
		var xStart = this.plotXStart;
		var separator = this.dateSeparator;
		
		if(type == "point"){
			for(var i=0; i<eventTypes.length; i++){
				targetPoint.on(eventTypes[i], function(event){
				
				//init - remove popups from screen
				//$("#point-detail-wrapper").css("left", -999);
				$("#trend-detail-wrapper").css("left", -999);
				
				var tempName = targetPoint.attrs.name;
				var tempSplit = tempName.split("_");
				var px = xpos + xStart + (separator*2);
				var py = event.pageY;
				console.log(px);
				//create Y offset for popup box
				if(yOffset < event.pageY){
				 $("#point-detail-wrapper").css("top", event.pageY - 280);			 
				 var tempY = event.pageY - 240;
				 $("#point-detail-wrapper div#left-column").css("top", 280);
				}else{
				 $("#point-detail-wrapper").css("top", event.pageY - 35);
				 $("#point-detail-wrapper div#left-column").css("top", 35);
				}
				
				//create X offset for callout box
				if(px > xOffset){
					$("#point-detail-wrapper").css("left", px - 341);
					$("#point-detail-wrapper div#left-column").css("left", 291);
					$("#point-detail-wrapper img#arrowPointer").attr("src", "images/NetRelevance-GrayArrow-right.png");
				}else{
					$("#point-detail-wrapper").css("left", px);
					$("#point-detail-wrapper img#arrowPointer").attr("src", "images/NetRelevance-GrayArrow.png");
					$("#point-detail-wrapper div#left-column").css("left", 0);
				}
				
				//change the values of the boxes
				var currPoint = gPoints[tempSplit[1]];
				var tempTrust = currPoint[3];
				if(currPoint[3] > 0) tempTrust = "+" + currPoint[3];
				$("#point-detail-wrapper span#middle-right-column p.relevanceValue").html(currPoint[1]);
				$("#point-detail-wrapper span#middle-right-column p.trustValue").html(tempTrust);
				$("#point-detail-wrapper span#middle-right-column p.exposureValue").html(currPoint[2]);

				//animate the box...			
				$("#point-detail-wrapper").css("opacity", 0);
				$("#point-detail-wrapper").animate({
					opacity:1,
					duration: "fast"
				});
				
				//add pointer to selected point
				//console.log();
				self.selectedPoint = tempSplit[1];
			});
			}
		}else if ( type == "tlpoint"){
			for(var i=0; i<eventTypes.length; i++){
			targetPoint.on(eventTypes[i], function(event){ 
				//init - remove popups from screen
				$("#point-detail-wrapper").css("left", -999);
				//$("#trend-detail-wrapper").css("left", -999);
				
				var tempName = targetPoint.attrs.name;
				var tempSplit = tempName.split("_");
				var px = (tempSplit[1] * separator) + (xStart*2.15);
				var py = event.pageY;
				
				
				//create Y offset for popup box
				if(yOffset < event.pageY){
				 $("#trend-detail-wrapper").css("top", event.pageY - 240);
				 
				 var tempY = event.pageY - 240;
				 $("#trend-detail-wrapper div#left-column").css("top", 240);
				}else{
				 $("#trend-detail-wrapper").css("top", event.pageY - 15);
				 $("#trend-detail-wrapper div#left-column").css("top", 15);
				}
				
				//create X offset for callout box
				if(px > xOffset){
					$("#trend-detail-wrapper").css("left", px - 341);
					$("#trend-detail-wrapper div#left-column").css("left", 291);
					$("#trend-detail-wrapper img#arrowPointer").attr("src", "images/NetRelevance-GrayArrow-right.png");
				}else{
					$("#trend-detail-wrapper").css("left", px);
					$("#trend-detail-wrapper img#arrowPointer").attr("src", "images/NetRelevance-GrayArrow.png");
					$("#left-column").css("left", 0);
				}
				
				//animate the box...		
				$("#trend-detail-wrapper").css("opacity", 0);
				$("#trend-detail-wrapper").animate({
					opacity:1,
					duration: "fast"
				});
				
				//change values of popup trend value and change %
				var tempName = targetPoint.attrs.name;
				var val = tempName.split("_");
				pointer = val[1];
				
				var currVal = trendPoints[pointer];
				var preVal = trendPoints[pointer-1];
				
				if(preVal == null){
					delta = "NA";
				}else{
					var tempD = 0;
					if(currVal > preVal){
						tempD = (currVal - preVal) / preVal * 100;
						delta = "+" + Math.round(tempD) + "%";
					}else{
						tempD = (preVal - currVal) / currVal * 100;
						delta = "-" + Math.round(tempD) + "%";
					}
				}
					
				$("#trend-detail-wrapper span#middle-right-column p.trendValue").html(currVal);
				$("#trend-detail-wrapper span#middle-right-column p.trendDelta").html(delta);
			});	
			}
		}
			
		targetPoint.on("mouseover", function(){
			$('#appChart').css("cursor", "pointer");
		});
		targetPoint.on("mouseout", function(){
			$('#appChart').css("cursor", "default");
		});
	}
	
	this.assignTabHandlers = function(){
		var self = this;
		$("#tabsTopContent").click(function(){
			self.showTab("#top-content");
			$(this).addClass("selectedTopTab");
		});
		$("#tabsTopInfluencers").click(function(){
			self.showTab("#top-influencers");
			$(this).addClass("selectedTopTab");
		});
		$("#tabsTopTweets").click(function(){
			self.showTab("#top-twitter");
			$(this).addClass("selectedTopTab");
		});
		
		//add event handler to content analysis button
		$("#instanceFull").click(function(){
			self.showPointDetails();
		});
		
		//add handler for close points details view
		$("#tabsCloseBtn").click(function(){
			self.hidePointDetails();
		});
	}
	
	this.showTab = function(targetTab){
		$("#tabsTopContent").removeClass("selectedTopTab");
		$("#tabsTopInfluencers").removeClass("selectedTopTab");
		$("#tabsTopTweets").removeClass("selectedTopTab");
		
		$("#top-content").css("display", "none");
		$("#top-influencers").css("display", "none");
		$("#top-twitter").css("display", "none");
		$(targetTab).css("display", "block");
	}
	
	this.showPointDetails = function(){
		//hide detail popups	
		$("#settings_container").css("left", 9999);
		$("#header").css("left", 40);
		$("#logo").css("left", this.chartWidth * 0.792);
		$("#tabs-wrapper").css("left", this.chartWidth*1.2);
		$("#tabs-wrapper").animate({
			left:0,
			duration: "fast"
		});
		
		$("#point-detail-wrapper").animate({
			opacity:0,
			duration: "fast"
		});
	}
	
	this.hidePointDetails = function(){
		$("#settings_container").css("left", -269);
		$("#header").css("left", 0);
		$("#logo").css("left", this.chartWidth * 0.852);
		$("#tabs-wrapper").animate({
			left:this.chartWidth*1.2,
			duration: "fast"
		});
		$("#point-detail-wrapper").animate({
			opacity:1,
			duration: "fast"
		});
	}
	
	//add all elements into display layer or remove
	this.render = function(){
		this.chartStage.add(this.graphLayer);
		this.pointDetailsStage.add(this.pointDetailsLayer);
	}
	
	this.clear = function(){
		this.chartStage.clear();
	}
	
	
}//end of class

