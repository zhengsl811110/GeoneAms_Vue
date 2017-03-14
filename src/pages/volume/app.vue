<template>
  <div class="innercontext">
    <vContainer  v-loading.full.screen.lock="loading" element-loading-text="正在生成备考表,请稍后..." >
        <header>
            <div class="toolbar" style="float:left;margin-left:20px;">
                <template v-for="(type,index) in typeList">
                    <el-button type="primary" size="small" @click="onGoVolume(type.name,index)" :class="{activeBtn:activeName==type.name}">{{type.label}}({{type.total}})</el-button>
                </template>
            </div>
            <div class="toolbar">
                <el-button-group  v-show="from=='edit'">
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建卷</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i>编辑卷</el-button>
                    <el-button type="primary" size="small" @click="onVolume"><i class="fa fa-list-ol"></i>组卷 </el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除 </el-button>
                </el-button-group>
                <el-button-group  v-show="from=='edit'">
                    <el-button type="primary" size="small" @click="onWord(1)"><i class="fa fa-file-word-o"></i>1cm背签</el-button>
                    <el-button type="primary" size="small" @click="onWord(2)"><i class="fa fa-file-word-o"></i> 2cm背签</el-button>
                    <el-button type="primary" size="small" @click="onWord(3)"><i class="fa fa-file-word-o"></i>3cm背签</el-button>
                </el-button-group>
                <!--<el-button   type="primary" size="small" @click="onBook"  v-show="from=='search'"><i class="fa fa-book"></i>查册</el-button>-->
            </div>
        </header>
        <el-dialog v-show="from=='edit'" title="案卷管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
                <vVolumn :form="form"  @closeDialog="closeDialog" @saveVolumn="saveVolumn"  class="dialog"></vVolumn>  
        </el-dialog>
        <el-dialog v-show="from=='edit'" title="组卷管理"  v-model="dialogFormVolumnVisible"  size="auto" top="10px"  @close="close" :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <el-row>
                <el-col :span="10">
                    <label>待组卷</label>
                    <div class='grid-content'>
                        <ul class="bookList">
                            <li v-for="(book,index) in leftBook" @click="onLeftSelected(index,book)" :class="{active:index == l}">{{book.cbt}}</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class='grid-center'>
                        <div>
                            <el-button type="primary" icon="arrow-right" @click="onGo"></el-button>
                        </div>
                        <div>
                            <el-button type="primary" icon="arrow-left" @click="onBack"></el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="10">
                    <label>已组卷</label>
                    <div class='grid-content'>
                        <ul class="bookList">
                            <li v-for="(book,index) in rightBook" @click="onRightSelected(index,book)" :class="{active:index == r}">{{book.cbt}}</li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </vContainer>
    
  </div>
</template>

<script>
import $ from 'jquery'

import 'assets/ligerUI/js/core/base.js'
import 'assets/ligerUI/js/plugins/ligerGrid.js'
import 'assets/ligerUI/js/plugins/ligerResizable.js'

import 'assets/ligerUI/skins/Aqua/css/ligerui-all.css'

import vContainer from 'components/vContainer.vue'
import vVolumn from 'components/vVolumn.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'
const bmConfig = BmConfig[getQueryString("bm")];

