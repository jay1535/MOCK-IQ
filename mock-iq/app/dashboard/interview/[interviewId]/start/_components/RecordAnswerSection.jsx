"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React from 'react'


function RecordAnswerSection() {


  return (
    
      
    <div className='  flex flex-col justify-center items-center border-purple-900 border-4
    bg-gray-800 my-10 rounded-2xl p-5 '>
        <Image src={'/webcam.jpg'} alt='webcam'width={200} height={200}  style={{
            borderRadius:360
        }}
         className='absolute'/>
        <Webcam
          mirrored={true}
         style={{
            height:400,
            width:'100%',
            zIndex:10
         
         }}
        />      
    </div>
   
  )
}

export default RecordAnswerSection
