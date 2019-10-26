/***********************************************************************
* 功能：框架处理网页代码
* 作者：李福明
* 时间：2015-10-20
* 武汉傲腾科技有限公司版权所有 CopyRight 2015
************************************************************************/

/*
 * 功能：窗体创建
 * 参数：功能模块、子功能模块、子模块名称
 * 作者：李福明
 * 时间：2015-08-17
 */
var ip="/OA/"
var localjson=localStorage.getItem("localdata");
console.log(localjson)//打印出来的是json类型数据
var localjsonObj=JSON.parse(localjson);//转换为json对象

function SingleConstruct(moduleStr, funStr, funnameStr){
	//MessageUtil.Show('系统菜单构建中，请稍候...');
	showMask("窗体显示中，请稍候...");
	
	var dataGridColumns = null, queryColumns = null;
	var gridTitle = funnameStr + "数据列表";	

	var getPara = "{MODULE:'" + moduleStr + "',FUN:'" + funStr +"'}'";
	var params = {
			getObject :getPara,
			errorMessage : ""
	};
	
	try{
		$.ajax({
			url:ip+"getUIFielddata",
			method:"POST",
			data:params,
			datatype:"json",
			success:function(data){
				var jsonobj = JSON.parse(data);  //使用这个方法解析json
				window.dsUIAll = JSON.parse(data);//jsonobj.DSUI;
				
				var dsUIs = window.dsUIAll.DSUI;
									
				var toolButtonHtml = "", newHtml = "", deleteHtml = "", saveHtml = "";	
				var queryHtml = "<a href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search'\" onclick=\"QueryData('M')\">查询</a>"
                    + "<a id=\"btQueryClear\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-search_clear'\" onclick=\"QueryClear('M')\">清空查询</a>";
				
				if (dsUIs != null && dsUIs.length > 0){
					saveHtml = saveHtml + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-save'\" onclick=\"save('S')\">保存</a>";
					saveHtml = saveHtml + "<span style=\"color:#818181\">&nbsp;|&nbsp;</span>";
					saveHtml = saveHtml + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-reload'\" onclick=\"dselect('E')\">编辑权限反选</a>";
					saveHtml = saveHtml + "<a id=\"btSave\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-reload'\" onclick=\"dselect('C')\">审核权限反选</a>";
					saveHtml = saveHtml + "<span style=\"color:#818181\">&nbsp;|&nbsp;</span>";
					saveHtml = saveHtml + "<a id=\"btExport\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'icon-export'\" onclick=\"exportExcel('S')\">导出</a>";

					for (var i = 0; i < dsUIs.length; i++){
						var DSUI = dsUIs[i];
						
						if (DSUI != undefined && DSUI != null){
							var pageNo = DSUI.PAGE_NO;
							
							//主表构建
							if (pageNo != undefined && pageNo == "0"){		   					    
		   					    $('#treePanel').panel({title: DSUI.PAGE_NAME  + "选择"});
		   					    
		   					    //树目录定义
		   					    try{
		   					    	$('#treeList').tree({ 
		   					    		checkbox:false,
										method: 'get',
										animate: true,
										onClick: function(node){	
										
											getTDetailData(node);
										},
										onDblClick:function(node){
											window.isAdd = false;
											
											var selNode = $('#treeList').tree('getSelected');
											var parNode = $('#treeList').tree('getParent',selNode.target);
											if (parNode != null && parNode != undefined){
												window.isAddChild = true;
											}else{
												window.isAddChild = false;
											}
											
	   										var datagrid = $('#treeList');
	   										window.rowIndex["treeList"] = -1;
	   										window.focusGrid = "treeList";
										},
										onLoadSuccess:function(node, data){
											
										},
										onLoadError:function(arguments){
											
										},
										onExpand:function(node){
											
										},
										onCheck:function(node, checked){
											
										},
										onSelect:function(node){
											
										}
		   					    	}); 
								}catch(ex){
									ShowMessage("错误...",  DSUI.PAGE_NAME + "选择树目录初始化错误！" + ex.description, "E");
								}
								
								//取树目录数据
								var idIndexPara = "", idPara = "", textPara = "";
								var columnDSUI = DSUI.DSUI;
								var treeTableName = "";
								var whereStr = "";
								
								//alert(JSONToStr(columnDSUI));
								
								if (columnDSUI != null && columnDSUI != undefined){
									for (var j = 0; j < columnDSUI.length; j++){
										var isSave = columnDSUI[j].IS_SAVE;
										var tableName = columnDSUI[j].TABLE_NAME;
										var inventedTable = columnDSUI[j].INVENTED_TABLE;
										var fieldName = columnDSUI[j].FIELD;
										
										if (treeTableName == ""){
											if (inventedTable == null || inventedTable == undefined || inventedTable == "" || inventedTable == "null"){
												if ((tableName != null && tableName != undefined) && (tableName != "" && tableName != "null")){
													treeTableName = tableName;
												}
											}else{
												treeTableName = inventedTable;
											}
										}
										
										if ((isSave != null && isSave != undefined) && (isSave != "null" && isSave != "")){
											isSave = isSave.toUpperCase();
											
											if (idPara != "" && textPara != ""){
												break;
											}else{
												if (isSave == "0" || isSave == "ID"){
													idPara = fieldName;
												}else{
													textPara = fieldName;
												}
											}
										}
									}
									
									if (idPara != ""){
										window.idField = idPara;
										if (textPara != ""){											
											window.textField = textPara;
											idIndexPara = idPara + "|" + textPara;
										}else{
											idIndexPara = idPara;
										}
									}
									
									if (idIndexPara != ""){
										var getDataJsonString = "{GETTYPE:\"TREE\",DBOBJECT:\"0\",OBJECT:\"" + treeTableName 
		                                 								+ "\",PARAMETER:\"" + idIndexPara + "\",WHERE:\""
		                                 								+ whereStr + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" + DSUI.PAGE_NAME + "\",IS_GRID:\"\","
		                                 								+ "USER_ID:\""  
		                           		                                + localjsonObj.username 
		                           		                                + "\",VERIFY_NO:\"" 
		                           		                                + localjsonObj.verifyno
		                           		                                + "\"}";
										var params = {
												getObject :getDataJsonString,
												errorMessage : ""
										};
										
										//alert("0");
										
										try{
											$.ajax({
												url:ip+"getdata",
												method:"POST",
												data:params,
												animate: true,
												datatype:"json",
												success:function(data){
													if (data != null && data != undefined){
														var jsonobj = JSON.parse(data);  //获取到的列表数据
														
														$('#treeList').tree('loadData', jsonobj);
													}
												},
												error:function(errorMessage){
													ShowMessage("错误...", '未取到' + DSUI.PAGE_NAME + '信息！' + JSONToStr(errorMessage), "E");
												}
											});	
										}catch (e) {
											ShowMessage("错误...", '未取到' + DSUI.PAGE_NAME + '信息！' + e.description, "E");
										}
									}
								}
							}
							
							//子表构建
							if (pageNo != undefined && pageNo == "1"){
								try{								   	
								   	window.rowIndex["dataGrid"] = -1;
								   	
								   	$('#dataGroup').panel({title: DSUI.PAGE_NAME  + "列表"});	
			   						
			   						dataGridColumns = DSUI.COLUMNS;
			   						queryColumns = DSUI.QUERYCOLUMNS;
			   						
			   						//修改带下拉列表框列配置，用来显示原默认下拉列表框（按标准界面参数下拉列表框会虚拟一个字段用来显示，实际下拉列表框隐藏）
			   						for (var i = 0; i < dataGridColumns.length; i++){
			   							var columnDSUI = dataGridColumns[i];
			   							
			   							var columnField = columnDSUI.field;
			   							var columnFieldDesc = columnDSUI.title;
			   							var columnEditor = columnDSUI.editor;
			   							var columnType = "";
			   							
			   							if (columnEditor != null && columnEditor != undefined){
			   								columnType = columnEditor.type;
			   							}
			   							
			   							try{
			   								if (columnType == "combobox"){
			   									columnDSUI.hidden = false;
			   								}
			   							}catch(ex){
			   								ShowMessage("错误...", "修改" + columnFieldDesc + "属性错误！" + ex.description, "E");
			   							}
			   						}
			   						
			   						var gridColumns = "[" + JSON.stringify(dataGridColumns) + "]";

			   						dataGridColumns = eval(gridColumns);
			   						
			   						//如果无查询区
			   						subHeight = 66;
			   						window.queryPanelHeight = 0;
			   						
			   						try{
			   							//更新查询区高度
			   							$("#centerPanel").layout("panel", "north").panel("resize", {height:window.queryPanelHeight});
			   							
			   		   					$("#centerPanel").layout("resize");
			   						   	
			   						   	window.rowIndex["dataGrid"] = -1;
			   						   	
			   						   	var dataGridHeight = $('#centerPanel').layout("panel", "center").height() - window.gridHeightSub;
			   						}catch(ex){
			   							ShowMessage("错误...", "数据查询区构建错误！" + ex.description, "E");
			   						}
			   						
			   					   	//配置列表显示			   						
			   						$('#dataGrid').datagrid({
			   				  					height : dataGridHeight,
			   				  					fitColumns : false,
			   									pageSize:50,
			   				   					pageList:[15,20,50,100],
			   									loadMsg:'数据加载中，请稍后......',
			   									frozenColumns:[[
			   												{field:'ck',checkbox:true}
			   									]],
			   									columns: dataGridColumns,
			   									onClickRow:function(index, row){
			   										var datagrid = $('#dataGrid');
			   						                //单击列表行事件，用来停止上一行的编辑事件
			   										
			   					                    if (window.rowIndex["dataGrid"] != index) {
			   					                    	datagrid.datagrid("endEdit", window.rowIndex["dataGrid"]);
			   					                    	endEditing(datagrid, "dataGrid");

			   					                    	window.rowIndex["dataGrid"] = index;
			   					                    }
			   									},
			   									onLoadSuccess: function(){
			   										//数据加载成功方法
			   										window.rowIndex["dataGrid"] = -1;
			   									},
			   									onLoadError: function(){
			   										//数据加载失败方法
			   										ShowMessage("错误...", gridTitle + "数据加载失败！", "E");
			   									},
			   									onDblClickRow: function (index, row) {
			   										var currentNode = $('#treeList').tree('getSelected');
			   										
			   										if (currentNode == null || currentNode == undefined){
			   											ShowMessage("提示...", "请在左边选择一个角色！", "W");
			   										}else{
				   										var datagrid = $('#dataGrid');
				   					                    if (window.rowIndex["dataGrid"] != -1) {
				   					                        datagrid.datagrid("endEdit", window.rowIndex["dataGrid"]);
				   					                        window.rowIndex["dataGrid"] = -1;
				   					                    }
				   					                    if (row != undefined && row != null) {
				   					                        datagrid.datagrid("beginEdit", index);
				   					                        window.rowIndex["dataGrid"] = index;
				   					                    }
			   										}
			   					                },
			   									onBeforeEdit:function(index, row){
			   										row.editing = true;
			   										window.rowIndex["dataGrid"] = index;
			   									},
			   									onAfterEdit:function(index,row){
			   										row.editing = false;
			   										updateActions($('#dataGrid'), index);
			   									},
			   									onCancelEdit:function(index,row){
			   										row.editing = false;
			   									}
			   						});
			   						
						            //取权限列表数据
									var DSUIS = window.dsUIAll.DSUI;
									var DSUI = null;
									var pageName = "";
									var powerTableName = "";
									for (var i = 0; i < DSUIS.length; i++){
										var suDSUI = DSUIS[i];
										var pageNo = suDSUI.PAGE_NO;
										
										if (pageNo == "1"){
											DSUI = suDSUI;
											pageName = suDSUI.PAGE_NAME;
											break;
										}
									}
									
									//从服务器取当前树目录对应的类型数据
									if (DSUI != null && DSUI != undefined){
										if (DSUI.DSUI[0] != null && DSUI.DSUI[0] != undefined){
											var tableName = DSUI.DSUI[0].TABLE_NAME;
											var inventedTable = DSUI.DSUI[0].INVENTED_TABLE;
											
											if (inventedTable == null || inventedTable == undefined || inventedTable == "" || inventedTable == "null"){
												if (tableName == null || tableName == undefined || tableName == "" || tableName == "null"){
													powerTableName = tableName;
												}
											}else{
												powerTableName = inventedTable;
											}
										}
										
										if (powerTableName != null && powerTableName != ""){
											var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"" + powerTableName 
             								                                 + "\",PARAMETER:\"\",WHERE:\" ORDER BY M_SEQ_NO, F_SEQ_NO\"" 
             								                                 + ",ORDER:\"\",PAGE:\"\",TYPEDESC:\"" + pageName + "\",IS_GRID:\"1\","
             								                                 + "USER_ID:\""  
             									                             + localjsonObj.username 
																			  + "\",VERIFY_NO:\"" 
																			  + localjsonObj.verifyno
																			  + "\"}";
											
											var params = {
													getObject :getDataJsonString,
													errorMessage : ""
											};
			
											try{
												$.ajax({
													url:ip+"getdata",
													method:"POST",
													data:params,
													animate: true,
													datatype:"json",
													success:function(data){
														//alert(data);
														if (data != null && data != undefined){
															var jsonobj = JSON.parse(data);  //获取到的列表数据

															//分页显示
															$('#dataGrid').datagrid({loadFilter:pagerSFilter}).datagrid('loadData', jsonobj);
															
															$('#dataGrid').datagrid("acceptChanges");
															
															window.rowIndex["dataGrid"] = -1;
														}
													},
													error:function(errorMessage){
														ShowMessage("错误...", '未取到' + pageName + '信息！' + JSONToStr(errorMessage), "E");
													}
												});	
											}catch (e) {
												ShowMessage("错误...", '未取到' + pageName + '信息！' + e.description, "E");
											}
										}
									}
								}catch(ex){
									ShowMessage("错误...", "明细列表初始化错误！" + ex.description, "E");
								}
							}
						}
					}
				}
				
				if (deleteHtml != undefined && deleteHtml != ""){
					toolButtonHtml = toolButtonHtml + deleteHtml;
				}
				
				if (newHtml != undefined && newHtml != ""){
					toolButtonHtml = toolButtonHtml + newHtml;
				}
				
				if (saveHtml != undefined && saveHtml != ""){
					toolButtonHtml = toolButtonHtml + saveHtml;
				}
				
				if (toolButtonHtml != undefined && toolButtonHtml != ""){
					$('#tool_menu').append(toolButtonHtml);
					bodyRefresh($('#tool_menu'));	
				}
	
				CloseMask();
			},
			error:function(errorMessage){
	
				CloseMask();
				ShowMessage("错误...", "未从服务器取到数据！" + errorMessage["errorMessage"], "E");
			}
		});	
	}catch (e) {

		CloseMask();
		ShowMessage("错误...", gridTitle + "列表初始化错误！" + e.description, "E");
	}
}

