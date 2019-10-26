/***********************************************************************
* 功能：框架处理网页代码
* 作者：李福明
* 时间：2015-06-10
* 武汉傲腾科技有限公司版权所有 CopyRight 2015
***********************************************************************/
var ip="/OA/"
var localjson=localStorage.getItem("localdata");
console.log(localjson)//打印出来的是json类型数据
var localjsonObj=JSON.parse(localjson);//转换为json对象


/*
 * 功能：查看当前账号是否登录超时，如果超时则退出到登录窗体
 * 时间：2017-08-16
 */
function isSessionValid(){

	if ( localjsonObj.username == undefined ||  localjsonObj.username == null ||
		localjsonObj.username == "null" || localjsonObj.username == "" ||
		localjsonObj.verifyno == undefined || localjsonObj.verifyno  == null ||
		localjsonObj.verifyno == "null" || localjsonObj.verifyno  == ""){
		
		ShowPOPMessage("提示", "您已太长时间未操作，请重新登录！5秒钟后自动跳转...");

		$(document).ready(function(){
			 //这里实现延迟5秒跳转
			setTimeout('relocationToLoad()', 5000);
		});
		
		return false;
	}else{
		try{
			var whereStr = "USER_CODE='" +localjsonObj.username + "' AND VERIFY_NO = '" + localjsonObj.verifyno + "'";
			
			var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_USER\",PARAMETER:\"\",WHERE:\""
				                             + whereStr
				                             +"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"User Info\",IS_GRID:\"0\","
			 								 + "USER_ID:\"" +localjsonObj.username+ "\",VERIFY_NO:\"" + localjsonObj.verifyno+ "\"}";

			var params = {
					getObject :getDataJsonString,
					errorMessage : ""
			};
			
			$.ajax({
				url:ip+"getdata",
				method:"POST",
				data:params,
				datatype:"json",
				success:function(data){
					var jsonobj = JSON.parse(data);  //获取到的列表数据
					
					var dataDS = jsonobj.DATA;
					if (dataDS == undefined || dataDS == null || dataDS.length <= 0){
						ShowPOPMessage("提示", "您的账号已在其它地方登录，请重新登录！5秒钟后自动跳转...");

						$(document).ready(function(){
							 //这里实现延迟5秒跳转
							setTimeout('relocationToLoad()', 5000);
						});
						
						return false;
					}else{
						return true;
					}
				},
				error:function(errorMessage){
					console.log("未取到用户信息");
					
					return false;
				}
			});
		}catch (e) {
			console.log("取用户信息异常出错");
			
			return false;
		}
	}
}

/*
 * 功能：所有页面返回到登录界面
 * 时间：2017-08-16
 */
function relocationToLoad(){
	if (window.parent != null && window.parent != undefined){
		window.parent.location.href = "index.html";
	}else{
		window.location.href = "index.html";
	}
}


/*
 * 功能：显示组件下载窗体
 * 参数：
 * 时间：2016-03-15
 */
function DownloadShow(){
	var screenWidth = $(document.body).width();//window.screen.deviceXDPI;
	var screenHeight = $(document.body).height();//window.screen.deviceYDPI;
	var windowWidth = 300;
	var windowHeight = 300;
	var windowLeft = parseInt((screenWidth - windowWidth) / 2);
	var windowTop = parseInt((screenHeight - windowHeight) / 2);
	
	var windowFeature = "height=" + windowHeight.toString() + "px,width=" + windowWidth.toString()
	                             + "px,top=" + windowTop.toString() + "px,left=" + windowLeft.toString()
	                             + "px,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no";
	                             
	console.log("windowFeature:%s", windowFeature);
	
	window.open("download.html",
	                    "newwindow",
	                    windowFeature);
}

/*
 * 功能：显示帮助窗体
 * 参数：
 * 时间：2016-04-21
 */
function HelpShow(){
	window.open("../Help/help.htm",
	                    "newwindow");
}

/*
 * 功能：通过某个待取数值键值取系统参数SESSION中的值
 * 参数：SESSION对象， SESSION JSON键值
 * 时间：2015-06-11
 */
