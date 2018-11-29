<template>

  <div class="home">
    
    <swiper :options="swiperOption" ref="mySwiper" id="banner">
      <!-- slides -->
      <swiper-slide v-for="slide in banner" v-bind:style="{ 'background-image': 'url(' + slide.FileUrl + ')' }" :key="slide.id"><router-link  :to="{path:slide.Url=='javascript:;'?'/':slide.Url}"></router-link></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
    <div class="index_content">
      <div class="row">
        <!-- 评建动态 -->
        <div class="fl index_pjdt">
          <div class="head"><p><b>{{ pjdtHead.Name }}</b><span>{{ pjdtHead.Aliase }}</span></p><router-link to="/pjdt">+</router-link></div>
          <div class="cont">
            <swiper :options="swiperOption1" ref="mySwiper1" id="img_show">
              <!-- slides -->
              <swiper-slide v-for="slide in pjdtList"  :key="slide.id" v-if="slide.HasPhoto == true">
                <router-link  :to="{path:'/Detail',query:{ID:slide.ID}}">
                  <img :src="slide.Cover" />
                  <span>{{ slide.Title }}</span>
                  </router-link>
                </swiper-slide>
              <!-- Optional controls -->
              <!-- <div class="swiper-pagination" slot="pagination"></div> -->
              <div class="swiper-button-prev" slot="button-prev">&#60;</div>
              <div class="swiper-button-next" slot="button-next">&#62;</div>
            </swiper>
            <ul class="listBox">
              <li v-for="(i,index) in pjdtList" :key="index" ><router-link :to="{path:'/Detail',query:{ID:i.ID}}">
                <span>{{ i.Title }}</span>
                <i>{{ dateFormat(i.ShowTime,"xx-xx")}}</i>                
              </router-link></li>
            </ul>
            <ul class="listBox listBox1">
              <li v-for="(i,index) in pjdtList1" :key="index" ><router-link :to="{path:'/Detail',query:{ID:i.ID}}">
                <span>{{ i.Title }}</span>
                <i>{{ dateFormat(i.ShowTime,"xx-xx")}}</i>                
              </router-link></li>
            </ul>
          </div>
        </div>
        <!-- 通知公告 -->
        <!-- <div class="fr index_tzgg" v-show="tzggList.length>0">
           <div class="head"><p><b>{{ tzggHead.Name }}</b><span>{{ tzggHead.Aliase }}</span></p><router-link to="/tzgg">+</router-link></div>
          <div class="cont">          
            <ul class="dateListBox">
              <li v-for="i in tzggList" :key="i.ID"><router-link  :to="{path:'/Detail',query:{ID:i.ID}}">
                <div class="fl"><b>{{ dateFormat(i.ShowTime,"xx") }}</b><span>{{ dateFormat(i.ShowTime,"xxxx-xx") }}</span></div>
                <div class="fr"><h3>{{ i.Title }}</h3><p>{{ i.Describe }}</p></div>
              </router-link></li>              
            </ul>
          </div>
        </div> -->
      </div>
      <!-- 中部banner -->
      <router-link :to="{path:centerBannerUrl=='javascript:;'?'/':centerBannerUrl}" class="centerBanner" :style="centerBannerBG"></router-link>
      <div class="row row2 ThisDown">
        <!-- 评建简报 -->
        <div class="fl index_pjjb">
            <div class="head"><p><b>{{ pjjbHead.Name }}</b><span>{{ pjjbHead.Aliase }}</span></p><router-link to="/pjjb">+</router-link></div>
            <ul class="listBox">
              <li v-for="(i,index) in pjjbList" :key="index" ><a :href="i.FileUrl" :download="i.Title" target="_block">
                <span>{{ i.Title }}</span>
                <i>{{ dateFormat(i.ShowTime,"xx-xx")}}</i>                
              </a></li>
            </ul>
        </div>
        <!-- 政策文件 -->
        <div class="fr zcwj">
            <div class="head"><p><b>{{ zcwjHead.Name }}</b><span>{{ zcwjHead.Aliase }}</span></p><router-link to="/zcwj">+</router-link></div>
            <ul class="listBox">
              <li v-for="(i,index) in zcwjList" :key="index" ><a :href="i.FileUrl" :download="i.Title" target="_block">
                <span>{{ i.Title }}</span>
                <i>{{ dateFormat(i.ShowTime,"xx-xx")}}</i>                
              </a></li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Base } from "../assets/js/Base"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      banner: [],
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination'
        },
        centeredSlides: true,
        paginationClickable: true,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        keyboard: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      },
      swiperOption1: {
        notNextTick: true,
        autoplay: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        centeredSlides: true,
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        keyboard: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true
      },
      bmlist:[],
      pjdtList: [],
      cneterBannerBG:'',
      cneterBannerUrl:''
    };
  },
  methods: {
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
    }
  },
  created() {
    // banner图片
    this.banner = Base.GetFilesInfoByCid(47);
    // 部门信息
    // this.tzggHead = Base.GetColumnByid(43);
    this.pjdtHead = Base.GetColumnByid(44);
    this.pjjbHead = Base.GetColumnByid(45);
    this.zcwjHead = Base.GetColumnByid(46);

    // 评建动态列表
    // this.tzggList = Base.GetNewsInfoByCid(43,1,7);
    this.pjdtList = Base.GetNewsInfoByCid(44,1,7);
    this.pjdtList1 = Base.GetNewsInfoByCid(44,2,7);
    this.pjjbList = Base.GetFilesInfoByCid(45,1,6);
    this.zcwjList = Base.GetFilesInfoByCid(46,1,6);

    // 中部banner
    this.centerBannerUrl = Base.GetFilesInfoByCid(48)[0].Url;
    this.centerBannerBG = "background:url(" + Base.GetFilesInfoByCid(48)[0].FileUrl+") center no-repeat;";

  }
};

