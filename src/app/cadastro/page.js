"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, PlusCircle, Upload } from "lucide-react";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    local: "",
    dataInicio: "",
    dataFinal: "",
    linkEvento: "",
    linkImagem: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/evento",
        formData
      );

      if (response.status === 201) {
        router.push("/events");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 animate-fadeIn">

        <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
          Criar Evento
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          {/* Nome */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Nome do Evento</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome"
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white placeholder-gray-300 outline-none focus:ring focus:ring-purple-400"
            />
            {errors.nome && <p className="text-red-400 text-sm">{errors.nome}</p>}
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              placeholder="Descrição do evento"
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white placeholder-gray-300 outline-none focus:ring focus:ring-purple-400"
            />
            {errors.descricao && <p className="text-red-400 text-sm">{errors.descricao}</p>}
          </div>

          {/* Tipo */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Tipo de Evento</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white outline-none focus:ring focus:ring-purple-400"
            >
              <option className="text-black" value="">Selecione</option>
              <option className="text-black" value="CONGRESSO">Congresso</option>
              <option className="text-black" value="TREINAMENTO">Treinamento</option>
              <option className="text-black" value="WORKSHOP">Workshop</option>
              <option className="text-black" value="IMERSÃO">Imersão</option>
              <option className="text-black" value="REUNIÃO">Reunião</option>
              <option className="text-black" value="HACKATON">Hackaton</option>
              <option className="text-black" value="STARTUP">Startup</option>
            </select>
            {errors.tipo && <p className="text-red-400 text-sm">{errors.tipo}</p>}
          </div>

          {/* Local */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Local</label>
            <input
              type="text"
              name="local"
              value={formData.local}
              onChange={handleChange}
              placeholder="Digite o local"
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white placeholder-gray-300 outline-none focus:ring focus:ring-purple-400"
            />
            {errors.local && <p className="text-red-400 text-sm">{errors.local}</p>}
          </div>

          {/* Data início */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Data de Início</label>
            <input
              type="datetime-local"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white outline-none focus:ring focus:ring-purple-400"
            />
            {errors.dataInicio && <p className="text-red-400 text-sm">{errors.dataInicio}</p>}
          </div>

          {/* Data final */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Data de Finalização</label>
            <input
              type="datetime-local"
              name="dataFinal"
              value={formData.dataFinal}
              onChange={handleChange}
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white outline-none focus:ring focus:ring-purple-400"
            />
            {errors.dataFinal && <p className="text-red-400 text-sm">{errors.dataFinal}</p>}
          </div>

          {/* Link do evento */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Link do Evento</label>
            <input
              type="url"
              name="linkEvento"
              value={formData.linkEvento}
              onChange={handleChange}
              placeholder="https://seuevento.com"
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white placeholder-gray-300 outline-none focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Link da imagem */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Link da Imagem</label>
            <input
              type="url"
              name="linkImagem"
              value={formData.linkImagem}
              onChange={handleChange}
              placeholder="URL da imagem do evento"
              className="bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-white placeholder-gray-300 outline-none focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Botão enviar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl flex items-center justify-center gap-2 font-semibold text-lg shadow-xl disabled:bg-purple-900"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <PlusCircle size={22} />
                Criar Evento
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
