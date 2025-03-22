import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1A1A40] to-[#283593] relative">
      {/* Overlay for a smooth blend */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Sign-Up Card with Glassmorphism */}
      <div className="relative mt-4 p-5 bg-white/10 backdrop-blur-lg border 
       border-white/20 rounded-2xl shadow-2xl text-white text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-2 text-[#E0E0E0]">Join Us Today! 🚀</h2>
        

        <SignUp />

        {/* Sign-In CTA */}
       
      </div>
    </div>
  );
}
