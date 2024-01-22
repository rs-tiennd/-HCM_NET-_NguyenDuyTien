  <script setup lang="ts">
  import { ref } from 'vue';  
  import { useProductStore } from '@/stores/products'; // Adjust this path as needed  
  import ProductAdd from '@/components/ProductAdd.vue';
  import { useRouter } from 'vue-router'
  
  const router = useRouter()

  const productStore = useProductStore();  
    
  const newProduct = ref({  
    title: '',  
    price: 0,  
    description: '',  
    category: '',  
    image: '',  
  });  
    
  const addNewProduct = async () => {  
    try {  
      await productStore.addProduct({ ...newProduct.value });  
      newProduct.value = {  
        title: '',  
        price: 0,  
        description: '',  
        category: '',  
        image: '',  
      };  
      // Notify user of success  
      alert('Product added successfully!');  
      router.push('/');
    } catch (error) {  
      // Notify user of failure  
      alert(`Failed to add product`);  
    }  
  };  
  </script>  

<template>  
    <div class="add-product-page">  
      <h1>Add New Product</h1>  
      <ProductAdd  
        :product="newProduct"  
        @submit-product="addNewProduct"  
      />  
    </div>  
  </template>  