/*
 * 功能：编辑权限及审核权限列所有记录反选方法
 * 参数：是编辑（E）权限列还是审核（C）权限列
 * 作者：李福明
 * 时间：2015-10-28
 */
function dselect(fieldType){
	var gridRow = $("#dataGrid").datagrid("getRows");
	
	if (gridRow != undefined && gridRow != null){
		for (var i = 0; i < gridRow.length; i++){
			var currentRowIndex = $('#dataGrid').datagrid('getRowIndex',gridRow[i]);
			var currentRecord = gridRow[i];
			var setFValue = "是";
			
			if (fieldType == "E"){
				if (currentRecord["ALLOWEDIT"] == null || currentRecord["ALLOWEDIT"] == undefined){
					$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWEDIT': setFValue}});
				}else{
					if (currentRecord["ALLOWEDIT"] != "是"){
						$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWEDIT': setFValue}});
					}else{
						$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWEDIT': '否'}});
					}
				}
			}
			
			if (fieldType == "C"){
				if (currentRecord["ALLOWCONFIRM"] == null || currentRecord["ALLOWCONFIRM"] == undefined){
					$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWCONFIRM': setFValue}});
				}else{
					if (currentRecord["ALLOWCONFIRM"] != "是"){
						$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWCONFIRM': setFValue}});
					}else{
						$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWCONFIRM': '否'}});
					}
				}
			}
		}
	}	
}

