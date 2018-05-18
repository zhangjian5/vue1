<template>
   <div class="star" :class="starType">
       <!-- 用v-for循环生成标签  用获取到的角标显示添加对应的class -->
       <span v-for="(item,index) in itemClass" :class="itemClass[index]" class="star-item">

       </span>
   </div>
</template>
   
<style scoped>
.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}
.star-48 .star-item:last-child {
  margin-right: 0;
}
.star-48 .on {
  background-image: url("./star48_on@3x.png");
}
.star-48 .half {
  background-image: url("./star48_half@3x.png");
}
.star-48 .off {
  background-image: url("./star48_off@3x.png");
}
.star-36 .star-item:last-child {
  margin-right: 0;
}
.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star-36 .on {
  background-image: url("./star36_on@3x.png");
}
.star-36 .half {
  background-image: url("./star36_half@3x.png");
}
.star-36 .off {
  background-image: url("./star36_off@3x.png");
}
.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star-24 .star-item:last-child {
  margin-right: 0;
}
.star-24 .on {
  background-image: url("./star24_on@3x.png");
}
.star-24 .half {
  background-image: url("./star24_half@3x.png");
}
.star-24 .off {
  background-image: url("./star24_off@3x.png");
}
</style>
   
<script>
const LENGTH = 5; //五颗星
const CLS_ON = "on"; //全星
const CLS_HALF = "half"; //半星
const CLS_OFF = "off"; //没有
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  props: {
    size: {
      type: Number //尺寸
    },
    score: {
      type: Number //获取到的分数
    }
  },
  computed: {
    starType() {
      // star的个数
      return "star-" + this.size;
    },
    itemClass() {
      let result = [];
      //  向下取0.5倍数的值
      let score = Math.floor(this.score * 2) / 2;
      //   是否有小数
      let hasDecimal = score % 1 !== 0;
      //   整数
      let integer = Math.floor(score);
      //   循环获取到的全星
      for (let i = 0; i < integer; i++) {
        //   添加全星的图片
        result.push(CLS_ON);
      }
      //   添加伴星的图片
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      //   添加没有星的图片 长度小于5的话就添加
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>