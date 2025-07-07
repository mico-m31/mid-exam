import React from "react";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Your Money
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Keep Track At Your Income And Expense, Control your finance 

            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/daily">
                <button className="cursor-pointer group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                  Start Manage
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black/30 backdrop-blur-sm mt-66 ">
        <div className="container  px-6">
          <div className="border-t border-white/10 p-4 text-center text-white/60 ">
            <p>&copy; 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
