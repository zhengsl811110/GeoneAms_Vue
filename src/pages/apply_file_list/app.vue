<template>
  <div >
    <vContainer>
        <header>
            <div class="toolbar" >
                <el-button-group >
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建材料</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onOrder"><i class="fa fa-bars"></i>调序</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="材料清单管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vApplyCodeFile :form="form"  @closeDialog="closeDialog" @saveApplyFile="saveApplyFile"  class="dialog"  ></vApplyCodeFile>           
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
import vApplyCodeFile from 'components/vApplyCodeFile.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null;
// console.log(projectType);
export default {
    data(){
        return{
            dialogFormVisible:false,
            form:this.initForm()
        }
    },
    components: {
        vContainer,
        vApplyCodeFile
    },
    mounted:function(){
        let self=this;
        let grid=new LigerGrid(ServerUrl.dictionary.fileList.grid);
        grid.getConfig({
                rownumbers: true,
                rowDraggable: true,
                pageSize: 50,
                pageSizeOptions:[50],
                url:ServerUrl.dictionary.fileList.data,
                parms:{
                    sortname: "[order]",
                    sortorder: "asc",
                    bh: getQueryString("bh")
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
                id: 0,
                mc: "",
                bh: getQueryString("bh")
            }
        },
        onAdd(){
            this.form=this.initForm();
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let form={
                    id: selectRow.id,
                    mc: selectRow.mc,
                    bh: getQueryString("bh")
                };
                this.form=form;
                this.dialogFormVisible=true;
            }

        },
        onOrder(){
            let server=new Server(ServerUrl.dictionary.fileList.order);
            server.order(this,g,"p");
        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let server=new Server(ServerUrl.dictionary.fileList.del);
                server.delWithConfirm(this,g,{
                    id:selectRow.id
                });
            }
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveApplyFile(form){
            var postForm={
                id: form.id,
                mc: form.mc,
                bh: form.bh
            };
            var server=new Server(ServerUrl.dictionary.fileList.edit,postForm);
            server.save(this,g);
        }
    }
}
</script>
<style scoped>

</style>