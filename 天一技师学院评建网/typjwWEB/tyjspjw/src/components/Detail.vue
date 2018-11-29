<template>
  <div class="Detail">
    <div class="pageBanner" :style="pageBanner"></div>
    <div class="page_box">
      <div class="page_nav"><span>{{ pageHeader.Name }}</span></div>
      <div class="page_main">
        <div class="page_head">
          <p><span>当前位置：</span><router-link to="/">首页</router-link><router-link :to="pageHeader.Router">{{pageHeader.Name}}</router-link></p>
        </div>
        <div class="page_content">
          <h3 class="page_title">{{detail.Title}}</h3>
          <h4 class="page_Ftitle"><span>来源：{{ detail.Author }}</span><span>时间：{{ dataFormat(detail.ShowTime) }}</span><span>浏览：{{ detail.Press }}</span></h4>
          <div class="fontbox" v-html="detail.Details">
            {{ detail.Details }}
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { Base } from "../assets/js/Base"

export default {
  name: 'Detail',
  data () {
    return {
      pageBanner: '',
      pageHeader: '',
      detail: '',
      tzggList: [],
      thisNewsId: '',
      Fid: ''
    }
  },
  methods:{
    dataFormat: function(date){
      var str = '';
      console.log(date);
        for (let i = 0; i < date.length; i++) {
          if (i<10) {
            str+=date[i];            
          }         
        }
        console.log(str);
        return str;
    }
  },
  created() {
    this.thisNewsId = this.$route.query.ID;

    // 子页面banner图
    this.pageBanner = "background:url(" + Base.GetFilesInfoByCid(49)[0].FileUrl+") center no-repeat;";    
    this.detail = Base.GetNewsInfoByNid(this.thisNewsId);
    this.Fid = this.detail.Fid;
    this.pageHeader = Base.GetColumnByid(this.Fid);
  }
}
</script>


<style>
.page_content{padding-top: 20px;}
.page_title{display: block;font-weight: normal;text-align: center;font-size: 20px;color: #333333;letter-spacing: 2px;line-height: 24px;}
.page_Ftitle{display: block;text-align: center;font-weight: normal;line-height: 37px;background-color: #f2f2f2;margin-top: 20px;}
.page_Ftitle span{display:inline-block;margin: 0 10px;font-size: 16px;color: #666666;letter-spacing: 2px;}
.fontbox{padding-top: 10px;}
.fontbox *{font-size: 16px;color: #666666;line-height: 24px;margin-top: 10px;}
.fontbox img{display: block;max-width: 100%;margin: 0 auto;margin-top: 15px;padding-bottom: 5px;}
</style>
