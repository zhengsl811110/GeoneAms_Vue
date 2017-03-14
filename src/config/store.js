
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {ApplicationConfig} from 'config/config'
export const store = new Vuex.Store({
  state: {
    tabList:[],
    selected:''
  },
  mutations: {
    add(state,t) {
        let self = this,
            tabState = false;
        state.tabList.forEach(function (item, index) {
            if (item.name == t.name) {
                tabState = true;
                if(item.targetUrl!=t.targetUrl){
                    item.targetUrl=t.targetUrl;
                }
                return false;
            }
        });
        if(t.targetUrl.indexOf("isuser")>-1){
            t.targetUrl=t.targetUrl+"&userName="+ApplicationConfig.userAccount+"&passWord="+ApplicationConfig.userPsd;
        }
        if (tabState == false) {
            state.tabList.push(t);
        }
        state.selected=t.name;
    },
    changeTab(state,name){
        state.selected=name;
    }
  },
  actions:{
    add (context,t) {
        context.commit('add',t)
    },
    changeTab (context,name) {
        context.commit('changeTab',name)
    },
  }
})

window.store=store;