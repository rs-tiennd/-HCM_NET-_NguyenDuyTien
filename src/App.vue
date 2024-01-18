<script setup lang="ts">
import { computed } from 'vue'
import Nav from './components/Nav.vue'
import { usePersistCart } from './utils/usePersistCart'
import { useCartStore } from './stores/cart'
import { useProductStore } from './stores/products'

const productStore = useProductStore()
const cartStore = useCartStore()

productStore.fetchAll()
usePersistCart()

const count = computed(() => cartStore.count)
</script>

<template>
  <div class="drawer">
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <Nav />
      <router-view />
    </div>

  </div>
</template>
