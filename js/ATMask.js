
function showMask(messageStr){
	var maskWidth = $(window).width();  
	var maskHeight = $(window).height();  
	var maskHtml = "<div id='maskLoading' class='panel-body' style='z-index:1000; scroll:no;position:absolute;left:0;width:100%;background-color:rgba(255,255,255,0.7);";  
	maskHtml += "height:" + maskHeight + "px;top:0'>";  
	maskHtml += "<div class='panel-header panel=loading' style='position:absolute;cursor:wait;left:" + ((maskWidth / 2) - 131) + "px;top:" + (maskHeight / 2 - 81) + "px;width:181px;height:34px;";  
	maskHtml += "padding:10px 5px 10px 30px;font-size:12px;border:1px solid #ccc;background-color:white;'>";
	maskHtml += "<img src='../css/images/loading.gif' width='31' height='31' align='middle' />";
	maskHtml += "&nbsp;&nbsp;" + messageStr;  
	maskHtml += "</div>";  
	maskHtml += "</div>";  
	document.write(maskHtml);  
}

function CloseMask() {
	if ($('#maskLoading') != undefined && $('#maskLoading') != null){
	    $('#maskLoading').fadeOut('fast', function () {  
	        $(this).remove();  
	    });  
	}
}	