</script>


<style>
#banner{width: 100%;height: 480px;}
.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
  height: 100%;
  background: center no-repeat;
}
#banner .swiper-pagination-bullet {
  width: 50px;
  height: 8px;
  border-radius: 0px;
}
#banner .swiper-pagination-bullet-active{background-color: #37acd4;}
#banner a{display: block;width: 100%;height: 100%;}
#banner .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
}
.index_content{width: 1200px;margin: 0 auto;}
.index_content .row{width: 100%;overflow: hidden;padding-top: 30px;}
.row .head{width: 100%;height: 27px;border-bottom: solid 1px #dcdcdc;}
.row .head p{float: left;}
.row .head p b{display: block;float: left;font-size: 20px;line-height: 20px;font-weight: normal;letter-spacing: 2px;padding-bottom: 5px;border-bottom: solid 3px #37acd4; color:#333333;}
.row .head p span{display: block;float: left;font-size: 12px;color: #333333;line-height: 10px;margin-top: 9px;margin-left: 9px;}
.row .head a{display: block;float: right;}
.index_pjdt{width: 1200px;}
.index_pjdt .cont{height: 270px;overflow: hidden;margin-top: 19px;}
#img_show{width: 340px;justify-content: 270px;float: left;}
#img_show a{display: block;width: 340px;height: 270px;position: relative;}
#img_show a img{display: block;width: 100%;height: 100%;}
#img_show a span{display: block;width: 100%;height: 34px;line-height: 34px;box-sizing: border-box;padding-right: 80px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;position: absolute;bottom: 0px;background-color: rgba(55,172,212,0.7);font-size: 16px;color: white;letter-spacing: 2px;text-indent: 13px;}
#img_show .swiper-button-prev,#img_show .swiper-button-next{background-color: #a0a0a0;background-image: none;width: 20px;height: 20px;text-align: center;line-height: 20px;font-size: 18px;font-family: Arial, Helvetica, sans-serif;color: white;position: absolute;}
#img_show .swiper-button-prev{bottom: 0px;right: 20px;top: auto;left: auto;}
#img_show .swiper-button-next{bottom: 0px;right: 0px;top: auto;left: auto;background-color: #37acd4;}
.index_pjdt ul{width: 402px;height: 270px;overflow: hidden; float: left;margin-left: 28px}
.index_tzgg{width: 410px;}
.index_tzgg ul{height: 270px;margin-top: 20px;overflow: hidden;}

.centerBanner{display: block; width: 1200px;height: 140px;margin: 0 auto;margin-top: 30px;}
.row2>div{width: 586px;height: 257px;overflow: hidden;}
.row2 .listBox{margin-top: 20px;}
.row2 .listBox li{border: none;margin-bottom: 11px;}
.row .listBox li a span{max-width: 320px;}
.row2 .listBox li a span{max-width: 460px;}
</style>
