<template>
  <div id="app" >
    <div class="main-content">
        <div class="header-section">
                <div class="leftTags">
                    <ul id="leftTagsUL">
                        <template v-for="tab in tabList">
                            <li v-if="!!!tab.close"   :class="{focus:tab.name==selected}" >
                                <img src="../../assets/img/tm.png"><span @click="tabClick(tab.name)">{{tab.name}}</span>
                                <img src="../../assets/img/bg.png" class="other-Icon Icon-close" @click="closeTab(tab.name)">
                            </li>
                            <li v-else class="empty" :class="{focus:tab.name==selected}" @click="tabClick(tab.name)" >
                                <img src="../../assets/img/tm.png"><span @click="tabClick(tab.name)">{{tab.name}}</span>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="rightTools">
                    <ul>
                        <li class="my-dropdown" @click="rightDropDown">
                            <a><img src="../../assets/img/bg.png" class="head-Icon Icon-user"><span id="userInfo">{{userName}}</span>
                               <img src="../../assets/img/bg.png" class="head-Icon Icon-caret-down" :class="{rotate180:rotate180}"></a>
                            <ul class="dropdown-mymenu"  v-if="rightDropDownList">
                                <li><a href="index.html"><img src="../../assets/img/bg.png" class="head-Icon Icon-exit" alt="">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="frame-section" class="frame-section">
                <p  v-for="tab in tabList" :class="{focus:tab.name==selected}">
                    <iframe  :src="tab.targetUrl"  height="100%" width="100%" frameborder="0"></iframe>
                </p>
            </div>
      </div>
      <vMenu :data="userMenuList"></vMenu>
  </div>
</template>

<script>
import $ from 'jquery'
import vMenu from 'components/vMenu.vue'
import {ServerUrl,ApplicationConfig,UserState} from 'config/config'
import {setDictonarySelect,setDictonaryApplyType} from 'config/dictionary'
import {store} from 'config/store'
export default {
    name: "main",
    components: {
        vMenu
    },
    data () {
        return {
            userName: '',
            rotate180: true,
            rightDropDownList: false,
            userMenuList: [],
            tabList: store.state.tabList
        }
    },
    computed:{
        selected:function(){
            return store.state.selected;
        }
    },
    mounted: function () {
        if (!UserState())return false;
        this.userName = ApplicationConfig.userName;
        let self = this;
        //菜单
        $.getJSON(ServerUrl.menu,{username:ApplicationConfig.userAccount},function(res){
            if (res.status == 1){
                self.userMenuList = res.data.menus;
                for(let tab of res.data.initMenu){
                    store.dispatch('add',tab);
                }
            }
        });
        //字典
        $.post(ServerUrl.dictionary.select,{},function(res){
            if (res.status == 1){
                setDictonarySelect(res.data);
            }
        });
        //申请类型字典
         $.post(ServerUrl.dictionary.applyType,{},function(res){
            if (res.status == 1){
                setDictonaryApplyType(res.data);
            }
        });
        //添加监听(map等外部调用添加tab)
        pubsub.subscribe("addtab",function(topics,args){
            let tab={
                name:"档案查询",
                label:"档案查询",
                targetUrl:"search.html?from=search&dkh="+args,
                close:false
            };
            store.dispatch('add',tab);
        });
    },
    methods: {
        rightDropDown(){
            this.rotate180 = !this.rotate180;
            this.rightDropDownList = !this.rightDropDownList;
        },
        tabClick(name){
            store.dispatch('changeTab',name);
            // this.selected = name;
        },
        closeTab(name){
             let self = this, currentIndex = -1;
             this.tabList.forEach(function (item, index) {
                 if (item.name === name) {
                     self.tabList.splice(index, 1);
                     currentIndex = index;
                     return false;
                 }
             });
             //定位到前一个
             let currentName = "";
             if (currentIndex > 0)
                 currentName = this.tabList[currentIndex - 1].name;
             else
                 currentName = this.tabList[0].name;
            store.dispatch('changeTab',currentName);
        }
    }
}
</script>
