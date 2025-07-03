// Redux store and types
export { store, persistor } from './store';
export type { RootState, AppDispatch } from './store';

// Persistence utilities
export { clearPersistedData, pausePersistence, resumePersistence, flushPersistence } from './persistUtils';

// Redux hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Custom hooks
export { useCart } from './hooks/useCart';
export { useWishlist } from './hooks/useWishlist';

// Redux Provider
export { ReduxProvider } from './ReduxProvider';

// Cart slice
export {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  applyDiscount,
  bulkAddToCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartIsOpen,
  selectCartItemById,
  selectCartItemQuantity,
} from './slices/cartSlice';

export type { CartItem } from './slices/cartSlice';

// Wishlist slice
export {
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  toggleWishlist,
  openWishlist,
  closeWishlist,
  sortWishlist,
  bulkAddToWishlist,
  bulkRemoveFromWishlist,
  moveToCart,
  updateWishlistItem,
  selectWishlistItems,
  selectWishlistTotalItems,
  selectWishlistIsOpen,
  selectWishlistItemById,
  selectIsInWishlist,
  selectWishlistLastAdded,
  selectWishlistByVendor,
} from './slices/wishlistSlice';

export type { WishlistItem } from './slices/wishlistSlice';
