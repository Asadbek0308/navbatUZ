import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

/* ── toggle switch ─────────────────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-colors ${checked ? "bg-amber-400" : "bg-gray-200"}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-6" : "translate-x-0"}`} />
  </button>
);

/* ── checkbox ──────────────────────────────────────────────────── */
const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-5 h-5 rounded flex items-center justify-center border transition ${checked ? "bg-blue-700 border-blue-700" : "border-gray-300 bg-white"}`}
  >
    {checked && (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )}
  </button>
);

/* ── car card ──────────────────────────────────────────────────── */
const CarCard = ({ model, plate, onDelete }) => (
  <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l2-4h12l2 4h1a2 2 0 012 2v6a2 2 0 01-2 2h-2m-9 0h6m-6 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{model}</p>
        <p className="text-xs text-gray-400">{plate}</p>
      </div>
    </div>
    <button onClick={onDelete} className="text-gray-300 hover:text-red-400 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
);

/* ── section wrapper ───────────────────────────────────────────── */
const Section = ({ title, children, action }) => (
  <div className=" rounded-2xl border border-gray-100 shadow-sm p-7 mb-5">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-extrabold text-blue-800">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

/* ── labelled input ────────────────────────────────────────────── */
const LabelInput = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-b-2 border-gray-200 focus:border-blue-600 outline-none py-2 text-sm text-gray-800 bg-gray-50 px-3 rounded-t-md transition"
    />
  </div>
);

/* ── main component ─────────────────────────────────────────────── */
export default function UserProfile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  /* personal info */
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone]       = useState(user?.phone    || "");
  const [email, setEmail]       = useState(user?.email    || "");

  /* cars */
  const [cars, setCars] = useState([
    { id: 1, model: user?.carModel  || "Chevrolet Gentra", plate: user?.carNumber || "01 A 777 AA" },
    { id: 2, model: "BYD Song Plus",  plate: "01 Z 555 ZZ" },
  ]);
  const [newModel, setNewModel] = useState("");
  const [newPlate, setNewPlate] = useState("");
  const [addingCar, setAddingCar] = useState(false);

  /* security */
  const [twoFA, setTwoFA] = useState(true);

  /* notifications */
  const [notifQueue, setNotifQueue]  = useState(true);
  const [notifOffers, setNotifOffers] = useState(false);
  const [notifSystem, setNotifSystem] = useState(true);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <p className="text-gray-500 mb-4">Siz tizimga kirmagansiz.</p>
          <button onClick={() => navigate("/registration")}
            className="bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition">
            Kirish
          </button>
        </div>
      </div>
    );
  }

  const initials = fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  const handleSave = () => {
    login({ ...user, fullName, phone, email });
    alert("O'zgarishlar saqlandi!");
  };

  const deleteCar  = (id) => setCars((c) => c.filter((x) => x.id !== id));
  const addCar = () => {
    if (!newModel.trim() || !newPlate.trim()) return;
    setCars((c) => [...c, { id: Date.now(), model: newModel, plate: newPlate }]);
    setNewModel(""); setNewPlate(""); setAddingCar(false);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── 1. Personal info ── */}
        <Section title="Shaxsiy ma'lumotlar">
          <div className="flex flex-col sm:flex-row gap-7">

            {/* Avatar */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-700 border-4 border-blue-200 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {initials}
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-800 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <LabelInput label="To'liq ism"     value={fullName} onChange={setFullName} placeholder="Ism Familiya" />
              <LabelInput label="Telefon raqami" value={phone}    onChange={setPhone}    placeholder="+998 90 000 00 00" type="tel" />
              <div className="sm:col-span-2">
                <LabelInput label="Email" value={email} onChange={setEmail} placeholder="email@example.uz" type="email" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button onClick={handleSave}
              className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition">
              O'zgarishlarni saqlash
            </button>
          </div>
        </Section>

        {/* ── 2. Cars ── */}
        <Section
          title="Avtomobillarim"
          action={
            <button onClick={() => setAddingCar((p) => !p)}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Yangi qo'shish
            </button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {cars.map((car) => (
              <CarCard key={car.id} model={car.model} plate={car.plate} onDelete={() => deleteCar(car.id)} />
            ))}

            {/* Add new car form or dashed placeholder */}
            {addingCar ? (
              <div className="border border-blue-300 rounded-xl p-4 flex flex-col gap-3">
                <input value={newModel} onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Model (Chevrolet Gentra)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
                <input value={newPlate} onChange={(e) => setNewPlate(e.target.value)}
                  placeholder="Raqam (01 A 123 BC)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
                <div className="flex gap-2">
                  <button onClick={addCar} className="flex-1 bg-blue-700 text-white text-sm rounded-lg py-1.5 hover:bg-blue-800 transition">Qo'shish</button>
                  <button onClick={() => setAddingCar(false)} className="flex-1 border border-gray-200 text-sm rounded-lg py-1.5 text-gray-500 hover:bg-gray-50 transition">Bekor</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingCar(true)}
                className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Yangi transport qo'shish
              </button>
            )}
          </div>
        </Section>

        {/* ── 3. Security ── */}
        <Section title="Xavfsizlik">
          <div className="flex flex-col gap-3">
            {/* Password row */}
            <div className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Parolni o'zgartirish</p>
                  <p className="text-xs text-gray-400">Oxirgi marta 3 oy oldin o'zgartirilgan</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:underline">O'zgartirish</button>
            </div>

            {/* 2FA row */}
            <div className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Ikki bosqichli autentifikatsiya</p>
                  <p className="text-xs text-gray-400">Hisobingizni qo'shimcha himoya qiling</p>
                </div>
              </div>
              <Toggle checked={twoFA} onChange={setTwoFA} />
            </div>
          </div>
        </Section>

        {/* ── 4. Notifications ── */}
        <Section title="Bildirishnomalar">
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { label: "Navbat kelishi haqida bildirishnoma", checked: notifQueue,  set: setNotifQueue  },
              { label: "Maxsus takliflar va aksiyalar",        checked: notifOffers, set: setNotifOffers },
              { label: "Tizim yangilanishlari",                checked: notifSystem, set: setNotifSystem },
            ].map(({ label, checked, set }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <p className="text-sm text-gray-700">{label}</p>
                <Checkbox checked={checked} onChange={set} />
              </div>
            ))}
          </div>
        </Section>

        {/* Logout */}
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-3 rounded-xl transition text-sm border border-red-200"
        >
          Tizimdan chiqish
        </button>

      </div>
    </div>
  );
}