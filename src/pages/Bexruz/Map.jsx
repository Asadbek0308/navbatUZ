import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Agar React Router ishlatayotgan bo'lsangiz, quyidagi qatorni yoqing:
// import { useNavigate } from "react-router-dom"; 

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import AccessGuard from "../../components/AccessGuard";
import { useAuth } from "../../AuthContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map() {
  const { user } = useAuth();
  const isAuthorized = !!user && user.role === "haydovchi";

  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fuelType, setFuelType] = useState(null);

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

  // Only fetch stations once we know the user is an authorized driver
  useEffect(() => {
    if (!isAuthorized) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

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
        if (!cancelled) setStations(list);
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStations();
    return () => {
      cancelled = true;
    };
  }, [isAuthorized]);

  const handleBooking = () => {
    const now = new Date();
    const bookingData = {
      stationName: selected.name,
      fuel: fuelType.toUpperCase(),
      price: getFuelPrices(selected.id)[fuelType],
      bookedAt: now.getTime(), // Band qilingan aniq vaqt (millisekundda)
    };
    localStorage.setItem("myBooking", JSON.stringify(bookingData));
    window.location.href = "/my-turn";
  };

  // Guard check happens BEFORE the loading screen, so unauthorized
  // users never see the spinner and never trigger the Overpass fetch.
  if (!isAuthorized) {
    return <AccessGuard><></></AccessGuard>;
  }

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
            {stations.map((station) => (
              <Marker
                key={station.id}
                position={[station.lat, station.lng]}
                eventHandlers={{
                  click: () => {
                    setSelected(station);
                    setFuelType(null);
                  },
                }}
              >
                <Popup>{station.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* SIDEBAR */}
        <div className="w-[380px] overflow-y-auto border-l border-slate-800 bg-slate-950 p-5">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-7xl">⛽</div>
              <h2 className="mt-5 text-2xl font-bold text-white">Zapravkani tanlang</h2>
              <p className="mt-2 text-slate-400">Xaritadagi marker ustiga bosing.</p>
            </div>
          ) : (
            <div className="h-full text-white">
              {/* HEADER */}
              <div className="mb-5 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <p className="text-sm text-slate-400">ID: {selected.id}</p>
              </div>

              {/* FUEL SELECT */}
              <div className="mb-5">
                <h3 className="mb-2 text-lg font-semibold text-blue-400">Yoqilg‘ini tanlang</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(getFuelPrices(selected.id)).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFuelType(type)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${fuelType === type ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-300"
                        }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICES */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-400">Narxlar</h3>
                {Object.entries(getFuelPrices(selected.id)).map(([key, value]) => (
                  <div key={key} className="flex justify-between rounded-lg bg-slate-900 px-4 py-2">
                    <span className="uppercase text-slate-300">{key}</span>
                    <span>{value.toLocaleString()} so‘m</span>
                  </div>
                ))}
              </div>

              {/* BOOK BUTTON */}
              <button
                disabled={!fuelType}
                onClick={handleBooking}
                className={`mt-5 w-full rounded-lg py-2 font-semibold transition ${fuelType ? "bg-green-600 hover:bg-green-700 text-white" : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
              >
                Joy band qilish
              </button>

              <button
                onClick={() => {
                  setSelected(null);
                  setFuelType(null);
                }}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 font-semibold hover:bg-blue-700"
              >
                Orqaga
              </button>
            </div>
          )}
        </div>
      </div>
    </AccessGuard>
  );
}