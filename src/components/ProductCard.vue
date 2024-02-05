<script setup lang="ts">
import type { Product } from '@/stores/products'
import { toCurrency } from '@/utils/formatNumber'
import { useCartStore } from '@/stores/cart'
defineProps<{
  product: Product
}>()
const cartStore = useCartStore()

</script>

<template>
  <div class="card bordered ">
    <figure class="px-8 pt-10">
      <img
        :src="product.image"
        alt="Card Image"
        class="object-contain w-full h-64"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.productId}`">
          {{ product.title }}
        </router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
    </div>
    <button class="btn btn-primary" @click="cartStore.add(product.productId)">
          Add to Cart
    </button>
  </div>
</template>
