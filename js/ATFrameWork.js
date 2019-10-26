/***********************************************************************
 * 功能：框架处理网页代码
 * 作者：李福明
 * 时间：2015-06-10
 * 武汉傲腾科技有限公司版权所有 CopyRight 2centerPanel015
 ************************************************************************/
/*
 * 功能：下载窗体初始化
 * 参数：
 * 作者：李福明
 * 时间：2016-03-15
 */
var ip="/OA/"

function DownloadConstruct()
{
	var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_DOWNLOAD_LIST\",PARAMETER:\"\","
		                             + "WHERE:\"\",ORDER:\" ORDER BY SEQ_NO\",PAGE:\"\",TYPEDESC:\"下载信息\",IS_GRID:\"2\","
		                             + "USER_ID:\""  
		                             + localjsonObj.username
		                             + "\",VERIFY_NO:\"" 
		                             + localjsonObj.verifyno 
		                             + "\"}";
	var params =
	{
		getObject : getDataJsonString,
		errorMessage : ""
	};

	try
	{
		$.ajax(
		{
			url : ip+"getdata",
			method : "POST",
			data : params,
			datatype : "json",
			async : false,
			success : function (data)
			{
				var downLoadDs = JSON.parse(data); //获取到的列表数据

				
				if ((downLoadDs != null && downLoadDs != undefined) && downLoadDs.length > 0)
				{
					var htmlStr = "";

					for (var i = 0; i < downLoadDs.length; i++)
					{
						var fileRecord = downLoadDs[i];
						var fileName = fileRecord.FILE_NAME;
						var fileDesc = fileRecord.FILE_DESC;
						var fileDire = fileRecord.FILE_DIRECTORY;

						if (fileDesc == null || fileDesc == undefined || fileDesc == "" || fileDesc == "null")
						{
							fileDesc = "文件" + i.toString();
						}

						var rowID = (i + 1).toString() + ".";

						if ((fileName != null && fileName != undefined) && (fileName != "" && fileName != "null"))
						{
							if ((fileDire != null && fileDire != undefined) && (fileDire != "" && fileDire != "null"))
							{
								htmlStr = htmlStr + "<tr>"
									 + "<td style='background: #FFFFFF;'>"
									 + rowID
									 + "</td>"
									 + "<td style='background: #FFFFFF;'>"
									 + fileDesc
									 + "</td>"
									 + "<td style='background: #FFFFFF;'>"
									 + "<input type='image' src='../css/images/filesave.png' onclick='location.href=\"Download/"
									 + fileDire
									 + "\"' /></td></tr>";
							}
							else
							{
								htmlStr = htmlStr + "<tr>"
									 + "<td style='background: #FFFFFF;'>"
									 + rowID
									 + "</td>"
									 + "<td style='background: #FFFFFF;'>"
									 + fileDesc
									 + "</td>"
									 + "<td style='background: #FFFFFF;'>"
									 + "<input type='image' src='../css/images/filesave.png' onclick='location.href=\"Download/"
									 + "\"' /></td></tr>";
							} 
						} 
					} 

					$(document).ready(function ()
					{
						$("#mainPanel").empty();
						if (htmlStr != "")
						{
							htmlStr = "<table id='downGrid'  style='padding:10px; border:1px;'><tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;'>请选择待下载文件后直接下载</td></tr>"
								 + "<tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + htmlStr
								 + "<tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr><td class='grid_title_label' colspan='3' style='text-align:center; background: #D2E0F2;'>武汉睿创天地科技有限公司 2017-2019 © 版权所有</td></tr></table>";
						}
						else
						{
							htmlStr = "<table id='downGrid'  style='padding:5px; height:35px; border:0px;'><tr><td class='grid_title_label'>暂时无可供下载组件</td></tr>"
								 + "<tr><td class='grid_title_label' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr ><td class='grid_title_label' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + htmlStr
								 + "<tr><td class='grid_title_label' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr><td class='grid_title_label' style='text-align:center; background: #D2E0F2;' /></tr>"
								 + "<tr><td class='grid_title_label' style='text-align:center; background: #D2E0F2;'>武汉睿创天地科技有限公司 2017-2019 © 版权所有</td></tr></table>";
						}
						$('#mainPanel').append(htmlStr);
					}
					); 
				} 
			},
			error : function (errorMessage)
			{
				ShowMessage("错误...", '未取到下载信息！' + JSONToStr(errorMessage), "E");
				return;
			}
		}
		);
	}
	catch (e)
	{
		ShowMessage("错误...", '未取到下载信息！' + e.description, "E");
		return;
	}
}

/*
 * 功能：存储过程窗体创建
 * 参数：功能模块、子功能模块、子模块名称
 * 作者：陈立新
 * 时间：2018-09-10
 */
function ProcConstruct(moduleStr, funStr, funnameStr)
{
	MessageUtil.Show('界面创建中，请稍候...');
	
	//窗体按钮构建
	var params =
	{
		getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_POWER\",PARAMETER:\"\",WHERE:\"ROLECODE='"
		                + localjsonObj.rolecode + "' AND MODULE='" 
		                + moduleStr 
		                + "' AND FUNCODE='" 
		                + funStr
		                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"系统权限\",IS_GRID:\"2\","
		                + "USER_ID:\"" +  localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno + "\"}",
		                
		errorMessage : ""
	};
	$.ajax(
	{
		url :ip+"getdata",
		method : "POST",
		data : params,
		datatype : "json",
		success : function (data)
		{
			var funPower = JSON.parse(data); //使用这个方法解析json

			//alert(JSONToStr(funPower));
			
			if ((funPower != null && funPower != undefined) && funPower.length > 0)
			{
				var powerRecord = funPower[0];

				console.log('powerRecord:',powerRecord);
				
				window.allowEdit = powerRecord.ALLOWEDIT;
				window.allowConfirm = powerRecord.ALLOWCONFIRM;
				window.power = powerRecord.POWER;

				if ((window.power != null && window.power != undefined) &&
					(window.power != "" && window.power != "null"))
				{
					if (window.power.toUpperCase() != "ALL")
					{
						window.power = window.power.toUpperCase();

						if (window.power.indexOf("$GETDATE") >= 0)
						{
							window.power = window.power.replace("$GETDATE", "'" + getDefaultValue("$GETDATE") + "'");
						}
						else if (window.power.indexOf("$GUID") >= 0)
						{
							window.power = window.power.replace("$GUID", "'" + getDefaultValue("$GUID") + "'");
						}
						else if (window.power.indexOf("$GROUP_CODE") >= 0)
						{
							window.power = window.power.replace("$GROUP_CODE", "'" + getDefaultValue("$GROUP_CODE") + "'");
						}
						else if (window.power.indexOf("$DEPART_CODE") >= 0)
						{
							window.power = window.power.replace("$DEPART_CODE", "'" + getDefaultValue("$DEPART_CODE") + "'");
						}
						else
						{
							window.power = window.power.replace("$USER", "'" + getDefaultValue("$USER") + "'");
						}
					}
					else
					{
						window.power = "";
					}
				}
				else
				{
					window.power != "";
				}
			}

			//窗体界面构建
			var dataGridColumns = null,
			queryColumns = null;
			var gridTitle = funnameStr + "数据列表";

			var showCheckBox = true;


			var getPara = "{MODULE:'" + moduleStr + "',FUN:'" + funStr + "'}'";
			var params =
			{
				getObject : getPara,
				errorMessage : ""
			};

			console.log('getPara:',getPara);
			try
			{
				$.ajax(
				{
					url : ip+"getFielddata",
					method : "POST",
					data : params,
					datatype : "json",
					success : function (data)
					{
						var jsonobj = JSON.parse(data); //使用这个方法解析json
						window.dsUIAll = JSON.parse(data); //jsonobj.DSUI;
						dataGridColumns = jsonobj.COLUMNS;
						queryColumns = jsonobj.QUERYCOLUMNS;
						window.mainwhere = jsonobj.WHERE;

						//console.log("dataGridColumns:"+JSONToStr(dataGridColumns));
						console.log("queryColumns:"+JSONToStr(queryColumns));
						
						//console.log("window.dsUIAll.DSUI : %s",data);
						//确定当前列表是否允许修改
						window.isModal["0"] = "1";
						//存储过程名称
                        var procName;
						if (window.dsUIAll != null && window.dsUIAll != undefined)
						{
							var dsUI = window.dsUIAll.DSUI;
							if ((dsUI != null && dsUI != undefined) && dsUI.length > 0)
							{
								var dsUIRow = dsUI[0];
								if (dsUIRow != null && dsUIRow != undefined)
								{
									var page_no = dsUIRow.PAGE_NO;
									var isModal = dsUIRow.IS_MODAL;
                                    procName=dsUIRow.TABLE_NAME;
									if (isModal != null && isModal != undefined)
									{
										window.isModal[page_no] = isModal;
									}
								}
							}
						}

						console.log("window.isModal[0]:%s", window.isModal["0"]);
						
						var dsUIs = window.dsUIAll.DSUI;
						
						var barcodePara = window.dsUIAll.BARCODE;
						
						var gridColumns = "[" + JSON.stringify(dataGridColumns) + "]";

						dataGridColumns = eval(gridColumns);

						var mainGroupHeight = $('#mainGroup').height();

						if (queryColumns == undefined || queryColumns == null || queryColumns.length == 0)
						{
							//如果无查询区
							subHeight = 66;
							window.queryPanelHeight = 0;
						}
						else
						{
							//如果有查询区
							subHeight = 114;

							//通过查询区创建取查询区高度
							var queryHeight = ConstuctQuery(JSON.stringify(queryColumns)); //113;

							if (queryHeight == undefined || queryHeight == null)
								queryHeight = 0;

							window.queryPanelHeight = queryHeight + 50;
						}

						//更新查询区高度
						$('#centerPanel').layout("panel", "north").panel("resize",
						{
							height : window.queryPanelHeight
						});
						$('#centerPanel').layout("resize");

						$('#dataGroup').panel(
						{
							title : gridTitle		
						});
						
						console.log('322',gridTitle);

						window.rowIndex["dataGrid"] = -1;

						var dataGridHeight = $('#centerPanel').layout("panel", "center").height() - window.gridHeightSub;

						//查询存储过程数据
						
						//console.log('dataGrid_dataGridColumns:',dataGridColumns);
						

						$(document).ready(function ()
						{
							var queryHtml = "<a id=\"btQuery\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search'\" onclick=\"QueryProcData('"+procName+"')\">查询</a>"
								 + "<a id=\"btQueryClear\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search_clear'\" onclick=\"QueryClear('S')\">清空查询</a>";

							var exportHtml = "<span id=\"exportSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btExport\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-export'\" onclick=\"exportExcel('S')\">导出</a>";

							$("#tool_menu").empty();
							$('#tool_menu').append(queryHtml);

							$('#tool_menu').append(exportHtml);

							if ((window.PRINT != undefined && window.PRINT != null) &&
								((window.PRINT != "" && window.PRINT != "null") && (window.PRINT.length > 0)))
							{
								$('#tool_menu').append(printHtml);
							}
	    	
							bodyRefresh($('#tool_menu'));
							bodyRefresh($('#queryGroup'));
						}
						);
						
						MessageUtil.Close();
					},
					error : function (errorMessage)
					{
						MessageUtil.Close();		
						ShowMessage("错误...", "1111未从服务器取到数据！" + errorMessage["errorMessage"], "E");
					}
				}
				);
			}
			catch (e)
			{
				MessageUtil.Close();		
				ShowMessage("错误...", gridTitle + "列表初始化错误！" + e.description, "E");
			}
		},
		error : function (errorMessage)
		{
			MessageUtil.Close();		
			ShowMessage("错误...", funnameStr + "系统权限加载失败！", "E");
		}
	}
	);
}
/*
 * 功能：进行数据查询
 * 参数：存储过程名称
 * 返回：查询是否成功
 * 作者：陈立新
 * 时间：2018-09-10
 */
function QueryProcData(procName)
{
	var retFlag = false;
	var countFields="";

	if (procName!="" && procName !=undefined)
	{
		//取窗体表结构参数
		dsUI = window.dsUIAll.DSUI;
		
		//取查询区列表参数
		queryColumns = window.dsUIAll.QUERYCOLUMNS;
		console.log("queryColumns : %s",JSONToStr(queryColumns));
		//获取查询条件的数据
		try
		{
			if ((queryColumns != undefined && queryColumns != null) && queryColumns.length > 0)
			{
                var txtData="";
				for (var i = 0; i < queryColumns.length; i++)
				{
					var fieldStr = queryColumns[i].field;
					var fieldType = $.trim(queryColumns[i].field_type.toUpperCase());
					var frObjectName = "#fr_" + fieldStr;
					var toObjectName = "#to_" + fieldStr;
					if (fieldType.indexOf("DATE") >= 0)
					{
						txtData+="'"+$(frObjectName).datebox('getValue')+"',";
					}
					else
					{
						txtData+="'"+$(frObjectName).textbox('getValue')+"',";
					}
				}
				if(txtData !="" && txtData !=undefined && txtData.length>0)
				{
				    txtData=txtData.substring(0,txtData.length-1);	  
				}
				countFields=queryColumns[0].is_count;
			}
			console.log("txtData : %s",txtData);
			
		}
		catch (e)
		{
			ShowMessage("错误...", "获取查询条件的参数错误！" + e.description, "E");
		}
		
		var params = {
			       getObject :"{GETTYPE:'PROCEDURE',DBOBJECT:\"0\",OBJECT:'"+procName+"',PARAMETER:\""+txtData+"\",WHERE:'',ORDER:'',PAGE:'',TYPEDESC:'111',IS_GRID:'0','USER_ID':'"
			                       + localjsonObj.username
			                       + "','VERIFY_NO':'"
			                       + localjsonObj.verifyno
			                       + "'}",
			       errorMessage : ""
			    };
		$.ajax(
		{
			url : ip+"getdata",
			method : "POST",
			data : params,
			datatype : "json",
			success : function (data)
			{
				var getProcData=JSON.parse(data);
			
				var dataAll=getProcData.DATA;
				
				
				var aaa=JSONToStr(dataAll);
				var b=aaa.substring(1,aaa.length-1);
				
				var c=JSON.parse(b);
				var ccc=c.DATA;
				console.log("ccc : ",JSONToStr(ccc));
				if(ccc.length==0){
					ShowMessage("提示","查询无结果",'I');
					return;
				}

                var tt=ccc[0];
                //处理需要合计的字段          num|price
                var dd;
                if(countFields.length>0){
                	dd=countFields.split('|');
                }
           
                var columns=new Array();    
                for(var key in tt)
                {
                	var column={};
                	column['field']=key;
                	column['title']=key;
                	column['width']=120;
                	//是否计算合计
                	if(dd.length>0){	
                		if(dd.indexOf(key)>=0){
                			column['sum']=true;
                			console.log("key:",key);
                		}
                	}
                	column['align']="center";
                	column['editor']="text";
                	columns.push(column);
                	
                }
                console.log("columns:",columns);
                
                var cl=new Array;
                cl.push(columns);
				var dataGridHeight = $('#centerPanel').layout("panel", "center").height() - window.gridHeightSub;

				window.rowIndex["dataGrid"] = -1;
				//配置列表显示
				$('#dataGrid').datagrid(
				{
					height : dataGridHeight,
					fitColumns :false,
					pagination:false,
					rownumbers:true,
					resizable:true,
					showFooter:true,
					pageSize : 10,
					pageList : [5, 10, 15, 20],
					loadMsg : '数据加载中，请稍后......',
					columns:cl,
//					columns: [[ //每页具体内容 				             
//					             { field: "员工编码", title: "员工编码", width: "10%", align: "center", editor: "text" }, 
//					             { field: "员工姓名", title: "员工姓名", width: "10%", align: "center", editor: "text" }, 
//					             { field: "报销金额", title: "报销金额", width: "10%", align: "center", editor: "text" }, 
//					       ]], 
					onLoadSuccess : function ()
					{
						//数据加载成功方法
						window.rowIndex["dataGrid"] = -1;
				        $('#dataGrid').datagrid('statistics');
				        $(this).datagrid('unselectAll');
				        $(this).datagrid('selectRow',0);
					},
					onLoadError : function ()
					{
						//数据加载失败方法
						ShowMessage("错误...", gridTitle + "数据加载失败！", "E");
					}
				}
				);
				$('#dataGrid').datagrid('loadData',ccc);
			},
			error : function (errorMessage)
			{
				ShowMessage("错误...", "失败！" + JSONToStr(errorMessage), "E");
			}
		}
		);
		
	
	}  

	return retFlag;
}

/*
 *作者：陈立新
 *时间：2019-05-14
 *功能：datagrid最后追加一行合计
 */
$.extend($.fn.datagrid.methods, {
    statistics: function(jq) {
        var opt = $(jq).datagrid('options').columns;
        var rows = $(jq).datagrid("getRows");
        var footer = new Array();
        footer['sum'] = "";
		console.log("opt[0].length:",opt[0].length);
        for (var i = 0; i < opt[0].length; i++) {
            if (opt[0][i].sum) {
                footer['sum'] = footer['sum'] + sum(opt[0][i].field, 1) + ',';
				console.log("opt[0][i].field:",opt[0][i].field);
            }
        }
        var footerObj = new Array();
        if (footer['sum'] != "") {
			console.log("5");
            var tmp = '{' + footer['sum'].substring(0, footer['sum'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');

            if (obj[opt[0][0].field] == undefined) {
                footer['sum'] += '"' + opt[0][0].field + '":"<b>合计:</b>"';
                obj = eval('({' + footer['sum'] + '})');
				console.log("1");
            } else {
                obj[opt[0][0].field] = "<b>合计:</b>" + obj[opt[0][0].field];
				console.log("2");
            }
            footerObj.push(obj);
        }

        if (footerObj.length > 0) {
            $(jq).datagrid('reloadFooter', footerObj);
        }

        function sum(filed) {
			console.log("filed:",filed);
            var sumNum = 0;
            var str = "";
            for (var i = 0; i < rows.length; i++) {
                var num = rows[i][filed];
                sumNum += Number(num);
            }
            return '"' + filed + '":"' + sumNum.toFixed(2) + '"';
        }
    }
});

/*
 * 功能：窗体创建
 * 参数：功能模块、子功能模块、子模块名称
 * 作者：李福明
 * 时间：2015-06-10
 */
function SingleConstruct(moduleStr, funStr, funnameStr)
{
	MessageUtil.Show('界面创建中，请稍候...');
	//窗体按钮构建
	var params =
	{
		getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_POWER\",PARAMETER:\"\",WHERE:\"ROLECODE='"
		                +localjsonObj.rolecode + "' AND MODULE='" 
		                + moduleStr 
		                + "' AND FUNCODE='" 
		                + funStr
		                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"系统权限\",IS_GRID:\"2\","
		                + "USER_ID:\"" +localjsonObj.username + "\",VERIFY_NO:\"" +localjsonObj.verifyno + "\"}",
		                
		errorMessage : ""
	};
	console.log(params)
	$.ajax(
	{
		url : ip+"getdata",
		method : "post",
		data : params,
		datatype : "json",
		success : function (data)
		{
			var funPower = JSON.parse(data); //使用这个方法解析json
			
			if ((funPower != null && funPower != undefined) && funPower.length > 0)
			{
				var powerRecord = funPower[0];

				console.log('powerRecord:',powerRecord);
				
				window.allowEdit = powerRecord.ALLOWEDIT;
				window.allowConfirm = powerRecord.ALLOWCONFIRM;
				window.power = powerRecord.POWER;

				if ((window.power != null && window.power != undefined) &&
					(window.power != "" && window.power != "null"))
				{
					if (window.power.toUpperCase() != "ALL")
					{
						window.power = window.power.toUpperCase();

						if (window.power.indexOf("$GETDATE") >= 0)
						{
							window.power = window.power.replace("$GETDATE", "'" + getDefaultValue("$GETDATE") + "'");
						}
						else if (window.power.indexOf("$GUID") >= 0)
						{
							window.power = window.power.replace("$GUID", "'" + getDefaultValue("$GUID") + "'");
						}
						else if (window.power.indexOf("$GROUP_CODE") >= 0)
						{
							window.power = window.power.replace("$GROUP_CODE", "'" + getDefaultValue("$GROUP_CODE") + "'");
						}
						else if (window.power.indexOf("$DEPART_CODE") >= 0)
						{
							window.power = window.power.replace("$DEPART_CODE", "'" + getDefaultValue("$DEPART_CODE") + "'");
						}
						else
						{
							window.power = window.power.replace("$USER", "'" + getDefaultValue("$USER") + "'");
						}
					}
					else
					{
						window.power = "";
					}
				}
				else
				{
					window.power != "";
				}
			}

			//窗体界面构建
			var dataGridColumns = null,
			queryColumns = null;
			var gridTitle = funnameStr + "数据列表";

			var showCheckBox = true;

			var getPara = "{MODULE:'" + moduleStr + "',FUN:'" + funStr + "'}'";
			var params =
			{
				getObject : getPara,
				errorMessage : ""
			};

			console.log('getPara:',getPara);
			try
			{
				$.ajax(
				{
					url : ip+"getFielddata",
					method : "post",
					data : params,
					datatype : "json",
					success : function (data)
					{
						var jsonobj = JSON.parse(data); //使用这个方法解析json
						window.dsUIAll = JSON.parse(data); //jsonobj.DSUI;
						dataGridColumns = jsonobj.COLUMNS;
						queryColumns = jsonobj.QUERYCOLUMNS;
						window.mainwhere = jsonobj.WHERE;

						//确定当前列表是否允许修改
						window.isModal["0"] = "1";
						if (window.dsUIAll != null && window.dsUIAll != undefined)
						{
							var dsUI = window.dsUIAll.DSUI;

							if ((dsUI != null && dsUI != undefined) && dsUI.length > 0)
							{
								var dsUIRow = dsUI[0];
								if (dsUIRow != null && dsUIRow != undefined)
								{
									var page_no = dsUIRow.PAGE_NO;
									var isModal = dsUIRow.IS_MODAL;

									if (isModal != null && isModal != undefined)
									{
										window.isModal[page_no] = isModal;
									}
								}
							}
						}

						console.log("window.isModal[0]:%s", window.isModal["0"]);
						
						var dsUIs = window.dsUIAll.DSUI;
						
						var barcodePara = window.dsUIAll.BARCODE;
						
						console.log("window.dsUIALL.DSUI:"+JSONToStr(window.dsUIAll.DSUI));
						console.log("window.dsUIALL.BARCODE:"+JSONToStr(window.dsUIAll.BARCODE));

						var gridColumns = "[" + JSON.stringify(dataGridColumns) + "]";
						console.log("gridColumns:"+gridColumns);
						dataGridColumns = eval(gridColumns);

						var mainGroupHeight = $('#mainGroup').height();

						if (queryColumns == undefined || queryColumns == null || queryColumns.length == 0)
						{
							//如果无查询区
							subHeight = 66;
							window.queryPanelHeight = 0;
						}
						else
						{
							//如果有查询区
							subHeight = 114;

							//通过查询区创建取查询区高度
							var queryHeight = ConstuctQuery(JSON.stringify(queryColumns)); //113;

							if (queryHeight == undefined || queryHeight == null)
								queryHeight = 0;

							window.queryPanelHeight = queryHeight + 50;
						}

						//更新查询区高度
						$('#centerPanel').layout("panel", "north").panel("resize",
						{
							height : window.queryPanelHeight
						});
						$('#centerPanel').layout("resize");

						$('#dataGroup').panel(
						{
							title : gridTitle		
						});
						
						console.log('322',gridTitle);

						window.rowIndex["dataGrid"] = -1;

						var dataGridHeight = $('#centerPanel').layout("panel", "center").height() - window.gridHeightSub;

						console.log('dataGrid_dataGridColumns:',dataGridColumns);
						//配置列表显示
						$('#dataGrid').datagrid(
						{
							height : dataGridHeight,
							fitColumns : false,
							pagination:true,
							rownumbers:true,
							pageSize : 10,
							pageList : [5, 10, 15, 20],
							loadMsg : '数据加载中，请稍后......',
							frozenColumns : [[
									{
										field : 'ck',
										checkbox : showCheckBox
									}
								]],
							columns : dataGridColumns,
							onClickRow : function (index, row)
							{
								var datagrid = $('#dataGrid');
								//单击列表行事件，用来停止上一行的编辑事件

								if (window.rowIndex["dataGrid"] != index)
								{
									datagrid.datagrid("endEdit", window.rowIndex["dataGrid"]);
									endEditing(datagrid, "dataGrid");

									window.rowIndex["dataGrid"] = index;

									//审核按钮标题修改
									if (window.dsUIAll.VERIFY != undefined && window.dsUIAll.VERIFY != null)
									{
										var dsui = window.dsUIAll.DSUI;
										if ((dsui != undefined && dsui != null) && (dsui.length > 0))
										{
											var table_name = dsui[0].TABLE_NAME;
											var invent_table = dsui[0].INVENTED_TABLE;

											var status_field = "";
											var status_desc = "";
											for (var i = 0; i < window.dsUIAll.VERIFY.length; i++)
											{
												var verifyRecord = window.dsUIAll.VERIFY[i];

												var tempTable = verifyRecord.STATUS_FIELD;
												if (tempTable != undefined && tempTable != null)
												{
													var tempTableSplit = tempTable.split("|");

													if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length == 2)
													{
														var tempTb = tempTableSplit[0];
														var tempFd = tempTableSplit[1];

														if (tempTb == table_name || tempTb == invent_table)
														{
															if (tempTb != undefined && tempTb != null)
															{
																if (status_field == "")
																{
																	if (tempFd != undefined && tempFd != null)
																	{
																		status_field = tempFd;
																	}
																}
																var statusFieldValue = row[status_field];

																if (statusFieldValue != undefined)
																{
																	var tempStatusFieldValue = verifyRecord.PARENTVERIFYSTATE;
																	if (statusFieldValue == null || statusFieldValue == "" || statusFieldValue == "null")
																	{
																		if (tempStatusFieldValue == null || tempStatusFieldValue == "" || tempStatusFieldValue == "null")
																		{
																			status_desc = verifyRecord.VERIFYDISPLAYNAME;
																		}
																	}
																	else
																	{
																		if (statusFieldValue == tempStatusFieldValue)
																		{
																			status_desc = verifyRecord.VERIFYDISPLAYNAME;
																		}
																	}
																}
															} 
														}
													}
												} 

												if (status_field != "" && status_desc != "")
													break;
											} 

											$('#btVerify').html(status_desc);
										} 
									}
								}
							},
							onLoadSuccess : function ()
							{
								//数据加载成功方法
								window.rowIndex["dataGrid"] = -1;
							},
							onLoadError : function ()
							{
								//数据加载失败方法
								ShowMessage("错误...", gridTitle + "数据加载失败！", "E");
							},
							onDblClickRow : function (index, row)
							{
								if (window.allowEdit != "是")
								{
									return;
								}

								if (window.isReport == "1")
								{
									return;
								}

								//如果当前业务为只模式，则不允许进行修改
								if (window.isModal["0"] == "0")
								{
									return;
								}

								var datagrid = $('#dataGrid');
								datagrid.datagrid("unselectAll");
								datagrid.datagrid("selectRow", index);
								window.rowIndex["dataGrid"] = index;
								window.focusGrid = "dataGrid";
								//双击开启编辑行
								OpenEditWindow(window.dsUIAll, row, null);
							},
							onBeforeEdit : function (index, row)
							{
								row.editing = true;
								window.rowIndex["dataGrid"] = index;
							},
							onAfterEdit : function (index, row)
							{
								row.editing = false;
								updateActions($('#dataGrid'), index);
							},
							onCancelEdit : function (index, row)
							{
								row.editing = false;
							}
						}
						);

						$(document).ready(function ()
						{
							var queryHtml = "<a id=\"btQuery\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search'\" onclick=\"QueryData('S')\">查询</a>"
								 + "<a id=\"btQueryClear\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search_clear'\" onclick=\"QueryClear('S')\">清空查询</a>";

							var editHtml = "<span id=\"deleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btDelete\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\" onclick=\"deleteRow('dataGrid')\">删除</a>"
								 + "<span id=\"saveSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btNew\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" onclick=\"appendByWindow('dataGrid')\">新增</a>"
								 + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"save('S')\">保存</a>";

							var verifyHtml = "<span id=\"verifySub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btVerify\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-verify'\" onclick=\"Verify('S')\">审核</a>";

							var exportHtml = "<span id=\"exportSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btExport\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-export'\" onclick=\"exportExcel('S')\">导出</a>";

							var printHtml = "<span id=\"printSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
								 + "<a id=\"btPrint\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"reportPrint('S')\">打印</a>";
							
						    var barcodePrintHtml = "<span id=\"labelSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
				                   + "<a id=\"btLabelPrint\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"labelPrint('S')\">标签打印</a>";

							$("#tool_menu").empty();
							$('#tool_menu').append(queryHtml);

							if (window.isReport != "1")
							{
								if ((window.allowEdit != null && window.allowEdit != undefined) && window.allowEdit == "是")
								{
									if (window.isModal["0"] != "0")
									{
										$('#tool_menu').append(editHtml);
									}
								}

								if ((window.dsUIAll.VERIFY != undefined && window.dsUIAll.VERIFY != null) && (window.dsUIAll.VERIFY.length > 0))
								{
									$('#tool_menu').append(verifyHtml);
								}
							}

							$('#tool_menu').append(exportHtml);

							if ((window.PRINT != undefined && window.PRINT != null) &&
								((window.PRINT != "" && window.PRINT != "null") && (window.PRINT.length > 0)))
							{
								$('#tool_menu').append(printHtml);
							}

					    	//增加标签打印按钮
					    	if ((barcodePara != null && barcodePara != undefined) &&
					    			(barcodePara != "" && barcodePara != "null")){
					    		$('#tool_menu').append(barcodePrintHtml);
					    	}
					    	
							bodyRefresh($('#tool_menu'));
							bodyRefresh($('#queryGroup'));
						}
						);
						
						MessageUtil.Close();
					},
					error : function (errorMessage)
					{
						MessageUtil.Close();		
						ShowMessage("错误...", "1111未从服务器取到数据！" + errorMessage["errorMessage"], "E");
					}
				}
				);
			}
			catch (e)
			{
				MessageUtil.Close();		
				ShowMessage("错误...", gridTitle + "列表初始化错误！" + e.description, "E");
			}
		},
		error : function (errorMessage)
		{
			MessageUtil.Close();		
			ShowMessage("错误...", funnameStr + "系统权限加载失败！", "E");
		}
	}
	);
}

/*
 * 功能：方法扩展editCell；
 * 作者：陈立新
 * 时间：2018-10-11
 */
$.extend($.fn.datagrid.methods, {
    //两个参数
    // jq: 
    // param:对象，包含index 和 鼠标点击的列属性；
    //jq = [table#dg.easyui-datagrid, context: document, selector: "#dg"], param = Object {index: 1, field: "Data"}  选择的是Data列，
    editCell: function (jq, param) {
        //each() 遍历；
        return jq.each(function () {
            //options:返回属性对象。 这个时候的this代表：jq;
            var opts = $(this).datagrid('options');                                                                                                       
            //getColumnFields:返回列的字段，如果 frozen 设置为 true，则冻结列的字段被返回。
            //concat:用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
            //与HTML的editor属性有关；能够编辑的列和不能编辑的列；
            //fields的值，和上面HTML对应；
                //Array[5]
                //0: "ck"
                //1: "DepartmentName"
                //2: "Name"
                //3: "Data"
                //4: "remarks"
            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            //下面for循环，设定列能够编辑。当不能编辑时，editor的值为undefined，能够编辑值为text;
            for (var i = 0; i < fields.length; i++) {
                var col = $(this).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                //循环到的列，不等于鼠标点击的那一列时，设定列的editor的值为null；
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            //开始对一行进行编辑。param.index 为行号；对选中的一行进行编辑；
            $(this).datagrid('beginEdit', param.index);
            //for循环，设置col
            for (var i = 0; i < fields.length; i++) {
                //getColumnOption:返回指定列的选项。
                var col = $(this).datagrid('getColumnOption', fields[i]);
                
                console.log("col:",col);
                //给列的editor属性赋值；text 或者其他；
                col.editor = col.editor1;
            }
        });
    }
});



/*
 * 功能：结束datagrid 单元格编辑
 * 作者：陈立新
 * 时间：2019-10-10
 */
var editIndex = undefined;
var dtleditIndex = undefined;
function endEdit(BussType) {//该方法用于关闭上一个焦点的editing状态
	//单表
	if(BussType=='S'){
		if (editIndex == undefined) {
			return true;
		}
		
//		//临时测试
        var ed = $('#dataGrid').datagrid('getEditor', { index: editIndex, field: 'ID' }); //editIndex编辑时记录下的行号
        if (ed != null) {
              var GROUP_CODE = $(ed.target).combobox('getText');
              $('#dataGrid').datagrid('getRows')[editIndex]['GROUP_CODE'] = GROUP_CODE;
        }
		
		if ($('#dataGrid').datagrid('validateRow', editIndex)) {
		$('#dataGrid').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
		} else {
			return false;
		}
   }
	//多表的主表
	if(BussType=='M'){
		if (editIndex == undefined) {
			return true;
		}
		if ($('#mdataGrid').datagrid('validateRow', editIndex)) {
			$('#mdataGrid').datagrid('endEdit', editIndex);
			editIndex = undefined;
			return true;
		} else {
			return false;
		}
   }
	//多表的明细表
   if(BussType=='ML'){
		if (dtleditIndex == undefined) {
			return true;
		}
		if ($('#dtldataGrid').datagrid('validateRow', dtleditIndex)) {
			$('#dtldataGrid').datagrid('endEdit', dtleditIndex);
			dtleditIndex = undefined;
			return true;
		} else {
			return false;
		}
   }
	
}

/*
 * 功能：单表新增数据    多表主表新增数据  多表明细表新增数据
 * 参数：窗体名称
 * 作者：陈立新
 * 时间：2018-09-26
 */
function addRow(gridName)
{
	gridName = $.trim(gridName);

	var dsUI = window.dsUIAll.DSUI;
	console.log("dsUI:",dsUI);
	$("#" + gridName).datagrid("unselectAll");   //取消所有选择
	
	window.rowIndex[gridName] = -1;
	
	var mainRow = null;

	if (gridName == "dataGrid")
	{
		var editIndex=undefined;
	
		//处理默认值
		if(dsUI!=undefined && dsUI!="" && dsUI!=null && dsUI.length>0){
			      var def="";
			      for(var i=0;i<dsUI.length;i++){
			    	  var feild=dsUI[i].FIELD;
			    	  var default_value=dsUI[i].DEFAULT_VALUE;
			    	  if(default_value!=undefined && default_value!=null && default_value!=""){
			    		  def+="\""+feild+"\":\""+getDefaultValue(default_value)+"\",";
			    	  }
			      }
			      if(def!=""){
			    	  def=def.substring(0, def.length-1);
			    	  def="{"+def+"}";
			      }
			    console.log("def:",def); 
			    var tt=JSON.parse(def);          //不支持单引号   支持双引号

				$("#"+gridName).datagrid('appendRow',tt);
				editIndex = $("#"+gridName).datagrid('getRows').length-1;
				console.log("xxx editIndex:",editIndex);
				$("#"+gridName).datagrid('selectRow', editIndex)
						.datagrid('beginEdit', editIndex);
		}
	
	}
	else
	{
		try
		{
			var DSUIS = window.dsUIAll.DSUI;
			var dscurUI = null;
			if (gridName == "mdataGrid")
			{
				for (var i = 0; i < DSUIS.length; i++)
				{
					var suDSUI = DSUIS[i];
					var pageNo = suDSUI.PAGE_NO;

					if (pageNo == "0")
					{
						dscurUI = suDSUI.DSUI;
						break;
					}
				}
				var editIndex=undefined;
				
				console.log("dscurUI:",dscurUI);
				
				//处理默认值
				if(dscurUI!=undefined && dscurUI!="" && dscurUI!=null && dscurUI.length>0){
					      var def="";
					      for(var i=0;i<dscurUI.length;i++){
					    	  var feild=dscurUI[i].FIELD;
					    	  var default_value=dscurUI[i].DEFAULT_VALUE;
					    	  if(default_value!=undefined && default_value!=null && default_value!=""){
					    		  console.log("default_value:",default_value);
					    		  //console.log("feild:",feild);
					    		  def+="\""+feild+"\":\""+getDefaultValue(default_value)+"\",";
					    	  }
					      }
					      if(def!=""){
					    	  def=def.substring(0, def.length-1);
					    	  def="{"+def+"}";
					      }
					    console.log("def:",def); 
					    var tt=JSON.parse(def);          //不支持单引号   支持双引号

						$("#"+gridName).datagrid('appendRow',tt);
						editIndex = $("#"+gridName).datagrid('getRows').length-1;

						$("#"+gridName).datagrid('selectRow', editIndex)
								.datagrid('beginEdit', editIndex);
				}
			}
			else
			{
				if (gridName == "dtldataGrid")
				{
					var mastName = "";
					var mainGridRows = $("#mdataGrid").datagrid('getSelections');
					//明细表UI配置
					var dscurUI;
					//索引
					var dsIndex;
					for (var i = 0; i < DSUIS.length; i++)
					{
						var suDSUI = DSUIS[i];
						var pageNo = suDSUI.PAGE_NO;

						if (pageNo == "1")
						{
							dscurUI = suDSUI.DSUI;
							dsIndex=suDSUI.INDEXCOLUMNS;
							console.log("dsIndex:",dsIndex);
						}
						else
						{
							if (pageNo != undefined && pageNo == "0")
							{
								mastName = suDSUI.PAGE_NAME;
								
							};
						}
					}
                    console.log("mainGridRows:",mainGridRows);
					if (mainGridRows == undefined || mainGridRows == null || mainGridRows.length <= 0)
					{
						ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
						return;
					}
					else
					{
						mainRow = mainGridRows[0];

						dtleditIndex=undefined;
						//处理主表索引
						var indexName=dsIndex[0].FIELD;   //索引字段
						var indeValue=mainRow[indexName];  //索引值
						console.log("indeValue:",indeValue);
						
                        console.log("mainRow:",mainRow);
						console.log("dscurUI:",dscurUI);
						//处理默认值
						if(dscurUI!=undefined && dscurUI!="" && dscurUI!=null && dscurUI.length>0){
							      var def="";
							      for(var i=0;i<dscurUI.length;i++){
							    	  var feild=dscurUI[i].FIELD;
							    	  var default_value=dscurUI[i].DEFAULT_VALUE;
							    	  if(default_value!=undefined && default_value!=null && default_value!=""){
							    		  def+="\""+feild+"\":\""+getDefaultValue(default_value)+"\",";
							    	  }
							    	  //添加默认索引值
							    	  def+="\""+indexName+"\":\""+indeValue+"\",";
							      }
							      if(def!=""){
							    	  def=def.substring(0, def.length-1);
							    	  def="{"+def+"}";
							      }
							    console.log("def:",def); 
							    var tt=JSON.parse(def);          //不支持单引号   支持双引号

								$("#"+gridName).datagrid('appendRow',tt);
								dtleditIndex = $("#"+gridName).datagrid('getRows').length-1;

								$("#"+gridName).datagrid('selectRow', dtleditIndex)
										.datagrid('beginEdit', dtleditIndex);
						}
					}
				}
			}

		}
		catch (e)
		{
			ShowMessage("错误...", "取界面参数错误！" + e.description, "E");
		}
	}
}

/*
 * 功能：窗体创建
 * 参数：功能模块、子功能模块、子模块名称
 * 作者：李福明
 * 时间：2015-06-10
 */
function MultConstruct(moduleStr, funStr, funnameStr)
{
	MessageUtil.Show('界面创建中，请稍候...');
	
	//初始化当前数据导入状态
	window.isInportData = "";
	//窗体按钮构建
	var params =
	{
		getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_POWER\",PARAMETER:\"\",WHERE:\"ROLECODE='"
		                + localjsonObj.rolecode + "' AND MODULE='" 
		                + moduleStr + "' AND FUNCODE='" 
		                + funStr
		                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"系统权限\",IS_GRID:\"2\","
		                + "USER_ID:\"" + localjsonObj.username 
		                + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
		                + "\"}",
		errorMessage : ""
	};
	$.ajax(
	{
		url :ip+"getdata",
		method : "POST",
		data : params,
		datatype : "json",
		success : function (data)
		{
			var funPower = JSON.parse(data); //使用这个方法解析json

			
			if ((funPower != null && funPower != undefined) && funPower.length > 0)
			{
				var powerRecord = funPower[0];

				window.allowEdit = powerRecord.ALLOWEDIT;
				window.allowConfirm = powerRecord.ALLOWCONFIRM;
				window.power = powerRecord.POWER;

				if ((window.power != null && window.power != undefined) &&
					(window.power != "" && window.power != "null"))
				{
					if (window.power.toUpperCase() != "ALL")
					{
						window.power = window.power.toUpperCase();

						if (window.power.indexOf("$GETDATE") >= 0)
						{
							window.power = window.power.replace("$GETDATE", "'" + getDefaultValue("$GETDATE") + "'");
						}
						else if (window.power.indexOf("$GUID") >= 0)
						{
							window.power = window.power.replace("$GUID", "'" + getDefaultValue("$GUID") + "'");
						}
						else if (window.power.indexOf("$GROUP_CODE") >= 0)
						{
							window.power = window.power.replace("$GROUP_CODE", "'" + getDefaultValue("$GROUP_CODE") + "'");
						}
						else if (window.power.indexOf("$DEPART_CODE") >= 0)
						{
							window.power = window.power.replace("$DEPART_CODE", "'" + getDefaultValue("$DEPART_CODE") + "'");
						}
						else
						{
							window.power = window.power.replace("$USER", "'" + getDefaultValue("$USER") + "'");
						}
					}
					else
					{
						window.power = "";
					}
				}
				else
				{
					window.power != "";
				}
			}

			//窗体界面构建
			var dataGridColumns = null,
			dtldataGridColumns = null,
			queryColumns = null;
			var gridTitle = funnameStr + "数据列表";

			var showCheckBox = true;
		
			var getPara = "{MODULE:'" + moduleStr + "',FUN:'" + funStr + "'}'";
			var params =
			{
				getObject : getPara,
				errorMessage : ""
			};

			try
			{
				$.ajax(
				{
					url : ip+"getUIFielddata",
					method : "POST",
					data : params,
					datatype : "json",
					success : function (data)
					{
						var jsonobj = JSON.parse(data); //使用这个方法解析json
						window.dsUIAll = JSON.parse(data); //jsonobj.DSUI;

						var mastPageName = "主表";
						var detailPageName = "明细表";

						var dsUIs = window.dsUIAll.DSUI;

						var barcodePara = window.dsUIAll.BARCODE;
						
						var procedurePara=window.dsUIAll.PROCEDURE;
						var rolename=getDefaultValue("$USER");
						console.log("rolename:" + JSONToStr(rolename));
						//普通存储过程
						var procedureName='';
						var paras='';
						var namedesc='';
						if ((procedurePara != null && procedurePara != undefined) &&
								(procedurePara != "" && procedurePara != "null"))
							{
								var procedureName=procedurePara[0].TABLENAME;
								var paras=procedurePara[0].PARA;
								var namedesc=procedurePara[0].NAMEDESC;
								
								console.log("procedurePara:" + JSONToStr(procedurePara));
								console.log("procedureName:" + JSONToStr(procedureName));
								console.log("paras:" + JSONToStr(paras));
							}
						
						console.log("window.dsUIALL.DSUI:" + JSONToStr(window.dsUIAll.DSUI));
						console.log("window.dsUIALL.BARCODE:" + JSONToStr(window.dsUIAll.BARCODE));

						//取消审核
						var cancelVerify=window.dsUIAll.CANCELVERIFY;
						var cancelName='';
						var cancelDesc='';
						var cancelParas='';
						
						if ((cancelVerify != null && cancelVerify != undefined) &&
								(cancelVerify != "" && cancelVerify != "null"))
							{
						
								var cancelName=cancelVerify[0].TABLENAME;
								var cancelParas=cancelVerify[0].PARA;
								var cancelDesc=cancelVerify[0].NAMEDESC;
							}
						if (dsUIs != null && dsUIs.length > 0)
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUI = dsUIs[i];
								if (DSUI != undefined && DSUI != null)
								{
									var pageNo = DSUI.PAGE_NO;
									var pageName = DSUI.PAGE_NAME + "列表";

									//读取允许修改字段值
									//console.log("old window.isModal[pageNo]:%s", window.isModal[pageNo]);
									var dsuiRows = DSUI.DSUI;
									//console.log("pageNo:%s", pageNo);
									if (window.isModal[pageNo] == null || window.isModal[pageNo] == undefined)
									{
										window.isModal[pageNo] = "1";
										//console.log("Begin fill");
										//console.log("dsuiRows:%s", JSONToStr(dsuiRows));
										if ((dsuiRows != null && dsuiRows != undefined) && dsuiRows.length > 0)
										{
											var dsuiRow = dsuiRows[0];

											//console.log("dsuiRow:%s", JSONToStr(dsuiRow));

											if (dsuiRow != null && dsuiRow != undefined)
											{
												var isModal = dsuiRow.IS_MODAL;

												//console.log("isModal:%s", isModal);

												if ((isModal != null && isModal != undefined) && (isModal != "" && isModal != "null"))
												{
													window.isModal[pageNo] = isModal;
												}
											}
										}
									}
								
									//主表构建
									if (pageNo != undefined && pageNo == "0")
									{
										dataGridColumns = DSUI.COLUMNS;
										queryColumns = DSUI.QUERYCOLUMNS;

										window.mainwhere = DSUI.WHERE;

										var queryHeight = ConstuctQuery(JSON.stringify(queryColumns));

										if (queryColumns == null || queryColumns.length == 0)
										{
											//如果无查询区
											window.queryPanelHeight = 0;
										}
										else
										{
											//如果有查询区
											window.queryPanelHeight = queryHeight + 50;
										}

										try
										{
											//更新查询区高度
											$('#centerPanel').layout("panel", "north").panel("resize",
											{
												height : window.queryPanelHeight
											}
											);
											$('#centerPanel').layout("resize");

											$('#mdataGroup').panel(
											{
												title : pageName
											}
											);

											console.log('806',pageName);
											mastPageName = DSUI.PAGE_NAME;

											window.rowIndex["mdataGrid"] = -1;

											//alert('00');

											var dataGridHeight = $('#centerPanel').layout("panel", "center").height() - window.msGirdSubHeight;

											//alert('01');

											$('#mdataGrid').height(dataGridHeight);

											//alert("mgrid:" + dataGridHeight.toString());

											//配置列表显示
											$('#mdataGrid').datagrid(
											{
												//fit : true,
												height : dataGridHeight,
												fitColumns : false,
												pageSize : 5,
												pageList : [5, 10, 15, 20],
												loadMsg : '数据加载中，请稍后......',
												frozenColumns : [[
														{
															field : 'ck',
															checkbox : showCheckBox
														}
													]],
												columns : [dataGridColumns],
												onClickRow : function (index, row)
												{
													var datagrid = $('#mdataGrid');
													//单击列表行事件，用来停止上一行的编辑事件

													if (window.rowIndex["mdataGrid"] != index)
													{
														//如果是行编辑方式进行数据编辑需要使用下面注释代码
														datagrid.datagrid("endEdit", window.rowIndex["mdataGrid"]);
														//endEditing(datagrid, "mdataGrid");

														window.rowIndex["mdataGrid"] = index;

														//审核按钮标题修改
														if (window.dsUIAll.VERIFY != undefined && window.dsUIAll.VERIFY != null)
														{
															console.log("window.dsUIAll.VERIFY:%s", JSONToStr(window.dsUIAll.VERIFY));

															var dsui = null;

															for (var i = 0; i < window.dsUIAll.DSUI.length; i++)
															{
																var tempDsui = window.dsUIAll.DSUI[i];
																var page_no = tempDsui.PAGE_NO;

																if (page_no == "0")
																{
																	dsui = tempDsui.DSUI;
																	break;
																}
															}

															console.log("dsui:%s", JSONToStr(dsui));

															if ((dsui != undefined && dsui != null) && (dsui.length > 0))
															{
																var table_name = dsui[0].TABLE_NAME;
																var invent_table = dsui[0].INVENTED_TABLE;

																console.log("table_name:%s", table_name);
																console.log("invent_table:%s", invent_table);

																var status_field = "";
																var status_desc = "";
																for (var i = 0; i < window.dsUIAll.VERIFY.length; i++)
																{
																	var verifyRecord = window.dsUIAll.VERIFY[i];

																	console.log("verifyRecord:%s", JSONToStr(verifyRecord));

																	var tempTable = verifyRecord.STATUS_FIELD;

																	console.log("tempTable:%s", tempTable);

																	if (tempTable != undefined && tempTable != null)
																	{
																		var tempTableSplit = tempTable.split("|");

																		if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length == 2)
																		{
																			var tempTb = tempTableSplit[0];
																			var tempFd = tempTableSplit[1];

																			console.log("tempTb:%s", tempTb);
																			console.log("tempFd:%s", tempFd);

																			if (tempTb == table_name || tempTb == invent_table)
																			{
																				if (tempTb != undefined && tempTb != null)
																				{
																					if (status_field == "")
																					{
																						if (tempFd != undefined && tempFd != null)
																						{
																							status_field = tempFd;
																						}
																					} 
																					var statusFieldValue = row[status_field];

																					console.log("statusFieldValue:%s", statusFieldValue);

																					if (statusFieldValue == undefined)
																					{
																						console.log("取当前审核字段值异常！");
																						statusFieldValue = "";
																					}

																					var tempStatusFieldValue = verifyRecord.PARENTVERIFYSTATE;
																					console.log("tempStatusFieldValue:%s", tempStatusFieldValue);

																					if (statusFieldValue == null || statusFieldValue == "" || statusFieldValue == "null")
																					{
																						if (tempStatusFieldValue == null || tempStatusFieldValue == "" || tempStatusFieldValue == "null")
																						{
																							status_desc = verifyRecord.VERIFYDISPLAYNAME;
																						}
																					}
																					else
																					{
																						if (statusFieldValue == tempStatusFieldValue)
																						{
																							status_desc = verifyRecord.VERIFYDISPLAYNAME;
																						}
																					}
																				} 
																			} 
																		} 
																	} 

																	if (status_field != "" && status_desc != "")
																		break;
																}

																console.log("status_field:%s", status_field);
																console.log("status_desc:%s", status_desc);

																if ((status_desc != undefined && status_desc != null) && status_desc != "")
																{
																	$('#btVerify').linkbutton(
																	{
																		plain : true,
																		iconCls : 'icon-verify',
																		text : status_desc
																	}
																	);
																}
																else
																{
																	$('#btVerify').linkbutton(
																	{
																		plain : true,
																		iconCls : 'icon-verify',
																		text : "已审核"
																	}
																	);
																}
															} 
														} 

														getDetailData(row);
													}
												},
												onLoadSuccess : function ()
												{
													//数据加载成功方法
													window.rowIndex["mdataGrid"] = -1;
													getDetailData(null);
												},
												onLoadError : function ()
												{
													//数据加载失败方法
													ShowMessage("错误...", gridTitle + "数据加载失败！", "E");
												},
												onDblClickRow : function (index, row)
												{
													if (window.allowEdit != "是")
													{
														return;
													}

													//如果当前业务为只模式，则不允许进行修改
													if (window.isModal["0"] == "0")
													{
														return;
													}

													var datagrid = $('#mdataGrid');
													datagrid.datagrid("unselectAll");
													datagrid.datagrid("selectRow", index);
													window.rowIndex["mdataGrid"] = index;
													window.focusGrid = "mdataGrid";
													//双击开启编辑行
													var DSUIS = window.dsUIAll.DSUI;
													var DSUI = null;
													for (var i = 0; i < DSUIS.length; i++)
													{
														var suDSUI = DSUIS[i];
														var pageNo = suDSUI.PAGE_NO;

														if (pageNo == "0")
														{
															DSUI = suDSUI;
															break;
														}
													}
													OpenEditWindow(DSUI, row, null);
													/*
													if (window.rowIndex["mdataGrid"] != -1) {
													datagrid.datagrid("endEdit", window.rowIndex["mdataGrid"]);
													window.rowIndex["mdataGrid"] = -1;
													}
													if (row != undefined && row != null) {
													datagrid.datagrid("beginEdit", index);
													window.rowIndex["mdataGrid"] = index;
													}
													 */
													
													console.log('1046','双击被触发++++');
												},
												onBeforeEdit : function (index, row)
												{
													row.editing = true;
													window.rowIndex["mdataGrid"] = index;
												},
												onAfterEdit : function (index, row)
												{
													var datagrid = $('#mdataGrid');
													//setEditing(datagrid, index);

													row.editing = false;
													updateActions($('#mdataGrid'), index);
												},
												onCancelEdit : function (index, row)
												{
													row.editing = false;
												}
											}
											);
										}
										catch (ex)
										{
											ShowMessage("错误...", "主表列表初始化错误！" + ex.description, "E");
										}

										


									} 

									//子表构建
									if (pageNo != undefined && pageNo == "1")
									{
										try
										{
									
											dtldataGridColumns = DSUI.COLUMNS;
											//queryColumns = DSUI.QUERYCOLUMNS;

											window.detailwhere = DSUI.WHERE;

											detailPageName = DSUI.PAGE_NAME;
											//alert(JSON.stringify(dtldataGridColumns));

											var gridColumns = "[" + JSON.stringify(dtldataGridColumns) + "]";
											dtldataGridColumns = eval(gridColumns);

											window.rowIndex["dtldataGrid"] = -1;

											$('#dtldataGroup').panel(
											{
												title : pageName
											}
											);

											var dataGridHeight = $('#operPanel').layout("panel", "south").height() - window.dtlGirdSubHeight;


											$('#dtldataGrid').height(dataGridHeight);

											//$('#dtldataGrid').children(".datagrid-body").html("<div style='width:"+$(".datagrid-header-row").width()+"px;border:solid 0px;height:1px;'></div>");

											//alert("dtlgrid:" + dataGridHeight.toString());

											//配置列表显示
											$('#dtldataGrid').datagrid(
											{
												//fit : true,
												height : dataGridHeight,
												fitColumns : false,
												pageSize : 10,
												pageList : [5, 10, 15, 20],
												loadMsg : '数据加载中，请稍后......',
												frozenColumns : [[
														{
															field : 'ck',
															checkbox : showCheckBox
														}
													]],
												columns : dtldataGridColumns,
												onClickRow : function (index, row)
												{
													var datagrid = $('#dtldataGrid');
													//单击列表行事件，用来停止上一行的编辑事件

													if (window.rowIndex["dtldataGrid"] != index)
													{
														datagrid.datagrid("endEdit", window.rowIndex["dtldataGrid"]);
														endEditing(datagrid, "dtldataGrid");

														window.rowIndex["dtldataGrid"] = index;
													}
												},
												onLoadSuccess : function ()
												{
													//数据加载成功方法
													window.rowIndex["dtldataGrid"] = -1;
												},
												onLoadError : function ()
												{
													//数据加载失败方法
													ShowMessage("错误...", gridTitle + "数据加载失败！", "E");
												},
												onDblClickRow : function (index, row)
												{
													if (window.allowEdit != "是")
													{
														return;
													}

													//如果当前业务为只模式，则不允许进行修改
													if (window.isModal["1"] == "0")
													{
														return;
													}

													var datagrid = $('#dtldataGrid');
													datagrid.datagrid("unselectAll");
													datagrid.datagrid("selectRow", index);
													window.rowIndex["dtldataGrid"] = index;
													window.focusGrid = "dtldataGrid";
													//双击开启编辑行
													var DSUIS = window.dsUIAll.DSUI;
													var DSUI = null;
													var mastName = "";
													for (var i = 0; i < DSUIS.length; i++)
													{
														var suDSUI = DSUIS[i];
														var pageNo = suDSUI.PAGE_NO;

														if (pageNo == "1")
														{
															DSUI = suDSUI;
														}
														else
														{
															mastName = suDSUI.PAGE_NAME;
														}
													}
													var mainRow = $('#mdataGrid').datagrid('getSelected');
													if (mainRow != undefined && mainRow != null)
													{
														OpenEditWindow(DSUI, row, mainRow);
													}
													else
													{
														ShowMessage("错误...", mastName + "未选择数据，不可进行编辑！", "W");
													}

													/*
													var datagrid = $('#dtldataGrid');
													//双击开启编辑行
													if (window.rowIndex["dtldataGrid"] != -1) {
													datagrid.datagrid("endEdit", window.rowIndex["dtldataGrid"]);
													window.rowIndex["dtldataGrid"] = -1;
													}
													if (row != undefined && row != null) {
													datagrid.datagrid("beginEdit", index);
													window.rowIndex["dtldataGrid"] = index;
													}
													 */
													
													console.log('1210','+++++++++++++++++++++++==');
												},
												onBeforeEdit : function (index, row)
												{
													row.editing = true;
													window.rowIndex["dtldataGrid"] = index;
												},
												onAfterEdit : function (index, row)
												{
													row.editing = false;
													updateActions($('#dtldataGrid'), index);
												},
												onCancelEdit : function (index, row)
												{
													row.editing = false;
												}
											}
											);
										}
										catch (ex)
										{
											ShowMessage("错误...", "明细列表初始化错误！" + ex.description, "E");
										}
									}
								} 
							}

						
							$(document).ready(function ()
							{

								var queryHtml = "<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search'\" onclick=\"QueryData('M')\">查询</a>"
									 + "<a id=\"btQueryClear\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search_clear'\" onclick=\"QueryClear('M')\">清空查询</a>";

								var editHtml = "";

								if (window.isModal["0"] == "0")
								{
									if (window.isModal["1"] == "0")
									{
										//主从表都不可修改
										editHtml = "";
									}
									else
									{
										//主表不可修改，从表能修改
										//console("deleteMSGroup:%s", $("#deleteMSGroup").toString());
										editHtml = editHtml
											 + "<span id=\"deleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"deleteDtlGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\"  onclick=\"deleteRow('dtldataGrid')\">"
											 + "<span id=\"btDeleteDtl\" >删除" + detailPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"addSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"addDtlGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" onclick=\"appendByWindow('dtldataGrid')\">"
											 + "<span id=\"btAddDtl\" >新增" + detailPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"saveSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"save('M')\">保存</a>";
									}
								}
								else
								{
									if (window.isModal["1"] == "0")
									{
										//主表能修改，从表不能修改
										editHtml = editHtml
											 + "<span id=\"deleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"deleteMSGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\"  onclick=\"deleteRow('mdataGrid')\">"
											 + "<span id=\"btDeleteMs\" >删除" + mastPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"addSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"addMSGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" onclick=\"appendByWindow('mdataGrid')\">"
											 + "<span id=\"btAddMs\" >新增" + mastPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"saveSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"save('M')\">保存</a>";
									}
									else
									{
										//主从表都可以修改
										editHtml = editHtml
											 + "<span id=\"deleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"deleteMSGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\"  onclick=\"deleteRow('mdataGrid')\">"
											 + "<span id=\"btDeleteMs\" >删除" + mastPageName + "数据</span>"
											 + "</a>"
											 + "<a id=\"deleteDtlGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\"  onclick=\"deleteRow('dtldataGrid')\">"
											 + "<span id=\"btDeleteDtl\" >删除" + detailPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"addSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"addMSGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" onclick=\"appendByWindow('mdataGrid')\">"
											 + "<span id=\"btAddMs\" >新增" + mastPageName + "数据</span>"
											 + "</a>"
											 + "<a id=\"addDtlGroup\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" onclick=\"appendByWindow('dtldataGrid')\">"
											 + "<span id=\"btAddDtl\" >新增" + detailPageName + "数据</span>"
											 + "</a>"
											 + "<span id=\"saveSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"save('M')\">保存</a>";
									}
								}

								var verifyHtml = "<span id=\"verifySub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btVerify\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-verify'\" onclick=\"Verify('M')\">审核</a>";

								var exportHtml = "<span id=\"exportSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btExport\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-export'\" onclick=\"exportExcel('M')\">导出</a>";

								var printHtml = "<span id=\"printSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btPrint\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"reportPrint('M')\">打印</a>";

								var barcodePrintHtml = "<span id=\"labelSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btLabelPrint\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"labelPrint('M')\">标签打印</a>";

								var procedureHtml = "<span id=\"procedureSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btprocedure\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"ExcuteProcedure('M')\">"+namedesc+"</a>";

								var cancelVerifyHtml = "<span id=\"cancelVerifySub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
									 + "<a id=\"btcancelprocedure\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-print'\" onclick=\"cancelVerify('M')\">"+cancelDesc+"</a>";
								
								$("#tool_menu").empty();
								$('#tool_menu').append(queryHtml);

								if ((window.allowEdit != null && window.allowEdit != undefined) && window.allowEdit == "是")
								{
									$('#tool_menu').append(editHtml);
								}

								if (((window.allowConfirm != null && window.allowConfirm != undefined) && window.allowConfirm == "是") && (window.dsUIAll.VERIFY != undefined && window.dsUIAll.VERIFY != null) && (window.dsUIAll.VERIFY.length > 0))
								{
									$('#tool_menu').append(verifyHtml);
								}

								$('#tool_menu').append(exportHtml);

								if ((window.PRINT != undefined && window.PRINT != null) &&
									((window.PRINT != "" && window.PRINT != "null") && (window.PRINT.length > 0)))
								{
									$('#tool_menu').append(printHtml);
								}

								if ((window.allowEdit != null && window.allowEdit != undefined) && window.allowEdit == "是")
								{
									var newAddObj = window.dsUIAll.NEW_ADD;

									if ((newAddObj != null && newAddObj != undefined) &&
										(newAddObj != "" && newAddObj != "null"))
									{
										var addPageNo = "0";
										var addPageName = "";
										var addType = newAddObj.TYPE;

										if (addType == "ACTIVE" || addType == "GRID")
										{
											addPageNo = newAddObj.PAGE_NO;
										}

										if (addPageNo != null && addPageNo != undefined)
										{
											for (var i = 0; i < window.dsUIAll.DSUI.length; i++)
											{
												var uiRow = window.dsUIAll.DSUI[i];
												var temPageNo = uiRow.PAGE_NO;

												if (addPageNo == temPageNo)
												{
													addPageName = uiRow.PAGE_NAME;
												}
											}
										}

										if (addType == "ACTIVE" || addType == "GRID")
										{
											addPageName = addPageName + "导入";
										}
										else
										{
											addPageName = "生成" + addPageName;
										}

										console.log("addPageName:%s", addPageName);

										if (addPageName == null || addPageName == undefined || addPageName == "null")
											addPageName = "";

										var inportHtml = "<span id=\"deleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
											 + "<a id=\"btInport\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-inport'\" onclick=\"inportData('M')\">" + addPageName + "</a>";

										$('#tool_menu').append(inportHtml);
									}
								}

								//增加标签打印按钮
								if ((barcodePara != null && barcodePara != undefined) &&
									(barcodePara != "" && barcodePara != "null"))
								{
									$('#tool_menu').append(barcodePrintHtml);
								}
								
								//增加更新数据按钮
								if ((paras != null && paras != undefined) &&
									(paras != "" && paras != "null"))
								{
									$('#tool_menu').append(procedureHtml);
								}
								
								//增加取消审核按钮
								if ((cancelParas != null && cancelParas != undefined) &&
									(cancelParas != "" && cancelParas != "null"))
								{
									$('#tool_menu').append(cancelVerifyHtml);
								}

								bodyRefresh($('#tool_menu'));
								bodyRefresh($('#queryGroup'));
							}
							);

							/*
							if (window.isModal["0"] == "0"){
							if (window.isModal["1"] == "0"){
							//主从表都不可修改
							if ($("#deleteSub") != undefined) $("#deleteSub").remove();
							if ($("#deleteMSGroup") != undefined) $("#deleteMSGroup").remove();
							if ($("#deleteDtlGroup") != undefined) $("#deleteDtlGroup").remove();
							if ($("#addSub") != undefined) $("#addSub").remove();
							if ($("#addMSGroup") != undefined) $("#addMSGroup").remove();
							if ($("#addDtlGroup") != undefined) $("#addDtlGroup").remove();
							if ($("#saveSub") != undefined) $("#saveSub").remove();
							if ($("#btSave") != undefined) $("#btSave").remove();
							}else{
							//主表不可修改，从表能修改
							//console("deleteMSGroup:%s", $("#deleteMSGroup").toString());
							if ($("#deleteMSGroup") != undefined) $("#deleteMSGroup").remove();
							if ($("#addMSGroup") != undefined) $("#addMSGroup").remove();
							}
							}else{
							if (window.isModal["1"] == "0"){
							//主表能修改，从表不能修改
							if ($("#deleteDtlGroup") != undefined) $("#deleteDtlGroup").remove();
							if ($("#addDtlGroup") != undefined) $("#addDtlGroup").remove();
							}
							}
							 */
						} //End of if (dsUIs != null && DSUIs.length > 0)
						
						MessageUtil.Close();
					},
					error : function (errorMessage)
					{
						MessageUtil.Close();
						ShowMessage("错误...", "未从服务器取到数据！" + errorMessage, "E");
					}
				}
				);
			}
			catch (e)
			{
				MessageUtil.Close();
				ShowMessage("错误...", gridTitle + "列表初始化错误！" + e.description, "E");
			}

		},
		error : function (errorMessage)
		{
			MessageUtil.Close();
			ShowMessage("错误...", funnameStr + "系统权限加载失败！", "E");
		}
	}
	);
}

/*
 * 功能：创建查询区显示
 * 参数：查询区参数JSON字符串
 * 返回：当前查询区高度
 * 作者：李福明
 * 时间：2015-06-10
 */
function ConstuctQuery(queryColumnsStr)
{
	console.log("创建查询区显示-queryColumnsStr:",queryColumnsStr);
	var subHeight = -1;

	if (queryColumnsStr == undefined || queryColumnsStr == null || queryColumnsStr == "")
	{
		// 如果没有查询区，则隐藏查询区及查询按钮
		try
		{
			$('#queryGroup').panel(
			{
				title : ""
			}
			);
			$('#queryGroup').remove();

			if ($('#btQuery') != undefined && $('#btQuery') != null)
				$('#btQuery').remove();
			if ($('#querySub') != undefined && $('#querySub') != null)
				$('#querySub').remove();

			$('#centerPanel').layout('remove', 'north');

			subHeight = 0;
		}
		catch (e)
		{
			ShowMessage("错误...", "隐藏查询区界面错误！" + e.description, "E");
		}

		return;
	}

	//将查询区配置参数JSON字符串转换为JSON对象
	var queryColumns = eval(queryColumnsStr);

	console.log('queryColumns:',queryColumns);
	if (queryColumns == null || queryColumns.length == 0)
	{
		// 如果没有查询区，则隐藏查询区及查询按钮
		try
		{
			$('#queryGroup').panel(
			{
				title : ""
			}
			);
			$('#queryGroup').remove();

			if ($('#btQuery') != undefined && $('#btQuery') != null)
				$('#btQuery').remove();
			if ($('#querySub') != undefined && $('#querySub') != null)
				$('#querySub').remove();

			$('#centerPanel').layout('remove', 'north');

			subHeight = 0;
		}
		catch (e)
		{
			ShowMessage("错误...", "隐藏查询区界面错误！" + e.description, "E");
		}
	}
	else
	{
		//创建查询区

		//每一行显示的查询条件录入个数
		var lineCount = 3;
		//行间隔调整值
		var rowHeightSub = 10;
		
		console.log('创建查询区------------------');

		//有多少个字段需要查询
		var targetLength = queryColumns.length;
		
		console.log('targetLength:',targetLength);
		//取行数
		var targetCount = parseInt(targetLength / lineCount);
		//取剩余字段
		var targetRemain = targetLength % lineCount;
		//行高
		var rowHeight = 20;
		//取查询区行高
		if (targetRemain > 0)
		{
			subHeight = (targetCount + 1) * rowHeight + rowHeightSub;
		}
		else
		{
			subHeight = targetCount * rowHeight + rowHeightSub;
		}

		try
		{			
			//组织页面HTML标记
			var htmlStr = "<table css='normal_table'>";
			
			var formedObjectNo = 0;
			for (var i = lineCount; i < targetLength + lineCount; i++){
				var fieldDesc = queryColumns[i-lineCount].title;
				var fieldStr = queryColumns[i-lineCount].field;
				var fieldType = $.trim(queryColumns[i-lineCount].field_type.toUpperCase());
				var queryType = queryColumns[i - lineCount].querytype;
				var default_value=queryColumns[i - lineCount].default_value;
				
				//下拉框配置参数
				var f_table_field=queryColumns[i-lineCount].f_table_field;
				//console.log("fieldStr:",fieldStr);
				console.log("f_table_field:",f_table_field);
				
				if (queryType == "1"){
					console.log("1");
					if (formedObjectNo % lineCount == 0){
						if (formedObjectNo != lineCount) htmlStr = htmlStr + "</tr>";
						htmlStr = htmlStr + "<tr style='height:" + rowHeight.toString() + "px;'>";
						//console.log("111111执行换行");
					}
					
					htmlStr = htmlStr + "<td style='width:90px;'>" + fieldDesc + "</td>";
					htmlStr = htmlStr + "<td style='width:300px;'><div style='width:280px;'>";
					if (fieldType.indexOf("DATE") >= 0){
						
						console.log("default_value:",default_value);
						if(default_value == "$GETDATE"){
							
							htmlStr = htmlStr + "<input id='fr_" +fieldStr + "' class='easyui-datebox' value='getdate()'  style='width:120px;height:20px;'></input>";//style='width:120px;height:20px;'
							htmlStr = htmlStr + "&nbsp;-&nbsp;";
						}
						else{
							
							htmlStr = htmlStr + "<input id='fr_" +fieldStr + "' class='easyui-datebox'  style='width:120px;height:20px;'></input>";//style='width:120px;height:20px;'
							htmlStr = htmlStr + "&nbsp;-&nbsp;";
						}

						htmlStr = htmlStr + "<input id='to_" +fieldStr + "' class='easyui-datebox'  style='width:120px;height:20px;'></input>";
					}else{
						htmlStr = htmlStr + "<input id='fr_" +fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
						htmlStr = htmlStr + "&nbsp;-&nbsp;";
						htmlStr = htmlStr + "<input id='to_" +fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
						console.log("333333");
					}
					htmlStr = htmlStr + "</div></td>";
					formedObjectNo = formedObjectNo + 1;
				}
				else if(queryType=="2"){
					//作者：陈立新  功能：查询区域生成下拉框  时间：2018-10-15
					
					//*****************取下框配置*****************************
					//查看当前列是否为下拉列表框
					var listDataSet = null;
					var valueField = "";
					var dispField = "";
					if ((f_table_field != null && f_table_field != undefined) && f_table_field != "")
					{
						var f_rel_params =
						{
							getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_F_TABLE_FIELD\",PARAMETER:\"\",WHERE:\"F_TABLE_FIELD='"
							                + f_table_field
							                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框配置\",IS_GRID:\"2\","
                                            + "USER_ID:\"" 
                                            + localjsonObj.username 
                                            + "\",VERIFY_NO:\"" 
                                            + localjsonObj.verifyno 
                                            + "\"}",
							errorMessage : ""
						};
						$.ajax(
						{
							url : ip+"getdata",
							method : "POST",
							data : f_rel_params,
							datatype : "json",
							async : false,
							success : function (data)
							{
								var listDs = JSON.parse(data); //使用这个方法解析json

								if ((listDs != null && listDs != undefined) && listDs.length > 0)
								{
									var listRecord = listDs[0];
									valueField = listRecord.KEY_FIELD;
									dispField = listRecord.DISP_FIELD;
									//console.log("valueField:",valueField);

									var f_data_params =
									{
										getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\"" 
											             + f_table_field 
											             + "\",PARAMETER:\"\",WHERE:\"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框数据\",IS_GRID:\"2\","
                                                         + "USER_ID:\"" 
                                                         + localjsonObj.username 
                                                         + "\",VERIFY_NO:\"" 
                                                         + localjsonObj.verifyno 
                                                         + "\"}",
										errorMessage : ""
									};
									$.ajax(
									{
										url : ip+"getdata",
										method : "POST",
										data : f_data_params,
										datatype : "json",
										async : false,
										success : function (data)
										{
											listDataSet = JSON.parse(data);
										},
										error : function (errorMessage)
										{
											ShowMessage("错误...", "取下拉列表框数据失败！", "E");
										}
									}
									);
								}
							},
							error : function (errorMessage)
							{
								ShowMessage("错误...", "取下拉列表框配置失败！", "E");
							}
						}
						);
					}

//					//如果未配置下拉列表框，则显示普通编辑框
//					if (listDataSet == null || listDataSet == undefined)
//					{
//						htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
//					}
//					else
//					{
//						//如果配置了下拉列表框，则显示下拉列表框
//						//var comboOptions = fieldEditor.options;
//						var dataOption = "data-options='      valueField:\"" + valueField
//						 +"\",textField:\""+dispField
//						 +"\",data:"+JSONToStr(listDataSet)
//							 +",method:\"get\",onSelect:ChangeCombobox'";//001
//						
//						console.log("dataOption:",dataOption);
//
//						Combobox_fieldStr='#'+fieldStr;
//						htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
//					}
			
					
					if (formedObjectNo % lineCount == 0){
						if (formedObjectNo != lineCount) htmlStr = htmlStr + "</tr>";
						htmlStr = htmlStr + "<tr style='height:" + rowHeight.toString() + "px;'>";
						console.log("111111执行换行");
					}
					
					htmlStr = htmlStr + "<td style='width:90px;'>" + fieldDesc + "</td>";
					htmlStr = htmlStr + "<td style='width:300px;'><div style='width:280px;'>";
					if (fieldType.indexOf("VARCHAR") >= 0 && listDataSet !="" && listDataSet !=undefined){
						
						var dataOption = "data-options='      valueField:\"" + valueField
						 +"\",textField:\""+dispField
						 +"\",data:"+JSONToStr(listDataSet)
							 +",method:\"get\"'";//001
						
						console.log("dataOption:",dataOption);
						
						
						htmlStr = htmlStr + "<input id='fr_" +fieldStr + "' class='easyui-combobox'" + dataOption + " style='width:120px;height:20px;'></input>";//style='width:120px;height:20px;'
						htmlStr = htmlStr + "&nbsp;-&nbsp;";
						htmlStr = htmlStr + "<input id='to_" +fieldStr + "' class='easyui-combobox'" + dataOption + " style='width:120px;height:20px;'></input>";
					}else{
						htmlStr = htmlStr + "<input id='fr_" +fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
						htmlStr = htmlStr + "&nbsp;-&nbsp;";
						htmlStr = htmlStr + "<input id='to_" +fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
						console.log("333333");
					}
					htmlStr = htmlStr + "</div></td>";
					
					formedObjectNo = formedObjectNo + 1;
				}		
				else{
					/*
					 * 易韦达
					 * 查询窗体
					 * 2017-7-14
					 */
					console.log('queryType:',queryType);//TB_ROLE
					//1、依据queryType的值从TB_F_TABLE_FIELD取查询列表数据，列表数据来源于字段TARGET_NAME
					var f_query_params =
					{
						getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_F_TABLE_FIELD\",PARAMETER:\"\",WHERE:\"TARGET_NAME='"
							            + queryType
							            + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框配置\",IS_GRID:\"2\","
                                        + "USER_ID:\"" 
                                        + localjsonObj.username 
                                        + "\",VERIFY_NO:\"" 
                                        + localjsonObj.verifyno 
                                        + "\"}",
						errorMessage : ""
					};
					
					$.ajax(
							{
								url :ip+"getdata",
								method : "POST",
								data : f_query_params,
								datatype : "json",
								async : false,
								success : function (data)
								{
									var list = JSON.parse(data);
									
									console.log(list);
									for (var i = 0; i < list.length; i++)
									{
										var  listQuery = list[i];				
										queryfield=listQuery.F_TABLE_FIELD;
										querytarget=listQuery.TARGET_NAME;
										console.log("queryfield:",queryfield,"querytarget:",querytarget);	
									}	
									
									console.log("queryfield:",queryfield,"querytarget:",querytarget);	
									var f_field_params =
									{
										getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_F_TABLE_FIELD_DIS\",PARAMETER:\"\",WHERE:\"F_TABLE_FIELD='"
											             + queryfield
											             + "'AND TARGET_NAME='"
											             + querytarget
											             + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框配置\",IS_GRID:\"2\","
				                                         + "USER_ID:\"" 
				                                         + localjsonObj.username + "\",VERIFY_NO:\"" 
				                                         + localjsonObj.verifyno 
				                                         + "\"}",//0717
										errorMessage : ""
									};
									
									
									$.ajax(
											{
												url : ip+"getdata",
												method : "POST",
												data : f_field_params,
												datatype : "json",
												async : false,
												success : function (data)
												{
													var dis = JSON.parse(data);
													
													console.log(dis);	
													
													for (var i = 0; i < dis.length; i++)
													{
														var  disQuery = dis[i];
														
									                    //2、依据TB_F_TABLE_FIELD表中的F_TABLE_FIELD、TARGET_NAME字段值从TB_F_TABLE_FIELD_DIS中取查询列表标题显示数据FIELDNAME					
														queryfieldname=disQuery.FIELDNAME;
														console.log("queryfieldname:",queryfieldname);	//用户管理
													}	
												},
												error : function (errorMessage)
												{
													ShowMessage("错误...", "取下拉列表框数据失败！", "E");
												}
											}
											);	
								
								
								},
								error : function (errorMessage)
								{
									ShowMessage("错误...", "取下拉列表框数据失败！", "E");
								}
							}
							);

				}//End of if (queryType == "1"){
			}//End of for (var i = lineCount; i < targetLength + lineCount; i++){

			$('#queryGroup').append(htmlStr);
		}
		catch (e)
		{
			ShowMessage("错误...", "创建查询区界面错误！" + e.description, "E");
		}
	}

	return subHeight;
}

/*
 * 功能：清空查询区所有编辑框内容
 * 参数：单表窗体，还是多表窗体
 * 作者：李福明
 * 时间：2015-06-26
 */
function QueryClear(frameType)
{
	if (frameType == undefined || frameType == null || frameType == "")
	{
		ShowMessage("错误...", "业务窗体模式参数错误！" + e.description, "E");
		return;
	}

	frameType = $.trim(frameType.toUpperCase());

	//如果是单表窗体
	if (frameType.substring(0, 1) == "S")
	{
		//取查询区列表参数
		var queryColumns = window.dsUIAll.QUERYCOLUMNS;

		try
		{
			if ((queryColumns != undefined && queryColumns != null) && queryColumns.length > 0)
			{
				for (var i = 0; i < queryColumns.length; i++)
				{
					var fieldStr = queryColumns[i].field;
					var fieldType = $.trim(queryColumns[i].field_type.toUpperCase());
					//作者：陈立新  时间：2018-10-15   功能下拉框查询
					//查询类型
					var queryType=queryColumns[i].querytype;
					var frObjectName = "#fr_" + fieldStr;
					var toObjectName = "#to_" + fieldStr;
                    if(queryType=="2"){
						$(frObjectName).combobox('setValue', '');
						$(toObjectName).combobox('setValue', '');
                    }	
                    else if (fieldType.indexOf("DATE") >= 0)
					{
						$(frObjectName).datebox('setValue', '');
						$(toObjectName).datebox('setValue', '');
					}
					else
					{
						$(frObjectName).textbox('setValue', '');
						$(toObjectName).textbox('setValue', '');
					}
				}
			}
		}
		catch (e)
		{
			ShowMessage("错误...", "进行单表查询条件清空时取界面参数错误！" + e.description, "E");
		}
	}
	else if (frameType.substring(0, 1) == "I")
	{
		//如果是导入小窗体
		if (window.inportNewUI != null)
		{
			var queryColumns = window.inportNewUI;

			try
			{
				if ((queryColumns != undefined && queryColumns != null) && queryColumns.length > 0)
				{
					for (var i = 0; i < queryColumns.length; i++)
					{
						var fieldStr = queryColumns[i].FIELD;
						var fieldType = queryColumns[i].FIELD_TYPE;
						var fieldQuery = queryColumns[i].QUERYTYPE;
                        var queryType=queryColumns[i].F_TABLE_FIELD;
                        
						if (fieldType == null || fieldType == undefined || fieldType == "")
						{
							fieldType = "VARCHAR";
						}
						else
						{
							fieldType = $.trim(fieldType.toUpperCase());
						}

						if (fieldQuery == "1")
						{
							var frObjectName = "#fr_" + fieldStr;
							var toObjectName = "#to_" + fieldStr;

							if (fieldType.indexOf("DATE") >= 0)
							{
								if ($(frObjectName) != null && $(frObjectName) != undefined)
								{
									$(frObjectName).datebox('setValue', '');
								}
								if ($(toObjectName) != null && $(toObjectName) != undefined)
								{
									$(toObjectName).datebox('setValue', '');
								}
							}
							else
							{
								if ($(frObjectName) != null && $(frObjectName) != undefined)
								{
									$(frObjectName).textbox('setValue', '');
								}
								if ($(toObjectName) != null && $(toObjectName) != undefined)
								{
									$(toObjectName).textbox('setValue', '');
								}
							}
						}
						else if(fieldQuery=="2"){
							var frObjectName = "#fr_" + fieldStr;
							var toObjectName = "#to_" + fieldStr;

							if ($(frObjectName) != null && $(frObjectName) != undefined)
							{
								$(frObjectName).combobox('setValue', '');
							}
							if ($(toObjectName) != null && $(toObjectName) != undefined)
							{
								$(toObjectName).combobox('setValue', '');
							}
						}
					}
				}
			}
			catch (e)
			{
				ShowMessage("错误...", "进行导入查询条件清空时取界面参数错误！" + e.description, "E");
			}
		}
	}
	else
	{
		//如果是多表窗体
		var dsUIs = window.dsUIAll.DSUI;

		if ((dsUIs != null && dsUIs != undefined) && dsUIs.length > 0)
		{
			try
			{
				for (var i = 0; i < dsUIs.length; i++)
				{
					var DSUI = dsUIs[i];

					if (DSUI != undefined && DSUI != null)
					{
						var pageNo = DSUI.PAGE_NO;
						var pageName = DSUI.PAGE_NAME + "列表";

						//主表构建
						if (pageNo != undefined && pageNo == "0")
						{
							dataGridColumns = DSUI.COLUMNS;
							queryColumns = DSUI.QUERYCOLUMNS;

							//清空编辑框对象文本
							if (queryColumns != null && queryColumns.length > 0)
							{
								for (var j = 0; j < queryColumns.length; j++)
								{
									var fieldStr = queryColumns[j].field;
									var fieldType = $.trim(queryColumns[j].field_type.toUpperCase());
									var frObjectName = "#fr_" + fieldStr;
									var toObjectName = "#to_" + fieldStr;
									//下拉框查询
                                    if(fieldType=="2"){
										$(frObjectName).combobox('setValue', '');
										$(toObjectName).combobox('setValue', '');
                                    }
									if (fieldType.indexOf("DATE") >= 0)
									{
										$(frObjectName).datebox('setValue', '');
										$(toObjectName).datebox('setValue', '');
									}
									else
									{
										$(frObjectName).textbox('setValue', '');
										$(toObjectName).textbox('setValue', '');
									}
								}
							}
						}
					}
				}
			}
			catch (e)
			{
				ShowMessage("错误...", "进行多表查询条件清空时取界面参数错误！" + e.description, "E");
			}
		}
	}
}

/*
 * 功能：配置了NEW_ADD后的新增按钮点击事件
 * 参数：窗体名称
 * 作者：李福明
 * 时间：2015-12-11
 */
function inportData(BussType)
{
	try
	{
		//if (BussType == "M"){
		//如果是多表业务
		var buttonHtml = "<a id=\"btEditSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-ok'\" >确定</a>"
			 + "<span id=\"editSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
			 + "<a id=\"btEditClose\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-cancel'\" onclick=\"$('#editWindow').window('close')\">退出</a>";

		var inportObjHtml = "";

		var subHtml = "<span style=\"color:#818181\">&nbsp;|&nbsp;</span>";

		if (window.dsUIAll != null && window.dsUIAll != undefined)
		{
			var newAddObj = window.dsUIAll.NEW_ADD;

			if (newAddObj != null && newAddObj != undefined)
			{
				var newAddType = newAddObj.TYPE;

				if (newAddType != null && newAddType != undefined)
				{
					if (newAddType == "ACTIVE")
					{
						//如果是COM控件
						var classID = newAddObj.CLASSID;
						var className = newAddObj.CLASSNAME;
						var pageNo = newAddObj.PAGE_NO;
						var mainPageName = "";
						var pageName = "";
						var mainRow = null;
						var indexRowStr = "";
						var mainDSUI = null;
						var mainIndex = null;
						var detailDSUI = null;
						var inportDSUI = null;
						var dataGrid = null;
						var funName = "";

						//验证导入OCX控件是否已安装
						if (className == null || className == undefined || className == "" || className == "null")
						{
							ShowMessage("错误...", "导入控件配置错误！", "W");
							return;
						}
						else
						{
							var ocxName = "";

							if (className == "ReadFile")
								ocxName = className + ".read";

							if (ocxName == "")
							{
								ShowMessage("错误...", "导入控件【" + className + "】不匹配！", "W");
								return;
							}
							else
							{
								if (!isOCXExists(ocxName))
								{
									ShowMessage("错误...", "导入控件【" + className + "】未安装，请下载安装控件！", "W");
									return;
								}
								else
								{
									console.log(className + "控件已安装！");
								}
							}
						} //End of if (className == null || className == undefined || className == ""  || className == "null"){

						//如果是多表且是明细表导入，则需要看主表是否选择了一行数据，如果未选择则提示错误并退出导入
						if (BussType == "M")
						{
							var DSUI = window.dsUIAll.DSUI;
							for (var i = 0; i < DSUI.length; i++)
							{
								var DSUIRow = DSUI[i];
								var page_no = DSUIRow.PAGE_NO;

								if (page_no == "0")
								{
									if (pageNo == "0")
									pageName = DSUIRow.PAGE_NAME;
									mainDSUI = DSUIRow.DSUI;
									mainIndex = DSUIRow.INDEXCOLUMNS;
									mainPageName = DSUIRow.PAGE_NAME;
								}
								else
								{
									if (pageNo == "1")
										pageName = DSUIRow.PAGE_NAME;
									detailDSUI = DSUIRow.DSUI;
								}
							} 

							if (pageName == null || pageName == undefined || pageName == "" || pageName == "null")
							{
								pageName = "主表数据";
							}

							if (pageNo == "1")
							{
								//如果是多表的明细表，则需要验证主表是否选择了一行数据，导入索引字段数据
								var mainDs = $('#mdataGrid').datagrid('getSelected');

								if (mainDs == null || mainDs == undefined || mainDs.length < 1)
								{
									ShowMessage("错误...", "请在【" + mainPageName + "列表】选择一行数据！", "W");
									return;
								}
								else
								{
									if (mainDSUI == null || mainDSUI == undefined)
									{
										ShowMessage("错误...", mainPageName + "界面参数错误！", "W");
										return;
									}
									mainRow = mainDs;
									inportDSUI = detailDSUI;
									dataGrid = $("#dtldataGrid");

									console.log("mainDs:%s", JSONToStr(mainDs));
									console.log("mainRow:%s", JSONToStr(mainRow));
									console.log("mainIndex:%s", JSONToStr(mainIndex));

									//按主表索引，填写索引值供明细关联索引字段导入
									if (mainIndex != null && mainIndex != undefined)
									{
										for (var i = 0; i < mainIndex.length; i++)
										{
											var mainUIRow = mainIndex[i];
											var fieldStr = mainUIRow.FIELD;

											var fieldValue = "";

											if (fieldStr == null || fieldStr == undefined || fieldStr == "null")
												fieldStr = "";

											if (fieldStr != "")
											{
												fieldValue = mainRow[fieldStr];
												if (fieldValue == null || fieldValue == undefined || fieldValue == "null")
													fieldValue = "";
												if (indexRowStr == "")
												{
													indexRowStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
												}
												else
												{
													indexRowStr = indexRowStr + ",\"" + fieldStr + "\":\"" + fieldValue + "\"";
												} //End of if (indexRowStr == ""){
											} //End of if (fieldStr != "" && isIndex == "1"){
										} //End of for (var i = 0; i < mainIndex.length; i++){
									} //End of if (mainIndex != null && mainIndex != undefined){

									if (indexRowStr != "")
										indexRowStr = "{" + indexRowStr + "}";
									console.log("currnet indexRowStr:%s", JSONToStr(indexRowStr));
								} //End of if (mainDs == null || mainDs == undefined || mainDs.length < 1){
							}
							else
							{
								//如果是多表中的主表数据导入，则只需要确定主表的界面参数是否正确
								if (mainDSUI == null || mainDSUI == undefined)
								{
									ShowMessage("错误...", pageName + "界面参数错误！", "W");
									return;
								}
								inportDSUI = mainDSUI;
								dataGrid = $("#mdataGrid");
							} //End of if (pageNo == "1"){
						}
						else
						{
							//如果是单表数据导入
							inportDSUI = window.dsUIAll.DSUI;

							if (inportDSUI == null || inportDSUI == undefined)
							{
								ShowMessage("错误...", "界面参数错误！", "W");
								return;
							}
							else
							{
								pageName = inportDSUI[0].PAGE_NAME;

								if (pageName == null || pageName == undefined || pageName == "" || pageName == "null")
								{
									pageName = "列表数据";
								}

								dataGrid = $("#dataGrid");
							}
						} //End of if (BussType == "M"){

						//读取功能名称，用于数据导入传入参数
						var inportDSUIFirstRow = inportDSUI[0];
						if (inportDSUIFirstRow != null && inportDSUIFirstRow != undefined)
						{
							funName = inportDSUIFirstRow.FUN;
						}
						if (funName == null || funName == undefined || funName == "null" || funName == "")
						{
							ShowMessage("错误...", "界面功能名称参数获取失败！", "W");
							return;
						}

						console.log("funName:%s", funName);

						var inportDesc = pageName + "导入";

						var objWidth = 500;
						var objHeight = 450;

						var objHtml = "<OBJECT ID='" + className + "' STYLE='WIDTH:" + objWidth + "px;HEIGHT:" + objHeight + "px'  CLASSID='CLSID:" + classID + "'></OBJECT>";

						inportObjHtml = inportObjHtml + "<div  id='inportPanel'  class='easyui-layout' data-options='fit:true' style='padding:0px; height:inherit; width:100%; border:0px;'>";
						inportObjHtml = inportObjHtml + "<div data-options=\"region:'center',split:true,border:false\" style='border:0px; padding:0px; overflow-x: hidden; overflow-y: hidden;'>";
						inportObjHtml = inportObjHtml + objHtml + "</div></div>";

						var winWidth = 540;
						var winHeight = 500;

						var $win;
						$win = $('#editWindow').window(
							{
								title : inportDesc,
								width : winWidth,
								height : winHeight,
								top : ($(window).height() - winHeight) * 0.5,
								left : ($(window).width() - winWidth) * 0.5,
								shadow : true,
								modal : true,
								iconCls : 'icon-file',
								closed : true,
								minimizable : false,
								maximizable : false,
								collapsible : false,
								onClose : function ()
								{
									window.focusGrid = "";
								}
							}
							); //End of $win = $('#editWindow').window({

						var inportGridDs = dataGrid.datagrid("getRows");
						if (BussType == "M" && pageNo == "1")
						{
							//如果是多表，且导入的数据是明细数据，则要确定明细数据原来是否有数据，如果有数据则需要提示是否覆盖
							if (inportGridDs.length > 0)
							{
								var sureMess = "【" + pageName + "列表】已有数据，如果执行导入数据，当前数据将删除，确定导入新数据吗？[确定]导入，[取消]不导入";
								$.messager.confirm("提示", sureMess, function (r)
								{
									if (r)
									{
										inportActiveExcute(BussType, className, funName, pageNo, pageName,
											$win, buttonHtml, inportObjHtml, indexRowStr, inportDSUI);
									}
								}
								); //End of $.messager.confirm("提示", sureMess, function (r) {
							}
							else
							{
								//如果是多表中的主表，则直接导入数据
								inportActiveExcute(BussType, className, funName, pageNo, pageName,
									$win, buttonHtml, inportObjHtml, indexRowStr, inportDSUI);
							} //End of if (inportGridDs.length > 0){
						}
						else
						{
							//如果是单表，则直接导入数据
							inportActiveExcute(BussType, className, funName, pageNo, pageName,
								$win, buttonHtml, inportObjHtml, indexRowStr, inportDSUI);
						} //End of if (BussType == "M" && pageNo == "1"){
					}
					if (newAddType == "GRID")
					{
						//如果是业务表导入
						var pageNo = newAddObj.PAGE_NO;
						var whereStr = newAddObj.WHERE_STR;
						var orderStr = newAddObj.ORDER_STR;
						var newAddArry = newAddObj.NEW_ADD;

						if ((pageNo != null && pageNo != undefined) &&
							(newAddArry != null && newAddArry != undefined))
						{
							if (newAddArry.length > 0)
							{
								var newaddModule = "";
								var newaddFun = "";
								var newaddTable = "";
								var pageName = "";
								for (var i = 0; i < newAddArry.length; i++)
								{
									var temPageNo = newAddArry[i].PAGE_NO;

									if (temPageNo == pageNo)
									{
										newaddModule = newAddArry[i].MODULE;
										newaddFun = newAddArry[i].FUN;
										newaddTable = newAddArry[i].TABLE_NAME;
										pageName = newAddArry[i].NEW_ADD_DESC;
									} //End of if (temPageNo == pageNo)
								} //End of for (var i = 0; i < newAddArry.length; i++)

								if (((newaddModule != null && newaddModule != undefined) && (newaddModule != "" && newaddModule != "null")) &&
									((newaddFun != null && newaddFun != undefined) && (newaddFun != "" && newaddFun != "null")))
								{
									if ((newaddTable != null && newaddTable != undefined) && (newaddTable != "" && newaddTable != "null"))
									{
										var params =
										{
											getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_NEW_ADD\",PARAMETER:\"\",WHERE:\"MODULE='" 
												             + newaddModule
											                 + "' AND FUN='" 
											                 + newaddFun
											                 + "' AND TABLE_NAME='"
											                 + newaddTable
											                 + "' ORDER BY SEQ_NO\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"新增窗体配置\",IS_GRID:\"2\","
		                                                     + "USER_ID:\"" 
		                                                     + localjsonObj.username 
		                                                     + "\",VERIFY_NO:\"" 
		                                                     + localjsonObj.verifyno 
		                                                     + "\"}",
											errorMessage : ""
										};
										$.ajax(
										{
											url : ip+"getdata",
											method : "POST",
											data : params,
											datatype : "json",
											success : function (data)
											{
												var newAddObj = JSON.parse(data); //使用这个方法解析json

												if (window.inportNewUI == null)
												{
													window.inportNewUI = JSON.parse(data);
												}

												//alert(JSONToStr(funPower));
												if ((newAddObj != null && newAddObj != undefined) && newAddObj.length > 0)
												{
													var queryHtml = "<table css='normal_table'><tr style='height:20px;'>";
													var tableHtml = "<table id='inpordGrid'  class='easyui-datagrid'  style='width:100%; height:1px; ' data-options='"
														 + "rownumbers:true,"
														 + "singleSelect:true,"
														 + "autoRowHeight:false,"
														 + "pagination:true,"
														 + "remoteSort:false,"
														 + "multiSort:true,"
														 + "pageSize1:10'><thead><tr><th data-options=\"field:'ck',checkbox:true\"></th>";

													var queryTimes = 0;
													var inportDesc = "";
													//通过NEW_ADD配置参数构建导入窗体查询及列表区域
													for (var i = 0; i < newAddObj.length; i++)
													{
														//只允许两个字段查询配置
														var newaddRecord = newAddObj[i];

														var fieldStr = newaddRecord.FIELD;
														var fieldDesc = newaddRecord.FIELD_DESC;
														var fieldWidth = newaddRecord.WIDTH;
														var fieldVisible = newaddRecord.VISIBLE;
														var fieldQuery = newaddRecord.QUERYTYPE;
														var fieldType = newaddRecord.FIELD_TYPE;
														if (inportDesc == null || inportDesc == undefined || inportDesc == "")
														{
															inportDesc = newaddRecord.NEW_ADD_DESC;
														}

														if (fieldWidth == null && fieldWidth == undefined)
															fieldWidth = "80";

														//构造查询区域
														if (queryTimes < 2)
														{
															if (fieldQuery == "1")
															{
																queryHtml = queryHtml + "<td style='width:90px;'>" + fieldDesc + "</td>";
																queryHtml = queryHtml + "<td style='width:300px;'><div style='width:280px;'>";
																if (fieldType.indexOf("DATE") >= 0)
																{
																	queryHtml = queryHtml + "<input id='fr_" + fieldStr + "' class='easyui-datebox'  style='width:120px;height:20px;'></input>";
																	queryHtml = queryHtml + "&nbsp;-&nbsp;";
																	queryHtml = queryHtml + "<input id='to_" + fieldStr + "' class='easyui-datebox' style='width:120px;height:20px;'></input>";
																}
																else
																{
																	queryHtml = queryHtml + "<input id='fr_" + fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
																	queryHtml = queryHtml + "&nbsp;-&nbsp;";
																	queryHtml = queryHtml + "<input id='to_" + fieldStr + "' class='easyui-textbox' style='width:120px;height:20px;'></input>";
																}
																queryHtml = queryHtml + "</div></td>";

																queryTimes = queryTimes + 1;
															} //End of if (fieldQuery == "1"){
														} //End of if (queryTimes < 2){

														//构建列表区
														if (fieldVisible == "1")
														{
															tableHtml = tableHtml + "<th data-options=\"field:'" + fieldStr + "',width:" + fieldWidth + "\">" + fieldDesc + "</th>";
														} //End of if (fieldVisible == "1"){
													} //End of for (var i = 0; i < newAddObj.length; i++){

													queryHtml = queryHtml + "</tr></table>";
													tableHtml = tableHtml + "</tr></thead></table>";

													inportObjHtml = inportObjHtml + "<div  id='inportPanel'  class='easyui-layout' data-options='fit:true' style='padding:0px; height:inherit; width:100%; border:0px;'>";

													if (queryTimes != 0)
													{
														buttonHtml = "<a id='btNewQuery' href='#' class='easyui-linkbutton' data-options=\"plain:true,iconCls:'icon-search'\" >查询</a>"
															 + "<a id='btNewQueryClear' href='#' class='easyui-linkbutton' data-options=\"plain:true,iconCls:'icon-search_clear'\" >清空查询</a>"
															 + subHtml
															 + buttonHtml;

														inportObjHtml = inportObjHtml + "<div data-options=\"region:'north', split:true, border:false, collapsible:true,\" style='height:35px; border:1px; overflow-x: hidden; overflow-y: hidden;'>";
														inportObjHtml = inportObjHtml + queryHtml + "</div>";
													} //End of if (queryTimes != 0){

													inportObjHtml = inportObjHtml + "<div data-options=\"region:'center',split:true,border:false\" style='border:0px; padding:0px; overflow-x: hidden; overflow-y: hidden;'>";
													inportObjHtml = inportObjHtml + tableHtml + "</div></div>";
												} //End of if ((newAddObj != null && newAddObj != undefined) && newAddObj.length > 0){

												//刷新已加载窗体
												//bodyRefresh($('#editPanel'));
												//bodyRefresh($('#edit_tool_menuPanel'));

												if (inportDesc == null || inportDesc == undefined ||
													inportDesc == "" || inportDesc == "null")
												{
													inportDesc = "数据导入...";
												}

												var winWidth = 800;
												var winHeight = 300;
												var $win;
												$win = $('#editWindow').window(
													{
														title : inportDesc,
														width : winWidth,
														height : winHeight,
														top : ($(window).height() - winHeight) * 0.5,
														left : ($(window).width() - winWidth) * 0.5,
														shadow : true,
														modal : true,
														iconCls : 'icon-file',
														closed : true,
														minimizable : false,
														maximizable : false,
														collapsible : false,
														onClose : function ()
														{
															window.focusGrid = "";
														}
													}
													); //End of $win = $('#editWindow').window({

												$(document).ready(function ()
												{
													$("#editPanel").empty();
													$('#edit_tool_menuPanel').empty();

													//按钮区域加入到页面
													console.log("buttonHtml:%s", buttonHtml);
													if (buttonHtml != "")
													{
														$('#edit_tool_menuPanel').append(buttonHtml);
													}

													//查询及列表区域加入到页面
													console.log("inportObjHtml:%s", inportObjHtml);
													if (inportObjHtml != "")
													{
														$('#editPanel').append(inportObjHtml);
													}

													//$("#editPanel").empty();
													//$('#edit_tool_menuPanel').empty();
													//构建导入窗体按钮事件
													$('#btEditSave').bind('click', function ()
													{
														//确定按钮点击事件
														console.log("BussType:%s", BussType);
														inportExcute(BussType);
													}
													);

													if (queryTimes != 0)
													{
														//查询按钮点击事件
														$('#btNewQuery').bind('click', function ()
														{
															console.log("pageName:%s", pageName);
															console.log("whereStr:%s", whereStr);

															inportExcuteQuery(window.inportNewUI, pageName, whereStr, orderStr);
														}
														);
														//清除查询按钮点击事件
														$('#btNewQueryClear').bind('click', function ()
														{
															QueryClear("I");
														}
														);
													}
												}
												); //End of $(document).ready(function () {

												$win.window('open');

												bodyRefresh($('#editPanel'));
												bodyRefresh($('#edit_tool_menuPanel'));

												if ($("#inpordGrid") != null && $("#inpordGrid") != undefined)
												{
													console.log("inportGrid resize");
													console.log($("#inportPanel").layout("panel", "center").height());
													console.log("inportGrid begin resize");
													$("#inpordGrid").datagrid('resize',
													{
														height : $("#inportPanel").layout("panel", "center").height()
													}
													);
													console.log("inportGrid resize ok");
												}
											},
											error : function (errorMessage)
											{
												ShowMessage("错误...", funnameStr + "数据导入界面加载失败！", "E");
											}
										}
										); //End of $.ajax({
									} //End of if ((newaddTable != null && newaddTable != undefined) && (newaddTable != "" && newaddTable != "null"))
								} //End of if (((newaddModule != null && newaddModule != undefined) && (newaddModule != "" && newaddModule != "null"))
							} //End of if (newAddArry.length > 0)
						} //End of if ((pageNo != null && pageNo != undefined) &&
					}
					else
					{
						//如果是统计截存

						console.log("Anasys enter!");

						var panelTitle = "";
						//行间隔调整值
						var rowHeightSub = 50;
						//每行字段编辑框数量
						var colCount = 3;

						//有多少个字段需要查询
						var targetLength = 0;
						//取行数
						var targetCount = 0;
						//取剩余字段
						var targetRemain = 0;
						//行高
						var rowHeight = 20;
						//字段描述宽度
						var descWidth = 90;
						//字段宽度
						var fieldWidth = 150;
						//窗体宽度
						var windowWidth = colCount * (descWidth + fieldWidth);

						var DSUI = window.dsUIAll.DSUI;
						for (var i = 0; i < DSUI.length; i++)
						{
							var pageNo = DSUI[i].PAGE_NO;

							if (pageNo == "0")
							{
								panelTitle = DSUI[i].PAGE_NAME + "生成";
								break;
							}
						}

						if (panelTitle == "")
							panelTitle = "单据生产";

						console.log("newAddObj：%s", JSONToStr(newAddObj));

						var addModule = newAddObj.MODULE;
						var addFun = newAddObj.FUN;
						var addProc = newAddObj.PROC_NAME;
						var addWhere = "MODULE='" + addModule + "' AND FUN='" + addFun + "'";

						console.log("addModule：%s", addModule);

						var params =
						{
							getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_NEW_ADD\",PARAMETER:\"\",WHERE:\""
							                + addWhere
							                + "\",ORDER:\"ORDER BY SEQ_NO\",PAGE:\"\",TYPEDESC:\"截存新增配置\",IS_GRID:\"2\"}",
							errorMessage : ""
						};
						$.ajax(
						{
							url :ip+"getdata",
							method : "POST",
							data : params,
							datatype : "json",
							async : false,
							success : function (data)
							{
								var addDs = JSON.parse(data); //使用这个方法解析json

								//alert(JSONToStr(funPower));
								if ((addDs != null && addDs != undefined) && addDs.length > 0)
								{
									//有多少个字段需要查询
									targetLength = addDs.length;
									//取行数
									targetCount = parseInt(targetLength / colCount);
									//取剩余字段
									targetRemain = targetLength % colCount;
									//取查询区行高
									if (targetRemain > 0)
									{
										subHeight = (targetCount + 1) * rowHeight + rowHeightSub;
									}
									else
									{
										subHeight = targetCount * rowHeight + rowHeightSub;
									}

									console.log("targetLength：%d", targetLength);

									var htmlStr = "<table class='normal_table'>";
									var btHtmlStr = "<a id=\"btInportSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-ok'\" >确定</a>"
										 + "<span id=\"inportdeleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
										 + "<a id=\"btInportClose\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-cancel'\" onclick=\"$('#editWindow').window('close')\">退出</a>";

									var doColCount = 0;

									for (var i = 0; i < addDs.length; i++)
									{
										var addRecord = addDs[i];

										if (doColCount == colCount)
										{
											doColCount = 0;
											htmlStr = htmlStr + "<tr style='height:" + rowHeight.toString() + "px;'>";
										}

										if (addRecord != null && addRecord != undefined)
										{
											var fieldStr = addRecord.FIELD;
											var fieldDesc = addRecord.FIELD_DESC;
											var f_table_field = addRecord.F_TABLE_FIELD;
											var fieldType = addRecord.FIELD_TYPE;
											var isnull = addRecord.ISNULL;
											var defaultValue = addRecord.DEFAULT_VALUE;

											console.log("fieldStr：%s", fieldStr);
											console.log("fieldDesc：%s", fieldDesc);

											if (isnull != "1")
											{
												htmlStr = htmlStr + "<td style='width:" + descWidth.toString() + "px;color:#FF0000;'>*" + fieldDesc + "</td>";
												htmlStr = htmlStr + "<td style='width:" + fieldWidth.toString() + "px;'><div style='width:" + (fieldWidth - 20).toString() + "px;'>";

												if (fieldType.indexOf("DATE") >= 0)
												{
													//如果未设置默认值
													if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
													else
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
												}
												else
												{
													//如果未设置默认值
													if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
													{
														//查看当前列是否为下拉列表框
														var listDataSet = null;
														var valueField = "";
														var dispField = "";

														if ((f_table_field != null && f_table_field != undefined) && f_table_field != "")
														{
															var f_rel_params =
															{
																getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_F_TABLE_FIELD\",PARAMETER:\"\",WHERE:\"F_TABLE_FIELD='"
																                + f_table_field
																                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框配置\",IS_GRID:\"2\","
		                                                                        + "USER_ID:\"" 
		                                                                        + localjsonObj.username 
		                                                                        + "\",VERIFY_NO:\"" 
		                                                                        + localjsonObj.verifyno 
		                                                                        + "\"}",
																errorMessage : ""
															};
															$.ajax(
															{
																url :ip+"getdata",
																method : "POST",
																data : f_rel_params,
																datatype : "json",
																async : false,
																success : function (data)
																{
																	var listDs = JSON.parse(data); //使用这个方法解析json

																	if ((listDs != null && listDs != undefined) && listDs.length > 0)
																	{
																		var listRecord = listDs[0];
																		valueField = listRecord.KEY_FIELD;
																		dispField = listRecord.DISP_FIELD;

																		var f_data_params =
																		{
																			getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\"" 
																				             + f_table_field 
																				             + "\",PARAMETER:\"\",WHERE:\"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框数据\",IS_GRID:\"2\","
		                                                                                     + "USER_ID:\"" 
		                                                                                     + localjsonObj.username 
		                                                                                     + "\",VERIFY_NO:\"" 
		                                                                                     + localjsonObj.verifyno 
		                                                                                     + "\"}",
																			errorMessage : ""
																		};
																		$.ajax(
																		{
																			url :ip+"getdata",
																			method : "POST",
																			data : f_data_params,
																			datatype : "json",
																			async : false,
																			success : function (data)
																			{
																				listDataSet = JSON.parse(data);
																			},
																			error : function (errorMessage)
																			{
																				ShowMessage("错误...", "取下拉列表框数据失败！", "E");
																			}
																		}
																		);
																	}
																},
																error : function (errorMessage)
																{
																	ShowMessage("错误...", "取下拉列表框配置失败！", "E");
																}
															}
															);
														}

														//如果未配置下拉列表框，则显示普通编辑框
														if (listDataSet == null || listDataSet == undefined)
														{
															htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
														}
														else
														{
															//如果配置了下拉列表框，则显示下拉列表框
															//var comboOptions = fieldEditor.options;
															var dataOption = "data-options='      valueField:\"" + valueField
															 +"\",textField:\""+dispField
															 +"\",data:"+JSONToStr(listDataSet)
								 							 +",method:\"get\",onSelect:ChangeCombobox'";//001
															
															console.log("dataOption:",dataOption);

															Combobox_fieldStr='#'+fieldStr;
															htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
														}
													}
													else
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
												}
											}
											else
											{
												//如果允许为空
												htmlStr = htmlStr + "<td style='width:" + descWidth.toString() + "px;'>" + fieldDesc + "</td>";
												htmlStr = htmlStr + "<td style='width:" + fieldWidth.toString() + "px;'><div style='width:" + (fieldWidth - 20).toString() + "px;'>";
												if (fieldType.indexOf("DATE") >= 0)
												{
													//如果未设置默认值
													if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
													else
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
												}
												else
												{
													//如果未设置默认值
													if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
													{
														//查看当前列是否为下拉列表框
														var listDataSet = null;
														var valueField = "";
														var dispField = "";

														if ((f_table_field != null && f_table_field != undefined) && f_table_field != "")
														{
															var f_rel_params =
															{
																getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_F_TABLE_FIELD\",PARAMETER:\"\",WHERE:\"F_TABLE_FIELD='"
																                + f_table_field
																                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框配置\",IS_GRID:\"2\","
		                                                                        + "USER_ID:\"" 
		                                                                        + localjsonObj.username 
		                                                                        + "\",VERIFY_NO:\"" 
		                                                                        + localjsonObj.verifyno 
		                                                                        + "\"}",
																errorMessage : ""
															};
															$.ajax(
															{
																url :ip+"getdata",
																method : "POST",
																data : f_rel_params,
																datatype : "json",
																async : false,
																success : function (data)
																{
																	var listDs = JSON.parse(data); //使用这个方法解析json

																	if ((listDs != null && listDs != undefined) && listDs.length > 0)
																	{
																		var listRecord = listDs[0];
																		valueField = listRecord.KEY_FIELD;
																		dispField = listRecord.DISP_FIELD;

																		var f_data_params =
																		{
																			getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\"" 
																				             + f_table_field 
																				             + "\",PARAMETER:\"\",WHERE:\"\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框数据\",IS_GRID:\"2\","
		                                                                                     + "USER_ID:\"" 
		                                                                                     + localjsonObj.username 
		                                                                                     + "\",VERIFY_NO:\"" 
		                                                                                     + localjsonObj.verifyno 
		                                                                                     + "\"}",
																			errorMessage : ""
																		};
																		$.ajax(
																		{
																			url :ip+"getdata",
																			method : "POST",
																			data : f_data_params,
																			datatype : "json",
																			async : false,
																			success : function (data)
																			{
																				listDataSet = JSON.parse(data);
																			},
																			error : function (errorMessage)
																			{
																				ShowMessage("错误...", "取下拉列表框数据失败！", "E");
																			}
																		}
																		);
																	}
																},
																error : function (errorMessage)
																{
																	ShowMessage("错误...", "取下拉列表框配置失败！", "E");
																}
															}
															);
														}

														//如果未配置下拉列表框，则显示普通编辑框
														if (listDataSet == null || listDataSet == undefined)
														{
															htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
															console,log("3329");
														}
														else
														{
															//如果配置了下拉列表框，则显示下拉列表框
															//var comboOptions = fieldEditor.options;
															var dataOption = "data-options='valueField:\"" + valueField
																 + "\",textField:\"" + dispField
																 + "\",data:" + JSONToStr(listDataSet)
																 + ",method:\"get\"'";

															htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
															console.log("listDataSet:",listDataSet);
															
															var cidArray=eval(listDataSet);
															
															console.log("cidArray:",cidArray);
															
															if ((cidArray != null && cidArray != undefined)&&(cidArray.F_TABLE_FIELD != null && cidArray.F_TABLE_FIELD != undefined))
															{
																for (var i = 0; i < cidArray.length; i++)
																{
																	var  cidRecord = cidArray[i];
																	
																	 cid_proCode=cidRecord.PROJECT_CODE;//001
																	
																	console.log("0802",cidRecord,cid_proCode);
																
																}
															}

														}
													}
													else
													{
														htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
													}
												} 
											} 

											htmlStr = htmlStr + "</div></td>";

											doColCount++;
										} 
									} 

									htmlStr = htmlStr + "</tr></table>";

									console.log("htmlStr：%s", htmlStr);

									var toolPanelHeight = $('#edit_operPanel').layout("panel", "north").height() + 15;

									var $win;
									$win = $('#editWindow').window(
										{
											title : panelTitle,
											width : windowWidth,
											height : subHeight + toolPanelHeight,
											top : ($(window).height() - subHeight - toolPanelHeight) * 0.5,
											left : ($(window).width() - windowWidth) * 0.5,
											shadow : true,
											modal : true,
											iconCls : 'icon-file',
											closed : true,
											minimizable : false,
											maximizable : false,
											collapsible : false,
											onClose : function ()
											{
												window.focusGrid = "";
											}
										}
										);

									$(document).ready(function ()
									{
										$("#editPanel").empty();
										$('#edit_tool_menuPanel').empty();

										$('#editPanel').append(htmlStr);
										$('#edit_tool_menuPanel').append(btHtmlStr);

										for (var i = 0; i < addDs.length; i++)
										{
											var addRecord = addDs[i];
											if (addRecord != null && addRecord != undefined)
											{
												var fieldStr = addRecord.FIELD;
										
												var defaultValue = addRecord.DEFAULT_VALUE;

												if (fieldStr != null && fieldStr != undefined)
												{
													if ((defaultValue != null && defaultValue != undefined) && (defaultValue != "" && defaultValue != "null"))
													{
														var fieldObjectName = "#" + fieldStr;
														var fieldValue = getDefaultValue(defaultValue);

														if ($(fieldObjectName) != undefined && $(fieldObjectName) != null)
														{
															$(fieldObjectName).val(fieldValue);
														}
													}
												}
											}
										} 

										console.log("WINDOW READY!");

										/*配置当前功能按钮事件
										 * 时间：2016-03-01
										 * 作者：李福明
										 */
										//新增按钮点击事件
										$('#btInportSave').bind('click', function ()
										{
											//ShowMessage("错误...", "OK！", "E");
											var canSave = true;
											var fieldsStr = "";
											//进行数据有效性判断
											for (var i = 0; i < addDs.length; i++)
											{
												var addRecord = addDs[i];
												if (addRecord != null && addRecord != undefined)
												{
													var fieldStr = addRecord.FIELD;
													var fieldDesc = addRecord.FIELD_DESC;
													var fieldType = addRecord.FIELD_TYPE;
													var defaultValue = addRecord.DEFAULT_VALUE;
													var isNull = addRecord.ISNULL;

													var fieldValue = "";

													if (fieldStr != null && fieldStr != undefined)
													{
														var fieldObjectName = "#" + fieldStr;
														var fieldObject = $(fieldObjectName);

														if (fieldObject != undefined && fieldObject != null)
														{
															var fieldObjectClassName = fieldObject.attr("class");
															if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
															{
																fieldValue = fieldObject.combobox('getValue');
															}
															else if (fieldObjectClassName.indexOf("easyui-datebox") >= 0)
															{
																fieldValue = fieldObject.datebox('getValue');
															}
															else
															{
																fieldValue = fieldObject.textbox('getValue');
															}

															if (isNull != "1")
															{
																if (fieldValue == null || fieldValue == undefined || fieldValue == "")
																{
																	canSave = false;
																	ShowMessage("错误...", fieldDesc + "不可为空！", "E");
																	break;
																}
															}

															if (fieldType.indexOf("DATETIME") >= 0)
															{
																if (isDateTime(fieldValue) == false)
																{
																	canSave = false;
																	ShowMessage("错误...", fieldDesc + "不是有效的日期时间数据！", "E");
																	break;
																}
															}
															else if (fieldType.indexOf("DATE") >= 0)
															{
																if (isDate(fieldValue) == false)
																{
																	canSave = false;
																	ShowMessage("错误...", fieldDesc + "不是有效的日期数据！", "E");
																	break;
																}
															}
															else if (fieldType.indexOf("INT") >= 0)
															{
																if (isInt(fieldValue) == false)
																{
																	canSave = false;
																	ShowMessage("错误...", fieldDesc + "不是有效的整数数据！", "E");
																	break;
																}
															}
															else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0)
															{
																if (isFloat(fieldValue) == false)
																{
																	canSave = false;
																	ShowMessage("错误...", fieldDesc + "不是有效的数值数据！", "E");
																	break;
																}
															} 

															if (fieldsStr == "")
															{
																fieldsStr = "'" + fieldValue + "'";
															}
															else
															{
																fieldsStr = fieldsStr + ",'" + fieldValue + "'";
															}
														} 
													} 
												} 
											} 

											//提交保存数据
											if (canSave)
											{
												console.log("fieldsStr : %s",fieldsStr);
												var updateJSONArrayStr = "{TABLE:\"" + addProc + "\", TYPE:\"PROCEDURE\", FIELDS:\"" + fieldsStr + "\"}";
												var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + panelTitle + "\",UPDATELIST:[" + updateJSONArrayStr + "]}";
												console.log("updateObject : %s",updateObject);
												var params =
												{
													getObject : updateObject,
													errorMessage : ""
												};
												$.ajax(
												{
													url :ip+"updatedata",
													method : "POST",
													data : params,
													datatype : "json",
													success : function (data)
													{
														ShowMessage("提示...", panelTitle + "保存成功！", "");
													},
													error : function (errorMessage)
													{
														ShowMessage("错误...", panelTitle + '保存失败！' + JSONToStr(errorMessage), "E");
													}
												}
												);
											}
										}
										);
									}
									);

									$win.window('open');

									bodyRefresh($('#editPanel'));
									bodyRefresh($('#edit_tool_menuPanel'));
								}
							},
							error : function (errorMessage)
							{
								ShowMessage("错误...", "截存新增配置加载失败！", "E");
							}
						}
						);
					}
				} 
			} 
		} 
		
		//如果是单表业务
	}
	catch (e)
	{
		ShowMessage("错误...", "点击按钮事件错误！" + e.description, "E");
	}
}

/*
 * 功能：生成下拉框并实现其联动
 * 参数：窗体名称
 * 作者：易韦达
 * 时间：2017-05-24
 * 003
 */
function ChangeCombobox(DSUI){
	console.log('11111----0802');
	pid=$(Combobox_fieldStr).combobox('getValue');
	
	cid_proCode=pid;
	
	/******
	 *   此处数据请求不可写成定值，而应该通过DSUI的配置参数取出OBJECT待查询对象
	 *   在框架里面，除了USER_ID和VERIFY_NO为定值外，其它所有的值不可出现定值
	 */
	var f_data_params =
	{
		getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\"F_TB_SUPPLIER\",PARAMETER:\"\",WHERE:\"PROJECT_CODE='"
			            + cid_proCode
			            + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"下拉列表框数据\",IS_GRID:\"2\","
		                + "USER_ID:\"" + localjsonObj.username 
		                + "\",VERIFY_NO:\"" 
		                + localjsonObj.verifyno 
		                + "\"}",
		errorMessage : ""
	};
	$.ajax(
	{
		url :ip+"getdata",
		method : "POST",
		data : f_data_params,
		datatype : "json",
		async : false,
		success : function (data)
		{
			var changelistDataSet = JSON.parse(data);
			
			console.log("0802:",changelistDataSet);
			
			$('#IN_DEPT_CODE').attr("data", changelistDataSet);
			
			$("#IN_DEPT_CODE").combobox({
								valueField: 'PROJECT_CODE',    
								textField: 'SUPPLIER', 
								data:changelistDataSet,  
								width:120,
								height:20
				
			});
		},
		error : function (errorMessage)
		{
			ShowMessage("错误...", "取下拉列表框数据失败！", "E");
		}
	}
	);	
}

/*
 * 功能：以窗体模式新增数据
 * 参数：窗体名称
 * 作者：李福明
 * 时间：2015-07-14
 */
function appendByWindow(gridName)
{
	gridName = $.trim(gridName);

	window.focusGrid = gridName;

	$("#" + window.focusGrid).datagrid("unselectAll");
	window.rowIndex[gridName] = -1;

	var mainRow = null;

	if (gridName == "dataGrid")
	{
		OpenEditWindow(window.dsUIAll, null, null);
	}
	else
	{
		try
		{
			var DSUIS = window.dsUIAll.DSUI;
			var DSUI = null;
			if (gridName == "mdataGrid")
			{
				for (var i = 0; i < DSUIS.length; i++)
				{
					var suDSUI = DSUIS[i];
					var pageNo = suDSUI.PAGE_NO;

					if (pageNo == "0")
					{
						DSUI = suDSUI;
						break;
					}
				}
			}
			else
			{
				if (gridName == "dtldataGrid")
				{
					var mastName = "";
					var mainGridRows = $("#mdataGrid").datagrid('getSelections');

					for (var i = 0; i < DSUIS.length; i++)
					{
						var suDSUI = DSUIS[i];
						var pageNo = suDSUI.PAGE_NO;

						if (pageNo == "1")
						{
							DSUI = suDSUI;
						}
						else
						{
							if (pageNo != undefined && pageNo == "0")
							{
								mastName = suDSUI.PAGE_NAME;
							};
						}
					}

					if (mainGridRows == undefined || mainGridRows == null || mainGridRows.length <= 0)
					{
						ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
						return;
					}
					else
					{
						mainRow = mainGridRows[0];
					}
				}
			}

			OpenEditWindow(DSUI, null, mainRow);
		}
		catch (e)
		{
			ShowMessage("错误...", "取界面参数错误！" + e.description, "E");
		}
	}
}

/*
 * 功能：对已生成的下拉列表框定义下拉事件，用来实现下拉列表框之间的联动
 * 参数：当前页面的配置
 * 作者：易韦达
 * 时间：2017-10——23
 */
function ConstructComboBox(DSUI)
{
	var  field_Str_Arr=[];
	var  rel_Field_Arr=[];
	var  f_t_Field_Arr=[];
	var  field_Desc_Arr=[];
	
	if (DSUI != null && DSUI != undefined)
	{
		for (var i = 0; i < DSUI.length; i++)
		{
			var uiRecord = DSUI[i];
			console.log("DSUI.length:",DSUI.length);

			//两层循环拿到REL_FIELD
			if ((uiRecord.FIELD != null && uiRecord.FIELD != undefined) &&
				(uiRecord.F_TABLE_FIELD != null && uiRecord.F_TABLE_FIELD != undefined))
			{
				if ((uiRecord.REL_FIELD != null && uiRecord.REL_FIELD != undefined) && uiRecord.REL_FIELD != "")
				{
					var field_Str = uiRecord.FIELD;
					var rel_Field = uiRecord.REL_FIELD;//联动字段
					var f_t_Field = uiRecord.F_TABLE_FIELD;
					var field_Desc = uiRecord.FIELD_DESC + "下拉列表框";
					
					console.log("i:",i);
					console.log("=====================");
					console.log("field_Str : %s",field_Str);			
					
					var field_Str_NewArr=field_Str_Arr.push(field_Str);
					var rel_Field_NewArr=rel_Field_Arr.push(rel_Field);
					var f_t_Field_NewArr=f_t_Field_Arr.push(f_t_Field);
					var field_Desc_NewArr=field_Desc_Arr.push(field_Desc); 
					
					console.log("field_Str_Arr:",field_Str_Arr,"rel_Field_Arr:",rel_Field_Arr,"f_t_Field_Arr",f_t_Field_Arr,"field_Desc_Arr",field_Desc_Arr);				
				}//end of if ((uiRecord.REL_FIELD != null && uiRecord.REL_FIELD != undefined) && uiRecord.REL_FIELD != "")
			}//end of if ((uiRecord.FIELD != null && uiRecord.FIELD != undefined) &&(uiRecord.F_TABLE_FIELD != null && uiRecord.F_TABLE_FIELD != undefined))
		}//end of for (var i = 0; i < DSUI.length; i++)
	}//end of if (DSUI != null && DSUI != undefined)	
	var rel_Field_ArrSplit1=rel_Field_Arr[0].split("|");//二级联动条件
	var rel_Field_ArrSplit2=rel_Field_Arr[1].split("|");//三级联动条件
	
	//console.log("rel_Field_ArrSplit1:",rel_Field_ArrSplit1);//Array [ "ROOM_CODE", "GROUP_CODE='[GROUP_CODE]'" ]
	//console.log("rel_Field_ArrSplit2:",rel_Field_ArrSplit2);// Array [ "CONTROL_SET_CODE", "ROOM_CODE='[ROOM_CODE]'"
	if (rel_Field_ArrSplit1 != null && rel_Field_ArrSplit1 != undefined)//如果条件存在
	{
		if (rel_Field_ArrSplit1.length == 2)//将联动条件进行切割处理  [ "ROOM_CODE", "CONTROL_SET_CODE" ] 
		{
			
			field_Str_Arr1 = field_Str_Arr[0].toUpperCase();//字段名   "ROOM_CODE"	//改变了field_Str_Arr
			console.log("field_Str_Arr1:",field_Str_Arr1);
			
			var rfield_Str = rel_Field_ArrSplit1[0];//关联ID值      "ROOM_CODE"
			var condition_Str = rel_Field_ArrSplit1[1];//关联条件   "GROUP_CODE='[GROUP_CODE]'"
			
			console.log("rfield_Str",rfield_Str);//切割完成
				if ((rfield_Str != null && rfield_Str != undefined) && (condition_Str != null && condition_Str != undefined))
			{
				var rfieldStr = new String(rfield_Str);
				rfieldStr = rfieldStr.toString().toUpperCase();//关联字段
				condition_Str = condition_Str.toString().toUpperCase();//关联条件：转换大小写及数据格式

				if (field_Str_Arr1 == rfieldStr)//如果字段值等于关联的ID值   "ROOM_CODE"= "ROOM_CODE"
				{
					var comboxObject_Name = "#" + rfieldStr;		//# ROOM_CODE   ID选择器
					var combox_Object = $(comboxObject_Name);		//封装为jQuery函数

					if ((combox_Object != null && combox_Object != undefined) &&
						combox_Object.attr("class").indexOf("easyui-combobox") >= 0)
					{
						var fieldStr = new String(field_Str_Arr1);
						var relField = new String(rel_Field_Arr);
						var f_tField = new String(f_t_Field_Arr);
						var fieldDesc = new String(field_Desc_Arr);
						var conditionStrOld = new String(condition_Str);// "GROUP_CODE='[GROUP_CODE]'"

						var comboxObjectName = "#" + fieldStr;//# ROOM_CODE   ID选择器
						var comboxObject = $(comboxObjectName); // jQuery.extend(true, {}, combox_Object);

						console.log("comboxObjectName : %s",comboxObjectName);
										
						comboxObject.combobox('textbox').on('focus', function ()//绑定焦点触发事件
								//下拉列框元素的ID值
						{
							//如果有关联到其它字段值（即其它编辑框或下拉列表框）
							var relateTimes = 0;
							var conditionStr = new String(conditionStrOld);//关联条件   "GROUP_CODE='[GROUP_CODE]'"

							console.log("comboxObject:",comboxObject);
							console.log("conditionStr : %s",conditionStr);//关联条件   "GROUP_CODE='[GROUP_CODE]'"
							console.log("comboxObjectName : %s",comboxObjectName);//# ROOM_CODE   ID选择器
							console.log("fieldStr : %s",fieldStr);
							while (true)
							{
								var temField = "";

								if (relateTimes > conditionStr.length)
								{
									break;
								}

								if (conditionStr.indexOf("[") >= 0)//关联条件   "GROUP_CODE='[GROUP_CODE]'"
								{
									temField = conditionStr.substring(conditionStr.indexOf("[") + 1, conditionStr.indexOf("]"));//GROUP_CODE

									console.log("temField:%s", temField);//GROUP_CODE

									if ((temField != null && temField != undefined) && temField != "")
									{
										var temFieldObjectName = "#" + temField;//#GROUP_CODE
										var temFieldObject = $(temFieldObjectName);//#GROUP_CODE封装

										//查找是否有关联字段对象
										if (temFieldObject != null && temFieldObject != undefined)
										{
											var tempFieldValue = "";
											var temFieldClassName = temFieldObject.attr("class");//#GROUP_CODE的class   temFieldClassName: easyui-combobox combobox-f combo-f textbox-f
											
											console.log("temFieldClassName:",temFieldClassName);//temFieldClassName: easyui-combobox combobox-f combo-f textbox-f

											//如果关联字段对象是日期编辑框
											if (temFieldClassName.indexOf("easyui-datebox") >= 0)
											{
												tempFieldValue = temFieldObject.datebox('getValue');
											}
											//如果关联字段对象是下拉列表框    easyui-combobox
											if (temFieldClassName.indexOf("easyui-combobox") >= 0)
											{
												tempFieldValue = temFieldObject.combobox('getValue');
												
												console.log("关联字段对象是下拉列表框：",tempFieldValue,temFieldObject);
											}
											//如果关联字段对象是普通编辑框
											if (temFieldClassName.indexOf("easyui-textbox") >= 0)
											{
												tempFieldValue = temFieldObject.textbox('getValue');
												
												console.log("关联字段对象是普通编辑框：",tempFieldValue);
											}			
											
											//如果取到了值，则替换原下拉列表数据查询条件对应的字段标志为关联字段值，如果未取到值则替换为空字符串
											if (tempFieldValue != null && tempFieldValue != undefined)
											{
												conditionStr = conditionStr.replace("[" + temField + "]", tempFieldValue);
												
												console.log("4208====如果取到了值,则：conditionStr:",conditionStr);//1012
										
											}
											else
											{
												conditionStr = conditionStr.replace("[" + temField + "]", "");
												
												console.log("2017--10--12");
											}
										}
										else
										{
											ShowMessage("错误...", temFieldObjectName + "编辑框对象未找到！", "E");
										}
									}
								}
								else
								{
									break;
								}

								relateTimes++;
							}

							var gparams =
							{
								getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\""
								                 + f_t_Field_Arr[0] + "\",PARAMETER:\"\",WHERE:\""//查询数据表
								                 + conditionStr + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\""
								                 + field_Desc_Arr + "\",IS_GRID:\"2\","
								                 + "USER_ID:\"" 
								                 + localjsonObj.username 
								                 + "\",VERIFY_NO:\"" 
								                 + localjsonObj.verifyno 
								                 + "\"}",
								errorMessage : ""
							};
							$.ajax(
							{
								url :ip+"getdata",
								method : "POST",
								data : gparams,
								datatype : "json",
								success : function (data)
								{
									var comboData = JSON.parse(data); //使用这个方法解析json

									console.log("comboData : %s",data);
									console.log("fieldStr : %s",fieldStr);

									comboxObject.combobox("setText", "");
									comboxObject.combobox("setValue", "");
									comboxObject.combobox("loadData", comboData);
								},
								error : function (errorMessage)
								{
									ShowMessage("错误...", fieldDesc + "数据加载失败！" + JSONToStr(errorMessage), "E");
								}
							}
							);
						}//end of comboxObject.combobox('textbox').bind('focus', function ())
						);//comboxObject.combobox('textbox').bind()
						
						
						/****************焦点触发*******************/
					
					}//if ((combox_Object != null && combox_Object != undefined) &&combox_Object.attr("class").indexOf("easyui-combobox") >= 0)
					else
					{
						ShowMessage("错误...", comboxObjectName + "编辑框对象未找到！", "E");
					}
				}
			}
		}
	}//if (relFieldSplit != null && relFieldSplit != undefined)
	
	//多级联动处理
	if ((rel_Field_ArrSplit2 != null && rel_Field_ArrSplit2 != undefined)&&(rel_Field_ArrSplit1 != null && rel_Field_ArrSplit2 != undefined))//如果条件存在
	{
		if (rel_Field_ArrSplit2.length == 2)//将联动条件进行切割处理  [ "ROOM_CODE", "CONTROL_SET_CODE" ] 
		{
			console.log("field_Str_Arr:",field_Str_Arr,"rel_Field_Arr:",rel_Field_Arr,"f_t_Field_Arr",f_t_Field_Arr,"field_Desc_Arr",field_Desc_Arr);			

			field_Str_Arr = field_Str_Arr[1].toUpperCase();//字段名   "ROOM_CODE"
			console.log("field_Str_Arr[1]:",field_Str_Arr);

			var rfield_Str = rel_Field_ArrSplit2[0];//关联ID值      "ROOM_CODE"
			var condition_Str = rel_Field_ArrSplit2[1];//关联条件   "GROUP_CODE='[GROUP_CODE]'"
			
			console.log("rfield_Str",rfield_Str);//切割完成

			if ((rfield_Str != null && rfield_Str != undefined) && (condition_Str != null && condition_Str != undefined))
			{
				var rfieldStr = new String(rfield_Str);
				rfieldStr = rfieldStr.toString().toUpperCase();//关联字段
				condition_Str = condition_Str.toString().toUpperCase();//关联条件：转换大小写及数据格式

				if (field_Str_Arr == rfieldStr)//如果字段值等于关联的ID值   "ROOM_CODE"= "ROOM_CODE"
				{
					var comboxObject_Name = "#" + rfieldStr;		//# ROOM_CODE   ID选择器
					var combox_Object = $(comboxObject_Name);		//封装为jQuery函数

					if ((combox_Object != null && combox_Object != undefined) &&
						combox_Object.attr("class").indexOf("easyui-combobox") >= 0)
					{
						console.log("field_Str_Arr:",field_Str_Arr, "rel_Field_Arr:",rel_Field_Arr, "f_t_Field_Arr:",f_t_Field_Arr, "field_Desc_Arr:",field_Desc_Arr, "condition_Str:",condition_Str);
						var fieldStr1 = new String(field_Str_Arr);
						var relField1 = new String(rel_Field_Arr);
						var f_tField1 = new String(f_t_Field_Arr);
						var fieldDesc1 = new String(field_Desc_Arr);
						var conditionStrOld1 = new String(condition_Str);// "GROUP_CODE='[GROUP_CODE]'"
						
						console.log("fieldStr:",fieldStr, "relField:",relField, "f_tField:",f_tField, "fieldDesc:",fieldDesc, "conditionStrOld:",conditionStrOld);
						
						var comboxObjectName = "#" + fieldStr1;//# ROOM_CODE   ID选择器
						var comboxObject1 = $(comboxObjectName); // jQuery.extend(true, {}, combox_Object);

						console.log("comboxObjectName : %s",comboxObjectName);
						
						console.log("comboxObject : %s",comboxObject);															
						/*********************************焦点触发事件421302*****************************************/
						
						comboxObject1.combobox('textbox').on('focus', function ()//绑定焦点触发事件
								//下拉列框元素的ID值
						{
							//如果有关联到其它字段值（即其它编辑框或下拉列表框）
							var relateTimes = 0;
							var conditionStr = new String(conditionStrOld1);//关联条件   "GROUP_CODE='[GROUP_CODE]'"

							console.log("comboxObject1:",comboxObject1);
							console.log("conditionStr : %s",conditionStr);//关联条件   "GROUP_CODE='[GROUP_CODE]'"
							console.log("comboxObjectName : %s",comboxObjectName);//# ROOM_CODE   ID选择器
							console.log("field_Str : %s",field_Str);
							console.log("fieldStr1 : %s",fieldStr1);
							while (true)
							{
								var temField = "";

								if (relateTimes > conditionStr.length)
								{
									break;
								}

								if (conditionStr.indexOf("[") >= 0)//关联条件   "GROUP_CODE='[GROUP_CODE]'"
								{
									temField = conditionStr.substring(conditionStr.indexOf("[") + 1, conditionStr.indexOf("]"));//GROUP_CODE

									console.log("temField:%s", temField);//GROUP_CODE

									if ((temField != null && temField != undefined) && temField != "")
									{
										var temFieldObjectName = "#" + temField;//#GROUP_CODE
										var temFieldObject = $(temFieldObjectName);//#GROUP_CODE封装
										
										//查找是否有关联字段对象
										if (temFieldObject != null && temFieldObject != undefined)
										{
											var tempFieldValue = "";
											var temFieldClassName = temFieldObject.attr("class");//#GROUP_CODE的class   temFieldClassName: easyui-combobox combobox-f combo-f textbox-f
											
											console.log("temFieldClassName:",temFieldClassName);//temFieldClassName: easyui-combobox combobox-f combo-f textbox-f

											//如果关联字段对象是日期编辑框
											if (temFieldClassName.indexOf("easyui-datebox") >= 0)
											{
												tempFieldValue = temFieldObject.datebox('getValue');
											}
											//如果关联字段对象是下拉列表框    easyui-combobox
											if (temFieldClassName.indexOf("easyui-combobox") >= 0)
											{
												tempFieldValue = temFieldObject.combobox('getValue');
												
												console.log("关联字段对象是下拉列表框：",tempFieldValue,temFieldObject);
											}
											//如果关联字段对象是普通编辑框
											if (temFieldClassName.indexOf("easyui-textbox") >= 0)
											{
												tempFieldValue = temFieldObject.textbox('getValue');
												
												console.log("关联字段对象是普通编辑框：",tempFieldValue);
											}			
											
											//如果取到了值，则替换原下拉列表数据查询条件对应的字段标志为关联字段值，如果未取到值则替换为空字符串
											if (tempFieldValue != null && tempFieldValue != undefined)
											{
												conditionStr = conditionStr.replace("[" + temField + "]", tempFieldValue);
												
												console.log("4208====如果取到了值,则：conditionStr:",conditionStr);//1012
										
											}
											else
											{
												conditionStr = conditionStr.replace("[" + temField + "]", "");
												
												console.log("2017--10--12");
											}
										}
										else
										{
											ShowMessage("错误...", temFieldObjectName + "编辑框对象未找到！", "E");
										}
									}
								}
								else
								{
									break;
								}

								relateTimes++;
							}
							var gparams =
							{
								getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\""
								                 + f_t_Field_Arr[1] + "\",PARAMETER:\"\",WHERE:\""//查询数据表
								                 + conditionStr + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\""
								                 + field_Desc_Arr + "\",IS_GRID:\"2\","
								                 + "USER_ID:\"" 
								                 + localjsonObj.username 
								                 + "\",VERIFY_NO:\"" 
								                 + localjsonObj.verifyno 
								                 + "\"}",
								errorMessage : ""
							};
							$.ajax(
							{
								url :ip+"getdata",
								method : "POST",
								data : gparams,
								datatype : "json",
								success : function (data)
								{
									var comboData = JSON.parse(data); //使用这个方法解析json

									console.log("comboData : %s",data);
									console.log("fieldStr : %s",fieldStr);

									comboxObject1.combobox("setText", "");
									comboxObject1.combobox("setValue", "");
									comboxObject1.combobox("loadData", comboData);
								},
								error : function (errorMessage)
								{
									ShowMessage("错误...", fieldDesc + "数据加载失败！" + JSONToStr(errorMessage), "E");
								}
							}
							);
						}//end of comboxObject.combobox('textbox').bind('focus', function ())
						);//comboxObject.combobox('textbox').bind()
					
					}//if ((combox_Object != null && combox_Object != undefined) &&combox_Object.attr("class").indexOf("easyui-combobox") >= 0)
					else
					{
						ShowMessage("错误...", comboxObjectName + "编辑框对象未找到！", "E");
					}
				}
			}
		}
	}//if (relFieldSplit != null && relFieldSplit != undefined)
	
	
}

/*
 * 功能：打开数据编辑窗体
 * 参数：窗体界面参数， 如果是编辑状态则需要传入当前行记录（如果是新增则为null），如果为多表，则要传入主表当前行记录
 * 作者：李福明
 * 时间：2015-07-08
 */
function OpenEditWindow(DSUIS, rowData, msRowData)
{
	console.log('3789',DSUIS, rowData, msRowData);
	
	if (DSUIS != undefined && DSUIS != null)
	{
		//清空编辑窗体所有子元素
		try
		{
			var uiColumins = DSUIS.DSUI;
			var relColumins = DSUIS.COLUMNS;
			var relationColumns = DSUIS.F_TABLE_FIELD;
			var verifyJson = window.dsUIAll.VERIFY;
			var verifyDenyFieldObj = "";

			//console.log('uiColumins:',uiColumins,'relColumins:',relColumins,'relationColumns:',relationColumns,'verifyJson:',verifyJson,'verifyDenyFieldObj:',verifyDenyFieldObj);
			//p03
			//取审核配置参数，以确定在某一个审核状态下哪些字段不允许修改
			if (verifyJson != undefined && verifyJson != null)
			{
				var dsui = null;

				if (msRowData != undefined && msRowData != null)
				{
					//如果是明细表，则要重新取主表的DSUI
					var dsuiALL = window.dsUIAll.DSUI;

					for (var i = 0; i < dsuiALL.length; i++)
					{
						var page_no = dsuiALL[i].PAGE_NO;
						if (page_no == "0")
						{
							dsui = dsuiALL[i].DSUI;
							break;
						}
					}
					
					console.log('msRowData:',msRowData);
				}
				else
				{
					dsui = uiColumins;
				}

				if ((dsui != undefined && dsui != null) && (dsui.length > 0))
				{
					var table_name = dsui[0].TABLE_NAME;
					var invent_table = dsui[0].INVENTED_TABLE;
					var page_no = dsui[0].PAGE_NO;

					console.log("table_name:%s", table_name);
					console.log("invent_table:%s", invent_table);

					var status_field = "";
					var status_value = "";
					var verifyflowcode = "";
					var verifyEditField = null;
					var verifyDenyFieldStr = "";
					for (var i = 0; i < verifyJson.length; i++)
					{
						var verifyRecord = verifyJson[i];

						console.log("verifyRecord:%s", JSONToStr(verifyRecord));

						var tempTable = verifyRecord.STATUS_FIELD;

						console.log("tempTable:%s", tempTable);

						if (tempTable != undefined && tempTable != null)
						{
							var tempTableSplit = tempTable.split("|");

							if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length == 2)
							{
								var tempTb = tempTableSplit[0];
								var tempFd = tempTableSplit[1];

								console.log("tempTb:%s", tempTb);
								console.log("tempFd:%s", tempFd);

								if (tempTb == table_name || tempTb == invent_table)
								{
									if (tempTb != undefined && tempTb != null)
									{
										if (status_field == "")
										{
											if (tempFd != undefined && tempFd != null)
											{
												status_field = tempFd;
											}
										} 
										var statusFieldValue = "";
										if (msRowData == undefined || msRowData == null)
										{
											if (rowData != undefined && rowData != null)
											{
												statusFieldValue = rowData[status_field];
											}
										}
										else
										{
											statusFieldValue = msRowData[status_field];
										}

										console.log("statusFieldValue:%s", statusFieldValue);

										if (statusFieldValue == undefined)
										{
											console.log("取当前审核字段值异常！");
											statusFieldValue = "";
										}

										var tempStatusFieldValue = verifyRecord.VERIFYSTATE;
										console.log("tempStatusFieldValue:%s", tempStatusFieldValue);

										if (statusFieldValue == null || statusFieldValue == "" || statusFieldValue == "null")
										{
											if (tempStatusFieldValue == null || tempStatusFieldValue == "" || tempStatusFieldValue == "null")
											{
												verifyflowcode = verifyRecord.VERIFYFOLWCODE;
												status_value = verifyRecord.VERIFYSTATE;

												verifyDenyFieldStr = verifyRecord.VERIFYFIELD;
											}
										}
										else
										{
											if (statusFieldValue == tempStatusFieldValue)
											{
												verifyflowcode = verifyRecord.VERIFYFOLWCODE;
												status_value = verifyRecord.VERIFYSTATE;

												verifyDenyFieldStr = verifyRecord.VERIFYFIELD;
											}
										}
									} //End of if (tempTb != undefined && tempTb != null){
								} //End of if (tempTb == table_name || tempTb == invent_table){
							} //End of if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length ==2){
						} //End of if (tempTable != undefined && tempTable != null){

						if ((status_field != "" && status_value != "") && (verifyflowcode != "" && verifyDenyFieldStr != ""))
							break;
					} //End of for (var i = 0; i < window.dsUIAll.VERIFY.length; i++){

					console.log("status_field:%s", status_field);
					console.log("status_desc:%s", status_value);
					console.log("verifyflowcode:%s", verifyflowcode);
					console.log("verifyDenyFieldStr:%s", verifyDenyFieldStr);

					if (verifyDenyFieldStr != "")
					{
						var verifyDenyFieldStrSplit = verifyDenyFieldStr.split("|");

						if (verifyDenyFieldStrSplit != null && verifyDenyFieldStrSplit.length > parseInt(page_no))
						{
							verifyDenyFieldObj = verifyDenyFieldStrSplit[parseInt(page_no)];
						}
					}
				} //End of if ((dsui != undefined && dsui != null) && (dsui.length > 0)){
			} //End of if (verifyJson != undefined && verifyJson != null){

			//每一行显示的查询条件录入个数
			var lineCount = 3;
			//行间隔调整值
			var rowHeightSub = 50;

			//有多少个字段需要查询
			var targetLength = uiColumins.length;
			
			
			console.log('有多少个字段需要查询:',targetLength);
			//取行数
			var targetCount = parseInt(targetLength / lineCount);
			//取剩余字段
			var targetRemain = targetLength % lineCount;
			//行高
			var rowHeight = 20;
			//字段描述宽度
			var descWidth = 90;
			//字段宽度
			var fieldWidth = 150;
			//窗体宽度
			var windowWidth = lineCount * (descWidth + fieldWidth);
			//取查询区行高
			if (targetRemain > 0)
			{
				subHeight = (targetCount + 1) * rowHeight + rowHeightSub;
			}
			else
			{
				subHeight = targetCount * rowHeight + rowHeightSub;
			}

			var htmlStr = "<table class='normal_table'>";
			var btHtmlStr = "<a id=\"btEditDelete\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-remove'\" >删除</a>"
				 + "<span id=\"editdeleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
				 + "<a id=\"btEditNew\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-add'\" >新增</a>"
				 + "<a id=\"btEditSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-ok'\" >确定</a>"
				 + "<span id=\"editdeleteSub\" style=\"color:#818181\">&nbsp;|&nbsp;</span>"
				 + "<a id=\"btEditClose\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-cancel'\" onclick=\"$('#editWindow').window('close')\">退出</a>";

			var panelTitle = "";
			//是否允许换行，用来处理在组织界面时某一个编辑框为不显示时的问题
			var canReturn = true;
			var objectCount = lineCount;

			console.log('objectCount:',objectCount);
			
			for (var i = lineCount; i < targetLength + lineCount; i++)
			{
				if (objectCount % lineCount == 0 && canReturn)
				{
					if (objectCount != lineCount)
						htmlStr = htmlStr + "</tr>";
					htmlStr = htmlStr + "<tr style='height:" + rowHeight.toString() + "px;'>";
					
					console.log('htmlStr:',htmlStr);
				}

				if (panelTitle == "")
				{
					if (rowData != null && rowData != undefined)
					{
						panelTitle = "编辑" + uiColumins[i - lineCount].PAGE_NAME + "信息";
						
					console.log('panelTitle:',panelTitle);	
					}
					else
					{
						panelTitle = "新增" + uiColumins[i - lineCount].PAGE_NAME + "信息";
						
					console.log('panelTitle:',panelTitle);	
					}
				}
				console.log('uiColumins-4015:',uiColumins);
				var fieldDesc = uiColumins[i - lineCount].FIELD_DESC;
				//alert("01");
				
				var fieldStr = uiColumins[i - lineCount].FIELD.toUpperCase();
				//alert("11");
			
				var fieldType = $.trim(uiColumins[i - lineCount].FIELD_TYPE.toUpperCase());
				//alert("21");
				
				var isInvented = uiColumins[i - lineCount].IS_INVENTED;
				var isnull = uiColumins[i - lineCount].ISNULL;
				var defaultValue = uiColumins[i - lineCount].DEFAULT_VALUE;
				var isVisible = uiColumins[i - lineCount].VISIBLE;
				var readOnly = uiColumins[i - lineCount].READONLY;
				var relField = uiColumins[i - lineCount].REL_FIELD;
				var f_tableField = uiColumins[i - lineCount].F_TABLE_FIELD;

				console.log(fieldDesc,fieldStr,fieldType,isInvented,isnull,defaultValue,isVisible,readOnly,relField,f_tableField);
				//如果不是虚拟字段且需要显示
				if (isVisible == "1" && isInvented != "1")
				{
					canReturn = true;
					objectCount = objectCount + 1;
					//如果不允许空
					if (isnull != "1")
					{
						htmlStr = htmlStr + "<td style='width:" + descWidth.toString() + "px;color:#FF0000;'>*" + fieldDesc + "</td>";
						htmlStr = htmlStr + "<td style='width:" + fieldWidth.toString() + "px;'><div style='width:" + (fieldWidth - 20).toString() + "px;'>";

						if (fieldType.indexOf("DATE") >= 0)
						{
							//如果未设置默认值
							if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
							{
								if (readOnly != "1")
								{
									if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
									else
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
								else
								{
									htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
								}
							}
							else
							{
								htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' required='true' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
							}
						}
						else
						{
							//如果未设置默认值
							if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
							{
								//查看当前列是否为下拉列表框
								var fieldEditor = null;

								if ((relColumins != null && relColumins != undefined) && relColumins.length > 0)
								{
									for (var j = 0; j < relColumins.length; j++)
									{
										var relColumn = relColumins[j];
										var fieldName = relColumn.field;

										if (fieldName.toUpperCase() == fieldStr.toUpperCase())
										{
											var tempEditor = relColumn.editor;

											if (tempEditor != undefined && tempEditor != null)
											{
												if ((tempEditor.type != null && tempEditor.type != undefined) && tempEditor.type == "combobox")
												{
													fieldEditor = relColumn.editor;
													break;
												}
											}
										}
									}
								}

								//如果未配置下拉列表框，则显示普通编辑框
								if (fieldEditor == null)
								{
									if (readOnly != "1")
									{
										if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true'  disabled='disabled' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
										else
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
									}
									else
									{
										
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true'  disabled='disabled' required='true' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
								else
								{
									//如果配置了下拉列表框，则显示下拉列表框
									var comboOptions = fieldEditor.options;
									var dataOption = "";
									if (comboOptions != undefined && comboOptions != null)
									{
										if (relField == null || relField == undefined || relField == "")
											if (comboOptions.url != undefined && comboOptions.url != null)
											{
												dataOption = "data-options='valueField:\"" + comboOptions.valueField
													 + "\",textField:\"" + comboOptions.textField
													 + "\",url:\"" + comboOptions.url
													 + "\",method:\"get\"'";
											}
											else
											{
												dataOption = "data-options='valueField:\"" + comboOptions.valueField
													 + "\",textField:\"" + comboOptions.textField
													 + "\",data:" + JSONToStr(comboOptions.data)
													 + ",method:\"get\"'";
											}
									}
									console.log("comboOptions:%s", comboOptions);
									console.log("dataOption:%s", dataOption);
									if (readOnly != "1")
									{
										if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' readonly='true' disabled='disabled' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
										else
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
									}
									else
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' readonly='true' disabled='disabled' required='true'" + dataOption + "  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
							}
							else
							{
								htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' required='true' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
							}
						}
					}
					else
					{
						//如果允许为空
						htmlStr = htmlStr + "<td style='width:" + descWidth.toString() + "px;'>" + fieldDesc + "</td>";
						htmlStr = htmlStr + "<td style='width:" + fieldWidth.toString() + "px;'><div style='width:" + (fieldWidth - 20).toString() + "px;'>";
						if (fieldType.indexOf("DATE") >= 0)
						{
							//如果未设置默认值
							if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
							{
								if (readOnly != "1")
								{
									if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
									else
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
								else
								{
									htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' readonly='true' disabled='disabled'  style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
								}
							}
							else
							{
								htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-datebox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
							}
						}
						else
						{
							//如果未设置默认值
							if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
							{
								//查看当前列是否为下拉列表框
								var fieldEditor = null;

								if ((relColumins != null && relColumins != undefined) && relColumins.length > 0)
								{
									for (var j = 0; j < relColumins.length; j++)
									{
										var relColumn = relColumins[j];
										var fieldName = relColumn.field;

										if (fieldName.toUpperCase() == fieldStr.toUpperCase())
										{
											var tempEditor = relColumn.editor;

											if (tempEditor != undefined && tempEditor != null)
											{
												if ((tempEditor.type != null && tempEditor.type != undefined) && tempEditor.type == "combobox")
												{
													fieldEditor = relColumn.editor;
													break;
												}
											}
										}
									}
								}

								//如果未配置下拉列表框，则显示普通编辑框
								if (fieldEditor == null)
								{
									if (readOnly != "1")
									{
										if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
										else
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
									}
									else
									{
										//alert(fieldStr + ":" + readOnly);
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
								else
								{
									var comboOptions = fieldEditor.options;
									var dataOption = "";
									if (comboOptions != undefined && comboOptions != null)
									{
										if (comboOptions.url != undefined && comboOptions.url != null)
										{
											dataOption = "data-options='valueField:\"" + comboOptions.valueField
												 + "\",textField:\"" + comboOptions.textField
												 + "\",url:" + comboOptions.url
												 + ",method:\"get\"'";
										}
										else
										{
											dataOption = "data-options='valueField:\"" + comboOptions.valueField
												 + "\",textField:\"" + comboOptions.textField
												 + "\",data:" + JSONToStr(comboOptions.data)
												 + ",method:\"get\"'";
										}
									}
									console.log("comboOptions2:%s", comboOptions);
									console.log("dataOption2:%s", dataOption);
									
									if (readOnly != "1")
									{
										if (verifyDenyFieldObj.indexOf(fieldStr) >= 0 || verifyDenyFieldObj == "*" || verifyDenyFieldObj == "ALL")
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' " + dataOption + " readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
										else
										{
											htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' " + dataOption + " style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
										}
									}
									else
									{
										htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-combobox' " + dataOption + " readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
									}
								}
							}
							else
							{
								htmlStr = htmlStr + "<input id='" + fieldStr + "' class='easyui-textbox' readonly='true' disabled='disabled' style='width:" + (fieldWidth - 30).toString() + "px;height:20px;'></input>";
							}
						} 
					} 

					htmlStr = htmlStr + "</div></td>";
				}
				else
				{
					canReturn = false;
				} 
			} 

			htmlStr = htmlStr + "</tr></table>";

			var toolPanelHeight = $('#edit_operPanel').layout("panel", "north").height() + 15;

			var $win;
			$win = $('#editWindow').window(
				{
					title : panelTitle,
					width : windowWidth,
					height : subHeight + toolPanelHeight,
					top : ($(window).height() - subHeight - toolPanelHeight) * 0.5,
					left : ($(window).width() - windowWidth) * 0.5,
					shadow : true,
					modal : true,
					iconCls : 'icon-file',
					closed : true,
					minimizable : false,
					maximizable : false,
					collapsible : false,
					onClose : function ()
					{
						window.focusGrid = "";
					}
				}
				);

			$(document).ready(function ()
			{
				$("#editPanel").empty();
				$('#edit_tool_menuPanel').empty();

				$('#editPanel').append(htmlStr);
				$('#edit_tool_menuPanel').append(btHtmlStr);

				//alert(JSONToStr(rowData));   //p02

				if (rowData != null && rowData != undefined)
				{
					//如果为编辑数据
					//对有默认字段或主表索引字段的编辑框填写初始值
					var uiColumins = null;
					var gridName = window.focusGrid;
					var mainUIS = null;

					var dsUIs = window.dsUIAll.DSUI;
					var mastName = "";

					if (dsUIs != null && dsUIs.length > 0)
					{
						if (gridName == "dataGrid")
						{
							uiColumins = dsUIs;
						}
						else
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;
									var pageName = DSUIs.PAGE_NAME + "列表";

									//主表构建
									if (pageNo != undefined && pageNo == "1")
									{
										if (msRowData != null)
										{
											uiColumins = DSUIs.DSUI;
										}
									}
									else
									{
										if (pageNo != undefined && pageNo == "0")
										{
											mastName = pageName;
											mainUIS = DSUIs.INDEXCOLUMNS;
											if (msRowData == null)
											{
												uiColumins = DSUIs.DSUI;
											}
										}
									}
								}
							}
						}
					}

					//如果为数据编辑，则进行取相应字段值填写到对应编辑框中
					if ((uiColumins != undefined && uiColumins != null) && uiColumins.length > 0)
					{
						for (var i = 0; i < uiColumins.length; i++)
						{
							
							var fieldName = uiColumins[i].FIELD.toString().toUpperCase();
							var fieldDesc = uiColumins[i].FIELD_DESC;
							var fieldObjectName = "#" + fieldName;
						
							var fieldType = $.trim(uiColumins[i].FIELD_TYPE.toUpperCase());
							var defaultValue = uiColumins[i].DEFAULT_VALUE;
							var relField = uiColumins[i].REL_FIELD;
							var f_table_Field = uiColumins[i].F_TABLE_FIELD;

							console.log("fieldName:%s", fieldName);
							console.log("fieldDesc:%s", fieldDesc);
							console.log("fieldObjectName:%s", fieldObjectName);

							var fieldValueObj = rowData[fieldName];
							
							console.log("fieldValueObj:%s", fieldValueObj);

							if (defaultValue == null || defaultValue == undefined || defaultValue != "null")
							{
								if (fieldValueObj != undefined && fieldValueObj != null)
								{
									//如果当前列表为联动下拉列表框，则取下拉列表框数据源
									if (((relField != null && relField != undefined) && relField != "null") &&
										((f_table_Field != null && f_table_Field != undefined) && f_table_Field != "null"))
									{
										var comboboxObjName = new String(fieldObjectName);
										var rel_Field = new String(relField);

										var relateTimes = 0;

										var relFieldSplit = rel_Field.split("|");

										if (relFieldSplit != null && relFieldSplit != undefined)
										{
											if (relFieldSplit.length == 2)
											{
												rel_Field = relFieldSplit[1];
												while (true)
												{
													var temField = "";

													if (relateTimes > rel_Field.length)
													{
														break;
													}

													if (rel_Field.indexOf("[") >= 0)
													{
														temField = rel_Field.substring(rel_Field.indexOf("[") + 1, rel_Field.indexOf("]"));

														console.log("temField:%s", temField);

														if (rowData[temField] != null && rowData[temField] != undefined)
														{
															rel_Field = rel_Field.replace("[" + temField + "]", rowData[temField]);
														}
														else
														{
															rel_Field = rel_Field.replace("[" + temField + "]", "");
														}
													}
													else
													{
														break;
													}

													relateTimes++;
													console.log("rel_Field:%s", rel_Field);
												}
												
												
												//取下拉列表框数据值
												var gparams =
												{
													getObject : "{GETTYPE:\"F_TABLE_FIELD\",DBOBJECT:\"0\",OBJECT:\""
													                + f_table_Field + "\",PARAMETER:\"\",WHERE:\""
													                + rel_Field + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\""
													                + fieldDesc + "\",IS_GRID:\"2\","
													                + "USER_ID:\"" + localjsonObj.username 
													                + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
													                + "\"}",
													errorMessage : ""
												};
												$.ajax(
												{
													url : ip+"getdata",
													method : "POST",
													data : gparams,
													datatype : "json",
													success : function (data)
													{
														var comboData = JSON.parse(data); //使用这个方法解析json

														console.log("comboData111111 : %s", data);
													
														
														
														$(comboboxObjName).combobox("loadData", comboData);
														console.log("comboboxObjName : %s", comboboxObjName);
													},
													error : function (errorMessage)
													{
														ShowMessage("错误...", fieldDesc + "数据加载失败！" + JSONToStr(errorMessage), "E");
													}
												}
												);
											}
										}
									}

									var fieldValue = fieldValueObj.toString();
									$(fieldObjectName).val(fieldValue);
								}
							}
							else
							{
								var fieldValue = getDefaultValue(defaultValue);
								$(fieldObjectName).val(fieldValue);
							}
						}
					}
					else
					{
						ShowMessage("提示...", '取当前界面配置参数错误！', "E");
					}
				}
				else
				{
					//如果为新增数据
					//对有默认字段或主表索引字段的编辑框填写初始值
					var uiColumins = null;
					var gridName = window.focusGrid;
					var mainUIS = null;

					var dsUIs = window.dsUIAll.DSUI;
					var mastName = "";

					if (dsUIs != null && dsUIs.length > 0)
					{
						if (gridName == "dataGrid")
						{
							uiColumins = dsUIs;
						}
						else
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;
									var pageName = DSUIs.PAGE_NAME + "列表";

									//主表构建
									if (pageNo != undefined && pageNo == "1")
									{
										if (msRowData != null)
										{
											uiColumins = DSUIs.DSUI;
										}
									}
									else
									{
										if (pageNo != undefined && pageNo == "0")
										{
											mastName = pageName;
											mainUIS = DSUIs.INDEXCOLUMNS;
											if (msRowData == null)
											{
												uiColumins = DSUIs.DSUI;
											}
										}
									}
								}
							}
						}
					}

					if ((uiColumins != undefined && uiColumins != null) && uiColumins.length > 0)
					{
						for (var i = 0; i < uiColumins.length; i++)
						{
							var fieldName = uiColumins[i].FIELD.toString().toUpperCase();
							var fieldObjectName = "#" + fieldName;
							var defaultValue = uiColumins[i].DEFAULT_VALUE;
							var mainIndex = uiColumins[i].MAIN_INDEX;

							if ((defaultValue != null && defaultValue != undefined) && (defaultValue != "null" && defaultValue != ""))
							{
								var fieldValue = getDefaultValue(defaultValue);
								$(fieldObjectName).val(fieldValue);
							}
							else
							{
								//按主表索引取值
								if (msRowData != null)
								{
									if ((mainUIS != null && mainUIS != undefined) && mainUIS.length > 0)
									{
										var fieldValue = "";
										for (var mIndex = 0; mIndex < mainUIS.length; mIndex++)
										{
											var mainIndexField = mainUIS[mIndex];
											var tempField = $.trim(mainIndexField.FIELD.toString().toUpperCase());

											if ((mainIndex != undefined && mainIndex != null) && (mainIndex != "" && mainIndex != "null"))
											{
												mainIndex = $.trim(mainIndex.toString().toUpperCase());
												if (tempField == mainIndex)
												{
													fieldValue = msRowData[mainIndex];
													break;
												}
											}
											else
											{
												if (tempField == fieldName)
												{
													fieldValue = msRowData[fieldName];
													break;
												}
											}
										}

										$(fieldObjectName).val(fieldValue);
									}
								} //End of if (msRowData != null)
							} //End of if ((defaultValue != null && defaultValue != undefined) && defaultValue != "null")
						} //End of for (var i = 0; i < uiColumins.length; i++)
					} //End of if ((uiColumins != undefined && uiColumins != null) && uiColumins.length > 0)
				}

				/*配置当前功能按钮事件
				 * 时间：2015-07-09
				 * 作者：李福明
				 */
				//新增按钮点击事件
				$('#btEditNew').bind('click', function ()//001
				{
					var uiColumins = null;
					var gridName = window.focusGrid;
					var mainUIS = null;
					
					console.log('新增按钮点击事件');
					if (gridName == "mdataGrid")
					{
						//如果是多表窗体中的主表
						var dsUIs = window.dsUIAll.DSUI;

						if (dsUIs != null && dsUIs.length > 0)
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;
									var pageName = DSUIs.PAGE_NAME + "列表";

									//主表构建
									if (pageNo != undefined && pageNo == "0")
									{
										uiColumins = DSUIs.DSUI;
										break;
									}
								}
							}
						}
					}
					else if (gridName == "dtldataGrid")
					{
						//如果是多表窗体中的子表
						var dsUIs = window.dsUIAll.DSUI;
						var mastName = "";

						if (dsUIs != null && dsUIs.length > 0)
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;
									var pageName = DSUIs.PAGE_NAME + "列表";

									//主表构建
									if (pageNo != undefined && pageNo == "1")
									{
										uiColumins = DSUIs.DSUI;
									}
									else
									{
										if (pageNo != undefined && pageNo == "0")
										{
											mastName = pageName;
											mainUIS = DSUIs.INDEXCOLUMNS;
										}
									}
								}
							}
						}

						//判断当前是否选择了一个主表行
						var rows = $("#mdataGrid").datagrid('getSelections');

						if (rows == null || rows == undefined || rows.length == 0 || msRowData == null)
						{
							ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
							return;
						}
					}
					else
					{
						uiColumins = window.dsUIAll.DSUI;
					}

					if (uiColumins != null)
					{
						try
						{
							for (var i = 0; i < uiColumins.length; i++)
							{
								var fieldName = $.trim(uiColumins[i].FIELD.toString().toUpperCase());
								var fieldObjectName = "#" + fieldName;
								var defaultValue = uiColumins[i].DEFAULT_VALUE;
								var fieldType = $.trim(uiColumins[i].FIELD_TYPE.toUpperCase());
								var relField = uiColumins[i].F_TABLE_FIELD;
								var comboField = uiColumins[i].COMBOBOX;
								var mainIndex = uiColumins[i].MAIN_INDEX;

								var fieldValue = "",
								feildText = "";
								if ((defaultValue != null && defaultValue != undefined) && (defaultValue != "null" && defaultValue != ""))
								{
									//按默认值填写值
									fieldValue = getDefaultValue(defaultValue);
								}
								else
								{
									//按主表索引取值
									if (msRowData != null)
									{
										if ((mainUIS != null && mainUIS != undefined) && mainUIS.length > 0)
										{
											for (var mIndex = 0; mIndex < mainUIS.length; mIndex++)
											{
												var mainIndexField = mainUIS[mIndex];
												var tempField = $.trim(mainIndexField.FIELD.toString().toUpperCase());

												if ((mainIndex != undefined && mainIndex != null) && (mainIndex != "" && mainIndex != "null"))
												{
													mainIndex = $.trim(mainIndex.toString().toUpperCase());
													if (tempField == mainIndex)
													{
														fieldValue = msRowData[mainIndex];
														break;
													}
												}
												else
												{
													if (tempField == fieldName)
													{
														fieldValue = msRowData[fieldName];
														break;
													}
												}
											}
										}
									}
								}

								if (fieldType.indexOf("DATE") >= 0)
								{
									$(fieldObjectName).datebox('setValue', fieldValue);
								}
								else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
								{
									$(fieldObjectName).numberbox('setValue', fieldValue);
								}
								else if (fieldType.indexOf("INT") >= 0)
								{
									if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
										(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
									{
										$(fieldObjectName).numberspinner('setValue', fieldValue);
									}
									else
									{
										$(fieldObjectName).combobox('setValue', fieldValue);
									}
								}
								else
								{
									if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
										(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
									{
										$(fieldObjectName).textbox('setValue', fieldValue);
									}
									else
									{
										$(fieldObjectName).combobox('setValue', fieldValue);
									}
								}
							}

							$("#" + window.focusGrid).datagrid("unselectAll");

							window.rowIndex[gridName] = -1;
						}
						catch (e)
						{
							ShowMessage("错误...", "新增数据错误！" + e.description, "E");
						}
					}
				}
				);

				//确定按钮点击事件
				$('#btEditSave').bind('click', function ()
				{
					var gridName = window.focusGrid;
					var dataGrid = $("[id=" + gridName + "]");

					if (dataGrid == undefined || dataGrid == null)
					{
						ShowMessage("错误...", '待新增列表对象未找到！', "E");
						return;
					}

					if (endEditing(dataGrid, gridName))
					{
						var defaultValueJSonStr = "";
						var dataGridColumns = null;
						var comboColumns = null;
						var t_f_table = null;
						var t_f_tableDis = null;
						var t_f_tableRel = null;
						var mainRow = null;

						if (gridName == "mdataGrid")
						{
							//如果是多表窗体中的主表
							var dsUIs = window.dsUIAll.DSUI;

							if (dsUIs != null && dsUIs.length > 0)
							{
								for (var i = 0; i < dsUIs.length; i++)
								{
									var DSUIs = dsUIs[i];

									if (DSUIs != undefined && DSUIs != null)
									{
										var pageNo = DSUIs.PAGE_NO;
										var pageName = DSUIs.PAGE_NAME + "列表";

										//主表构建
										if (pageNo != undefined && pageNo == "0")
										{
											dataGridColumns = DSUIs.DSUI;
											comboColumns = DSUIs.COLUMNS;
											t_f_table = DSUIs.F_TABLE_FIELD;
											t_f_tableDis = DSUIs.F_TABLE_FIELD_DIS;
											t_f_tableRel = DSUIs.F_TABLE_FIELD_REL;
											break;
										}
									}
								}
							}
						}
						else if (gridName == "dtldataGrid")
						{
							//如果是多表窗体中的子表
							var dsUIs = window.dsUIAll.DSUI;
							var mastName = "";

							var rows = $("#mdataGrid").datagrid('getSelections');
							if ((rows != null && rows != undefined) && rows.length > 0)
							{
								mainRow = rows[0];
							}

							console.log("&&&&&&&&&&&&&&&&&&&&&&");
							console.log("dsUIs:%s", JSONToStr(dsUIs));
							if (dsUIs != null && dsUIs.length > 0)
							{
								for (var i = 0; i < dsUIs.length; i++)
								{
									var DSUIs = dsUIs[i];

									if (DSUIs != undefined && DSUIs != null)
									{
										var pageNo = DSUIs.PAGE_NO;
										var pageName = DSUIs.PAGE_NAME + "列表";

										//主表构建
										if (pageNo != undefined && pageNo == "1")
										{
											dataGridColumns = DSUIs.DSUI;
											comboColumns = DSUIs.COLUMNS;
											t_f_table = DSUIs.F_TABLE_FIELD;
											t_f_tableDis = DSUIs.F_TABLE_FIELD_DIS;
											t_f_tableRel = DSUIs.F_TABLE_FIELD_REL;
										}
										else
										{
											if (pageNo != undefined && pageNo == "0")
											{
												mastName = pageName;
											}
										}
									}
								}
							}

							//console.log("pageName:%s", pageName);

							//判断当前是否选择了一个主表行
							var rows = $("#mdataGrid").datagrid('getSelections');

							console.log("rows.length:%d", rows.length);

							if (rows == null || rows == undefined || rows.length == 0)
							{
								ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
								return;
							}
						}
						else
						{
							//如果是单表
							dataGridColumns = window.dsUIAll.DSUI;
							comboColumns = window.dsUIAll.COLUMNS; //COLUMNS;
							t_f_table = window.dsUIAll.F_TABLE_FIELD;
							t_f_tableDis = window.dsUIAll.F_TABLE_FIELD_DIS;
							t_f_tableRel = window.dsUIAll.F_TABLE_FIELD_REL;
						}

						var gridSelectRows = dataGrid.datagrid('getSelections');
						//数据验证标识
						var canSave = true;
						//如果没前没有选择行，则认为是新增数据
						console.log("dataGridColumns:", dataGridColumns);

						if (gridSelectRows == null || gridSelectRows == undefined || gridSelectRows.length == 0)
						{
							for (var i = 0; i < dataGridColumns.length; i++)
							{
								var fieldStr = dataGridColumns[i].FIELD;
								var fieldDesc = dataGridColumns[i].FIELD_DESC;
								var fieldType = $.trim(dataGridColumns[i].FIELD_TYPE.toUpperCase());
								var isnull = dataGridColumns[i].ISNULL;
								var isIndex = dataGridColumns[i].ISINDEX;
								var t_tableField = dataGridColumns[i].F_TABLE_FIELD;
								var comboField = dataGridColumns[i].COMBOBOX;
								var defaultValue = dataGridColumns[i].DEFAULT_VALUE;
								var isInvented = dataGridColumns[i].IS_INVENTED;
								var mainIndex = dataGridColumns[i].MAIN_INDEX;
								var v_comboColumn = null;
								
								
								console.log("dataGridColumns:", dataGridColumns);

								if ((fieldStr != undefined && fieldStr != null) && fieldStr != "null")
								{
									fieldStr = $.trim(fieldStr);
								}
								else
								{
									fieldStr = "";
								}

								if ((defaultValue != undefined && defaultValue != null) && defaultValue != "null")
								{
									defaultValue = $.trim(defaultValue);
								}
								else
								{
									defaultValue = "";
								}

								if ((isInvented != undefined && isInvented != null) && isInvented != "null")
								{
									isInvented = $.trim(isInvented);
								}
								else
								{
									isInvented = "";
								}

								if ((isIndex != undefined && isIndex != null) && isIndex != "null")
								{
									isIndex = $.trim(isIndex);
								}
								else
								{
									isIndex = "";
								}

								if ((isnull != undefined && isnull != null) && isnull != "null")
								{
									isnull = $.trim(isnull);
								}
								else
								{
									isnull = "";
								}

								if ((t_tableField != undefined && t_tableField != null) && t_tableField != "null")
								{
									t_tableField = $.trim(t_tableField);
								}
								else
								{
									t_tableField = "";
								}

								if ((comboField != undefined && comboField != null) && comboField != "null")
								{
									comboField = $.trim(comboField);
								}
								else
								{
									comboField = "";
								}

								if ((mainIndex != undefined && mainIndex != null) && mainIndex != "null")
								{
									mainIndex = $.trim(mainIndex);
								}
								else
								{
									mainIndex = "";
								}

								var recordJSONStr = "";
								if (fieldStr != "")
								{
									var fieldObject = $("#" + fieldStr);
									var fieldObjectClassName = fieldObject.attr("class");
									var textField = "",
									fieldValue = "",
									fieldText = "";

									if (isIndex == "1")
									{
										//如果是索引字段，则有可能数据来源于主表索引字段
										if (defaultValue != "")
										{
											//如果主索引字段有默认值，则以默认值为准
											recordJSONStr = "\"" + fieldStr + "\":\"" + getDefaultValue(defaultValue) + "\"";
										}
										else
										{
											if ((fieldObject != null && fieldObject != undefined) && (fieldObjectClassName != null && fieldObjectClassName != undefined))
											{
												//如果能找到字段对象，则取字段对象编辑框的值
												if (t_tableField != "" && (t_f_table != null && t_f_table != undefined))
												{
													//如果有带数据源的下拉列表框
													for (var j = 0; j < t_f_table.length; j++)
													{
														var t_f_tableRow = t_f_table[j];
														var tem_t_f_table = t_f_tableRow.F_TABLE_FIELD;

														if (tem_t_f_table == t_tableField)
														{
															var keyField = t_f_tableRow.KEY_FIELD;
															var dispField = t_f_tableRow.DISP_FIELD;

															if ((dispField != null && dispField != undefined) && (dispField != "" && dispField != "null"))
															{
																textField = dispField;
															}

															if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
															{
																fieldValue = fieldObject.combobox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"\",\"" + textField + "\":\"\"";
																	}
																}
																else
																{
																	recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\",\""
																		 + textField + "\":\"" + fieldObject.combobox('getText') + "\"";
																} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
															} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

															break;
														} //End of if (tem_t_f_table == t_tableField){
													} //End of for (var j = 0; j < t_f_table.length; j++){
												}
												else
												{
													if (comboField != "")
													{
														//如果是普通下拉列表框
														if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0)
														{
															//遍历所有界面列表字段配置信息，查找当前普通下拉列表框的配置取出关键字字段和显示字段名
															for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex++)
															{
																var comboColumn = comboColumns[comboIndex];

																if (comboColumn != undefined && comboColumn != null)
																{
																	var comboField = comboColumn.field;

																	if ((comboField != undefined && comboField != null) && comboField != "")
																	{
																		comboField = $.trim(comboField.toUpperCase());

																		if (comboField == fieldStr)
																		{
																			if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
																			{
																				var textField = comboColumn.editor.options.textField;

																				if (textField == null || textField == undefined || textField == "null")
																					textField = "";

																				fieldValue = fieldObject.combobox('getValue');

																				if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						recordJSONStr = "\"" + fieldStr + "\":\"\",\"" + textField + "\":\"\"";
																					}
																				}
																				else
																				{
																					recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\",\""
																						 + textField + "\":\"" + fieldObject.combobox('getText') + "\"";
																				} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
																			} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

																			break;
																		} //End of if (comboField == fieldStr){
																	} //End of if ((comboField != undefined && comboField != null) && comboField != ""){
																} //End of if (comboColumn != undefined && comboColumn != null){
															} //End of for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex ++){
														} //End of if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0){
													}
													else
													{
														//如果为非下拉列表框，则按字段数值类型来判断当前字段的数值合法性及填充值
														if (fieldType.indexOf("DATE") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-datebox") >= 0)
															{
																fieldValue = fieldObject.datebox('getValue');

																if (fieldType.indexOf("DATETIME") >= 0)
																{
																	if (!isDateTime(fieldValue))
																	{
																		if (!isDate(fieldValue))
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期时间型格式，请重新录入！", "E");
																			canSave = false;
																			return;
																		}
																	}
																	
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																		{
																			if (isnull != "1")
																			{
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																				canSave = false;
																				return;
																			}
																			else
																			{
																				recordJSONStr = "\"" + fieldStr + "\":\"\"";
																			}	
																		}
																		else
																		{
																			recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																		}	
																}
																else
																{
																	if (fieldType.indexOf("DATE") >= 0)
																	{
																		if (!isDate(fieldValue))
																		{
																			if (!isDateTime(fieldValue))
																			{
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期型格式，请重新录入！", "E");
																				canSave = false;
																				return;
																			}
																		 
																		}
																		
																		if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						recordJSONStr = "\"" + fieldStr + "\":\"\"";
																					}
																				}
																				else
																				{
																					recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																				}
																	} //End of if (fieldType.indexOf("DATETIME") >= 0){
																} //End of if (fieldType.indexOf("DATETIME") >= 0){
															} //End of if (fieldObject.attr("class").indexOf("easyui-datebox") >= 0){
														}
														else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberbox('getValue');

																if (!isFloat(fieldValue))
																{
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确数值格式，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			recordJSONStr = "\"" + fieldStr + "\":\"\"";
																		}
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\" " + fieldValue + "\"";
																	}
																}
															}
														}
														else if (fieldType.indexOf("INT") >= 0 || fieldType.indexOf("TINYINT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberspinner('getValue');

																if (!isInt(fieldValue))
																{
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确整数数据，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			recordJSONStr = "\"" + fieldStr + "\":\"\"";
																		}
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\" " + fieldValue + "\"";
																	}
																}
															}
														}
														else
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.textbox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"\"";
																	}
																}
																else
																{
																	recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																}
															}
														} //End of if (fieldType.indexOf("DATE") >= 0){
													} //End of if (comboField != ""){
												} //End of if (t_tableField != "" && (t_f_table != null && t_f_table != undefined)){
											}
											else
											{
												if (mainIndex != "")
												{
													fieldValue = mainRow[mainIndex];
													
													console.log("fieldValue:",fieldValue);
												}
												else
												{
													fieldValue = mainRow[fieldStr];
													
													console.log("fieldValue:",fieldValue);
												}
												recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
											} //End of if (fieldObject != null && fieldObject != undefined){
										} //End of if (defaultValue != ""){
									}
									else
									{
										//如果是普通字段，则按普通字段进行数据填充
										if (defaultValue != "")
										{
											//如果有默认值，则以默认值为准
											recordJSONStr = "\"" + fieldStr + "\":\"" + getDefaultValue(defaultValue) + "\"";
										}
										else
										{
											if ((fieldObject != null && fieldObject != undefined) && (fieldObjectClassName != null && fieldObjectClassName != undefined))
											{
												//如果能找到字段对象，则取字段对象编辑框的值
												if (t_tableField != "" && (t_f_table != null && t_f_table != undefined))
												{
													//如果有带数据源的下拉列表框
													for (var j = 0; j < t_f_table.length; j++)
													{
														var t_f_tableRow = t_f_table[j];
														var tem_t_f_table = t_f_tableRow.F_TABLE_FIELD;

														if (t_tableField == tem_t_f_table)
														{
															var keyField = t_f_tableRow.KEY_FIELD;
															var dispField = t_f_tableRow.DISP_FIELD;

															if ((dispField != null && dispField != undefined) && (dispField != "" && dispField != "null"))
															{
																textField = dispField;
															}

															if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
															{
																fieldValue = fieldObject.combobox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"\",\"" + textField + "\":\"\"";
																	}
																}
																else
																{
																	recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\",\""
																		 + textField + "\":\"" + fieldObject.combobox('getText') + "\"";
																} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
															} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

															break;
														} //End of if (tem_t_f_table == t_tableField){
													} //End of for (var j = 0; j < t_f_table.length; j++){
												}
												else
												{
													//如果为普通下拉列表框
													if (comboField != "")
													{
														//遍历所有界面列表字段配置信息，查找当前普通下拉列表框的配置取出关键字字段和显示字段名
														if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0)
														{
															for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex++)
															{
																var comboColumn = comboColumns[comboIndex];

																if (comboColumn != undefined && comboColumn != null)
																{
																	var comboField = comboColumn.field;

																	if ((comboField != undefined && comboField != null) && comboField != "")
																	{
																		comboField = $.trim(comboField.toUpperCase());

																		if (comboField == fieldStr)
																		{
																			if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
																			{
																				var textField = comboColumn.editor.options.textField;

																				if (textField == null || textField == undefined || textField == "null")
																					textField = "";

																				fieldValue = fieldObject.combobox('getValue');

																				if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\",\""
																							 + textField + "\":\"" + fieldObject.combobox('getText') + "\"";
																					}
																				}
																				else
																				{
																					recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\",\""
																						 + textField + "\":\"" + fieldObject.combobox('getText') + "\"";
																				} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
																			} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

																			break;
																		} //End of if (comboField == fieldStr){
																	} //End of if ((comboField != undefined && comboField != null) && comboField != ""){
																} //End of if (comboColumn != undefined && comboColumn != null){
															} //End of for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex ++){
														} //End of if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0){
													}
													else
													{
														//如果为非下拉列表框，则按字段数值类型来判断当前字段的数值合法性及填充值
														if (fieldType.indexOf("DATE") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-datebox") >= 0)
															{
																fieldValue = fieldObject.datebox('getValue');

																if (fieldType.indexOf("DATETIME") >= 0)
																{
																	if (!isDateTime(fieldValue))
																	{
																		if (!isDate(fieldValue))
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期时间型格式，请重新录入！", "E");
																			canSave = false;
																			return;
																		}
																	}
																	
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																			{
																				if (isnull != "1")
																				{
																					fieldObject.focus().select();
																					ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																					canSave = false;
																					return;
																				}
																				else
																				{
																					recordJSONStr = "\"" + fieldStr + "\":\"\"";
																				}
																			}
																			else
																			{
																				recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																			}
																}
																else
																{
																	if (fieldType.indexOf("DATE") >= 0)
																	{
																		if (!isDate(fieldValue))
																		{
																			if (!isDateTime(fieldValue))
																			{
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期型格式，请重新录入！", "E");
																				canSave = false;
																				return;
																			}
																		}
																		
																		if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						recordJSONStr = "\"" + fieldStr + "\":\"\"";
																					}
																				}
																				else
																				{
																					recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																				}
																	} //End of if (fieldType.indexOf("DATETIME") >= 0){
																} //End of if (fieldType.indexOf("DATETIME") >= 0){
															} //End of if (fieldObject.attr("class").indexOf("easyui-datebox") >= 0){
														}
														else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
														{
															console.log("fieldStr:%s", fieldStr);
															console.log("fieldType:%s", fieldType);
															console.log("fieldObjectClassName:%s", fieldObjectClassName);

															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberbox('getValue');

																if (!isFloat(fieldValue))
																{
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确数值格式，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			recordJSONStr = "\"" + fieldStr + "\":\"\"";
																		}
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																	}
																}
															}
														}
														else if (fieldType.indexOf("INT") >= 0 || fieldType.indexOf("TINYINT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberspinner('getValue');

																if (!isInt(fieldValue))
																{
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确整数数据，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			recordJSONStr = "\"" + fieldStr + "\":\"\"";
																		}
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																	}
																}
															}
														}
														else
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.textbox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		recordJSONStr = "\"" + fieldStr + "\":\"\"";
																	}
																}
																else
																{
																	recordJSONStr = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
																}
															}
														} //End of if (fieldType.indexOf("DATE") >= 0){
													} //End of if (comboField != ""){
												} //End of if (t_tableField != "" && (t_f_table != null && t_f_table != undefined)){
											} //End of if (fieldObject != null && fieldObject != undefined){
										} //End of if (defaultValue != ""){
									} //End of if (isIndex == "1"){
								} //End of if (fieldStr != ""){

								if (recordJSONStr != "")
								{
									if (defaultValueJSonStr != "")
									{
										defaultValueJSonStr = defaultValueJSonStr + "," + recordJSONStr;
									}
									else
									{
										defaultValueJSonStr = recordJSONStr;
									}
								}
							} //End of for (var i = 0; i < dataGridColumns.length; i++){

							console.log("defaultValueJSonStr:%s", defaultValueJSonStr);

							//if (canSave){
							if (defaultValueJSonStr != "")
							{
								defaultValueJSonStr = "{" + defaultValueJSonStr + "}";

								var defaultValueJSon = JSON.parse(defaultValueJSonStr);
								dataGrid.datagrid("appendRow", defaultValueJSon); //{status:'P'});

								try
								{
									var rowLength = dataGrid.datagrid("getRows").length;

									if ((rowLength != undefined && rowLength != null) && rowLength > 0)
									{
										window.rowIndex[gridName] = rowLength - 1;
									}
									else
									{
										window.rowIndex[gridName] = 0;
									}
								}
								catch (e)
								{
									window.rowIndex[gridName] = 0;
									ShowMessage("错误...", e.description, "E");
								}

								dataGrid.datagrid("selectRow", window.rowIndex[gridName]); //.datagrid('beginEdit', window.rowIndex[gridName]);
							}
							else
							{
								ShowMessage("错误...", "未取到字段值！", "E");
							}
						}
						else
						{
							//如果有选择的行，则为修改数据
							var selectRecord = gridSelectRows[0];

							dataGrid.datagrid('beginEdit', window.rowIndex[gridName]);

							for (var i = 0; i < dataGridColumns.length; i++)
							{
								var fieldStr = dataGridColumns[i].FIELD;
								var fieldDesc = dataGridColumns[i].FIELD_DESC;
								var fieldType = $.trim(dataGridColumns[i].FIELD_TYPE.toUpperCase());
								var isnull = dataGridColumns[i].ISNULL;
								var isIndex = dataGridColumns[i].ISINDEX;
								var t_tableField = dataGridColumns[i].F_TABLE_FIELD;
								var comboField = dataGridColumns[i].COMBOBOX;
								var defaultValue = dataGridColumns[i].DEFAULT_VALUE;
								var isInvented = dataGridColumns[i].IS_INVENTED;
								var mainIndex = dataGridColumns[i].MAIN_INDEX;

								//记录下拉列表框在业务表中是否有显示TEXT的字段
								var comboArray = "";
								var v_comboColumn = null;

								if ((fieldStr != undefined && fieldStr != null) && fieldStr != "null")
								{
									fieldStr = $.trim(fieldStr);
								}
								else
								{
									fieldStr = "";
								}

								if ((defaultValue != undefined && defaultValue != null) && defaultValue != "null")
								{
									defaultValue = $.trim(defaultValue);
								}
								else
								{
									defaultValue = "";
								}

								if ((isInvented != undefined && isInvented != null) && isInvented != "null")
								{
									isInvented = $.trim(isInvented);
								}
								else
								{
									isInvented = "";
								}

								if ((isIndex != undefined && isIndex != null) && isIndex != "null")
								{
									isIndex = $.trim(isIndex);
								}
								else
								{
									isIndex = "";
								}

								if ((isnull != undefined && isnull != null) && isnull != "null")
								{
									isnull = $.trim(isnull);
								}
								else
								{
									isnull = "";
								}

								if ((t_tableField != undefined && t_tableField != null) && t_tableField != "null")
								{
									t_tableField = $.trim(t_tableField);
								}
								else
								{
									t_tableField = "";
								}

								if ((comboField != undefined && comboField != null) && comboField != "null")
								{
									comboField = $.trim(comboField);
								}
								else
								{
									comboField = "";
								}

								if ((mainIndex != undefined && mainIndex != null) && mainIndex != "null")
								{
									mainIndex = $.trim(mainIndex);
								}
								else
								{
									mainIndex = "";
								}

								console.log("fieldStr:%s", fieldStr);
								//console.log("t_tableField:%s", t_tableField);

								var recordJSONStr = "";
								if (fieldStr != "" && comboArray.indexOf(fieldStr) < 0)
								{
									var fieldObject = $("#" + fieldStr);
									var textField = "",
									fieldValue = "",
									fieldText = "";

									var ed = dataGrid.datagrid('getEditor',
										{
											index : window.rowIndex[gridName],
											field : fieldStr
										}
										);
									var fieldObjectClassName = fieldObject.attr("class");

									console.log("fieldObjectClassName:%s", fieldObjectClassName);

									if (isIndex == "1")
									{
										//如果是索引字段，则有可能数据来源于主表索引字段
										if (defaultValue != "")
										{
											//如果主索引字段有默认值，则以默认值为准
											if (ed != null && ed != undefined)
											{
												if ($(ed.target).textbox('getValue') == undefined || 
														$(ed.target).textbox('getValue') == null ||
														$(ed.target).textbox('getValue') == ""){
													console.log("编辑模式下此索引字段值为空！");
													
													$(ed.target).textbox('getValue', getDefaultValue(defaultValue));
												}

											}
										}
										else
										{
											if (((fieldObject != null && fieldObject != undefined) && (ed != null && ed != undefined)) &&
												(fieldObjectClassName != null && fieldObjectClassName != undefined))
											{
												//如果能找到字段对象，则取字段对象编辑框的值
												if (t_tableField != "" && (t_f_table != null && t_f_table != undefined))
												{
													//如果有带数据源的下拉列表框
													console.log("t_tableField:%s", t_tableField);
													for (var j = 0; j < t_f_table.length; j++)
													{
														var t_f_tableRow = t_f_table[j];
														var tem_t_f_table = t_f_tableRow.F_TABLE_FIELD;

														if (tem_t_f_table == t_tableField)
														{
															var keyField = t_f_tableRow.KEY_FIELD;
															var dispField = t_f_tableRow.DISP_FIELD;

															if ((dispField != null && dispField != undefined) && (dispField != "" && dispField != "null"))
															{
																textField = dispField;
															}

															if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
															{
																fieldValue = fieldObject.combobox('getValue');

																console.log("textField:%s", textField);
																var textObj = dataGrid.datagrid('getEditor',
																	{
																		index : window.rowIndex[gridName],
																		field : textField
																	}
																	);
																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		$(ed.target).combobox('setValue', "");
																		$(ed.target).combobox('setText', "");

																		if (textObj != null && textObj != undefined)
																		{
																			var textObjClass = $(textObj.target).attr("class");
																			if (textObjClass != null && textObjClass != undefined)
																			{
																				if (textObjClass.indexOf("textbox") >= 0)
																				{
																					$(textObj.target).textbox('setValue', "");
																				}
																			}

																			comboArray = comboArray + "," + textField;
																		}
																	}
																}
																else
																{
																	$(ed.target).combobox('setValue', fieldValue);
																	$(ed.target).combobox('setText', fieldObject.combobox('getText'));

																	if (textObj != null && textObj != undefined)
																	{
																		var textObjClass = $(textObj.target).attr("class");
																		if (textObjClass != null && textObjClass != undefined)
																		{
																			if (textObjClass.indexOf("textbox") >= 0)
																			{
																				$(textObj.target).textbox('setValue', fieldObject.combobox('getText'));
																			}
																		}

																		comboArray = comboArray + "," + textField;
																	}
																} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
															} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

															break;
														} //End of if (tem_t_f_table == t_tableField){
													} //End of for (var j = 0; j < t_f_table.length; j++){
												}
												else
												{
													if (comboField != "")
													{
														//如果是普通下拉列表框
														if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0)
														{
															//遍历所有界面列表字段配置信息，查找当前普通下拉列表框的配置取出关键字字段和显示字段名
															for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex++)
															{
																var comboColumn = comboColumns[comboIndex];

																if (comboColumn != undefined && comboColumn != null)
																{
																	var comboField = comboColumn.field;

																	if ((comboField != undefined && comboField != null) && comboField != "")
																	{
																		comboField = $.trim(comboField.toUpperCase());

																		if (comboField == fieldStr)
																		{
																			if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
																			{
																				var textField = comboColumn.editor.options.textField;

																				if (textField == null || textField == undefined || textField == "null")
																					textField = "";

																				fieldValue = fieldObject.combobox('getValue');

																				var textObj = dataGrid.datagrid('getEditor',
																					{
																						index : window.rowIndex[gridName],
																						field : textField
																					}
																					);
																				if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						$(ed.target).combobox('setValue', "");
																						$(ed.target).combobox('setText', "");

																						if (textObj != null && textObj != undefined)
																						{
																							var textObjClass = $(textObj.target).attr("class");
																							if (textObjClass != null && textObjClass != undefined)
																							{
																								if (textObjClass.indexOf("textbox") >= 0)
																								{
																									$(textObj.target).textbox('setValue', "");
																								}
																							}

																							comboArray = comboArray + "," + textField;
																						}
																					}
																				}
																				else
																				{
																					$(ed.target).combobox('setValue', fieldValue);
																					$(ed.target).combobox('setText', fieldObject.combobox('getText'));

																					if (textObj != null && textObj != undefined)
																					{
																						var textObjClass = $(textObj.target).attr("class");
																						if (textObjClass != null && textObjClass != undefined)
																						{
																							if (textObjClass.indexOf("textbox") >= 0)
																							{
																								$(textObj.target).textbox('setValue', fieldObject.combobox('getText'));
																							}
																						}

																						comboArray = comboArray + "," + textField;
																					}
																				} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
																			} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

																			break;
																		} //End of if (comboField == fieldStr){
																	} //End of if ((comboField != undefined && comboField != null) && comboField != ""){
																} //End of if (comboColumn != undefined && comboColumn != null){
															} //End of for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex ++){
														} //End of if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0){
													}
													else
													{
														//如果为非下拉列表框，则按字段数值类型来判断当前字段的数值合法性及填充值
														if (fieldType.indexOf("DATE") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-datebox") >= 0)
															{
																fieldValue = fieldObject.datebox('getValue');

																if (fieldType.indexOf("DATETIME") >= 0)
																{
																	if (!isDateTime(fieldValue))
																	{
																		if (!isDate(fieldValue))
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期时间型格式，请重新录入！", "E");
																			canSave = false;
																			return;
																		}
																	}

																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).textbox('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).textbox('setValue', fieldValue);
																	}

																}
																else
																{
																	if (fieldType.indexOf("DATE") >= 0)
																	{
																		if (!isDate(fieldValue))
																		{
																			if (!isDateTime(fieldValue))
																			{
																				dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期型格式，请重新录入！", "E");
																				canSave = false;
																				return;
																			}

																		}

																		if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																		{
																			if (isnull != "1")
																			{
																				dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																				canSave = false;
																				return;
																			}
																			else
																			{
																				$(ed.target).textbox('setValue', "");
																			}
																		}
																		else
																		{
																			$(ed.target).textbox('setValue', fieldValue);
																		}

																	} //End of if (fieldType.indexOf("DATETIME") >= 0){
																} //End of if (fieldType.indexOf("DATETIME") >= 0){
															} //End of if (fieldObject.attr("class").indexOf("easyui-datebox") >= 0){
														}
														else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberbox('getValue');

																if (!isFloat(fieldValue))
																{
																	dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确数值格式，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).numberbox('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).numberbox('setValue', fieldValue);
																	}
																}
															}
														}
														else if (fieldType.indexOf("INT") >= 0 || fieldType.indexOf("TINYINT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberspinner('getValue');

																if (!isInt(fieldValue))
																{
																	dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确整数数据，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).numberspinner('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).numberspinner('setValue', fieldValue);
																	}
																}
															}
														}
														else
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.textbox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		$(ed.target).textbox('setValue', "");
																	}
																}
																else
																{
																	$(ed.target).textbox('setValue', fieldValue);
																}
															}
														} //End of if (fieldType.indexOf("DATE") >= 0){
													} //End of if (comboField != ""){
												} //End of if (t_tableField != "" && (t_f_table != null && t_f_table != undefined)){
											}
											else
											{
												if (mainIndex != "")
												{
													fieldValue = mainRow[mainIndex];
												}
												else
												{
													fieldValue = mainRow[fieldStr];
												}
												$(ed.target).textbox('setValue', fieldValue);
											} //End of if (fieldObject != null && fieldObject != undefined){
										} //End of if (defaultValue != ""){
									}
									else
									{
										//如果是普通字段，则按普通字段进行数据填充
										if (defaultValue != "")
										{
											//如果有默认值，则以默认值为准
											if (ed != null && ed != undefined)
											{
												$(ed.target).textbox('setValue', getDefaultValue(defaultValue));
											}
										}
										else
										{
											if (((fieldObject != null && fieldObject != undefined) && (ed != null && ed != undefined)) &&
												(fieldObjectClassName != null && fieldObjectClassName != undefined))
											{
												//如果能找到字段对象，则取字段对象编辑框的值
												if (t_tableField != "" && (t_f_table != null && t_f_table != undefined))
												{
													//如果有带数据源的下拉列表框
													for (var j = 0; j < t_f_table.length; j++)
													{
														var t_f_tableRow = t_f_table[j];
														var tem_t_f_table = t_f_tableRow.F_TABLE_FIELD;

														console.log("t_f_tableRow:%s", JSONToStr(t_f_tableRow));
														console.log("t_tableField:%s", t_tableField);
														console.log("tem_t_f_table:%s", tem_t_f_table);

														if (tem_t_f_table == t_tableField)
														{
															var keyField = t_f_tableRow.KEY_FIELD;
															var dispField = t_f_tableRow.DISP_FIELD;

															console.log("dispField:%s", dispField);

															if ((dispField != null && dispField != undefined) && (dispField != "" && dispField != "null"))
															{
																textField = dispField;
															}

															console.log("textField:%s", textField);

															if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
															{
																fieldValue = fieldObject.combobox('getValue');

																console.log("textField:%s", textField);

																var textObj = dataGrid.datagrid('getEditor',
																	{
																		index : window.rowIndex[gridName],
																		field : textField
																	}
																	);
																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		$(ed.target).combobox('setValue', "");
																		$(ed.target).combobox('setText', "");

																		if (textObj != null && textObj != undefined)
																		{
																			var textObjClass = $(textObj.target).attr("class");
																			if (textObjClass != null && textObjClass != undefined)
																			{
																				if (textObjClass.indexOf("textbox") >= 0)
																				{
																					$(textObj.target).textbox('setValue', "");
																				}
																			}

																			comboArray = comboArray + "," + textField;
																		}
																	}
																}
																else
																{
																	$(ed.target).combobox('setValue', fieldValue);
																	$(ed.target).combobox('setText', fieldObject.combobox('getText'));

																	if (textObj != null && textObj != undefined)
																	{
																		var textObjClass = $(textObj.target).attr("class");
																		//console.log("textObjClass:%s",  textObjClass);
																		if (textObjClass != null && textObjClass != undefined)
																		{
																			if (textObjClass.indexOf("textbox") >= 0)
																			{
																				//console.log("textField Value:%s",  fieldObject.combobox('getText'));
																				$(textObj.target).textbox('setValue', fieldObject.combobox('getText'));
																			}
																		}

																		comboArray = comboArray + "," + textField;
																	}
																} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
															} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

															break;
														} //End of if (tem_t_f_table == t_tableField){
													} //End of for (var j = 0; j < t_f_table.length; j++){
												}
												else
												{
													//如果为普通下拉列表框
													if (comboField != "")
													{
														//遍历所有界面列表字段配置信息，查找当前普通下拉列表框的配置取出关键字字段和显示字段名
														if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0)
														{
															for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex++)
															{
																var comboColumn = comboColumns[comboIndex];

																if (comboColumn != undefined && comboColumn != null)
																{
																	var comboField = comboColumn.field;

																	if ((comboField != undefined && comboField != null) && comboField != "")
																	{
																		comboField = $.trim(comboField.toUpperCase());

																		if (comboField == fieldStr)
																		{
																			if (fieldObjectClassName.indexOf("easyui-combobox") >= 0)
																			{
																				var textField = comboColumn.editor.options.textField;

																				if (textField == null || textField == undefined || textField == "null")
																					textField = "";

																				fieldValue = fieldObject.combobox('getValue');

																				var textObj = dataGrid.datagrid('getEditor',
																					{
																						index : window.rowIndex[gridName],
																						field : textField
																					}
																					);
																				if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																				{
																					if (isnull != "1")
																					{
																						dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																						fieldObject.focus().select();
																						ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																						canSave = false;
																						return;
																					}
																					else
																					{
																						$(ed.target).combobox('setValue', "");
																						$(ed.target).combobox('setText', "");

																						if (textObj != null && textObj != undefined)
																						{
																							var textObjClass = $(textObj.target).attr("class");
																							if (textObjClass != null && textObjClass != undefined)
																							{
																								if (textObjClass.indexOf("textbox") >= 0)
																								{
																									$(textObj.target).textbox('setValue', "");
																								}
																							}

																							comboArray = comboArray + "," + textField;
																						}
																					}
																				}
																				else
																				{
																					$(ed.target).combobox('setValue', fieldValue);
																					$(ed.target).combobox('setText', fieldObject.combobox('getText'));

																					if (textObj != null && textObj != undefined)
																					{
																						var textObjClass = $(textObj.target).attr("class");
																						if (textObjClass != null && textObjClass != undefined)
																						{
																							if (textObjClass.indexOf("textbox") >= 0)
																							{
																								$(textObj.target).textbox('setValue', fieldObject.combobox('getText'));
																							}
																						}

																						comboArray = comboArray + "," + textField;
																					}
																				} //End of if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null"){
																			} //End of if (fieldObject.attr("class").indexOf("easyui-combobox") >= 0){

																			break;
																		} //End of if (comboField == fieldStr){
																	} //End of if ((comboField != undefined && comboField != null) && comboField != ""){
																} //End of if (comboColumn != undefined && comboColumn != null){
															} //End of for (var comboIndex = 0; comboIndex < comboColumns.length; comboIndex ++){
														} //End of if ((comboColumns != undefined && comboColumns != null) && comboColumns.length > 0){
													}
													else
													{
														//如果为非下拉列表框，则按字段数值类型来判断当前字段的数值合法性及填充值
														if (fieldType.indexOf("DATE") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-datebox") >= 0)
															{
																fieldValue = fieldObject.datebox('getValue');

																if (fieldType.indexOf("DATETIME") >= 0)
																{
																	if (!isDateTime(fieldValue))
																	{
																		if (!isDate(fieldValue))
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期时间型格式，请重新录入！", "E");
																			canSave = false;
																			return;
																		}

																	}
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).textbox('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).textbox('setValue', fieldValue);
																	}

																}
																else
																{
																	if (fieldType.indexOf("DATE") >= 0)
																	{
																		if (!isDate(fieldValue))
																		{
																			if (!isDateTime(fieldValue))
																			{
																				dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "所录入数据[" + fieldValue + "]不为日期型格式，请重新录入！", "E");
																				canSave = false;
																				return;
																			}

																		}
																		if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																		{
																			if (isnull != "1")
																			{
																				dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																				fieldObject.focus().select();
																				ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																				canSave = false;
																				return;
																			}
																			else
																			{
																				$(ed.target).textbox('setValue', "");
																			}
																		}
																		else
																		{
																			$(ed.target).textbox('setValue', fieldValue);
																		}

																	} 
																} 
															} 
														}
														else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberbox('getValue');

																if (!isFloat(fieldValue))
																{
																	dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确数值格式，请重新录入！", "E");
																	canSave = false;
																	return; ;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).numberbox('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).numberbox('setValue', fieldValue);
																	}
																}
															}
														}
														else if (fieldType.indexOf("INT") >= 0 || fieldType.indexOf("TINYINT") >= 0)
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.numberspinner('getValue');

																if (!isInt(fieldValue))
																{
																	dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																	fieldObject.focus().select();
																	ShowMessage("错误...", fieldDesc + "所录入数据不是正确整数数据，请重新录入！", "E");
																	canSave = false;
																	return;
																}
																else
																{
																	if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																	{
																		if (isnull != "1")
																		{
																			dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																			fieldObject.focus().select();
																			ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																			canSave = false;
																			return;
																		}
																		else
																		{
																			$(ed.target).numberspinner('setValue', "");
																		}
																	}
																	else
																	{
																		$(ed.target).numberspinner('setValue', fieldValue);
																	}
																}
															}
														}
														else
														{
															if (fieldObjectClassName.indexOf("easyui-textbox") >= 0)
															{
																fieldValue = fieldObject.textbox('getValue');

																if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
																{
																	if (isnull != "1")
																	{
																		dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
																		fieldObject.focus().select();
																		ShowMessage("错误...", fieldDesc + "不允许为空！", "E");
																		canSave = false;
																		return;
																	}
																	else
																	{
																		$(ed.target).textbox('setValue', "");
																	}
																}
																else
																{
																	$(ed.target).textbox('setValue', fieldValue);
																}
															}
														} //End of if (fieldType.indexOf("DATE") >= 0){
													} //End of if (comboField != ""){
												} //End of if (t_tableField != "" && (t_f_table != null && t_f_table != undefined)){
											} //End of if (fieldObject != null && fieldObject != undefined){
										} //End of if (defaultValue != ""){
									} //End of if (isIndex == "1"){
								} //End of if (fieldStr != ""){
							} //End of for (var i = 0; i < dataGridColumns.length; i++){

							dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
						}
					}
				}
				);

				//删除按钮点击事件
				$('#btEditDelete').bind('click', function ()
				{
					var gridName = window.focusGrid;
					var uiColumins = null;
					var dataGrid = $("[id=" + gridName + "]");

					if (gridName == "mdataGrid")
					{
						//如果是多表窗体中的主表
						var dsUIs = window.dsUIAll.DSUI;

						if (dsUIs != null && dsUIs.length > 0)
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;

									//主表构建
									if (pageNo != undefined && pageNo == "0")
									{
										uiColumins = DSUIs.DSUI;
										break;
									}
								}
							}
						}
					}
					else if (gridName == "dtldataGrid")
					{
						//如果是多表窗体中的子表
						var dsUIs = window.dsUIAll.DSUI;

						if (dsUIs != null && dsUIs.length > 0)
						{
							for (var i = 0; i < dsUIs.length; i++)
							{
								var DSUIs = dsUIs[i];

								if (DSUIs != undefined && DSUIs != null)
								{
									var pageNo = DSUIs.PAGE_NO;

									//主表构建
									if (pageNo != undefined && pageNo == "1")
									{
										uiColumins = DSUIs.DSUI;
										break;
									}
								}
							}
						}
					}
					else
					{
						uiColumins = window.dsUIAll.DSUI;
					}

					var rows = dataGrid.datagrid('getSelections');
					if (uiColumins != null && rows.length > 0)
					{
						var tableName = uiColumins[0].TABLE_NAME;
						var pageName = uiColumins[0].PAGE_NAME;

						var sureMess = "确定删除所选择的" + rows.length + "条" + pageName + "数据吗？删除后将不可恢复！<br>[确定]删除，[取消]不删除";
						$.messager.confirm("提示", sureMess, function (r)
						{
							if (r)
							{
								var updateJSONArrayStr = "";
								//提取已选择的列表记录行并组织数据删除参数
								for (var i = rows.length - 1; i >= 0; i--)
								{
									var row = rows[i];

									var whereStr = " ID=" + row.ID;

									if ((row.ID != undefined && row.ID != null) && (row.ID != "" && row.ID != "null"))
									{
										if (updateJSONArrayStr != "")
										{
											updateJSONArrayStr = updateJSONArrayStr + ",{TABLE:\"" + tableName + "\",TYPE:\"DELETE\",FIELDS:null,WHERE:\"" + whereStr + "\"}";
										}
										else
										{
											updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"DELETE\",FIELDS:null,WHERE:\"" + whereStr + "\"}";
										}
									}
								}

								if (updateJSONArrayStr != "")
								{
									//如果数据已存储于数据库
									updateJSONArrayStr = "[" + updateJSONArrayStr + "]";

									var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + pageName + "\",UPDATELIST:" + updateJSONArrayStr 
									                          + ",USER_ID:\"" + localjsonObj.username 
									                          + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
									                          + "\"}";

									var params =
									{
										getObject : updateObject,
										errorMessage : ""
									};
									try
									{
										$.ajax(
										{
											url :ip+"updatedata",
											method : "POST",
											data : params,
											datatype : "json",
											async : false,
											success : function (data)
											{
												for (var i = rows.length - 1; i >= 0; i--)
												{
													var row = rows[i];

													var index = dataGrid.datagrid('getRowIndex', row);
													dataGrid.datagrid('cancelEdit', index).datagrid('deleteRow', index);
												}

												window.rowIndex[gridName] = -1;

												try
												{
													for (var i = 0; i < uiColumins.length; i++)
													{
														var fieldName = uiColumins[i].FIELD.toString().toUpperCase();
														var fieldObjectName = "#" + fieldName;
														var defaultValue = uiColumins[i].DEFAULT_VALUE;
														var fieldType = $.trim(uiColumins[i].FIELD_TYPE.toUpperCase());
														var relField = uiColumins[i].F_TABLE_FIELD;
														var comboField = uiColumins[i].COMBOBOX;

														var fieldValue = "";
														if ((defaultValue != null && defaultValue != undefined) && defaultValue != "null")
														{
															fieldValue = getDefaultValue(defaultValue);
														}

														if (fieldType.indexOf("DATE") >= 0)
														{
															$(fieldObjectName).datebox('setValue', fieldValue);
														}
														else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
														{
															$(fieldObjectName).numberbox('setValue', fieldValue);
														}
														else if (fieldType.indexOf("INT") >= 0)
														{
															if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
																(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
															{
																$(fieldObjectName).numberspinner('setValue', fieldValue);
															}
															else
															{
																$(fieldObjectName).combobox('setValue', fieldValue);
															}
														}
														else
														{
															if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
																(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
															{
																$(fieldObjectName).textbox('setValue', fieldValue);
															}
															else
															{
																$(fieldObjectName).combobox('setValue', fieldValue);
															}
														}
													}

													if (gridName == "mdataGrid")
													{
														$('#dtldataGrid').datagrid('loadData',
														{
															total : 0,
															rows : []
														}
														);
													}
												}
												catch (e)
												{
													ShowMessage("错误...", "清空编辑数据错误！" + e.description, "E");
												}

												ShowMessage("提示...", '删除' + pageName + '信息成功！', '');
											},
											error : function (errorMessage)
											{
												var errorMessageStr = errorMessage.errorMessage;
												ShowMessage("错误...", '删除' + pageName + '信息失败！' + errorMessageStr, "E");
											}
										}
										);
									}
									catch (e)
									{
										ShowMessage("错误...", '删除' + pageName + '信息失败！' + e.description, "E");
									}
								}
								else
								{
									//如果数据未存储于数据库
									for (var i = rows.length - 1; i >= 0; i--)
									{
										var row = rows[i];

										var index = dataGrid.datagrid('getRowIndex', rows[0]);
										dataGrid.datagrid('deleteRow', index);
									}

									window.rowIndex[gridName] = -1;

									try
									{
										for (var i = 0; i < uiColumins.length; i++)
										{
											var fieldName = uiColumins[i].FIELD.toString().toUpperCase();
											var fieldObjectName = "#" + fieldName;
											var defaultValue = uiColumins[i].DEFAULT_VALUE;
											var fieldType = $.trim(uiColumins[i].FIELD_TYPE.toUpperCase());
											var relField = uiColumins[i].F_TABLE_FIELD;
											var comboField = uiColumins[i].COMBOBOX;

											var fieldValue = "";
											if ((defaultValue != null && defaultValue != undefined) && defaultValue != "null")
											{
												fieldValue = getDefaultValue(defaultValue);
											}

											if (fieldType.indexOf("DATE") >= 0)
											{
												$(fieldObjectName).datebox('setValue', fieldValue);
											}
											else if (fieldType.indexOf("NUM") >= 0 || fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("FLOAT") >= 0)
											{
												$(fieldObjectName).numberbox('setValue', fieldValue);
											}
											else if (fieldType.indexOf("INT") >= 0)
											{
												if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
													(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
												{
													$(fieldObjectName).numberspinner('setValue', fieldValue);
												}
												else
												{
													$(fieldObjectName).combobox('setValue', fieldValue);
												}
											}
											else
											{
												if ((relField == undefined || relField == null || relField == "null" || relField == "") &&
													(comboField == undefined || comboField == null || comboField == "null" || comboField == ""))
												{
													$(fieldObjectName).textbox('setValue', fieldValue);
												}
												else
												{
													$(fieldObjectName).combobox('setValue', fieldValue);
												}
											}
										}

										if (gridName == "mdataGrid")
										{
											$('#dtldataGrid').datagrid('loadData',
											{
												total : 0,
												rows : []
											}
											);
										}
									}
									catch (e)
									{
										ShowMessage("错误...", "清空编辑数据错误！" + e.description, "E");
									}

									ShowMessage("提示...", '删除' + pageName + '信息成功！', '');
								}
							} 
						}
						); 
					} 
				}
				); 
			}
			); 

			$win.window('open');

			bodyRefresh($('#editPanel'));
			bodyRefresh($('#edit_tool_menuPanel'));

			
			ConstructComboBox(DSUIS.DSUI);
			

			
		}
		catch (e)
		{
			console.log("错误...", "数据编辑界面组建错误！" + e.description, "E");
		}
	}
	else
	{
		ShowMessage("错误...", "由于界面参数无效，无法组建窗体编辑界面！", "E");
	}
}

/*
 * 功能：进行数据查询
 * 参数：单表窗体，还是多表窗体
 * 			窗体所有参数的全局变更window.dsUIAll，分为DSUI窗体表结构参数，COLUMNS窗体列表参数和QUERYCOLUMNS查询列表参数，每一个参数为一个JSONArray
 * 返回：查询是否成功
 * 作者：李福明
 * 时间：2015-06-10
 */
function QueryData(frameType,querydicfieldname)
{
	var retFlag = false;
	var editable = false;
	var dataGrid = null;
   
	console.log("frameType:",frameType,"querydicfieldname:",querydicfieldname);
	if ((frameType.substring(0, 1).toUpperCase() == "S")&&(frameType.substring(0, 2).toUpperCase()!="SE"))
	{
		//取窗体表结构参数
		dsUI = window.dsUIAll.DSUI;
		//取查询区列表参数
		queryColumns = window.dsUIAll.QUERYCOLUMNS;

		console.log("window.dsUIAll.DSUI : %s", window.dsUIAll.DSUI);

		dataGrid = $("#dataGrid");

		if ((window.rowIndex["dataGrid"] != undefined && window.rowIndex["dataGrid"] != null) && (window.rowIndex["dataGrid"] != -1))
		{
			dataGrid.datagrid("endEdit", window.rowIndex["dataGrid"]);
		}

		var dataRows = dataGrid.datagrid('getChanges');
		
		console.log('dataRows:',dataRows);

		if ((dataRows != null && dataRows != undefined) && dataRows.length > 0)
		{
			editable = true;
		}
		
		console.log("111111111111111111111111111111111111111111");
	}
	/**
	 * 改动：如果是SE
	 * 2017-7-10
	 * **/
	else if (frameType.substring(0, 2).toUpperCase() == "SE")
	{
		//取窗体表结构参数
		dsUI = window.dsUIAll.DSUI;
		//取查询区列表参数
		queryColumns = window.dsUIAll.QUERYCOLUMNS;

		console.log("SE--window.dsUIAll.DSUI : %s", window.dsUIAll.DSUI);
		console.log("SE--queryColumns : %s", queryColumns);

		dataGrid = $("#dataGrid");

		if ((window.rowIndex["dataGrid"] != undefined && window.rowIndex["dataGrid"] != null) && (window.rowIndex["dataGrid"] != -1))
		{
			dataGrid.datagrid("endEdit", window.rowIndex["dataGrid"]);
		}

		var dataRows = dataGrid.datagrid('getChanges');

		if ((dataRows != null && dataRows != undefined) && dataRows.length > 0)
		{
			editable = true;
		}
		
		console.log("22222222222222222222222222222222222222");
	}
	
	else
	{
		//如果是多表窗体
		var dsUIs = window.dsUIAll.DSUI;

		if (dsUIs != null && dsUIs.length > 0)
		{
			for (var i = 0; i < dsUIs.length; i++)
			{
				var DSUIs = dsUIs[i];

				if (DSUIs != undefined && DSUIs != null)
				{
					var pageNo = DSUIs.PAGE_NO;

					//主表构建
					if (pageNo != undefined && pageNo == "0")
					{
						dsUI = DSUIs.DSUI;
						queryColumns = DSUIs.QUERYCOLUMNS;
						break;
					}
				}
			}
		}

		dataGrid = $("#mdataGrid");
		if ((window.rowIndex["mdataGrid"] != undefined && window.rowIndex["mdataGrid"] != null) && (window.rowIndex["mdataGrid"] != -1))
		{
			dataGrid.datagrid("endEdit", window.rowIndex["mdataGrid"]);
		}

		var dataRows = dataGrid.datagrid('getChanges');
		if (dataRows == null || dataRows.length == 0)
		{
			dataGrid = $("#dtldataGrid");
			if ((window.rowIndex["dtldataGrid"] != undefined && window.rowIndex["dtldataGrid"] != null) && (window.rowIndex["dtldataGrid"] != -1))
			{
				dataGrid.datagrid("endEdit", window.rowIndex["dtldataGrid"]);
			}

			dataRows = dataGrid.datagrid('getChanges');
			if ((dataRows != null && dataRows != undefined) && dataRows.length > 0)
			{
				editable = true;
			}
		}
		console.log("333333333333333333333333333333333");
	}

	if (editable == true)
	{
		$.messager.confirm("提示", "当前还有数据未保存，确定查询数据吗？[确定]查询但不保存数据，[取消]不查询进行数据保存操作", function (r)
		{
			if (r)
			{
				ExcuteQuery(dsUI, queryColumns, frameType);
				return;
			}
			else
			{
				return;
			}
		}
		);
		console.log("4444444444444444444444444444");
	}
	else
	{
		ExcuteQuery(dsUI, queryColumns, frameType);
		console.log("55555555555555555555555555");
	}

	return retFlag;
}
/*
 * 功能：进行数据查询实体方法
 * 参数：列表界面参数， 查询界面参数，单表窗体，还是多表窗体
 * 作者：李福明
 * 时间：2015-07-01
 */
function ExcuteQuery(dsUI, queryColumns, frameType)
{
	var whereStr = "";

	window.isInportData = "";
		
	console.log("frameType : %s",frameType);
	console.log("dsUI : %s",JSONToStr(dsUI));
	console.log("queryColumns : %s",JSONToStr(queryColumns));

	if (dsUI != null && dsUI.length > 0)
	{
		console.log("Come here!");

		var tableName = dsUI[0].TABLE_NAME;
		var pageName = dsUI[0].PAGE_NAME;

		if ((dsUI[0].INVENTED_TABLE != undefined && dsUI[0].INVENTED_TABLE != null) && dsUI[0].INVENTED_TABLE != "")
		{
			tableName = dsUI[0].INVENTED_TABLE;
		}
		
		if (tableName == undefined || tableName == null){
			ShowMessage("提示...", '界面参数待查询对象配置错误无法执行本次操作！', "");
			return;
		}

		//拼接WHERE语句
		try
		{
			if (queryColumns != null && queryColumns.length > 0)
			{
				for (var i = 0; i < queryColumns.length; i++)
				{
					var fieldStr = queryColumns[i].field;
					var fieldType = $.trim(queryColumns[i].field_type.toUpperCase());
					var frObjectName = "#fr_" + fieldStr;
					var toObjectName = "#to_" + fieldStr;

					var frValue = "";
					var toValue = "";
					//clx   查询类型
                    var queryType=queryColumns[i].querytype;
                    console.log("queryType:",queryType);
                    //下拉框查询
                    if(queryType=="2"){                                  
						frValue = $(frObjectName).combobox('getValue');
						toValue = $(toObjectName).combobox('getValue');
                    }
                    else if (fieldType.indexOf("DATE") >= 0)
					{
						frValue = $(frObjectName).datebox('getValue');
						toValue = $(toObjectName).datebox('getValue');
					}
					else
					{
						frValue = $(frObjectName).val();
						toValue = $(toObjectName).val();
					}
                    console.log("frValue:",frValue);
					if (frValue != null && frValue != "")
					{
						if (toValue != null && toValue != "")
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = " (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">='" + frValue + "' and " + fieldStr + "<='" + toValue + "')";
								}
								else
								{
									whereStr = " (" + fieldStr + ">='" + frValue + "' and " + fieldStr + "<='" + toValue + "')";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=" + frValue + " and " + fieldStr + "<=" + toValue + ")";
								}
								else
								{
									whereStr = " (" + fieldStr + ">=" + frValue + " and " + fieldStr + "<=" + toValue + ")";
								}
							}
						}
						else
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + frValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = "  (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + frValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + " like '%25" + frValue + "%25'";
								}
								else
								{
									whereStr = fieldStr + " like '%25" + frValue + "%25'";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + "=" + frValue;
								}
								else
								{
									whereStr = fieldStr + "=" + frValue;
								}
							}
						} //End of if (toValue != null && toValue != "")
					}
					else
					{
						if (toValue != null && toValue != "")
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + toValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = "  (" + fieldStr + ">=cast('" + toValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + " like '%25" + toValue + "%25'";
								}
								else
								{
									whereStr = fieldStr + " like '%25" + toValue + "%25'";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + "=" + toValue;
								}
								else
								{
									whereStr = fieldStr + "=" + toValue;
								}
							}
						} //End of if (toValue != null && toValue != "")
					} //End of if (frValue != null && frValue != "")
				} //End of for(var i = 0; i < queryColumns.length; i++)
			} //End of if (queryColumns != null && queryColumns.length > 0)
		}
		catch (e)
		{
			ShowMessage("错误...", '1111拼接查询条件错误！' + e.description, "E");
			return;
		}

		//拼接WHERE语句
		if (whereStr != "")
		{
			whereStr = " where (" + whereStr + ") ";
		}
		else
		{
			whereStr = " where 1=1 ";
		}
		if ((window.power != null && window.power != undefined) &&
			(window.power != "" && window.power != "null"))
		{
			whereStr = whereStr + " AND (" + window.power + ")";
		}
		if ((window.mainwhere != null && window.mainwhere != undefined) &&
			(window.mainwhere != "" && window.mainwhere != "null"))
		{
			whereStr = whereStr + " AND " + window.mainwhere;
		}

		var gridPageNo = -1;
		if (frameType == 'S' || frameType == 'SE' ){
			gridPageNo = $('#dataGrid').datagrid("getPager" ).data("pagination" ).options.pageNumber;
		}else{
			gridPageNo = $('#mdataGrid').datagrid("getPager" ).data("pagination" ).options.pageNumber;
		}
		if (gridPageNo == undefined || gridPageNo == null){
			gridPageNo = -1;
		}else{
			if (gridPageNo < 0) gridPageNo = 1;
		}
		
		window.prior_page_num = gridPageNo;
		
		var gridPageSize = 20;
		if (frameType == 'S' || frameType == 'SE' )
		{
			gridPageSize = $('#dataGrid').datagrid("getPager" ).data("pagination" ).options.pageSize;			
		}else{
			gridPageSize = $('#mdataGrid').datagrid("getPager" ).data("pagination" ).options.pageSize;	
		}
		if (gridPageSize == undefined || gridPageSize == null){
			gridPageSize = 20;
		}
		
		var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"" + tableName
			                             + "\",PARAMETER:\"\",WHERE:\""
			                             + whereStr 
			                             + "\",ORDER:\"\",TYPEDESC:\"" 
			                             + pageName 
			                             + "\",IS_GRID:\"1\",PAGE:\""
			                             + gridPageNo
			                             + "\",PAGE_SIZE:\""
			                             + gridPageSize
		                                 + "\",USER_ID:\"" + localjsonObj.username 
		                                 + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
		                                 + "\"}";
		var params =
		{
			getObject : getDataJsonString,
			errorMessage : ""
		};

		MessageUtil.Show(pageName + '信息查询中...');

		try
		{
			$.ajax(
			{
				url : ip+"getdata",
				method : "get",
				data : params,
				datatype : "json",
				success : function (data)
				{
					var jsonobj = JSON.parse(data); //获取到的列表数据
					if (frameType.substring(0, 1).toUpperCase() == "S")
					{
						window.data = jsonobj;
						console.log($('#dataGrid')[1])
						console.log($('#dataGrid')[0].outerHTML)
						$('#dataGrid').datagrid(
						{
							loadFilter : pagerSFilter
						}
						).datagrid('loadData', jsonobj);

						window.rowIndex["dataGrid"] = -1;
						console.log("jsonobj:",jsonobj);
						
						MessageUtil.Close();
					}
					else
					{
						window.data = jsonobj;
						
						$('#mdataGrid').datagrid(
						{
							loadFilter : pagerMFilter
						}
						).datagrid('loadData', jsonobj);

						$('#dtldataGrid').datagrid('loadData',
						{
							total : 0,
							rows : []
						}
						); //清空下方明细表

						$("#dtldataGrid").parent().find("tr[datagrid-row-index='0']").css(
						{
							"visibility" : "hidden"
						}
						);

						window.rowIndex["mdataGrid"] = -1;
						
						MessageUtil.Close();
					}
				},
				error : function (errorMessage)
				{
					MessageUtil.Close();
					ShowMessage("错误...", '未取到' + pageName + '信息！' + JSONToStr(errorMessage), "E");
					return;
				}
			}
			);
		}
		catch (e)
		{
			MessageUtil.Close();
			ShowMessage("错误...", '未取到' + pageName + '信息！' + e.description, "E");
			return;
		}
	}
}

/*
 * 功能：进行导入数据查询实体方法
 * 参数：列表界面参数， 数据查询名称，查询原始条件, 查询排序
 * 作者：李福明
 * 时间：2015-12-16
 */
function inportExcuteQuery(dsUI, pageName, where_str, orderStr)
{
	var whereStr = "";

	if (where_str == null || where_str == undefined || where_str == "null")
		where_str = "";
	if (orderStr == null || orderStr == undefined || orderStr == "null")
		orderStr = "";

	//console.log("frameType : %s",frameType);
	//console.log("dsUI : %s",JSONToStr(dsUI));

	if (dsUI != null && dsUI.length > 0)
	{
		//console.log("Come here!");

		var tableName = dsUI[0].TABLE_NAME;

		if ((dsUI[0].INVENTED_TABLE != undefined && dsUI[0].INVENTED_TABLE != null) && dsUI[0].INVENTED_TABLE != "")
		{
			tableName = dsUI[0].INVENTED_TABLE;
		}

		console.log("tableName : %s",tableName);

		var queryColumns = dsUI;

		//拼接WHERE语句
		try
		{
			if (queryColumns != null && queryColumns.length > 0)
			{
				for (var i = 0; i < queryColumns.length; i++)
				{
					var fieldStr = queryColumns[i].FIELD;
					var fieldType = queryColumns[i].FIELD_TYPE;
					var fieldQuery = queryColumns[i].QUERYTYPE;

					if (fieldType == null || fieldType == undefined || fieldType == "")
					{
						fieldType = "VARCHAR";
					}
					else
					{
						fieldType = $.trim(fieldType.toUpperCase());
					}

					if (fieldQuery != 1)
						continue;

					var frObjectName = "#fr_" + fieldStr;
					var toObjectName = "#to_" + fieldStr;

					if ($(frObjectName) == null || $(frObjectName) == undefined ||
						$(toObjectName) == null || $(toObjectName) == undefined)
					{
						continue;
					}

					var frValue = "";
					var toValue = "";

					if (fieldType.indexOf("DATE") >= 0)
					{
						frValue = $(frObjectName).datebox('getValue');
						toValue = $(toObjectName).datebox('getValue');
					}
					else
					{
						frValue = $(frObjectName).val();
						toValue = $(toObjectName).val();
					}

					if (frValue != null && frValue != "")
					{
						if (toValue != null && toValue != "")
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = " (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">='" + frValue + "' and " + fieldStr + "<='" + toValue + "')";
								}
								else
								{
									whereStr = " (" + fieldStr + ">='" + frValue + "' and " + fieldStr + "<='" + toValue + "')";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=" + frValue + " and " + fieldStr + "<=" + toValue + ")";
								}
								else
								{
									whereStr = " (" + fieldStr + ">=" + frValue + " and " + fieldStr + "<=" + toValue + ")";
								}
							}
						}
						else
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + frValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = "  (" + fieldStr + ">=cast('" + frValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + frValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + " like '%25" + frValue + "%25'";
								}
								else
								{
									whereStr = fieldStr + " like '%25" + frValue + "%25'";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + "=" + frValue;
								}
								else
								{
									whereStr = fieldStr + "=" + frValue;
								}
							}
						} //End of if (toValue != null && toValue != "")
					}
					else
					{
						if (toValue != null && toValue != "")
						{
							if (fieldType.indexOf("DATE") >= 0)
							{
								//如果是日期型
								if (whereStr != "")
								{
									whereStr = whereStr + " and (" + fieldStr + ">=cast('" + toValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
								else
								{
									whereStr = "  (" + fieldStr + ">=cast('" + toValue + " 00:00:00' as datetime) and " + fieldStr + "<=cast('" + toValue + " 23:59:59' as datetime))";
								}
							}
							else if (fieldType.indexOf("CHAR") >= 0)
							{
								//如果是字符型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + " like '%25" + toValue + "%25'";
								}
								else
								{
									whereStr = fieldStr + " like '%25" + toValue + "%25'";
								}
							}
							else
							{
								//如果是数值型
								if (whereStr != "")
								{
									whereStr = whereStr + " and " + fieldStr + "=" + toValue;
								}
								else
								{
									whereStr = fieldStr + "=" + toValue;
								}
							}
						} //End of if (toValue != null && toValue != "")
					} //End of if (frValue != null && frValue != "")
				} //End of for(var i = 0; i < queryColumns.length; i++)
			} //End of if (queryColumns != null && queryColumns.length > 0)
		}
		catch (e)
		{
			ShowMessage("错误...", '2222拼接查询条件错误！' + e.description, "E");
			return;
		}

		//console.log("tableName : %s",pageName);
		//console.log("whereStr : %s",whereStr);
		if ((where_str != null && where_str != undefined) && (where_str != "" && where_str != "null"))
		{
			if (whereStr != "")
			{
				whereStr = "(" + where_str + ") AND (" + whereStr + ")";
			}
			else
			{
				whereStr = where_str;
			}
		}

		var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"" + tableName
			                             + "\",PARAMETER:\"\",WHERE:\""
			                             + whereStr 
			                             + "\",ORDER:\"" + orderStr 
			                             + "\",PAGE:\"\",TYPEDESC:\"" + pageName 
			                             + "\",IS_GRID:\"1\","
		                                 + "USER_ID:\"" + localjsonObj.username 
		                                 + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
		                                 + "\"}";
		var params =
		{
			getObject : getDataJsonString,
			errorMessage : ""
		};
		try
		{
			$.ajax(
			{
				url :ip+"getdata",
				method : "POST",
				data : params,
				datatype : "json",
				success : function (data)
				{
					var jsonobj = JSON.parse(data); //获取到的列表数据
					$('#inpordGrid').datagrid(
					{
						loadFilter : pagerIFilter
					}
					).datagrid('loadData', jsonobj);
				},
				error : function (errorMessage)
				{
					ShowMessage("错误...", '未取到' + pageName + '信息！' + JSONToStr(errorMessage), "E");
					return;
				}
			}
			);
		}
		catch (e)
		{
			ShowMessage("错误...", '未取到' + pageName + '信息！' + e.description, "E");
			return;
		}
	}
}

/*
 * 功能：导入小窗体ACTIVE模式下的数据导入处理
 * 参数：业务类型，单表"S"还是多表"M"
 * 作者：李福明
 * 时间：2015-12-25
 */
function inportActiveExcute(BussType, className, funName, pageNo, pageName,
	winObj, buttonHtml, inportObjHtml, indexRowStr, inportDSUI)
{
	$(document).ready(function ()
	{
		$("#editPanel").empty();
		$('#edit_tool_menuPanel').empty();

		//按钮区域加入到页面
		console.log("buttonHtml:%s", buttonHtml);
		if (buttonHtml != "")
		{
			$('#edit_tool_menuPanel').append(buttonHtml);
		}

		//查询及列表区域加入到页面
		console.log("inportObjHtml:%s", inportObjHtml);
		if (inportObjHtml != "")
		{
			$('#editPanel').append(inportObjHtml);
		}

		//$("#editPanel").empty();
		//$('#edit_tool_menuPanel').empty();
		//构建导入窗体按钮事件
		$('#btEditSave').bind('click', function ()
		{
			//确定按钮点击事件
			console.log("pageNo:%s", pageNo);
			console.log("funName:%s", funName);
			console.log("indexRowStr:%s", indexRowStr);
			var indexRow = null;
			if (indexRowStr != "")
				indexRow = JSON.parse(indexRowStr);

			if (className == "ReadFile")
			{
				var resultDs = ReadFile.open(funName);
				console.log("resultDs:%s", resultDs);

				if (resultDs != null && resultDs != undefined)
				{
					try
					{
						var dataGrid = null;
						var inportOBJ = JSON.parse(resultDs);
						if (inportOBJ != null && inportOBJ != undefined)
						{
							var inportDs = inportOBJ.Rows;
							if ((inportDs != null && inportDs != undefined) && inportDs.length > 0)
							{
								console.log("inportDs:%s", JSONToStr(inportDs));

								if (BussType == "M")
								{
									if (pageNo == "0")
									{
										dataGrid = $('#mdataGrid');
									}
									else
									{
										dataGrid = $('#dtldataGrid');
									}
								}
								else
								{
									dataGrid = $('#dataGrid');
								}

								var inportDataStr = "";
								var inportIndexRowStr = "";
								for (var i = 0; i < inportDs.length; i++)
								{
									var inportRow = inportDs[i];
									var inportDataRow = "";
									var inportIndexSRowStr = "";
									var isOk = true;

									var rowInt = i + 1;

									console.log("inportRow:%s", JSONToStr(inportRow));
									for (var j = 0; j < inportDSUI.length; j++)
									{
										var inportDSUIRow = inportDSUI[j];
										var fieldStr = inportDSUIRow.FIELD;
										var fieldDesc = inportDSUIRow.FIELD_DESC;
										var isIndex = inportDSUIRow.ISINDEX;
										var mainIndex = inportDSUIRow.MAIN_INDEX;
										var defaultValue = inportDSUIRow.DEFAULT_VALUE;
										var fieldISNull = inportDSUIRow.ISNULL;
										var fieldType = inportDSUIRow.FIELD_TYPE;

										var fieldValue = "";

										if (fieldISNull == null || fieldISNull == undefined || fieldISNull == "null")
										{
											fieldISNull = "";
										}

										if (fieldType == null || fieldType == undefined || fieldType == "null")
										{
											fieldType = "VARCHAR";
										}

										if (isIndex == null || isIndex == undefined || isIndex == "null")
										{
											isIndex = "";
										}

										if (mainIndex == null || mainIndex == undefined || mainIndex == "null")
										{
											mainIndex = "";
										}

										if (defaultValue == null || defaultValue == undefined || defaultValue == "null")
										{
											defaultValue = "";
										}

										if (defaultValue == "")
										{
											//如果没有默认值
											if (isIndex == "1" && indexRow != null)
											{
												//如果是索引字段，则取主表索引行字段值
												if (mainIndex == "")
												{
													//如果没有主表索引解析字段
													fieldValue = indexRow[fieldStr];
												}
												else
												{
													fieldValue = indexRow[mainIndex];
												}

												if (fieldValue == null || fieldValue == undefined || fieldValue == "" || fieldValue == "null")
												{
													fieldValue = inportRow[fieldStr];
												}

												//记录索引字段值，以便进行数据重复核对
												if (inportIndexSRowStr == "")
												{
													inportIndexSRowStr = fieldStr + ":" + fieldValue;
												}
												else
												{
													inportIndexSRowStr = inportIndexSRowStr + "," + fieldStr + ":" + fieldValue;
												}
											}
											else
											{
												//如果不是索引字段，则取导入行字段值
												fieldValue = inportRow[fieldStr];
											}
										}
										else
										{
											//如果有默认值
											fieldValue = getDefaultValue(defaultValue);
										}

										if (fieldValue == null || fieldValue == undefined || fieldValue == "null")
										{
											fieldValue = "";
										}

										if (fieldISNull != "1" && fieldValue == "")
										{
											isOk = false;
											console.log("fieldStr:%s", fieldStr);
											console.log("fieldISNull:%s", fieldISNull);
											console.log("fieldValue:%s", fieldValue);
											console.log("inportRow:%s", JSONToStr(inportRow));

											//alert("第【" + rowInt + "】行“" + fieldDesc + "”列为空，但此字段不允许为空，请重新编辑文档再导入或重新选择另一个导入文件！");
											break;
										}

										if (fieldValue != "")
										{
											console.log("fieldStr:%s", fieldStr);
											console.log("fieldType:%s", fieldType);
											console.log("fieldISNull:%s", fieldISNull);
											console.log("fieldValue:%s", fieldValue);
											console.log("inportRow:%s", JSONToStr(inportRow));

											if (fieldType.indexOf("DATE") >= 0)
											{
												if (fieldType.indexOf("DATETIME") >= 0 && !isDateTime(fieldValue))
												{
													isOk = false;
													console.log("isDateTime(fieldValue):%s", isDateTime(fieldValue));
													//alert("第【" + rowInt + "】行“" + fieldDesc + "”列不是正确的日期时间型数值，请重新编辑文档再导入或重新选择另一个导入文件！");
													return;
												}
												else
												{
													if (fieldType.indexOf("TIME") < 0 && !isDate(fieldValue))
													{
														isOk = false;
														console.log("isDate(fieldValue):%s", isDate(fieldValue));
														alert("第【" + rowInt + "】行“" + fieldDesc + "”列不是正确的日期型数值，请重新编辑文档再导入或重新选择另一个导入文件！");
														return;
													}
												}
											}
											if ((fieldType.indexOf("DECIMAL") >= 0 || fieldType.indexOf("NUMERIC") >= 0 || fieldType.indexOf("FLOAT") >= 0) && !isFloat(fieldValue))
											{
												isOk = false;
												alert("第【" + rowInt + "】行“" + fieldDesc + "”列不是正确的数值数据，请重新编辑文档再导入或重新选择另一个导入文件！");
												return;
											}
											if (fieldType.indexOf("INT") >= 0 && !isInt(fieldValue))
											{
												isOk = false;
												alert("第【" + rowInt + "】行“" + fieldDesc + "”列不是正确的整数数据，请重新编辑文档再导入或重新选择另一个导入文件！");
												return;
											}
										}

										if (inportDataRow == "")
										{
											inportDataRow = "\"" + fieldStr + "\":\"" + fieldValue + "\"";
										}
										else
										{
											inportDataRow = inportDataRow + ",\"" + fieldStr + "\":\"" + fieldValue + "\"";
										}

										console.log("inportDataRow:%s", inportDataRow);
									} //End of for (var j = 0; j < inportDSUI.length; j++){

									if (isOk == false)
									{
										inportDataStr = "";
										break;
									}

									//按索引查询当前记录是否重复
									if (inportIndexSRowStr != "")
									{
										if (inportIndexRowStr.indexOf(inportIndexSRowStr) >= 0)
										{
											inportDataStr = "";
											alert("第【" + rowInt + "】行数据重复录入，请重新编辑文档再导入或重新选择另一个导入文件！");
											break;
										}
										else
										{
											if (inportIndexRowStr == "")
											{
												inportIndexRowStr = "{" + inportIndexSRowStr + "}";
											}
											else
											{
												inportIndexRowStr = inportIndexRowStr + ",{" + inportIndexSRowStr + "}";
											}
										}
									}

									if (inportDataRow != "")
									{
										if (inportDataStr != "")
										{
											inportDataStr = inportDataStr + ",{" + inportDataRow + "}";
										}
										else
										{
											inportDataStr = "[{" + inportDataRow + "}";
										}
									}
								} //End of for (var i = 0; i < inportDs.length; i++){

								if (inportDataStr != "")
								{
									inportDataStr = inportDataStr + "]";
									console.log("inportDataStr:%s", inportDataStr);
									var inportDataObj = JSON.parse(inportDataStr);

									if (inportDataObj != null && inportDataObj != undefined)
									{
										//如果是多表的明细数据，则清空待导入数据表格
										if (BussType == "M" && pageNo == "1")
										{
											dataGrid.datagrid('loadData',
											{
												total : 0,
												rows : []
											}
											);
										}
										//加载待导入数据到表格
										for (var i = 0; i < inportDataObj.length; i++)
										{
											var inportDataRow = inportDataObj[i];
											dataGrid.datagrid("appendRow", inportDataRow); //{status:'P'});
										}
										//dataGrid.datagrid('loadData', { total: 0, rows: inportDataObj});//清空下方DateGrid

										var rowCount = inportDataObj.length;

										alert("数据导入成功，共导入" + rowCount + "条" + pageName + "数据！");
									}
								}
							}
							else
							{
								alert(pageName + "无数据可供导入！");
							}
						}
					}
					catch (e)
					{
						alert(pageName + "数据导入出错！" + e.description);
					}
				} //End of if (resultDs != null && resultDs != undefined){
				//ShowMessage("导入数据...", resultDs, "");
			}
		}
		);
	}
	); //End of $(document).ready(function () {

	winObj.window('open');

	bodyRefresh($('#editPanel'));
	bodyRefresh($('#edit_tool_menuPanel'));

	window.isInportData = "1";
}

/*
 * 功能：导入小窗体确定按钮点击事件
 * 参数：业务类型，单表"S"还是多表"M"
 * 作者：李福明
 * 时间：2015-12-16
 */
function inportExcute(BussType)
{
	try
	{
		var inportSucc = true;

		if (BussType == "M")
		{
			//如果是多表业务
			if (window.dsUIAll != null && window.dsUIAll != undefined)
			{
				var newAddObj = window.dsUIAll.NEW_ADD;

				if (newAddObj != null && newAddObj != undefined)
				{
					var newaddArray = newAddObj.NEW_ADD;

					if (newaddArray != null && newaddArray != undefined)
					{
						var dsUI = window.dsUIAll.DSUI;
						if (dsUI != null && dsUI != undefined)
						{
							//记录主表当前记录数据，用来查询明细表数据
							var inportDs = null;
							var indexWhere = "";
							var indexValue = "";

							errMess = "";
							for (var j = 0; j < dsUI.length; j++)
							{
								var dsUIRecord = dsUI[j];
								var uiPageNo = dsUIRecord.PAGE_NO;
								var uiPageName = dsUIRecord.PAGE_NAME;
								var pageUI = dsUIRecord.DSUI;

								if (uiPageNo == "0")
								{
									//如果是主表数据，则直接从导入列表导入数据
									var uiPageNoTem = new String(uiPageNo);
									var uiPageNameTem = new String(uiPageName);
									var pageUIStr = new String(JSONToStr(pageUI));
									var pageUITem = JSON.parse(pageUIStr); 


									inportDs = $('#inpordGrid').datagrid('getSelected');

									if (inportDs != null && inportDs != undefined)
									{
										if (inportDs.length > 1 || inportDs.length <= 0)
										{
											inportSucc = false;
											ShowMessage("错误...", "【" + uiPageNameTem + "】导入数据必须选择一行而且只能选择一行！", "W");
											return;
										}
										else
										{
											var moduleStr = "";
											var funStr = "";
											var tableName = "";

											for (var i = 0; i < newaddArray.length; i++)
											{
												var newaddRecord = newaddArray[i];
												var pageNo = newaddRecord.PAGE_NO;

												if (pageNo == uiPageNoTem)
												{
													moduleStr = newaddRecord.MODULE;
													funStr = newaddRecord.FUN;
													tableName = newaddRecord.TABLE_NAME;

													if (moduleStr == null || moduleStr == undefined)
														moduleStr = "";
													if (funStr == null || funStr == undefined)
														funStr = "";
													if (tableName == null || tableName == undefined)
														tableName = "";

													break;
												}
											} 

											if ((moduleStr != "" && funStr != "") && tableName != "")
											{
												var newaddWhere = "MODULE='" + moduleStr + "' AND FUN='" + funStr + "' AND TABLE_NAME='" + tableName + "'";

												var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_NEW_ADD\",PARAMETER:\"\",WHERE:\""
													                             + newaddWhere + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" 
													                             + uiPageNameTem + "导入配置\",IS_GRID:\"2\","
													                             + "USER_ID:\"" + localjsonObj.username 
													                             + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
													                             + "\"}";

												var params =
												{
													getObject : getDataJsonString,
													errorMessage : ""
												};
												try
												{
													$.ajax(
													{
														url :ip+"getdata",
														method : "POST",
														data : params,
														datatype : "json",
														async : false,
														success : function (data)
														{
															var jsonobj = JSON.parse(data); //获取到的列表数据
															var defaultValueJSonStr = "";

															var indexValueStr = "";
															if (jsonobj != null && jsonobj != undefined)
															{
																//依据业务字段配置查找导入列表字段值
																if (pageUITem != null && pageUITem != undefined)
																{
																	for (var n = 0; n < pageUITem.length; n++)
																	{
																		var uiRecord = pageUITem[n];
																		var uiField = uiRecord.FIELD;
																		var defaultValue = uiRecord.DEFAULT_VALUE;
																		var uiFieldType = uiRecord.FIELD_TYPE;
																		var uiIsIndex = uiRecord.ISINDEX;
																		var uiMainIndex = uiRecord.MAIN_INDEX;

																		if (uiField == null && uiField == undefined)
																		{
																			uiField = "";
																		}

																		var fieldValue = "";
																		if (uiField != "")
																		{
																			if ((defaultValue != null && defaultValue != undefined) &&
																				(defaultValue != "" && defaultValue != "null"))
																			{
																				fieldValue = getDefaultValue(defaultValue);
																			}
																			else
																			{
																				for (var m = 0; m < jsonobj.length; m++)
																				{
																					var dataRecord = jsonobj[m];
																					var relField = dataRecord.REL_FIELD;
																					var facField = dataRecord.FIELD;
																					var isIndex = dataRecord.IS_INDEX;
																					var fieldType = dataRecord.FIELD_TYPE;

																					if (relField == null && relField == undefined)
																					{
																						relField = "";
																					}

																					if (fieldType == null || fieldType == undefined || fieldType == "")
																					{
																						fieldType = "VARCHAR";
																					}
																					else
																					{
																						fieldType = $.trim(fieldType.toUpperCase());
																					}

																					if (isIndex == "1")
																					{
																						var rowValue = inportDs[facField];
																						if (rowValue == null || rowValue == undefined)
																							rowValue = "";

																						//拼接主表索引查询条件，以便明细表数据导入查询
																						if (indexWhere == "")
																						{
																							if (fieldType.indexOf("DATE") >= 0)
																							{
																								if (rowValue != "")
																								{
																									indexWhere = facField + "=CAST('" + rowValue + "' AS DATETIME)";
																								}
																								else
																								{
																									indexWhere = facField + " IS NULL";
																								}
																							}
																							else if (fieldType.indexOf("CHAR") >= 0)
																							{
																								if (rowValue != "")
																								{
																									indexWhere = facField + "='" + rowValue + "'";
																								}
																								else
																								{
																									indexWhere = facField + " IS NULL";
																								}
																							}
																							else
																							{
																								if (rowValue != "")
																								{
																									indexWhere = facField + "=" + rowValue;
																								}
																								else
																								{
																									indexWhere = facField + " IS NULL";
																								}
																							} 
																						}
																						else
																						{
																							if (indexWhere.indexOf(facField) < 0)
																							{
																								if (fieldType.indexOf("DATE") >= 0)
																								{
																									if (rowValue != "")
																									{
																										indexWhere = indexWhere + " AND " + facField + "=CAST('" + rowValue + "' AS DATETIME)";
																									}
																									else
																									{
																										indexWhere = indexWhere + " AND " + facField + " IS NULL";
																									}
																								}
																								else if (fieldType.indexOf("CHAR") >= 0)
																								{
																									if (rowValue != "")
																									{
																										indexWhere = indexWhere + " AND " + facField + "='" + rowValue + "'";
																									}
																									else
																									{
																										indexWhere = indexWhere + " AND " + facField + " IS NULL";
																									}
																								}
																								else
																								{
																									if (rowValue != "")
																									{
																										indexWhere = indexWhere + " AND " + facField + "=" + rowValue;
																									}
																									else
																									{
																										indexWhere = indexWhere + " AND " + facField + " IS NULL";
																									}
																								} 
																							} 
																						} 
																					} 

																					if (relField.toUpperCase() == uiField.toUpperCase())
																					{
																						fieldValue = inportDs[facField];
																					}
																				}
																			} 

																			if (fieldValue == null || fieldValue == undefined)
																				fieldValue = "";

																			if (uiIsIndex == "1")
																			{
																				if (indexValueStr == "")
																				{
																					indexValueStr = "{\"" + uiField + "\":\"" + fieldValue + "\"";
																				}
																				else
																				{
																					indexValueStr = indexValueStr + ",\"" + uiField + "\":\"" + fieldValue + "\"";
																				}
																			}
																			else
																			{
																				if ((uiMainIndex != null && uiMainIndex != undefined) &&
																					(uiMainIndex != "" && uiMainIndex != "null"))
																				{
																					if (indexValueStr == "")
																					{
																						indexValueStr = "{\"" + uiMainIndex + "\":\"" + fieldValue + "\"";
																					}
																					else
																					{
																						indexValueStr = indexValueStr + ",\"" + uiMainIndex + "\":\"" + fieldValue + "\"";
																					}
																				}
																			}

																			if (defaultValueJSonStr == "")
																			{
																				defaultValueJSonStr = "\"" + uiField + "\":\"" + fieldValue + "\"";
																			}
																			else
																			{
																				defaultValueJSonStr = defaultValueJSonStr + ",\"" + uiField + "\":\"" + fieldValue + "\"";
																			}

																			console.log("defaultValueJSonStr:%s", defaultValueJSonStr);
																		}
																	} 
																} 
															} 

															console.log("All defaultValueJSonStr:%s", defaultValueJSonStr);

															if (indexValueStr != "")
															{
																indexValueStr = indexValueStr + "}";
																indexValue = JSON.parse(indexValueStr);
															}

															if (defaultValueJSonStr != "")
															{
																defaultValueJSonStr = "{" + defaultValueJSonStr + "}";
																try
																{
																	var defaultValueJSon = JSON.parse(defaultValueJSonStr);

																	console.log("Json convert over");

																	$('#mdataGrid').datagrid("appendRow", defaultValueJSon);

																	var rowLength = $('#mdataGrid').datagrid("getRows").length;

																	if ((rowLength != undefined && rowLength != null) && rowLength > 0)
																	{
																		$('#mdataGrid').datagrid("selectRow", rowLength - 1);
																	}
																	window.isInportData = "1";
																}
																catch (e)
																{
																	inportSucc = false;
																	ShowMessage("错误...", '导入【' + uiPageNameTem + '】数据错误，请确定格式是否正确！' + e.description, "E");
																	return;
																}
															}
														},
														error : function (errorMessage)
														{
															inportSucc = false;
															ShowMessage("错误...", '未取到【' + uiPageNameTem + '】导入配置信息！' + JSONToStr(errorMessage), "E");
															return;
														}
													}
													);
												}
												catch (e)
												{
													inportSucc = false;
													ShowMessage("错误...", '未取到【' + uiPageNameTem + '】导入配置信息！' + e.description, "E");
													return;
												}
											} 
										} 
									}
									else
									{
										inportSucc = false;
										ShowMessage("错误...", '请在列表中选择一行待导入的【' + uiPageNameTem + '】数据信息！', "W");
										return;
									} 
								}
								else
								{
									//如果是业务明细表
									if (indexValue != null && indexWhere != "")
									{
										var uiPageNoTem = new String(uiPageNo);
										var uiPageNameTem = new String(uiPageName);
										var pageUIStr = new String(JSONToStr(pageUI));
										var pageUITem = JSON.parse(pageUIStr); 

										var moduleStr = "";
										var funStr = "";
										var tableName = "";

										var dtlGrid = null;

										for (var i = 0; i < newaddArray.length; i++)
										{
											var newaddRecord = newaddArray[i];
											var pageNo = newaddRecord.PAGE_NO;

											if (pageNo == uiPageNoTem)
											{
												moduleStr = newaddRecord.MODULE;
												funStr = newaddRecord.FUN;
												tableName = newaddRecord.TABLE_NAME;

												if (moduleStr == null || moduleStr == undefined)
													moduleStr = "";
												if (funStr == null || funStr == undefined)
													funStr = "";
												if (tableName == null || tableName == undefined)
													tableName = "";

												break;
											}
										} 
										if ((moduleStr != "" && funStr != "") && tableName != "")
										{
											var newaddWhere = "MODULE='" + moduleStr + "' AND FUN='" + funStr + "' AND TABLE_NAME='" + tableName + "'";
											console.log("Detail where:%s", newaddWhere);

											var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_NEW_ADD\",PARAMETER:\"\",WHERE:\""
												                             + newaddWhere + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" 
												                             + uiPageNameTem + "导入配置\",IS_GRID:\"2\","
												                             + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
												                             + "\"}";

											var params =
											{
												getObject : getDataJsonString,
												errorMessage : ""
											};
											try
											{
												$.ajax(
												{
													url :ip+"getdata",
													method : "POST",
													data : params,
													datatype : "json",
													async : false,
													success : function (data)
													{
														var jsonobj = JSON.parse(data); //获取到的列表数据
														var defaultValueJSonStr = "[";
														var rowCount = 0;

														if ((jsonobj != null && jsonobj != undefined) && jsonobj.length > 0)
														{
															//依据业务字段配置查找导入列表字段值
															if (pageUITem != null && pageUITem != undefined)
															{
																if (uiPageNoTem == "1")
																{
																	dtlGrid = $("#dtldataGrid");
																}

																var dtlnewaddDtlObj = jsonobj[0];
																var dtlinventedTable = dtlnewaddDtlObj.INVENTED_TABLE;
																var dtltableName = dtlnewaddDtlObj.TABLE_NAME;
																var dtlinportTable = "";

																if (dtlinventedTable == null || dtlinventedTable == undefined || dtlinventedTable == "" || dtlinventedTable == "null")
																{
																	dtlinportTable = dtltableName;
																}
																else
																{
																	dtlinportTable = dtlinventedTable;
																}

																//按导入配置查询待导入明细数据
																var getdtlDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"" + dtlinportTable + "\",PARAMETER:\"\",WHERE:\""
																	                                 + indexWhere + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" 
																	                                 + uiPageNameTem + "导入数据\",IS_GRID:\"2\","
																	                                 + "USER_ID:\"" + localjsonObj.username 
																	                                 + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
																	                                 + "\"}";

																var dtlparams =
																{
																	getObject : getdtlDataJsonString,
																	errorMessage : ""
																};

																$.ajax(
																{
																	url :ip+"getdata",
																	method : "POST",
																	data : dtlparams,
																	datatype : "json",
																	async : false,
																	success : function (dtldata)
																	{
																		var dtlJson = JSON.parse(dtldata);

																		console.log("Detail data:%s", dtldata);

																		if (dtlJson != null && dtlJson != undefined)
																		{
																			//遍历所查的明细数据
																			rowCount = dtlJson.length;
																			if (rowCount == undefined)
																				rowCount = 0;

																			var dtlRecordStrs = "";
																			for (var r = 0; r < rowCount; r++)
																			{
																				var dtlRecordStr = "{";
																				var dtlRecord = dtlJson[r];

																				//按字段进行值替换
																				for (var n = 0; n < pageUITem.length; n++)
																				{
																					var uiRecord = pageUITem[n];
																					var uiField = uiRecord.FIELD;
																					var defaultValue = uiRecord.DEFAULT_VALUE;
																					var uiFieldType = uiRecord.FIELD_TYPE;
																					var uiIsIndex = uiRecord.ISINDEX;
																					var uiMainIndex = uiRecord.MAIN_INDEX;

																					if (uiField == null && uiField == undefined)
																					{
																						uiField = "";
																					}

																					var fieldValue = "";
																					if (uiField != "")
																					{
																						if ((defaultValue != null && defaultValue != undefined) &&
																							(defaultValue != "" && defaultValue != "null"))
																						{
																							fieldValue = getDefaultValue(defaultValue);
																						}
																						else
																						{
																							if (uiIsIndex == "1")
																							{
																								//如果是索引字段，则查看主表索引字段是否有此值
																								if ((uiMainIndex != null && uiMainIndex != undefined) &&
																									(uiMainIndex != "" && uiMainIndex != "null"))
																								{
																									//如果子表中索引字段与主表索引字段有对照字段，则取主表对应的字段值
																									fieldValue = indexValue[uiMainIndex];
																								}
																								else
																								{
																									fieldValue = indexValue[uiField];

																									if (fieldValue == null || fieldValue == undefined)
																									{
																										for (var m = 0; m < jsonobj.length; m++)
																										{
																											var dataRecord = jsonobj[m];
																											var relField = dataRecord.REL_FIELD;
																											var facField = dataRecord.FIELD;
																											var fieldType = dataRecord.FIELD_TYPE;

																											if (relField == null && relField == undefined)
																											{
																												relField = "";
																											}

																											if (fieldType == null || fieldType == undefined || fieldType == "")
																											{
																												fieldType = "VARCHAR";
																											}
																											else
																											{
																												fieldType = $.trim(fieldType.toUpperCase());
																											}

																											if (relField.toUpperCase() == uiField.toUpperCase())
																											{
																												//console.log("fieldType:%s", fieldType);
																												//console.log("relField:%s", relField);
																												//console.log("uiField:%s", uiField);

																												var fieldValue = "";
																												if ((defaultValue != null && defaultValue != undefined) &&
																													(defaultValue != "" && defaultValue != "null"))
																												{
																													fieldValue = getDefaultValue(defaultValue);
																												}
																												else
																												{
																													fieldValue = dtlRecord[facField];
																												}

																												//console.log("fieldValue:%s", fieldValue);

																												if (fieldValue == null && fieldValue == undefined)
																													fieldValue = "";

																											} 
																										} 
																									} 
																								} 
																							}
																							else
																							{
																								//按业务表与导入表对比字段进行导入字段替换，将导入表字段替换成业务表字段名
																								for (var m = 0; m < jsonobj.length; m++)
																								{
																									var dataRecord = jsonobj[m];
																									var relField = dataRecord.REL_FIELD;
																									var facField = dataRecord.FIELD;
																									var fieldType = dataRecord.FIELD_TYPE;

																									if (relField == null && relField == undefined)
																									{
																										relField = "";
																									}

																									if (fieldType == null || fieldType == undefined || fieldType == "")
																									{
																										fieldType = "VARCHAR";
																									}
																									else
																									{
																										fieldType = $.trim(fieldType.toUpperCase());
																									}

																									if (relField.toUpperCase() == uiField.toUpperCase())
																									{
																										//console.log("fieldType:%s", fieldType);
																										//console.log("relField:%s", relField);
																										//console.log("uiField:%s", uiField);

																										var fieldValue = "";
																										if ((defaultValue != null && defaultValue != undefined) &&
																											(defaultValue != "" && defaultValue != "null"))
																										{
																											fieldValue = getDefaultValue(defaultValue);
																										}
																										else
																										{
																											fieldValue = dtlRecord[facField];
																										}

																										//console.log("fieldValue:%s", fieldValue);

																										if (fieldValue == null && fieldValue == undefined)
																											fieldValue = "";

																									} //End of if (relField.FIELD.toUpperCase() == uiField.toUpperCase()){
																								} //End of for (var m = 0; m < jsonobj.length; m++){
																							} //End of if (uiIsIndex == "1"){
																						} //End of if ((defaultValue != null && defaultValue != undefined) &&

																						if (fieldValue == null || fieldValue == undefined)
																							fieldValue = "";

																						if (dtlRecordStr == "{")
																						{
																							dtlRecordStr = dtlRecordStr + "\"" + uiField + "\":\"" + fieldValue + "\"";
																						}
																						else
																						{
																							dtlRecordStr = dtlRecordStr + ",\"" + uiField + "\":\"" + fieldValue + "\"";
																						}
																					} //End of if (uiField != ""){
																				} //End of for (var n = 0; n < pageUI.length; n++){
																				dtlRecordStr = dtlRecordStr + "}";
																				console.log("dtlRecordStr:%s", dtlRecordStr);

																				if (dtlRecordStrs == "")
																				{
																					dtlRecordStrs = dtlRecordStr;
																				}
																				else
																				{
																					dtlRecordStrs = dtlRecordStrs + "," + dtlRecordStr;
																				}

																			} //End of for (var r = 0; r < dtlJson.length; r++){

																			if (defaultValueJSonStr == "[")
																			{
																				defaultValueJSonStr = defaultValueJSonStr + dtlRecordStrs;
																			}
																			else
																			{
																				defaultValueJSonStr = defaultValueJSonStr + "," + dtlRecordStrs;
																			}
																		} //End of if (dtlJson != null && dtlJson != undefined){
																	},
																	error : function (errorMessage)
																	{
																		inportSucc = false;
																		ShowMessage("错误...", '未取到【' + uiPageNameTem + '】导入信息！' + JSONToStr(errorMessage), "E");
																		return;
																	}
																}
																);
															} //End of if (pageUI != null && pageUI != undefined){
														} //End of if (jsonobj != null && jsonobj != undefined)

														//defaultValueJSonStr = "{\"total\":\"" + rowCount.toString() + "\",\"rows\":" + defaultValueJSonStr + "]}";
														defaultValueJSonStr = defaultValueJSonStr + "]";
														console.log("defaultValueJSon:%s", defaultValueJSonStr);

														if (defaultValueJSonStr != "[]")
														{
															try
															{
																var defaultValueJSon = JSON.parse(defaultValueJSonStr);
																if (dtlGrid != undefined && defaultValueJSon != undefined)
																{
																	//dtlGrid.datagrid('loadData', defaultValueJSon);

																	for (var r = 0; r < defaultValueJSon.length; r++)
																	{
																		var appendJSON = defaultValueJSon[r];
																		dtlGrid.datagrid("appendRow", appendJSON);
																	}

																	window.isInportData = "1";
																}
															}
															catch (e)
															{
																inportSucc = false;
																ShowMessage("错误...", '导入【' + uiPageNameTem + '】数据错误，请确定格式是否正确！', "E");
																return;
															}
														}
													},
													error : function (errorMessage)
													{
														inportSucc = false;
														ShowMessage("错误...", '未取到【' + uiPageNameTem + '】导入配置信息！' + JSONToStr(errorMessage), "E");
														return;
													}
												}
												);
											}
											catch (e)
											{
												inportSucc = false;
												ShowMessage("错误...", '未取到【' + uiPageNameTem + '】导入配置信息！' + e.description, "E");
												return;
											}
										} //End of if ((moduleStr != "" && funStr != "") && tableName != ""){
									} //End of if (inportDs != null && indexWhere != ""){
								} //End of if (uiPageNo == "0"){

								$('#editWindow').window('close');
							} //End of for (var j = 0; j < dsUI.length; j++){

							/*
							if (inportSucc){
							ShowMessage("错误...", '数据导入完毕！', "");
							}
							 */
						} //End of if (dsUI != null && dsUI != undefined){
					} //End of if (newaddArray != null && newaddArray != undefined)
				} //End of if (newAddObj != null && newAddObj != undefined){
			} //End of if (window.dsUIAll != null && window.dsUIAll != undefined){
		}
		else
		{
			//如果是单表业务
			if (window.dsUIAll != null && window.dsUIAll != undefined)
			{
				var newAddObj = window.dsUIAll.NEW_ADD;

				if (newAddObj != null && newAddObj != undefined)
				{
					var newaddArray = newAddObj.NEW_ADD;

					if (newaddArray != null && newaddArray != undefined)
					{
						var dsUI = window.dsUIAll.DSUI;
						if (dsUI != null && dsUI != undefined)
						{
							//记录主表当前记录数据，用来查询明细表数据
							var inportDs = null;
							var indexWhere = "";

							var dsUIRecord = dsUI;
							var uiPageNo = dsUIRecord.PAGE_NO;
							var uiPageName = dsUIRecord.PAGE_NAME;
							var pageUI = dsUIRecord.DSUI;

							if (uiPageNo == "0")
							{
								//如果是主表数据，则直接从导入列表导入数据
								inportDs = $('#inpordGrid').datagrid('getSelected');

								if (inportDs != null && inportDs != undefined)
								{
									if (inportDs.length <= 0)
									{
										inportSucc = false;
										ShowMessage("错误...", '【' + uiPageName + '】导入数据至少选择一行！', "W");
										return;
									}
									else
									{
										var moduleStr = "";
										var funStr = "";
										var tableName = "";

										for (var i = 0; i < newaddArray.length; i++)
										{
											var newaddRecord = newaddArray[i];
											var pageNo = newaddRecord.PAGE_NO;

											if (pageNo == uiPageNo)
											{
												moduleStr = newaddRecord.MODULE;
												funStr = newaddRecord.FUN;
												tableName = newaddRecord.TABLE_NAME;

												if (moduleStr == null || moduleStr == undefined)
													moduleStr = "";
												if (funStr == null || funStr == undefined)
													funStr = "";
												if (tableName == null || tableName == undefined)
													tableName = "";

												break;
											}
										} //End of for (var i = 0; i < newaddArray.length; i++){

										if ((moduleStr != "" && funStr != "") && tableName != "")
										{
											var newaddWhere = "MODULE='" + moduleStr + "' AND FUN='" + funStr + "' AND TABLE_NAME='" + tableName + "'";

											var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_NEW_ADD\",PARAMETER:\"\",WHERE:\""
												                             + newaddWhere + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" 
												                             + uiPageName + "导入配置\",IS_GRID:\"2\","
												                             + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
												                             + "\"}";

											var params =
											{
												getObject : getDataJsonString,
												errorMessage : ""
											};
											try
											{
												$.ajax(
												{
													url :ip+"getdata",
													method : "POST",
													data : params,
													datatype : "json",
													success : function (data)
													{
														var jsonobj = JSON.parse(data); //获取到的列表数据
														var defaultValueJSonStr = "[";
														var rowCount = inportDs.length;

														if (rowCount == undefined)
															rowCount = 0;

														if (jsonobj != null && jsonobj != undefined)
														{
															for (var i = 0; i < rowCount; i++)
															{
																var inportRow = inportDs[i];
																var dtlRowStr = "{";

																//依据业务字段配置查找导入列表字段值
																if (pageUI != null && pageUI != undefined)
																{
																	for (var n = 0; n < pageUI.length; n++)
																	{
																		var uiRecord = pageUI[n];
																		var uiField = uiRecord.FIELD;
																		var defaultValue = uiRecord.DEFAULT_VALUE;
																		var uiFieldType = uiRecord.FIELD_TYPE;

																		if (uiField == null && uiField == undefined)
																		{
																			uiField = "";
																		}

																		for (var m = 0; m < jsonobj.length; m++)
																		{
																			var dataRecord = jsonobj[m];
																			var relField = dataRecord.REL_FIELD;
																			var facField = dataRecord.FIELD;
																			var isIndex = dataRecord.IS_INDEX;
																			var fieldType = dataRecord.FIELD_TYPE;

																			if (relField == null && relField == undefined)
																			{
																				relField = "";
																			}

																			if (fieldType == null || fieldType == undefined || fieldType == "")
																			{
																				fieldType = "VARCHAR";
																			}
																			else
																			{
																				fieldType = $.trim(fieldType.toUpperCase());
																			}

																			if (isIndex == "1")
																			{
																				var rowValue = inportRow[facField];
																				if (rowValue == null || rowValue == undefined)
																					rowValue = "";

																				//拼接主表索引查询条件，以便明细表数据导入查询
																				if (indexWhere == "")
																				{
																					if (fieldType.indexOf("DATE") >= 0)
																					{
																						if (rowValue != "")
																						{
																							indexWhere = facField + "=CAST('" + rowValue + "' AS DATETIME)";
																						}
																						else
																						{
																							indexWhere = facField + " IS NULL";
																						}
																					}
																					else if (fieldType.indexOf("CHAR") >= 0)
																					{
																						if (rowValue != "")
																						{
																							indexWhere = facField + "='" + rowValue + "'";
																						}
																						else
																						{
																							indexWhere = facField + " IS NULL";
																						}
																					}
																					else
																					{
																						if (rowValue != "")
																						{
																							indexWhere = facField + "=" + rowValue;
																						}
																						else
																						{
																							indexWhere = facField + " IS NULL";
																						}
																					} //End of 	if (fieldType.indexOf("DATE") >= 0){
																				}
																				else
																				{
																					if (fieldType.indexOf("DATE") >= 0)
																					{
																						if (rowValue != "")
																						{
																							indexWhere = indexWhere + " AND " + facField + "=CAST('" + rowValue + "' AS DATETIME)";
																						}
																						else
																						{
																							indexWhere = indexWhere + " AND " + facField + " IS NULL";
																						}
																					}
																					else if (fieldType.indexOf("CHAR") >= 0)
																					{
																						if (rowValue != "")
																						{
																							indexWhere = indexWhere + " AND " + facField + "='" + rowValue + "'";
																						}
																						else
																						{
																							indexWhere = indexWhere + " AND " + facField + " IS NULL";
																						}
																					}
																					else
																					{
																						if (rowValue != "")
																						{
																							indexWhere = indexWhere + " AND " + facField + "=" + rowValue;
																						}
																						else
																						{
																							indexWhere = indexWhere + " AND " + facField + " IS NULL";
																						}
																					} //End of 	if (fieldType.indexOf("DATE") >= 0){
																				} //End of if (indexWhere == ""){
																			} //End of if (isIndex == "1"){

																			if (relField.toUpperCase() == uiField.toUpperCase())
																			{
																				var fieldValue = "";
																				if ((defaultValue != null && defaultValue != undefined) &&
																					(defaultValue != "" && defaultValue != "null"))
																				{
																					fieldValue = getDefaultValue(defaultValue);
																				}
																				else
																				{
																					fieldValue = inportRow[facField];
																				}

																				if (fieldValue == null && fieldValue == undefined)
																					fieldValue = "";

																				if (dtlRowStr == "{")
																				{
																					dtlRowStr = dtlRowStr + "\"" + uiField + "\":\"" + fieldValue + "\"";
																				}
																				else
																				{
																					dtlRowStr = dtlRowStr + ",\"" + uiField + "\":\"" + fieldValue + "\"";
																				}

																				console.log("defaultValueJSonStr:%s", dtlRowStr);
																			}
																		} //End of for (var m = 0; m < jsonobj.length; m++){
																	} //End of for (var n = 0; n < pageUI.length; n++){
																} //End of if (pageUI != null && pageUI != undefined){

																if (dtlRowStr != "{")
																{
																	if (defaultValueJSonStr == "[")
																	{
																		defaultValueJSonStr = defaultValueJSonStr + dtlRowStr + "}";
																	}
																	else
																	{
																		defaultValueJSonStr = defaultValueJSonStr + "," + dtlRowStr + "}";
																	}
																}
															} //End of for (var i = 0; i < rowCount; i++){
														} //End of if (jsonobj != null && jsonobj != undefined)

														console.log("All defaultValueJSonStr:%s", defaultValueJSonStr);

														if (defaultValueJSonStr != "")
														{
															defaultValueJSonStr = "{\"total\":\"" + rowCount.toString() + "\",\"rows\":" + defaultValueJSonStr + "]}";
															try
															{
																var defaultValueJSon = JSON.parse(defaultValueJSonStr);
																$('#dataGrid').datagrid('loadData', defaultValueJSon);

																$('#editWindow').window('close');
															}
															catch (e)
															{
																inportSucc = false;
																ShowMessage("错误...", '导入【' + uiPageName + '】数据错误，请确定格式是否正确！', "E");
																return;
															}
														}
													},
													error : function (errorMessage)
													{
														inportSucc = false;
														ShowMessage("错误...", '未取到【' + uiPageName + '】导入配置信息！' + JSONToStr(errorMessage), "E");
														return;
													}
												}
												);
											}
											catch (e)
											{
												inportSucc = false;
												ShowMessage("错误...", '未取到【' + uiPageName + '】导入配置信息！' + e.description, "E");
												return;
											}
										} 
									} 
								}
								else
								{
									inportSucc = false;
									ShowMessage("错误...", '还未查询获取【' + uiPageName + '】导入数据信息！', "W");
									return;
								} 	
							} 
						}
					} 
				} 
			} 
		} 
	}
	catch (e)
	{
		ShowMessage("错误...", '复制导入数据出错！' + e.description, "E");
	}
}

/*
 * 功能：报表打印按钮点击事件
 * 参数：业务类型
 * 作者：李福明
 * 时间：2016-02-22
 */
function reportPrint(BussType)
{
	console.log("BussTypd:%s", BussType);

	var buttonHtml = "<a id=\"btEditClose\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-cancel'\" onclick=\"$('#editWindow').window('close')\">退出</a>";
	var subHtml = "<span style=\"color:#818181\">&nbsp;|&nbsp;</span>";

	var printObjHtml = "";
	var printJSON = "";
	var rowTotal = "";
	var printObjName = "";

	var printDesc = "";

	console.log("window.PRINT:%s", window.PRINT);

	var printPara = window.PRINT;
	var printComID = "";
	var printComName = "";
	var printNode = "";

	var objWidth = "300px";
	var objHeight = "300px";

	var printArray = printPara.split("|");
	if ((printArray != null && printArray != undefined) && printArray.length == 2)
	{
		printComID = printArray[0];
		printComName = "ReportPrint";
		printNode = printArray[1];
	}

	console.log("printComID:%s", printComID);
	console.log("printComName:%s", printComName);
	console.log("printNode:%s", printNode);

	if ((printComID == null || printComID == undefined || printComID == "") ||
		(printComName == null || printComName == undefined || printComName == "") ||
		(printNode == null || printNode == undefined || printNode == ""))
	{
		console.log("Print parameter error!");
		ShowMessage("错误...", "打印控件参数错误！", "W");
		return;
	}

	var ocxName = "";

	if (printComName == "ReportPrint")
		ocxName = printComName + ".Print";

	console.log("ocxName:%s", ocxName);

	if (ocxName == "")
	{
		ShowMessage("错误...", "打印控件【" + printComName + "】不匹配！", "W");
		return;
	}
	else
	{
		if (!isOCXExists(ocxName))
		{
			ShowMessage("错误...", "打印控件【" + printComName + "】未安装，请下载安装控件！", "W");
			return;
		}
		else
		{
			console.log(printComName + "打印已安装！");
		}
	}

	if (BussType == "S")
	{
		var DSUI = window.dsUIAll.DSUI;
		var pageName = DSUI[0].PAGE_NAME;
		printObjName = DSUI[0].TABLE_NAME;
		if (printObjName == null || printObjName == undefined)
		{
			printObjName = pageName;
		}

		printDesc = pageName + "打印";

		var mainDs = $('#dataGrid').datagrid('getRows');

		if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0)
		{
			ShowMessage("错误...", pageName + "无数据可供打印！", "W");

			return;
		}
		else
		{
			rowTotal = mainDs.length.toString();

			printJSON = "{\"Total\":\"" + rowTotal + "\",\"tableName\":\"" + printObjName + "\",\"Rows\":"
				 + JSON.stringify(mainDs)
				 + "}";
		}
	}
	else
	{
		var mainDs = $('#mdataGrid').datagrid('getSelected');
		var detailDs = $('#dtldataGrid').datagrid('getRows');

		var mainPageName = "";
		var pageName = "";
		var mainDSUI = null;

		var DSUI = window.dsUIAll.DSUI;
		for (var i = 0; i < DSUI.length; i++)
		{
			var DSUIRow = DSUI[i];
			var page_no = DSUIRow.PAGE_NO;

			if (page_no == "0")
			{
				mainPageName = DSUIRow.PAGE_NAME;
				printObjName = DSUIRow.COLUMNS[0].TABLE_NAME;
				mainDSUI = DSUIRow.COLUMNS;
			}
			else
			{
				pageName = DSUIRow.PAGE_NAME;
			}
		} //End of for (var i = 0; i < DSUI.length; i++){

		if (mainPageName == null || mainPageName == undefined || mainPageName == "" || mainPageName == "null")
		{
			mainPageName = "主表数据";
		}

		if (pageName == null || pageName == undefined || pageName == "" || pageName == "null")
		{
			pageName = "明细表数据";
		}

		if (printObjName == null || printObjName == undefined)
		{
			printObjName = mainPageName;
		}

		printDesc = mainPageName + "打印";

		if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0)
		{
			ShowMessage("错误...", mainPageName + "无数据可供打印！", "W");

			return;
		}
		else
		{
			if (mainDSUI != null && mainDSUI != undefined)
			{
				for (var i = 0; i < mainDSUI.length; i++)
				{
					var mainDSUIRow = mainDSUI[i];
					var fieldName = mainDSUIRow.field;
					var fieldDesc = mainDSUIRow.title;
					var fieldValue = "";

					if (fieldName != null && fieldName != undefined)
					{
						fieldValue = mainDs[fieldName];

						if (fieldValue == null || fieldValue == undefined || fieldValue == "null")
						{
							fieldValue = "";
						}
					}

					if (printJSON == "")
					{
						printJSON = "\"" + fieldName + "\":\"" + fieldValue + "\"";
					}
					else
					{
						printJSON = printJSON + ",\"" + fieldName + "\":\"" + fieldValue + "\"";
					}
				}
			}
			else
			{
				ShowMessage("错误...", mainPageName + "列参数提取错误！", "W");

				return;
			}
		}

		if ((detailDs == null || detailDs == undefined) || detailDs.length <= 0)
		{
			ShowMessage("错误...", pageName + "无数据可供打印！", "W");

			return;
		}
		else
		{
			rowTotal = detailDs.length.toString();

			if (printJSON != "")
			{
				printJSON = "{\"Total\":\"" + rowTotal + "\",\"tableName\":\"" + printObjName + "\"," + printJSON
					 + ",\"Rows\":" + JSON.stringify(detailDs)
					 + "}";
			}
			else
			{
				ShowMessage("错误...", mainPageName + "数据提取错误！", "W");

				return;
			}
		}
	}

	if (printJSON != "")
	{
		var objHtml = "<OBJECT ID='" + printComName + "' STYLE='WIDTH:" + objWidth + ";HEIGHT:" + objHeight + "'  CLASSID='CLSID:" + printComID + "'></OBJECT>";

		/*
		buttonHtml = buttonHtml + subHtml
		+ "<a id=\"btOK\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-inport'\">确定</a>";
		 */

		printObjHtml = printObjHtml + "<div  id='inportPanel'  class='easyui-layout' data-options='fit:true' style='padding:0px; height:inherit; width:100%; border:0px;'>";
		printObjHtml = printObjHtml + "<div data-options=\"region:'center',split:true,border:false\" style='border:0px; padding:0px; overflow-x: hidden; overflow-y: hidden;'>";
		printObjHtml = printObjHtml + objHtml + "</div></div>";

		//console.log(objHtml);

		var winWidth = 300;
		var winHeight = 225;

		var $win;
		$win = $('#editWindow').window(
			{
				title : printDesc,
				width : winWidth,
				height : winHeight,
				top : ($(window).height() - winHeight) * 0.5,
				left : ($(window).width() - winWidth) * 0.5,
				shadow : true,
				modal : true,
				iconCls : 'icon-print',
				closed : true,
				minimizable : false,
				maximizable : false,
				collapsible : false,
				onClose : function ()  {}
			}
			); //End of $win = $('#editWindow').window({

		$(document).ready(function ()
		{
			$("#editPanel").empty();
			$('#edit_tool_menuPanel').empty();

			//按钮区域加入到页面
			console.log("buttonHtml:%s", buttonHtml);
			if (buttonHtml != "")
			{
				$('#edit_tool_menuPanel').append(buttonHtml);
			}

			//查询及列表区域加入到页面
			console.log("printObjHtml:%s", printObjHtml);
			if (printObjHtml != "")
			{
				$('#editPanel').append(printObjHtml);
			}

			/*
			//构建导入窗体按钮事件
			$('#btOK').bind('click', function(){
			//确定按钮点击事件
			ReportPrint.open(printJSON,printNode);
			});
			 */
		}
		); //End of $(document).ready(function () {

		$win.window('open');
		ReportPrint.open(printJSON, printNode);

		bodyRefresh($('#editPanel'));
		bodyRefresh($('#edit_tool_menuPanel'));
	}
}

/*
 * 功能：标签打印按钮点击事件
 * 参数：业务类型
 * 作者：陈立新
 * 时间：2016-03-16
 */
function labelPrint(BussType){
	console.log("BussTypd:%s", BussType);
	
	var buttonHtml = "<a id=\"btLabelClose\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-cancel'\" onclick=\"$('#editWindow').window('close')\">退出</a>";
	var subHtml = "<span style=\"color:#818181\">&nbsp;|&nbsp;</span>";
	
	var labelPara=window.dsUIAll.BARCODE;
	var labelTbaleName="";
	var labelFileName="";
	var labelComName="BarcodePrint";
	var labelPrintID="";     //"9BB0E70B-9F0C-468c-BE97-BF475852ADE8";
	
	var printDesc="标签打印";
	var printObjHtml = "";
	
	var printJSON="";
	var printNode="";
	
	var dataJSON="";
	
	var bar=labelPara[0].BARCODE.split('|');
	if(bar.length==2){
		labelFileName=bar[0];
		labelPrintID=bar[1];
	}
	else{
		ShowMessage("错误...", "标签打印参数配置错误！", "W");
		return;
	}
	//标签文件名
	console.log("labelFileName:%s",labelFileName);
	//控件ID
	console.log("labelPrintID:%s",labelPrintID);
	//标记
	printNode=labelPara[0].FUN;
	console.log("printNode:%s",printNode);
	//表名
	labelTableName=labelPara[0].TABLENAME;
	console.log("labelTableName:%s",labelTableName);
		
	var objWidth = "550px";
	var objHeight = "450px";
	
	if ((labelFileName == null || labelFileName == undefined || labelFileName == "")||(labelTableName == null || labelTableName == undefined || labelTableName == "")){
		console.log("Print parameter error!");
		ShowMessage("错误...", "标签打印控件参数错误！", "W");
		return;
	}
	
	var ocxName = "";
	
	if (labelComName == "BarcodePrint") ocxName = labelComName + ".Barcode";
	
	console.log("ocxName:%s", ocxName);
	
	if (ocxName == ""){
		ShowMessage("错误...", "打印控件【" + labelComName + "】不匹配！", "W");
		return;
	}else{
		if (!isOCXExists(ocxName)){
			ShowMessage("错误...", "打印控件【" + labelComName + "】未安装，请下载安装控件！", "W");
			return;
		}else{
			console.log(labelComName + "打印已安装！");
		}
	}

	if (BussType == "S"){
		var DSUI  = window.dsUIAll.DSUI;
		var pageName = DSUI[0].PAGE_NAME;
		printObjName = DSUI[0].TABLE_NAME;
		if (printObjName == null || printObjName == undefined){
			printObjName = pageName;
		}
		
		printDesc = pageName + "打印";

		var mainDs = $('#dataGrid').datagrid('getRows');
		
		if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0){
			ShowMessage("错误...", pageName + "无数据可供打印！", "W");
			
			return;
		}else{
			rowTotal = mainDs.length.toString();
			
			printJSON = "{\"Total\":\"" + rowTotal + "\",\"tableName\":\"" + printObjName + "\",\"Rows\":" 
			                + JSON.stringify(mainDs)
			                + "}";
		}
	}else{
		var mainDs = $('#mdataGrid').datagrid('getSelected');
		var detailDs = $('#dtldataGrid').datagrid('getRows');
		
		var mainPageName = "";
		var pageName = "";
		var mainDSUI = null;
		
		var DSUI = window.dsUIAll.DSUI;
		for (var i = 0; i < DSUI.length; i++){
			var DSUIRow = DSUI[i];
			var page_no = DSUIRow.PAGE_NO;									
			
			if (page_no == "0"){
				mainPageName = DSUIRow.PAGE_NAME;				
				printObjName = DSUIRow.COLUMNS[0].TABLE_NAME;
				mainDSUI = DSUIRow.COLUMNS;
			}else{
				pageName = DSUIRow.PAGE_NAME;
			}
		}//End of for (var i = 0; i < DSUI.length; i++){
		
		if (mainPageName == null || mainPageName == undefined || mainPageName == "" || mainPageName == "null"){
			mainPageName = "主表数据";
		}
		
		if (pageName == null || pageName == undefined || pageName == "" || pageName == "null"){
			pageName = "明细表数据";
		}

		if (printObjName == null || printObjName == undefined){
			printObjName = mainPageName;
		}
		
		printDesc = mainPageName + "打印";
				
		if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0){
			ShowMessage("错误...", mainPageName + "无数据可供打印！", "W");
			
			return;
		}else{
			if (mainDSUI != null && mainDSUI != undefined){
				for (var i = 0; i < mainDSUI.length; i++){
					var mainDSUIRow = mainDSUI[i];
					var fieldName = mainDSUIRow.field;
					var fieldDesc = mainDSUIRow.title;
					var fieldValue = "";
					
					if (fieldName != null && fieldName != undefined){
						fieldValue = mainDs[fieldName];
						
						if (fieldValue == null || fieldValue == undefined || fieldValue == "null"){
							fieldValue = "";
						}
					}
					
					if (printJSON == ""){
						printJSON = "\"" + fieldName + "\":\"" + fieldValue + "\"";
					}else{
						printJSON = printJSON + ",\"" + fieldName + "\":\"" + fieldValue + "\"";
					}
				}
			}else{
				ShowMessage("错误...", mainPageName + "列参数提取错误！", "W");
				
				return;
			}
		}
		console.log("主表  printJSON:%s",printJSON);
		
		//if ((detailDs == null || detailDs == undefined) || detailDs.length <= 0){
			//ShowMessage("错误...", pageName + "无数据可供打印！", "W");
			
			//return;
		//}else{
			rowTotal = detailDs.length.toString();
			
			console.log("明细表  printJSON:%s",JSON.stringify(detailDs));
			
			if (printJSON != ""){
				printJSON = "{\"Total\":\"" + rowTotal + "\",\"tableName\":\"" + printObjName + "\"," + printJSON
                                + ",\"Rows\":" + JSON.stringify(detailDs)
                                + "}";
			}else{
				ShowMessage("错误...", mainPageName + "数据提取错误！", "W");
				
				return;
			}
		//}
	}
	
	
	console.log("所有数据  printJSON:%s",printJSON);
	if (printJSON != ""){
		var objHtml = "<OBJECT ID='" + labelComName + "' STYLE='WIDTH:" + objWidth + ";HEIGHT:" + objHeight + "'  CLASSID='CLSID:" + labelPrintID + "'></OBJECT>";
		
		/*
		buttonHtml = buttonHtml + subHtml 
		                 + "<a id=\"btOK\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-inport'\">确定</a>";
		*/
		
		printObjHtml = printObjHtml + "<div  id='inportPanel'  class='easyui-layout' data-options='fit:true' style='padding:0px; height:inherit; width:100%; border:0px;'>";
		printObjHtml = printObjHtml + "<div data-options=\"region:'center',split:true,border:false\" style='border:0px; padding:0px; overflow-x: hidden; overflow-y: hidden;'>";
		printObjHtml = printObjHtml + objHtml + "</div></div>";
		
		//console.log(objHtml);
		
		var winWidth = "518px";
		var winHeight = "475px";
		
		var $win;
		$win = $('#editWindow').window({
		    title: printDesc,
		    width: winWidth,
		    height: winHeight,
		    top: ($(window).height() - winHeight) * 0.5,
		    left: ($(window).width() - winWidth) * 0.5,
		    shadow: true,
		    modal: true,
		    iconCls: 'icon-print',
		    closed: true,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false,
		    onClose:function(){
		    	
		    }
		});//End of $win = $('#editWindow').window({

		$(document).ready(function () {
			$("#editPanel").empty();
			$('#edit_tool_menuPanel').empty();

			//按钮区域加入到页面
			console.log("buttonHtml:%s", buttonHtml);
			if (buttonHtml != ""){
				$('#edit_tool_menuPanel').append(buttonHtml);
			}
			
			//查询及列表区域加入到页面
			console.log("printObjHtml:%s", printObjHtml);
			if (printObjHtml != ""){
				$('#editPanel').append(printObjHtml);
			}

			/*
			//构建导入窗体按钮事件					
			$('#btOK').bind('click', function(){
				//确定按钮点击事件
				ReportPrint.open(printJSON,printNode);
			});
			*/
		});//End of $(document).ready(function () {
		
		$win.window('open');
		BarcodePrint.open(printJSON,printNode);
		
		bodyRefresh($('#editPanel'));
		bodyRefresh($('#edit_tool_menuPanel'));
	}
}

/*
 * 功能：执行存储过程
 * 参数：业务类型
 * 作者：陈立新
 * 时间：2016-07-10
 */
function ExcuteProcedure(BussType)
{
	var procedurePara=window.dsUIAll.PROCEDURE;
	
	var procedureName=procedurePara[0].TABLENAME;
	var paras=procedurePara[0].PARA;
	var namedesc=procedurePara[0].NAMEDESC;
	
	console.log("procedureName:%s", procedureName);
	console.log("paras:%s", paras);
	
	var fieldsStr='';
	var fieldValue="";

	//获取当前行数据
	var mainDs =$('#mdataGrid').datagrid('getSelected');

	if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0)
	{
		ShowMessage("错误...", "请先选择一行数据", "W");

		return;
	}
	else
	{
		if((paras == null || paras == undefined) || paras.length <= 0)
		{
			ShowMessage("错误...", "请查询配置信息", "W");

			return;
		}
		var paraFiled=paras.split('|');
		if(paraFiled.length>0){
		 for(var i=0;i<paraFiled.length;i++)
			 {
			    fieldValue=mainDs[paraFiled[i]];
				if (fieldsStr == "")
				{
					fieldsStr = "'" + fieldValue + "'";
				}
				else
				{
					fieldsStr = fieldsStr + ",'" + fieldValue + "'";
				}
			 }
		}

	}
	
	if ((fieldsStr != null && fieldsStr != undefined) &&
			(fieldsStr != "" && fieldsStr != "null"))
	{
		
		var updateJSONArrayStr = "{TABLE:\"" + procedureName + "\", TYPE:\"PROCEDURE\", FIELDS:\"" + fieldsStr + "\"}";
		var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + namedesc + "\",UPDATELIST:[" + updateJSONArrayStr + "],"
		                           + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
		                           + "\"}";
		console.log("updateObject : %s",updateObject);
		var params =
		{
			getObject : updateObject,
			errorMessage : ""
		};
		$.ajax(
		{
			url :ip+"updatedata",
			method : "POST",
			data : params,
			datatype : "json",
			success : function (data)
			{
				ShowMessage("提示...", namedesc+"成功！", "");
			},
			error : function (errorMessage)
			{
				ShowMessage("错误...", namedesc+"失败！" + JSONToStr(errorMessage), "E");
			}
		}
		);
	}
}

/*
 * 功能：取消审核
 * 参数：业务类型
 * 作者：陈立新
 * 时间：2015-07-10
 */
function cancelVerify(BussType)
{
	var procedurePara=window.dsUIAll.CANCELVERIFY;
	
	var procedureName=procedurePara[0].TABLENAME;
	var paras=procedurePara[0].PARA;
	var namedesc=procedurePara[0].NAMEDESC;
	
	var funStr=procedurePara[0].FUN;
	var ModuleStr=procedurePara[0].MODULE;
	
	console.log("procedureName:%s", procedureName);
	console.log("paras:%s", paras);

	
	var rolename=getDefaultValue("$USER");
	console.log("rolename:" + JSONToStr(rolename));
	
	var fieldsStr='';
	var fieldValue="";
	//是否能够取消审核
	var isVerify="";

	//获取当前行数据
	var mainDs =$('#mdataGrid').datagrid('getSelected');

	if ((rolename == null || rolename == undefined) || rolename.length <= 0)
	{
		ShowMessage("错误...", "未取到当前登陆者信息", "W");

		return;
	}
	
	if ((mainDs == null || mainDs == undefined) || mainDs.length <= 0)
	{
		ShowMessage("错误...", "请先选择一行数据", "W");

		return;
	}
	else
	{
		if((paras == null || paras == undefined) || paras.length <= 0)
		{
			ShowMessage("错误...", "请查询配置信息", "W");

			return;
		}
		//取当前登录这信息
		if ((rolename != null && rolename != undefined) &&
				(rolename != "" && rolename != "null"))
		{

			//开始查询数据
			var params =
			{
				getObject : "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_GET_ROLE_POWER\",PARAMETER:\"\",WHERE:\"USER_CODE='"
				                + rolename
				                + "' AND MODULE='" 
				                + ModuleStr + "' AND FUNCODE='" 
				                + funStr
				                + "'\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"取消审核\",IS_GRID:\"2\","
		                        + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno + "\"}",
				errorMessage : ""
			};
			$.ajax(
			{
				url :ip+"getdata",
				method : "POST",
				data : params,
				datatype : "json",
				success : function (data)
				{
					var userdata=JSON.parse(data);
					if ((userdata != null && userdata != undefined) &&
							(userdata != "" && userdata != "null"))
					{
                        var users=userdata[0];
                        isVerify=users.ALLOWCANCEL;
                    	console.log("isVerify:%s", isVerify);
                        if((isVerify != undefined && isVerify != null) && isVerify == "是")
                    	{
                			var paraFiled=paras.split('|');
                			if(paraFiled.length>0)
                			{
                				for(var i=0;i<paraFiled.length;i++)
                				{
                					    fieldValue=mainDs[paraFiled[i]];
                						if (fieldsStr == "")
                						{
                							fieldsStr = "'" + fieldValue + "'";
                						}
                						else
                						{
                							fieldsStr = fieldsStr + ",'" + fieldValue + "'";
                						}
                				}
                			}			

                			if ((fieldsStr != null && fieldsStr != undefined) &&
                					(fieldsStr != "" && fieldsStr != "null"))
                			{
                				var updateJSONArrayStr = "{TABLE:\"" + procedureName + "\", TYPE:\"PROCEDURE\", FIELDS:\"" + fieldsStr + "\"}";
                				var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + namedesc + "\",UPDATELIST:[" + updateJSONArrayStr + "],"
                				                          + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
                				                          + "\"}";
                				console.log("updateObject : %s",updateObject);
                				var params =
                				{
                					getObject : updateObject,
                					errorMessage : ""
                				};
                				$.ajax(
                				{
                					url :ip+"updatedata",
                					method : "POST",
                					data : params,
                					datatype : "json",
                					success : function (data)
                					{
                						ShowMessage("提示...", namedesc+"成功！", "");
                					},
                					error : function (errorMessage)
                					{
                						ShowMessage("错误...", namedesc+"失败！" + JSONToStr(errorMessage), "E");
                					}
                				}
                				);
                			}
                    	}
                	    else
                		{
                	    	ShowMessage("错误...", "没有"+namedesc+"的权限", "W");
                		}
					}
				},
				error : function (errorMessage)
				{
					ShowMessage("错误...", "查询数据失败！" + JSONToStr(errorMessage), "E");
					return;
				}
			}
			);
		}


			
	   }
    }

/*
 * 功能：审核按钮点击事件
 * 参数：业务类型
 * 作者：李福明
 * 时间：2016-01-07
 */
function Verify(BussType)
{
	console.log("BussTypd:%s", BussType);

	var dataRow = null;
	var dataGrid = null;
	var verifyJson = window.dsUIAll.VERIFY;
	var indexFieldJson = null;
	var dsui = null;
	var pageName = "";

	if (BussType == "S")
	{
		dataGrid = $('#dataGrid');
		indexFieldJson = window.dsUIAll.INDEXCOLUMNS;
		dsui = window.dsUIAll.DSUI;
	}
	else
	{
		dataGrid = $('#mdataGrid');

		if (window.dsUIAll.DSUI != undefined && window.dsUIAll.DSUI != null)
		{
			for (var i = 0; i < window.dsUIAll.DSUI.length; i++)
			{
				var dsuiRecord = window.dsUIAll.DSUI[i];

				if (dsuiRecord != undefined && dsuiRecord != null)
				{
					var page_no = dsuiRecord.PAGE_NO;
					if (page_no == "0")
					{
						indexFieldJson = dsuiRecord.INDEXCOLUMNS;
						dsui = dsuiRecord.DSUI;
						break;
					}
				}
			}
		}
	}

	if (dataGrid != null && dataGrid != undefined)
	{
		dataRow = dataGrid.datagrid('getSelected');

		if ((dataRow != undefined && dataRow != null) && (indexFieldJson != undefined && indexFieldJson != null))
		{
			if (verifyJson != undefined && verifyJson != null)
			{
				if ((dsui != undefined && dsui != null) && (dsui.length > 0))
				{
					var table_name = dsui[0].TABLE_NAME;
					var invent_table = dsui[0].INVENTED_TABLE;
					pageName = dsui[0].PAGE_NAME;

					console.log("table_name:%s", table_name);
					console.log("invent_table:%s", invent_table);

					var status_field = "";
					var status_value = "";
					var verifyflowcode = "";
					var verifyEditField = null;
					for (var i = 0; i < verifyJson.length; i++)
					{
						var verifyRecord = verifyJson[i];

						console.log("verifyRecord:%s", JSONToStr(verifyRecord));

						var tempTable = verifyRecord.STATUS_FIELD;

						console.log("tempTable:%s", tempTable);

						if (tempTable != undefined && tempTable != null)
						{
							var tempTableSplit = tempTable.split("|");

							if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length == 2)
							{
								var tempTb = tempTableSplit[0];
								var tempFd = tempTableSplit[1];

								console.log("tempTb:%s", tempTb);
								console.log("tempFd:%s", tempFd);

								if (tempTb == table_name || tempTb == invent_table)
								{
									if (tempTb != undefined && tempTb != null)
									{
										if (status_field == "")
										{
											if (tempFd != undefined && tempFd != null)
											{
												status_field = tempFd;
											}
										} //End of if (status_field == ""){
										var statusFieldValue = dataRow[status_field];

										console.log("statusFieldValue:%s", statusFieldValue);

										if (statusFieldValue == undefined)
										{
											console.log("取当前审核字段值异常！");
											statusFieldValue = "";
										}

										var tempStatusFieldValue = verifyRecord.PARENTVERIFYSTATE;
										console.log("tempStatusFieldValue:%s", tempStatusFieldValue);

										if (statusFieldValue == null || statusFieldValue == "" || statusFieldValue == "null")
										{
											if (tempStatusFieldValue == null || tempStatusFieldValue == "" || tempStatusFieldValue == "null")
											{
												verifyflowcode = verifyRecord.VERIFYFOLWCODE;
												status_value = verifyRecord.VERIFYSTATE;

												verifyEditField = verifyRecord.VERIFYEDITFIELD;
											}
										}
										else
										{
											if (statusFieldValue == tempStatusFieldValue)
											{
												verifyflowcode = verifyRecord.VERIFYFOLWCODE;
												status_value = verifyRecord.VERIFYSTATE;

												verifyEditField = verifyRecord.VERIFYEDITFIELD;
											}
										}
									} //End of if (tempTb != undefined && tempTb != null){
								} //End of if (tempTb == table_name || tempTb == invent_table){
							} //End of if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length ==2){
						} //End of if (tempTable != undefined && tempTable != null){

						if ((status_field != "" && status_value != "") && (verifyflowcode != "" && verifyEditField != null))
							break;
					} //End of for (var i = 0; i < window.dsUIAll.VERIFY.length; i++){

					console.log("status_field:%s", status_field);
					console.log("status_desc:%s", status_value);
					console.log("verifyflowcode:%s", verifyflowcode);
					console.log("verifyEditField:%s", JSONToStr(verifyEditField));

					if (verifyflowcode == null || verifyflowcode == "")
					{
						ShowMessage("提示...", '此' + pageName + '已审核！', "W");
						return;
					}

					var parameters = "";
					if (verifyEditField != null && verifyEditField != undefined)
					{
						var verifyEditFieldSplit = verifyEditField.split("|");

						if ((verifyEditFieldSplit != undefined && verifyEditFieldSplit != null) && verifyEditFieldSplit.length > 0)
						{
							for (var i = 0; i < verifyEditFieldSplit.length; i++)
							{
								var SingleeditField = verifyEditFieldSplit[i];

								console.log("SingleeditField:%s", SingleeditField);

								if (SingleeditField != undefined && SingleeditField != null)
								{
									var SingleeditFieldSplit = SingleeditField.split("^");

									if ((SingleeditFieldSplit != undefined && SingleeditFieldSplit != null) && SingleeditFieldSplit.length == 2)
									{
										var editField = SingleeditFieldSplit[1];

										if (editField != undefined && editField != null)
										{
											if (parameters != "")
											{
												parameters = parameters + ",\"" + editField + "\":\"" + getDefaultValue(editField) + "\"";
											}
											else
											{
												parameters = "\"" + editField + "\":\"" + getDefaultValue(editField) + "\"";
											}
										}
									}
								}
							}
						}
					}

					var bussWhere = "";
					if (indexFieldJson.length > 0)
					{
						for (var i = 0; i < indexFieldJson.length; i++)
						{
							var indexRecord = indexFieldJson[i];

							if (indexRecord != undefined && indexRecord != null)
							{
								var fieldName = indexRecord.FIELD;
								var fieldType = indexRecord.FIELD_TYPE;
								var fieldValue = dataRow[fieldName];

								if ((fieldName != undefined && fieldName != null) && (fieldValue != undefined && fieldValue != null))
								{
									if (fieldType.indexOf("DATETIME") > 0)
									{
										if (bussWhere == "")
										{
											bussWhere = fieldName + "=CAST('" + fieldValue + "' AS DATETIME)";
										}
										else
										{
											bussWhere = bussWhere + " AND " + fieldName + "=CAST('" + fieldValue + "' AS DATETIME)";
										}
									}
									else if (fieldType.indexOf("DATE") > 0)
									{
										if (bussWhere == "")
										{
											bussWhere = fieldName + "=CAST('" + fieldValue + "' AS DATE)";
										}
										else
										{
											bussWhere = bussWhere + " AND " + fieldName + "=CAST('" + fieldValue + "' AS DATE)";
										}
									}
									else if (fieldType.indexOf("INT") > 0 || fieldType.indexOf("NUMERIC") > 0 || fieldType.indexOf("DECIMAL") > 0 || fieldType.indexOf("FLOAT") > 0)
									{
										if (bussWhere == "")
										{
											bussWhere = fieldName + "=" + fieldValue;
										}
										else
										{
											bussWhere = bussWhere + " AND " + fieldName + "=" + fieldValue;
										}
									}
									else
									{
										if (bussWhere == "")
										{
											bussWhere = fieldName + "='" + fieldValue + "'";
										}
										else
										{
											bussWhere = bussWhere + " AND " + fieldName + "='" + fieldValue + "'";
										}
									}
								}
							}
						}
					}

					if (parameters == "")
					{
						parameters = "\"STATUS\":\"" + status_value + "\",\"WHERE\":\"" + bussWhere + "\"";
					}
					else
					{
						parameters = "\"STATUS\":\"" + status_value + "\"," + parameters + ",\"WHERE\":\"" + bussWhere + "\"";
					}

					parameters = "{" + parameters + "}";

					console.log("parameters:%s", parameters);

					var verifyWhere = "MODULE='" + window.moduleStr
						 + "' AND FUN='" + window.funStr
						 + "' AND VERIFYFOLWCODE='" + verifyflowcode
						 + "'";

					//开始查询数据
					var getDataJsonString = "{GETTYPE:\"VERIFY\",DBOBJECT:\"0\",OBJECT:\""
						 + table_name + "\",PARAMETER:"
						 + parameters + ",WHERE:\""
						 + verifyWhere + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" + pageName + "审核\",IS_GRID:\"1\","
						 + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
						 + "\"}";
					var params =
					{
						getObject : getDataJsonString,
						errorMessage : ""
					};

					$.ajax(
					{
						url :ip+"getdata",
						method : "POST",
						data : params,
						datatype : "json",
						success : function (data)
						{
							var rowObj = JSON.parse(data); //获取到的列表数据

							if (rowObj != "")
							{
								console.log("rowObj:", JSONToStr(rowObj));

								var rowIndex = dataGrid.datagrid('getRowIndex', dataRow);

								for (var jsonKey in rowObj)
								{
									dataRow[jsonKey] = rowObj[jsonKey];
								}

								console.log("dataRow:", JSONToStr(dataRow));

								dataGrid.datagrid('updateRow',
								{
									index : rowIndex,
									row : dataRow
								}
								);

								ShowMessage("提示...", pageName + '审核成功！', "");
							}
						},
						error : function (errorMessage)
						{
							ShowMessage("错误...", '未取到' + pageName + '信息！' + JSONToStr(errorMessage), "E");
						}
					}
					);
				} //End of if ((dsui != undefined && dsui != null) && (dsui.length > 0)){
			} //End of if (verifyJson != undefined && verifyJson != null){
		} //End of if ((dataRow != undefined && dataRow != null) && (indexFieldJson != undefined && indexFieldJson != null)){
	} //End of if (dataGrid != null && dataGrid != undefined){
}

/*
 * 功能：单表框架分页方法
 * 参数：单表列表JSON数据
 * 作者：李福明
 * 时间：2015-08-05
 */
function pagerSFilter(data)
{
	if (typeof data.length == 'number' && typeof data.splice == 'function')
	{ 
		// 判断数据是否是数组
		data =
		{
			total : data.length,
			rows : data
		};
	}
	var dg = $('#dataGrid');
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination(
	{
		onSelectPage : function (pageNum, pageSize)
		{
			var dsui = window.dsUIAll.DSUI;
			var queryColumns = window.dsUIAll.QUERYCOLUMNS;
			var dataRows = dg.datagrid('getChanges');
			
			console.log('dataRows:',dataRows);

			//新增分页功能，进行分页时需要重新查询数据，查询数据前需要确定上一批数据是否有过编辑
			//李福明
			//2018-03-29
			if ((dataRows != null && dataRows != undefined) && dataRows.length > 0)
			{
				$.messager.confirm("提示", "当前还有数据未保存，确定查询数据吗？[确定]查询但不保存数据，[取消]不查询进行数据保存操作", function (r)
						{
							if (r)
							{
								//alert('aaa');
								ExcuteQuery(dsui, queryColumns, "S");
								//alert('bbb');

								opts.pageNumber = pageNum;
								opts.pageSize = pageSize;
								pager.pagination('refresh',
								{
									pageNumber : pageNum,
									pageSize : pageSize
								}
								);
								dg.datagrid('loadData', window.data);								
								dg.datagrid("acceptChanges");
								
								return;
							}
							else
							{
								opts.pageNumber = window.prior_page_num;
								opts.pageSize = pageSize;
								pager.pagination('refresh',
								{
									pageNumber : window.prior_page_num,
									pageSize : pageSize
								}
								);

								return;
							}
						}
						);
			}else{
				ExcuteQuery(dsui, queryColumns, "S");

				opts.pageNumber = pageNum;
				opts.pageSize = pageSize;
				pager.pagination('refresh',
				{
					pageNumber : pageNum,
					pageSize : pageSize
				}
				);
				dg.datagrid('loadData', window.data);
				
				dg.datagrid("acceptChanges");
			}
		}
	}
	);
	/*
	if (!data.originalRows)
	{
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	*/
	return data;
}

/*
 * 功能：多表框架分页方法
 * 参数：单表列表JSON数据
 * 作者：李福明
 * 时间：2015-08-05
 */
function pagerMFilter(data)
{
	if (typeof data.length == 'number' && typeof data.splice == 'function')
	{ // 判断数据是否是数组
		data =
		{
			total : data.length,
			rows : data
		};
	}

	var dg = $('#mdataGrid');
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination(
	{
		onSelectPage : function (pageNum, pageSize)
		{					
			var dsui = null;
			var queryColumns = null;
			var dataRows = dg.datagrid('getChanges');
			
			//如果是多表窗体
			var dsUIs = window.dsUIAll.DSUI;

			if (dsUIs != null && dsUIs.length > 0)
			{
				for (var i = 0; i < dsUIs.length; i++)
				{
					var DSUIs = dsUIs[i];

					if (DSUIs != undefined && DSUIs != null)
					{
						var pageNo = DSUIs.PAGE_NO;

						//主表构建
						if (pageNo != undefined && pageNo == "0")
						{
							dsui = DSUIs.DSUI;
							queryColumns = DSUIs.QUERYCOLUMNS;
							break;
						}
					}
				}
			}
			
			if (dsui == null || dsui == undefined){
				ShowMessage("提示...", '界面参数配置不全，无法执行此操作！', "E");
				return;
			}

			//新增分页功能，进行分页时需要重新查询数据，查询数据前需要确定上一批数据是否有过编辑
			//李福明
			//2018-03-29
			if ((dataRows != null && dataRows != undefined) && dataRows.length > 0)
			{
				$.messager.confirm("提示", "当前还有数据未保存，确定查询数据吗？[确定]查询但不保存数据，[取消]不查询进行数据保存操作", function (r)
						{
							if (r)
							{
								ExcuteQuery(dsui, queryColumns, "M");

								opts.pageNumber = pageNum;
								opts.pageSize = pageSize;
								pager.pagination('refresh',
								{
									pageNumber : pageNum,
									pageSize : pageSize
								}
								);
								dg.datagrid('loadData', window.data);
								return;
							}
							else
							{
								opts.pageNumber = window.prior_page_num;
								opts.pageSize = pageSize;
								pager.pagination('refresh',
								{
									pageNumber : window.prior_page_num,
									pageSize : pageSize
								}
								);
								
								dg.datagrid("acceptChanges");

								return;
							}
						}
						);
			}else{
				ExcuteQuery(dsui, queryColumns, "M");

				opts.pageNumber = pageNum;
				opts.pageSize = pageSize;
				pager.pagination('refresh',
				{
					pageNumber : pageNum,
					pageSize : pageSize
				}
				);
				
				dg.datagrid("acceptChanges");
				
				dg.datagrid('loadData', window.data);
			}
		}
	}
	);
	/*
	if (!data.originalRows)
	{
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	*/
	return data;
}

/*
 * 功能：单表框架分页方法
 * 参数：单表列表JSON数据
 * 作者：李福明
 * 时间：2015-08-05
 */
function pagerIFilter(data)
{
	if (typeof data.length == 'number' && typeof data.splice == 'function')
	{ // 判断数据是否是数组
		data =
		{
			total : data.length,
			rows : data
		};
	}
	var dg = $('#inpordGrid');
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination(
	{
		onSelectPage : function (pageNum, pageSize)
		{
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',
			{
				pageNumber : pageNum,
				pageSize : pageSize
			}
			);
			dg.datagrid('loadData', data);
		}
	}
	);
	if (!data.originalRows)
	{
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

/*
 * 功能：通过列表单击事件取明细数据
 * 参数：列表行记录
 * 作者：李福明
 * 时间：2015-06-30
 */
function getDetailData(row)
{
	if (window.isInportData != "")
	{
		return;
	}

	if (row != undefined && row != null)
	{
		if (window.dsUIAll != undefined && window.dsUIAll != null)
		{
			try
			{
				var allUI = window.dsUIAll.DSUI;

				if ((allUI != undefined && allUI != null) && allUI.length > 0)
				{
					console.log("进入明细数据获取...");
					
					MessageUtil.Show('明细数据查询中...');
					
					var indexUI = null;
					var detailObjectStr = "";
					var mainName = "";
					
					for (var i = 0; i < allUI.length; i++)
					{
						var singUI = allUI[i];
						var page_no = singUI.PAGE_NO;

						if (page_no != undefined && page_no == "0")
						{
							indexUI = singUI.INDEXCOLUMNS;
							mainName = singUI.PAGE_NAME;
						}
						else
						{
							var columnsUI = singUI.DSUI;

							if ((columnsUI != undefined && columnsUI != null) && columnsUI.length > 0)
							{
								var columnUI = columnsUI[0];

								var pageName = singUI.PAGE_NAME;
								var tableName = columnUI.TABLE_NAME;
								var invtentedTable = columnUI.INVENTED_TABLE;

								if ((invtentedTable != undefined && invtentedTable != null) && (invtentedTable != "null"))
								{
									tableName = invtentedTable;
								}

								if (detailObjectStr == "")
								{
									detailObjectStr = "{\"PAGE_NAME\":\"" + pageName
										 + "\",\"PAGE_NO\":\"" + page_no
										 + "\", \"TABLE_NAME\":\"" + tableName + "\"}";
								}
								else
								{
									detailObjectStr = detailObjectStr + ","
										 + "{\"PAGE_NAME\":\"" + pageName
										 + "\",\"PAGE_NO\":\"" + page_no
										 + "\", \"TABLE_NAME\":\"" + tableName + "\"}";
								} //End of if (detailObjectStr == "")
							} //End of if ((columnsUI != undefined && columnsUI != null) && columnsUI.length > 0)
						} //End of if (page_no != undefined && page_no == "0")
					} //End of for (var i = 0; i < allUI.length; i++)

					var canQuery = false;
					if ((detailObjectStr != "" && indexUI != null) && indexUI.length > 0)
					{
						var detailObject = JSON.parse("[" + detailObjectStr + "]");

						if (detailObject != null && detailObject.length > 0)
						{
							for (var i = 0; i < detailObject.length; i++)
							{
								var detailObj = detailObject[i];

								var pageName = detailObj.PAGE_NAME;
								var tableName = detailObj.TABLE_NAME;
								var pageNo = detailObj.PAGE_NO;

								//alert(tableName);
								
								console.log(pageName + "数据获取......");

								var whereStr = "";
								for (var j = 0; j < indexUI.length; j++)
								{
									indexField = indexUI[j];

									canQuery = false;

									var fieldName = indexField.FIELD;
									var fieldDesc = indexField.FIELD_DESC;
									var fieldType = indexField.FIELD_TYPE.toUpperCase();

									//查看明细表是否存在待查询索引字段
									for (var m = 0; m < allUI.length; m++)
									{
										var singUI = allUI[m];
										var page_no = singUI.PAGE_NO;

										if (page_no != undefined && page_no == pageNo)
										{
											var colDSUI = singUI.DSUI;

											for (var n = 0; n < colDSUI.length; n++)
											{
												var colRecord = colDSUI[n];
												var fieldStr = colRecord.FIELD;
												var mainIndex = colRecord.MAIN_INDEX;

												if (fieldName == fieldStr || fieldName == mainIndex)
												{
													canQuery = true;
													break;
												}
											}

											break;
										}
									}

									if (canQuery)
									{
										if (row[fieldName] == undefined)
										{
											ShowMessage("错误...", mainName + "当前行中的" + fieldName + "数据未填写！", "E");
										}
										else
										{
											var fieldValue = row[fieldName];

											if (fieldValue == null)
											{
												if (whereStr == "")
												{
													whereStr = fieldName + " IS NULL ";
												}
												else
												{
													whereStr = whereStr + " AND " + fieldName + " IS NULL ";
												}
											}
											else
											{
												if (fieldType.indexOf("DATE") >= 0)
												{
													if ($.trim(fieldValue) == "")
													{
														if (whereStr == "")
														{
															whereStr = fieldName + " IS NULL ";
														}
														else
														{
															whereStr = whereStr + " AND " + fieldName + " IS NULL ";
														}
													}
													else
													{
														if (whereStr == "")
														{
															whereStr = fieldName + "=CAST('" + row[fieldName] + "' AS DATETIME)";
														}
														else
														{
															whereStr = whereStr + " AND " + fieldName + "=CAST('" + row[fieldName] + "' AS DATETIME)";
														}
													}
												}
												else if (fieldType.indexOf("CHAR") >= 0)
												{
													if (whereStr == "")
													{
														whereStr = fieldName + "='" + row[fieldName] + "'";
													}
													else
													{
														whereStr = whereStr + " AND " + fieldName + "='" + row[fieldName] + "'";
													}
												}
												else
												{
													if ($.trim(fieldValue) == "")
													{
														if (whereStr == "")
														{
															whereStr = fieldName + " IS NULL ";
														}
														else
														{
															whereStr = whereStr + " AND " + fieldName + " IS NULL ";
														}
													}
													else
													{
														if (whereStr == "")
														{
															whereStr = fieldName + "=" + row[fieldName];
														}
														else
														{
															whereStr = whereStr + " AND " + fieldName + "=" + row[fieldName];
														}
													}
												} //End of if (fieldType.indexOf("DATE") >= 0)
											} //End of if (fieldValue == null)
										} //End of if (row[fieldName] == undefined)
									} //End of if (!canQuery){
								} //End of for (var j = 0; j < indexUI.length; j++)

								//开始查询数据
								if ((window.detailwhere != null && window.detailwhere != undefined) &&
									(window.detailwhere != "" && window.detailwhere != "null"))
								{
									if (whereStr != "")
									{
										whereStr = " WHERE (" + window.detailwhere + ") AND (" + whereStr + ")";
									}
									else
									{
										whereStr = " WHERE " + window.detailwhere;
									}
								}
								else
								{
									if (whereStr != "")
										whereStr = " WHERE " + whereStr;
								}
								
								console.log(pageName + "数据获取中......");

								var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"" + tableName
									                             + "\",PARAMETER:\"\",WHERE:\""
									                             + whereStr + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" + pageName + "\",IS_GRID:\"1\","
									                             + "USER_ID:\"" + localjsonObj.username 
									                             + "\",VERIFY_NO:\"" + localjsonObj.verifyno 
									                             + "\"}";
								var params =
								{
									getObject : getDataJsonString,
									errorMessage : ""
								};

								$.ajax(
								{
									url : ip+"getdata",
									method : "POST",
									data : params,
									datatype : "json",
									success : function (data)
									{
										console.log(pageName + "数据获取成功......");
										
										var jsonobj = JSON.parse(data); //获取到的列表数据

										console.log("111111111jsonobj:",jsonobj);
										
										$("#dtldataGrid").datagrid('loadData', jsonobj);
										
										$("#dtldataGrid").datagrid("acceptChanges");

										window.rowIndex["dtldataGrid"] = -1;
										
										console.log(pageName + "数据显示完毕......");
									},
									error : function (errorMessage)
									{
										ShowMessage("错误...", '未取到' + pageName + '信息！' + errorMessage, "E");
									}
								}
								);
							} //End of for (var i = 0; i < detailObject.length; i++)
						} //End of if ((detailObject != null && detailObject != undefined) && detailObject.length > 0)
					} //End of if ((detailObjectStr != "" && indexUI != null) && indexUI.length > 0)
					
					MessageUtil.Close();
				} //End of if ((allUI != undefined && allUI != null) && allUI.length > 0)
			}
			catch (e)
			{
				MessageUtil.Close();
				ShowMessage("错误...", "取明细数据错误！" + e.description, "E");
			}
		} //End of if (window.dsUIAll != undefined && window.dsUIAll != null)
	}
	else
	{
		$('#dtldataGrid').datagrid('loadData',
		{
			total : 0,
			rows : []
		}
		); //清空下方DateGrid
		$("#dtldataGrid").datagrid("acceptChanges");
	} //End of if (row != undefined && row != null)
}

/*
 * 功能：更新行记录索引
 * 参数：列表对象，当前记录索引
 * 作者：李福明
 * 时间：2015-06-10
 */
function updateActions(gridObj, index)
{
	gridObj.datagrid('updateRow',
	{
		index : index,
		row : {}
	}
	);
}

/*
 * 功能：列表结束编辑方法
 * 参数：列表对象
 * 返回：结束编辑是否成功
 * 作者：李福明
 * 时间：2015-06-10
 */
function endEditing(dataGrid, gridName)
{
	gridName = $.trim(gridName);

	//console.log("gridName : %s",gridName);

	if (window.rowIndex[gridName] == undefined || window.rowIndex[gridName] == -1)
	{
		return true;
	}
	else
	{
		try
		{
			if (dataGrid.datagrid('validateRow', window.rowIndex[gridName]))
			{
				var dataRow = dataGrid.datagrid("getRows")[window.rowIndex[gridName]];

				if (dataRow != null && dataRow != undefined)
				{
					var dataGridColumns = null; //window.dsUIAll.COLUMNS;

					if (gridName != "dataGrid")
					{
						//console.log("window.dsUIAll.DSUI : %s",JSONToStr(window.dsUIAll.DSUI));

						for (var i = 0; i < window.dsUIAll.DSUI.length; i++)
						{
							var tempUI = window.dsUIAll.DSUI[i];
							var pageNo = tempUI.PAGE_NO;

							//console.log("window.dsUIAll.DSUI[i] : %s",window.dsUIAll.DSUI[i]);

							if (gridName == "mdataGrid" && pageNo == "0")
							{
								dataGridColumns = tempUI.COLUMNS;
							}
							else
								if (gridName == "dtldataGrid" && pageNo == "1")
								{
									dataGridColumns = tempUI.COLUMNS;
									//}else{
									//	dataGridColumns = tempUI.COLUMNS;
								}
						}
					}
					else
					{
						dataGridColumns = window.dsUIAll.COLUMNS;
					}

					var isNullCount = 0,
					nullCount = 0;

					//console.log("window.dsUIAll.COLUMNS : %s",JSONToStr(dataGridColumns));

					//如果是新增行，且当前行记录中关键字段为空，则删除新增行
					if (dataRow["ID"] == undefined || dataRow["ID"] == "")
					{
						if (dataGridColumns != null && dataGridColumns != undefined)
						{
							for (var i = 0; i < dataGridColumns.length; i++)
							{
								var fieldName = dataGridColumns[i].field;
								var columnEditor = dataGridColumns[i].editor;

								if ((columnEditor != null && columnEditor != undefined) && (columnEditor != "null" && columnEditor != ""))
								{
									var optionsObj = columnEditor.options;
									var requirdBool = optionsObj.required;

									if (Boolean(requirdBool))
									{
										isNullCount = isNullCount + 1;

										if (dataRow[fieldName] == "" || dataRow[fieldName] == undefined)
										{
											nullCount = nullCount + 1;
										}
									}
								}
							}
						}

						if (isNullCount == nullCount)
						{
							dataGrid.datagrid('cancelEdit', window.rowIndex[gridName]).datagrid('deleteRow', window.rowIndex[gridName]);
						}
						else
						{
							dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
						}
					}
					else
					{
						dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
					}

					return true;
				}
				else
				{
					dataGrid.datagrid('cancelEdit', window.rowIndex[gridName]).datagrid('deleteRow', window.rowIndex[gridName]);
					return true;
				}
			}
			else
			{
				if (window.rowIndex[gridName] != undefined && window.rowIndex[gridName] != -1)
				{
					dataGrid.datagrid('cancelEdit', window.rowIndex[gridName]).datagrid('deleteRow', window.rowIndex[gridName]);
				}
				return true;
			}
		}
		catch (e)
		{
			ShowMessage("错误...", "终止数据编辑错误！" + e.description, "E");
			return false;
		}
	}
}

/*
 * 功能：列表新增按钮点击事件
 * 参数：列表对象名称
 * 作者：李福明
 * 时间：2015-06-10
 */
function append(gridName)
{
	gridName = $.trim(gridName);
	var dataGrid = $("[id=" + gridName + "]");

	if (dataGrid == undefined || dataGrid == null)
	{
		ShowMessage("错误...", '待新增列表对象未找到！', "E");
		return;
	}

	if (endEditing(dataGrid, gridName))
	{
		var defaultValueJSonStr = "";
		var dataGridColumns = null;

		if (gridName == "mdataGrid")
		{
			//如果是多表窗体中的主表
			var dsUIs = window.dsUIAll.DSUI;

			if (dsUIs != null && dsUIs.length > 0)
			{
				for (var i = 0; i < dsUIs.length; i++)
				{
					var DSUIs = dsUIs[i];

					if (DSUIs != undefined && DSUIs != null)
					{
						var pageNo = DSUIs.PAGE_NO;
						var pageName = DSUIs.PAGE_NAME + "列表";

						//主表构建
						if (pageNo != undefined && pageNo == "0")
						{
							dataGridColumns = DSUIs.DEFAULTCOLUMNS;
							break;
						}
					}
				}
			}
		}
		else if (gridName == "dtldataGrid")
		{
			//如果是多表窗体中的子表
			var dsUIs = window.dsUIAll.DSUI;
			var mastName = "";

			if (dsUIs != null && dsUIs.length > 0)
			{
				for (var i = 0; i < dsUIs.length; i++)
				{
					var DSUIs = dsUIs[i];

					if (DSUIs != undefined && DSUIs != null)
					{
						var pageNo = DSUIs.PAGE_NO;
						var pageName = DSUIs.PAGE_NAME + "列表";

						//主表构建
						if (pageNo != undefined && pageNo == "1")
						{
							dataGridColumns = DSUIs.DEFAULTCOLUMNS;
						}
						else
						{
							if (pageNo != undefined && pageNo == "0")
							{
								mastName = pageName;
							}
						}
					}
				}
			}

			//判断当前是否选择了一个主表行
			var rows = $("#mdataGrid").datagrid('getSelections');

			if (rows == null || rows == undefined || rows.length == 0)
			{
				ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
				return;
			}
		}
		else
		{
			dataGridColumns = window.dsUIAll.DEFAULTCOLUMNS;
		}

		for (var i = 0; i < dataGridColumns.length; i++)
		{
			var fieldStr = dataGridColumns[i].FIELD;
			var defaultValue = dataGridColumns[i].DEFAULT_VALUE;

			if (fieldStr != null && fieldStr != "")
			{
				if (defaultValue != null && defaultValue != "")
				{
					if (defaultValueJSonStr != "")
					{
						defaultValueJSonStr = defaultValueJSonStr + ",\"" + fieldStr + "\":\"" + getDefaultValue(defaultValue) + "\"";
					}
					else
					{
						defaultValueJSonStr = "\"" + fieldStr + "\":\"" + getDefaultValue(defaultValue) + "\"";
					}
				}
			}
		}

		if (gridName == "dtldataGrid")
		{
			var dsUIs = window.dsUIAll.DSUI;

			if (dsUIs != null && dsUIs.length > 0)
			{
				var indexUI = null;
				var mastName = "";
				for (var i = 0; i < dsUIs.length; i++)
				{
					var singUI = dsUIs[i];
					var page_no = singUI.PAGE_NO;

					if (page_no != undefined && page_no == "0")
					{
						indexUI = singUI.INDEXCOLUMNS;
						mastName = singUI.PAGE_NAME;
						break;
					}
				}

				//填写索引默认值
				if (indexUI != null && indexUI.length > 0)
				{
					var row = $("#mdataGrid").datagrid('getSelections')[0];

					if (row != null)
					{
						for (var j = 0; j < indexUI.length; j++)
						{
							var fieldName = indexUI[j].FIELD;

							if (row[fieldName] != undefined && row[fieldName] != null)
							{
								if (defaultValueJSonStr != "")
								{
									defaultValueJSonStr = defaultValueJSonStr + ",\"" + fieldName + "\":\"" + row[fieldName] + "\"";
								}
								else
								{
									defaultValueJSonStr = "\"" + fieldName + "\":\"" + row[fieldName] + "\"";
								}
							}
						}
					}
					else
					{
						ShowMessage("提示...", '请选择一行' + mastName + '数据！', "W");
					}
				}
			}
		}

		defaultValueJSonStr = "{" + defaultValueJSonStr + "}"; //appendRow

		var defaultValueJSon = JSON.parse(defaultValueJSonStr);
		dataGrid.datagrid("appendRow", defaultValueJSon); //{status:'P'});

		try
		{
			var rowLength = dataGrid.datagrid("getRows").length;

			if ((rowLength != undefined && rowLength != null) && rowLength > 0)
			{
				window.rowIndex[gridName] = rowLength - 1;
			}
			else
			{
				window.rowIndex[gridName] = 0;
			}
		}
		catch (e)
		{
			window.rowIndex[gridName] = 0;
			ShowMessage("错误...", e.description, "E");
		}

		dataGrid.datagrid("selectRow", window.rowIndex[gridName]).datagrid('beginEdit', window.rowIndex[gridName]);
	}
}

/*
 * 功能：列表删除按钮点击事件
 * 参数：列表对象名称
 * 作者：李福明
 * 时间：2015-06-10
 */
function deleteRow(gridName)
{
	var retFlag = false;

	//console.log("gridName:%s", gridName);

	//console.log("deleteRow begin");

	gridName = $.trim(gridName);
	var dataGrid = $("[id=" + gridName + "]");

	window.rowIndex[gridName] = -1;

	var mainRow = null;

	//取窗体表结构参数
	var dsUI = null;

	if (gridName == "mdataGrid")
	{
		//console.log("window.dsUIAll.DSUI:%s", JSONToStr(window.dsUIAll.DSUI));

		//如果是多表窗体中的主表
		var dsUIs = window.dsUIAll.DSUI;

		if (dataGrid.datagrid('getSelections') != undefined && dataGrid.datagrid('getSelections') != null)
		{
			if (dataGrid.datagrid('getSelections').length > 0)
			{
				mainRow = dataGrid.datagrid('getSelections')[0];
			}
		}

		//console.log("dsUIs:%s", JSONToStr(dsUIs));

		if (dsUIs != null && dsUIs.length > 0)
		{
			for (var i = 0; i < dsUIs.length; i++)
			{
				var DSUIs = dsUIs[i];

				if (DSUIs != undefined && DSUIs != null)
				{
					var pageNo = DSUIs.PAGE_NO;
					//主表构建
					if (pageNo != undefined && pageNo == "0")
					{
						dsUI = DSUIs.DSUI;
						break;
					}
				}
			}
		}

		//console.log("dsUI:%s", JSONToStr(dsUI));
	}
	else if (gridName == "dtldataGrid")
	{
		//如果是多表窗体中的子表
		var dsUIs = window.dsUIAll.DSUI;

		if ($("[id=mdataGrid]").datagrid('getSelections') != undefined && $("[id=mdataGrid]").datagrid('getSelections') != null)
		{
			if ($("[id=mdataGrid]").datagrid('getSelections').length > 0)
			{
				mainRow = $("[id=mdataGrid]").datagrid('getSelections')[0];
			}
		}

		if (dsUIs != null && dsUIs.length > 0)
		{
			for (var i = 0; i < dsUIs.length; i++)
			{
				var DSUIs = dsUIs[i];

				if (DSUIs != undefined && DSUIs != null)
				{
					var pageNo = DSUIs.PAGE_NO;
					//主表构建
					if (pageNo != undefined && pageNo == "1")
					{
						dsUI = DSUIs.DSUI;
						break;
					}
				}
			}
		}
	}
	else
	{
		dsUI = window.dsUIAll.DSUI;
	}

	if (dsUI != null && dsUI.length > 0)
	{
		var tableName = dsUI[0].TABLE_NAME;
		var pageName = dsUI[0].PAGE_NAME;

		var rows = dataGrid.datagrid('getSelections');

		//判断是否为审核数据，审核后的数据不可删除
		if ((window.dsUIAll.VERIFY != undefined && window.dsUIAll.VERIFY != null) &&
			(mainRow != null && mainRow != undefined))
		{
			//console.log("window.dsUIAll.VERIFY:%s", JSONToStr(window.dsUIAll.VERIFY));

			var dsui = null;
			var pageName = "";

			for (var i = 0; i < window.dsUIAll.DSUI.length; i++)
			{
				var tempDsui = window.dsUIAll.DSUI[i];
				var page_no = tempDsui.PAGE_NO;

				if (page_no == "0")
				{
					dsui = tempDsui.DSUI;
					pageName = tempDsui.PAGE_NAME;
					break;
				}
			}

			//console.log("dsui:%s", JSONToStr(dsui));

			if ((dsui != undefined && dsui != null) && (dsui.length > 0))
			{
				var table_name = dsui[0].TABLE_NAME;
				var invent_table = dsui[0].INVENTED_TABLE;

				//console.log("table_name:%s", table_name);
				//console.log("invent_table:%s", invent_table);

				var status_field = "";
				for (var i = 0; i < window.dsUIAll.VERIFY.length; i++)
				{
					var verifyRecord = window.dsUIAll.VERIFY[i];

					//console.log("verifyRecord:%s", JSONToStr(verifyRecord));

					var tempTable = verifyRecord.STATUS_FIELD;

					//console.log("tempTable:%s", tempTable);

					if (tempTable != undefined && tempTable != null)
					{
						var tempTableSplit = tempTable.split("|");

						if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length == 2)
						{
							var tempTb = tempTableSplit[0];
							var tempFd = tempTableSplit[1];

							//console.log("tempTb:%s", tempTb);
							//console.log("tempFd:%s", tempFd);

							if (tempTb == table_name || tempTb == invent_table)
							{
								if (tempTb != undefined && tempTb != null)
								{
									if (status_field == "")
									{
										if (tempFd != undefined && tempFd != null)
										{
											status_field = tempFd;
										}
									} //End of if (status_field == ""){

									if ((mainRow[status_field] != null && mainRow[status_field] != undefined))
									{
										if (mainRow[status_field] != "" && mainRow[status_field] != "null")
										{
											ShowMessage("错误...", '已审核的' + pageName + '不可删除！', 'E');
											return true;
										}
									}
								} //End of if (tempTb != undefined && tempTb != null){
							} //End of if (tempTb == table_name || tempTb == invent_table){
						} //End of if ((tempTableSplit != undefined && tempTableSplit != null) && tempTableSplit.length ==2){
					} //End of if (tempTable != undefined && tempTable != null){
				} //End of for (var i = 0; i < window.dsUIAll.VERIFY.length; i++){
			} //End of if ((dsui != undefined && dsui != null) && (dsui.length > 0)){
		} //End of if (window.dsUIAll.VERIFY == undefined || window.dsUIAll.VERIFY == null){

		//console.log("rows:%s", JSONToStr(rows));

		if ((rows != null && rows != undefined) && rows.length > 0)
		{
			var sureMess = "确定删除所选择的" + rows.length + "条" + pageName + "数据吗？删除后将不可恢复！<br>[确定]删除，[取消]不删除";
			$.messager.confirm("提示", sureMess, function (r)
			{
				if (r)
				{
					var updateJSONArrayStr = "";
					//提取已选择的列表记录行并组织数据删除参数

					//console.log("Delete rows:" + JSONToStr(rows));

					for (var i = rows.length - 1; i >= 0; i--)
					{
						var row = rows[i];

						//console.log("Delete row:" + JSONToStr(row));

						var whereStr = " ID=" + row.ID;

						//console.log("whereStr:" + whereStr);

						if ((row.ID != undefined && row.ID != null) && (row.ID != "" && row.ID != "null"))
						{
							if (updateJSONArrayStr != "")
							{
								updateJSONArrayStr = updateJSONArrayStr + ",{TABLE:\"" + tableName + "\",TYPE:\"DELETE\",FIELDS:null,WHERE:\"" + whereStr + "\"}";
							}
							else
							{
								updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"DELETE\",FIELDS:null,WHERE:\"" + whereStr + "\"}";
							}
						}
					}

					if (updateJSONArrayStr != "")
					{
						updateJSONArrayStr = "[" + updateJSONArrayStr + "]";

						//console.log("updateJSONArrayStr:" + updateJSONArrayStr);

						var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + pageName + "\",UPDATELIST:" + updateJSONArrayStr + ","
						                          + "USER_ID:\"" + localjsonObj.username + "\",VERIFY_NO:\"" + localjsonObj.verifyno
						                          + "\"}";

						//console.log("updateObject:" + updateObject);

						var params =
						{
							getObject : updateObject,
							errorMessage : ""
						};
						try
						{
							$.ajax(
							{
								url : ip+"updatedata",
								method : "POST",
								data : params,
								datatype : "json",
								success : function (data)
								{
									for (var i = rows.length - 1; i >= 0; i--)
									{
										var row = rows[i];

										var index = dataGrid.datagrid('getRowIndex', row);
										dataGrid.datagrid('cancelEdit', index).datagrid('deleteRow', index);
									}

									if (gridName == "mdataGrid")
									{
										$('#dtldataGrid').datagrid('loadData',
										{
											total : 0,
											rows : []
										}
										);
									}

									retFlag = true;
									ShowMessage("提示...", '删除' + pageName + '信息成功！', '');
								},
								error : function (errorMessage)
								{
									var errorMessageStr = errorMessage.errorMessage;
									ShowMessage("错误...", '删除' + pageName + '信息失败！' + errorMessageStr, "E");
								}
							}
							);
						}
						catch (e)
						{
							ShowMessage("错误...", '删除' + pageName + '信息失败！' + e.description, "E");
						}
					}
					else
					{
						for (var i = rows.length - 1; i >= 0; i--)
						{
							var row = rows[i];

							var index = dataGrid.datagrid('getRowIndex', row);
							dataGrid.datagrid('cancelEdit', index).datagrid('deleteRow', index);
						}

						if (gridName == "mdataGrid")
						{
							$('#dtldataGrid').datagrid('loadData',
							{
								total : 0,
								rows : []
							}
							);
						}

						retFlag = true;
						ShowMessage("提示...", '删除' + pageName + '信息成功！', '');
					}
				}
			}
			);
		}
	}

	return retFlag;
}

/*
 * 功能：保存列表中发生编辑（修改、新增）的数据
 * 参数：单表窗体，还是多表窗体
 * 作者：李福明
 * 时间：2015-06-15
 */
function save(frameType)
{
	var dataGrid = null;
	var mdataGrid = null;
	var dtldataGrid = null;
	var gridName = "";
	var updateJSONArrayStr = "";

	if (frameType.substring(0, 1).toUpperCase() == "S")
	{
		//如果是单表数据
		dataGrid = $("#dataGrid");
		gridName = "dataGrid";
		
		console.log("0808----dataGrid:",dataGrid);

		updateJSONArrayStr = ConstutSQL(dataGrid, gridName, window.dsUIAll);

		if (updateJSONArrayStr == "ERROR")
		{
			return;
		}
	}
	else
	{
		//如果是多表数据
		updateJSONArrayStr = "";

		//取明细数据更新SQL语句
		dtldataGrid = $("#dtldataGrid");
		gridName = "dtldataGrid";
		//如果是多表窗体中的子表
		var dsUIs = window.dsUIAll.DSUI;
		var dsUI = null;

		if (dsUIs != null && dsUIs.length > 0)
		{
			for (var i = 0; i < dsUIs.length; i++)
			{
				var DSUIs = dsUIs[i];

				if (DSUIs != undefined && DSUIs != null)
				{
					var pageNo = DSUIs.PAGE_NO;
					//主表构建
					if (pageNo != undefined && pageNo == "1")
					{
						dsUI = DSUIs;
						break;
					}
				}
			}
		}
		else
		{
			ShowMessage("错误...", "未取到界面参数！", "W");
			return;
		}

		if (dsUI == null)
		{
			ShowMessage("错误...", "未取到明细数据界面参数！", "W");
			return
		}
		else
		{
			updateJSONArrayStr = ConstutSQL(dtldataGrid, gridName, dsUI);

			if (updateJSONArrayStr == "ERROR")
			{
				return;
			}
		}

		//取主表更新SQL语句
		mdataGrid = $("#mdataGrid");
		gridName = "mdataGrid";

		if (dsUIs != null && dsUIs.length > 0)
		{
			for (var i = 0; i < dsUIs.length; i++)
			{
				var DSUIs = dsUIs[i];

				if (DSUIs != undefined && DSUIs != null)
				{
					var pageNo = DSUIs.PAGE_NO;
					//主表构建
					if (pageNo != undefined && pageNo == "0")
					{
						dsUI = DSUIs;
						break;
					}
				}
			}
		}

		if (dsUI == null)
		{
			ShowMessage("错误...", "未取到主表数据界面参数！", "W");
			return
		}
		else
		{
			var subSQL = ConstutSQL(mdataGrid, gridName, dsUI);

			if (subSQL == "ERROR")
			{
				return;
			}
			else
			{
				if (updateJSONArrayStr == "")
				{
					updateJSONArrayStr = subSQL;
				}
				else
				{
					updateJSONArrayStr = updateJSONArrayStr + "," + subSQL;
				}
			}
		}
	}

	if (updateJSONArrayStr != "" && updateJSONArrayStr != "ERROR")
	{
		var pageName = window.funnameStr;

		var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + pageName 
		                          + "\",UPDATELIST:[" + updateJSONArrayStr + "],"
		                          + "USER_ID:\"" + localjsonObj.username 
		                          + "\",VERIFY_NO:\"" + localjsonObj.verifyno + "\"}";

		var params =
		{
			getObject : updateObject,
			errorMessage : ""
		};
		$.ajax(
		{
			url :ip+"updatedata",
			method : "POST",
			data : params,
			datatype : "json",
			success : function (data)
			{
				ShowMessage("提示...", pageName + "数据保存成功！", "");

				window.isInportData = "";

				if (frameType.substring(0, 1).toUpperCase() == "S")
				{
					dataGrid.datagrid("acceptChanges");
				}
				else
				{
					dtldataGrid.datagrid("acceptChanges");
					mdataGrid.datagrid("acceptChanges");
				}
				QueryData(frameType);
			},
			error : function (errorMessage)
			{
				ShowMessage("错误...", pageName + '信息保存失败！' + JSONToStr(errorMessage), "E");
			}
		}
		);
	} //End of if (updateJSONArrayStr != "")
}

/*
 * 功能：组织某一个列表的更新SQL语句
 * 参数：列表对象，列表名称，列表界面参数
 * 返回：更新的SQL语句，如果有异常则返回字符串"ERROR"
 * 作者：李福明
 * 时间：2015-06-19
 */
function ConstutSQL(dataGrid, gridName, dsUI)
{
	var retSQL = "";
	console.log("组织某一个列表的更新SQL语句");
	try
	{
		if ((window.rowIndex[gridName] != undefined && window.rowIndex[gridName] != null) && (window.rowIndex[gridName] != -1))
		{
			dataGrid.datagrid("endEdit", window.rowIndex[gridName]);
		}

		var dataRows = dataGrid.datagrid('getChanges');
		var messageStr = "";
		var gridUI = dsUI.DSUI;
		var dataGridColumns = dsUI.COLUMNS;

		if ((gridUI != null && gridUI.length > 0) && (dataGridColumns != null && dataGridColumns.length > 0))
		{
			var updateJSONArrayStr = "";
			var tableName = gridUI[0].TABLE_NAME;
			var pageName = gridUI[0].PAGE_NAME;
			
			console.log("--------------gridUI:",gridUI);

			for (var i = 0; i < dataRows.length; i++)
			{
				var dataRow = dataRows[i];

				console.log("grid row:%s", JSONToStr(dataRow));

				var fieldUpdateStr = "";

				for (var j = 0; j < gridUI.length; j++)
				{
					var columnUI = gridUI[j];

					var fieldName = columnUI.FIELD;
					var fieldDesc = columnUI.FIELD_DESC;
					var fieldType = $.trim(columnUI.FIELD_TYPE.toString());
					var isNULL = columnUI.ISNULL;
					var isInvented = columnUI.IS_INVENTED;

					//只要不是虚拟字段，则进行更新SQL拼接
					if (isInvented != "1")
					{
						//进行字段内容验证，必填字段是否为空，如果为空则退出保存并提示错误信息
						if ((isNULL != undefined && isNULL != null) && isNULL == "0")
						{
							if ((dataRow[fieldName] == undefined || dataRow[fieldName] == null) || (dataRow[fieldName] == ""))
							{
								messageStr = fieldDesc + "为空！";
								break;
							}
							else
							{
								//拼接字段JSON
								if (fieldUpdateStr == "")
								{
									fieldUpdateStr = "\"" + fieldName + "\":\"" + dataRow[fieldName] + "\"";
								}
								else
								{
									fieldUpdateStr = fieldUpdateStr + ",\"" + fieldName + "\":\"" + dataRow[fieldName] + "\"";
								}
							} //End of if ((dataRow[fieldName] == undefined || dataRow[fieldName] == null) || (dataRow[fieldName] == ""))
						}
						else
						{
							//拼接字段JSON
							if (fieldUpdateStr == "")
							{
								if ((dataRow[fieldName] != undefined && dataRow[fieldName] != null) && (dataRow[fieldName] != ""))
								{
									fieldUpdateStr = "\"" + fieldName + "\":\"" + dataRow[fieldName] + "\"";
								}
								else
								{
									fieldUpdateStr = "\"" + fieldName + "\":null";
								}
							}
							else
							{
								if ((dataRow[fieldName] != undefined && dataRow[fieldName] != null) && (dataRow[fieldName] != ""))
								{
									fieldUpdateStr = fieldUpdateStr + ",\"" + fieldName + "\":\"" + dataRow[fieldName] + "\"";
								}
								else
								{
									fieldUpdateStr = fieldUpdateStr + ",\"" + fieldName + "\":null";
								}
							}
						} //End of if ((isNULL != undefined && isNULL != null) && isNULL == "1")
					} //End of if (isInvented != "1")
				} //End of for (var j = 0; j < gridUI.length; j++)

				if (messageStr != "")
				{
					break;
				}
				else
				{
					if (fieldUpdateStr != "")
					{
						fieldUpdateStr = "{" + fieldUpdateStr + "}";

						if ((dataRow.ID != undefined && dataRow.ID != null) && (dataRow.ID != "" && dataRow.ID != "null"))
						{
							var whereStr = " ID=" + dataRow.ID;
							if (updateJSONArrayStr != "")
							{
								updateJSONArrayStr = updateJSONArrayStr + ",{TABLE:\"" + tableName + "\",TYPE:\"UPDATE\",FIELDS:" + fieldUpdateStr + ",WHERE:\"" + whereStr + "\"}";
							}
							else
							{
								updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"UPDATE\",FIELDS:" + fieldUpdateStr + ",WHERE:\"" + whereStr + "\"}";
							} //End of if (updateJSONArrayStr != "")
						}
						else
						{
							if (updateJSONArrayStr != "")
							{
								updateJSONArrayStr = updateJSONArrayStr + ",{TABLE:\"" + tableName + "\",TYPE:\"INSERT\",FIELDS:" + fieldUpdateStr + ",WHERE:\"\"}";
							}
							else
							{
								updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"INSERT\",FIELDS:" + fieldUpdateStr + ",WHERE:\"\"}";
							} //End of if (updateJSONArrayStr != "")
						} //End of if ((row.ID != undefined && row.ID != null) && (row.ID != "" && row.ID != "null"))
					} //End of if (fieldUpdateStr != "")
				} //End of if (messageStr != "")
			} //End of for (var i = 0; i < dataRows.length; i++)

			if (messageStr == "")
			{
				retSQL = updateJSONArrayStr;
			}
			else
			{
				retSQL = "ERROR";
				ShowMessage("提示...", messageStr, "W");
			} //End of if (messageStr != "")
		} //End of if (dataGridColumns != null && dataGridColumns.length > 0)
	}
	catch (e)
	{
		retSQL = "ERROR";
		ShowMessage("错误...", '组织更新SQL语句失败！' + e.description, "E");
	}

	return retSQL;
}

/*
 * 功能：将表格数据导出到EXCEL
 * 参数：单表窗体还是多表窗体
 * 作者：李福明
 * 时间：2015-06-19
 */
function exportExcel(frameType)
{
	frameType = $.trim(frameType);
	frameType = frameType.substring(0, 1).toUpperCase();
	var dsUI = dsUI = window.dsUIAll.DSUI; ;

	if (frameType == "S")
	{
		//如果是单表窗体
		var dataGrid = $('#dataGrid');

		if (dataGrid.datagrid("getRows").length <= 0)
		{
			ShowMessage("提示...", "无数据可供导出！", "W");
			return;
		}

		if ((dsUI != undefined && dsUI != null) && dsUI.length > 0)
		{
			var sheetName = dsUI[0].PAGE_NAME;

			ExporterExcel(dataGrid, sheetName);
		}
	}
	else
	{
		//如果是多表窗体
		if ($('#mdataGrid').datagrid("getRows").length <= 0 && $('#dtldataGrid').datagrid("getRows").length <= 0)
		{
			ShowMessage("提示...", "无数据可供导出！", "W");
			return;
		}

		if (frameType == "M")
		{
			var msheetName = "",
			dtlsheetName = "";
			var mdataGrid = $('#mdataGrid');
			var dtldataGrid = $('#dtldataGrid');

			if ((dsUI != undefined && dsUI != null) && dsUI.length > 0)
			{
				for (var i = 0; i < dsUI.length; i++)
				{
					var singleUI = dsUI[i];
					var pageNo = singleUI.PAGE_NO;
					var pageName = singleUI.PAGE_NAME;

					if (pageNo == "0")
					{
						msheetName = pageName;
					}
					else
					{
						if (pageNo == "1")
						{
							dtlsheetName = pageName;
						}
					}
				}

				ExporterExcelEx(mdataGrid, dtldataGrid, msheetName, dtlsheetName);
			} //End of if ((dsUI != undefined && dsUI != null) && dsUI.length > 0)
		}
		else
		{
			ShowMessage("错误...", "非法窗体类型！", "E");
		} //End of if (frameType == "M")
	} //End of if (frameType == "S")
}

/*
 * 功能：取列表当前行数
 * 参数：列表对象
 * 作者：李福明
 * 时间：2015-06-11
 */
function getRowIndex(target)
{
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}

/*
 * 功能：对整个页面或某一个部分进行重新CSS样式渲染
 * 参数：对象ID
 * 时间：2015-06-10
 */
function bodyRefresh(targetObj)
{
	if (targetObj == null)
	{
		$.parser.parse();
	}
	else
	{
		$.parser.parse(targetObj);
	}
}

/**
 * 使用方法: 开启:MessageUtil.Show(); 关闭:MessageUtil.Close();
 * 
 * 显示其它信息:MessageUtil.Show('其它提示文字...');
 */
var MessageUtil = (function() {
	var $mask, $maskMsg;
	
	var defMsg = '信息处理中，请稍候......';

	function init() {
		if (!$mask) {
			$mask = $("<div class=\"datagrid-mask mymask\"></div>").appendTo(
					"body").css({
				'font-size' : '12px',
				display : "block"
			});
		}
		if (!$maskMsg) {
			$maskMsg = $(
					"<div class=\"datagrid-mask-msg mymask\">" + defMsg
							+ "</div>").appendTo("body").css({
				'font-size' : '12px',
				display : "block"
			});
		}

		$mask.css({
			width : "100%",
			height : $(document).height()
		});

		var scrollTop = $(document.body).scrollTop();

		$maskMsg.css({
			left : ($(document.body).outerWidth(true) - 190) / 2,
			top : (($(window).height() - 45) / 2) + scrollTop
		});

	}

	return {
		Show : function(msg) {
			init();
			$mask.show();
			$maskMsg.html(msg || defMsg).show();
		},
		Close : function() {
			$mask.hide();
			$maskMsg.hide();
		}
	};
}());