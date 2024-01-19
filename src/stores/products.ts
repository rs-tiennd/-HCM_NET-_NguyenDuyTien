import { defineStore } from 'pinia'

const fakeStoreUrl = 'https://fakestoreapi.com'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface ProductState {
  items: Record<string, Product>
  ids: number[]
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
      if (this.loaded)
        return

      const res = await fetch(`${fakeStoreUrl}/products`)
      const data: Product[] = await res.json()
      this.ids = data.map((product) => {
        this.items[product.id] = product
        return product.id
      })
    },

    setSortOrder(order: string) {  
      this.sortOrder = order
    },

    async addProduct(productType: any) {  
      try {  
        const res = await fetch(`${fakeStoreUrl}/products`, {  
          method: 'POST',  
          headers: {  
            'Content-Type': 'application/json',  
          },  
          body: JSON.stringify(productType), 
        });  
    
        if (!res.ok) throw new Error('Error adding product');  
    
        const newProduct = await res.json();  
   

        this.ids.push(newProduct.id);  
        this.items[newProduct.id] = newProduct;  
  
   
      } catch (error) {  
        console.error('Failed to add the product: ', error);  
      }  
    },  

    async updateProduct(product: Product) {  
      try {  
        const res = await fetch(`${fakeStoreUrl}/products/${product.id}`, {  
          method: "PUT",  
          headers: {  
            'Content-Type': 'application/json',  
          },  
          body: JSON.stringify(product),  
        });  
      
        if (!res.ok) throw new Error('Error updating product');  
      
        const updatedProduct: Product = await res.json();  
    
        if (this.ids.includes(updatedProduct.id)) {  
          this.items[updatedProduct.id] = updatedProduct;  
        }  
      } catch (error) {  
        console.error('Failed to update the product: ', error);  
      }  
    }, 

    async deleteProduct(productId: number) {  
      try {  
        const res = await fetch(`${fakeStoreUrl}/products/${productId}`, {  
          method: "DELETE",  
        });  
      
        if (!res.ok) throw new Error('Error deleting product');  
    
        if (this.ids.includes(productId)) {  
          delete this.items[productId];  
          this.ids = this.ids.filter(id => id !== productId);  
        }  
      } catch (error) {  
        console.error('Failed to delete the product: ', error);  
      }  
    },  
  },
})
