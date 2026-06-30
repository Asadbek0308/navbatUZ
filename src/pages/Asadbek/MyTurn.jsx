import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyTurn() {
  // --- STATES ---
  const [activeBooking, setActiveBooking] = useState(null);
  const [history, setHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  
  // Modallar va Sahifachalar uchun holatlar
  const [selectedEvakuator, setSelectedEvakuator] = useState(null);
  const [comingSoonPage, setComingSoonPage] = useState(null); 
  
  // To'lov tizimi shtatlari
  const [walletBalance, setWalletBalance] = useState(450000);
  const [cards, setCards] = useState([
    { id: 1, type: "HUMO", number: "**** **** **** 2415", name: "JONIBEK A." },
    { id: 2, type: "UZCARD", number: "**** **** **** 8600", name: "JONIBEK A." }
  ]);

  // Dinamik navbat va taymer shtatlari
  const [peopleAhead, setPeopleAhead] = useState(12);
  const [timeLeft, setTimeLeft] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [targetTimeStr, setTargetTimeStr] = useState("");

  // --- DATA: EVAKUATORLAR (Asl holatiga qaytarildi) ---
  const evakuatorlar = [
    {
      id: 1, driver: "Jasur Ahmatov", car: "Hyundai Mighty", carNumber: "01 | A 777 BB",
      phone: "+998 (90) 123-45-67", experience: "5 yil",
      image: "https://frankfurt.apollo.olxcdn.com/v1/files/3lpi1gfjm0uq1-UZ/image",
      description: "Toshkent shahar bo'ylab 24/7 xizmat. Xavfsiz yuklash kafolatlanadi."
    },
    {
      id: 2, driver: "Sardor Olimov", car: "Isuzu NPR82", carNumber: "01 | Z 999 ZZ",
      phone: "+998 (93) 987-65-43", experience: "7 yil",
      image: "https://frankfurt.apollo.olxcdn.com/v1/files/dsq25661rzp5-UZ/image",
      description: "Og'ir vazndagi texnikalarni tashish uchun maxsus gidravlik platforma."
    },
    {
      id: 3, driver: "Farruh Karimov", car: "Gazelle Next", carNumber: "10 | X 555 OA",
      phone: "+998 (99) 444-33-22", experience: "3 yil",
      image: "https://cdn-img.birbir.uz/i/400x400-fit/files/c4/ba/5853b901d02e886a6fd3d5c8c9d8.jpg",
      description: "Hamyonbop narxlarda shahar ichi va viloyatga chiqish xizmati."
    },
    {
      id: 4, driver: "Doston To'rayev", car: "Mercedes Atego", carNumber: "01 | M 010 AM",
      phone: "+998 (95) 770-11-22", experience: "10 yil",
      image: "https://frankfurt.apollo.olxcdn.com/v1/files/9j66qa8lxojh1-UZ/image;s=750x1000",
      description: "Sport karlar va past klirensli mashinalar uchun professional yordam."
    },
    {
      id: 5, driver: "Eldor Yusupov", car: "Foton Ollin", carNumber: "01 | O 234 EE",
      phone: "+998 (88) 150-50-50", experience: "4 yil",
      image: "https://frankfurt.apollo.olxcdn.com/v1/files/a4shkhnim9hy-UZ/image;s=610x322",
      description: "Shahar atrofi va viloyat yo'llarida 24/7 tezkor yetib borish."
    }
  ];

  // --- LOGIC: INITIAL LOAD & TAYMER ---
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const savedBooking = localStorage.getItem("myBooking");
    const savedHistory = localStorage.getItem("bookingHistory") 
      ? JSON.parse(localStorage.getItem("bookingHistory")) 
      : [];
    setHistory(savedHistory);

    if (savedBooking) {
      const booking = JSON.parse(savedBooking);
      setActiveBooking(booking);

      let targetTime = localStorage.getItem("myBookingTargetTime");
      if (!targetTime) {
        const durationMin = 30; 
        targetTime = Date.now() + durationMin * 60 * 1000;
        localStorage.setItem("myBookingTargetTime", targetTime);
      } else {
        targetTime = Number(targetTime);
      }

      const targetDate = new Date(targetTime);
      setTargetTimeStr(targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const interval = setInterval(() => {
        const now = Date.now();
        const difference = targetTime - now;

        const bookedTime = booking.bookedAt || (targetTime - 30 * 60 * 1000);
        const minutesElapsed = Math.floor((now - bookedTime) / (60 * 1000));
        const currentPeople = Math.max(12 - Math.floor(minutesElapsed / 2.5), 0);
        setPeopleAhead(currentPeople);

        if (difference <= 0) {
          clearInterval(interval);
          setTimeLeft("00:00");
          setIsTimeUp(true);
        } else {
          const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  // --- LOGIC: FINISH ACTION ---
  const handleFinalAction = (statusText) => {
    if (!activeBooking) return;

    let finalVolume = activeBooking.volume;
    let totalPrice = 0;
    const oneLiterPrice = activeBooking.price || 0;

    if (statusText === "BAJARILDI") {
      if (activeBooking.volumeType === "full") totalPrice = 45 * oneLiterPrice;
      else if (activeBooking.volumeType === "30l") totalPrice = 30 * oneLiterPrice;
    }

    const newTx = {
      id: Date.now(),
      date: new Date().toLocaleDateString("uz-UZ"),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fuel: activeBooking.fuel,
      carName: activeBooking.carName || "Noma'lum", 
      volume: finalVolume, 
      price: totalPrice, 
      status: statusText 
    };

    const updatedHistory = [newTx, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("bookingHistory", JSON.stringify(updatedHistory));
    
    localStorage.removeItem("myBooking");
    localStorage.removeItem("myBookingTargetTime");
    setActiveBooking(null);
    setIsTimeUp(false);
  };

  const getLivePriceDisplay = () => {
    if (!activeBooking) return "0 UZS";
    const base = activeBooking.price || 0;
    if (activeBooking.volumeType === "full") return `${(45 * base).toLocaleString()} UZS`;
    if (activeBooking.volumeType === "30l") return `${(30 * base).toLocaleString()} UZS`;
    return "Joyida aniqlanadi";
  };

  const displayedHistory = showAllHistory ? history : history.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-all duration-300">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* --- DASHBOARD BLOKLARI --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* NAVBAT DASHBOARD CARDI */}
          <div className="flex flex-col justify-between rounded-3xl bg-indigo-600 p-8 text-white shadow-xl dark:bg-indigo-900" data-aos="fade-right">
            <div>
              <div className="flex justify-between items-center opacity-80">
                <span className="text-xs font-bold uppercase tracking-widest">Sizning Navbatingiz</span>
                <span className="text-2xl">⏳</span>
              </div>
              
              <div className="mt-6 flex items-baseline">
                {activeBooking ? (
                  <>
                    <span className="text-6xl font-black">41</span>
                    <span className="text-xl opacity-60 ml-2">/ 142</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">Faol navbat yo'q</span>
                )}
              </div>

              {activeBooking && (
                <div className="mt-6 space-y-3 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10 shadow-inner">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Stantsiya:</span>
                    <span className="font-bold">{activeBooking.stationName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Mashina modeli:</span>
                    <span className="font-bold text-yellow-300 uppercase">{activeBooking.carName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Yoqilg'i turi:</span>
                    <span className="font-bold uppercase">{activeBooking.fuel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Buyurtma hajmi:</span>
                    <span className="font-bold text-cyan-200">{activeBooking.volume}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-70">Kutilayotgan summa:</span>
                    <span className="font-bold text-emerald-300">{getLivePriceDisplay()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="opacity-70">Kelish vaqti:</span>
                    <span className="font-bold">{targetTimeStr}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs opacity-70 uppercase font-bold">Qolgan vaqt:</span>
                    <span className={`font-mono text-xl font-black ${isTimeUp ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                      {timeLeft || "00:00"}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full bg-indigo-400 border-2 border-indigo-600"></div>
                  <div className="h-7 w-7 rounded-full bg-indigo-300 border-2 border-indigo-600"></div>
                </div>
                <span className="text-sm font-medium opacity-90">
                  {activeBooking ? (peopleAhead > 0 ? `Sizdan oldin ${peopleAhead} kishi bor` : "Sizning navbatingiz keldi!") : "Xaritadan joy band qiling"}
                </span>
              </div>
            </div>

            {activeBooking ? (
              !isTimeUp ? (
                <button 
                  onClick={() => { if(window.confirm("Navbatni bekor qilishni xohlaysizmi?")) handleFinalAction("BEKOR QILINDI") }} 
                  className="mt-8 w-full rounded-2xl bg-white/10 py-4 font-bold border border-white/20 transition hover:bg-white/20 active:scale-95"
                >
                  Navbatni bekor qilish
                </button>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button onClick={() => handleFinalAction("BAJARILDI")} className="rounded-2xl bg-emerald-500 py-4 text-sm font-black shadow-lg hover:bg-emerald-600 active:scale-95 transition">Oldim ✅</button>
                  <button onClick={() => handleFinalAction("BORA OLMADIM")} className="rounded-2xl bg-red-500 py-4 text-sm font-black shadow-lg hover:bg-red-600 active:scale-95 transition">Bora olmadim ❌</button>
                </div>
              )
            ) : (
              <Link 
                to="/map" 
                className="mt-8 w-full text-center rounded-2xl bg-white py-4 font-black text-indigo-700 shadow-lg hover:bg-slate-50 transition active:scale-95"
              >
                Xaritaga qaytish
              </Link>
            )}
          </div>

          {/* YOQILG'I DARAJASI */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <h3 className="font-black text-lg mb-6">Yoqilg‘i xisoboti</h3>
            <div className="space-y-6">
              {[
                { label: "METAN", val: activeBooking?.fuel === "METAN" ? 85 : 30, color: "bg-blue-500" },
                { label: "AI-92", val: activeBooking?.fuel === "AI-92" ? 75 : 45, color: "bg-indigo-500" }
              ].map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>{f.label}</span>
                    <span>{f.val}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-3 rounded-full ${f.color} transition-all duration-1000`} style={{ width: `${f.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TEZKOR AMALLAR */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            <h3 className="font-black text-lg mb-6">Tezkor servis</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setComingSoonPage("payments")} className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30 group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition">💳</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">To‘lovlar</span>
              </button>
              <button onClick={() => setComingSoonPage("help")} className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/30 group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition">🎧</span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Yordam</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- OPERATSIYALAR JADVALI --- */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden" data-aos="fade-up">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-black text-lg">So‘nggi operatsiyalar</h3>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              {showAllHistory ? "Barcha tarix" : "Maksimal 5 ta limit"}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
                  <th className="px-8 py-4">Sana / Vaqt</th>
                  <th className="px-8 py-4">Yoqilg'i (Mashina)</th>
                  <th className="px-8 py-4">Hajm</th>
                  <th className="px-8 py-4">Summa</th>
                  <th className="px-8 py-4 text-right">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {displayedHistory.length > 0 ? (
                  displayedHistory.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="px-8 py-5">
                        <div className="font-bold">{h.date}</div>
                        <div className="text-[11px] opacity-50">{h.time}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-xs uppercase text-slate-700 dark:text-slate-200">{h.fuel}</span>
                          <span className="text-[11px] text-slate-400 uppercase font-medium">{h.carName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-bold text-slate-500">{h.volume}</td>
                      <td className="px-8 py-5 font-black">
                        {h.price > 0 ? `${h.price.toLocaleString()} UZS` : "0 UZS / Joyida"}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className={`inline-block rounded-lg px-3 py-1 text-[10px] font-black tracking-tighter ${
                          h.status === "BAJARILDI" 
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" 
                            : h.status === "BEKOR QILINDI"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                        }`}>
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="px-8 py-10 text-center text-slate-400">Hozircha operatsiyalar mavjud emas.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dinamik tarixlarni ko'rsatish tugmasi */}
          {history.length > 5 && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAllHistory(!showAllHistory)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
              >
                {showAllHistory ? "⬆️ Tarixni yopish" : `👇 Qolgan tarixlarni ko'rsatish (${history.length - 5} ta)`}
              </button>
            </div>
          )}
        </div>

        {/* --- EVAKUATOR KATALOGI (ASL SIZNING DIZAYNINGIZGA QAYTARILDI) --- */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm" data-aos="fade-up">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-black text-xl flex items-center gap-2">🚨 Evakuator Xizmati</h3>
              <p className="text-sm text-slate-400 font-medium">Yo'lda qolib ketganda favqulodda yordam xizmati.</p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase dark:bg-red-900/30 dark:text-red-400">24/7 Aktiv</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {evakuatorlar.map((eva) => (
              <div 
                key={eva.id}
                onClick={() => setSelectedEvakuator(eva)}
                className="group cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 p-4 transition-all hover:shadow-xl hover:-translate-y-2 hover:border-indigo-500"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 bg-slate-200">
                  <img src={eva.image} alt={eva.driver} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h4 className="font-black text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition truncate">{eva.driver}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{eva.car}</span>
                  <span className="text-[10px] font-black text-indigo-500">{eva.carNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- MODAL: EVAKUATOR PROFILI (ASL HOLATIDAGI) --- */}
      {selectedEvakuator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 shadow-2xl border border-white/20">
            <div className="relative h-56">
              <img src={selectedEvakuator.image} alt={selectedEvakuator.driver} className="h-full w-full object-cover" />
              <button onClick={() => setSelectedEvakuator(null)} className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition">✕</button>
            </div>
            <div className="p-8 space-y-5">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Haydovchi Profili</span>
                <h3 className="text-2xl font-black">{selectedEvakuator.driver}</h3>
                <p className="text-sm font-bold text-slate-400">Tajribasi: {selectedEvakuator.experience}</p>
              </div>
              <a href={`tel:${selectedEvakuator.phone}`} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 font-black text-white shadow-xl hover:bg-indigo-700 transition">
                📞 Aloqa: {selectedEvakuator.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: TEZ ORADA ISHGA TUSHADI SAHIFASI --- */}
      {comingSoonPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-[32px] bg-white dark:bg-slate-900 p-8 text-center shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="text-6xl animate-bounce mt-4">
              {comingSoonPage === "payments" ? "💳" : "🎧"}
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {comingSoonPage === "payments" ? "To'lovlar bo'limi" : "Yordam sahifasi"}
              </h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium px-4 leading-relaxed">
                Bu sahifa hali ishga tushmagan, lekin tez orada ishga tushadi!
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={() => setComingSoonPage(null)} 
                className="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl hover:bg-indigo-700 active:scale-95 transition"
              >
                ⬅️ Orqaga
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}