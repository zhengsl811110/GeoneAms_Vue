<template>
  <div class="app">
    <div class="login-header">
      <div class="login-headerInner cf">
        <h1 class="left">
          <a href="#" class="login-logo"></a>
        </h1>
      </div>
    </div>
    <div class="login-content">
      <!--背景轮播图-->
      <div class="main_visual"></div>
      <!--背景轮播图end-->
      <div id="loginContent" class="login-contentInner" style="position:relative;">
        <div class="login-box">
          <h2 class="login-boxTit">
            欢迎登录
          </h2>
          <div>
            <input class="txt-user placeholder" v-model="userName" tabindex="1"  placeholder="请输入您的用户名" maxlength="30"/>
          </div>
          <div>
            <input class="txt-password placeholder" type="password"  v-model="passWord" tabindex="2" placeholder="请输入您的密码" maxlength="32"  v-on:keyup.13="loginSubmit"/>
          </div>
          <div style="padding: 0 0 5px 5px">
            <el-checkbox v-model="checked">记住用户名</el-checkbox>
          </div>
          <div>
            <el-button type="primary" :loading="submitLoading" size="large" style="width: 100%" @click="loginSubmit">
              登     录
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <p>
        技术支持：苏州工业园区格网信息科技有限公司
      </p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {AppId,ServerUrl} from 'config/config'
export default {
  data () {
    return {
      submitLoading: false,
      checked: false,
      userName: '',
      passWord: ''
    }
  },
  mounted : function () {
    this.initUserInfo();
  },
  methods: {
    loginSubmit(){
      this.checkLogin();
    },
    checkLogin(){
      if (this.userName == '' || this.passWord == '') {
        this.$message({
          message: '请输入正确的用户名或密码...',
          type: 'error'
        });
        return false;
      }
      this.submitLoading = true;
      var self = this;
      $.post(ServerUrl.login, {
        username: this.userName,
        pwd: this.passWord,
        radom: Math.random()
      }, function (res) {
        if (res.status === 1) {
          self.$message({
            message: '登入成功',
            type: 'success'
          });
          self.saveUserInfo(res);
        }
        else {
          self.submitLoading = false;
          self.$message({
            message: '用户名或密码错误',
            type: 'error'
          });
          return false;
        }
      });
    },
    saveUserInfo(res){
      sessionStorage.setItem('ams_user_state', encodeURIComponent("true"));
      sessionStorage.setItem('ams_appId', encodeURIComponent(self.appId));
      sessionStorage.setItem('ams_user_name', encodeURIComponent(res.data.userInfo.userName));
      if (this.checked == true) {
        localStorage.setItem('ams_user_check', encodeURIComponent("true"));
        localStorage.setItem('ams_user_account', encodeURIComponent(res.data.userInfo.userAccount));
      }
      else {
        localStorage.removeItem('ams_user_check');
        sessionStorage.setItem('ams_user_account', encodeURIComponent(res.data.userInfo.userAccount));
      }
      localStorage.setItem('ams_user_psd', encodeURIComponent(this.passWord));
      window.location.href="main.html?r="+Math.random();
      return false;
    },
    initUserInfo(){
      var ams_user_check = localStorage.getItem('ams_user_check');
      if (ams_user_check === 'true') {
        this.userName = decodeURIComponent(localStorage.getItem('ams_user_account'));
        this.checked = true;
      }
    }
  }
}
</script>

<style>
  html{
    color: #000;
    background: #fff;
  }
  body {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
  }
  ul li {
    list-style-type: none;
  }
  .app {
    margin: 0;
    padding: 0;
  }
  .login-header {
    width: 100%;
    height: 106px;
  }
  .login-headerInner {
    position: relative;
    margin: 0 auto;
    width: 980px;
  }
  .login-logo {
    display: block;
    width: 650px;
    height: 86px;
    background: url(../../assets/img/logo_login_sq.png) no-repeat;
    cursor: Default;
  }
  .login-content {
    width: 100%;
    height: 386px;
    background-color: #60C1EC;
  }
  .login-contentInner {
    position: relative;
    margin: 0 auto;
    width: 980px;
  }
  .login-box {
    position: absolute;
    top: -366px;
    right: 0px;
    padding: 25px;
    width: 238px;
    height: 298px;
    border-radius: 5px;
    background: url(../../assets/img/bj_box.png) no-repeat left top;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
  .login-boxTit {
    height: 20px;
    line-height: 20px;
    text-align: center;
    text-shadow: 1px 0 1px #FFFFFF;
    color: #010101;
    font-size: 18px;
    font-family: Microsoft Yahei;
  }

  .txt-user {
    width: 186px;
    height: 49px;
    line-height: 49px;
    border: solid 1px #00a8a8;
    margin: 0 0 25px;
    border-radius: 5px;
    background: url(../../assets/img/user.png) no-repeat 15px 17px #ffffff;
    padding-left: 50px;
    color: #a1a1a1;
    font-size: 15px;
    font-family: Microsoft Yahei;
  }

  .txt-password {
    padding-left: 50px;
    margin: 0 0 25px;
    width: 186px;
    height: 49px;
    line-height: 49px;
    font-size: 15px;
    font-family: Microsoft Yahei;
    border: solid 1px #00a8a8;
    border-radius: 5px;
    background: url(../../assets/img/password.png) no-repeat 15px 17px #ffffff;
    color: #a1a1a1;
  }
  .login-btn {
    width: 238px;
    height: 50px;
    font-size: 17px;
    font-family: Microsoft Yahei;
    border: none;
    border-radius: 5px;
    color: #fff;
    background: #ff6600;
    cursor: pointer;
  }
  .login-btn:hover {
    background: #ff991d;
  }

  .login-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 40px 0;
    width: 100%;
    text-align: center;
    color: #939292;
    background: url(../../assets/img/login-foot.png) no-repeat;
  }
  .main_visual {
    margin: 0 auto;
    height: 100%;
    width: 1366px;
    background: url(../../assets/img/banner_1.jpg) center top no-repeat;
  }
</style>