function getSessionPara(keyStr){
	var retValue = "";
	
	// if (window.sessionStr != undefined && window.sessionStr != null){
	// 	var sessionJSON = window.sessionStr;
		
	// 	if (sessionJSON[keyStr] != undefined && sessionJSON[keyStr] != null){
	// 		retValue = sessionJSON[keyStr];			
	// 	}
		
	// 	if (retValue == "null") retValue = "";
	// }
	if(keyStr=="username"){
		retValue=localjsonObj.username;
	}
	if(keyStr=="group_code"){
		retValue=localjsonObj.group_code;
	}
	if(keyStr=="dept_code"){
		retValue=localjsonObj.dept_code;
	}
	return retValue;
}

/*
 * 功能： 取服务器时间
 * 参数：时间格式，支持的时间格式如下
 *          DATE,TIME,DATETIME,YEAR,MONTH,DAY,HOUR,MINUTE,SECOND
 * 返回：时间字符串
 * 时间：2015-06-11
 */
function getServerDateTime(dateFormat){
	var retValue = "";
	
	try{
		var getDataJsonString = "{GETTYPE:\"GETDATE\",DBOBJECT:\"0\",OBJECT:\"" + dateFormat
		 								 + "\",PARAMETER:\"\",WHERE:\"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"Server DateTime\",IS_GRID:\"0\","
		 								 + "USER_ID:\"" +localjsonObj.username + "\",VERIFY_NO:\"" +localjsonObj.verifyno + "\"}";

		var params = {
				getObject :getDataJsonString,
				errorMessage : ""
		};
		
		$.ajax({
			url:ip+"getdata",
			method:"POST",
			data:params,
			async: false,
			datatype:"json",
			success:function(data){
				var jsonobj = JSON.parse(data);  //获取到的列表数据
				
				retValue = jsonobj.DATA;
			},
			error:function(errorMessage){
				ShowMessage("提示...", "未取到服务器时间", "W");
			}
		});
	}catch (e) {
		ShowMessage("错误...", "未取到服务器时间！" + e.description, "E");
	}
	
	return retValue;
}

/*
 * 功能： 取订单号
 * 参数：订单类型
 * 返回：订单号
 * 时间：2015-12-21
 */
function getBillCode(billType){
	var retValue = "";
	
	try{
		var getDataJsonString = "{GETTYPE:\"GETCODE\",DBOBJECT:\"0\",OBJECT:\"" + billType
		 								 + "\",PARAMETER:\"\",WHERE:\"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"0\",IS_GRID:\"0\","
		 								 + "USER_ID:\"" + localjsonObj.username  + "\",VERIFY_NO:\"" + localjsonObj.verifyno + "\"}";

		var params = {
				getObject :getDataJsonString,
				errorMessage : ""
		};
		
		$.ajax({
			url:ip+"getdata",
			method:"POST",
			data:params,
			async: false,
			datatype:"json",
			success:function(data){
				var jsonobj = JSON.parse(data);  //获取到的列表数据
				
				retValue = jsonobj.DATA;
			},
			error:function(errorMessage){
				ShowMessage("提示...", "未取到服务器时间", "W");
			}
		});
	}catch (e) {
		ShowMessage("错误...", "未取到服务器时间！" + e.description, "E");
	}
	
	return retValue;
}


/*
 * 功能：通过默认值类型取默认值
 * 参数：默认值类型字符串
 * 时间：2015-06-11
 */
function getDefaultValue(defaultType){
	var retValue = defaultType;
	
	//alert(defaultType);
	
	defaultType = defaultType.toUpperCase();
	var subType = defaultType.substring(0, 1);
	
	if (subType == "$"){
		if (defaultType == "$GETDATE"){
			retValue = getServerDateTime("DATETIME");
		}else if (defaultType == "$USER"){
			retValue = getSessionPara("username");			
		}else if (defaultType == "$GROUP_CODE"){
			retValue = getSessionPara("group_code");		
		}else if (defaultType == "$DEPART_CODE"){
			retValue = getSessionPara("dept_code");		
		}else if (defaultType == "$GUID"){
			retValue = guid();
		}else if (defaultType.indexOf("$BILL_CODE") >= 0){
			var billSplit = defaultType.split("|");
			if (billSplit != null && billSplit != undefined){
				if (billSplit.length == 2){
					retValue = getBillCode(billSplit[1]);
				}
			}
		}else{
			retValue = valueStr;
		}
	}
	
	//alert(defaultType + ":" + retValue);
	
	return retValue;
}

