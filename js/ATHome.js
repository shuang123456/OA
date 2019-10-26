/**********************************************************
* 功能：进行系统菜单创建
* 作者：李福明
* 时间：2015-06-10
**********************************************************/

var ip="/OA/"
function constructHome(){
	showMask("菜单构建中，请等待...");
	var params = {
       getObject :"{GETTYPE:'MENUS',DBOBJECT:\"0\",OBJECT:'MENUS',PARAMETER:'" + localjsonObj.rolecode + "',WHERE:'',ORDER:'',PAGE:'',TYPEDESC:'系统菜单',IS_GRID:'0','USER_ID':'"
                       + localjsonObj.username
                       + "','VERIFY_NO':'"
                       + localjsonObj.verifyno
                       + "'}",
       errorMessage : ""
    };
	$.ajax({
		url:ip+"getdata",
		method:"post",
		data:params,
		datatype:"json",
		success:function(data){
			// console.log(data)
			var jsonobj = JSON.parse(data);  //使用这个方法解析json
            var sysmenus = jsonobj.DATA;  //取从后台传出的所有菜单项  sysmenus  Object { menus: Array[4] }

		    //进行系统菜单创建	
			InitLeftMenu(sysmenus);
			
			//MessageUtil.;
			CloseMask();
		},
		error:function(errorMessage){
			CloseMask();
			ShowMessage("错误...", "未取到系统菜单！", "E");
		}
	});
}

//初妾化左伿
//_menus ( sysmenus)
function InitLeftMenu(_menus) {
	//accordion animate  定义当展开或折叠面板（panel）时是否显示动画效果。
	//fit    设置为 true，就使折叠面板（Accordion）容器的尺寸适应它的父容器
	//border 定义是否显示边框。
	$("#nav").accordion({animate:false,fit:true,border:false});
	var selectedPanelname = '';
	
    $.each(_menus.menus, function(i, n) {
		var menulist ='';
		menulist +='<ul class="easyui-tree">';
        $.each(n.menus, function(j, o) {
			menulist += '<li><div><a ref="'+o.menuid+'" href="#" rel="' + o.url + '" ><span>&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div> ';
			console.log(menulist);
			
			if(o.child && o.child.length>0)
			{
				li.find('div').addClass('icon-arrow');
				menulist += '<ul>';
				$.each(o.child,function(k,p){
					menulist += '<li><div><a ref="'+p.menuid+'" href="#" rel="' + p.url + '" ><span>&nbsp;</span><span class="nav">' + p.menuname + '</span></a></div></li>';
				});
				menulist += '</ul>';
				console.log('1');
			}

			menulist+='</li>';
        });
		menulist += '</ul>';
        /**
         * 添加一个新的面板（panel）。默认情况下，新添加的面板（panel）会被选中。
         * 如需添加一个未被选中的新面板（panel），请传递 'selected' 属性，并将其设置为 false。
         * **/
		$('#nav').accordion('add', {
            title: n.menuname,
            content: menulist,
			border:false,
            iconCls: 'icon-' + n.icon//图标
        });

		if(i==0)
			selectedPanelname =n.menuname;

    });
	$('#nav').accordion('select',selectedPanelname);
	//select  选择指定的面板（panel）。'which' 参数可以是面板（panel）的标题（title）或索引（index）。
	//console.log(selectedPanelname);//基础档案管理

	$('.easyui-tree li a').click(function(){
		var tabTitle = $(this).children('.nav').text();

		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var icon = getIcon(_menus, menuid);
		console.log(url,menuid,icon);
		//url 单表、 多表 	
		addTab(tabTitle,url,icon);//通过使用 jQuery EasyUI 可以很容易地添加 Tabs。您只需要调用 'add' 方法即可。
		$('.easyui-tree li div').removeClass("selected");//删除已有selected
		$(this).parent().addClass("selected");//添加当前selected
	}).hover(function(){
		$(this).parent().addClass("hover");
		//console.log('111');//实现了鼠标进入事件
	},function(){
		$(this).parent().removeClass("hover");
		//console.log('222');//实现了鼠标移除事件
	});
}

//获取左侧导航的图枿
function getIcon(_menus, menuid){
	var icon = 'icon-';
	$.each(_menus.menus, function(i, n) {	
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid==menuid){
				icon += o.icon;
			}
		 });
	});	
	return icon;
}

function find(menuid){
	var obj=null;
	$.each(_menus.menus, function(i, n) {
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid==menuid){
				obj = o;
			}
		 });
	});
	return obj;
}
//通过使用 jQuery EasyUI 可以很容易地添加 Tabs。您只需要调用 'add' 方法即可。
function addTab(subtitle,url,icon){
	if(!$('#tabs').tabs('exists',subtitle)){
			
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			icon:icon
		});
	}else{
		$('#tabs').tabs('select',subtitle);
		$('#mm-tabupdate').click();
	}
	tabClose();
}

