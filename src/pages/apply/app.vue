<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="100px" class="el-form--inline" style="float: left;"  v-if="searchStat">
                <el-form-item label="业务登记号">
                    <el-input v-model="sph" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                 <el-form-item label="审批类型">
                    <el-input v-model="splxcode" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSearch" icon="search"> 查询</el-button>
                </el-form-item>
            </el-form>
            <div class="toolbar" >
                <el-button-group>
                    <el-button type="primary" size="small" @click="onRefresh"><i class="fa fa-refresh"></i>刷新</el-button>
                    <el-button type="primary" size="small" @click="onBook"><i class="fa fa-book"></i>查册</el-button>
                </el-button-group>
                <el-button-group v-if="from =='edit'">
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建申请</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="申请管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vApplyGH :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'gh'==current || 'js'==current"></vApplyGH>   
            <vApplyFC :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'fc'==current" ></vApplyFC>   
            <vApplyGT :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'gt'==current" ></vApplyGT>   
            <vApplyZTB :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'ztb'==current"></vApplyZTB>
            <vApplyZA :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'za'==current"></vApplyZA>  
            <vApplyTD :form="form"  @closeDialog="closeDialog" @saveApply="saveApply"  class="dialog"  v-if="'td'==current"></vApplyTD>           
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
import vApplyGH from 'components/vApplyGH.vue'
import vApplyFC from 'components/vApplyFC.vue'
import vApplyGT from 'components/vApplyGT.vue'
import vApplyZTB from 'components/vApplyZTB.vue'
import vApplyZA from 'components/vApplyZA.vue'
import vApplyTD from 'components/vApplyTD.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig,DateFormat} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null;
const bmConfig = BmConfig[getQueryString("bm")];
let wz="";//房产用地位置
// console.log(projectType);
export default {
    data(){
        return{
            from:getQueryString("from"),
            searchStat:bmConfig.ename=='fc'?true:false,
            sph:"",
            splxcode:"",
            current:bmConfig.ename,
            dialogFormVisible:false,
            form:this.initForm()
        }
    },
    components: {
        vContainer,
        vApplyGH,
        vApplyFC,
        vApplyGT,
        vApplyZTB,
        vApplyZA,
        vApplyTD
    },
    mounted:function(){
        let self=this;
        let grid=new LigerGrid(ServerUrl.apply.grid+bmConfig.applyGridName);
        grid.getConfig({
                rownumbers: true,
                rowDraggable:self.from=='search'?false: bmConfig.rowDraggable || true,
                pageSize: bmConfig.pageSize || 20,
                pageSizeOptions: bmConfig.pageSizeOptions || [10, 20, 50],
                url:ServerUrl.apply.data+bmConfig.applyGridName,
                parms:{
                    sortname: "splxcode,xh",
                    sortorder: "asc",
                    pid: getQueryString("ID"),
                    sph:self.sph,
                    splxcode:self.splxcode
                },
                callback: function(gridConfig) {
                    gridConfig.groupColumnName = 'splxcode';
                    let server=new Server(ServerUrl.apply.order);
                    gridConfig.onRowDragDrop = function(editParm) {
                        if (editParm.near === null) return false;
                        server.order(self,g);
                    };
                    gridConfig.groupRender = function(splxcode, groupdata) {
                        return '审批类型：' + splxcode + ' (' + groupdata.length + ')';
                    };
                    gridConfig.rowDraggingRender = function(rows) {
                        return rows[0].sph;
                    };

                    // console.log(gridConfig);
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        }); 
        //如果是fc那么获取新数据
        if(bmConfig.ename=="fc"){
            $.get(ServerUrl.project.info,{id:this.form.pid},function(res){
                if(res.status==1){
                    wz=res.data[0].ydwz;
                }
            });
        }
    },
    methods:{
        initForm(){            
            return {
                id: "",
                pid: getQueryString("ID"),
                szh: "",
                sph: "",
                splx: "",
                splxDisabled: false,
                applyType: parent.getDictionaryApplyType(bmConfig.name),
                splr: "",
                wz: "",
                szsj: "",
                cqlb: "",
                qlr: "",
                jasj: "",
                bz: ""
            }
        },
        onSearch(){
            this.onRefresh();
        },
        onRefresh(){
            g.options.parms.sph =this.sph;
            g.options.parms.splxcode =this.splxcode;
            g.reload();
        },
        onBook(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"册信息",
                    label:"册信息",
                    targetUrl:"book.html?from=" + getQueryString("from") + "&bm=" + getQueryString("bm") + "&ID=" + selectRow.id,
                    close:false
                };
                parent.store.dispatch('add',tab);
            }
        },
        onAdd(){
            var form=this.initForm();
            form.wz=wz;
            this.form=form;
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                selectRow.splxDisabled = true;
                selectRow.applyType=this.initForm().applyType;
                selectRow.splx=selectRow.splxcode + '-' + selectRow.splx;
                this.form = selectRow;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.apply.del,selectRow.id);
                server.check(this,g,ServerUrl.recordCount,'b');
            }
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveApply(form){
            const self=this;
            let splx = form.splx.split('-');
            let postForm = {
                id: form.id,
                pid: form.pid || "",
                szh: form.szh || "",
                sph: form.sph || "",
                splxbh: splx[1],
                splxcode: splx[0],
                splr: form.splr || "",
                wz: form.wz || "",
                szsj:  DateFormat(form.szsj), 
                cqlb: form.cqlb || "",
                qlr: form.qlr || "",
                jasj:  DateFormat(form.jasj), 
                bz: form.bz || ""
            };
            var server=new Server(ServerUrl.apply.edit,postForm);
            server.save(self,g);
        }
    }
}
</script>
<style scoped>

</style>