/*
 * 功能：进行线程暂停
 * 参数：毫秒
 * 时间：2015-06-10
 */
function sleep(numberMillis) {  
			var now = new Date();  
			var exitTime = now.getTime() + numberMillis;  
			while (true) {  
				now = new Date();  
				if (now.getTime() > exitTime)  return;  
			}  
}


/*
 * 功能：显示消息
 * 参数：标题字符串，消息字符串，消息类型（'':普通提示框       E:错误消息框          I:信息框       Q:问题消息框    W：警告消息框）
 * 时间：2015-06-11
 */
function ShowMessage(titleStr, messStr, messType){
	var subType = messType.toUpperCase().substring(0, 1);
	
	if (subType == "E"){
		$.messager.alert(titleStr, messStr, "error");
	}else if (subType == "I"){
		$.messager.alert(titleStr, messStr, "info");
	}else if (subType == "Q"){
		$.messager.alert(titleStr, messStr, "question");
	}else if (subType == "W"){
		$.messager.alert(titleStr, messStr, "warning");
	}else{
		$.messager.alert(titleStr, messStr);
	}
}


/*
 * 功能：在窗体右下方显示一下消息提示弹出窗体，即时显示即时消失
 * 参数：标题，消息
 * 时间：2017-08-23
 */
function ShowPOPMessage(titleStr, messStr){
	$.messager.show({
		title:titleStr,
		msg:messStr
	});
}

/*
 * 功能：JSON对象转化为字符串
 * 参数：JSON对象
 * 时间：2015-06-16
 */
function JSONToStr(JSONObj){
	return JSON.stringify(JSONObj);
}


/*
 * 功能：将某一个表格的数据导出到EXCEL
 * 参数：数据表对象，数据表名称
 * 时间：2015-06-19
 * ===========================================
 * IE配置条件
 * -----------------------------------------------------------------------------
 * 1.机器上Excel已经安装.
 * 2.Internet 选项=>安全=>Internet 
 * \"对没有标记为安全的ActiveX控件进行初始化和脚本运行，设定为启用\"
 * ===========================================
 */
function ExporterExcel(dataGrid, sheetName) {
	if (dataGrid == undefined || dataGrid == null){
		ShowMessage("错误...", "未选择待导出数据列表！", "E");
		return;
	}	
	
	//验证是否安装EXCEL
    try{
        var testXL = new ActiveXObject("Excel.Application");
    }catch(e1){
        try{
            var testXL = new ActiveXObject("et.Application");
        }catch(e2){
        	ShowMessage("错误...", "请调整IE的安全级别。具体操作：打开IE → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用！", "E");
            return;
        }
    }
    
    try {
        //获取Datagride的列
        var rows = dataGrid.datagrid('getRows');  
        var columns = dataGrid.datagrid("options").columns[0];  
        var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
        var oWB = oXL.Workbooks.Add(); //获取workbook对象   
        var oSheet = oWB.ActiveSheet; //激活当前sheet  
        var currentRowNum = 1;
        //设置工作薄名称  
        oSheet.name = sheetName;
        
        //取屏幕分辨率
        var screenDPI = getScreenDPI();

        //计算当前明细有效数据表字段数目，即非隐藏字段数目
        var dtlColumnCount = 0;
        for (var i = 0; i < columns.length - 1; i++){
     	   var isHide = columns[i].hidden;
     	   
     	   if (!isHide){
     		   dtlColumnCount ++;
     	   }
        }
        
        //填写明细表标题
        oSheet.Cells(currentRowNum, 1).value = sheetName;
        oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).MergeCells = true;
        oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).Borders.Weight = 2; 
        oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).Interior.ColorIndex = 15;
        
        currentRowNum = currentRowNum + 1;
        
        var columnNum = 1;
        //设置表头  
        for (var i = 0; i < columns.length; i++) {
        	var isHide = columns[i].hidden;
        	
        	if (!isHide){
                oSheet.Cells(currentRowNum, columnNum).value = columns[i].title;
                //边框
                oSheet.Cells(currentRowNum, columnNum).Borders.Weight = 2; 
                //底色
                oSheet.Cells(currentRowNum, columnNum).Interior.ColorIndex = 15;
                
                //设置列宽
                if (columns[i].width != null && columns[i].width != undefined){
                    var columnWidth = columns[i].width;
                    
                    oSheet.cells(1, i+1).select;
                    
                    if (isInt(columnWidth)){
                    	//var columnW = columnWidth;//25.4;
                    	var columnW = (columnWidth / screenDPI.WIDTH) * 200;//25.4;
                    	oXL.Selection.ColumnWidth = columnW;
                    }
                    
                    columnNum++;
                }
            }
        }
        
        //设置内容部分          
        for (var i = 0; i < rows.length; i++) {
        	currentRowNum = currentRowNum + 1;
        	
            //动态获取每一行每一列的数据值  
        	columnNum = 1;
            for (var j = 0; j < columns.length; j++) {
            	var isHide = columns[j].hidden;
            	if (!isHide){
            		var fieldValue = "";
            		
            		if (rows[i][columns[j].field] != undefined && rows[i][columns[j].field] != null)
            		{
            			fieldValue = "'" + rows[i][columns[j].field].toString();
            		}
                	
                    oSheet.Cells(currentRowNum, columnNum).value = fieldValue;
                    oSheet.Cells(currentRowNum, columnNum).Borders.Weight = 2;  
                    
                    columnNum++;
            	}
            }        	
        }                
        oXL.Visible = true; //设置excel可见属性  
    }catch (e) {
        idTmr = window.setInterval("Cleanup();",1);
        ShowMessage("导出错误...", e.description, "E");
    }
}

