"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* --- Header Hide/Show on Scroll --- */
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 100) {
        setHideHeader(true); // hide header
      } else {
        setHideHeader(false); // show header
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-black relative selection:bg-blue-200">

      {/* SEO */}
      <Head>
        <title>Mock-IQ • AI Mock Interviews</title>
        <meta
          name="description"
          content="Ace your interviews using AI-powered mock sessions & instant feedback."
        />
      </Head>

      {/* BACKGROUND ACCENTS */}
      <div className="absolute -top-24 -left-16 w-80 h-80 bg-blue-900/10 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <header
        className={`
          fixed top-0 w-full border-b bg-white/90 backdrop-blur shadow-sm z-50
          transition-all duration-300
          ${hideHeader ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

          {/* LOGO */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
            Mock<span className="text-blue-700">-IQ</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-lg">
            <a href="#features" className="hover:text-blue-700 transition">Features</a>
            <a href="#testimonials" className="hover:text-blue-700 transition">Testimonials</a>

            <div className="flex items-center gap-5 ml-4">
              <SocialIcon href="https://github.com/jay1535/MOCK-IQ" icon={<FaGithub />} />
              <SocialIcon href="https://instagram.com/jayant._.762" icon={<FaInstagram />} />
              <SocialIcon href="https://linkedin.com/in/jayant-habbu-12713725a" icon={<FaLinkedinIn />} />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(true)}>
            <Menu className="w-7 h-7 text-black" />
          </button>
        </div>

        {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 text-center min-h-screen flex flex-col items-center justify-center">

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-black animate-fade-in font-exo">
          Master Your Interview with Mock<span className="text-blue-700">-IQ</span>
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl mx-auto animate-fade-in delay-150 font-exo">
          Train with realistic AI mock interviews and get powerful feedback on every answer.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
          <Link
            href="/dashboard"
            className="w-full md:w-auto px-10 py-4 rounded-xl bg-blue-700 text-white text-lg font-semibold shadow hover:scale-[1.03] active:scale-95 transition flex items-center justify-center font-exo"
          >
            Start Practicing <ArrowRight className="ml-2" />
          </Link>

          <a
            href="#features"
            className="w-full md:w-auto px-10 py-4 text-lg font-semibold border border-blue-700 text-blue-700 rounded-xl hover:bg-blue-700 hover:text-white transition text-center font-exo"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 min-h-screen bg-white px-6 border-t flex items-center">
        <div className="max-w-7xl mx-auto text-center">

          <h3 className="text-3xl md:text-5xl font-extrabold text-black font-exo">
            Features That Give You an Edge
          </h3>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto font-exo">
            Everything you need to level up your interview prep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
            <FeatureCard
              title="AI Mock Interviews"
              desc="Simulate interviews tailored to your job role."
            />
            <FeatureCard
              title="Instant Smart Feedback"
              desc="Get detailed insights on clarity, correctness & delivery."
            />
            <FeatureCard
              title="Performance Analytics"
              desc="Track improvement over time with structured reports."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50 min-h-screen border-y flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-extrabold text-black font-exo">What Users Say</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
            <TestimonialCard
              text="Mock-IQ boosted my confidence before my placement interview. I felt fully prepared!"
              name="Alex Johnson"
            />
            <TestimonialCard
              text="The AI feedback is incredibly accurate. My answers improved drastically."
              name="Sarah Williams"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center bg-black text-gray-300 font-exo">
        © {new Date().getFullYear()} Mock-IQ — Built by Jayant
      </footer>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.25s; }
        .font-exo { font-family: "Exo 2", sans-serif; }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           REUSABLE COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-700 transition text-xl"
    >
      {icon}
    </a>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl border shadow hover:shadow-xl transition font-exo">
      <h4 className="text-2xl font-bold text-black">{title}</h4>
      <p className="mt-3 text-gray-600">{desc}</p>
    </div>
  );
}

function TestimonialCard({ text, name }) {
  return (
    <div className="bg-white p-8 rounded-2xl border shadow hover:shadow-xl transition font-exo">
      <p className="text-lg italic text-gray-800">"{text}"</p>
      <h4 className="mt-4 text-xl font-bold text-blue-700">- {name}</h4>
    </div>
  );
}

function MobileMenu({ setMenuOpen }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex md:hidden">
      <div className="w-72 h-full bg-white shadow-xl p-7 animate-slide-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-black font-exo">Mock-IQ</h2>
          <button className="p-2" onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-xl font-semibold font-exo">
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </nav>

        <hr className="my-6" />

        <div className="flex gap-6">
          <SocialIcon href="https://github.com/jay1535/MOCK-IQ" icon={<FaGithub />} />
          <SocialIcon href="https://instagram.com/jayant._.762" icon={<FaInstagram />} />
          <SocialIcon href="https://linkedin.com/in/jayant-habbu-12713725a" icon={<FaLinkedinIn />} />
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
