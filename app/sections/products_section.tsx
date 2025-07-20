import React, { useContext } from 'react'
import CustomSectionTitle from '../custom/CustomSectionTitle'
import { DataContext } from '../context/data_context'
import ProductItem from '../items/ProductItem'
import ProductItemSkeleton from '../items/ProductItemSkeleton'
import { useTranslation } from 'react-i18next'

export default function Products_Section() {
  const { products } = useContext(DataContext)
  const { t } = useTranslation();
  return (
    <div className='container m-auto px-4 py-8'>
      <CustomSectionTitle title={t("home.products.title")} description={t("home.products.description")} />
      {products ? (
        <div className="grid grid-cols-2  md:grid-cols-5 lg:grid-cols-6 gap-1">
          {products.map((product: any, index: any) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
          <ProductItemSkeleton />
        </div>
      )}
    </div>
  )
}