/*
 * 功能：将某一个主表当前行和子表（明细）表格的数据导出到EXCEL
 * 参数：主表数据表对象，明细表数据表对象，主表名称，明细表名称
 * 时间：2015-07-21
 * ===========================================
 * IE配置条件
 * -----------------------------------------------------------------------------
 * 1.机器上Excel已经安装.
 * 2.Internet 选项=>安全=>Internet 
 * \"对没有标记为安全的ActiveX控件进行初始化和脚本运行，设定为启用\"
 * ===========================================
 */
function ExporterExcelEx(mdataGrid, dtldataGrid, msheetName, dtlsheetName) {
	if (mdataGrid == undefined || mdataGrid == null || dtldataGrid == undefined || dtldataGrid == null){
		ShowMessage("错误...", "未选择待导出数据列表！", "E");
		return;
	}
	
	//验证是否安装EXCEL
    try{
        var testXL = new ActiveXObject("Excel.Application");
    }catch(e1){
        try{
            var testXL = new ActiveXObject("et.Application");
        }catch(e2){
        	ShowMessage("错误...", "请调整IE的安全级别。具体操作：打开IE → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用！", "E");
            return;
        }
    }
    
    try {
        //获取主表数据及字段结构    	
    	var mainRow = mdataGrid.datagrid('getSelections')[0];
    	var mainColumns = mdataGrid.datagrid("options").columns[0];
    	//获取子表数据及字段结构
        var dtlRows = dtldataGrid.datagrid('getRows');  
        var dtlColumns = dtldataGrid.datagrid("options").columns[0];  
        //当前起始行
        var currentRowNum = 1;
        
        if (mainRow == undefined || mainRow == null){
        	ShowMessage("提示...", '请选择一行' + msheetName + '数据！', "W");
        	return;
        }
        
        if (dtlRows == undefined || dtlRows == null){
        	ShowMessage("提示...", '无' + dtlsheetName + '明细数据！', "W");
        	return;
        }
        
        //创建Excel对象
        var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
        var oWB = oXL.Workbooks.Add(); //获取workbook对象   
        var oSheet = oWB.ActiveSheet; //激活当前sheet  
        //设置工作薄名称  
        oSheet.name = msheetName;
        
        //取屏幕分辨率
        var screenDPI = getScreenDPI();

        //计算当前明细有效数据表字段数目，即非隐藏字段数目
        var dtlColumnCount = 0;
        for (var i = 0; i < dtlColumns.length - 1; i++){
     	   var isHide = dtlColumns[i].hidden;
     	   
     	   if (!isHide){
     		   dtlColumnCount ++;
     	   }
        }
        
        //填写表标题
        oSheet.Rows(currentRowNum.toString()+":2").RowHeight = 22;
        oSheet.Cells(currentRowNum, 1).value = msheetName;
        
        oSheet.Cells(currentRowNum, 1).Font.Size = 20;
        oSheet.Cells(currentRowNum, 1).Font.Name = "黑体"; 
        oSheet.Cells(currentRowNum, 1).Font.Bold = true; 

        oSheet.Cells(currentRowNum, 1).HorizontalAlignment = 3;
        oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).MergeCells = true;
       
       currentRowNum = currentRowNum + 1;
        
        /*
         * 填写主表数据
         */
       var rowColNum = parseInt(dtlColumnCount/2) + 1;//parseInt(dtlColumns.length/2);
       var colTimes = 0;
       var colNum = 1;
       for (var i = 0; i < mainColumns.length; i++){
    	   var fieldName = mainColumns[i].field;
    	   var isHide = mainColumns[i].hidden;
    	   
    	   if (!isHide){
        	   if (fieldName != undefined && fieldName != null){
            	   if (colTimes == rowColNum){
            		   currentRowNum = currentRowNum + 1;
            		   colNum = 1;
            		   colTimes = 0;
            	   }
                   
            	   //标题
            	   oSheet.Cells(currentRowNum, colNum).value = mainColumns[i].title + ":";
            	   
            	   //内容
            	   if (mainRow[fieldName] != undefined && mainRow[fieldName] != null){
            		   oSheet.Cells(currentRowNum, colNum + 1).value = "'" + mainRow[fieldName].toString();
            	   }else{
            		   oSheet.Cells(currentRowNum, colNum + 1).value = "";
            	   }            	   
            	   
                   colNum = colNum + 2;
                   
                   colTimes = colTimes + 1;
        	   }
    	   }
       }
       
       currentRowNum = currentRowNum + 1;
       
       //填写明细表标题
       oSheet.Cells(currentRowNum, 1).value = dtlsheetName;
       oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).MergeCells = true;
       oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).Borders.Weight = 2; 
       oXL.Range(oSheet.Cells(currentRowNum, 1), oSheet.Cells(currentRowNum, dtlColumnCount + 1)).Interior.ColorIndex = 15;
       
      currentRowNum = currentRowNum + 1;
               
        /*
         * 填写明细表数据
         */
        //设置明细表头
      var columnNum = 1;
        for (var i = 0; i < dtlColumns.length; i++) {
        	var isHide = dtlColumns[i].hidden;
        	
        	if (!isHide){
                oSheet.Cells(currentRowNum, columnNum).value = dtlColumns[i].title;
                //边框
                oSheet.Cells(currentRowNum, columnNum).Borders.Weight = 2; 
                //底色
                oSheet.Cells(currentRowNum, columnNum).Interior.ColorIndex = 15;
                
                if (dtlColumns[i].width != null && dtlColumns[i].width != undefined){
                    var columnWidth = dtlColumns[i].width;
                    
                    oSheet.cells(currentRowNum, columnNum).select;
                    
                    if (isInt(columnWidth)){
                    	//var columnW = columnWidth;//25.4;
                    	var columnW = (columnWidth / screenDPI.WIDTH) * 200;//25.4;
                    	oXL.Selection.ColumnWidth = columnW;
                    }
                    
                    columnNum++;
                }
        	}
        }

        //设置明细内容部分  
        for (var i = 0; i < dtlRows.length; i++) {
        	currentRowNum = currentRowNum + 1;
            //动态获取每一行每一列的数据值  
        	columnNum = 1;
            for (var j = 0; j < dtlColumns.length; j++) {
            	var isHide = dtlColumns[j].hidden;
            	if (!isHide){            		
                	var fieldValue = "";                	
                	
                	if (dtlRows[i][dtlColumns[j].field] != undefined && dtlRows[i][dtlColumns[j].field] != null){
                		fieldValue = "'" + dtlRows[i][dtlColumns[j].field].toString();
                	}
                	
                    oSheet.Cells(currentRowNum, columnNum).value = fieldValue;
                    oSheet.Cells(currentRowNum, columnNum).Borders.Weight = 2;
                    
                    columnNum++;
            	}
            }     
        }

        oXL.Visible = true; //设置excel可见属性  
    }catch (e) {
        idTmr = window.setInterval("Cleanup();",1);
        ShowMessage("导出错误...", e.description, "E");
    }
}

