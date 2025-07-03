import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  sale?: number;
  images?: Array<{ url: string }>;
  vendor?: {
    vendor_name: string;
  };
  stock?: number;
  description?: string;
  dateAdded: string;
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  isOpen: boolean;
  lastAdded?: WishlistItem;
}

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'dateAdded'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        const newItem: WishlistItem = {
          ...action.payload,
          dateAdded: new Date().toISOString(),
        };
        state.items.unshift(newItem); // Add to beginning for "recently added" order
        state.lastAdded = newItem;
      }
      
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    toggleWishlistItem: (state, action: PayloadAction<Omit<WishlistItem, 'dateAdded'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        const newItem: WishlistItem = {
          ...action.payload,
          dateAdded: new Date().toISOString(),
        };
        state.items.unshift(newItem);
        state.lastAdded = newItem;
      }
      
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.lastAdded = undefined;
    },

    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    },

    openWishlist: (state) => {
      state.isOpen = true;
    },

    closeWishlist: (state) => {
      state.isOpen = false;
    },

    calculateTotals: (state) => {
      state.totalItems = state.items.length;
    },

    sortWishlist: (state, action: PayloadAction<'dateAdded' | 'title' | 'price' | 'vendor'>) => {
      const sortBy = action.payload;
      
      state.items.sort((a, b) => {
        switch (sortBy) {
          case 'dateAdded':
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
          case 'title':
            return a.title.localeCompare(b.title);
          case 'price':
            const priceA = a.sale || a.price;
            const priceB = b.sale || b.price;
            return priceA - priceB;
          case 'vendor':
            const vendorA = a.vendor?.vendor_name || '';
            const vendorB = b.vendor?.vendor_name || '';
            return vendorA.localeCompare(vendorB);
          default:
            return 0;
        }
      });
    },

    bulkAddToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'dateAdded'>[]>) => {
      const currentTime = new Date().toISOString();
      
      action.payload.forEach(newItem => {
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (!existingItem) {
          const itemWithDate: WishlistItem = {
            ...newItem,
            dateAdded: currentTime,
          };
          state.items.unshift(itemWithDate);
        }
      });
      
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    bulkRemoveFromWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    moveToCart: (state, action: PayloadAction<string>) => {
      // This action just removes from wishlist, the actual cart addition should be handled separately
      state.items = state.items.filter(item => item.id !== action.payload);
      wishlistSlice.caseReducers.calculateTotals(state);
    },

    updateWishlistItem: (state, action: PayloadAction<{ id: string; updates: Partial<WishlistItem> }>) => {
      const { id, updates } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        Object.assign(item, updates);
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  toggleWishlist,
  openWishlist,
  closeWishlist,
  calculateTotals,
  sortWishlist,
  bulkAddToWishlist,
  bulkRemoveFromWishlist,
  moveToCart,
  updateWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: any) => state.wishlist?.items || [];
export const selectWishlistTotalItems = (state: any) => state.wishlist?.totalItems || 0;
export const selectWishlistIsOpen = (state: any) => state.wishlist?.isOpen || false;
export const selectWishlistItemById = (state: any, id: string) => 
  state.wishlist?.items?.find((item: any) => item.id === id);
export const selectIsInWishlist = (state: any, id: string) => 
  state.wishlist?.items?.some((item: any) => item.id === id) || false;
export const selectWishlistLastAdded = (state: any) => state.wishlist?.lastAdded;
export const selectWishlistByVendor = (state: any, vendorName: string) => 
  state.wishlist?.items?.filter((item: any) => item.vendor?.vendor_name === vendorName) || [];
