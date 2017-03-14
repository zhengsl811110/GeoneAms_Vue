<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="80px" class="el-form--inline" style="float: left;">
                <el-form-item label="部门">
                    <el-select v-model="bm" placeholder="请选择">
                        <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
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
            </div>
        </header>
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


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'

let g=null;
const bmConfig =parent.getDictionarySelectByType("BMLX");
// console.log(projectType);
export default {
    data(){
        return{
            bm:bmConfig.defaultSelectedLabel,
            options:bmConfig.selectList ,
            xmh:"",
            xmmc:"",
        }
    },
    components: {
        vContainer
    },
    mounted:function(){
        var self=this;
        var grid=new LigerGrid(ServerUrl.chart.type.grid);
        grid.getConfig({
                rownumbers: true,
                url:ServerUrl.chart.type.data,
                parms:{
                    sortname: "xmh",
                    sortorder: "asc",
                    bm: self.bm,
                    xmh: "",
                    xmmc: ""
                },
                callback: function(gridConfig) {
                    g=$("#maingrid").ligerGrid(gridConfig);
                    $("#pageloading").hide();
                }
        });
    },
    methods:{
        onSearch(){
            this.search();
        },
        search(){
            g.options.newPage = 1;
            g.options.parms.xmh = this.xmh;
            g.options.parms.xmmc =this.xmmc;
            g.options.parms.bm =this.bm;
            g.reload();
        },
        onApply(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                const tab={
                    name:"申请信息",
                    label:"申请信息",
                    targetUrl:"apply.html?from=search&bm=" + selectRow.bmename + "&ID=" + selectRow.id ,
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
                    targetUrl:"volume.html?from=search&bm=" + selectRow.bmename + "&ID=" + selectRow.id ,
                    close:false
                };
                parent.store.dispatch('add',tab);
            }
        }
    }
}
</script>
<style scoped>

</style>