import { useAppDispatch, useAppSelector } from '../hooks';
import {
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
  CartItem,
} from '../slices/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const isOpen = useAppSelector(selectCartIsOpen);

  // Actions
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch(addToCart(item));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const increaseItemQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseItemQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const toggle = () => {
    dispatch(toggleCart());
  };

  const open = () => {
    dispatch(openCart());
  };

  const close = () => {
    dispatch(closeCart());
  };

  const addDiscount = (code: string, discount: number) => {
    dispatch(applyDiscount({ code, discount }));
  };

  const addMultipleItems = (items: CartItem[]) => {
    dispatch(bulkAddToCart(items));
  };

  const getItemById = (id: string) => {
    return useAppSelector(state => selectCartItemById(state, id));
  };

  const getItemQuantity = (id: string) => {
    return useAppSelector(state => selectCartItemQuantity(state, id));
  };

  const isItemInCart = (id: string) => {
    return items.some(item => item.id === id);
  };

  const getCartSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.sale || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueItemsCount = () => {
    return items.length;
  };

  return {
    // State
    items,
    totalItems,
    totalPrice,
    isOpen,
    
    // Actions
    addItem,
    removeItem,
    updateItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    clear,
    toggle,
    open,
    close,
    addDiscount,
    addMultipleItems,
    
    // Utility functions
    getItemById,
    getItemQuantity,
    isItemInCart,
    getCartSubtotal,
    getCartItemsCount,
    getUniqueItemsCount,
  };
};
