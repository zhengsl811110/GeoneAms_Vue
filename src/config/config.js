export const AppId = "ams";
const baseUrl="http://192.168.72.219:1234/onemapsrv/";
export const ServerUrl = {
    login: baseUrl+"login?appid="+AppId,
    menu:baseUrl+"menu?appid="+AppId,
    recordCount: baseUrl + "query?appid="+AppId+"&ServiceName=recordCountService",
    dictionary: {
        select: baseUrl + "getBQueryResult?appid="+AppId+"&name=getDictionary",
        applyType: baseUrl + "getBQueryResult?appid="+AppId+"&name=getDictionaryApplyType",
        fileCode: {
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_DIC_SPLX",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_DIC_SPLX",
            edit: baseUrl + "execute?appid="+AppId+"&Servicename=editFileCodeService",
            del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteFileCodeService"
        },
        fileList: {
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_DIC_CLQD",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_DIC_CLQD",
            edit: baseUrl + "execute?appid="+AppId+"&Servicename=editFileListService",
            del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteFileListService",
            order: baseUrl + "execute?appid="+AppId+"&Servicename=orderFileListService"
        }
    },
    project: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=",
        edit: baseUrl + "execute?appid="+AppId+"&Servicename=editProjectService",
        del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteProjectService",
        info:baseUrl + "getBQueryResult?appid="+AppId+"&name=projectInfo",
    },
    volume: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_Volume",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_Volume",
        edit: baseUrl + "execute?appid="+AppId+"&Servicename=editVolumeService",
        del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteVolumeService",
        order: baseUrl + "execute?appid="+AppId+"&Servicename=orderVolumeService",
        bookToVolume: baseUrl + "query?appid="+AppId+"&Servicename=bookToVolumeService",
        setVolume: baseUrl + "execute?appid="+AppId+"&Servicename=setVolumeService"
    },
    apply: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=",
        edit: baseUrl + "execute?appid="+AppId+"&Servicename=editApplyService",
        del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteApplyService",
        order: baseUrl + "execute?appid="+AppId+"&Servicename=orderApplyService"
    },
    book: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=",
        edit: baseUrl + "execute?appid="+AppId+"&Servicename=editBookService",
        del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteBookService",
        order: baseUrl + "execute?appid="+AppId+"&Servicename=orderBookService"
    },
    file: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=",
        edit: baseUrl + "execute?appid="+AppId+"&Servicename=editFileService",
        del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteFileService",
        order: baseUrl + "execute?appid="+AppId+"&Servicename=orderFileService"
    },
    search: {
        grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_Search",
        data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_Search"
    },
    report: {
        fm: "http://192.168.72.219:8080/amsreport/createReport/"+AppId,
        bq: "http://192.168.72.219:8080/amsreport/createSign/"+AppId,
        down: "http://192.168.72.219:8080/amsreport/downReport"
    },
    viewer:{
        book:baseUrl+"getBQueryResult?appid="+AppId+"&name=bookView",
        file:baseUrl+"getBQueryResult?appid="+AppId+"&name=fileView"
    },
    chart:{
        project:baseUrl+"getBQueryResult?appid="+AppId+"&name=project",
        volume:baseUrl+"getBQueryResult?appid="+AppId+"&name=volume",
        apply:baseUrl+"getBQueryResult?appid="+AppId+"&name=apply",
        job:{
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_Chart_Job",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_Chart_Job",
        },
        type:{
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_Chart_Type",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_Chart_Type",
        }
    },
    city:{
        project:{
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_City_Project",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_City_Project",
            edit: baseUrl + "execute?appid="+AppId+"&Servicename=editCityProjectService",
            del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteCityProjectService"
        },
        info:{
            grid: baseUrl + "gridcols?appid="+AppId+"&gridname=AMS_City_File",
            data: baseUrl + "gridData?appid="+AppId+"&gridname=AMS_City_File",
            edit: baseUrl + "execute?appid="+AppId+"&Servicename=editCityFileService",
            del: baseUrl + "execute?appid="+AppId+"&Servicename=deleteCityFileService",
            imgUrl:"http://192.168.72.219:8080/SQDA/Show/Show.aspx?param=",
            pdfUrl:"http://192.168.72.219:8080/archiveFile/"
        }
    }
};

