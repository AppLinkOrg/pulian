<template>
  <div class="hello" @click="tiaozhaun()" >
    <div style="width:100vw ;height:100vh;background:#999">1111</div>
 
  </div>
</template>

<script>





export default {
  name: "Home",
  data(){
      return{

      }
  },
  created(){
  

  },
  methods:{
      tiaozhaun(){
          this.push('/HelloWorld')
      }


  }

  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
