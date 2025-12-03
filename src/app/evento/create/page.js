"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

function formatarData(dataLocal) {
  if (!dataLocal) return "";
  const [data, hora] = dataLocal.split("T");
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano} ${hora}`;
}

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        ...formData,
        dataInicio: formatarData(formData.dataInicio),
        dataFinal: formatarData(formData.dataFinal),
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/evento",
        payload
      );

      if (response.status === 201) {
        router.push("/events");
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (backendErrors) {
        setErrors(backendErrors);
      } else {
        setErrors({
          geral: "Erro ao conectar com o servidor ou resposta inesperada.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white px-4">
      <div
        className="
          max-w-3xl mx-auto p-8
          rounded-2xl shadow-xl
          bg-white/10 backdrop-blur-xl border border-purple-600/40
          shadow-[0_0_25px_rgba(138,43,226,0.5)]
        "
      >
        <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
          Criar Evento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {errors.geral && (
            <p className="text-red-400 text-sm mb-3">{errors.geral}</p>
          )}

          {/* Campos padrões */}
          {[
            { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do evento" },
            { id: "local", label: "Local", type: "text", placeholder: "Digite o local" },
            { id: "linkEvento", label: "Link do Evento", type: "url", placeholder: "URL do evento" },
            { id: "linkImagem", label: "Link da Imagem", type: "url", placeholder: "URL da imagem" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="text-purple-300 font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="
                  mt-1 w-full px-4 py-3 rounded-lg
                  bg-[#0d102d]/60 border border-purple-500/40 text-purple-200
                  backdrop-blur-md
                  focus:ring-2 focus:ring-purple-500 focus:outline-none
                  shadow-[0_0_12px_rgba(128,0,255,0.3)]
                "
              />
              {errors[field.id] && (
                <p className="text-red-400 text-sm mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="text-purple-300 font-medium">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="
                mt-1 w-full px-4 py-3 rounded-lg
                bg-[#0d102d]/60 border border-purple-500/40 text-purple-200
                backdrop-blur-md
                focus:ring-2 focus:ring-purple-500
                shadow-[0_0_12px_rgba(128,0,255,0.3)]
              "
              placeholder="Digite a descrição do evento"
            />
            {errors.descricao && (
              <p className="text-red-400 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="tipo" className="text-purple-300 font-medium">
              Tipo do Evento
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="
                mt-1 w-full px-4 py-3 rounded-lg
                bg-[#0d102d]/60 border border-purple-500/40 text-purple-200
                backdrop-blur
                focus:ring-2 focus:ring-purple-500
              "
            >
              <option value="">Selecione</option>
              <option value="CONGRESSO">CONGRESSO</option>
              <option value="TREINAMENTO">TREINAMENTO</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="IMERSÃO">IMERSÃO</option>
              <option value="REUNIÃO">REUNIÃO</option>
              <option value="HACKATON">HACKATON</option>
              <option value="STARTUP">STARTUP</option>
            </select>
            {errors.tipo && (
              <p className="text-red-400 text-sm mt-1">{errors.tipo}</p>
            )}
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dataInicio" className="text-purple-300 font-medium">
                Data de Início
              </label>
              <input
                type="datetime-local"
                id="dataInicio"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleChange}
                className="
                  mt-1 w-full px-4 py-3 rounded-lg
                  bg-[#0d102d]/60 border border-purple-500/40 text-purple-200
                  focus:ring-2 focus:ring-purple-500
                "
              />
              {errors.dataInicio && (
                <p className="text-red-400 text-sm mt-1">{errors.dataInicio}</p>
              )}
            </div>

            <div>
              <label htmlFor="dataFinal" className="text-purple-300 font-medium">
                Data de Finalização
              </label>
              <input
                type="datetime-local"
                id="dataFinal"
                name="dataFinal"
                value={formData.dataFinal}
                onChange={handleChange}
                className="
                  mt-1 w-full px-4 py-3 rounded-lg
                  bg-[#0d102d]/60 border border-purple-500/40 text-purple-200
                  focus:ring-2 focus:ring-purple-500
                "
              />
              {errors.dataFinal && (
                <p className="text-red-400 text-sm mt-1">{errors.dataFinal}</p>
              )}
            </div>
          </div>

          {/* Botão */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg shadow-xl"
            >
              {isSubmitting ? "Enviando..." : (
                <>
                  <PlusCircle size={20} /> Criar Evento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
