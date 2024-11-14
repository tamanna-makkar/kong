<script setup lang="ts">
defineOptions(
  { name: 'BaseLoader' },
)
</script>
<template>
  <div
    class="spinner"
  >
    <div class="bounce1" />
    <div class="bounce2" />
    <div class="bounce3" />
  </div>
</template>

<style lang="sass" scoped>
.spinner
  margin: 100px auto
  width: 70px
  text-align: center

  > div
    width: 14px
    height: 14px
    background-color: #245BA7
    border-radius: 100%
    display: inline-block
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both
    animation: sk-bouncedelay 1.4s infinite ease-in-out both

  .bounce1
    -webkit-animation-delay: -0.32s
    animation-delay: -0.32s

  .bounce2
    -webkit-animation-delay: -0.16s
    animation-delay: -0.16s

  @-webkit-keyframes sk-bouncedelay
    0%, 80%, 100%
      -webkit-transform: scale(0)
    40%
      -webkit-transform: scale(1.0)

  @keyframes sk-bouncedelay
    0%, 80%, 100%
      -webkit-transform: scale(0)
      transform: scale(0)
    40%
      -webkit-transform: scale(1.0)
      transform: scale(1.0)
.white-loader
    > div
      background-color: #fff
</style>