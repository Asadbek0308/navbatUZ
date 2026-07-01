import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import stationImg from '../../assets/Station.png'

/* ── tiny icon helpers ─────────────────────────────────────────── */
const Icon = ({ d, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ── status badge ──────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    waiting: { label: "Kutilmoqda",  cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
    done:    { label: "Yakunlangan", cls: "bg-gray-100  text-gray-500  dark:bg-gray-700     dark:text-gray-400"  },
    active:  { label: "Faol",        cls: "bg-blue-100  text-blue-700  dark:bg-blue-900/40  dark:text-blue-400"  },
  };
  const { label, cls } = map[status] || map.waiting;
  return (
    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${cls}`}>{label}</span>
  );
};

/* ── queue data ────────────────────────────────────────────────── */
const QUEUE = [
  { name: "Jasur To'rayev",  car: "Chevrolet Gentra", plate: "01 A 777 AA", time: "14:20", num: 12, status: "waiting" },
  { name: "Sardor Alimov",   car: "BYD Song Plus",    plate: "10 B 101 BB", time: "14:25", num: 13, status: "waiting" },
  { name: "Malika Karimova", car: "Chevrolet Cobalt", plate: "01 M 555 MM", time: "14:10", num: 11, status: "done"    },
];

/* ── quick-action card ──────────────────────────────────────────── */
const ActionCard = ({ iconBg, iconPath, title, desc, link }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <div>
      <p className="font-bold text-gray-800 dark:text-white mb-1 text-sm">{title}</p>
      <p className="text-xs text-gray-400 dark:text-gray-400 leading-snug">{desc}</p>
    </div>
    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 text-left hover:underline">{link} &rsaquo;</button>
  </div>
);

/* ── mobile queue card (shown on small screens) ─────────────────── */
const MobileQueueCard = ({ row, onApprove, onRemove }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-gray-800 dark:text-white">{row.name}</p>
      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">#{row.num}</span>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400">{row.car} · {row.plate}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <StatusBadge status={row.status} />
        <span className="text-xs text-gray-400">{row.time}</span>
      </div>
      {row.status === "waiting" ? (
        <div className="flex gap-2">
          <button onClick={() => onApprove(row.num)}><CheckCircle /></button>
          <button onClick={() => onRemove(row.num)}><XCircle /></button>
        </div>
      ) : (
        <span className="text-xs text-gray-400 dark:text-gray-500">Arxivlandi</span>
      )}
    </div>
  </div>
);

/* ── main component ─────────────────────────────────────────────── */
export default function StationOwner() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [queue, setQueue] = useState(QUEUE);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Siz tizimga kirmagansiz.</p>
          <button onClick={() => navigate("/registration")}
            className="bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition">
            Kirish
          </button>
        </div>
      </div>
    );
  }

  const approve = (num) => setQueue((q) => q.map((r) => r.num === num ? { ...r, status: "done" } : r));
  const remove  = (num) => setQueue((q) => q.filter((r) => r.num !== num));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-6 px-3 sm:py-10 sm:px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Page title ── */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 dark:text-blue-400">
            Shaxobcha Egasi Paneli
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Stantsiya holatini real vaqt rejimida boshqaring.
          </p>
        </div>

        {/* ── Station card + queue status ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6 sm:mb-8">

          {/* Station info card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 min-w-0">

                {/* Status + ID */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" /> Ishlamoqda
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">ID: #ST-9923</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 truncate">
                  {user.stationName || "Mustang AYOË S-1"}
                </h2>

                <p className="text-sm text-gray-400 dark:text-gray-400 flex items-start gap-1 mb-5">
                  <Icon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{user.stationAddress || "Toshkent sh., Yunusobod tumani, 4-kvartal"}</span>
                </p>

                {/* Fuel prices */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  {[["Metan", "3,200 so'm"], ["AI-92", "9,500 so'm"], ["AI-95", "11,200 so'm"]].map(([label, price]) => (
                    <div key={label} className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2 text-center">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white">{price}</p>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition">
                  <Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" className="w-4 h-4" />
                  Navbatni boshqarish
                </button>
              </div>

              {/* Station photo — hidden on very small, shown sm+ */}
              <div className="hidden sm:block w-full sm:w-44 md:w-52 h-36 sm:h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                <img src={stationImg} alt="Stantsiya" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Queue status — orange card */}
          <div className="bg-amber-500 rounded-2xl shadow-sm p-5 sm:p-7 flex flex-col justify-between text-white">
            <p className="font-bold text-base sm:text-lg mb-3">Navbat holati</p>
            <div className="mb-3">
              <p className="text-6xl sm:text-7xl font-extrabold leading-none">45</p>
              <p className="text-sm mt-1 opacity-90">ta avtomobil</p>
            </div>
            <p className="text-sm opacity-90 border-b border-white/30 pb-4 mb-4">
              O'rtacha kutish vaqti: 18 daqiqa
            </p>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="opacity-80">Bandlik darajasi</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick action cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          <ActionCard iconBg="bg-indigo-500"
            iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            title="Statistika" desc="Kunlik tushum va mijozlar oqimi tahlili." link="Ko'rish" />
          <ActionCard iconBg="bg-green-500"
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            title="Yoqilg'i qoldig'i" desc="Rezervuarlardagi joriy yoqilg'i miqdori." link="Tekshirish" />
          <ActionCard iconBg="bg-amber-500"
            iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            title="Xodimlar" desc="Operatorlar va smena boshqaruvchilari." link="Boshqarish" />
          <ActionCard iconBg="bg-gray-400"
            iconPath="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            title="E'lonlar" desc="Mijozlar uchun muhim xabarlar va aktsiyalar." link="Yaratish" />
        </div>

        {/* ── Recent queue ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Oxirgi navbatlar</h2>
            <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Hammasini ko'rish</button>
          </div>

          {/* Mobile: cards */}
          <div className="flex flex-col gap-3 p-4 sm:hidden">
            {queue.map((row) => (
              <MobileQueueCard key={row.num} row={row} onApprove={approve} onRemove={remove} />
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {["Foydalanuvchi", "Avtomobil", "Vaqt", "Raqam", "Status", "Amallar"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((row) => (
                  <tr key={row.num} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{row.car} ({row.plate})</td>
                    <td className="px-6 py-4 text-sm text-gray-400 dark:text-gray-500">{row.time}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400">#{row.num}</td>
                    <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-6 py-4">
                      {row.status === "waiting" ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => approve(row.num)}><CheckCircle /></button>
                          <button onClick={() => remove(row.num)}><XCircle /></button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">Arxivlandi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}