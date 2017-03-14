<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="80px" class="el-form--inline" style="float: left;">
                <el-form-item label="项目号">
                    <el-input v-model="xmh" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="xmmc" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSearch" icon="search"> 查询</el-button>
                </el-form-item>
            </el-form>
            <div class="toolbar">
                <el-button-group>
                    <el-button type="primary" size="small" @click="onRefresh"><i class="fa fa-refresh"></i>刷新</el-button>
                    <el-button type="primary" size="small" @click="onApply"><i class="fa fa-book"></i>查申请</el-button>
                    <el-button type="primary" size="small" @click="onVolume"><i class="fa fa-folder-open-o"></i>查案卷 </el-button>
                </el-button-group>
                <el-button-group>
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建项目</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="项目管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vProjectGH :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'gh'==current || 'js'==current"></vProjectGH>     
            <vProjectFC :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'fc'==current"></vProjectFC>  
            <vProjectGT :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'gt'==current"></vProjectGT>    
            <vProjectTD :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'td'==current"></vProjectTD> 
            <vProjectZTB :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'ztb'==current"></vProjectZTB>
            <vProjectZA :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'za'==current"></vProjectZA>    
            <vProjectCG :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'cg'==current"></vProjectCG> 
            <vProjectHB :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"  v-if="'hb'==current"></vProjectHB>               
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
import vProjectGH from 'components/vProjectGH.vue'
import vProjectFC from 'components/vProjectFC.vue'
import vProjectGT from 'components/vProjectGT.vue'
import vProjectTD from 'components/vProjectTD.vue'
import vProjectZTB from 'components/vProjectZTB.vue'
import vProjectZA from 'components/vProjectZA.vue'
import vProjectCG from 'components/vProjectCG.vue'
import vProjectHB from 'components/vProjectHB.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig,DateFormat} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null,pubToken=null;
const bmConfig = BmConfig[getQueryString("bm")];
const projectType=parent.getDictionarySelectByType("XMLX");
// console.log(projectType);
export default {
    data(){
        return{
            xmh:"",
            xmmc:"",
            current:bmConfig.ename,
            dialogFormVisible:false,
            form:this.initForm()
        }
    },
    components: {
        vContainer,
        vProjectGH,
        vProjectFC,
        vProjectGT,
        vProjectTD,
        vProjectZTB,
        vProjectZA,
        vProjectCG,
        vProjectHB
    },
    mounted:function(){
        var grid=new LigerGrid(ServerUrl.project.grid+bmConfig.projectGridName);
        grid.getConfig({
                rownumbers: true,
                url:ServerUrl.project.data+bmConfig.projectGridName,
                parms:{
                    sortname: "RowID",
                    sortorder: "desc",
                    xmh: "",
                    xmmc: "",
                    bm: bmConfig.name
                },
                callback: function(gridConfig) {
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        });
        //创建监听
        pubToken=parent.pubsub.subscribe("refreshproject",function(){
            g.reload();
        });
    },
    destroyed:function(){
        parent.pubsub.unsubscribe(pubToken);
        pubToken=null;
    },
    methods:{
        initForm(){
             return {
                id: "",
                xmh: "",
                xmhDisabled: false,
                xmlx: projectType.defaultSelectedLabel,
                projectType: projectType.selectList,
                xmmc: "",
                sj: "",
                dkh: "",
                ydwz: "",
                jsdw: "",
                sjdw: "",
                bz: ""
            }
        },
        onSearch(){
            this.search();
        },
        onRefresh(){
            this.search();
        },
        onApply(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"申请信息",
                    label:"申请信息",
                    targetUrl:"apply.html?from=" + getQueryString("from") + "&bm=" + getQueryString("bm") + "&ID=" + selectRow.id,
                    close:false
                };
                parent.store.state.selected=tab.name;
                parent.store.dispatch('add',tab);
            }
        },
        onVolume(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"案卷信息",
                    label:"案卷信息",
                    targetUrl:"volume.html?from=" + getQueryString("from") + "&bm=" + getQueryString("bm") + "&ID=" + selectRow.id,
                    close:false
                };
                parent.store.dispatch('add',tab);
            }
        },
        onAdd(){
            this.form=this.initForm();
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                selectRow.xmhDisabled = true;
                this.form = selectRow;
                this.form.projectType=projectType.selectList;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.project.del,selectRow.id);
                server.check(this,g,ServerUrl.recordCount,'a');
            }
        },
        search(){
            g.options.newPage = 1;
            g.options.parms.xmh = this.xmh;
            g.options.parms.xmmc =this.xmmc;
            g.reload();
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveProject(form){
            const self=this;
            let postForm = {
                id: form.id,
                xmh: form.xmh,
                bm: bmConfig.name,
                xmmc: form.xmmc || "",
                xmlx: form.xmlx || "",
                dkh: form.dkh || "",
                ydwz: form.ydwz || "",
                jsdw: form.jsdw || "",
                sjdw: form.sjdw || "",
                sj: DateFormat(form.sj),
                bz: form.bz || ""
            };
            var server=new Server(ServerUrl.project.edit,postForm);
            server.save(self,g);
        }
    }
}
</script>
<style scoped>

</style>