<script lang="ts">  
import { ref } from 'vue';  
import { useAuthStore } from '@/stores/auth'; 
export default {  
  setup() {  
    const authStore = useAuthStore();  
    const email = ref(''); 
    const password = ref(''); 
    const errorMessage = ref(''); 
    
    const register = async () => {  
    try {  
        errorMessage.value = '';  
        await authStore.signup(email.value, password.value);  
    } catch (err: unknown) {  
        if (err instanceof Error) {  
        errorMessage.value = err.message;   
        } else {  
        errorMessage.value = 'Đã xảy ra lỗi không xác định.';  
        }  
    }  
    };   

    return {  
      email,  
      password,  
      errorMessage,  
      register,  
    };  
  },  
};  
</script> 

<template>    
    <div class="signup-container container"> 
      <h1>Đăng Ký</h1>    
      <form @submit.prevent="register">    
        <div class="mb-3"> 
          <label for="email" class="form-label">Email:</label>    
          <input id="email" type="email" v-model="email" class="form-control" required>    
        </div>    
        <div class="mb-3">  
          <label for="password" class="form-label">Mật Khẩu:</label>    
          <input id="password" type="password" v-model="password" class="form-control" required minlength="6">    
        </div>    
        <div class="d-grid gap-2">  
          <button type="submit" class="btn btn-primary">Đăng Ký</button>    
        </div>    
        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>    
      </form>    
    </div>    
</template> 