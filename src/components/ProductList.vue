<script setup lang="ts">  
import { computed , ref} from 'vue'  
import ProductCard from '@/components/ProductCard.vue'  
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'  
import { useProductStore } from '@/stores/products'  
import Sort from '@/components/Sort.vue'

const productStore = useProductStore()  

const loaded = computed(() => productStore.loaded)  
const sortOrder = ref('') 

const sortedProducts = computed(() => {  
  let products = productStore.list  
  if (sortOrder.value) { 
    products = [...products].sort((a, b) => {  
      if (sortOrder.value === 'price-asc') {  
        return a.price - b.price  
      } else if (sortOrder.value === 'price-desc') {  
        return b.price - a.price  
      }  
      return 0  
    })  
  }  
  return products  
})  
  
function handleSortChange(order: string) {  
  sortOrder.value = order  
}  

</script>  
  
<template>    
  <Sort @sort-changed="handleSortChange" class="w-25" />  
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">  
    <ProductCardSkeleton  
      v-for="n in 15"  
      v-show="!loaded"  
      :key="`skeleton-${n}`"  
    />  
    <ProductCard  
      v-for="product in sortedProducts"  
      :key="product.productId"  
      :product="product"  
    />  
  </div>  
</template>  