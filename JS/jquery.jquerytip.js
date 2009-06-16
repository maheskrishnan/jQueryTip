// <copyright file="jquery.jquerytip.js" company="WellDoc">
// Copyright (c) 2009 All Right Reserved
// </copyright>
// <author>Mahes</author>
// <date>2009-04-06</date>


jQuery.fn.jquerytip = function(options) {
	
	// this function will create tooltip(if it is not already exists) and returns...
	function setupDefaultToolTipWindow(){
	
		var objTooltipMainWindow = jQuery("#jquerytip-tooltip-main-window");
		
		if (objTooltipMainWindow[0]) return objTooltipMainWindow;
		
		var strTooltipWindowHTML = "";
		strTooltipWindowHTML += '<div id="jquerytip-tooltip-main-window" class="jquerytip-tooltip-main-window" style="z-index:9999; padding:12px; position:absolute;">';
		strTooltipWindowHTML	+= '<div id="jquerytip-tooltip-inner-window" class="jquerytip-tooltip-inner-window" style="background:#116497; padding:3px;margin:0px;">';
		strTooltipWindowHTML 	+= '	<div id="jquerytip-tooltip-body" class="jquerytip-tooltip-body" style="background-color:#1e90ff; padding:0px; margin:0px;">';
		strTooltipWindowHTML	+= '		<div id="jquerytip-tooltip-inner-body" class="jquerytip-tooltip-inner-body" style="padding:2px; margin:0px;"></div>';		
		strTooltipWindowHTML	+= '	</div>';		
		strTooltipWindowHTML	+= '</div>';
		strTooltipWindowHTML += '</div>';	
		
		objTooltipMainWindow = jQuery(strTooltipWindowHTML);
	
		objTooltipMainWindow.appendTo(document.body).hide();
		
		return 	objTooltipMainWindow;	
	}	//	end of setupDefaultToolTipWindow()

	setupDefaultToolTipWindow();

	var divToolTipMainWindow = jQuery('#jquerytip-tooltip-main-window'); 
	var divToolTipInnerWindow = jQuery('#jquerytip-tooltip-inner-window'); 
	var divToolTipBody = jQuery('#jquerytip-tooltip-body');
	var divToolTiInnerBody = jQuery('#jquerytip-tooltip-inner-body');	
	
	if (jQuery.fn.corners) {
		divToolTipInnerWindow.corners();
		divToolTipBody.corners();		
	}	
	
	return this.each(function(){
		var elem = jQuery(this);
		var title = elem.attr("tooltiptext");
        var stem = elem.attr("tooltipstem"); 
        
        if (!stem){ //  if the element not having "tooltipstem" attribute then look for in options
            stem = (options && options.stem) ? options.stem : "topright";
        }
        
        var strWidth = elem.attr("tooltipwidth");
        if (!strWidth){
            if ((options && options.width)){
                strWidth = ''+options.width;
            }
        }
        
		elem.hover(
	  		function (event) {
	  			
	  			if (stem == "bottomright"){
					divToolTipMainWindow.css("background", "transparent url(../images/jquerytip/rightbottom-shifted.png) no-repeat scroll left top");	  
				}else if (stem == "bottomleft"){	
					divToolTipMainWindow.css("background", "transparent url(../images/jquerytip/topright-shifted.png) no-repeat scroll right top");						
				}else if (stem == "topleft"){
					divToolTipMainWindow.css("background", "transparent url(../images/jquerytip/bottomright-shifted.png) no-repeat scroll right bottom");					
				}else{
					divToolTipMainWindow.css("background", "transparent url(../images/jquerytip/bottomleft.png) no-repeat scroll 20px bottom");					
				}
				
				if (strWidth) divToolTipMainWindow.css("width",strWidth);	
				
	  			//divToolTipBody.html(title);
	  			divToolTiInnerBody.html(title);
	  			divToolTipMainWindow.show();
	  		}, 
	  		function () {
	  			divToolTipMainWindow.hide();
	  		}
		);	//	elem.hover
		
		elem.mousemove(
	  		function (event) {
				var tPosX;
				var tPosY;
				if (stem == "bottomright"){
					tPosX = event.pageX ;
					tPosY = event.pageY + 10;
				}else if (stem == "bottomleft"){
					tPosX = event.pageX - 12 - divToolTipMainWindow.width();
					tPosY = event.pageY + 10;
				}else if (stem == "topleft"){
					tPosX = event.pageX - 12 - divToolTipMainWindow.width();
					tPosY = event.pageY - 26 - divToolTipMainWindow.height();
				}else{	
					tPosX = event.pageX - 12;
					tPosY = event.pageY - 26 - divToolTipMainWindow.height();
				}
				divToolTipMainWindow.css({top: tPosY, left: tPosX}) ;	  	
  			}	// function (event)
		);	//	elem.mousemove
	
	});	// return this.each(function(){})..
  
};	//	jQuery.fn.jquerytip = function(options) {


