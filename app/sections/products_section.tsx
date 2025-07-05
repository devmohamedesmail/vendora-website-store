import React , { useContext } from 'react'
import CustomSectionTitle from '../custom/CustomSectionTitle'
import { DataContext } from '../context/data_context'
import ProductItem from '../items/ProductItem'
import ProductItemSkeleton from '../items/ProductItemSkeleton'

export default function Products_Section() {
    const { products } = useContext(DataContext)
  return (
    <div className='container m-auto px-4 py-8'>
        <CustomSectionTitle title={"New Arrivals"} />
         {products ? (
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product:any, index:any) => (
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
