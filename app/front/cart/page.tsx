'use client'
import React, { useContext } from 'react'
import { useCart } from '../../redux/hooks/useCart';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { config } from '../../config/api';
import Cart_Item from '../../items/cart_item';
import Cart_Items_Cart_Page from '../../components/user_components/cart_items_cart_page';
import Order_Summery_Cart_Page from '../../components/user_components/order_summery_cart_page';
import { DataContext } from '../../context/data_context';

import Related_Products_Cart_Page from '../../components/user_components/related_products_cart_page';

function Cart() {
  const { t , i18n } = useTranslation();
  const { products } = useContext(DataContext);
  const {
    items: cartItems,
    totalPrice: total,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clear
  } = useCart();

 console.log('Cart Items:', cartItems);

  const handleClearCart = () => {
    clear();
  };

  // Get related products (excluding items already in cart)
  const cartProductIds = cartItems.map((item:any) => item.id);
  const relatedProducts = products?.filter((product:any) => !cartProductIds.includes(product.id)).slice(0, 8) || [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        
         

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            {/* Cart Items Section */}
            
             <Cart_Items_Cart_Page 
              cartItems={cartItems} 
              handleClearCart={handleClearCart} 
              t={t} 
              i18n={i18n} 
              removeItem={removeItem} 
              increaseItemQuantity={increaseItemQuantity} 
              decreaseItemQuantity={decreaseItemQuantity}
              config={config}
              />
            {/* Order Summary Sidebar */}
            {cartItems.length > 0 && (
             <Order_Summery_Cart_Page cartItems={cartItems} total={total} t={t} i18n={i18n} config={config} />
            )}
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
          <Related_Products_Cart_Page relatedProducts={relatedProducts} t={t} i18n={i18n} config={config} />
          )}
        </div>
      </div>
    </>
  )
}

export default Cart