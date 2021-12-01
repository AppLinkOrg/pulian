<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view /> -->


     <transition :name="transitionName">
        <router-view ></router-view>
    </transition>

  </div>
</template>


<script>


export default {
  data(){
    return{
      transitionName:'slide-left',
    }
  },
  watch:{
  
     
   $route(to,from){


     let a = this.$router.a 
     var isBack =this.$store.state.iaBack;
     if(isBack==false){
this.transitionName = 'slide-left';
     }else{
this.transitionName = 'slide-right';
     }

     console.log(to,from,a,isBack)

   }



  },


}
</script>


<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
//  后退的
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
 
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
 
//  前进的
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
 
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}







</style>
