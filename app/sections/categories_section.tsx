import React, { useContext } from 'react'
import CustomSectionTitle from '../custom/CustomSectionTitle'
import { DataContext } from '../context/data_context'
import CategoryItem from '../items/CategoryItem'
import CategoryItemSkeleton from '../items/CategoryItemSkeleton'
import { useTranslation } from 'react-i18next'

export default function Categories_Section() {
  const { categories }: any = useContext(DataContext)
  const { t } = useTranslation();
  return (
    <div className='container mx-auto px-4 py-8'>
      <CustomSectionTitle title={t("home.categories.title")} description={t("home.categories.description")} />

      {categories ? (
        <div className="grid grid-cols-4 md:grid-cols-8 gap-1 mb-10">
          {categories.map((category: any, index: any) => (
            <CategoryItem
              category={category}
              key={index}

            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-10">
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
          <CategoryItemSkeleton />
        </div>
      )}
    </div>
  )
}