function createFrame(url)
{
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose()
{
	/*双击关闭TAB选项勿*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	});
	/*为耩¡¹卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}


//绑定右键菜单事件
function tabCloseEven() {

    $('#mm').menu({
        onClick: function (item) {
            closeTab(item.id);
        }
    });

    return false;
}

function closeTab(action)
{
    var alltabs = $('#tabs').tabs('tabs');
    var currentTab =$('#tabs').tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	});

    switch (action) {
        case "refresh":
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
            $('#tabs').tabs('update', {
                tab: currentTab,
                options: {
                    content: createFrame(src)
                }
            });
            break;
        case "close":
            var currtab_title = currentTab.panel('options').title;
            $('#tabs').tabs('close', currtab_title);
            break;
        case "closeall":
            $.each(allTabtitle, function (i, n) {
                if (n != onlyOpenTitle){
                    $('#tabs').tabs('close', n);
				}
            });
            break;
        case "closeother":
            var currtab_title = currentTab.panel('options').title;
            $.each(allTabtitle, function (i, n) {
                if (n != currtab_title && n != onlyOpenTitle)
				{
                    $('#tabs').tabs('close', n);
				}
            });
            break;
        case "closeright":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);

            if (tabIndex == alltabs.length - 1){
                alert('亲，后边没有哿^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i > tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
					}
                }
            });

            break;
        case "closeleft":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == 1) {
                alert('亲，前边那个上头有人，咱惹不起哦⾿^@^!!');
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i < tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
					}
                }
            });

            break;
        case "exit":
            $('#closeMenu').menu('hide');
            break;
    }
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
// function msgShow(title, msgString, msgType) {
// 	$.messager.alert(title, msgString, msgType);
// }


/*
 *  退出系统按钮点击事件  jQueryEasyUI Messager基本使用
 */
function ApplicationClose(){
	var sureMess = "确定退出系统？<br>[确定]退出，[取消]不退出";
	
	$.messager.confirm("提示", sureMess, function (r) {
		 if (r) {
				
				localStorage.clear();
				window.location.href = 'index.html';
			
			
		}
});
}



/*
 *修改密码按钮点击事件
 */
function ShowEditPassWindow(){
	var winWidth = 260;
	var winHeight = 170;
	var $win;
	
	$("#editWindow").css("position","static"); 

	$win = $('#editWindow').window({
	    title: "修改密码",
	    width: winWidth,
	    height: winHeight,
	    //定位到屏幕中间位置
	    top:  ($(window).height() - winHeight) * 0.5,
	    left: ($(window).width() - winWidth) * 0.5,
	    shadow: true,
	    modal: true,
	    iconCls: 'icon-file',
	    closed: true,
	    //最小化、最大化、是否可折叠
	    minimizable: false,
	    maximizable: false,
	    collapsible: false,
	    //面板（panel）关闭后触发
	    onClose:function(){
	        $("#editWindow").css("position","absolute"); 
	    	window.focusGrid = "";
	    }
	});

	$win.window("open");
}


//  密码修改确定按钮点击事件
function btOkClick(){
	var oldPass = $("#oldpassword").val();
	var newPass = $("#newpassword").val();
	var okPass = $("#okpassword").val();
	if (oldPass == undefined || oldPass ==null || oldPass == ""){
		ShowMessage("提示...", "请录入原始密码！", "W");
		return;
	}
	
	if (newPass == undefined || newPass ==null || newPass == ""){
		ShowMessage("提示...", "请录入新始密码！", "W");
		return;
	}
	
	if (okPass == undefined || okPass ==null || okPass == ""){
		ShowMessage("提示...", "请录入确认密码！", "W");
		return;
	}
	
	if (newPass != okPass){
		ShowMessage("提示...", "新密码与确认密码不一致！", "W");
		return;
	}else{
				var userName = localjsonObj.username;

	    		var whereStr = "USER_CODE='" + userName + "'";

				var getDataJsonString = "{GETTYPE:\"SELECT\",DBOBJECT:\"0\",OBJECT:\"TB_USER\",PARAMETER:\"\",WHERE:\""
             								+ whereStr + "\",ORDER:\"\",PAGE:\"\",TYPEDESC:\"系统用户\",IS_GRID:\"2\",\"USER_ID\":\""
                                            + localjsonObj.username
                                            + "\",\"VERIFY_NO\":\""
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
								if (data != null && data != undefined){
									var jsonobj = JSON.parse(data);  //获取到的列表数据

									if (jsonobj.length > 0){
										var passwordStr = jsonobj[0].USER_PWD;
										
										if (passwordStr == null || passwordStr == undefined){
											ShowMessage("错误...", "未取到原始密码信息！", "W");
										}else{
											if (oldPass != passwordStr){
												ShowMessage("错误...", "原始密码录入错误！", "W");
											}else{
												var updateJSONArrayStr = "{TABLE:\"TB_USER\",TYPE:\"UPDATE\",FIELDS:{\"USER_PWD\":\"" + okPass + "\"},WHERE:\"" + whereStr + "\"}";
												var updateObject = "{DBOBJECT:\"0\",TYPEDESC:\"用户信息\",UPDATELIST:[" + updateJSONArrayStr + "],\"USER_ID\":\""
                                                                           + localjsonObj.username 
                                                                           + "\",\"VERIFY_NO\":\""
                                                                           + localjsonObj.verifyno 
                                                                           + "\"}";

												var uparams = {
		 															getObject :updateObject,
		 															errorMessage : ""
 																};

 												$.ajax({
 													url:ip+"updatedata",
 													method:"POST",
 													data:uparams,
 													datatype:"json",
 													success:function(data){
 														ShowMessage("提示...", "密码修改成功！", "");
 													},
 													error:function(errorMessage){
 														ShowMessage("错误...", "密码修改失败！", "E");
 													}
 												});
											}
										}
									}else{
										ShowMessage("错误...", "未取到当前用户信息！", "W");
									}																	
								}
							},
							error:function(errorMessage){
								ShowMessage("错误...", "未取到" + DSUI.PAGE_NAME + "信息！" + JSONToStr(errorMessage), "E");
							}
						});	
				}catch (e) {
						ShowMessage("错误...", "未取到当前用户信息！" + e.description, "E");
				}
				
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

