<template>  
  <button @click="handleLogout">Logout</button>  
</template>  
  
<script lang="ts">  
import { useAuthStore } from '@/stores/auth';
  
export default {  
  setup() {  
    const authStore = useAuthStore();  
  
    const handleLogout = () => {  
      authStore.logout();  
      
    };  
  
    return {  
      handleLogout  
    };  
  }  
};  
</script>  