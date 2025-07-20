import React from 'react'

export default function Product_Gallery({ product, selectedImage, setSelectedImage }: any) {
  return (
    <div className="w-full  flex flex-col items-center">
      <div className="w-full bg-white rounded-xl  p-4 mb-4 flex justify-center">
        <img
          src={
            product.images[selectedImage]?.formats?.medium?.url ||
            product.images[selectedImage]?.url ||
            "/placeholder.png"
          }
          alt={product.title}
          className="rounded-xl object-cover max-h-[400px] w-full bg-red-600"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {product.images.map((img: any, idx: number) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(idx)}
            className={`border-2 rounded-lg p-1 transition ${selectedImage === idx ? "border-main" : "border-transparent"}`}
          >
            <img
              src={img.formats?.thumbnail?.url || img.url}
              alt={`thumb-${idx}`}
              className="h-16 w-16 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