/*
 * 功能：单表框架分页方法
 * 参数：单表列表JSON数据
 * 作者：李福明
 * 时间：2015-08-05
 */
function pagerSFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
        data = {
            total: data.length,
            rows: data
        };
    }
    var dg = $('#dataGrid');
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

/*
 * 功能：多表框架分页方法
 * 参数：单表列表JSON数据
 * 作者：李福明
 * 时间：2015-08-05
 */
function pagerMFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
        data = {
            total: data.length,
            rows: data
        };
    }
    
    var dg = $('#mdataGrid');
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

/*
 * 功能：通过树目录点击取明细数据
 * 参数：树目录行记录
 * 作者：李福明
 * 时间：2015-09-28
 */
function getTDetailData(row){
	MessageUtil.Show('权限数据获取中，请稍候...');
	
	$("#dataGrid").datagrid("unselectAll");
	
	if (row != undefined && row != null){
		var idValue = row.id;
		var textValue = row.text;
		var pageName = "系统权限";
		var gridRow = $("#dataGrid").datagrid("getRows");
		
		if (gridRow != undefined && gridRow != null){
			for (var i = 0; i < gridRow.length; i++){
				var currentRowIndex = $('#dataGrid').datagrid('getRowIndex',gridRow[i]);

				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ID':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ROLECODE':idValue}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ROLENAME':textValue}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'POWER':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWEDIT':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWCONFIRM':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'PREPARE_BY':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'PREPARE_DATE':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWEDIT_DESC':''}});
				$('#dataGrid').datagrid('updateRow',{index:currentRowIndex, row:{'ALLOWCONFIRM_DESC':''}});
			}

			if ((idValue != null && idValue != undefined) && idValue != ""){
				var whereStr = " WHERE ROLECODE='" + idValue + "'";
				
				var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"VIEW_TB_POWER\",PARAMETER:\"\",WHERE:\""
					+ whereStr
					+ "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\""+ pageName + "\",IS_GRID:\"2\","
					+ "USER_ID:\""  
                    + localjsonObj.username + "\",VERIFY_NO:\"" +localjsonObj.verifyno+ "\"}";
				
				var params = {
						getObject :getDataJsonString,
						errorMessage : ""
				};

				try{
					$.ajax({
						url:ip+"getdata",
						method:"POST",
						data:params,
						animate: true,
						datatype:"json",
						success:function(data){
							if (data != null && data != undefined){
								var powerData = JSON.parse(data);  //获取到的列表数据

								if (powerData != null && powerData != undefined){
									for (var i = 0; i < powerData.length; i++){
										var pRowRoleCode = powerData[i].ROLECODE;
										var pRowModule = powerData[i].MODULE;
										var pRowFun = powerData[i].FUNCODE;
										
										if ((pRowRoleCode != null && pRowRoleCode != undefined) && pRowRoleCode != ""){
											for (var j = 0; j < gridRow.length; j++){
												var gRowRoleCode = gridRow[j].ROLECODE;
												var gRowModule = gridRow[j].MODULE;
												var gRowFun = gridRow[j].FUNCODE;
												
												if ((pRowRoleCode == gRowRoleCode && pRowModule == gRowModule) && pRowFun == gRowFun){
													var currentRowIndex = $('#dataGrid').datagrid('getRowIndex',gridRow[j]);
													
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ID':powerData[i].ID}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ROLECODE':powerData[i].ROLECODE}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ROLENAME':powerData[i].ROLENAME}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'POWER':powerData[i].POWER}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ALLOWEDIT':powerData[i].ALLOWEDIT}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ALLOWCONFIRM':powerData[i].ALLOWCONFIRM}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'PREPARE_BY':powerData[i].PREPARE_BY}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'PREPARE_DATE':powerData[i].PREPARE_DATE}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ALLOWEDIT_DESC':powerData[i].ALLOWEDIT_DESC}});
													$('#dataGrid').datagrid('updateRow', {index:currentRowIndex, row:{'ALLOWCONFIRM_DESC':powerData[i].ALLOWCONFIRM_DESC}});
													
													$('#dataGrid').datagrid("selectRow", currentRowIndex);
												}
											}
										}
									}
								}
							}
							
							MessageUtil.Close();
						},						
						error:function(errorMessage){
							MessageUtil.Close();
							ShowMessage("错误...", '未取到' + pageName + '信息！' + JSONToStr(errorMessage), "E");
						}
					});	
				}catch (e) {
					MessageUtil.Close();
					ShowMessage("错误...", '未取到' + pageName + '信息！' + e.description, "E");
				}
			}
		}
	}//End of if (row != undefined && row != null)
}

