<template>
  <div id="app">
    <div class="header">
      <div class="logoBox">
        <div class="fl">
          <router-link to="/"><img :src="bmxx.Logo" alt="logo"></router-link>
          <span>招生代码：5193</span>
        </div>
        <!-- <div class="fr">
          <input type="text" placeholder="请输入搜索词">
          <router-link to="/" class="sousuoIcon"></router-link>
        </div> -->
      </div>
      <div class="nav">
        <ul>
          <li ><router-link to="/">首页</router-link></li>
          <li v-for="(i,index) in msg" :key="index"><router-link :to="{path:i.Url}">{{i.Name}}</router-link></li>          
          <li ><a href="http://www.tianyi.edu.cn/">官网首页</a></li>
        </ul>
      </div>
      
    </div>
    <div class="main">
      <keep-alive>
        <router-view  v-if="$route.meta.keepAlive"/>
      </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive"/>
    </div> 
    <div class="footer">
      <p>版权所有@{{ bmxx.Name }} 蜀ICP备14005735号-2</p>
      <p>地址： {{ bmxx.Address }} 邮编：{{ bmxx.ZipCode }} {{ bmxx.Phone }} {{ bmxx.Email }}</p>
    </div>
  </div>
</template>

<script>
import { Base } from "./assets/js/Base.js";
export default {
  name: "App",
  data() {
    return {
      msg: "",
      bmxx: ''
    };
  },
  methods: {},
  created() {
    this.msg = Base.GetNavColumnsByDid();
    this.bmxx = Base.GetDepartmentByDid(8);
  }
};
$(function(){
  var MainMinHeight = parseInt($(window).height()-$(".header").height()-$(".footer").height()-30)
    $(".main").attr("style","min-height:"+MainMinHeight+"px");
});
</script>

