<template>
  <div class="" style="" >
    333
   <!-- <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" name="Home">标签</van-tabbar-item>
  <van-tabbar-item icon="search" name="HelloWorld">标签</van-tabbar-item>
</van-tabbar> -->
  </div>
</template>

<script>
export default {
  name: "Footer",
  data(){
      return{
 active: 'Home',
      }
  },
  created(){

  },
  methods:{
      tiaozhaun(){
         this.goback(-1)
      }


  }
};
</script>


<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