let g=null;
let checkedID=[];
let cRow=null;
export default {
    data(){
        return{
            from:getQueryString("from"),
            loading:false,
            formLabelWidth:'90px',
            dialogFormVisible:false,
            dialogFormVolumnVisible:false,
            typeList:[],
            form:this.initForm(),
            leftBook:[],
            rightBook:[],
            l:-1,
            r:-1,
            activeName:0
        }
    },
    components: {
        vContainer,
        vVolumn
    },
    mounted:function(){
        let self=this;
        this.initType();
        var grid=new LigerGrid(ServerUrl.volume.grid);
        grid.getConfig({
            checkbox: this.from=='edit'?true:false,
            rownumbers: true,
            rowDraggable: false,
            pageSize: bmConfig.pageSize||50,
            pageSizeOptions:bmConfig.pageSizeOptions||[50, 100],
            url:ServerUrl.volume.data,
            parms:{
                sortname: "splxcode,xh",
                sortorder: "asc",
                pid:getQueryString("ID"),
                splxcode:""
            },
            callback: function(gridConfig) {
                gridConfig.groupColumnName = 'splxcode';
                gridConfig.onRowDragDrop = function(editParm) {
                    if (editParm.near === null) return false;
                    // self.orderID(editParm.near);
                };
                gridConfig.groupRender = function(splxcode, groupdata) {
                    return '审批类型：' + splxcode + ' (' + groupdata.length + ')';
                };
                gridConfig.rowDraggingRender = function(rows) {
                    return rows[0].jh;
                };
                gridConfig.onCheckRow = function(checked, data) {
                    if (checked) self.addCheckedID(data.id);
                    else self.removeCheckedID(data.id);
                };
                gridConfig.onCheckAllRow = function(checked, element) {
                    for (var rowId = 0; rowId < self.g.data.Rows.length; rowId++) {
                        if (checked){
                            self.addCheckedID(self.g.data.Rows[rowId]['id']);
                        }
                        else {
                            self.removeCheckedID(self.g.data.Rows[rowId]['id']);
                        }
                    }
                };
                this.g=g=$("#maingrid").ligerGrid(gridConfig);
                $("#pageloading").hide();
            }
        });
    },
    methods:{
        initForm(){
             return {
                id:"",
                pid:getQueryString("ID"),
                jh:"0",
                gh:0,
                gcode:0
            }
        },
        initType(){
            var self=this;
                //全部类型;
            $.getJSON(ServerUrl.volume.applyType,{pid:getQueryString("ID")},function(res){
                if (res.status == 1){
                    self.typeList=res.data;
                    console.log(self.typeList);
                }
            });
        },
        close(){
            this.l=-1;
            this.r=-1;
            checkedID=[];
            g.reload();
            this.initType();
        },
        onAdd(){
            this.form=this.initForm();
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let form={
                    id:selectRow.id,
                    pid:getQueryString("ID"),
                    jh:selectRow.jh.replace("卷",""),
                    gh:selectRow.gh,
                    gcode:selectRow.gcode
                };
                this.form=form;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){          
                if(selectRow.cbt!=""){
                    this.$notify({
                        title: '警告',
                        message: '该卷下存在册，删除失败',
                        type: 'warning'
                    });
                }
                else
                {
                    let server=new Server(ServerUrl.volume.del,selectRow.id);
                    server.delWithConfirm(this,g,{id: selectRow.id});
                    checkedID=[];
                }
            }
        },
        onVolume(){
            let self=this;
            this.i=-1;
            this.j=-1;
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                $.post(ServerUrl.volume.bookToVolume,{
                    id:selectRow.id,
                    type:0
                },function(res){
                    // console.log(res);
                    self.leftBook=res.data;
                });
                $.post(ServerUrl.volume.bookToVolume,{
                    id:selectRow.id,
                    type:1
                },function(res){
                    self.rightBook=res.data;
                });
                self.dialogFormVolumnVisible=true;
            }
        },
        onWord(size){
            let self=this;
            this.loading=true;
            $.post(ServerUrl.report.bq,{
                ids: checkedID.join(','),
                templateType:size
            },function(res){
                 self.loading=false;
                if (res.state === 1) {
                    self.$confirm('背签生成成功，是否下载?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success'
                            }).then(() => {
                                window.open(ServerUrl.report.down + "?name=" + res.msg, '_blank');
                            }).catch(() => {
                        });
                } else {
                    self.$notify({
                        title: '错误提示',
                        message: '生成失败：' + res.msg,
                        type: 'error'
                    });
                }
            });
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        closeDialog2(){
            this.dialogFormVolumnVisible=false;
            g.reload();
        },
        saveVolumn(form){
            form.jh = form.jh.replace("卷", "");
            console.log(ServerUrl.volume.edit);
            var server=new Server(ServerUrl.volume.edit,form);
            server.save(this,g);
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
        },
        onLeftSelected(index,book){
            this.l = index;
            this.r = -1;
            cRow = book;
        },
        onRightSelected(index,book){
            this.r = index;
            this.l = -1;
            cRow = book;
            console.log(this.r);
        },
        onGo(){
            if (this.l === -1) return false;
            this.l = -1;
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                this.rightBook.push(cRow);
                this.removeObject(this.leftBook,cRow);
                this.setBookToVolume(cRow.id, selectRow.id);
                this.orderID(cRow, selectRow);
                cRow = null;
            }
        },
        onBack(){
            if (this.r === -1) return false;
            this.r = -1;
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                this.leftBook.push(cRow);
                this.removeObject(this.rightBook,cRow);
                this.setBookToVolume(cRow.id,"");
                cRow = null;
            }
        },
        setBookToVolume: function(id, pid) {
            $.post(ServerUrl.volume.setVolume,{
                id: id,
                pid: pid
            },function(res){
                console.log("setBookToVolume success");
            })
        },
        removeObject: function(array, cRow) {
            array.forEach(function(row, index) {
                if (row.id === cRow.id) {
                    array.splice(index, 1);
                    return false;
                }
            });
        },
        orderID: function(cRow, selectRow) {    
            let jh = 0;
            if (parseInt(selectRow.jh.replace("卷", "")) == 0) {
                var groups = g.groups,
                    changedGroups = null;
                groups.forEach(function(group) {
                    if (group[0].splxcode === cRow.splxcode) {
                        changedGroups = group;
                        return false;
                    }
                });
                if (changedGroups === null) {
                    jh = 1;
                }
                else {
                    console.log(changedGroups);
                    jh = parseInt(changedGroups[changedGroups.length - 1].jh.replace("卷", "")) + 1;
                }
                //判断分组是否正确
                $.post(ServerUrl.volume.order,{
                    id: selectRow.id,
                    jh: jh
                },function(res){
                    g.reload();
                    console.log("order success");
                });
            }
        },
        onGoVolume(type,index){
            this.activeName=type;
            checkedID=[];
            g.options.newPage = 1;
            g.options.parms.splxcode = type;
            g.reload();
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
    .grid-content{
        height: 500px;
        overflow-y: auto;
        border: 1px solid #20a0ff;
    }
    .el-row{
        padding: 0 0 20px 0;
    }
    .el-loading-mask {
        background-color: rgba(0,0,0,.5);
    }
    .activeBtn{
       background:red;
       border-color:red;
    }
</style>