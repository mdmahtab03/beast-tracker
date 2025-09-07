'use client'
import React from 'react'

const Footer = () => {
  return (
    <footer className=' w-full border-t border-gray-500 text-white'>
        <p className='text-center font-thin text-sm'>{ new Date().getFullYear()}.{" "}By Mahtab Alam</p>
    </footer>
  )
}

export default Footer
