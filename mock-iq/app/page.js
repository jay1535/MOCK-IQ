"use client"
import Head from 'next/head';
import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const page = () => {
  return (
    // <div className='p-10 flex flex-col items-center justify-center' >
    //   <h1 className='red font-bold text-[22px]'>Welcome to AI Mock Interview</h1>
    // <a  ><h1><Button>Start</Button></h1></a>
    // </div>

    <div>
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-4 bg-gradient-to-r from-black to-gray-500 my-4 border rounded-xl shadow-md text-white ">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-2">
            <h1 className="text-3xl font-bold  ">Mock-IQ</h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
              

              <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0'>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jay1535/MOCK-IQ">
                  <FaGithub className="w-10 h-8 hover:text-green-600" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/jayant._.762/?hl=en">
                <FaInstagram className="w-10 h-8 mx-3 hover:text-pink-600" />
                </a>
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/jayant-habbu-12713725a/">
                <FaLinkedinIn  className="w-10 h-8 hover:text-blue-600" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
             
                <a href="#features" className="  mx-2 md:mx-4 font-bold text-xl hover:text-blue-600">Features</a>
                <a href="#testimonials" className="  mx-2 md:mx-4 font-bold text-xl hover:text-blue-600">Testimonials</a>
              
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className=" mx-2 border rounded-xl flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-black to-gray-500  px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ace Your Next Interview</h2>
          <p className="mt-4 text-lg md:text-xl text-white ">Practice with AI-powered mock interviews and get personalized feedback</p>
          <div className="mt-6 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold bg-white !text-primary-600 rounded-lg shadow-lg hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-white text-lg font-semibold border border-white rounded-lg
               hover:bg-white hover:text-gray-800"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="mt-4 text-lg text-gray-800">
              Our AI Mock Interview platform offers a range of powerful features:
            </p>
            <div className="flex flex-wrap justify-center mt-8 ">
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-200 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black-600">AI Mock Interviews</h3>
                  <p className="mt-2 text-gray-600">Experience realistic interview scenarios with our advanced AI.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-200 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black-600">Instant Feedback</h3>
                  <p className="mt-2 text-gray-600">Get instant, personalized feedback to improve your performance.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-200 rounded-lg p-6 shadow-md">
                  <h3 className="text-2xl font-semibold text-black-600">Comprehensive Reports</h3>
                  <p className="mt-2 text-gray-600">Receive detailed reports highlighting your strengths and weaknesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-gray-300 rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">- Alex Johnson</h4>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4 py-8">
                <div className="bg-gray-300 rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">- Sarah Williams</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        
      </main>

      <footer className="py-8 bg-black text-white text-center">
        <p>©2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page