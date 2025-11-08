"use client";

import Head from "next/head";
import React, { useState } from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Menu, X } from "lucide-react";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>AI Mock Interview</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white text-black relative overflow-hidden">
        {/* Floating blur effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl animate-pulse-slow"></div>

        {/* Header */}
        <header className="w-full py-5 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto flex justify-between items-center px-6">
            <h1 className="text-4xl font-black tracking-tight text-blue-700 hover:text-blue-600 transition-transform duration-200 hover:scale-105">
              Mock-IQ
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-lg">
              <div className="flex gap-4">
                <a
                  href="https://github.com/jay1535/MOCK-IQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-transform hover:scale-110"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/jayant._.762/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-transform hover:scale-110"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jayant-habbu-12713725a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-transform hover:scale-110"
                >
                  <FaLinkedinIn className="w-6 h-6" />
                </a>
              </div>

              <div className="flex gap-6 ml-6">
                <a
                  href="#features"
                  className="hover:text-blue-500 underline-offset-4 hover:underline"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="hover:text-blue-500 underline-offset-4 hover:underline"
                >
                  Testimonials
                </a>
              </div>
            </nav>

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-blue-100 transition"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-7 h-7 text-blue-700" />
            </button>
          </div>

          {/* Sidebar / Mobile Menu */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-black/70 md:hidden flex">
              <div className="h-full w-80 bg-white text-black p-8 flex flex-col animate-slide-in shadow-2xl">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight">
                    Mock-IQ
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <X className="w-6 h-6 text-black" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-5">
                  {[
                    { label: "Features", href: "#features" },
                    { label: "Testimonials", href: "#testimonials" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-bold text-gray-800 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 hover:drop-shadow-md"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <hr className="border-gray-300 my-8" />

                {/* Social Links */}
                <div className="flex gap-8 mt-auto">
                  <a
                    href="https://github.com/jay1535/MOCK-IQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-transform hover:scale-125"
                  >
                    <FaGithub className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.instagram.com/jayant._.762/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500 transition-transform hover:scale-125"
                  >
                    <FaInstagram className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jayant-habbu-12713725a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-transform hover:scale-125"
                  >
                    <FaLinkedinIn className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="mx-4 my-10 border border-blue-200 rounded-3xl bg-white shadow-xl flex flex-col items-center text-center py-20 px-6 md:px-0 animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-700 to-black drop-shadow-lg animate-text-glow">
            Ace Your Interview
          </h2>
          <p className="mt-4 text-lg md:text-2xl text-gray-700 italic max-w-2xl animate-fade-in delay-200">
            Practice with AI-powered mock interviews & get personalized feedback
            to succeed.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 animate-fade-in delay-400">
            <a
              href="/dashboard"
              className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-blue-700 to-black text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-10 py-4 text-lg font-bold border-2 border-black text-black rounded-full hover:bg-black hover:text-white transform hover:scale-105 transition"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-20 bg-black text-white px-6 md:px-0 relative overflow-hidden"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-blue-400 mb-6 animate-fade-in">
              Features
            </h2>
            <p className="text-md md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in delay-200">
              Our platform delivers cutting-edge tools to help you prepare better
              & smarter.
            </p>
            <div className="flex flex-wrap justify-center gap-8 animate-fade-in-up delay-300">
              {[
                "AI Mock Interviews",
                "Instant Feedback",
                "Comprehensive Reports",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="w-full sm:w-2/3 md:w-1/3 px-4 py-6 transform hover:-translate-y-2 transition duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl hover:shadow-blue-400/30 transition">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">
                      {feature}
                    </h3>
                    <p className="text-md text-gray-300">
                      Explore our {feature.toLowerCase()} for better outcomes.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-black px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-blue-400 mb-8 animate-fade-in">
              What Users Say
            </h2>
            <div className="flex flex-wrap justify-center gap-8 animate-fade-in-up delay-300">
              {[
                {
                  text: "The AI mock interviews boosted my confidence before my big day.",
                  name: "Alex Johnson",
                },
                {
                  text: "The feedback was detailed and actionable. Highly recommended!",
                  name: "Sarah Williams",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/2 px-4 py-8 transform hover:-translate-y-2 transition animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-md hover:shadow-blue-400/40 transition">
                    <p className="text-lg italic text-gray-300">
                      "{testimonial.text}"
                    </p>
                    <h4 className="mt-4 text-xl font-bold text-blue-400">
                      - {testimonial.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 bg-black text-blue-400 text-center shadow-inner animate-fade-in">
        <p>©2025 AI Mock Interview. All rights reserved.</p>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Page;