function sleep(n) { //n表示的毫秒数
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}

/*
 * 功能：浏览器版本检测
 * 时间：2016-03-11
 */
function exploreVersion(){
	var userAgent = navigator.userAgent, 
	lMSie = /msie ([\d.]+)/,
    rMsie = /(msie\s|trident\/7)([\w.]+)/, 
    rTrident = /(trident)\/([\w.]+)/, 
    rFirefox = /(firefox)\/([\w.]+)/, 
    rOpera = /(opera).+version\/([\w.]+)/, 
    rNewOpera = /(opr)\/(.+)/, 
    rChrome = /(chrome)\/([\w.]+)/, 
    rSafari = /version\/([\w.]+).*(safari)/;

	var matchBS,matchBS2;               
	var browser;               
	var version;                
	var ua = userAgent.toLowerCase();                
	var uaMatch = function(ua) {
		//IE8以上版本获取
        matchBS = rMsie.exec(ua);                 
        if (matchBS != null) {
            matchBS2 = rTrident.exec(ua);                        
            if (matchBS2 != null){
            	switch (matchBS2[2]){
            	case "4.0": return { browser : "IE", version : "8" };break;
            	case "5.0": return { browser : "IE", version : "9" };break;
            	case "6.0": return { browser : "IE", version : "10" };break;
            	case "7.0": return { browser : "IE", version : "11" };break;
            	default:return { browser : "IE", version : "undefined" };
                }
            }else{
            	return {browser : "IE", version : matchBS[2] || "0" };
            }
        }
        //IE8以下版本获取
		matchBS = lMSie.exec(ua);
		if ((matchBS != null)&&(!(window.attachEvent))) {
			return { browser : "IE", version : matchBS[1] || "0" };
		}
		//火狐浏览器
        matchBS = rFirefox.exec(ua);
        if ((matchBS != null)&&(!(window.attachEvent))&&(!(window.chrome))&&(!(window.opera))) {
        	return { browser : matchBS[1] || "", version : matchBS[2] || "0" };
        }
        //OPERA浏览器
        matchBS = rOpera.exec(ua);
        if ((matchBS != null)&&(!(window.attachEvent))) {
        	return { browser : matchBS[1] || "", version : matchBS[2] || "0" };
        }
        //CHROME浏览器
        matchBS = rChrome.exec(ua);
        if ((matchBS != null)&&(!!(window.chrome))&&(!(window.attachEvent))) {
            matchBS2 = rNewOpera.exec(ua);
            if(matchBS2 == null)
            	return { browser : matchBS[1] || "", version : matchBS[2] || "0" }; 
            else
            	return { browser : "Opera", version : matchBS2[2] || "0" };
        }
        //苹果浏览器
        matchBS = rSafari.exec(ua);
        if ((matchBS != null)&&(!(window.attachEvent))&&(!(window.chrome))&&(!(window.opera))) {
        	return { browser : matchBS[2] || "", version : matchBS[1] || "0" };
        }
        if (matchBS != null) {
        	return { browser : "undefined", version : " browser" };
        }
    };
    
	var browserMatch = uaMatch(userAgent.toLowerCase());
	if (browserMatch.browser) {
        browser = browserMatch.browser;
        version = browserMatch.version;

    	return browser+version;
    }
}

