import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyTurn() {
  const [activeBooking, setActiveBooking] = useState(null);
  const [history, setHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Evakuator uchun shtatlar
  const [selectedEvakuator, setSelectedEvakuator] = useState(null);

  // Dinamik navbat shtatlari
  const [peopleAhead, setPeopleAhead] = useState(12);
  const [timeLeft, setTimeLeft] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [targetTimeStr, setTargetTimeStr] = useState("");

  // Evakuatorlar ro'yxati (5 ta)
  const evakuatorlar = [
    {
      id: 1,
      driver: "Jasur Ahmatov",
      car: "Hyundai Mighty (Sariq)",
      carNumber: "01 | A 777 BB",
      phone: "+998 (90) 123-45-67",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=300&q=80",
      experience: "5 yil",
      description: "Toshkent shahar bo‘ylab 24/7 tezkor xizmat. Har qanday yengil avtomobil va jip variantlarini xavfsiz yuklash va tashish kafolatlanadi."
    },
    {
      id: 2,
      driver: "Sardor Olimov",
      car: "Isuzu NPR82 (Oq)",
      carNumber: "01 | Z 999 ZZ",
      phone: "+998 (93) 987-65-43",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=300&q=80",
      experience: "7 yil",
      description: "Og‘ir vazndagi mikroavtobus va krossoverlarni ham tashiydi. Maxsus gidravlik platformaga ega."
    },
    {
      id: 3,
      driver: "Farruhbek Karimov",
      car: "Gazelle Next (Ko‘k)",
      carNumber: "10 | X 555 OA",
      phone: "+998 (99) 444-33-22",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=300&q=80",
      experience: "3 yil",
      description: "Arzon va qulay narxlarda shahar ichi va viloyatga chiqish xizmati. Shuningdek, g‘ildirak qulflanib qolgan holatlarda ham yordam beradi."
    },
    {
      id: 4,
      driver: "Doston To‘rayev",
      car: "Mercedes-Benz Atego",
      carNumber: "01 | M 010 AM",
      phone: "+998 (95) 770-11-22",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80",
      experience: "10 yil",
      description: "Professional darajadagi uzun platformali evakuator. Sport Karlar va past osilgan (lowrider) mashinalarni beziyon yuklaydi."
    },
    {
      id: 5,
      driver: "Eldor Yusupov",
      car: "Foton Ollin (Kumushrang)",
      carNumber: "01 | O 234 EE",
      phone: "+998 (88) 150-50-50",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
      experience: "4 yil",
      description: "Toshkent viloyati va shahar atrofi hududlariga tezkor yetib borish imkoniyati. Narxlar kelishilgan holda."
    }
  ];

  // SMS yuborish funksiyasi (Faqat bir marta ishlashi uchun localStorage orqali tekshiriladi)
  const sendReminderSMS = async (station) => {
    const isSmsSent = localStorage.getItem("smsSent_5min");
    if (isSmsSent === "true") return; // Agar oldin yuborilgan bo'lsa, qayta ishlamaydi

    try {
      console.log(`SMS YUBORILDI: "Sizning 5 minut vaqtingiz qoldi tezroq ${station} zapravkamizga yetib keling"`);
      
      /* Real loyihada API so'rov quyidagicha bo'ladi:
      await axios.post("https://api.eskiz.uz/api/message/sms/send", {
        mobile_phone: "998901234567",
        message: `Sizning 5 minut vaqtingiz qoldi tezroq ${station} zapravkamizga yetib keling`
      });
      */
      
      localStorage.setItem("smsSent_5min", "true"); // Bayroqni saqlash
    } catch (error) {
      console.error("SMS yuborishda xatolik:", error);
    }
  };

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

      // Foydalanuvchi chiqib ketsa ham vaqt o'zgarmasligi uchun targetTime xotiradan tekshiriladi
      let targetTime = localStorage.getItem("myBookingTargetTime");
      if (!targetTime) {
        const durationMin = 30; // 30 daqiqalik taymer
        targetTime = (booking.bookedAt || Date.now()) + durationMin * 60 * 1000;
        localStorage.setItem("myBookingTargetTime", targetTime);
      } else {
        targetTime = Number(targetTime);
      }

      const targetDate = new Date(targetTime);
      setTargetTimeStr(targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const interval = setInterval(() => {
        const now = Date.now();
        const difference = targetTime - now;

        // Odamlar soni vaqtga mutanosib ravishda kamayadi
        const bookedTime = booking.bookedAt || (targetTime - 30 * 60 * 1000);
        const minutesElapsed = Math.floor((now - bookedTime) / (60 * 1000));
        const currentPeople = Math.max(12 - Math.floor(minutesElapsed / 2), 0);
        setPeopleAhead(currentPeople);

        if (difference <= 0 || currentPeople === 0) {
          clearInterval(interval);
          setTimeLeft("00:00");
          setIsTimeUp(true);
        } else {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);

          // Toppa-to'g'ri 5 daqiqa (yoki undan kamroq) qolganda SMS yuborish mantiqi triggering
          if (minutes === 5 && seconds === 0) {
            sendReminderSMS(booking.stationName);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleFinalAction = (statusText) => {
    if (!activeBooking) return;

    const newTx = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fuel: activeBooking.fuel,
      volume: statusText === "BAJARILDI" ? "45 L" : "0 L",
      price: activeBooking.price,
      status: statusText
    };

    const updatedHistory = [newTx, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("bookingHistory", JSON.stringify(updatedHistory));
    
    // Barcha vaqtinchalik xotiralarni tozalash
    localStorage.removeItem("myBooking");
    localStorage.removeItem("myBookingTargetTime");
    localStorage.removeItem("smsSent_5min"); // SMS holatini ham tozalash
    setActiveBooking(null);
    setIsTimeUp(false);
  };

  const displayedHistory = showAllHistory ? history : history.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* DASHBOARD BLOKLARI */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* NAVBAT CARDI */}
          <div className="flex flex-col justify-between rounded-2xl bg-blue-700 p-6 text-white shadow-md dark:bg-blue-800" data-aos="fade-right">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Sizning navbatingiz</span>
                <span className="text-2xl opacity-60">⏳</span>
              </div>
              
              <div className="mt-4 flex items-baseline">
                {activeBooking ? (
                  <>
                    <span className="text-4xl font-extrabold">41</span>
                    <span className="text-lg text-blue-200 ml-1">/ 142</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-blue-200">Navbat yo'q</span>
                )}
              </div>

              {activeBooking && (
                <div className="mt-4 space-y-2 rounded-xl bg-white/10 p-4 text-sm text-blue-50 backdrop-blur-sm">
                  <p><span className="opacity-75">Zapravka:</span> <strong>{activeBooking.stationName}</strong></p>
                  <p><span className="opacity-75">Yoqilg‘i:</span> <span className="font-bold text-yellow-300">{activeBooking.fuel}</span></p>
                  <p><span className="opacity-75">Kelish soati:</span> <span className="text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded">{targetTimeStr}</span></p>
                  
                  <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="opacity-75">Qolgan vaqt:</span>
                    <span className={`font-mono font-bold text-lg ${isTimeUp ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                      {timeLeft || "Hisoblanmoqda..."}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs text-blue-100">
                <span>
                  {activeBooking ? (peopleAhead > 0 ? `Sizdan oldin ${peopleAhead} kishi bor` : "Sizning navbatingiz keldi!") : "Navbat kutilmoqda"}
                </span>
              </div>
            </div>

            {/* DINAMIK TUGMALAR */}
            {activeBooking ? (
              !isTimeUp ? (
                <button 
                  onClick={() => { if(confirm("Navbatni bekor qilasizmi?")) handleFinalAction("BEKOR QILINDI") }} 
                  className="mt-6 w-full rounded-xl bg-slate-900/40 py-3 font-semibold text-white border border-white/20 transition hover:bg-slate-900/60"
                >
                  Navbatni bekor qilish
                </button>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-2" data-aos="zoom-in">
                  <button 
                    onClick={() => handleFinalAction("BAJARILDI")}
                    className="rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white shadow-md transition hover:bg-emerald-600"
                  >
                    Yoqilg‘ini oldim ✅
                  </button>
                  <button 
                    onClick={() => handleFinalAction("BORA OLMADIM")}
                    className="rounded-xl bg-red-500 py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600"
                  >
                    Bora olmadim ❌
                  </button>
                </div>
              )
            ) : (
              <a href="/" className="mt-6 w-full text-center rounded-xl bg-white py-3 font-semibold text-blue-700 hover:bg-blue-50">
                Xaritaga o'tish
              </a>
            )}
          </div>

          {/* YOQILG'I DARAJASI */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-bold text-base mb-4">Yoqilg‘i darajasi</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-1 dark:text-slate-400"><span>METAN</span><span>85%</span></div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-blue-600" style={{ width: "85%" }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-1 dark:text-slate-400"><span>AI-92</span><span>42%</span></div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-blue-600" style={{ width: "42%" }}></div></div>
              </div>
            </div>
          </div>

          {/* TEZKOR AMALLAR */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-bold text-base mb-4">Tezkor amallar</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"><span className="text-xl mb-1">💳</span><span className="text-xs">To‘lovlar</span></button>
              <button className="flex flex-col items-center justify-center rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"><span className="text-xl mb-1">🎧</span><span className="text-xs">Yordam</span></button>
            </div>
          </div>
        </div>

        {/* JADVAL */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden" data-aos="fade-up">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-900">
            <h3 className="font-bold text-base">So‘nggi tranzaksiyalar</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-xs font-semibold uppercase text-slate-400 dark:bg-slate-900/50">
                  <th className="px-6 py-3.5">Sana / Vaqt</th>
                  <th className="px-6 py-3.5">Turi</th>
                  <th className="px-6 py-3.5">Hajmi</th>
                  <th className="px-6 py-3.5">Summa</th>
                  <th className="px-6 py-3.5">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                {displayedHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition">
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400"><div>{item.date}</div><div className="text-xs opacity-75">{item.time}</div></td>
                    <td className="px-6 py-4 font-semibold text-blue-600">● {item.fuel}</td>
                    <td className="px-6 py-4">{item.volume}</td>
                    <td className="px-6 py-4 font-bold">{item.price?.toLocaleString()} UZS</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded px-2.5 py-1 text-[10px] font-extrabold ${
                        item.status === "BAJARILDI" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60" : "bg-red-100 text-red-800"
                      }`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {history.length > 5 && (
            <div className="p-4 text-center border-t border-slate-100 dark:border-slate-900">
              <button onClick={() => setShowAllHistory(!showAllHistory)} className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {showAllHistory ? "Tarixni yopish 🔼" : "Qolgan tarixni ochish 🔽"}
              </button>
            </div>
          )}
        </div>

        {/* EVAKUATORLAR SEKSIYASI */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" data-aos="fade-up">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">🚨 Tezkor Evakuator Xizmati</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {evakuatorlar.map((eva) => (
              <div 
                key={eva.id}
                onClick={() => setSelectedEvakuator(eva)}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:bg-white dark:border-slate-900 dark:bg-slate-900/40 dark:hover:border-blue-500"
              >
                <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                  <img src={eva.image} alt={eva.driver} className="h-full w-full object-cover" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-500 truncate">{eva.driver}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{eva.car}</p>
                <span className="inline-block mt-2 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-950/50">{eva.carNumber}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedEvakuator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-950 border border-slate-200 dark:border-slate-800 animate-zoom-in">
            <div className="relative h-48 w-full">
              <img src={selectedEvakuator.image} alt={selectedEvakuator.driver} className="h-full w-full object-cover" />
              <button onClick={() => setSelectedEvakuator(null)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase">Professional Haydovchi</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedEvakuator.driver}</h3>
                <p className="text-xs text-slate-400">Tajriba: {selectedEvakuator.experience}</p>
              </div>
              <div className="space-y-2 border-t border-b border-slate-100 dark:border-slate-900 py-3 text-sm">
                <p className="flex justify-between"><span className="text-slate-400">Texnika:</span> <span className="font-semibold">{selectedEvakuator.car}</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Mashina Raqami:</span> <span className="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-xs font-bold">{selectedEvakuator.carNumber}</span></p>
              </div>
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">{selectedEvakuator.description}</p>
              </div>
              <a href={`tel:${selectedEvakuator.phone}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-center font-bold text-white hover:bg-blue-700">📞 Qo'ng'iroq: {selectedEvakuator.phone}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}