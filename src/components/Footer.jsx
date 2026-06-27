import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        {/* Left: logo */}
        <div className="flex items-center">
          <NavLink to="" className="flex items-center">
            <img src={logo} alt="NavbatUZ" className="h-8 w-auto" />
          </NavLink>
        </div>

        {/* Center: links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800">
            Foydalanish shartlari
          </NavLink>
          <NavLink to="" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800">
            Maxfiylik siyosati
          </NavLink>
          <NavLink to="" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800">
            Bog'lanish
          </NavLink>
        </div>

        {/* Right: copyright */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 NavbatUZ. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}

export default Footer
