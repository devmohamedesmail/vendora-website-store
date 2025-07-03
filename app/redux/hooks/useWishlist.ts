import { useAppDispatch, useAppSelector } from '../hooks';
import {
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
  WishlistItem,
} from '../slices/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const items = useAppSelector(selectWishlistItems);
  const totalItems = useAppSelector(selectWishlistTotalItems);
  const isOpen = useAppSelector(selectWishlistIsOpen);
  const lastAdded = useAppSelector(selectWishlistLastAdded);

  // Actions
  const addItem = (item: Omit<WishlistItem, 'dateAdded'>) => {
    dispatch(addToWishlist(item));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const toggleItem = (item: Omit<WishlistItem, 'dateAdded'>) => {
    dispatch(toggleWishlistItem(item));
  };

  const clear = () => {
    dispatch(clearWishlist());
  };

  const toggle = () => {
    dispatch(toggleWishlist());
  };

  const open = () => {
    dispatch(openWishlist());
  };

  const close = () => {
    dispatch(closeWishlist());
  };

  const sort = (sortBy: 'dateAdded' | 'title' | 'price' | 'vendor') => {
    dispatch(sortWishlist(sortBy));
  };

  const addMultipleItems = (items: Omit<WishlistItem, 'dateAdded'>[]) => {
    dispatch(bulkAddToWishlist(items));
  };

  const removeMultipleItems = (ids: string[]) => {
    dispatch(bulkRemoveFromWishlist(ids));
  };

  const moveItemToCart = (id: string) => {
    dispatch(moveToCart(id));
  };

  const updateItem = (id: string, updates: Partial<WishlistItem>) => {
    dispatch(updateWishlistItem({ id, updates }));
  };

  const getItemById = (id: string) => {
    return useAppSelector(state => selectWishlistItemById(state, id));
  };

  const isItemInWishlist = (id: string) => {
    return useAppSelector(state => selectIsInWishlist(state, id));
  };

  const getItemsByVendor = (vendorName: string) => {
    return useAppSelector(state => selectWishlistByVendor(state, vendorName));
  };

  const getRecentlyAdded = (limit: number = 5) => {
    return items
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, limit);
  };

  const getItemsByPriceRange = (minPrice: number, maxPrice: number) => {
    return items.filter(item => {
      const price = item.sale || item.price;
      return price >= minPrice && price <= maxPrice;
    });
  };

  const searchItems = (query: string) => {
    const searchTerm = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.vendor?.vendor_name.toLowerCase().includes(searchTerm)
    );
  };

  const getTotalValue = () => {
    return items.reduce((total, item) => {
      const price = item.sale || item.price;
      return total + price;
    }, 0);
  };

  const getAvailableItems = () => {
    return items.filter(item => !item.stock || item.stock > 0);
  };

  const getUnavailableItems = () => {
    return items.filter(item => item.stock === 0);
  };

  return {
    // State
    items,
    totalItems,
    isOpen,
    lastAdded,
    
    // Actions
    addItem,
    removeItem,
    toggleItem,
    clear,
    toggle,
    open,
    close,
    sort,
    addMultipleItems,
    removeMultipleItems,
    moveItemToCart,
    updateItem,
    
    // Utility functions
    getItemById,
    isItemInWishlist,
    getItemsByVendor,
    getRecentlyAdded,
    getItemsByPriceRange,
    searchItems,
    getTotalValue,
    getAvailableItems,
    getUnavailableItems,
  };
};