/*
 * 功能：更新行记录索引
 * 参数：列表对象，当前记录索引
 * 作者：李福明
 * 时间：2015-06-10
 */
function updateActions(gridObj, index){
	gridObj.datagrid('updateRow',{
		index: index,
		row:{}
	});
}

/*
 * 功能：列表结束编辑方法
 * 参数：列表对象
 * 返回：结束编辑是否成功
 * 作者：李福明
 * 时间：2015-06-10
 */
function endEditing(dataGrid, gridName){
	gridName = $.trim(gridName);
	if (window.rowIndex[gridName] == undefined || window.rowIndex[gridName] == -1){
		return true;
	}else{
		dataGrid.datagrid('cancelEdit', window.rowIndex[gridName]);
		dataGrid.datagrid('endEdit', window.rowIndex[gridName]);
	}
}

/*
 * 功能：保存列表中发生编辑（修改、新增）的数据
 * 参数：单表窗体，还是多表窗体
 * 作者：李福明
 * 时间：2015-06-15
 */
function save(frameType){
	//如果SESSION失效，则证明登录账号失效，需要重新登录
	/*
	if (!isSessionValid()){
		relocationToLoad();
		return;
	}
	*/
	
	var dataGrid = null;
	var mdataGrid = null;
	var dtldataGrid = null;
	var gridName = "";
	var updateJSONArrayStr = "";
	
	var currentNode = $('#treeList').tree('getSelected');
		
	if (currentNode == null || currentNode == undefined){
			ShowMessage("提示...", "请在左边选择一个角色！", "W");
			return;
	}
	
	if (frameType.substring(0, 1).toUpperCase() == "S"){
	//如果是单表数据	
		dataGrid = $("#dataGrid");
		gridName = "dataGrid";
		var dsUIs = window.dsUIAll.DSUI;
		var dsUI = null;

		if (dsUIs != null && dsUIs.length > 0){
			for (var i = 0; i < dsUIs.length; i++){
				var DSUIs = dsUIs[i];
				
				if (DSUIs != undefined && DSUIs != null){
					var pageNo = DSUIs.PAGE_NO;

					if (pageNo != undefined && pageNo == "1"){
						dsUI = DSUIs;
						break;
					}
				}
			}
		}else{
			ShowMessage("错误...", "未取到界面参数！", "W");
			return;
		}
		
		updateJSONArrayStr = ConstutSQL(dataGrid, gridName, dsUI);
		
		if (updateJSONArrayStr != "" && updateJSONArrayStr != "ERROR"){
			var pageName = window.funnameStr;
			
			 var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"" + pageName + "\",UPDATELIST:[" + updateJSONArrayStr + "],"
			                           + "USER_ID:\""  
                                       +  localjsonObj.username + "\",VERIFY_NO:\"" +localjsonObj.verifyno+ "\"}";
			 
			 var params = {
					 getObject :updateObject,
					 errorMessage : ""
			 };        
			 $.ajax({
				 url:ip+"updatedata",
				 method:"POST",
				 data:params,
				 datatype:"json",
				 success:function(data){
					 ShowMessage("提示...", pageName + "数据保存成功！", "");
					 if (frameType.substring(0, 1).toUpperCase() == "S"){
						 dataGrid.datagrid("acceptChanges");
					 }
				 },
				 error:function(errorMessage){
					 ShowMessage("错误...",pageName + '信息保存失败！' + JSONToStr(errorMessage), "E");
				 }
			 });	
		}
	}	
}

