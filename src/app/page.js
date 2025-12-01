"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Calendar, MapPin } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from the API
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

  // Component for rendering individual event cards
  const EventCard = ({ event, isHighlighted }) => {
    return (
      <div
        className={`transition-all duration-300 shadow-lg rounded-lg overflow-hidden ${
          isHighlighted
            ? "bg-gradient-to-r from-blue-500 to-blue-400 transform scale-105"
            : "bg-white"
        }`}
      >
        <img
          src={event.linkImagem}
          alt={event.nome}
          className={`object-cover w-full h-56 ${
            isHighlighted ? "rounded-t-lg" : "rounded-md"
          }`}
        />
        <div className="p-4">
          <h3 className={`text-xl font-semibold ${isHighlighted ? "text-white" : "text-gray-800"}`}>
            {event.nome}
          </h3>
          <p className="text-sm text-gray-600">{event.descricao}</p>
          <div className="flex items-center space-x-2 mt-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} />
              <span className="ml-1">{new Date(event.dataInicio).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} />
              <span className="ml-1">{event.local}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-blue-50">
  //       <div className="text-blue-500 font-semibold text-lg">Carregando eventos...</div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="bg-blue-50 min-h-screen p-6">
  //     {/* Evento em Destaque */}
  //     {events.length > 0 && (
  //       <div className="max-w-3xl mx-auto mb-8">
  //         <EventCard event={events[0]} isHighlighted={true} />
  //       </div>
  //     )}

  //     {/* Lista de Eventos */}
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //       {events.slice(1).map((event) => (
  //         <div key={event.id} className="flex justify-center">
  //           <EventCard event={event} isHighlighted={false} />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default EventsPage;
