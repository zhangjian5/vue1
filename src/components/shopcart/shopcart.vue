<template>
   <div class='shopcart'>
       <div class="content" @click="toggleList">
           <div class="content-left">
               <div class="logo-wrapper">
                 <!-- 判断是否选中了商品  添加样式 -->
                   <div class="logo" :class="{'heightLine':totalCount>0}">
                       <span class="icon-cart" :class="{'heightLine':totalCount>0}">cart</span>
                   </div>
                   <!-- 是否显示 -->
                   <div class="num" v-show="totalCount>0">{{totalCount}}</div>
               </div>
               <div class="price"  :class="{'heightLine':totalCount>0}">￥{{totalPrice}}元</div>
               <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
           </div>
           <!-- .stop阻止单击事件继续传播 -->
           <div class="content-right" @click.stop="pay">
             <div class="pay" :class="payClass"> {{payDesc}}</div>
           </div>
       </div>
      <div class="ball-container"  id="transition-demo">
                <div class="ball"  v-for="(ball,index) in balls"  >
            <transition name="drop"  tag="p" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div v-show="ball.show">
                      <span class="inner jsInner"></span>
                    </div>
            </transition>
                </div>
            <!-- <transition   name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <div class="ball"  v-for="(ball,index) in balls" v-show="ball.show">
                <span class="inner jsInner"></span>>
              </div> -->
           <!-- </transition>  -->
      </div>
    <transition name="fold">
      <div class="shopcart-list"  v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty"  @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
   <div class="list-mask" @click="hideList" v-show="listShow"></div>
   </div>
</template>
   
<style scoped>
.list-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  filter: blur(10px);
  /* -webkit-backdrop-filter: blur(10px); */
  background: rgba(7, 17, 27, 0.6);
}
.shopcart {
  width: 100%;
  height: 48px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
}
.shopcart .content {
  display: flex;
  background-color: #141d27;
  font-size: 0;
  color: rgba(255, 255, 255, 0.4);
}
.shopcart .content .content-left {
  flex: 1;
}
.shopcart .content .content-left .logo-wrapper {
  display: inline-block;
  width: 56px;
  height: 56px;
  position: relative;
  top: -10px;
  margin: 0 13px;
  padding: 6px;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 50%;
  background: #141d27;
}
.shopcart .content .content-left .logo-wrapper .logo {
  width: 100%;
  height: 100%;
  background: #2b343c;
  border-radius: 50%;
  text-align: center;
}
.shopcart .content .content-left .logo-wrapper .heightLine {
  background: rgb(0, 160, 220);
}
.shopcart .content .content-left .logo-wrapper .num {
  width: 24px;
  height: 16px;
  line-height: 16px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: red;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.shopcart .content .content-left .logo-wrapper .logo .icon-cart {
  line-height: 44px;
  font-size: 22px;
  color: #80858a;
}
.shopcart .content .content-left .logo-wrapper .logo .heightLine {
  color: #fff;
}
.shopcart .content .content-left .price {
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 12px;
  padding-right: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: top;
  box-sizing: border-box;
}
.shopcart .content .content-left .heightLine {
  color: #fff;
}
.shopcart .content .content-left .desc {
  display: inline-block;
  line-height: 24px;
  font-size: 12px;
  margin: 12px 0 0 12px;
  vertical-align: top;
}
.shopcart .content .content-right {
  flex: 0 0 105px;
  width: 105px;
}
.shopcart .content .content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  background: #2b333b;
}
.shopcart .content .content-right .not-enough {
  background: #2b333b;
}
.shopcart .content .content-right .enough {
  background: #00b43c;
  color: #fff;
  font-size: 14px;
}
.shopcart .ball-container {
  transition: all 1s linear;
}
.shopcart .ball-container .ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
}
.shopcart .ball-container .ball .inner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: pink; 
  transition: all 1s linear;
}
/* vue 动画的样式 */
.drop-enter-active,
.drop-leave-active {
  transition: all 1s cubic-bezier(0.49,-0.29,0.75,0.41);
}
/* .drop-enter,
.drop-leave-to {
  opacity: 0;
  transform: translate3D(24px, 0, 0);
} */

.shopcart .shopcart-list {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  /* transition: all 0.5s; */
  transform: translate3d(0, -100%, 0);
}
/* .fold-enter-active,
.fold-leave-active {
  transform: translate3d(0, -100%, 0);
} 
.fold-enter {
  transform: translate3d(0, 0, 0);
} */
.shopcart .shopcart-list .list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.shopcart .shopcart-list .list-header .title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.shopcart .shopcart-list .list-header .empty {
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
.shopcart .shopcart-list .list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
}
.shopcart .shopcart-list .list-content .food {
  padding: 12px 0;
  box-sizing: border-box;
  position: relative;
}
.shopcart .shopcart-list .list-content .food::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.shopcart .shopcart-list .list-content .food .name {
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.shopcart .shopcart-list .list-content .food .price {
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: red;
  position: absolute;
  right: 90px;
  bottom: 12px;
}
.shopcart .shopcart-list .list-content .cartcontrol-wrapper {
  position: relative;
  right: 0;
  bottom: 30px;
}
</style>
   
<script>
// 这里就是为了把滚动事件给带进来，然后把点击事件给带进来
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
export default {
  data() {
    return {
      // 小球
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      // 下落的小球 动画没有写成功
      dropBalls: [],
      fold: true
    };
  },
  created() {},
  methods: {
    drop(el) {
      // console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          // console.log(this.dropBalls)
          return;
        }
      }
    },
    toggleList() {
      //没有数据就是不展开
      if (!this.totalCount) {
        return;
      }
      // 有就展开  再次点击就关闭
      this.fold = !this.fold;
    },
    // 清空
    empty() {
      // 我们是通过count来计算的，我们把它设置为0就是清空
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideList(){
      this.fold = true;
    },
    pay(){
      if(this.totalPrice<this.minPrice){
        return;
      }
      window.alert(`支付${this.totalPrice}元`)
    },
    // 传入 'el' 这个 DOM 元素作为参数。
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        // 获取el的位置
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          // console.log(rect)
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          //  console.log(y)
          el.style.display = "";
          el.style.webKitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("jsInner")[0];
          // console.log(inner)
          inner.style.webKitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webKitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("jsInner")[0];
        inner.style.webKitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener('transitionend',done)
      });
    },
    afterEnter(el) {
      //重值状态
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    //商品总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        // 价格与个数
        total += food.price * food.count;
      });
      return total;
    },
    // 商品总和个数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 总价起送逻辑
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      //判断时候点击添加或者删除
      if (show) {
        this.$nextTick(() => {
          // 过渡
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  components: {
    cartcontrol
  }
};
</script>