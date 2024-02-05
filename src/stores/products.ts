import { defineStore } from 'pinia'
import {  
  getFirestore,  
  collection,  
  getDocs,  
  doc,  
  addDoc,  
  updateDoc,  
  deleteDoc  
} from 'firebase/firestore'; 

import { db } from '../firebase'; 

export interface Product {
  productId: string
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface ProductState {
  items: Record<string, Product>
  ids: string[]
  sortOrder: string
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({  
    items: {},  
    ids: [],  
    sortOrder: 'default',
  }),

  getters: {
    list(state: ProductState): Product[] {
      if (state.sortOrder === 'price-asc') {  
        return [...state.ids].sort((a, b) => state.items[a].price - state.items[b].price).map(id => state.items[id]);  
      } else if (state.sortOrder === 'price-desc') {  
        return [...state.ids].sort((a, b) => state.items[b].price - state.items[a].price).map(id => state.items[id]);  
      }  
      // Add other sorting logic if needed  
      return state.ids.map(id => state.items[id]); 
    },

    loaded(): boolean {
      return this.ids.length > 0
    },
  },

  actions: {  
    async fetchAll() {  
      if (this.loaded) return;  
  
      try {  
        const querySnapshot = await getDocs(collection(db, 'Products'));  
        querySnapshot.forEach((docSnapshot) => {  
          const data = docSnapshot.data() as Omit<Product, 'productId'>;  
          const product = {  
            productId: docSnapshot.id,  
            ...data,  
          }; 
          this.items[docSnapshot.id] = product;    
          this.ids.push(docSnapshot.id);  
        });  
      } catch (error) {  
        console.error('Failed to fetch products: ', error);  
      }  
    },setSortOrder(order: string) {  
      this.sortOrder = order;  
    },   
    async addProduct(productData: Omit<Product, 'productId'>) {  
      try {  
        const docRef = await addDoc(collection(db, 'Products'), productData);  
        const newProduct = {
          productId: docRef.id,
          ...productData
        } as unknown as Product;  
        this.ids.push(newProduct.productId);  
        this.items[newProduct.productId] = newProduct;  
      } catch (error) {  
        console.error('Failed to add the product: ', error);  
      }  
    },  
    async updateProduct(product: Product) {  
      try {  
        const productRef = doc(db, 'Products', product.productId);  
        await updateDoc(productRef, { ...product });   
  
        this.items[product.productId] = product;  
      } catch (error) {  
        console.error('Failed to update the product: ', error);  
      }  
    },    
    async deleteProduct(productId: string) {  
      try {  
        const productRef = doc(db, 'Products', productId);  
        await deleteDoc(productRef);  
  
        this.ids = this.ids.filter(id => id !== productId);  
        delete this.items[productId];  
      } catch (error) {  
        console.error('Failed to delete the product: ', error);  
      }  
    },  
  },
})
