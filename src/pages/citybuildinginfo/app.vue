<template>
  <div >
    <vContainer>
        <header>
            <div class="toolbar">
                <el-button type="primary" size="small" @click="onPreview"><i class="fa fa-refresh"></i>预览</el-button>
                <el-button-group  v-if="from =='edit'">
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建档案</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="档案管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vCityBuildingInfo :form="form"  @closeDialog="closeDialog" @saveInfo="saveInfo"  class="dialog"></vCityBuildingInfo>                
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
import vCityBuildingInfo from 'components/vCityBuildingInfo.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null;
const typeConfig=parent.getDictionarySelectByType("DALX");
const MJ=parent.getDictionarySelectByType("MJ");
const BGQX=parent.getDictionarySelectByType("BGQX");
export default {
    data(){
        return{
            from:getQueryString("from"),
            dialogFormVisible:false,
            form:this.initForm()
        }
    },
    components: {
        vContainer,
        vCityBuildingInfo
    },
    mounted:function(){
        var grid=new LigerGrid(ServerUrl.city.info.grid);
        grid.getConfig({
                rownumbers: true,
                pageSize:50,
                pageSizeOptions:[30,50],
                url:ServerUrl.city.info.data,
                parms:{
                    sortname: "ArcCode",
                    sortorder: this.from=="edit"?"desc":"asc",
                    arccode: getQueryString("ID"),
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
                arcguid: "",
                arccode:"",
                arctitle:"",
                arctype:typeConfig.defaultSelectedLabel,
                arctypelist:typeConfig.selectList,
                arcdetails:"",
                company:"",
                starttime:"",
                endtime:"",
                secretrange:MJ.defaultSelectedLabel,
                secretrangelist:MJ.selectList,
                retentionperiod:BGQX.defaultSelectedLabel,
                retentionperiodlist:BGQX.selectList,
                totalvolume:"",
                volumenum:"",
                ljr:"",
                ljsj:""
            }
        },
        onPreview(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                if (selectRow.arctype === "声像及电子文件") {
                    let locationUrl = ServerUrl.city.info.imgUrl + selectRow.arccode;
                    window.open(locationUrl, 'newwindow', 'height=600, width=1100, top=20, left=220, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')
                }
                else {
                    let locationUrl = ServerUrl.city.info.pdfUrl +getQueryString("ID")+ '/' + selectRow.arccode+".pdf";
                    window.open(locationUrl, 'newwindow', 'height=600, width=1100, top=20, left=220, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')
                }
            }
        },
        onAdd(){
            let form=this.initForm();
            form.arccode=this.formatCode(g.currentData.Total+1);
            this.form=form;
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                this.form = selectRow;
                this.form.arctypelist=typeConfig.selectList;
                this.form.secretrangelist=MJ.selectList;
                this.form.retentionperiodlist=BGQX.selectList;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.city.info.del);
                server.delWithConfirm(this,g,{
                    arcguid:selectRow.arcguid
                });
            }
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveInfo(form){
            const self=this;
            let postForm = {
                arcguid: form.arcguid,
                arccode: form.arccode,
                arctype: form.arctype || "",
                arcdetails: form.arcdetails || "",
                company: form.company || "",
                starttime: form.starttime || "",
                endtime: form.endtime || "",
                secretrange: form.secretrange || "",
                retentionperiod: form.retentionperiod || "",
                totalvolume: form.totalvolume || "",
                volumenum: form.volumenum || "",
                ljr: form.ljr || "",
                ljsj: form.ljsj || ""
            };
            var server=new Server(ServerUrl.city.info.edit,postForm);
            server.save(self,g);
        },
        formatCode(num){
            let code=getQueryString("ID");
            return code+"-"+(Array(3).join(0) + num).slice(-3);
        }
    }
}
</script>
<style scoped>

</style>