/*
 * 功能：判断某个字符串是否为正整数
 * 参数：字符串
 * 时间：2015-06-20
 */
function isInt(s){
	if (s == null || s == undefined || s == "" || s == "null") return true;
	
	try{
		var re=/^\d+$/;
		return re.test(s);
	}catch(e){
		ShowMessage("整数验证错误...", e.description, "E");
		return false;
	}
} 

/*
 * 功能：判断某个字符串是否为正实数
 * 参数：字符串
 * 时间：2015-06-20
 */
function isFloat(str){
	if (str == null || str == undefined || str == "" || str == "null") return true;
	
	if(/^(-?\d+)(\.\d+)?$/.test(str))
	{ 
			return true; 
	} 
	
	return false; 
}


/*
 * 功能：判断某个字符串是否为日期型
 * 参数：日期字符串
 *          格式为：YYYY-MM-DD或YYYY/MM/DD 
 * 时间：2015-06-20
 */
function isDate(DateStr){
	
	if (DateStr == null || DateStr == undefined || DateStr == "" || DateStr == "null") return true;
	
	var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/; 
	if(reg.test(DateStr)) 
	{ 
		return true; 
	} 
	return false;
}

/*
 * 功能：判断某个字符串是否为日期时间型
 * 参数：日期时间字符串 
 * 			格式为：YYYY-MM-DD HH:MM:SS
 * 时间：2015-06-20
 */
