<script lang="ts" setup>
import avtar from '@/assets/icons/avtar.svg'
defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <!--  Into services endpoint, cloudfare images are not working, thats why using static image for now,
       otherwise we can use props to make it reuseable
  -->
  <div class="flex flex-1 items-center gap-2 profile-image">
    <img :src="avtar">
    <span v-if="name">{{ name }}</span>
  </div>
</template>