"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, PlusCircle, Upload } from "lucide-react"; // Ícones do Lucide

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

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Limpeza dos erros anteriores
    setErrors({});

    try {
      // Envio dos dados para o backend
      const response = await axios.post("http://localhost:8080/api/v1/evento", formData);

      // Caso a criação seja bem-sucedida, redireciona para a lista de eventos
      if (response.status === 201) {
        router.push("/events");
      }
    } catch (error) {
      // Caso haja erro de validação, exibe os erros
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Criar Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome do Evento */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do evento"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a descrição do evento"
            />
            {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
          </div>

          {/* Tipo do Evento */}
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o tipo de evento</option>
              <option value="CONGRESSO">CONGRESSO</option>
              <option value="TREINAMENTO">TREINAMENTO</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="IMERSÃO">IMERSÃO</option>
              <option value="REUNIÃO">REUNIÃO</option>
              <option value="HACKATON">HACKATON</option>
              <option value="STARTUP">STARTUP</option>
            </select>
            
            {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
          </div>

          {/* Local */}
          <div>
            <label htmlFor="local" className="block text-sm font-medium text-gray-700">
              Local
            </label>
            <input
              type="text"
              
              id="local"
              name="local"
              value={formData.local}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o local do evento"
            />
            
            {errors.local && <p className="text-red-500 text-sm mt-1">{errors.local}</p>}
          </div>

          {/* Data de Início */}
          <div>
            <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700">
              Data de Início
            </label>
            <input
              type="datetime-local"
              id="dataInicio"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dataInicio && <p className="text-red-500 text-sm mt-1">{errors.dataInicio}</p>}
          </div>

          {/* Data de Finalização */}
          <div>
            <label htmlFor="dataFinal" className="block text-sm font-medium text-gray-700">
              Data de Finalização
            </label>
            <input
              type="datetime-local"
              id="dataFinal"
              name="dataFinal"
              value={formData.dataFinal}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dataFinal && <p className="text-red-500 text-sm mt-1">{errors.dataFinal}</p>}
          </div>

          {/* Link do Evento */}
          <div>
            <label htmlFor="linkEvento" className="block text-sm font-medium text-gray-700">
              Link do Evento
            </label>
            <input
              type="url"
              id="linkEvento"
              name="linkEvento"
              value={formData.linkEvento}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o link do evento"
            />
          </div>

          {/* Link da Imagem */}
          <div>
            <label htmlFor="linkImagem" className="block text-sm font-medium text-gray-700">
              Link da Imagem
            </label>
            <input
              type="url"
              id="linkImagem"
              name="linkImagem"
              value={formData.linkImagem}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o link da imagem"
            />
          </div>

          {/* Botão de Enviar */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <PlusCircle className="mr-2 inline-block" size={20} />
                  Criar Evento
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
