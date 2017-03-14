<template>
  <div >
    <vContainer>
        <header>
            <el-form label-width="80px" class="el-form--inline" style="float: left;">
                <el-form-item label="日期范围">
                    <el-date-picker v-model="rq" type="daterange" align="left" placeholder="选择日期范围" :clearable="false" range-separator="/" :picker-options="pickerOptions"></el-date-picker>
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

import 'assets/ligerUI/skins/Aqua/css/ligerui-all.css'

import vContainer from 'components/vContainer.vue'


import  {getQueryString,getGridSelectedRow,ServerUrl,BmConfig} from 'config/config.js'
import  LigerGrid from 'config/grid.js'

let g=null;
export default {
    data(){
        return{
            rq:"",
            pickerOptions: {
                shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    components: {
        vContainer
    },
    mounted:function(){
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.rq=[start,end];

        var grid=new LigerGrid(ServerUrl.chart.job.grid);
        grid.getConfig({
                rownumbers: true,
                url:ServerUrl.chart.job.data,
                parms:{
                    sortname: "ljr",
                    sortorder: "asc",
                    start:start.Format("yyyy-MM-dd"),
                    end:end.Format("yyyy-MM-dd")
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
            console.log(this.rq[0].Format("yyyy-MM-dd"));
            g.options.parms.start = this.rq[0].Format("yyyy-MM-dd");
            g.options.parms.end = this.rq[1].Format("yyyy-MM-dd");
            g.reload();
        }
    }
}
</script>
<style scoped>

</style>