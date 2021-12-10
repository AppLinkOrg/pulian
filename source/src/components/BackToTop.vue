<script setup>
const backtotop = () => {
  document.querySelector("body").scrollIntoView({ behavior: "smooth" });
};
</script>
<template>
  <div class="content-grid__block">
    <div class="center back " >
      <button
        class="
        backtotop
          scroll-to-top__button
          scroll-to-top__button--gray
          scroll-to-top__button--slim-top
        "
        type="button"
        data-v-e795e29a=""
        @click="backtotop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.4"
          height="11.1"
          viewBox="0 0 17.4 11.1"
          data-v-e795e29a=""
        >
          <path
            fill="#fd8300"
            d="M8.7 0l8.7 8.552-2.591 2.548-6.109-6-6.109 6L0 8.552z"
            data-v-e795e29a=""
          ></path>
        </svg>
        BACK TO TOP
      </button>
    </div>
  </div>
</template>
<style scoped>
.content-grid__block{
  padding: 0;
  width: 100%;
  display: block;
}
.back {
  padding:  32px 48px;
  font-size: 32px;
  cursor: pointer;

}
.scroll-to-top__button {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border: 0;
  background: transparent;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  min-height: 64px;
  min-width: 160px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
}
.scroll-to-top__button svg {
  display: block;
  margin: 0 auto 8px;
  position: relative;
  top: 0;
  transition: all 0.2s linear;
}
</style>