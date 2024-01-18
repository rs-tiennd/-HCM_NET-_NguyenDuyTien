<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from './stores/products'

const productStore = useProductStore()

productStore.fetchAll()

</script>

<template>  
  <div class="drawer">  
    <input id="drawer-input" type="checkbox" class="drawer-toggle">  
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">  
      <router-view />  
    </div>  
    <div class="drawer-side">  
      <label for="drawer-input" class="drawer-overlay"></label>
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">  
        <li>  
          <router-link to="/">  
            Home  
          </router-link>  
        </li>  
      </ul>  
    </div>  
  </div>  
</template> 