export const BmConfig={
    gh: {
        name: "规划",
        ename:"gh",
        projectGridName: "AMS_Project",
        applyGridName: "AMS_Apply_GH",
        bookGridName: "AMS_Book",
        fileGridName: "AMS_File"
    },
    fc: {
        name: "房产",
        ename:"fc",
        projectGridName: "AMS_Project_FC",
        applyGridName: "AMS_Apply_FC",
        bookGridName: "AMS_Book_FC",
        fileGridName: "AMS_File",
        rowDraggable: false,
        bzdw:"苏州宿迁工业园区房地产交易管理中心",
        pageSize:1000,
        pageSizeOptions:[1000]
    },
    gt: {
        name: "国土",
        ename:"gt",
        projectGridName: "AMS_Project_GT",
        applyGridName: "AMS_Apply_FC",
        bookGridName: "AMS_Book_FC",
        fileGridName: "AMS_File",
        rowDraggable: false,
        bzdw:"苏州宿迁工业园区房地产交易管理中心"
    },
    td: {
        name: "土地",
        ename:"td",
        projectGridName: "AMS_Project_GT",
        applyGridName: "AMS_Apply_TD",
        bookGridName: "AMS_Book_TD",
        fileGridName: "AMS_File",
        rowDraggable: false,
        bzdw:"苏宿工业园区国土房产局",
        appendBook:true
    },
    ztb: {
        name: "招投标",
        ename:"ztb",
        projectGridName: "AMS_Project_ZTB",
        applyGridName: "AMS_Apply_ZTB",
        bookGridName: "AMS_Book_ZTB",
        fileGridName: "AMS_File",
        rowDraggable: false,
        bzdw:"苏州工业园区建设工程交易中心",
        appendBook:true
    },
    za: {
        name: "质安",
        ename:"za",
        projectGridName: "AMS_Project_ZA",
        applyGridName: "AMS_Apply_ZA",
        bookGridName: "AMS_Book",
        fileGridName: "AMS_File",
        bzdw:"苏州宿迁工业园区建设工程质量安全监督站",
        appendBook:true
    },
    js: {
        name: "建设",
        ename:"js",
        projectGridName: "AMS_Project",
        applyGridName: "AMS_Apply_GH",
        bookGridName: "AMS_Book",
        fileGridName: "AMS_File",
        bzdw:"苏州宿迁工业园区规划建设局",
        appendBook:true
    },
    cg: {
        name: "城管",
        label:"",
        ename:"cg",
        projectGridName: "AMS_Project_CG",
        applyGridName: "AMS_Apply_CG",
        bookGridName: "AMS_Book_CG",
        fileGridName: "AMS_File_CG",
        rowDraggable: false,
        bzdw:"苏宿工业园区国土房产局"
    },
    hb: {
        name: "环保",
        label:"",
        ename:"hb",
        projectGridName: "AMS_Project_HB",
        applyGridName: "AMS_Apply_HB",
        bookGridName: "AMS_Book_FC",
        fileGridName: "AMS_File",
        rowDraggable: false,
        bzdw:"苏宿工业园区国土房产局"
    }
};

function GetUserAccount(){
    let userCheck = localStorage.getItem("ams_user_check");
    let userAccount='';
    if (userCheck === "true")
        userAccount = decodeURIComponent(localStorage.getItem('ams_user_account'));
    else
        userAccount = decodeURIComponent(sessionStorage.getItem('ams_user_account'));
    return userAccount;
}
export const ApplicationConfig={
    appId: AppId,
    userState:decodeURIComponent(sessionStorage.getItem('ams_user_state')) === 'true' ? true : false,
    userAccount: GetUserAccount(),
    userName: decodeURIComponent(sessionStorage.getItem('ams_user_name')),
    userPsd:decodeURIComponent(localStorage.getItem('ams_user_psd')),
};


export  function UserState(){
    if(ApplicationConfig.userState===false)
        window.location.href = "index.html?r=" + Math.random();
    else
        return true;
}

export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function getGridSelectedRow(g,vue){
    let rowSelected = g.getSelectedRow();
    if (!rowSelected) {
        vue.$notify({
          title: '警告',
          message: '请选中需要操作的行',
          type: 'warning'
        });
        return null;
    }
    return rowSelected; 
}

export function DateFormat(fmt){
    if(fmt instanceof Date){
        return fmt.Format("yyyy-MM-dd");
    }
    else if(typeof(fmt)=='undefined'){
        return "";
    }
    else{
        return fmt;
    }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
