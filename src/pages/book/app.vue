<template>
  <div class="innercontext">
    <vContainer  v-loading.fullscreen.lock="loading" element-loading-text="正在生成备考表,请稍后...">
        <header>
            <div class="toolbar">
                <el-button type="primary" size="small" @click="onPreviewBook" v-if="from=='search'"><i class="fa fa-eye"></i>预览</el-button>
                <el-button-group v-if="from=='edit'">
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建册</el-button>
                    <el-button type="primary" size="small" @click="onInsert" v-if="appendBook"><i class="fa fa-level-down" ></i>追加册</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i>编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除 </el-button>
                    <el-button type="primary" size="small" @click="onOrder"><i class="fa fa-bars"></i>调序</el-button>
                </el-button-group>
                <el-button-group v-if="from=='edit'">
                    <el-button type="primary" size="small" @click="onPdf"><i class="fa fa-file-pdf-o"></i>生成封面(PDF)</el-button>
                    <el-button type="primary" size="small" @click="onWord"><i class="fa fa-file-word-o"></i>生成封面(WORD)</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="册管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vBook :form="formBook"  @closeDialog="closeDialog" @saveBook="saveBook"  class="dialog" ></vBook> 
        </el-dialog>
    </vContainer>
     <vContainer id="maingrid2" :loading="true" style="margin-top: 10px;top: 50%;">
        <header>
            <div class="toolbar">
                <el-button type="primary" size="small" @click="onPreviewFile" v-if="from=='search'"><i class="fa fa-eye"></i>预览</el-button>
                <el-button-group v-if="from=='edit'">
                    <el-button type="primary" size="small" @click="onAddFile"><i class="fa fa-plus-square-o"></i>新建文件</el-button>
                    <el-button type="primary" size="small" @click="onEditFile"><i class="fa fa-pencil-square-o"></i>编辑 </el-button>
                    <el-button type="primary" size="small" @click="onDeleteFile"><i class="fa fa-trash-o"></i>删除</el-button>
                    <el-button type="primary" size="small" @click="onOrderFile"><i class="fa fa-bars"></i>调序</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="文件管理"  v-model="dialogFormVisibleFile"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vFile :form="formFile"  @closeDialog="closeDialog" @saveFile="saveFile"  class="dialog"></vFile>           
        </el-dialog>
    </vContainer>
  </div>
</template>

<script>
import $ from 'jquery'

import 'assets/ligerUI/js/core/base.js'
import 'assets/ligerUI/js/plugins/ligerGrid.js'
import 'assets/ligerUI/js/plugins/ligerResizable.js'
import 'assets/ligerUI/js/plugins/ligerDrag.js'

import 'assets/ligerUI/skins/Aqua/css/ligerui-all.css'

