"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Header() {
  const path = usePathname();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-800 to-blue-700 shadow-xl shadow-blue-600/50 text-white animate-slide-down">
      <div className="flex items-center gap-4">
        <Image src="/logoipsum-363.svg" alt="logo" width={50} height={50} className="hover:rotate-6 transition-transform duration-300" />
        <span className="text-2xl font-extrabold tracking-wide hover:text-blue-300 transition">Mock-IQ</span>
      </div>

      <div className="hidden md:flex gap-6 text-lg">
        <Link href="/dashboard">
          <span
            className={`px-3 py-1 rounded transition-all duration-300 cursor-pointer ${
              path === '/dashboard'
                ? 'text-cyan-300 font-semibold'
                : 'hover:text-blue-300'
            }`}
          >
            Dashboard
          </span>
        </Link>
        <Link href="/dashboard/how">
          <span
            className={`px-3 py-1 rounded transition-all duration-300 cursor-pointer ${
              path === '/dashboard/how'
                ? 'text-cyan-300 font-semibold'
                : 'hover:text-blue-300'
            }`}
          >
            How it works?
          </span>
        </Link>
      </div>

      <UserButton afterSignOutUrl='/' />
    </nav>
  );
}

export default Header
