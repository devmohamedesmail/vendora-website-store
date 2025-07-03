import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  sale?: number;
  quantity: number;
  images?: Array<{ url: string }>;
  vendor?: {
    vendor_name: string;
  };
  stock?: number;
  maxQuantity?: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Check if we can increase quantity
        const maxQty = action.payload.maxQuantity || action.payload.stock || 999;
        if (existingItem.quantity < maxQty) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        const maxQty = item.maxQuantity || item.stock || 999;
        item.quantity = Math.max(1, Math.min(quantity, maxQty));
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        const maxQty = item.maxQuantity || item.stock || 999;
        if (item.quantity < maxQty) {
          item.quantity += 1;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(cartItem => cartItem.id !== action.payload);
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => {
        const price = item.sale || item.price;
        return total + (price * item.quantity);
      }, 0);
    },

    applyDiscount: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      // Apply discount logic - this could be enhanced based on your business logic
      const discountAmount = (state.totalPrice * action.payload.discount) / 100;
      state.totalPrice = Math.max(0, state.totalPrice - discountAmount);
    },

    bulkAddToCart: (state, action: PayloadAction<CartItem[]>) => {
      action.payload.forEach(newItem => {
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (existingItem) {
          const maxQty = newItem.maxQuantity || newItem.stock || 999;
          existingItem.quantity = Math.min(existingItem.quantity + newItem.quantity, maxQty);
        } else {
          state.items.push(newItem);
        }
      });
      
      cartSlice.caseReducers.calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  calculateTotals,
  applyDiscount,
  bulkAddToCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartItemById = (state: { cart: CartState }, id: string) => 
  state.cart.items.find(item => item.id === id);
export const selectCartItemQuantity = (state: { cart: CartState }, id: string) => 
  state.cart.items.find(item => item.id === id)?.quantity || 0;
