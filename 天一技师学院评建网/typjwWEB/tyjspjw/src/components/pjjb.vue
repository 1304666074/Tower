<template>
  <div class="pjjb">
    <div class="pageBanner" :style="pageBanner"></div>
    <div class="page_box">
      <div class="page_nav"><span>{{ pageHeader.Name }}</span></div>
      <div class="page_main">
        <div class="page_head">
          <p><span>当前位置：</span><router-link to="/">首页</router-link><router-link :to="pageHeader.Router">{{pageHeader.Name}}</router-link></p>
        </div>
        <div class="page_content ThisDown">
          <ul class="listBox">
            <li v-for="(i,index) in pjjbList" :key="index" ><a :href="i.FileUrl" :download="i.Title" target="_block">
              <span>{{ i.Title }}</span>
              <i>{{ dateFormat(i.ShowTime,"xx-xx")}}</i>                
            </a></li>
          </ul>
          <div class="page_move" v-show="pageCount>1">
            <span @click="pageMove(1)">首页</span>
            <span @click="pageMove(curPage-1)">上一页</span>
            <span class="pager firsts" @click="pageMove(curPage-2)" v-show="curPage-2>0">{{ curPage-2 }}</span>
            <span class="pager first" @click="pageMove(curPage-1)" v-show="curPage-1>0">{{ curPage-1 }}</span>
            <span class="pager second on" @click="pageMove(curPage)">{{ curPage }}</span>
            <span class="pager third" @click="pageMove(curPage+1)" v-show="curPage+1<pageCount+1">{{ curPage+1 }}</span>
            <span class="pager thirds" @click="pageMove(curPage+2)" v-show="curPage+2<pageCount+1">{{ curPage+2 }}</span>
            <span @click="pageMove(curPage+1)">下一页</span>
            <span @click="pageMove(pageCount)">尾页</span>          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Base } from "../assets/js/Base"

export default {
  name: 'pjjb',
  data () {
    return {
      pageBanner: '',
      pjjbList: '',
      pageHeader: '',
      pageSize: 8,//翻页每页显示数据
      curPage: 1,//当前页面
      pageCount: '',//总共页面数
    }
  },
  methods:{  
    dateFormat: function(date,format){
      var data = String(date);
      var str = '';
      if (format == "xx-xx") {
        for (let i = 1; i < data.length; i++) {
          if (i>4) {
            str += data[i];
          }        
        }
      }else if(format == "xx"){
        for (let i = 1; i < data.length; i++) {
          if (i>7) {
            str += data[i];
          }        
        }
      }else if(format == "xxxx-xx"){
        for (let i = 0; i < data.length; i++) {
          str += data[i];
          if (i>5) {
            break;
          }        
        }
      }   
      return str;
    },
    pageMove: function(p){
      if (p>this.pageCount) {
        return false;
      }else if(1>p){
        return false;
      }
      this.curPage = p;
      this.pjjbList = Base.GetNewsInfoByCid(45,this.curPage,this.pageSize);
    }
  },
  created() {
    // 子页面banner图
    this.pageBanner = "background:url(" + Base.GetFilesInfoByCid(49)[0].FileUrl+") center no-repeat;";
    this.pageHeader = Base.GetColumnByid(45);
    this.pjjbList = Base.GetFilesInfoByCid(45,this.curPage,this.pageSize);
    this.pageCount = Math.ceil(this.pjjbList[0].Total/this.pageSize);
  }
}
</script>


<style>
</style>
