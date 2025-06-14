import React from 'react'

function CustomSectionTitle({title}) {
  return (
     <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3 text-indigo-700 tracking-tight">
          <span className="inline-block w-2 h-8 bg-gradient-to-b from-indigo-400 to-indigo-700 rounded-full"></span>
          <span className="drop-shadow-lg">{title}</span>
          <span className="ml-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold animate-pulse">Hot</span>
        </h2>
  )
}

export default CustomSectionTitle