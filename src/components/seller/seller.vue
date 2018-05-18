<template>
   <div class='seller' ref="seller">
       <div class="seller-content">
           <div class="overview">
               <h1 class="title">{{seller.name}}</h1>
               <div class="desc">
                   <star class="star" :size='36' :score='seller.score'></star>
                   <span class="text">({{seller.ratingCount}})</span>
                   <span class="text">月售{{seller.sellCount}}单</span>
               </div>
               <ul class="remark">
                   <li class='block'>
                       <h2>起送价</h2>
                       <div class="content">
                           <span class="stress">{{seller.minPrice}}</span>元
                       </div>
                   </li>
                   <li class='block'>
                       <h2>商家配送</h2>
                       <div class="content">
                           <span class="stress">{{seller.deliveryPrice}}</span>元
                       </div>
                   </li>
                   <li class='block'>
                       <h2>平均配送时间</h2>
                       <div class="content">
                           <span class="stress">{{seller.deliveryTime}}</span>分钟
                       </div>
                   </li>
               </ul>
               <!-- 收藏 -->
               <div class="favorite" @click="toggleFavorite">
                 <span class="icon" :class="{'active':favorite}"></span>
                 <span class="text">{{favoriteText}}</span>
               </div>
           </div>
           <split></split>
           <div class="bulletin">
               <h1 class="title">公告与活动</h1>
               <div class="content-wrapper">
                   <p class="content">{{seller.bulletin}}</p>
               </div>
                 <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
           </div>
           <split></split>
           <div class="pics">
             <h1 class="title">商家实景</h1>
             <div class="pic-warpper" ref="picWarpper">
               <ul ref="picList" class="pic-list">
                 <li class="pic-item" v-for="(pic,inde) in seller.pics">
                   <img :src="pic" width="120" height="90" alt="">
                 </li>
               </ul>
             </div>
           </div>
           <split></split>
           <div class="info">
             <h1 class="title">商家信息</h1>
             <ul>
               <li class="info-item" v-for="(info,index) in seller.infos">{{info}}</li>
             </ul>
           </div>
       </div>
   </div>
</template>
   
<style scoped>
.favorite{
  width: 40px;
  text-align: center;
  position: absolute;
  right: 18px;
  top: 18px;  
}
.favorite .icon{
  display: block;
  width: 40px;
  height: 20px;
  background-color: #fff;
  border: 1px solid red;
}
.favorite .active{
  display: block;
  width: 40px;
  height: 20px;
  background-color: red;
  border: 1px solid #fff;
}
.favorite .text {
  line-height: 12px;
  font-size: 12px;
}
.seller {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
}
.seller .seller-content {
}
.seller .seller-content .overview {
  padding: 18px;
}
.seller .seller-content .overview .title {
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
  font-size: 14px;
}
.seller .seller-content .overview .desc {
  line-height: 18px;
  padding-bottom: 18px;
  font-size: 0;
  position: relative;
}
.seller .seller-content .overview .desc::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .overview .desc .star {
  display: inline-block;
  margin-right: 8px;
  vertical-align: top;
}
.seller .seller-content .overview .desc .text {
  display: inline-block;
  line-height: 18px;
  margin-right: 12px;
  font-size: 10px;
  color: rgb(77, 85, 93);
  vertical-align: top;
}
.seller .seller-content .overview .remark {
  display: flex;
  padding-top: 18px;
}
.seller .seller-content .overview .remark .block {
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .overview .remark .block:last-child {
  border: none;
}
.seller .seller-content .overview .remark .block h2 {
  font-size: 10px;
  margin-bottom: 4px;
  color: rgb(147, 153, 159);
}
.seller .seller-content .overview .remark .block .content {
  line-height: 24px;
  font-size: 10px;
  color: rgb(7, 17, 27);
}
.seller .seller-content .overview .remark .block .content .stress {
  font-size: 24px;
}
.seller .seller-content .bulletin {
  padding: 18px 18px 0 18px;
}
.seller .seller-content .bulletin .title {
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
  font-size: 14px;
}
.seller .seller-content .bulletin .content-wrapper {
  padding: 0 12px 16px;
  position: relative;
}
.seller .seller-content .bulletin .content-wrapper::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .bulletin .content-wrapper .content {
  line-height: 24px;
  font-size: 12px;
  color: rgb(240, 20, 20);
}
.seller .seller-content .bulletin .supports {
}
.seller .seller-content .bulletin .supports .support-item {
  font-size: 0;
  padding: 16px 12px;
  position: relative;
}
.seller .seller-content .bulletin .supports .support-item::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .bulletin .supports .support-item:last-child::after {
  border-top: none;
}
.seller .seller-content .bulletin .supports .support-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: top;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}

.seller .seller-content .bulletin .supports .support-item .decrease {
  background-image: url("./decrease_4@3x.png");
}

.seller .seller-content .bulletin .supports .support-item .discount {
  background-image: url("./discount_4@3x.png");
}

.seller .seller-content .bulletin .supports .support-item .guarantee {
  background-image: url("./guarantee_4@3x.png");
}
.seller .seller-content .bulletin .supports .support-item .invoice {
  background-image: url("./invoice_4@3x.png");
}

.seller .seller-content .bulletin .supports .support-item .special {
  background-image: url("./special_4@3x.png");
}
.seller .seller-content .bulletin .supports .support-item .text {
  line-height: 16px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.seller .seller-content .pics {
  padding: 18px;
}
.seller .seller-content .pics .title {
  margin-bottom: 12px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  font-size: 14px;
}
.seller .seller-content .pics .pic-warpper {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.seller .seller-content .pics .pic-warpper .pic-list {
  font-size: 0;
}
.seller .seller-content .pics .pic-warpper .pic-list .pic-item {
  display: inline-block;
  width: 120px;
  height: 90px;
  margin-right: 6px;
}
.seller .seller-content .pics .pic-warpper .pic-list .pic-item:last-child {
  margin-right: 0;
}
.seller .seller-content .info {
  padding: 18px 18px 0 18px;
}
.seller .seller-content .info .title {
  padding-bottom: 12px;
  line-height: 14px;
  position: relative;
}
.seller .seller-content .info .title::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .info  .info-item {
  padding: 16px 12px;
  line-height: 16px;
  font-size: 12px;
  position: relative;
}
.seller .seller-content .info  .info-item::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .info  .info-item:last-child::after {
  border:none;
}
</style>
   
<script>
import BScroll from "better-scroll";
import star from "../star/star";
import split from "../split/split";
import {saveTolocal,loadFormLocal} from "../../common/js/store.js";
export default {
  data() {
    return {
      favorite:(()=>{
        return loadFormLocal(this.seller.id,'favorite',false);
      })()
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  //这个钩子函数就是为了防止document没有加载成功的时候调用插件
  mounted: function() {
    this.$nextTick(function() {
      // 代码保证 this.$el 在 document 中
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
    });
    if (this.seller.pics) {
      let picWidth = 120;
      let margin = 6;
      // 计算ul的宽度
      let width = (picWidth + margin) * this.seller.pics.length - margin;
      this.$refs.picList.style.width = width + "px";
      this.$nextTick(() => {
        this.picScroll = new BScroll(this.$refs.picWarpper, {
          scrollX: true,
          eventPassthrough: "vertical"
        });
      });
    }
  },
  methods: {
    toggleFavorite(){
      this.favorite = !this.favorite;
      saveTolocal(this.seller.id,'favorite',this.favorite);
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed:{
    favoriteText(){
      return this.favorite?'已收藏':'收藏'
    }
  },
  components: {
    star,
    split
  }
};
</script>