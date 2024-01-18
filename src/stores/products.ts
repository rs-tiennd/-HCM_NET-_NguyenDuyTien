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
      this.sortOrder = order // Update the sort order  
      // NOTE: The list getter will reactively update the sorted list  
    },  
  },
})
