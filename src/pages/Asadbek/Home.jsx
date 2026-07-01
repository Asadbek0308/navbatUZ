import React, { useEffect, useRef } from "react";
import icon1 from '../../assets/icon1.svg'
import icon2 from '../../assets/icon2.svg'
import icon3 from '../../assets/icon3.svg'
import icon4 from '../../assets/icon4.svg'
import icon5 from '../../assets/icon5.svg'
import icon6 from '../../assets/icon6.svg'
import icon7 from '../../assets/icon7.svg'
import icon8 from '../../assets/icon8.svg'
import { Link } from "react-router-dom";

export default function Home() {
  const phoneRef = useRef(null);

  useEffect(() => {
    // Button micro-interaction
    const buttons = Array.from(document.querySelectorAll("button"));
    const onDown = (e) => e.currentTarget.classList.add("scale-95");
    const onUp = (e) => e.currentTarget.classList.remove("scale-95");
    buttons.forEach((b) => {
      b.addEventListener("mousedown", onDown);
      b.addEventListener("mouseup", onUp);
      b.addEventListener("mouseleave", onUp);
    });

    // Scroll reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = Array.from(document.querySelectorAll("section > div"));
    sections.forEach((el) => {
      el.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
      observer.observe(el);
    });

    // Global phone tilt
    const handleMouseMove = (e) => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / (window.innerWidth / 2);
      const y = (e.clientY - cy) / (window.innerHeight / 2);
      phoneRef.current.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 16}deg) translateZ(${(Math.abs(x) + Math.abs(y)) * 10
        }px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      buttons.forEach((b) => {
        b.removeEventListener("mousedown", onDown);
        b.removeEventListener("mouseup", onUp);
        b.removeEventListener("mouseleave", onUp);
      });
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-20 pb-32 px-8">
          {/* subtle background blob */}
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none bg-[#00317E] dark:bg-white"
            style={{ background: "#" }}
          />
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left copy */}
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm"
                style={{ background: "#EEF2FF", color: "#00317E" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Yangi: Smart Navbat tizimi ishga tushdi
              </div>

              <h1 className="text-5xl lg:text-[62px] lg:leading-[1.1] font-bold" style={{ color: "#00317E" }}>
                Vaqtingizni navbatda emas,{" "}
                <span style={{ color: "#FE9400" }}>hayotga</span> sarflang
              </h1>

              <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#434653" }}>
                O'zbekistondagi barcha yoqilg'i shaxobchalarida navbatlarni real vaqt
                rejimida kuzating va masofadan navbatga turing. Biz sizning qimmatli
                vaqtingizni asraymiz.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/my-turn">
                  <button
                    className="px-8 py-4 text-white font-bold rounded-xl text-base hover:shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
                    style={{ background: "#00317E" }}
                  >
                    <img src={icon4} alt="" />
                    Navbat olish
                  </button>
                </Link>
                <Link to="/map">
                  <button
                    className="px-8 py-4 font-semibold rounded-xl text-base hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                    style={{ background: "#E7E8E9", color: "#1a1a2e" }}
                  >
                    <img src={icon5} alt="" />
                    Xaritani ko'rish
                  </button>
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {["#00317E", "#FE9400", "#22c55e", "#6366f1"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  <span className="font-bold" style={{ color: "#00317E" }}>100,000+</span> haydovchi ishonadi
                </p>
              </div>
            </div>

            {/* Phone mockup */}
            <div
              className="relative flex justify-center items-center"
              style={{ perspective: "1000px" }}
            >
              <div
                ref={phoneRef}
                className="relative mx-auto"
                style={{
                  width: "300px",
                  height: "600px",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.12s ease-out",
                  willChange: "transform",
                  filter: "drop-shadow(0 30px 60px rgba(0,49,126,0.25))",
                }}
              >
                <div
                  className="w-full h-full rounded-[3rem] overflow-hidden relative"
                  style={{ border: "8px solid #d1d5db", background: "#f0f2f5" }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 w-full h-6 flex justify-center pt-2 z-10">
                    <div className="w-16 h-1.5 rounded-full" style={{ background: "#d1d5db" }} />
                  </div>

                  {/* Screen */}
                  <div className="w-full h-full bg-white flex flex-col gap-3 p-4 pt-8">
                    {/* Top bar */}
                    <div className="flex justify-between items-center">
                      <div className="h-3 w-28 rounded-md" style={{ background: "#e5e7eb" }} />
                      <div className="w-9 h-9 rounded-full" style={{ background: "#dde4f0" }} />
                    </div>

                    {/* Map */}
                    <div
                      className="w-full rounded-2xl flex items-center justify-center relative overflow-hidden hover:scale-105 transition-all"
                      style={{ height: "132px", background: "#eef0f4" }}
                    >
                      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="pg" width="28" height="26" patternUnits="userSpaceOnUse">
                            <path d="M 28 0 L 0 0 0 26" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pg)" />
                        <circle cx="50%" cy="50%" r="22" fill="none" stroke="#00317E" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="50%" cy="50%" r="4" fill="#00317E" />
                        <circle cx="30%" cy="35%" r="5" fill="#FE9400" opacity="0.7" />
                        <circle cx="72%" cy="68%" r="5" fill="#22c55e" opacity="0.7" />
                      </svg>
                      <img src={icon5} className="w-8 h-8" alt="" />
                    </div>

                    {/* Station cards */}
                    <div className="flex flex-col gap-2.5">
                      <div className="hover:scale-105 transition-all flex items-center gap-3 p-3 rounded-2xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
                        <img src={icon6} alt="" />
                        <div className="grow">
                          <div className="h-2.5 w-20 rounded mb-1.5" style={{ background: "#e5e7eb" }} />
                          <div className="h-2 w-14 rounded" style={{ background: "#f3f4f6" }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: "#FE9400" }}>5 min</span>
                      </div>

                      <div className="hover:scale-105 transition-all flex items-center gap-3 p-3 rounded-2xl border bg-white" style={{ borderColor: "#e5e7eb" }}>
                        <img src={icon7} alt="" />
                        <div className="grow">
                          <div className="h-2.5 w-24 rounded mb-1.5" style={{ background: "#e5e7eb" }} />
                          <div className="h-2 w-16 rounded" style={{ background: "#f3f4f6" }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: "#00317E" }}>Bo'sh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="py-16 px-8 border-y border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
            {[
              { value: "500+", label: "Shaxobchalar", color: "#00317E" },
              { value: "100k+", label: "Haydovchilar", color: "#00317E" },
              { value: "50k+", label: "Tejalgan soat", color: "#FE9400" },
              { value: "24/7", label: "Xizmat ko'rsatish", color: "#00317E" },
            ].map(({ value, label, color }) => (
              <div key={label} className="text-center flex-1 min-w-[120px]">
                <h3 className="text-4xl font-bold mb-1" style={{ color }}>{value}</h3>
                <p className="text-sm font-medium text-[#6b7280]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: "#00317E" }}>Nega NavbatUZ ni tanlashadi?</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
                Biz faqatgina navbatlarni emas, balki haydovchilarning asablarini va vaqtini ham asraymiz.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: icon1,
                  title: "Jonli xarita",
                  desc: "Shahringizdagi barcha shaxobchalar holatini bitta xaritada ko'ring va eng bo'shini tanlang.",
                  accent: "#EEF2FF",
                },
                {
                  icon: icon2,
                  title: "Masofaviy navbat",
                  desc: "Uydan chiqmasdan turib navbatga yoziling va o'z vaqtingizda shaxobchaga yetib boring.",
                  accent: "#FFF7ED",
                },
                {
                  icon: icon3,
                  title: "Aqlli bildirishnomalar",
                  desc: "Navbatingiz yaqinlashganda va sizning navbatingiz kelganda darhol xabar olasiz.",
                  accent: "#F0FDF4",
                },
              ].map(({ icon, title, desc, accent }) => (
                <div
                  key={title}
                  style={{
                    borderColor: `${accent}`,
                  }}
                  className={`p-8 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default flex flex-col gap-2`}>
                  <img src={icon} alt="" className="w-14 h-14" />
                  <h4 className="text-xl font-bold mb-3 text-[#00317E]">{title}</h4>
                  <p className=" text-[#6b7280]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-32 px-8" style={{ background: "#00317E" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-24">Qanday ishlaydi?</h2>

            <div className="relative grid md:grid-cols-3 gap-0">
              {/* Connector line (desktop only) */}
              <div
                className="hidden md:block absolute"
                style={{
                  top: "40px",
                  left: "calc(16.666% + 40px)",
                  right: "calc(16.666% + 40px)",
                  height: "1px",
                  background: "rgba(255,255,255,0.25)",
                  zIndex: 0,
                }}
              />

              {[
                {
                  n: "1",
                  title: "Tanlang",
                  desc: "Xaritadan o'zingizga qulay va bo'sh shaxobchani toping.",
                },
                {
                  n: "2",
                  title: "Navbatga turing",
                  desc: "Birgina tugmani bosish orqali elektron navbatga yoziling.",
                },
                {
                  n: "3",
                  title: "Boring",
                  desc: "Xabarnoma kelganidan so'ng shaxobchaga boring va xizmatdan foydalaning.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="relative z-10 flex flex-col items-center text-center px-8">
                  {/* Circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-8 font-bold text-2xl"
                    style={{
                      background: "white",
                      color: "#00317E",
                      border: "4px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {n}
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3">{title}</h5>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE MAP SECTION ── */}
        <section className="py-32 px-8" >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#EEF2FF] text-[#00317E]">
                Real vaqt
              </div>
              <h2 className="text-4xl font-bold text-[#00317E]">
                Navbatlarni real vaqtda kuzatish
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#6b7280" }}>
                Bizning interaktiv interfeysimiz orqali har bir shaxobchaning necha kishi
                kutayotganini va o'rtacha kutish vaqtini aniq ko'ra olasiz. Xarita har 10
                soniyada yangilanadi.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {  label: "Tezkor yangilanish", sub: "Har 10 soniyada" },
                  {  label: "Aniq koordinatalar", sub: "GPS aniqligi" },
                  {  label: "Push bildirishnoma", sub: "Darhol xabar" },
                  {  label: "Kutish tahlili", sub: "AI bashorat" },
                ].map(({ icon, label, sub }) => (
                  <div
                    key={label}
                    className="p-4 rounded-2xl border border-[#e5e7eb]"
                  >
                    <p className="font-bold text-sm">{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full h-[420px] rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 z-10 transition-colors duration-500" style={{ background: "rgba(0,49,126,0.04)" }} />
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Live map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtqGq0XLuxHWpQD68tbRxFzDPhJr_3n2VIdynkN0sKkas1JIwXMh6f8mMNyGl6HZTCwp7ks4RWr6_qi0Dl2Pei_2MtAtwntK07RB0jJD78yEFv7-it0Qo8ZtaaFrLLDDUrBeYe3vj-AYmRPxmjUcBw_Mr6tJO1gTHaWDIZF5LkoVfdrpfAJqyAIB7EtalXhq1FEJwDsvzvBG1SY1MsVzCHcerz_yoxl24nC9tTfO6KYiZ5ECxP0p4ovDzNJ0e_P3-nihMxXdwTn5Y"
              />
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}