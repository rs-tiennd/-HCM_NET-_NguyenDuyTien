<template>  
    <div class="sort-container">  
      <select @change="onSortChange" class="form-select form-select-sm mb-3">  
        <option value="">Default</option>  
        <option value="price-asc">Price Low to High</option>  
        <option value="price-desc">Price High to Low</option> 
      </select>  
    </div>  
  </template>  
    
  <script setup lang="ts">  
  import { ref } from 'vue'  
  import { defineEmits } from 'vue'  
    
  const selectedSort = ref('')  
  const emit = defineEmits(['sort-changed'])  
    
  function onSortChange(event: Event) {  
    const target = event.target as HTMLSelectElement // Cast the event target to HTMLSelectElement  
    const sortValue = target.value  
    selectedSort.value = sortValue  
    
    // Emit event to parent component with the selected sort value  
    emit('sort-changed', sortValue)  
  }  
  </script>  