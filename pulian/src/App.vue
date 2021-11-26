<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view /> -->

     <transition :name="transitionName">
<keep-alive>
        <router-view/>
</keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
  data(){
    return{
      transitionName:'slide-left'
    }
  },
  watch:{
    $route(to,from){
       //如果to索引大于from索引,判断为前进状态,反之则为后退状态
       let isBack=this.$router.isBack
console.log(to,'to');
console.log(to.meta.index,'to');
console.log(from,'from');
console.log(from.meta.index,'from');
console.log(isBack,'isBack');
       console.log(to.meta.index > from.meta.index,'index');
      if(to.meta.index > from.meta.index){
        // 前进
        this.transitionName = 'slide-right';
        }else{
        this.transitionName = 'slide-left';
      }
    }
  }
};
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

// .slide-left-enter, .slide-right-leave-to {
//   opacity: 0;
//   transform: translateX(100%)
// }

// .slide-left-leave-to, .slide-right-enter {
//   opacity: 0;
//   transform: translateX(-100%)
// }

// .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
//   transition: 1.5s;
//   position: absolute;
//   top:0;
//   will-change: transform;
// }
 
 
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
