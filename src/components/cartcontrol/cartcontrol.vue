<template>
   <div class='cartcontrol' >
         <transition name="move">
            <div class="cart-decrease"  @click.stop="decCart($event)" v-show="food.count>0">
                <span class="inner">-</span>
           </div>
         </transition>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
       <div class="cart-add"  @click.stop="addCart($event)">+</div>


      
   </div>
</template>
   
<style scoped>



.cartcontrol {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0;
}
.cartcontrol .cart-decrease {
  display: inline-block;
  padding: 6px;
  transform: all 0.5s linear;
}
/* vue 动画的样式 */
.move-enter-active,
.move-leave-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: all 0.4s linear;
}
.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}
.cartcontrol .cart-decrease .inner {
  display: inline-block;
  padding: 1px 10px;
  line-height: 24px;
  background: skyblue;
  border-radius: 50%;
  font-size: 18px;
  transform: all 0.5s linear;
  transform: rotate(0);
}
.cartcontrol .cart-add {
  display: inline-block;
  background: skyblue;
  padding: 4px 8px;
  border-radius: 50%;
  font-size: 18px;
}
.cartcontrol .cart-count {
  display: inline-block;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  font-size: 10px;
  color: #000;
  margin: 0 4px;
  text-align: center;
}
</style>
   
<script>
import Vue from "vue";
export default {
  data() {
    return { 
    };
  },
  created() {},
  methods: {
    addCart(event) {
      // console.log(event)
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        //   我们是用js控制的数据的增加，在vue里面是没有改变的
        // 所以我们要用vue.set属性去动态的添加cound
        Vue.set(this.food, "count", 1);
        this.food.count = 1;
      } else {
        this.food.count++;
      }
    //   这里获取到div
    // 在这个组件里面获取到的add事件，
    // 在goods组件里面用 this.$root.$on事件监听到
    // 调用回调函数，回调函数调用了shopcart组件
    // this.$refs.shopcart.drop(event);把获取到的div传递过去
    // 在shopcart组件 就能操作这个dom
    this.$root.$emit('cart-add', event.target);
    // console.log(event.target)
    },
    decCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  },
  props: {
    food: {
      type: Object
    }
  }
};
</script>