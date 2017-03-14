<template>
  <div class="container">
    <div class="row">
      <div class=" col left">
          <el-card class="box-card"><div id="project" style="height: 400px"></div></el-card>
      </div>
      <div class=" col right">
          <el-card class="box-card"><div id="volume" style="height: 400px"></div></el-card>
      </div>
    </div>
    <div class="row">
      <div class=" col left">
          <el-card class="box-card"><div id="apply" style="height: 400px"></div></el-card>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'
import  {ServerUrl} from 'config/config.js'
export default {
  mounted:function(){
    var self=this;
    setTimeout(function() {
      $.get(ServerUrl.chart.project,{},function(res){      
          let options=self.chartOption(res.data);
          self.renderChart("project","项目量统计",options);
      });
      $.get(ServerUrl.chart.volume,{},function(res){      
          let options=self.chartOption(res.data);
          self.renderChart("volume","案卷量统计",options);
      });
      $.get(ServerUrl.chart.apply,{},function(res){      
          let options=self.chartOption(res.data);
          self.renderChart("apply","审批量统计",options);
      });
    }, 100);
  },
  methods:{
    chartOption(res){
      let label=[],value=[];
      for (var item of res) {   
        label.push(item.bm);
        value.push(item.total);
      } 
      return{
        label:label.reverse(),
        value:value.reverse()
      }
    },
    renderChart(domId,title,options){
        // 指定图表的配置项和数据
      let option = {
          title: {
              text: title,
              textStyle:{
                fontSize:16,
                fontWeight:600,
                fontFamily:"Microsoft YaHei UI"
              },
              left :"45"
          },
          tooltip: {},
          legend: {
              show:false
          },
          xAxis: {
              type: 'value',
              name:'数量'
          },
           yAxis: {
              type: 'category',
              name:'部门',
              data: options.label
          },
          series: [{
              type: 'bar',
              itemStyle:{
                normal:{
                  color:function(value){
                    return  "hsl(204,88%,50%)"; 
                  }
                }
              },
              data: options.value
          }]
      };
      let myChart = echarts.init(document.getElementById(domId));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>
<style>
  .container{
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
  }
  .row{
    width: 100%;
  }
  .col{
    width: 49.5%;
    margin-bottom: 10px;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  ::-webkit-scrollbar {
      width: 9px;
      height: 9px;
  }
  ::-webkit-scrollbar-track-piece {
      background-color: transparent;
  }
  body::-webkit-scrollbar-track-piece {
      background-color: white;
  }
  ::-webkit-scrollbar-track-piece:no-button {}
  ::-webkit-scrollbar-thumb {
      background-color: rgba(88, 88, 88, 0.86);
  }
  ::-webkit-scrollbar-thumb:hover {
      background-color: #659394;
  }
  ::-webkit-scrollbar-thumb:active {
      background-color: #666;
  }
  ::-webkit-scrollbar-button:vertical { width: 9px; }
  ::-webkit-scrollbar-button:horizontal { width: 9px; }
  ::-webkit-scrollbar-button:vertical:start:decrement { background-color: white; }
  ::-webkit-scrollbar-button:vertical:end:increment { background-color: white; }
  ::-webkit-scrollbar-button:horizontal:start:decrement { background-color: white; }
  ::-webkit-scrollbar-button:horizontal:end:increment { background-color: white; }
</style>
