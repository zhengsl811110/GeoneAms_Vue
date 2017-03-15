<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="80px" class="el-form--inline" style="float: left;">、
                <el-form-item label="部门">
                    <el-select v-model="bm" placeholder="请选择" size="small" style="width:120px;">
                        <el-option v-for="item in bmList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目号">
                    <el-input v-model="xmh" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="xmmc" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item label="地块号">
                    <el-input v-model="dkh" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSearch" icon="search"> 查询</el-button>
                </el-form-item>
            </el-form>
            <div class="toolbar">
                <el-button-group>
                    <el-button type="primary" size="small" @click="onApply"><i class="fa fa-book"></i>查申请</el-button>
                    <el-button type="primary" size="small" @click="onVolume"><i class="fa fa-folder-open-o"></i>查案卷 </el-button>
                </el-button-group>
                 <el-button type="primary" size="small" @click="onLocation"><i class="fa fa-map-pin"></i>定位</el-button>
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


import  {getQueryString,getGridSelectedRow,ServerUrl} from 'config/config.js'
import  LigerGrid from 'config/grid.js'

let g=null;
let bmConfig=parent.window.getDictionarySelectByType("BMLX");
export default {
    data(){
        return{
            bm:"",
            bmList:bmConfig.selectList,
            xmh:"",
            xmmc:"",
            dkh: getQueryString("dkh")||""
        }
    },
    components: {
        vContainer
    },
    mounted:function(){
        var grid=new LigerGrid(ServerUrl.search.grid);
        grid.getConfig({
                rownumbers: true,
                pageSize: 50,
                pageSizeOptions: [50, 100, 200],
                url:ServerUrl.search.data,
                parms:{
                    sortname: "bm",
                    sortorder: "asc",
                    bm:this.bm,
                    xmh: "",
                    xmmc: "",
                    dkh: this.dkh
                },
                callback: function(gridConfig) {
                    gridConfig.groupColumnName = 'bm';
                    gridConfig.groupRender = function(bm, groupdata) {
                        return '所属部门：' + bm + ' (' + groupdata.length + ')';
                    };
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
            g.options.parms.bm = this.bm;
            g.options.parms.xmh = this.xmh;
            g.options.parms.xmmc =this.xmmc;
            g.options.parms.dkh =this.dkh;
            g.reload();
        },
        onApply(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                let tab={};
                if(selectRow.bmename=="cj")
                {
                    tab={
                        name:"城建资料",
                        label:"城建资料",
                        targetUrl:"citybuildinginfo.html?from=search&bm=" + selectRow.bmename + "&ID=" + selectRow.xmh,
                        close:false
                    };
                }
                else
                {
                    tab={
                        name:"申请信息",
                        label:"申请信息",
                        targetUrl:"apply.html?from=search&bm=" + selectRow.bmename + "&ID=" + selectRow.id ,
                        close:false
                    };
                }
                parent.store.state.selected=tab.name;
                parent.store.dispatch('add',tab);
            }
        },
        onVolume(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                if(selectRow.bmename=="cj")
                {
                    self.$message({
                        duration:1000,
                        message:  '城建类档案无法查询案卷！',
                        type: 'warning'
                    });
                }
                else
                {
                    const tab={
                        name:"案卷信息",
                        label:"案卷信息",
                        targetUrl:"volume.html?from=search&bm=" + selectRow.bmename + "&ID=" + selectRow.id ,
                        close:false
                    };
                    parent.store.dispatch('add',tab);
                }
            }
        },
        onLocation(){
            let selectRow=getGridSelectedRow(g,this);
            if(selectRow !=null){
                if(selectRow.dkh !=""){
                    parent.window.pubsub.publish("location",selectRow.dkh);
                    parent.store.dispatch("changeTab","地图");
                }
                else
                {
                    this.$message({
                        duration:1000,
                        message:  '地块号缺失，无法定位！',
                        type: 'warning'
                    });
                }
            }
        }
    }
}
</script>
<style scoped>

</style>