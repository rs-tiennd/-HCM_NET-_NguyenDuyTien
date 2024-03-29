<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'; 
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import type { Product } from '@/stores/products'
import { toCurrency } from '@/utils/formatNumber'
import ConfirmationModal from '@/components/ConfirmationModal.vue';  
import CartCardSkeleton from '@/components/CartCardSkeleton.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const promptDeleteProduct = () => {  
  showDeleteModal.value = true;  
};  
  
const deleteProduct = async () => {  
  if (product.value) {  
    await productStore.deleteProduct(product.value.productId);  
  }  
};  
  
const handleModalClose = () => {  
  showDeleteModal.value = false;  
}; 
const route = useRoute()
const showDeleteModal = ref(false); 
const product = computed<Product>(
  () => productStore.items[route.params.productId as string],
)
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="card lg:card-side bordered">
      <figure class="px-10 pt-10">
        <img
          :src="product.image"
          alt="Card Image"
          class="object-contain w-full h-64"
        >
      </figure>
      <div class="card-body">
        <h2 class="card-title" v-text="product.title" />
        <p v-text="product.description" />
        <p class="mt-4 text-lg">
          {{ toCurrency(product.price) }}
        </p>
        <div class="card-actions">
          <button class="btn btn-primary" @click="cartStore.add(product.productId)">
            Add to Cart
          </button>
          <button class="btn btn-primary" @click="promptDeleteProduct">  
            Delete product  
          </button>  
          <router-link class="link link-hover" :to="`/editProduct/${product.productId}`">
            <button class="btn btn-primary" @click="">
            Edit product
          </button>
        </router-link>
        </div>
      </div>
      <ConfirmationModal  
      :show-modal="showDeleteModal"  
      title="Confirm Delete"  
      message="Are you sure you want to delete this product?"  
      @confirm="deleteProduct"  
      @update:show="handleModalClose"  
    />  
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>