function isDateTime(str){
	console.log("DateTime Str:%s", str);
	
	if (str == null || str == undefined || str == "" || str == "null") return true;
        
    if ((str != null && str != undefined) && (str != "" && str.length < 15)){
    	str = str + " 00:00:00";
    }else{
    	if ((str != null && str != undefined) && str == ""){
    		return true;
    	}else{
    		return false;
    	}
    }
    
    console.log("DateTime Str:%s", str);

    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
    var r=str.match(reg); 
    if(r==null){
    	console.log("DateTime does not match!");
    	
    	return false; 
    }
    
    r[2]=r[2]-1;
    try{
    	var d= new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);     	

        if(d.getFullYear()!=parseInt(r[1])){
        	console.log("Year does not match!");
            console.log("r[1]:%s", r[1]);
            console.log("Year:%s", d.getFullYear());
        	return false; 
        }
        if(d.getMonth()!=parseInt(r[3])-1){
        	console.log("Month does not match!");
            console.log("r[3]-1:%s", r[3]-1);
            console.log("Month:%s", d.getMonth());
        	return false; 
        }
        if(d.getDate()!=parseInt(r[4])){
        	console.log("Day does not match!");
            console.log("r[4]:%s", r[4]);
            console.log("Date:%s", d.getDate());
        	return false; 
        }
        if(d.getHours()!=parseInt(r[5])){
        	console.log("Hour does not match!");
            console.log("r[5]:%s", r[5]);
            console.log("Hour:%s", d.getHours());
        	return false; 
        }
        if(d.getMinutes()!=parseInt(r[6])){
        	console.log("Minute does not match!");
            console.log("r[6]:%s", r[6]);
            console.log("Minute:%s", d.getMinutes());
        	return false; 
        }
        if(d.getSeconds()!=parseInt(r[7])){
        	console.log("Second does not match!");
            console.log("r[7]:%s", r[7]);
            console.log("Second:%s", d.getSeconds());
        	return false; 
        }
        
        console.log("日期时间验证正确！");
        return true;
    }catch(e){
    	console.log("日期验证异常(isDateTime)！");
    	return false; 
    }
} 

/*
 * 功能：判断某个OCX控件是否已安装
 * 参数：OCX控件名称
 * 时间：2015-12-25
 */
function isOCXExists(OCXNAME) 
{ 
	if (OCXNAME == null || OCXNAME == undefined || OCXNAME == "" || OCXNAME == "null") return true;
	
	var isInit=true;
	var ocxObj=null;
	
	try{
		oxcObj=new ActiveXObject(OCXNAME);
	}catch(e){
		isInit=false;
		console.log("isOCXExists:%s", OCXNAME + "未找到[" + e.description + "]");
		//alert(OCXNAME + "未找到[" + e.description + "]");
	}
	
	return isInit;
} 

/*
 * 功能：获取屏幕的分辨率
 * 参数：字符串
 * 返回：屏幕分辨率(数组：WIDTH表示PX，HEIGHT表示PY)
 * 时间：2015-06-20
 */
function getScreenDPI() {
    var screenDPI = {};
    
    /*
	alert($(window).height()); //浏览器当前窗口可视区域高度
	alert($(document).height()); //浏览器当前窗口文档的高度
	alert($(document.body).height());//浏览器当前窗口文档body的高度
	alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
	
	alert($(window).width()); //浏览器当前窗口可视区域宽度
	alert($(document).width());//浏览器当前窗口文档对象宽度
	alert($(document.body).width());//浏览器当前窗口文档body的宽度
	alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin
     */
    
    if ($(window).width() != undefined){//window.screen.deviceXDPI != undefined) {
        screenDPI["WIDTH"] = $(window).width();//window.screen.deviceXDPI;
        screenDPI["HEIGHT"] = $(window).height();//window.screen.deviceYDPI;
    }
    else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);

        screenDPI["WIDTH"] = parseInt(tmpNode.offsetWidth);
        screenDPI["HEIGHT"] = parseInt(tmpNode.offsetHeight);

        tmpNode.parentNode.removeChild(tmpNode);    
    }
    
    return screenDPI;
}



//获取随机GUID号
function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
