var ip="/OA"
// 查询
function getSelectData(OBJECT,WHERE,PAGE,PAGE_SIZE){
  let data={
    getObject:{
      "GETTYPE":"SELECT",
      "DBOBJECT":"0",
      "OBJECT":OBJECT,
      "PARAMETER":"",
      "WHERE":WHERE,
      "ORDER":"",
      "PAGE":PAGE,
      "PAGE_SIZE":PAGE_SIZE,
      // "TYPEDESC":"系统权限",
      "TYPEDESC":"",
      "IS_GRID":"1",
      "USER_ID":localjsonObj.username,
      "VERIFY_NO":localjsonObj.verifyno,
    },
    errorMessage: "",
  }
    var dataResult="getObject="+ encodeURI(JSON.stringify(data.getObject)) +"errorMessage=''";
    return dataResult;
}

// 新增
function getAddData(TABLE,FIELDS){
  let data={
    getObject:{
      "DBOBJECT": "0",
      "TYPEDESC": "",
      "UPDATELIST": [{
        "TABLE": TABLE,
        "TYPE": "INSERT",
        "WHERE": "",
        "FIELDS":FIELDS
      }],
      "USER_ID":localjsonObj.username,
      "VERIFY_NO":localjsonObj.verifyno,
    },
    errorMessage: "",
  }
 var dataResult="getObject="+ JSON.stringify(data.getObject)+"errorMessage=''";
  return dataResult;
}

//编辑
function getUpdateData(TABLE,WHERE,FIELDS){
  let data={
    getObject:{
      "DBOBJECT": "0",
      "TYPEDESC": "",
      "UPDATELIST": [{
        "TABLE": TABLE,
        "TYPE": "UPDATE",
        "WHERE": WHERE,
        "FIELDS":FIELDS
      }],
      "USER_ID":localjsonObj.username,
      "VERIFY_NO":localjsonObj.verifyno,
    },
    errorMessage: "",
  }
 var dataResult="getObject="+ JSON.stringify(data.getObject)+"errorMessage=''";
  return dataResult;
}

// 删除
function getDeleteData(TABLE,WHERE){
  let data={
    getObject:{
      "DBOBJECT": "0",
      "UPDATELIST": [{
        "TABLE": TABLE,
        "TYPE": "DELETE",
        "WHERE": WHERE,
        "FIELDS":""
      }],
      "TYPEDESC": "",
      "USER_ID":localjsonObj.username,
      "VERIFY_NO":localjsonObj.verifyno,
    },
    errorMessage: "",
  }
 var dataResult="getObject="+ JSON.stringify(data.getObject)+"errorMessage=''";
  return dataResult;
}