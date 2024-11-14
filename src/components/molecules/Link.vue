<script lang="ts" setup>
defineOptions(
  { name: 'HeaderLink' },
)

// PROPS
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: 'Link Text',
  },
  color: {
    type: String,
    default: 'white',
  },
  navigateTo: {
    type: String,
    default: '/',
  },
})
// STATES
const linkColors = {
  'white': 'text-white',
  'blue': 'text-blue',
}[props.color]

</script>
<template>
  <!-- Link -->
  <router-link
    :class="['flex gap-3 items-center leading-normal p-5 capitalize', linkColors]"
    :to="navigateTo"
  >
    <img :src="icon">
    <span class="text-15">{{ text }}</span>
  </router-link>
</template>