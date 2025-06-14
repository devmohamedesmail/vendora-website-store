import React from 'react'

function CategoryItem({ category }) {


    return (
        <div  className="bg-white rounded-lg shadow flex flex-col items-center overflow-hidden">
            <img
                src={category.image?.formats?.thumbnail?.url || category.image?.url || "/placeholder.png"}
                alt={category.title}
                className="h-44 w-full object-cover  mb-2 "
            />
            <span className="font-semibold text-gray-700 text-center mb-3">{category.title}</span>
        </div>
    )
}

export default CategoryItem