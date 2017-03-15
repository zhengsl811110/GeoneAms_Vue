<template>
  <div >
    <vContainer>
        <header>
            <div class="toolbar" >
                <el-button-group>
                    <el-button type="primary" size="small" @click="onRefresh"><i class="fa fa-refresh"></i>刷新</el-button>
                    <el-button type="primary" size="small" @click="onApplyFile"><i class="fa fa-book"></i>查清单</el-button>
                </el-button-group>
                <el-button-group >
                    <el-button type="primary" size="small" @click="onAdd"><i class="fa fa-plus-square-o"></i>新建类型</el-button>
                    <el-button type="primary" size="small" @click="onEdit"><i class="fa fa-pencil-square-o"></i> 编辑</el-button>
                    <el-button type="primary" size="small" @click="onDelete"><i class="fa fa-trash-o"></i>删除</el-button>
                </el-button-group>
            </div>
        </header>
        <el-dialog title="申请类型管理"  v-model="dialogFormVisible"  size="auto" top="10px"  :close-on-click-modal="false" :close-on-press-escape="false" class="dialog">
            <vApplyCode :form="form" :formState="formState"  @closeDialog="closeDialog" @saveApplyCode="saveApplyCode"  class="dialog"  ></vApplyCode>           
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
import vApplyCode from 'components/vApplyCode.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'
import  Server from 'config/server.js'

let g=null;
// console.log(projectType);
export default {
    data(){
        return{
            dialogFormVisible:false,
            form:this.initForm(),
            formState:{
                bm: false,
                bh: false
            }
        }
    },
    components: {
        vContainer,
        vApplyCode
    },
    mounted:function(){
        let self=this;
        let grid=new LigerGrid(ServerUrl.dictionary.fileCode.grid);
        grid.getConfig({
                rownumbers: true,
                pageSize: 20,
                pageSizeOptions:[200],
                url:ServerUrl.dictionary.fileCode.data,
                parms:{
                    sortname: "splxcode,xh",
                    sortorder: "asc",
                    pid: getQueryString("ID")
                },
                callback: function(gridConfig) {
                    gridConfig.groupColumnName = 'bm';
                    gridConfig.groupRender = function(bm, groupdata) {
                      return '审批类型：' + bm + ' (' + groupdata.length + ')';
                    };
                    // console.log(gridConfig);
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        });
    },
    methods:{
        initForm(){
             let bm = parent.getDictionarySelectByType("BM");
            //  console.log(bm);
             return {
                id: 0,
                bm: bm.defaultSelectedLabel,
                bmType: bm.selectList,
                bh: "",
                splx: ""
            }
        },
        onRefresh(){
            g.reload();
        },
        onApplyFile(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"材料清单",
                    label:"材料清单",
                    targetUrl:"apply_file_list.html?bh="+selectRow.code,
                    close:false
                };
                parent.store.dispatch('add',tab);
            }
        },
        onAdd(){
            this.form=this.initForm();
            this.formState={
                bm: false,
                bh: false
            };
            this.dialogFormVisible=true;
        },
        onEdit(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                this.formState={
                    bm: true,
                    bh: true
                };
                let form=this.initForm();
                form.id=selectRow.id;
                form.bm=selectRow.bm;
                form.bh=selectRow.bh;
                form.splx=selectRow.splx;
                this.form=form;
                this.dialogFormVisible=true;
            }

        },
        onDelete(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
              if(parseInt(selectRow.total) > 0){
                  this.$message({
                      duration:1000,
                      message: '删除失败：当前记录下存在材料清单!',
                      type: 'error'
                  });
              }
              else
              {
                let server=new Server(ServerUrl.dictionary.fileCode.del);
                server.delWithConfirm(this,g,{
                  id:selectRow.id
                });
              }
            }
        },
        closeDialog(){
            this.dialogFormVisible=false;
        },
        saveApplyCode(form){
            var postForm={
              id:form.id,
              bm:form.bm,
              bh:form.bh,
              splx:form.splx
            };
            var server=new Server(ServerUrl.dictionary.fileCode.edit,postForm);
            server.save(this,g);
        }
    }
}
</script>
<style scoped>

</style>