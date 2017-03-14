<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="80px" class="el-form--inline" style="float: left;">
                <el-form-item label="工程编号">
                    <el-input v-model="projectCode" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item label="工程名称">
                    <el-input v-model="projectName" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSearch" icon="search"> 查询</el-button>
                </el-form-item>
            </el-form>
            <div class="toolbar">
                <el-button-group>
                    <el-button type="primary" size="small" @click="onRefresh"><i class="fa fa-refresh"></i>刷新</el-button>
                    <el-button type="primary" size="small" @click="onInfo"><i class="fa fa-book"></i>查资料</el-button>
                </el-button-group>
                <el-button-group  v-if="from =='edit'">
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建项目</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="项目管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vCityBuildingProject :form="form"  @closeDialog="closeDialog" @saveProject="saveProject"  class="dialog"></vCityBuildingProject>                
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
import vCityBuildingProject from 'components/vCityBuildingProject.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null;
const projectTypeConfig=parent.getDictionarySelectByType("GCLX");
export default {
    data(){
        return{
            from:getQueryString("from"),
            projectCode:"",
            projectName:"",
            dialogFormVisible:false,
            form:this.initForm()
        }
    },
    components: {
        vContainer,
        vCityBuildingProject
    },
    mounted:function(){
        var grid=new LigerGrid(ServerUrl.city.project.grid);
        grid.getConfig({
                rownumbers: true,
                url:ServerUrl.city.project.data,
                parms:{
                    sortname: "id",
                    sortorder: "desc",
                    projectCode: "",
                    projectName: ""
                },
                callback: function(gridConfig) {
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        });
    },
    methods:{
        initForm(){
             return {
                projectguid: "",
                projectcode: "",
                projectCodeDisabled: false,
                projecttype: projectTypeConfig.defaultSelectedLabel,
                projectTypeList: projectTypeConfig.selectList,
                projectname: "",
                location: "",
                jscompany: "政府",
                sgcompany: "",
                jlcompany: ""
            }
        },
        onSearch(){
            this.search();
        },
        onRefresh(){
            this.search();
        },
        onInfo(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"城建资料",
                    label:"城建资料",
                    targetUrl:"citybuildinginfo.html?from=" + getQueryString("from") + "&ID=" + selectRow.projectcode,
                    close:false
                };
                parent.store.state.selected=tab.name;
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
                selectRow.projectCodeDisabled = true;
                this.form = selectRow;
                this.form.projectTypeList=projectTypeConfig.selectList;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.city.project.del);
                server.delWithConfirm(this,g,{
                    projectguid:selectRow.projectguid
                });
            }
        },
        search(){
            g.options.newPage = 1;
            g.options.parms.projectCode = this.projectCode;
            g.options.parms.projectName =this.projectName;
            g.reload();
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveProject(form){
            const self=this;
            let postForm = {
                projectguid: form.projectguid,
                projectcode: form.projectcode,
                projecttype: form.projecttype || "",
                projectname: form.projectname || "",
                location: form.location || "",
                jscompany: form.jscompany || "",
                sgcompany: form.sgcompany || "",
                jlcompany: form.jlcompany || ""
            };
            var server=new Server(ServerUrl.city.project.edit,postForm);
            server.save(self,g);
        }
    }
}
</script>
<style scoped>

</style>