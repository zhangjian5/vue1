<template>
   <div class='ratingselect'>
       <div class="rating-type">
           <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
           <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
           <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
       </div>
       <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
           <span class="icon">✔</span>
           <span class="text">只看有内容的评价</span>
       </div>
   </div>
</template>
   
<style scoped>
.ratingselect {
}
.ratingselect .rating-type {
  padding: 18px 0;
  margin: 0 18px;
  font-size: 0;
  position: relative;
}
.ratingselect .rating-type::after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.ratingselect .rating-type .block {
  display: inline-block;
  line-height: 16px;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 1px;
  color: rgb(77, 85, 93);
  font-size: 12px;
}
.ratingselect .rating-type .block.active {
  color: #fff;
}
.ratingselect .rating-type .block .count {
  font-size: 8px;
  margin-left: 2px;
}
.ratingselect .rating-type .positive {
  background: rgba(0, 160, 220, 0.2);
}
.ratingselect .rating-type .positive.active {
  background: rgb(0, 160, 220);
}
.ratingselect .rating-type .negative {
  background: rgba(77, 85, 93, 0.2);
}
.ratingselect .rating-type .negative.active {
  background: rgb(77, 85, 93);
}
.ratingselect .switch {
  line-height: 24px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  color: rgb(147, 153, 159);
  padding: 12px 18px;
  font-size: 0;
}
.ratingselect .on .icon {
  color: #00c850;
}
.ratingselect .switch .icon {
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
  margin-right: 4px;
}
.ratingselect .switch .text {
  font-size: 12px;
}
</style>
   
<script>
import Vue from "vue";
//  正面 评价
const POSITIVE = 0;
//    负面
const NEGATIVE = 1;
//    全部
const ALL = 2;
export default {
  data() {
    return {
    };
  },
  created() {},
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType = type;
      this.$root.$emit("ratingtype-select", type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      this.$root.$emit("content-toggle", this.onlyContent);
    }
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    //  选择的类型
    selectType: {
      type: Number,
      //默认是所有的
      default: ALL
    },
    // 读或者不读
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 描述
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  }
};
</script>