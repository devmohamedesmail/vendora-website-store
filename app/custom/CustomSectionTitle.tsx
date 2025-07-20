
import React from 'react';

type CustomSectionTitleProps = {
  title?: React.ReactNode;
  hotLabel?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
};

function CustomSectionTitle({
  title,
  description,
  hotLabel = 'Hot',
  className = '',
  children,
}: CustomSectionTitleProps = {}) {
  return (
    // <h2 className={`text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3 text-indigo-700 tracking-tight ${className}`}>
    //   <span className="inline-block w-2 h-8 bg-gradient-to-b from-second to-second/80 rounded-full"></span>
    //   <span className="drop-shadow-lg text-second text-sm md:text-md">{title || children}</span>
    //   <span className="ml-2 text-xs px-2 py-1 bg-second/80 text-white rounded-full font-semibold animate-pulse">{hotLabel}</span>
    // </h2>
    <div className='flex flex-col items-center text-center mb-8'>
      <h5 className='text-xl md:text-2xl font-normal mb-2'>{title }</h5>
      <h6 className='text-sm md:text-sm'>{description }</h6>
      <div className='w-10 h-2 bg-gradient-to-b from-main to-main/80 rounded-full mt-3'></div>
     
    </div>
  );
}

export default CustomSectionTitle;