"use client"

import Head from 'next/head';
import React from 'react';
import { FaInstagram, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Page = () => {
  return (
    <div>
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in">
        {/* Header Section */}
        <header className="w-full py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-xl text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95 animate-slide-down">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <h1 className="text-4xl font-extrabold tracking-widest hover:text-blue-300 transition-transform duration-300 transform hover:scale-110 animate-bounce">Mock-IQ</h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-center mt-4 md:mt-0 space-y-2 sm:space-y-0 sm:space-x-6 text-lg">
              <div className='flex flex-row items-center gap-4'>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/jay1535/MOCK-IQ" className="hover:scale-125 transform transition hover:text-blue-300 animate-pulse">
                  <FaGithub className="w-6 h-6" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jayant._.762/?hl=en" className="hover:scale-125 transform transition hover:text-blue-300 animate-pulse">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jayant-habbu-12713725a/" className="hover:scale-125 transform transition hover:text-blue-300 animate-pulse">
                  <FaLinkedinIn className="w-6 h-6" />
                </a>
              </div>
              <div className="flex flex-row items-center gap-6">
                <a href="#features" className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors">Features</a>
                <a href="#testimonials" className="hover:text-blue-200 hover:underline underline-offset-4 transition-colors">Testimonials</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-2 border rounded-3xl flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-100 via-white to-blue-200 px-6 md:px-0 shadow-xl animate-fade-in-up">
          <h2 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 animate-text-glow">Ace Your Next Interview</h2>
          <p className="mt-4 text-2xl md:text-3xl text-blue-800 italic animate-fade-in">Practice with AI-powered mock interviews and get personalized feedback</p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <a
              href="/dashboard"
              className="px-10 py-4 text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition animate-wiggle"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-10 py-4 text-xl font-bold border-2 border-blue-700 text-blue-800 rounded-full hover:bg-blue-700 hover:text-white transform hover:scale-105 transition animate-wiggle-delayed"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-br from-white to-blue-50 px-6 md:px-0 animate-fade-in">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-4 animate-bounce">Features</h2>
            <p className="text-xl text-blue-800 mb-10">
              Our AI Mock Interview platform offers a range of powerful features:
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {['AI Mock Interviews', 'Instant Feedback', 'Comprehensive Reports'].map((feature, i) => (
                <div key={i} className="w-full md:w-1/3 px-4 py-8">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 animate-fade-in-up">
                    <h3 className="text-3xl font-bold text-blue-900 mb-4">{feature}</h3>
                    <p className="text-lg text-blue-800">{`Detailed information about ${feature.toLowerCase()}.`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 md:px-0 animate-fade-in">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-8 animate-bounce">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { text: "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview.", name: "Alex Johnson" },
                { text: "The feedback was spot on and helped me improve my answers. Highly recommend this service!", name: "Sarah Williams" }
              ].map((testimonial, i) => (
                <div key={i} className="w-full md:w-1/2 px-4 py-8">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 animate-fade-in-up">
                    <p className="text-lg text-blue-800">"{testimonial.text}"</p>
                    <h4 className="mt-4 text-xl font-bold text-blue-900">- {testimonial.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white text-center shadow-inner animate-fade-in">
        <p>©2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
