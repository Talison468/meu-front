"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Calendar, MapPin } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/evento");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const EventCard = ({ event }) => {
    return (
      <div
        className="
          bg-white/10 backdrop-blur-xl border border-white/20
          shadow-[0_0_20px_rgba(0,200,255,0.5)]
          hover:shadow-[0_0_35px_rgba(0,200,255,0.9)]
          hover:scale-[1.03]
          transition-all duration-300
          rounded-2xl overflow-hidden
        "
      >
        <img
          src={event.linkImagem}
          alt={event.nome}
          className="object-cover w-full h-52"
        />

        <div className="p-4">
          <h3 className="text-2xl font-bold text-cyan-300 drop-shadow">
            {event.nome}
          </h3>

          <p className="text-sm text-gray-300 mt-1">
            {event.descricao}
          </p>

          <div className="flex items-center justify-between mt-4 text-cyan-200">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(event.dataInicio).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{event.local}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-900 via-black to-purple-900 text-purple-200">
      <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
        Eventos
      </h1>

      {loading ? (
  <p className="text-center text-purple-300 text-lg animate-pulse">
    Carregando eventos...
  </p>
) : events.length === 0 ? (
  <p className="text-center text-purple-300 text-xl mt-10">
    Nenhum evento encontrado.
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {events.map((event, index) => (
      <EventCard key={index} event={event} />
    ))}
  </div>
)}
    </div>
  );
};

export default EventsPage;
