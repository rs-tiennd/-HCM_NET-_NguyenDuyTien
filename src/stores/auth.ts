import { defineStore } from 'pinia';  
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';  
  
interface User {  
  username: string;  
}  
  
export const useAuthStore = defineStore('auth', {  
  state: () => ({  
    isAuthenticated: false,  
    userData: null as User | null,  
    authToken: '',  
  }),  
   
  actions: {  
    async login(email: string, password: string) {  
      const auth = getAuth();  
      try {  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);  
        this.isAuthenticated = true;  
        this.userData = { username: userCredential.user.email ?? ''};  
        this.authToken = await userCredential.user.getIdToken();  
        localStorage.setItem('authToken', this.authToken);  
      } catch (error) {  
        this.isAuthenticated = false;  
        this.userData = null;  
        this.authToken = '';  
        localStorage.removeItem('authToken');  
        throw error;  
      }  
    }, async signup(email: string, password: string) {    
      const auth = getAuth();    
      try {    
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);    
        this.isAuthenticated = true;    
        this.userData = { username: userCredential.user.email ?? '' };    
        this.authToken = await userCredential.user.getIdToken();    
        localStorage.setItem('authToken', this.authToken); 
      } catch (error) {    
        this.isAuthenticated = false;    
        this.userData = null;    
        this.authToken = '';    
        localStorage.removeItem('authToken');    
        throw error;    
      }    
    },    
    async logout() {  
      const auth = getAuth();  
      try {  
        await signOut(auth);  
        this.isAuthenticated = false;  
        this.userData = null;  
        this.authToken = '';  
        localStorage.removeItem('authToken');  
      } catch (error) {  
        console.error('Failed to log out: ', error);  
      }  
    },  
  },  
});  