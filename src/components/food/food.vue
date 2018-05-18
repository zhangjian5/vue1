<template>
    <transition name="move">

    <div v-show="showFlag" class='food' ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i> 《 </i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                 <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wraper"  v-show="food.count>0">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div @click.stop="addFirst" class="buy" v-show="!food.count||food.count===0">
                    加入购物车
                </div>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">
                    商品评价
                </h1>
                <ratingselect :selectType = "selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                <div class="rating-wrapper">
                  <ul v-show="food.ratings && food.ratings.length">
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item">
                      <div class="user">
                        <span class="name">{{rating.username}}</span>
                        <img width="12" height="12" class="avatar" :src="rating.avatar" alt="">
                      </div>
                      <!-- 这里用到了事件过滤 后面添加的方法-->
                      <div class="time">{{rating.rateTime | formatDate}}</div>
                      <p class="text">
                        <span :class="{'icon':rating.rateType===0,'icon1':rating.rateType === 1}"></span>
                        {{rating.text}}
                      </p>
                    </li>
                  </ul>
                  <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
   
<style scoped>
.cartcontrol-wraper .cartcontrol {
  position: static;
}
/* 右到左的动画 */
.move-enter-active,
.move-leave-active {
  transform: translate3d(0, 0, 0);
  transition: all 0.2s linear;
}
.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.food {
  width: 100%;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
}
.food .food-content {
}
.food .food-content .image-header {
  position: relative;
  /* 这样写就会是宽高相等的容器 */
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food .food-content .image-header img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.food .food-content .image-header .back {
  position: absolute;
  top: 10px;
  left: 0;
}
.food .food-content .image-header .back i {
  display: block;
  font-size: 16px;
  padding: 3px;
  color: #fff;
  background: #000;
}
.food .food-content .content {
  position: relative;
  padding: 18px;
}
.food .food-content .content .title {
  line-height: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
}
.food .food-content .content .detail {
  height: 10px;
  margin-bottom: 18px;
  line-height: 10px;
  font-size: 0;
}
.food .food-content .content .detail .sell-count,
.food .food-content .content .detail .rating {
  font-size: 10px;
  color: rgb(147, 153, 159);
  margin-right: 12px;
}
.food .food-content .content .detail .rating {
}
.food .food-content .content .price {
  font-weight: 700;
  line-height: 24px;
}
.food .food-content .content .price .now {
  color: rgb(240, 20, 20);
  margin-right: 8px;
  font-size: 14px;
}
.food .food-content .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.food .food-content .cartcontrol-wraper {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.food .food-content .buy {
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  font-size: 10px;
  position: absolute;
  right: 18px;
  bottom: 18px;
  border-radius: 12px;
  color: #fff;
  background: rgb(0, 160, 220);
  box-sizing: border-box;
  z-index: 10;
}
.food .food-content .info {
  padding: 18px;
}
.food .food-content .info .title,
.food .food-content .rating .title {
  line-height: 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.food .food-content .rating .title {
  padding: 18px 18px 0;
}
.food .food-content .info .text {
  line-height: 24px;
  font-size: 12px;
  color: rgb(77, 85, 93);
  padding: 0 8px;
}
.food .food-content .rting {
  padding-top: 18px;
}
.food .food-content .rting .title {
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.food .rating-wrapper{
  padding: 0 18px;
}
.food .rating-wrapper .rating-item{
  position: relative;
  padding: 16px 0;
}.food .rating-wrapper .no-rating {
  padding: 16px 0;
  font-size: 12px;
}
.food .rating-wrapper .rating-item::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.food .rating-wrapper .rating-item .user{
  line-height:12px ;
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 0;
}
.food .rating-wrapper .rating-item .user .name{
  display: inline-block;
  font-size: 10px;
  margin-right: 6px;
  vertical-align: top;
  color: rgb(147,153,159);
}
.food .rating-wrapper .rating-item .user .avatar{
  border-radius: 50%;
}
.food .rating-wrapper .rating-item .time{
  line-height: 12px;
  font-size: 10px;
  color: rgb(147,153,159);
  margin-bottom: 6px;
}
.food .rating-wrapper .rating-item .text{
  line-height: 16px;
  font-size: 12px;
  color: rgb(7,17,27);
}
.food .rating-wrapper .rating-item .text .icon{
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
}
.food .rating-wrapper .rating-item .text .icon1{
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #000;
}
</style>
   
<script>
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import {formatDate} from "../../common/js/date.js";

//  正面 评价
// const POSITIVE = 0;
//    负面
// const NEGATIVE = 1;
//    全部
const ALL = 2;
export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        //  这里是这个组件里面是显示的这样的字样
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  created() {
    //  用来监听子组件的￥emit的事件
    this.$root.$on("ratingtype-select", this.ratingtypeSelect);
    this.$root.$on("content-toggle", this.contentToggle);
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      //   显示之后
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            //    因为这个插件坚监听了touchstart事件会阻止掉默认的事件
            // 所以这里要打开click事件
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$root.$emit("cart-add", event.target);
      Vue.set(this.food, "count", 1);
    },
    needShow(type,text){
      // 是否显示内容
      if(this.onlyContent && !text){
        return false;
      }
      // 类型s
      if(this.selectType == ALL){
        return true;
      }else {
        return type === this.selectType;
      }
    },
    
    ratingtypeSelect(type){
      this.selectType = type;
    },
    contentToggle(onlyContent){
      this.onlyContent = onlyContent;
    }
  },
  filters:{
    formatDate(time){
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>