import vContainer from 'components/vContainer.vue'
import vBook from 'components/vBook.vue'
import vFile from 'components/vFile.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig,DateFormat} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null,g2=null;
let checkedID=[];
const bmConfig = BmConfig[getQueryString("bm")];
// console.log(projectType);
export default {
    data(){
        return{
            from:getQueryString("from"),
            appendBook:bmConfig.appendBook||false,
            current:bmConfig.ename,
            currentBookId:"",
            zlsdm:"",
            loading:false,
            dialogFormVisible:false,
            dialogFormVisibleFile:false,
            formBook:this.initBookForm(),
            formFile:this.initFileForm()
        }
    },
    components: {
        vContainer,
        vBook,
        vFile
    },
    mounted:function(){
        let self=this;
        let grid=new LigerGrid(ServerUrl.book.grid+bmConfig.bookGridName);
        grid.getConfig({
                rownumbers: true,
                rowDraggable: self.from=='search'?false:true,
                height: "50%",
                pageSize: 50,
                url:ServerUrl.book.data+bmConfig.bookGridName,
                parms:{
                    sortname: "xh",
                    sortorder: "asc",
                    pid: getQueryString("ID")
                },
                callback: function(gridConfig) {
                    gridConfig.onSelectRow = function(data, rowindex, rowobj) {
                        self.loadGridTwo(data.id, data.zlsdm);
                    };
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        });
    },
    methods:{
        initBookForm(){
            let bgqx = parent.getDictionarySelectByType("BGQX"),
                mj = parent.getDictionarySelectByType("MJ"),
                ljr = parent.getDictionarySelectByType("LJR"),
                shr = parent.getDictionarySelectByType("SHR");
             return {
                id: "",
                pid: getQueryString("ID"),
                cbt: "",
                bgqx: bgqx.defaultSelectedLabel,
                bgqxType: bgqx.selectList,
                mj: mj.defaultSelectedLabel,
                mjType: mj.selectList,
                bzdw: bmConfig.bzdw || "苏州宿迁工业园区规划建设局",
                ljsj: "",
                ljr: ljr.defaultSelectedLabel,
                ljrType: ljr.selectList,
                shsj: "",
                shr: shr.defaultSelectedLabel,
                shrType: shr.selectList,
                selfid: ""
            }
        },
        initFileForm(){
            let cz = parent.getDictionarySelectByType("CZ");
            return{
                id: "",
                pid: this.currentBookId,
                wjtm: "",
                wjbh: "",
                rq: "",
                sfsz: "否",
                sfszType: [
                    {
                        label: "是",
                        value: "是"
                    },
                    {
                        label: "否",
                        value: "否"
                    }
                ],
                cz: cz.defaultSelectedLabel,
                czType: cz.selectList,
                wjlx: "",
                ys: 0
            }
        },
        onRefresh(){
            g.reload();
        },
        onAdd(){
            this.formBook=this.initBookForm();
            this.dialogFormVisible=true;
        },
        onInsert(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let initForm=this.initBookForm();
                initForm.selfid=selectRow.id;
                this.formBook=initForm;
                this.dialogFormVisible=true;
            }
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let initForm=this.initBookForm();
                selectRow.pid=initForm.pid;
                selectRow.selfid=initForm.selfid;
                selectRow.bgqxType=initForm.bgqxType;
                selectRow.mjType=initForm.mjType;
                selectRow.ljrType=initForm.ljrType;
                selectRow.shrType=initForm.shrType;
                this.formBook=selectRow;
                this.dialogFormVisible=true;
            }
        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.book.del,selectRow.id);
                server.check(this,g,ServerUrl.recordCount,'f');
            }
        },
        onOrder(){
            let server=new Server(ServerUrl.book.order);
            server.order(this,g,'p');
        },
        onPdf(){
           this.downReport('pdf');
        },
        onWord(){
            this.downReport('word');
        },
        downReport(type){
            let selectRow=getGridSelectedRow(g,self);
            let self=this;
            if(selectRow !=null){
                this.loading=true;
                $.post(ServerUrl.report.fm,{
                    id: selectRow.id,
                    type: type,
                    bm: getQueryString("bm")
                },function(res){
                    self.loading=false;
                    if (res.state === 1) {
                        self.$confirm('封面生成成功，是否下载?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success'
                            }).then(() => {
                                window.open(ServerUrl.report.down + "?name=" + res.msg, '_blank');
                            }).catch(() => {
                            });
                        
                    } else {
                         self.$message({
                            duration:1000,
                            message:  '封面生成失败：' + res.message,
                            type: 'error'
                        });
                    }
                });
            }  
        },
        closeDialog(){
            this.dialogFormVisible=false;
            this.dialogFormVisibleFile=false;
        },
        saveBook(form){
            let postForm = {
                id: form.id,
                pid: form.pid,
                cbt: form.cbt,
                bgqx: form.bgqx,
                mj: form.mj,
                bzdw: form.bzdw,
                ljsj:DateFormat(form.ljsj),
                ljr: form.ljr,
                shsj:DateFormat(form.shsj),
                shr: form.shr,
                selfid: form.selfid
            };
            var server=new Server(ServerUrl.book.edit,postForm);
            server.save(this,g);
        },
        onPreviewBook(type){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                window.open("viewer.html?from=book&ID=" + selectRow.id + "&ZLSDM=" + this.zlsdm + "&r=" + Math.random());
            }
        },
        loadGridTwo(id,zlsdm){
            this.currentBookId=id;
            this.zlsdm=zlsdm;
            let self=this;
            let grid=new LigerGrid(ServerUrl.file.grid+bmConfig.fileGridName);
            grid.getConfig({
                checkbox: self.from=='search'?false:true,
                rownumbers: true,
                rowDraggable: self.from=='search'?false:true,
                pageSize: 50,
                url:ServerUrl.file.data+bmConfig.fileGridName,
                parms:{
                    sortname: "jnxh",
                    sortorder: "asc",
                    pid:id
                },
                callback: function(gridConfig) {
                    gridConfig.onCheckRow = function(checked, data) {
                        if (checked) {
                            self.addCheckedID(data.id);
                        }
                        else{
                            self.removeCheckedID(data.id);
                        } 
                    };
                    gridConfig.onCheckAllRow = function(checked, element) {
                        for (var rowId = 0; rowId < g2.data.Rows.length; rowId++) {
                            if (checked) {
                                self.addCheckedID(g2.data.Rows[rowId]['id']);
                            }
                            else {
                                self.removeCheckedID(g2.data.Rows[rowId]['id']);
                            }
                        }
                    };
                    g2=$("#maingrid2").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
            });
        },
        onAddFile(){
            this.formFile=this.initFileForm();
            this.dialogFormVisibleFile=true;
        },
        onEditFile(){
            let selectRow=getGridSelectedRow(g2,this);
            if(selectRow !=null){
                let initForm=this.initFileForm();
                selectRow.sfszType=initForm.sfszType;
                selectRow.cz=initForm.cz;
                selectRow.czType=initForm.czType;
                this.formFile=selectRow;
                this.dialogFormVisibleFile=true;
            }
        },
        onDeleteFile(){        
            let selectRow=getGridSelectedRow(g2,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.file.del,checkedID.join(','));
                server.delbatch(this,g2,checkedID.length);
                checkedID=[];
            }
        },
        onOrderFile(){
            let server=new Server(ServerUrl.file.order);
            server.order(this,g2,'p');
        },
        saveFile(form){
            let postForm = {
                id: form.id,
                pid: form.pid || "",
                wjbh: form.wjbh || "",
                wjtm: form.wjtm || "",
                cz: form.cz || "",
                ys: form.ys || "",
                wjlx: form.wjlx || "",
                sfsz: form.sfsz || "",
                rq: DateFormat(form.rq)
            };
            var server=new Server(ServerUrl.file.edit,postForm);
            server.save(this,g2);
            checkedID=[];
        },
        onPreviewFile(type){
            let selectRow=getGridSelectedRow(g2,this);
            if(selectRow !=null){
                window.open("viewer.html?from=file&ID=" + selectRow.id + "&ZLSDM=" + this.zlsdm + "&r=" + Math.random());
            }
        },
        findCheckedID(id){
            for (var i = 0,len=checkedID.length;i<len; i++) {
    
                if (checkedID[i] == id) return i;
            }
            return - 1;
        },
        addCheckedID(id){
            if (this.findCheckedID(id) == -1) 
            {
                checkedID.push(id);
            }
        },
        removeCheckedID(id){
            var i = this.findCheckedID(id);
            if (i == -1) return;
            checkedID.splice(i, 1);
        }
    }
}
</script>
<style>
    .innercontext{
        position:fixed;
        top: 0;
        left: 0; 
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    .el-loading-mask {
        background-color: rgba(0,0,0,.5);
    }
</style>