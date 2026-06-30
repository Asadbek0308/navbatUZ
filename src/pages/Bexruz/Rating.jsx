import React from 'react';
import { 
  Fuel, 
  DollarSign, 
  Award, 
  ThumbsUp, 
  Filter, 
  BarChart3, 
  Trophy, 
  Bolt, 
  Heart, 
  ChevronRight, 
  Download 
} from 'lucide-react';
import Rating from './Rating'; // Yuqoridagi Rating komponentingiz

export default function Dashboard() {
  // Rasmdagi aniq ishchilar va ma'lumotlar
  const employees = [
    { rank: 1, name: "Aziz Rahmonov", role: "Shift A Lead", fuel: "8,420 L", revenue: "$11,450", rating: 5, initial: "AR", bg: "bg-emerald-600", hasAvatar: true },
    { rank: 2, name: "Madina Saidova", role: "Senior Associate", fuel: "7,980 L", revenue: "$10,850", rating: 4, initial: "MS", bg: "bg-blue-600", hasAvatar: true },
    { rank: 3, name: "Rustam Aliev", role: "Attendant", fuel: "7,210 L", revenue: "$9,800", rating: 5, initial: "RA", bg: "bg-purple-600", hasAvatar: true },
    { rank: 4, name: "Jasur Karimov", role: null, fuel: "6,500 L", revenue: "$8,840", rating: 4.8, hasAvatar: false },
    { rank: 5, name: "Elena Volkova", role: null, fuel: "6,120 L", revenue: "$8,320", rating: 4.7, hasAvatar: false },
  ];

  // Grafik ustunlari (Dushanbadan Yakshanbagacha)
  const weeklySales = [
    { day: "M", height: "h-16", current: false },
    { day: "T", height: "h-20", current: false },
    { day: "W", height: "h-14", current: false },
    { day: "T", height: "h-24", current: false },
    { day: "F", height: "h-22", current: true }, // Juma kuni yashil rangda
    { day: "S", height: "h-26", current: false },
    { day: "S", height: "h-12", current: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 p-4 md:p-6 font-sans flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* 1. Yuqori qism: Statistika kartalari */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Fuel */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Fuel Sold Today</p>
              <h3 className="text-2xl font-black mt-1 text-slate-800">42,850 L</h3>
              <p className="text-xs text-emerald-500 font-medium mt-2">↑ +12% from yesterday</p>
            </div>
            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Fuel className="w-5 h-5" /></span>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-2xl font-black mt-1 text-slate-800">$58,290.00</h3>
              <p className="text-xs text-blue-500 font-medium mt-2">↑ +8% target reach</p>
            </div>
            <span className="p-3 bg-blue-50 text-blue-600 rounded-xl"><DollarSign className="w-5 h-5" /></span>
          </div>

          {/* Best Employee */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Best Employee</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">AR</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Aziz Rahmonov</h4>
                  <p className="text-xs text-slate-400">Shift A Lead</p>
                </div>
              </div>
            </div>
            <span className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Award className="w-5 h-5" /></span>
          </div>

          {/* Satisfaction */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Satisfaction</p>
              <h3 className="text-2xl font-black mt-1 text-slate-800">4.9 / 5.0</h3>
              <div className="flex text-emerald-500 gap-0.5 mt-2">
                <Rating value={5} />
              </div>
            </div>
            <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ThumbsUp className="w-5 h-5" /></span>
          </div>
        </div>

        {/* 2. Asosiy blok */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chap tomon: Top 10 Employees Jadvali */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800">Top 10 Employees</h3>
              <button className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-full hover:bg-emerald-950 transition flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filter List
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                    <th className="pb-3">Rank</th>
                    <th className="pb-3">Employee</th>
                    <th className="pb-3 text-right">Fuel Sold (L)</th>
                    <th className="pb-3 text-right">Revenue</th>
                    <th className="pb-3 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                  {employees.map((emp) => (
                    <tr key={emp.rank} className="hover:bg-slate-50/50 transition">
                      <td className={`py-3.5 font-bold ${emp.rank === 1 ? 'text-yellow-500' : emp.rank === 3 ? 'text-amber-600' : 'text-slate-400'}`}>
                        {emp.rank}
                      </td>
                      <td className="py-3.5 flex items-center gap-3">
                        {emp.hasAvatar ? (
                          <div className={`w-8 h-8 rounded-full ${emp.bg} text-white flex items-center justify-center font-bold text-xs`}>
                            {emp.initial}
                          </div>
                        ) : (
                          // Rasmda 4 va 5-ishchilarning avatarlari va rollari yo'q ekan, joy tashlab ketildi
                          <div className="w-8" /> 
                        )}
                        <div>
                          <p className="font-bold text-slate-800">{emp.name}</p>
                          {emp.role && <p className="text-xs text-slate-400">{emp.role}</p>}
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-bold text-emerald-600">{emp.fuel}</td>
                      <td className="py-3.5 text-right font-semibold text-slate-700">{emp.revenue}</td>
                      <td className="py-3.5 text-right">
                        {/* Siz yaratgan yangi xatosiz ishlaydigan Rating komponenti */}
                        <Rating value={emp.rating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* O'ng tomon: Grafika, Yutuqlar va Vazifalar */}
          <div className="space-y-6">
            
            {/* Weekly Fuel Sales */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-800 text-sm">Weekly Fuel Sales</h4>
                <BarChart3 className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-end justify-between h-28 px-2 border-b border-slate-100 pb-2">
                {weeklySales.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-7">
                    <div className={`w-full rounded-t-md ${item.current ? 'bg-emerald-600' : 'bg-slate-200'} ${item.height}`} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-slate-400 mt-4">
                Average daily: <span className="font-bold text-slate-700">4,120 Liters</span>
              </p>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Recent Achievements</h4>
              
              <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl">
                <span className="p-2 bg-emerald-600 text-white rounded-lg"><Trophy className="w-4 h-4" /></span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Best Seller</h5>
                  <p className="text-[11px] text-slate-400">Awarded to Aziz R.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50/60 rounded-xl">
                <span className="p-2 bg-blue-600 text-white rounded-lg"><Bolt className="w-4 h-4" /></span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Fast Service</h5>
                  <p className="text-[11px] text-slate-400">Averaging 2.5m per car</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-rose-50/60 rounded-xl">
                <span className="p-2 bg-rose-500 text-white rounded-lg"><Heart className="w-4 h-4" /></span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Customer Favorite</h5>
                  <p className="text-[11px] text-slate-400">100+ positive reviews</p>
                </div>
              </div>
            </div>

            {/* Management Tasks */}
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100/50 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm mb-3">Management Tasks</h4>
              <button className="w-full flex justify-between items-center bg-white p-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-sm">
                <span>Assign Shifts</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex justify-between items-center bg-white p-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-sm">
                <span>Download Monthly Audit</span>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <footer className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 pt-6 border-t border-slate-200/60 mt-10 gap-2">
        <p><span className="text-emerald-700 font-bold">Ishonch Fuel Systems</span> © 2024 All rights reserved.</p>
        <div className="flex gap-4 font-medium">
          <a href="#status" className="hover:text-slate-600 transition">System Status</a>
          <a href="#privacy" className="hover:text-slate-600 transition">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-600 transition">Terms of Service</a>
          <a href="#api" className="hover:text-slate-600 transition">API</a>
        </div>
      </footer>
    </div>
  );
}