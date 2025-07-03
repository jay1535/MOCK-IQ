"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Header() {
  const path = usePathname();

  return (
    <div className='flex justify-between items-center p-3 rounded-2xl my-1 bg-gray-800 shadow-blue-400 shadow-lg text-white'>
      <Image src="/logoipsum-363.svg" alt="logo" width={50} height={50} />
      <ul className='hidden md:flex gap-8'>
        <Link href="/dashboard">
          <li
            className={`select-none focus:outline-none hover:text-blue-700 hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${
              path === '/dashboard' && 'text-cyan-500 font-bold text-lg'
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/dashboard/how">
          <li
            className={`select-none focus:outline-none hover:text-blue-700 hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${
              path === '/dashboard/how' && 'text-cyan-500 font-bold text-lg'
            }`}
          >
            How it works?
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
