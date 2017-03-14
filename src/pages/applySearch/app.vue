<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="100px" class="el-form--inline" style="float: left;">
                <el-form-item label="部门">
                    <el-select v-model="bm" placeholder="请选择" size="small" style="width:120px;">
                        <el-option v-for="item in bmList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批号">
                    <el-input v-model="sph" size="small" @keyup.enter="onSearch"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSearch" icon="search"> 查询</el-button>
                </el-form-item>
            </el-form>
        </header>
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


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'

let g=null;
let bmConfig =null,currentSelected=null;
let bmlxConfig=parent.window.getDictionarySelectByType("BM");
export default {
    data(){
        return{
            bm:"",
            bmList:bmlxConfig.selectList,
            sph:""
        }
    },
    components: {
        vContainer
    },
    mounted:function(){
        
    },
    methods:{
        initGrid(){
            let self=this;
            let bmConfig=BmConfig[this.bm];
            let grid=new LigerGrid(ServerUrl.apply.grid+bmConfig.applyGridName);
            grid.getConfig({
                    rownumbers: true,
                    rowDraggable:false,
                    pageSize: bmConfig.pageSize || 20,
                    pageSizeOptions: bmConfig.pageSizeOptions || [10, 20, 50],
                    url:ServerUrl.apply.data+bmConfig.applyGridName,
                    parms:{
                        sortname: "splxcode,xh",
                        sortorder: "asc",
                        pid: getQueryString("ID")||"",
                        bm:bmConfig.name,
                        sph:self.sph
                    },
                    callback: function(gridConfig) {
                        gridConfig.groupColumnName = 'splxcode';
                         gridConfig.groupRender = function(splxcode, groupdata) {
                            return '审批类型：' + splxcode + ' (' + groupdata.length + ')';
                        };
                        g=$("#maingrid").ligerGrid(gridConfig);
                        $("#pageloading").hide();
                    }
            }); 
        },
        onSearch(){
            if(currentSelected===this.bm){
                g.options.parms.sph =this.sph;
                g.reload();
            }
            else
            {
                this.initGrid();
                currentSelected=this.bm;
            }
        }
    }
}
</script>
<style scoped>

</style>