import React from 'react'

export default function Custom_button({ title , onClick }) {
  return (
    <button type='submit' className='btn btn-neutral w-full' onClick={onClick}>{title}</button>
  )
}
