<script setup lang="ts">
import { computed } from 'vue'
import Search from './Search.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const count = computed(() => cartStore.count)
</script>

<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/">
          <span class="text-lg font-bold">
            Home</span>
        </router-link>
        <router-link class="btn btn-ghost btn-sm rounded-btn d-flex" to="/cart">
          <span class="text-lg font-bold">
            Cart</span>
          <div class="ml-2 text-lg font-bold" v-text="count" />
        </router-link>
      </div>
    </div>
    <div class="flex-1 lg:flex-none">
      <Search />
    </div>
  </div>
</template>