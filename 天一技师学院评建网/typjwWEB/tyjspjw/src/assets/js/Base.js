var Host = "http://base.hope55.com/";
var API = Host + "API/WebAPI/";
var BasePageSize = 9; //默认分页数
var DefualtDepartmentID = 8; //默认部门ID
var DefualtOrganID = 7; //默认企业ID
//数据模型
var Model = {
  //部门
  Department: {
    Name: null,
    Address: null,
    Phone: null,
    Logo: null,
    Email: null,
    Fax: null,
    ZipCode: null,
    Alias: null
  },
  //导航栏
  Nav: {
    FID: null,
    ID: null,
    Logo: null,
    Name: null,
    Type: null,
    Url: null
  },
  //栏目
  Column: {
    Aliase: null,
    Logo: null,
    Name: null
  },
  //部门集合
  Departments: {
    ID: null,
    Name: null,
    Alias: null
  },
  //单页信息
  SinglePage: {
    ColumnID: null,
    CreateTime: null,
    Describe: null,
    ID: null,
    Info: null,
    Photo: null,
    Press: null
  },
  //列表信息集合
  NewsInfos: {
    ID: null,
    Title: null,
    Author: null,
    Source: null,
    ShowTime: null,
    Cover: null,
    Describe: null,
    HasPhoto: null,
    Hot: null,
    KeyWord: null,
    Top: null,
    Url: null
  },
  //列表信息
  NewsInfo: {
    Author: null,
    Details: null,
    Fid: null,
    KeyWord: null,
    Press: 1,
    ShowTime: null,
    Source: null,
    Title: null,
    Url: null
  },
  //文件信息集合
  FilesInfo: {
    Title: null,
    Top: null,
    Url: null,
    ShowTime: null,
    Hot: null,
    FileUrl: null,
    Describe: null
  },
  //企业信息
  OrganInfo: {
    Address: null,
    Alias: null,
    CreateTime: null,
    ID: null,
    LOGO: null,
    Name: null,
    Record: null,
    State: null,
    Tel: null
  }
}

//通用函数
var Curren = {
  //时间截取
  formatDatebox: function (value, char) {
    var year = value.substr(0, 4);
    var month = value.substr(5, 2);
    var day = value.substr(8, 2);
    var date = Curren.isEmpty(char) ? value.substr(0, 10) : year + char + month + char + day;
    return date;
  },
  //判断字符是否为空的方法
  isEmpty: function (obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }
}

