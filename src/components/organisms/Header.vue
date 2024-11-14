<script lang="ts" setup>

// IMPORTS
import { ref, watch } from 'vue'
defineOptions(
  { name: 'MainHeader' },
)
import HeaderLink from '@/components/molecules/Link.vue'
import Drawer from '@/components/molecules/Header/Drawer.vue'
import type { Link } from '@/types'
import organization from '@/assets/icons/organization.svg'
import user from '@/assets/icons/user.svg'
import settings from '@/assets/icons/settings.svg'
import hamburgIcon from '@/assets/icons/hamburg.svg'
import closeIcon from '@/assets/icons/close.svg'
import { useRoute } from 'vue-router'

// STATES
const links: Link[] = [
  {
    icon: organization,
    text: 'Organization',
    navigateTo: '/',
  },
  {
    icon: settings,
    text: 'Settings',
    navigateTo: '/',
  },
]
const userProfile: Link = {
  icon: user,
  text: 'Katherine Ellis',
  navigateTo: '/',
}
const route = useRoute()
const isMenuOpen = ref(false)

watch(() => route.query, () => {
  isMenuOpen.value = false
})

// METHODS
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
<template>
  <div class="header w-full bg-header-bg fixed left-0 right-0 z-20 ease-in-out duration-300">
    <div class="container mx-auto">
      <div
        class="flex xl:items-center justify-between max-xl:flex-col"
      >
        <!-- Logo -->
        <div class="flex justify-between items-center max-xl:pt-5 max-xl:pr-5 max-xl:pb-4">
          <router-link to="/?page=1">
            <div class="bg-logo bg-no-repeat w-40 h-[25px]" />
          </router-link>
          <button
            class="xl:hidden"
            @click="toggleMenu"
          >
            <img
              class="w-7 h-7 relative"
              :src="isMenuOpen ? closeIcon : hamburgIcon"
            >
          </button>
        </div>

        <!-- Mobile navigation -->
        <Transition name="slide-right">
          <Drawer
            v-if="isMenuOpen"
            :links="links"
            :user-profile="userProfile"
          />
        </Transition>

        <!-- Desktiop navigation -->
        <div
          class="hidden xl:flex gap-8 items-center"
        >
          <div class="flex gap-2">
            <HeaderLink
              v-for="{ icon, text, navigateTo }, index in links"
              :key="index"
              v-bind="{
                icon,
                text,
                navigateTo,
                color: 'white'
              }"
            />
          </div>
          <!-- User profile -->
          <div class="h-full flex bg-active">
            <HeaderLink
              v-bind="{
                icon: userProfile.icon,
                text: userProfile.text,
                navigateTo: userProfile.navigateTo
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>