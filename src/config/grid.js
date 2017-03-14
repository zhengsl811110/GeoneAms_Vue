import $ from 'jquery'
export default class LigerGrid{
    constructor(columnUrl){
        this.columnUrl=columnUrl;
    }
    
    getConfig(options){
        $.getJSON(this.columnUrl,{},function(res){
            options.callback(
                {
                    columns:res.data,
                    checkbox: options.checkbox || false,
                    rownumbers: options.rownumbers,
                    rowDraggable: options.rowDraggable || false,
                    alternatingRow: false,
                    headerRowHeight: 35,
                    height: options.height || '100%',
                    width: '100%',
                    pageSizeOptions: options.pageSizeOptions || [10, 20, 50],
                    pageSize: options.pageSize || 10,
                    method: "get",
                    url: options.url,
                    parms: options.parms || {},
                    dataAction: "server",
                    pageParmName: 'page',
                    pagesizeParmName: 'pagesize',
                    sortnameParmName: 'sortname',
                    sortorderParmName: 'sortorder'
                }
            );
        });
    }
}