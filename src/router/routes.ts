import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/HomeView.vue"
import Product from '@/views/ProductView.vue'
import Cart from '@/views/CartView.vue'
import AddProduct from '@/views/AddProductView.vue'
import EditProduct from '@/views/EditProductView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:productId', component: Product },
  { path: '/cart', component: Cart },
  { path: '/addProduct', component: AddProduct },
  { path: '/editProduct/:productId', component: EditProduct }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
