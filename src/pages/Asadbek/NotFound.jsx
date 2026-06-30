import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center
bg-gradient-to-br from-blue-50 via-white to-blue-100
dark:from-slate-950 dark:via-slate-900 dark:to-blue-950
transition-all duration-500 p-6">      <div
  className="
    max-w-5xl
    w-full
    rounded-3xl
    overflow-hidden
    shadow-2xl
    flex
    flex-col
    md:flex-row
    bg-white
    dark:bg-slate-900
    border
    border-gray-100
    dark:border-slate-700
    transition-all
    duration-500
  "
>

        {/* Left Side */}
        <div className="relative hidden md:flex w-1/2 bg-blue-900 items-center justify-center overflow-hidden">
          {/* Background circles */}
          <div className="absolute w-80 h-80 bg-blue-700 rounded-full -top-20 -left-20 opacity-30 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full -bottom-32 -right-20 opacity-20 blur-3xl"></div>

          <div className="relative z-10 text-center px-10">
            <h1 className="text-[130px] font-extrabold text-white leading-none tracking-tight select-none">
              404
            </h1>

            <p className="text-blue-100 text-lg mt-4">
              Sahifa topilmadi
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center px-10 py-16">

          <span className="inline-flex w-fit items-center rounded-full bg-blue-100 text-blue-800 px-4 py-1 text-sm font-semibold mb-6">
            Xatolik
          </span>

          <h2 className="text-4xl font-bold mb-5">
            Kechirasiz, bu sahifa mavjud emas.
          </h2>

          <p className="text-gray-500 leading-relaxed mb-10 max-w-md">
            Siz qidirayotgan sahifa o'chirilgan, manzili o'zgargan yoki
            vaqtinchalik mavjud emas.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              Bosh sahifaga qaytish
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold px-7 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Oldingi sahifa
            </button>
          </div>

          {/* Decorative line */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              NavbatUZ • Tez, qulay va zamonaviy navbat boshqaruvi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;