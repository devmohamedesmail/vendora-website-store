import React from 'react'

function CategoryItemSkeleton() {
    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 m-auto w-28"></div>
           
        </div>
    )
}

export default CategoryItemSkeleton