/*
 * 功能：组织某一个列表的更新SQL语句
 * 参数：列表对象，列表名称，列表界面参数
 * 返回：更新的SQL语句，如果有异常则返回字符串"ERROR"
 * 作者：李福明
 * 时间：2015-06-19
 */
function ConstutSQL(dataGrid, gridName, dsUI){
	var retSQL = "";
		
	try{
		if ((window.rowIndex[gridName] != undefined && window.rowIndex[gridName] != null) && (window.rowIndex[gridName] != -1)){
			dataGrid.datagrid("endEdit", window.rowIndex[gridName]);
		}
			
		var dataRows = dataGrid.datagrid('getChecked');
		var messageStr = "";
		var gridUI = dsUI.DSUI;
		var dataGridColumns = dsUI.COLUMNS;
		
		if ((gridUI != null && gridUI.length > 0) && (dataGridColumns != null && dataGridColumns.length > 0)){			
			var tableName = gridUI[0].TABLE_NAME;
			var pageName = gridUI[0].PAGE_NAME;
			var currentNode = $('#treeList').tree('getSelected');
			
			var updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"DELETE\",FIELDS:null,WHERE:\" WHERE ROLECODE = '" + currentNode.id + "'\"}";

			for (var i = 0; i < dataRows.length; i++){
				var dataRow = dataRows[i];
				
				var fieldUpdateStr = "";
				
				for (var j = 0; j < gridUI.length; j++){
					var columnUI = gridUI[j];
					
					var fieldName = columnUI.FIELD;
					var fieldDesc = columnUI.FIELD_DESC;
					var fieldType = $.trim(columnUI.FIELD_TYPE.toString());
					var isNULL = columnUI.ISNULL;
					var isInvented = columnUI.IS_INVENTED;
					var defaultValue = columnUI.DEFAULT_VALUE;
					var fieldValue = "";
					
					//取默认值
					if (defaultValue != null && defaultValue != undefined){
						if (defaultValue != "" && defaultValue.substr(0, 1) == "$"){
							fieldValue = getDefaultValue(defaultValue);
						}else{
							fieldValue = dataRow[fieldName];
						}
					}else{
						fieldValue = dataRow[fieldName];
					}
					
					//只要不是虚拟字段，则进行更新SQL拼接
					if (isInvented != "1"){
						//进行字段内容验证，必填字段是否为空，如果为空则退出保存并提示错误信息
						if ((isNULL != undefined && isNULL != null) && isNULL == "0"){
							if ((fieldValue == undefined || fieldValue == null) || (fieldValue == "")){
								messageStr = fieldDesc + "为空！";
								break;
							}else{
								//拼接字段JSON						
								if (fieldUpdateStr == ""){
									fieldUpdateStr = "\"" +  fieldName + "\":\"" + fieldValue + "\"";
								}else{
									fieldUpdateStr = fieldUpdateStr + ",\"" +  fieldName + "\":\"" + fieldValue + "\"";
								}
							}
						}else{
							//拼接字段JSON
							if (fieldUpdateStr == ""){
								if ((fieldValue != undefined && fieldValue != null) && (fieldValue != "")){
									fieldUpdateStr = "\"" +  fieldName + "\":\"" + fieldValue + "\"";
								}else{
									fieldUpdateStr = "\"" +  fieldName + "\":null";
								}
							}else{
								if ((fieldValue != undefined && fieldValue != null) && (fieldValue != "")){
									fieldUpdateStr = fieldUpdateStr + ",\"" +  fieldName + "\":\"" + fieldValue + "\"";
								}else{
									fieldUpdateStr = fieldUpdateStr + ",\"" +  fieldName + "\":null";
								}
							}
						}
					}
				}

				if (messageStr != ""){
					break;
				}else{
					if (fieldUpdateStr != ""){
						fieldUpdateStr = "{" + fieldUpdateStr +"}";
						
						if (updateJSONArrayStr != ""){
							updateJSONArrayStr = updateJSONArrayStr + ",{TABLE:\"" + tableName + "\",TYPE:\"INSERT\",FIELDS:" + fieldUpdateStr + ",WHERE:\"\"}";
						}else{
							updateJSONArrayStr = "{TABLE:\"" + tableName + "\",TYPE:\"INSERT\",FIELDS:" + fieldUpdateStr + ",WHERE:\"\"}";
						}
					}
				} 
			}
			
			if (messageStr == ""){			
				retSQL = updateJSONArrayStr;
			}else{
				retSQL = "ERROR";
				ShowMessage("提示...", messageStr, "W");
			} 
		}
	}catch(e){
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
function exportExcel(frameType){
	frameType = $.trim(frameType);
	frameType = frameType.substring(0, 1).toUpperCase();
	var dsUI = dsUI = window.dsUIAll.DSUI;;
	
	if (frameType == "S"){
		//如果是单表窗体
		if ((dsUI != undefined && dsUI != null) && dsUI.length > 0){
			var sheetName = dsUI[0].PAGE_NAME;
			var dataGrid = $('#dataGrid');
			
			ExporterExcel(dataGrid, sheetName);
		}
	}else{
		//如果是多表窗体
		if (frameType == "M"){
			var msheetName = "", dtlsheetName = "";
			var mdataGrid = $('#mdataGrid');
			var dtldataGrid= $('#dtldataGrid');
			
			if ((dsUI != undefined && dsUI != null) && dsUI.length > 0){
				for (var i = 0; i < dsUI.length; i++){
					var singleUI = dsUI[i];
					var pageNo = singleUI.PAGE_NO;
					var pageName  = singleUI.PAGE_NAME;
					
					if (pageNo == "0"){
						msheetName = pageName;
					}else{
						if (pageNo == "1"){
							dtlsheetName = pageName;
						}
					}
				}
				
				ExporterExcelEx(mdataGrid, dtldataGrid, msheetName, dtlsheetName);
			}
		}else{
			ShowMessage("错误...", "非法窗体类型！", "E");
		}
	}
}

/*
 * 功能：取列表当前行数
 * 参数：列表对象
 * 作者：李福明
 * 时间：2015-06-11
 */
function getRowIndex(target){
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}

/*
 * 功能：对整个页面或某一个部分进行重新CSS样式渲染
 * 参数：对象ID
 * 时间：2015-06-10
 */
function bodyRefresh(targetObj){
	if (targetObj == null){
		$.parser.parse();
	}else{
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