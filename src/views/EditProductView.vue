<script setup lang="ts">  
import { useProductStore } from '@/stores/products';
import { useRoute,useRouter } from 'vue-router'
import { computed } from 'vue'
import type { Product } from '@/stores/products'
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { ref } from 'vue';

const showModal = ref(false);  
  
const openModal = () => {  
  showModal.value = true;  
};  
const productStore = useProductStore()

const route = useRoute()
const router = useRouter();

const product = computed<Product>(
  () => productStore.items[route.params.productId as string],
)

const localProduct = ref({ ...product.value } as Product);  

const handleModalClose = () => {  
  showModal.value = false;  
}; 
const productId = route.params.productId as string;  

const updateProducts = async () => {  
  if (!product.value) {  
    console.log('No product to update');  
    return;  
  }  
  
  // Call store action to update the product  
  await productStore.updateProduct(localProduct .value);
  showModal.value = false;
  router.push('/product/' + productId); 

};  
</script>  

<template>  
  <div class="edit-product-page" v-if="localProduct">  
    <div class="container">  
      <h1 class="my-4">Edit Product</h1>      
        <div class="mb-3">  
          <label for="title" class="form-label">Title:</label>  
          <input type="text" class="form-control" id="title" v-model="localProduct.title">  
        </div>           
        <div class="mb-3">  
          <label for="price" class="form-label">Price:</label>  
          <input type="number" inputmode="decimal" class="form-control" id="price" v-model.number="localProduct.price">  
        </div>  
  
        <div class="mb-3">  
          <label for="description" class="form-label">Description:</label>  
          <textarea class="form-control" id="description" v-model="localProduct.description" rows="3"></textarea>  
        </div>  
  
        <div class="mb-3">  
          <label for="category" class="form-label">Category:</label>  
          <input type="text" class="form-control" id="category" v-model="localProduct.category">  
        </div>  
  
        <div class="mb-4">  
          <label for="image" class="form-label">Image URL:</label>  
          <input type="text" class="form-control" id="image" v-model="localProduct.image">  
        </div>  
  
        <button type="button" @click="openModal" class="btn btn-primary">Update Product</button>
    </div>  
  </div>  
  <div class="container text-center" v-else>  
    <p class="my-4">Loading product...</p>  
  </div>  
  <ConfirmationModal  
      :show-modal="showModal"  
      title="Confirm Update"  
      message="Are you sure you want to update this product?"  
      @confirm="updateProducts"  
      @update:show="handleModalClose" 
    ></ConfirmationModal>  
</template>  