//数据接口
var Base = {
  //获取导航栏栏目
  GetNavColumnsByDid: function (Did) {
    if (Curren.isEmpty(Did)) Did = DefualtDepartmentID;
    var list = [];
    $.ajax({
      type: "GET",
      url: API + "GetNavColumnsByDid?Did=" + Did,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        var GetData = JSON.parse(data);
        var len = GetData.length;
        for (var i = 0; i < len; i++) {
          Model.Nav = GetData[i];
          Model.Nav.LOGO = Host + Model.Nav.LOGO;
          list.push(Model.Nav);
        }
      }
    })
    return list;
  },
  //获得指定栏目信息
  GetColumnByid: function (Cid) {
    $.ajax({
      type: "GET",
      url: API + "GetColumnByid?Cid=" + Cid,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        Model.Column = JSON.parse(data);
        Model.Column.Logo = Host + Model.Column.Logo;
        if (Model.Column.Name == "通知公告") {
          Model.Column.Router = "/tzgg"
        } else if(Model.Column.Name == "评建动态") {
          Model.Column.Router = "/pjdt"
        }else if(Model.Column.Name == "评建简报") {
          Model.Column.Router = "/pjjb"
        }else if(Model.Column.Name == "政策文件") {
          Model.Column.Router = "/zcwj"
        }
      }
    })
    return Model.Column;
  },
  //获得指定部门信息
  GetDepartmentByDid: function (Did) {
    if (Curren.isEmpty(Did)) Did = DefualtDepartmentID;
    $.ajax({
      type: "GET",
      url: API + "GetDepartmentByDid?Did=" + Did,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        Model.Department = JSON.parse(data);
        Model.Department.Logo = Host + Model.Department.Logo;
      }
    })
    return Model.Department;

  },
  //根据企业获取全部部门
  GetDepartmentsByOid: function (Oid) {
    if (Curren.isEmpty(Oid)) Oid = DefualtOrganID;
    var list = [];
    $.ajax({
      type: "GET",
      url: API + "GetDepartmentsByOid?Oid=" + Oid,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        var GetData = JSON.parse(data);
        var len = GetData.length;
        for (var i = 0; i < len; i++) {
          Model.Departments = GetData[i];
          list.push(Model.Departments);
        }
      }
    })
    return list;
  },
  //获取单页信息
  GetSinglePageInfoByCid: function (Cid) {
    $.ajax({
      type: "GET",
      url: API + "GetSinglePageInfoByCid?Cid=" + Cid,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        Model.SinglePage = JSON.parse(data);
      }
    })
    return Model.SinglePage
  },
  //获取列表信息集合
  GetNewsInfoByCid: function (Cid, PageIndex, PageSize, SearchWord) {
    var list = [];
    if (Curren.isEmpty(PageIndex)) PageIndex = PageIndex;
    if (Curren.isEmpty(PageSize)) PageSize = BasePageSize;
    if (Curren.isEmpty(SearchWord)) SearchWord = "";
    var Senddata = {
      PageIndex: PageIndex,
      Cid: Cid,
      PageSize: PageSize,
      SearchWord: SearchWord
    }
    $.ajax({
      type: "GET",
      url: API + "GetNewsInfoByCid",
      async: false,
      data: Senddata,
      dataType: "json",
      cache: true,
      success: function (data) {
        var GetData = JSON.parse(data).row;
        var Total = JSON.parse(data).total;
        var len = GetData.length;
        for (var i = 0; i < len; i++) {
          Model.NewsInfos = GetData[i];
          Model.NewsInfos.ShowTime = Curren.formatDatebox(Model.NewsInfos.ShowTime);
          Model.NewsInfos.Total = Total;
          if (!Curren.isEmpty(Model.NewsInfos.Cover)) Model.NewsInfos.Cover = Host + Model.NewsInfos.Cover;
          list.push(Model.NewsInfos);
        }
      }
    })
    return list;
  },
  //获取列表信息详情
  GetNewsInfoByNid: function (Nid) {
    $.ajax({
      type: "GET",
      url: API + "GetNewsInfoByNid?Nid=" + Nid,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        Model.NewsInfo = JSON.parse(data);
      }
    })
    return Model.NewsInfo;
  },
  //获取文件信息集合
  GetFilesInfoByCid: function (Cid, PageIndex, PageSize, SearchWord) {
    var list = [];
    if (Curren.isEmpty(PageIndex)) PageIndex = PageIndex;
    if (Curren.isEmpty(PageSize)) PageSize = BasePageSize;
    if (Curren.isEmpty(SearchWord)) SearchWord = "";
    var Senddata = {
      PageIndex: PageIndex,
      Cid: Cid,
      PageSize: PageSize,
      SearchWord: SearchWord
    }
    $.ajax({
      type: "GET",
      url: API + "GetFilesInfoByCid",
      async: false,
      data: Senddata,
      dataType: "json",
      cache: true,
      success: function (data) {
        var GetData = JSON.parse(data).row;
        var Total = JSON.parse(data).total;
        var len = GetData.length;
        for (var i = 0; i < len; i++) {
          Model.FilesInfo = GetData[i];
          Model.FilesInfo.ShowTime = Curren.formatDatebox(Model.FilesInfo.ShowTime);
          Model.FilesInfo.Total = Total;
          if (!Curren.isEmpty(Model.FilesInfo.FileUrl)) Model.FilesInfo.FileUrl = Host + Model.FilesInfo.FileUrl;
          if (Curren.isEmpty(Model.FilesInfo.Url)) Model.FilesInfo.Url = "javascript:;";
          list.push(Model.FilesInfo);
        }
      }
    })
    return list;
  },
  //获取企业信息
  GetOrganInfoByOid: function (Oid) {
    if (Curren.isEmpty(Oid)) Oid = DefualtOrganID;
    $.ajax({
      type: "GET",
      url: API + "GetOrganInfoByOid?Oid=" + Oid,
      async: false,
      dataType: "json",
      cache: true,
      success: function (data) {
        Model.OrganInfo = JSON.parse(data);
      }
    })
    return Model.OrganInfo;
  }
}

export { //很关键
  Base
}
