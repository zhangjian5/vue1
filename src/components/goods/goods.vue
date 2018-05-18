<template>
<div class="goods">
    <!-- 运用了 better-scroll 插件 -->
   <div class="menu-wrapper" ref="menuWrapper">
       <ul>
           <!-- curren 当左边滚动index与右边的index相同的时候 就会添加curren 类名 -->
           <li v-for="(item,index) in goods" @click="selectMenu(index,$event)"  class="menu-item" :class="{'current':currentIndex === index}">
               <span class="text">
                   <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
               </span>
           </li>
       </ul>
   </div>
   <div class="foods-wrapper" ref="foodsWrapper">
       <ul>
           <li v-for="(item,index) in goods" class="foot-list" ref="jsFood">
               <h1 class="title">{{item.name}}</h1>
               <ul>
                   <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food-item">
                       <div class="icon">
                           <img width="57" height="57" :src="food.icon" alt="">
                       </div>
                       <div class="content">
                           <h2 class="name">{{food.name}}</h2>
                           <p v-show="food.description" class="desc">{{food.description}}</p>
                           <div class="extra">
                               <span class="count">月售{{food.sellCount}}份</span>
                               <span>好评率{{food.rating}}%</span>
                           </div>
                           <div class="price">
                               <span class="now">￥{{food.price}}</span>
                               <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                           </div>
                           <div class="cartcontrol-wrapper">
                             <cartcontrol :food="food"></cartcontrol>
                           </div>
                       </div>
                   </li>
               </ul>
           </li>
       </ul>
   </div>
   <!-- 父子组件的传值  要在子组件里面用props 接受 -->
   <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice = "deliveryPrice" :minPrice = "minPrice"></shopcart>
  <food :food="selectedFood" ref="food"></food>
</div>
</template>
   
<style scoped>

.goods .menu-wrapper .menu-item .text .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  vertical-align: top;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.goods .menu-wrapper .menu-item .text .decrease {
  background-image: url("./decrease_3@3x.png");
}

.goods .menu-wrapper .menu-item .text .discount {
  background-image: url("./discount_3@3x.png");
}

.goods .menu-wrapper .menu-item .text .guarantee {
  background-image: url("./guarantee_3@3x.png");
}
.goods .menu-wrapper .menu-item .text .invoice {
  background-image: url("./invoice_3@3x.png");
}
.goods .menu-wrapper .menu-item .text .special {
  background-image: url("./special_3@3x.png");
}

.goods {
  display: flex;
  width: 100%;
  position: absolute;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
}
.goods .menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  font-weight: 200;
  padding: 0 12px;
}
.goods .menu-wrapper .menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
  position: relative;
}
.goods .menu-wrapper .menu-item .text::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.goods .current {
  position: relative;
  margin-top: -1px;
  background-color: #fff;
  color: rgb(240, 20, 20);
  font-weight: 700;
  z-index: 10;
}
.goods .menu-wrapper .current .text::after {
  display: none;
}
.goods .foods-wrapper {
  flex: 1;
}
.goods .foods-wrapper .foot-list .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}
.goods .foods-wrapper .foot-list .food-item {
  display: flex;
  margin: 18px 18px 0;
  padding-bottom: 18px;
  position: relative;
}
.goods .foods-wrapper .foot-list .food-item::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.goods .foods-wrapper .foot-list .food-item:last-child::after {
  display: none;
  margin-bottom: 0;
}
.goods .foods-wrapper .foot-list .food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.goods .foods-wrapper .foot-list .food-item .content {
  flex: 1;
}
.goods .foods-wrapper .foot-list .food-item .content .name {
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
  margin: 2px 0 8px 0;
}
.goods .foods-wrapper .foot-list .food-item .content .desc {
  line-height: 14px;
}
.goods .foods-wrapper .foot-list .food-item .content .desc,
.goods .foods-wrapper .foot-list .food-item .content .extra {
  font-size: 10px;
  color: rgb(147, 153, 159);
  margin-bottom: 8px;
}
.goods .foods-wrapper .foot-list .food-item .content .extra {
  margin-bottom: 0;
}
.goods .foods-wrapper .foot-list .food-item .content .extra .count {
  margin-right: 12px;
}
.goods .foods-wrapper .foot-list .food-item .content .price {
  font-weight: 700;
  line-height: 24px;
}
.goods .foods-wrapper .foot-list .food-item .content .price .now {
  color: rgb(240, 20, 20);
  margin-right: 8px;
  font-size: 14px;
}
.goods .foods-wrapper .foot-list .food-item .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.goods .foods-wrapper .foot-list .food-item .content .cartcontrol-wrapper {
  position: relative;
  right: 0;
  bottom: 12px;
}
</style>
   
<script>
import Vue from "vue";
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";
export default {
  data() {
    return {
      goods: [],
      foods: [],
      listHeight: [],
      scrollY: 0,
      deliveryPrice: 0,
      minPrice: 0,
      selectedFood: {}
    };
  },
  methods: {
    _initScroll() {
      //   给标签添加ref 设置类名   在用this.$refs 获取类名  从而操作dom
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        //    因为这个插件坚监听了touchstart事件会阻止掉默认的事件
        // 所以这里要打开click事件
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        //   这是指针  时时的获取滚动的数据
        click: true,
        probeType: 3
      });
      //   这是指针  时时的获取滚动的数据
      this.foodsScroll.on("scroll", pos => {
        //   用到了scrollY  上面就要定义它
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY);
      });
    },
    // 就是要对应的跳转与滚动
    _calculateHeight() {
      // 拿到每个li
      let foodList = this.$refs.jsFood;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        // 获取到每个li标签到顶部的距离  添加到数组里面
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      // 阻止pc端的连续点击
      if (!event._constructed) {
        return;
      }
      // 获取到元素 再获取到节点
      let foodList = this.$refs.jsFood;
      let el = foodList[index];
      //   调用滚动的方法
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      // 阻止pc端的连续点击
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    _drop(event) {
      this.$nextTick(() => {
        //这里获取到div
        this.$refs.shopcart.drop(event);
        // console.log(event)
      });
    }
  },
  props: {
    type: Object
  },
  //   计算属性
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    // 动态的网购物车里面添加数量
    selectFoods() {
      let foods = [];
      // console.log(this.goods)
      // 循环得到foods下面的foods
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          // food 就是我们得到的每个添加的的food个数
          // 判断个数是否添加
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.$http.get("../../../data.json").then(response => {
      this.seller = response.body;
      this.goods = this.seller.goods;
      this.deliveryPrice = this.seller.seller.deliveryPrice;
      this.minPrice = this.seller.seller.minPrice;
      // console.log(this.seller.seller)
      // DOM 还没有更新
      //    将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      this.$nextTick(function() {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this._initScroll();
        this._calculateHeight();
      });
    });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    //
    this.$root.$on("cart-add", this._drop);
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>