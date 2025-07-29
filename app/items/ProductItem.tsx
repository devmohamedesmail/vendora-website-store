import React from 'react'
import { config } from '../config/api'
import Link from 'next/link'
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiMail } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { getLimitedWords } from '../ultilites/ultitites'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addToCart } from '../redux/slices/cartSlice'
import { toggleWishlistItem, selectIsInWishlist } from '../redux/slices/wishlistSlice'
import { toast } from 'react-toastify'
import { IoIosNotificationsOutline } from "react-icons/io";
import CustomInput from '../custom/custom_input'


function ProductItem({ product, viewMode = 'grid' }: any) {
  const isListView = viewMode === 'list';
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) => selectIsInWishlist(state, product.id));

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        sale: product.sale,
        images: product.images,
        vendor: product.vendor,
        stock: product.stock,
        maxQuantity: product.maxQuantity || product.stock
      }));
      toast.success(t('productDetails.addedToCart'));
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistItem({
      id: product.id,
      title: product.title,
      price: product.price,
      sale: product.sale,
      images: product.images,
      vendor: product.vendor,
      stock: product.stock,
      description: product.description
    }));
    toast.success(t('productDetails.addedToWishlist'));
  };






  const variantPrices = product?.product_variants?.map((variant: any) => variant.price) || [];
  const minPrice = variantPrices.length ? Math.min(...variantPrices) : null;
  const maxPrice = variantPrices.length ? Math.max(...variantPrices) : null;





  return (
    <div
      key={product.id}
      className={`bg-white rounded-xl  hover:shadow-2xl transition-all duration-300 border border-gray-100 group ${isListView ? 'flex flex-row' : 'flex flex-col'
        }`}
    >
      {/* Image Section */}
      <div className={`${isListView ? 'w-48 h-48' : 'h-48 w-full'} relative overflow-hidden ${isListView ? 'rounded-l-xl' : 'rounded-t-xl'} bg-gray-50 flex items-center justify-center`}>
        <Link href={`/front/product/${product.id}`}>
          <img
            src={product?.images?.[0]?.url || '/placeholder.png'}
            alt={product.title}
            className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <Link
            href={`/front/product/${product.id}`}
            className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Stock Badge */}
       

        {product.isSimple === true ? ( <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
            }`}>
            {product.stock > 0 ? t('productDetails.inStock') : t('productDetails.outOfStock')}
          </span>
        </div>):(<></>)}

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`p-2 flex flex-col flex-1 ${isListView ? 'justify-between' : ''}`}>
        <div>
          <Link href={`/front/product/${product.id}`}>
            <h3 className="text-sm md:text-sm mb-2 text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
              {getLimitedWords(product.title, 5)}
            </h3>
          </Link>


        </div>

        {/* Price and Actions */}
        <div className="mt-auto">
          <div className={`flex flex-col items-center justify-between ${isListView ? 'mb-3' : 'mb-2'}`}>


            {/* {product.sale ? (
              <div className="flex items-center  w-full">
                <p className='text-second font-bold text-md  mx-2'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                <p className='line-through text-red-600 font-bold text-xs mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>

              </div>
            ) : (
              <div className="flex items-center w-full">
                <p className='text-second font-extrabold text-md  mx-2'>{product.price}  {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
              </div>
            )} */}

            {product.isSimple ? (<>
              {product.sale ? (
                <div className="flex items-center  w-full">
                  <p className='text-second font-bold text-md  mx-2'>{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                  <p className='line-through text-red-600 font-bold text-xs mx-2'>{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>

                </div>
              ) : (
                <div className="flex items-center w-full">
                  <p className='text-second font-extrabold text-md  mx-2'>{product.price}  {i18n.language === 'en' ? config.currency_en : config.currency_ar}</p>
                </div>
              )}</>) : (
              <>
                {product.product_variants && product.product_variants.length > 0 ? (<>

                  <div className="flex items-center w-full">
                    <p className="text-second font-extrabold text-md mx-2">
                      {minPrice === maxPrice
                        ? `${minPrice} ${i18n.language === 'en' ? config.currency_en : config.currency_ar}`
                        : `${minPrice} - ${maxPrice} ${i18n.language === 'en' ? config.currency_en : config.currency_ar}`}
                    </p>
                  </div>
                </>) : null}
              </>)}




            {isListView && (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-main text-white rounded-lg hover:bg-secondtransition-colors flex items-center space-x-2"
                disabled={product.stock === 0}
              >
                <FiShoppingCart className="w-4 h-4" />
                <span className='text-sm font-semibold'>{t('productDetails.addToCart')}</span>
              </button>
            )}



          </div>

          {product.isSimple ? (<> 
          
          <button
                onClick={product.stock === 0 ? () => (document.getElementById(`notify_modal_${product.id}`) as HTMLDialogElement)?.showModal() : handleAddToCart}
                className="w-full py-2 bg-main text-white rounded-lg hover:bg-second transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={false}
              >
                {/* <IoIosNotificationsOutline className="w-4 h-4" /> */}
                {product.stock === 0 ? <IoIosNotificationsOutline className="w-4 h-4" /> : <FiShoppingCart className="w-4 h-4" />}
                <span className='text-sm'>{product.stock === 0 ? t('productDetails.notifyme') : t('productDetails.addToCart')}</span>
              </button>
          </>):(<>
          
          
          <Link  href={`/front/product/${product.id}`} className='w-full py-2 bg-main text-white rounded-lg hover:bg-second transition-colors flex items-center justify-center space-x-2'>
             
             <FiShoppingCart className="w-4 h-4 mx-2" />
             {t('productDetails.selectOption')}
          
          </Link>
          
          </>)}

          {/* {!isListView && (
            <>
              <button
                onClick={product.stock === 0 ? () => (document.getElementById(`notify_modal_${product.id}`) as HTMLDialogElement)?.showModal() : handleAddToCart}
                className="w-full py-2 bg-main text-white rounded-lg hover:bg-second transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={false}
              >
   
                {product.stock === 0 ? <IoIosNotificationsOutline className="w-4 h-4" /> : <FiShoppingCart className="w-4 h-4" />}
                <span className='text-sm'>{product.stock === 0 ? t('productDetails.notifyme') : t('productDetails.addToCart')}</span>
              </button>

              
              <dialog id={`notify_modal_${product.id}`} className="modal">
                <div className="modal-box max-w-md mx-auto bg-white rounded-2xl shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <IoIosNotificationsOutline className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{t('productDetails.notifyTitle') || 'Get Notified'}</h3>
                      <p className="text-sm text-gray-500">{t('productDetails.notifySubtitle') || 'We\'ll email you when this item is back in stock'}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={product?.images?.[0]?.url || '/placeholder.png'}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm line-clamp-2">{product.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.sale ? (
                            <span className="text-blue-600 font-semibold">{product.sale} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                          ) : (
                            <span className="text-blue-600 font-semibold">{product.price} {i18n.language === 'en' ? config.currency_en : config.currency_ar}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('productDetails.emailLabel') || 'Email Address'}
                        </label>

                        <CustomInput type='email' placeholder={t('productDetails.emailPlaceholder')} icon={FiMail} />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="button"
                          className="flex-1 px-4 py-3 bg-main text-white rounded-lg hover:bg-second transition-colors font-medium"
                        >
                          {t('productDetails.notifyMe') || 'Notify Me'}
                        </button>
                        <button
                          type="button"
                          onClick={() => (document.getElementById(`notify_modal_${product.id}`) as HTMLDialogElement)?.close()}
                          className="px-4 py-3 border border-gray-300 text-gray-700  rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          {t('common.cancel') || 'Cancel'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      {t('productDetails.privacyNotice') || 'We respect your privacy. No spam, just stock notifications.'}
                    </p>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default ProductItem