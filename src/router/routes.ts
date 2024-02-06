import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/HomeView.vue"
import Product from '@/views/ProductView.vue'
import Cart from '@/views/CartView.vue'
import AddProduct from '@/views/AddProductView.vue'
import EditProduct from '@/views/EditProductView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUp.vue'

const routes = [
  { path: '/', component: Home , meta: { requiresAuth: true } }, 
  { path: '/product/:productId', component: Product , meta: { requiresAuth: true } }, 
  { path: '/cart', component: Cart , meta: { requiresAuth: true } }, 
  { path: '/addProduct', component: AddProduct , meta: { requiresAuth: true } }, 
  { path: '/editProduct/:productId', component: EditProduct , meta: { requiresAuth: true } }, 
  { path: '/login', component: LoginView },
  { path: '/SignUp', component: SignUpView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);  
  const isAuthenticated = localStorage.getItem('authToken'); 
  
  if (requiresAuth && !isAuthenticated) {  
    next({ path: '/login' });  
  } else {  
    next();
  }  
});  
export default router
