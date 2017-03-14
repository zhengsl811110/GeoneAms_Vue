<template>
  <div id="picView" class="app">
    <ul class="images">
        <li>
          <template v-if="from=='book'">
            <img width="80" style="margin:10px" :src="viewUrl+'a001.jpg'"  :alt="'1/'+pageCount"/>
            <img width="80" style="margin:10px" :src="viewUrl+'a002.jpg'"  :alt="'2/'+pageCount"/>
            <template v-for="page in list">
                <img width="80" style="margin:10px" :src="viewUrl+formatePage(page)+'.jpg'"  :alt="(page+2)+ '/'+pageCount"/>
            </template>
            <img width="80" style="margin:10px" :src="viewUrl+'a003.jpg'"  :alt="pageCount+'/'+pageCount"/>
          </template>
          <template v-else>
            <template v-for="page in list">
                <img width="80" style="margin:10px" :src="viewUrl+formatePage(page)+'.jpg'"  :alt="page+'/'+pageCount"/>
            </template>
          </template> 
        </li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'

import 'assets/viewer/viewer.min.js'

import 'assets/viewer/viewer.min.css'

import  {getQueryString,ServerUrl} from 'config/config.js'

export default {
  data(){
    return{
      from:getQueryString("from"),
      sIndex:0,
      eIndex:0,
      pageCount:0,
      rootUrl:"",
      zlsdm:getQueryString("ZLSDM")
    }
  },
  computed:{
    viewUrl:function(){
      return this.rootUrl+this.zlsdm.replace('/','of')+'/';
    },
    list:function(){
      let list=[];
      for(let page =this.sIndex; page <= this.eIndex; page++){
        list.push(page)
      }
      return list;
    }
  },
  mounted:function(){
    let self=this;
    $(function(){
      let id=getQueryString("id");
      console.log(ServerUrl.viewer[self.from]);
      $.post(ServerUrl.viewer[self.from],{id:id},function(res){
          if(res.status==1){
              let resdata=res.data[0];
              self.sIndex=parseInt(resdata.sIndex);
              self.eIndex=parseInt(resdata.eIndex);
              self.pageCount=parseInt(resdata.pageCount);
              self.rootUrl=resdata.viewUrl;
              setTimeout(function() {
                 $(".images").viewer();
                 self.showFirtPage();
              }, 200);
          }
          else{
              window.opener = null;
              window.open('', '_self');
              window.close();
              return false
          }
      });
    });
  },
  methods:{
      formatePage(pageIndex){
        return (Array(3).join(0) + pageIndex).slice( - 3);
      },
      showFirtPage(){
        setTimeout(function() {
          $(".images").find('img:first').click();
        }, 300);
      }
  }
}
</script>
<style scoped>
    ul,li {
        list-style-type: none;
    }
</style>