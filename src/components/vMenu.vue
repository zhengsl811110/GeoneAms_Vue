<template>
  <div class="left-side sticky-left-side">
      <div class="left-side-inner">
          <ul id="sideNav" class="nav  custom-nav">
              <li class="menu-logo">
                  <a>
                      <img src="../assets/img/logo_sq.png" />
                      <span class="logo-name logo-img"><img src="../assets/img/logo_title_sq.png"></span>
                  </a>
              </li>
              <li class="menu-toggle">
                  <a>
                      <img src="../assets/img/bg.png" class="menu-Icon Icon-close"/>
                      <span class="logo-name logo-img"></span>
                  </a>
              </li>
              <li v-for="p in data" class="menu-list">
                  <a href="javascript:void(0)">
                      <img src="../assets/img/bg.png" class="menu-Icon" :class="p.icon">
                      <span>{{p.name}}</span>
                      <img src="../assets/img/bg.png" class="head-Icon Icon-gray-left"/>
                  </a>
                  <ul class="sub-menu-list">
                      <li v-for="c in p.children">
                          <a href="javascript:void(0)" @click="navClick(c)">{{c.name}}</a>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {store} from '../config/store'
export default {
    name: "menu",
    props: {
        data: Array
    },
    updated:function(){
        $(".custom-nav>li.menu-list").hover(function () {
            if ($("body").hasClass("left-side-expand"))return false;
            $(this).addClass('nav-hover').children("ul").show();
        }, function () {
            if ($("body").hasClass("left-side-expand"))return false;
            $(this).removeClass('nav-hover').children("ul").hide();
        });

        $(document).on("click", "#sideNav>li.menu-list>a", function () {
            $(this).children(".head-Icon").toggleClass("rotate-90");
            $(this).next("ul").slideToggle(200);
        });

        $(document).on("click", "#sideNav>li.menu-toggle>a>img", function () {
            if ($("body").hasClass("left-side-panel-expand"))
                $("body").toggleClass("left-side-expand left-side-expand-And-left-side-panel-expand");
            else
                $("body").toggleClass("left-side-expand");
            $("#sideNav .sub-menu-list").hide();
            $("#sideNav .rotate90").removeClass("rotate90");
        });
    },
    methods: {
        navClick(c){
           store.dispatch('add',c);
        }
    }
}
</script>
<style scoped>
    .nav>li>a:focus, .nav>li>a:hover{
        background-color: none !important;
    }
</style>