<style>
*{margin: 0;padding: 0;border: none;font-size: 16px;color: #404040;font-family: "微软雅黑";}
li{list-style-type: none;}
body{min-width: 1200px;max-width: 1920px;margin: 0 auto;}
a{text-decoration: none;}
/*修改提示文字的颜色*/
input::-webkit-input-placeholder { /* WebKit browsers */ color: #ffffff;}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */color: #ffffff;}
input::-moz-placeholder { /* Mozilla Firefox 19+ */ color: #ffffff;}
input:-ms-input-placeholder { /* Internet Explorer 10+ */color: #ffffff;} 
input{outline:none;box-sizing: border-box;-moz-box-sizing:border-box; /* Firefox */-webkit-box-sizing:border-box; /* Safari */}
.fl{display: block;float: left;}
.fr{display: block;float: right;}
.header{widows: 100%;height: 160px;margin: 0 auto;background: url(./assets/img/logo_bg.jpg) center no-repeat;}
.header .logoBox{width: 1200px;margin: 0 auto;overflow: hidden;}
.header .logoBox .fl{width: 532px;}
.header .logoBox .fl img{display: block;width: 532px;height: 61px;margin-top: 20px;}
.header .logoBox .fl span{display: block;line-height: 17px;height: 17px;margin-top: 8px;margin-left: 70px;font-size: 16px;color: white;letter-spacing: 2px;}
.header .logoBox .fr{width: 180px;height: 34px;box-sizing: border-box;-moz-box-sizing:border-box; /* Firefox */-webkit-box-sizing:border-box; /* Safari */ border: solid 1px white;position: relative;border-radius: 17px;overflow: hidden;margin-top: 43px;}
.header .logoBox .fr input{display: block;width: 178px;height: 32px;padding-right: 34px;padding-left: 10px;line-height: 32px;background-color: rgba(0,0,0,0);color: white;}
.header .logoBox .fr .sousuoIcon{display: block;width: 34px;height: 34px;background: url(./assets/img/sousuo_icon.png) center no-repeat;position: absolute;right: -1px;top: -1px;cursor: pointer;}
.header .nav{width: 1200px;margin: 0 auto;overflow: hidden;margin-top: 13px;}
.header .nav li{display: block;float: left;width: 78px;margin-right: 146px;}
.header .nav li a{display: block;line-height: 37px;height: 37px;font-size: 18px;color: #ffffff;letter-spacing: 1px;text-align: center;}
.header .nav li:last-child{margin-right: 0px;}
.header .nav li a:hover,.header .nav li .active{border-bottom: solid 4px white;}
.main{width: 100%;margin: 0 auto;overflow: hidden;}
.footer{width: 100%;height: 120px;background-color: #37acd4;margin-top: 29px;}
.footer p{text-align: center;line-height: 28px;font-size: 16px;color: white;letter-spacing: 1px;}
.footer p:first-child{padding-top: 33px}
.dateListBox{width: 100%;}
.dateListBox li{height: 52px;margin-bottom: 18px;}
.dateListBox li .fl{width: 64px;height: 52px;}
.dateListBox li .fl b{display: block;width: 64px;height: 26px;background-color: #dcdcdc;color: #37acd4;font-size: 18px;font-weight: normal;text-align: center;line-height: 26px;}
.dateListBox li .fl span{display: block;width: 62px;height: 24px;border: solid 1px #dcdcdc;line-height: 24px;text-align: center;font-size: 14px;color: #666666;}
.dateListBox li .fr{width: 333px;}
.dateListBox li .fr h3{display: block;font-weight: normal; width: 333px;height: 17px;line-height: 17px;margin: 8px 0px;color: #333333;font-size: 16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.dateListBox li .fr p{font-size: 14px;color: #666666;line-height: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.dateListBox li:hover .fl b{background-color: #37acd4;color: white;}
.dateListBox li:hover .fr h3{color: #37acd4;}
.listBox{width: 100%;}
.listBox li{height: 26px;border-bottom: solid 1px #dcdcdc;margin-bottom: 13px;}
.listBox li a{display: block;position: relative;overflow: hidden;}
.listBox li a::before{content: "";display: block;width: 6px;height: 6px;background-color: #37acd4;position: absolute;left: 0px;top: 6px;}
.listBox li a span{display: block;max-width: 860px;float: left;margin-left: 17px;font-size: 16px;color: #333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.listBox li a i{display: block;width: auto;float: right;font-style: normal;font-size: 16px;color: #333333;}
.listBox li:hover a span,.listBox li:hover a i{color: #37acd4;}
.page_content .listBox li{height: 17px;line-height: 17px;border: none;margin-bottom: 15px;}
.page_content .dateListBox li .fr {width: 860px;}
.page_content .dateListBox li .fr h3 {width: 800px;}
.pageBanner {width: 100%;height: 180px;}
.page_box{width: 1200px;margin: 0 auto;overflow: hidden;}
.page_nav{width: 200px;height: 50px;float: left;padding-top: 30px;}
.page_nav span{display: block;width: 100%;height:50px;text-align: center;line-height: 50px;background-color: #37acd4;color: white;font-size: 22px;}
.page_main {width: 950px;float: right;}
.page_head {border-bottom: solid 1px #dcdcdc;height: 27px;padding-top: 30px;overflow: hidden;}
.page_head p {float: right;margin-top: 4px;}
.page_head p * {display: block;float: left;font-size: 16px;color: #666666;line-height: 17px;height: 17px;letter-spacing: 2px;}
.page_head p a::after {content: ">";}
.page_head p a:last-child::after {display: none;}
.page_content {padding-top: 20px;}
.page_move {width: 100%;text-align: center;margin-top: 44px;}
.page_move span {display: inline-block;margin: 0 10px;cursor: pointer;}
.page_move :hover {color: #37acd4;}
.page_move .on {color: #37acd4;}
.ThisDown .listBox li{height: 24px;line-height: 24px;}
.ThisDown .listBox li a::before{width: 24px;height: 24px;background: url(./assets/img/dow_icon.jpg) center no-repeat;top: 0px}
.ThisDown .listBox li span{margin-left: 35px;}
.ThisDown .listBox li:hover a::before{background: url(./assets/img/dow_icon_on.jpg) center no-repeat;}
</style>
