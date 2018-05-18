<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link class="linkA" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link class="linkA" to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link class="linkA" to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view  :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/unti.js';
  export default {
    // name: 'app',
    data() {
      return {
        seller: {
          id:(()=>{
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created() {
      this.$http.get('../data.json?id='+this.seller.id).then((response) => {
        // 在app.vue里面获取到数据之后 我们要传给header组件  所以在上面写上:seller=seller
        // 在header组件里面用props 接受传过来的数据
        this.seller = response.body.seller;
        // console.log(this.seller);
      }, response => {
        // error callback
        console.log('error')
      });
    },
    components: {
      'v-header': header
    }
  }
</script>

<style scoped>
  .tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    position: relative;
  }
  
  .tab::after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  
  .tab .tab-item {
    flex: 1;
    text-align: center;
  }
  
  .tab .tab-item .linkA {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
  
  .tab .tab-item a.active {
    color: rgb(240, 20, 20)
  }
</style>
