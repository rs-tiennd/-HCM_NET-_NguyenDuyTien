<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';  
import { useProductStore } from '@/stores/products'; 
  
defineProps({  
  product: {  
    type: Object,  
    required: true,  
  }  
});  
const emit = defineEmits(['submit-product'])  

const submitForm = () => {  
  emit('submit-product', useProductStore);  
};
</script>  
<template>    
    <form @submit.prevent="submitForm" class="mt-3">  
      <div class="mb-3">    
        <label for="title" class="form-label">Title:</label>    
        <input v-model="product.title" type="text" id="title" required class="form-control">    
      </div>    
      <div class="mb-3">    
        <label for="price" class="form-label">Price:</label>    
        <input v-model.number="product.price" type="number" id="price" required class="form-control">    
      </div>    
      <div class="mb-3">    
        <label for="description" class="form-label">Description:</label>    
        <textarea v-model="product.description" id="description" required class="form-control"></textarea>    
      </div>    
      <div class="mb-3">    
        <label for="category" class="form-label">Category:</label>    
        <input v-model="product.category" type="text" id="category" required class="form-control">    
      </div>    
      <div class="mb-3">    
        <label for="image" class="form-label">Image URL:</label>    
        <input v-model="product.image" type="text" id="image" required class="form-control">    
      </div>    
      <button type="submit" class="btn btn-primary">Submit</button>    
    </form>    
  </template>