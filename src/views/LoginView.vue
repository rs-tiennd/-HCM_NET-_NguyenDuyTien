  
  <script lang="ts">  
  import { ref } from 'vue';  
  import { useAuthStore } from '@/stores/auth'; // Adjust path as needed  
  import { useRouter } from 'vue-router';  
  export default {  
    setup() {  
      const router = useRouter();  
      const authStore = useAuthStore();  
      const formData = ref({  
        username: 'testadmin@gmail.com',  
        password: 'Abc12345'  
      });  
      const errorMessage = ref(''); 
      const handleLogin = async () => {  
        try {  
          await authStore.login(formData.value.username, formData.value.password);  
          router.push('/'); 
        } catch (error) {  
          if (error instanceof Error) {  
          errorMessage.value = error.message;  
          }  
          else { 
            errorMessage.value = 'An unexpected error occurred';  
          }  
        } 
      };  
    
      return {  
        formData,  
        handleLogin,  
        errorMessage
      };  
    }  
  };  
  </script>  

<template>    
  <div class="container login-container">  
    <h1 class="text-center">Login</h1>    
    <form @submit.prevent="handleLogin">  
      <div class="mb-3">    
        <label for="username" class="form-label">Username:</label>    
        <input  
          id="username"  
          v-model="formData.username"  
          type="text"  
          class="form-control"  
          required  
        />    
      </div>    
      <div class="mb-3">  
        <label for="password" class="form-label">Password:</label>    
        <input  
          id="password"  
          v-model="formData.password"  
          type="password"  
          class="form-control"  
          required  
        />  
      </div>
      <div v-if="errorMessage" class="alert alert-danger">  
        {{ errorMessage }}  
      </div>    
      <button type="submit" class="btn btn-primary w-100">Login</button>        
      <router-link class="link link-hover" :to="`/SignUp`">
            <button class="btn btn-info w-100 mt-2" @click="">
              SignUp
          </button>
       </router-link>
    </form>    
  </div>    
</template>  