import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import loginImage from '../../assets/login.png'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CarIcon = () => (
  <ion-icon className="w-5 h-5 text-gray-400" name="car-outline"></ion-icon>
);

const CarIcon2 = () => (
  <ion-icon className="w-8 h-8 text-gray-400" name="car-outline"></ion-icon>
);

const StationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h10v13H3V7zM13 9h2a2 2 0 012 2v2a2 2 0 01-2 2h-2M17 9l2-2M19 7v10" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 10h4M6 13h4" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CarPlateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16v12H4V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h8M8 14h4" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#1877F2"/>
    <path fill="white" d="M15.5 8H13V6.5c0-.6.4-1 1-1h1.5V3H13c-1.9 0-3 1.3-3 3v2H8v2.5h2V21h3v-9.5h2l.5-2.5z"/>
  </svg>
);

export default function Registration() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("haydovchi");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    password: "",
    // Haydovchi fields
    fullName: "",
    carNumber: "",
    carModel: "",
    // Shaxobcha Egasi fields
    stationName: "",
    stationAddress: "",
    stationCount: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // ── added: save user to context and redirect ──
  const handleSubmit = () => {
    login({ role, ...form });
    navigate(role === "haydovchi" ? "/profile" : "/station-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className=" rounded-2xl shadow-xl overflow-hidden flex w-full max-w-5xl">

        {/* Left Panel */}
        <div className="relative hidden md:flex flex-col justify-end w-5/12 min-h-full overflow-hidden rounded-2xl">
          <img
            src={loginImage}
            alt="Gas station background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/60 to-transparent" />
          <div className="relative z-10 p-8 pb-10">
            <h2 className="text-white text-3xl font-bold leading-tight mb-3">
              Navbatda turmang, oson<br />kirib chiqing.
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              O'zbekistondagi eng ilg'or yoqilg'i boshqarish va navbat tizimi.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"
                  />
                ))}
              </div>
              <span className="text-white text-sm font-medium">
                10,000+ haydovchilar ishonchi
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center w-full md:w-7/12 px-10 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Xush kelibsiz</h1>
          <p className="text-gray-500 text-sm mb-8">
            Tizimga kirish uchun rol tanlang va ma'lumotlarni kiriting.
          </p>

          {/* Role Selector */}
          <p className="text-sm text-gray-700 mb-3">Kim sifatida kirasiz?</p>
          <div className="flex gap-4 mb-7">
            <button
              onClick={() => setRole("haydovchi")}
              className={`flex flex-col items-center justify-center gap-2 w-1/2 py-4 rounded-xl border-2 transition-all ${
                role === "haydovchi"
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <CarIcon2 />
              <span
                className={`text-sm font-medium ${
                  role === "haydovchi" ? "text-blue-700" : "text-gray-600"
                }`}
              >
                Haydovchi
              </span>
            </button>

            <button
              onClick={() => setRole("shaxobcha")}
              className={`flex flex-col items-center justify-center gap-2 w-1/2 py-4 rounded-xl border-2 transition-all ${
                role === "shaxobcha"
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <StationIcon />
              <span
                className={`text-sm font-medium ${
                  role === "shaxobcha" ? "text-blue-700" : "text-gray-600"
                }`}
              >
                Shaxobcha Egasi
              </span>
            </button>
          </div>

          {/* Haydovchi Extra Fields */}
          {role === "haydovchi" && (
            <div className="flex flex-col gap-4 mb-5">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">To'liq ism</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <UserIcon />
                  <input
                    type="text"
                    placeholder="Ism Familiya"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Car Number */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Avtomobil raqami</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <CarPlateIcon />
                  <input
                    type="text"
                    placeholder="01 A 123 BC"
                    pattern="\d{2} [A-Z]{1} \d{3} [A-Z]{2}"
                    value={form.carNumber}
                    onChange={handleChange("carNumber")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Car Model */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Avtomobil modeli</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <CarIcon />
                  <input
                    type="text"
                    placeholder="Chevrolet Spark, Nexia..."
                    value={form.carModel}
                    onChange={handleChange("carModel")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Shaxobcha Egasi Extra Fields */}
          {role === "shaxobcha" && (
            <div className="flex flex-col gap-4 mb-5">
              {/* Station Name */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Shaxobcha nomi</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <BuildingIcon />
                  <input
                    type="text"
                    placeholder="Masalan: Baraka AZS"
                    value={form.stationName}
                    onChange={handleChange("stationName")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Station Address */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Manzil</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <MapPinIcon />
                  <input
                    type="text"
                    placeholder="Toshkent, Chilonzor tumani..."
                    value={form.stationAddress}
                    onChange={handleChange("stationAddress")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Number of Pumps */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Kolanka soni</label>
                <div className="flex items-ce rounded-xl px-4 py-3">
                  <StationIcon />
                  <input
                    type="number"
                    min="1"
                    placeholder="Masalan: 6"
                    value={form.stationCount}
                    onChange={handleChange("stationCount")}
                    className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Phone */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Telefon raqami</label>
            <div className="flex items-ce rounded-xl px-4 py-3">
              <PhoneIcon />
              <input
                type="tel"
                placeholder="+998 00 000-00-00"
                value={form.phone}
                onChange={handleChange("phone")}
                className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="text-sm text-gray-700 mb-1 block">Parol</label>
            <div className="flex items-ce rounded-xl px-4 py-3">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                className="bg-transparent flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none"
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700"
              />
              <span className="text-sm text-gray-600">Eslab qolish</span>
            </label>
            <button className="text-sm font-semibold text-blue-700 hover:underline">
              Parolni unutdingizmi?
            </button>
          </div>

          {/* Submit — changed onClick from nothing to handleSubmit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Kirish
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 whitespace-nowrap">
              Yoki ijtimoiy tarmoqlar orqali
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 w-1/2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 w-1/2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FacebookIcon />
              Facebook
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500">
            Hisobingiz yo'qmi?{" "}
            <button className="text-blue-700 font-semibold hover:underline">
              Ro'yxatdan o'ting
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}