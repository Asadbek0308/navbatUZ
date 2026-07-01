import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom"; // Router orqali sahifalararo o'tish

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import AccessGuard from "../../components/AccessGuard";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- YANGI: Foydalanuvchi joylashuvi uchun BOSHQACHA marker (Custom HTML element) ---
const customUserIcon = L.divIcon({
  className: "custom-user-marker",
  html: `<div style="
    position: relative;
    width: 20px;
    height: 20px;
    background-color: #3b82f6;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  ">
    <div style="
      position: absolute;
      top: -3px;
      left: -3px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #3b82f6;
      animation: pulse 1.8s infinite ease-in-out;
      opacity: 0.6;
      z-index: -1;
    "></div>
  </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Animatsiya ishlashi uchun sahifaga kichik CSS uslub qo'shamiz
const style = document.createElement("style");
style.innerHTML = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

export default function Map() {
  const navigate = useNavigate(); // Navigate hooki e'lon qilindi

  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fuelType, setFuelType] = useState(null);

  // --- YANGI SHTATLAR (HOLATLAR) ---
  const [volumeType, setVolumeType] = useState(null); // "full", "30l" yoki "custom"
  const [carName, setCarName] = useState(""); // Mashina nomi uchun input

  // --- YANGI: Foydalanuvchi joylashuvi holati ---
  const [userLocation, setUserLocation] = useState(null);

  const getFuelPrices = (id) => {
    const seed = Number(id);
    return {
      metan: 3600 + (seed % 350),
      ai80: 7600 + (seed % 450),
      ai92: 9300 + (seed % 500),
      ai95: 10900 + (seed % 600),
      diesel: 11400 + (seed % 700),
    };
  };

  // --- YANGI: Foydalanuvchi geolokatsiyasini olish (Xaritani majburlab surmaydi) ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolokatsiyani olishda xatolik:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const query = `[out:json];(node["amenity"="fuel"](41.20,69.10,41.40,69.40););out;`;
        const res = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query));
        const data = await res.json();
        const list = (data.elements || []).map((item) => ({
          id: item.id,
          name: item.tags?.name || "Noma'lum Zapravka",
          lat: item.lat,
          lng: item.lon,
        }));
        setStations(list);
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        if (loading) setLoading(false);
      }
    };
    fetchStations();
  }, [loading]);

  const handleBooking = () => {
    if (!fuelType || !volumeType || !carName.trim()) return;

    const now = new Date();
    const oneLiterPrice = getFuelPrices(selected.id)[fuelType];

    // Hajm turiga qarab raqamni hisoblash (Mening navbatim sahifasi uchun)
    let finalVolume = "O'zim aytaman";
    if (volumeType === "full") finalVolume = "45 L"; // To'la bak uchun shartli ravishda 45 litr
    if (volumeType === "30l") finalVolume = "30 L";

    const bookingData = {
      stationName: selected.name,
      fuel: fuelType.toUpperCase(),
      volumeType: volumeType, // "full", "30l", "custom"
      volume: finalVolume,
      price: oneLiterPrice, // 1 litrning narxi (Mening navbatim sahifasida ko'paytirib olinadi)
      carName: carName.trim(), // Mashina nomi saqlandi
      bookedAt: now.getTime(),
    };

    localStorage.setItem("myBooking", JSON.stringify(bookingData));
    navigate("/my-turn"); // "Mening navbatim" sahifasiga xavfsiz o'tish
  };

  // Ma'lumotlarni tozalash (Orqaga bosganda)
  const handleReset = () => {
    setSelected(null);
    setFuelType(null);
    setVolumeType(null);
    setCarName("");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <h2 className="mt-5 text-xl font-semibold text-white">Zapravkalar yuklanmoqda...</h2>
        </div>
      </div>
    );
  }

  return (
    <AccessGuard>
      <div className="flex h-screen w-full bg-slate-900">
      {/* MAP */}
      <div className="flex-1">
        <MapContainer center={[41.3111, 69.2797]} zoom={12} className="h-full w-full">
          <TileLayer attribution="OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* --- YANGI: Foydalanuvchi joylashuvi mutlaqo boshqacha markerda chiqadi --- */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customUserIcon}>
              <Popup>
                <div className="text-center font-semibold text-blue-500">Sizning joylashuvingiz 🔵</div>
              </Popup>
            </Marker>
          )}

          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              eventHandlers={{
                click: () => {
                  setSelected(station);
                  setFuelType(null);
                  setVolumeType(null);
                  setCarName("");
                },
              }}
            >
              <Popup>{station.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* SIDEBAR */}
      <div className="w-95 overflow-y-auto border-l border-slate-800 bg-slate-950 p-5">
        {!selected ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="text-7xl">⛽</div>
            <h2 className="mt-5 text-2xl font-bold text-white">Zapravkani tanlang</h2>
            <p className="mt-2 text-slate-400">Xaritadagi marker ustiga bosing.</p>
          </div>
        ) : (
          <div className="h-full text-white space-y-6">
            {/* HEADER */}
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="text-sm text-slate-400">ID: {selected.id}</p>
            </div>

            {/* FUEL SELECT */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-blue-400">Yoqilg‘ini tanlang</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(getFuelPrices(selected.id)).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFuelType(type);
                      setVolumeType(null); // Yoqilg'i almashganda keyingi bosqichlarni qayta tiklash
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      fuelType === type ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-300"
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* --- YANGI BOSQICH: HAJM BUTTONLARI --- */}
            {fuelType && (
              <div className="space-y-2 animate-fade-in">
                <h3 className="text-lg font-semibold text-blue-400">Hajmini tanlang</h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setVolumeType("full")}
                    className={`w-full rounded-lg py-2.5 text-sm font-bold transition ${
                      volumeType === "full" ? "bg-orange-600 text-white" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    🚀 To‘la bak
                  </button>
                  <button
                    onClick={() => setVolumeType("30l")}
                    className={`w-full rounded-lg py-2.5 text-sm font-bold transition ${
                      volumeType === "30l" ? "bg-orange-600 text-white" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    💧 30 Litr
                  </button>
                  <button
                    onClick={() => setVolumeType("custom")}
                    className={`w-full rounded-lg py-2.5 text-sm font-bold transition ${
                      volumeType === "custom" ? "bg-orange-600 text-white" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    💬 O‘zim borib aytaman
                  </button>
                </div>
              </div>
            )}

            {/* --- YANGI BOSQICH: MASHINA NOMINI KIRITISH --- */}
            {fuelType && volumeType && (
              <div className="space-y-2 animate-fade-in">
                <h3 className="text-lg font-semibold text-blue-400">Mashinangiz modeli</h3>
                <input
                  type="text"
                  placeholder="Masalan: Cobalt, Gentra, BYD..."
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ma'lumot uchun narxlar</h3>
              {Object.entries(getFuelPrices(selected.id)).map(([key, value]) => (
                <div key={key} className="flex justify-between rounded-lg bg-slate-900/50 px-4 py-1.5 text-xs">
                  <span className="uppercase text-slate-400">{key}</span>
                  <span className="text-slate-300">{value.toLocaleString()} so‘m</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <button
                disabled={!fuelType || !volumeType || !carName.trim()}
                onClick={handleBooking}
                className={`w-full rounded-lg py-3 font-bold transition shadow-lg ${
                  fuelType && volumeType && carName.trim()
                    ? "bg-green-600 hover:bg-green-700 text-white active:scale-95"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                🔒 Joy band qilish
              </button>

              <button
                onClick={handleReset}
                className="w-full rounded-lg bg-slate-900 border border-slate-800 py-2.5 font-semibold text-slate-400 hover:bg-slate-800 transition"
              >
                ⬅️ Orqaga
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </AccessGuard>
  );
} 