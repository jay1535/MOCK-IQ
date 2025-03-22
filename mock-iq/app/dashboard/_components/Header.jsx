
"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'

function Header() {
    const path = usePathname();
  useEffect(()=>{
    console.log(path);
  },[])

  return (
    <div className='flex justify-between items-center p-3  rounded-2xl my-1 bg-secondary shadow-blue-400 shadow-lg text-white'>
      <Image src="/logoipsum-363.svg" alt="logo" width={60} height={60} />
      <ul className='hidden  md:flex  gap-8'>
        <li className={`select-none focus:outline-none hover:text-blue-700  hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-cyan-500 font-bold  text-lg'} `}>Dashboard</li>
        <li className={`select-none focus:outline-none hover:text-blue-700  hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&&'text-cyan-500  font-bold text-lg'} `}>Questions</li>
        <li className={`select-none focus:outline-none hover:text-blue-700  hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-cyan-500  font-bold text-lg'} `}>Upgrade</li>
        <li className={`select-none focus:outline-none hover:text-blue-700  hover:drop-shadow-[0_0_10px_rgb(59,130,246)] hover:text-lg font-bold transition-all cursor-pointer ${path=='/dashboard/how'&&'text-cyan-500  font-bold text-lg'}`}>How it works?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
