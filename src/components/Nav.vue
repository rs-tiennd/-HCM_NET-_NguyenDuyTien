<script setup lang="ts">
import { computed } from 'vue'
import Search from './Search.vue'
import { useCartStore } from '@/stores/cart'
import { CART_STORAGE } from '@/utils/usePersistCart'
import { useAuthStore } from '@/stores/auth'; 
import { useRouter } from 'vue-router';  

const cartStore = useCartStore()
const router = useRouter(); 
const count = computed(() => cartStore.count)

function deleteAllCart() {  
  localStorage.removeItem(CART_STORAGE);  
  window.location.reload();
}  

const authStore = useAuthStore(); 

const username = computed(() => authStore.userData?.username || 'Guest'); 

function logout() {  
  authStore.logout();
  router.push('/login'); 
} 
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
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/addProduct">
          <span class="text-lg font-bold">
            Add Product</span>
        </router-link>
        <span class="text-lg font-bold">
          <button @click="deleteAllCart" class="btn-delete-all-cart mt-1"><img src="@/assets/shopping-cart-delete-svgrepo-com.svg" alt="Delete All Cart" class="icon-size"/> </button>  
        </span>
        <p class="text-lg font-bold mt-1 ml-4">  
          Hello, {{ username }}  
        </p>  
      </div>
    </div>
    <div class="flex-1 lg:flex-none mt-4">
      <Search />
    </div>
    <div class="flex-1 lg:flex-none mt-4">
      <button @click="logout" class="btn btn-ghost btn-sm rounded-btn">
        Logout
      </button>
    </div>
  </div>
</template>
  
