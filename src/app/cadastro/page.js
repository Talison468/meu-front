"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    tipo: "",
    dataNascimento: "",
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
      // Enviar dados para a criação de usuário
      const userResponse = await axios.post("http://localhost:8080/api/v1/usuario", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cpf: formData.cpf,
        telefone: formData.telefone,
        tipo: formData.tipo,
        dataNascimento: formData.dataNascimento,
      });

      if (userResponse.status === 201) {
        // Se o usuário for criado com sucesso, redireciona para a página de login ou outra página
        router.push("/login");  // Redireciona para a página de login
      }
    } catch (error) {
      // Caso haja erro, exibe os erros de validação
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-black via-[#0b0f2a] to-[#3a0ca3] text-white">
      <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Campos de Criação de Conta */}
        <div>
          <label htmlFor="nome" className="block text-purple-200">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-purple-200">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite seu email"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-purple-200">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite sua senha"
          />
        </div>

        <div>
          <label htmlFor="cpf" className="block text-purple-200">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite seu CPF"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-purple-200">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Digite seu telefone"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="block text-purple-200">Tipo de Usuário</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecione</option>
            <option value="ADMIN">Administrador</option>
            <option value="USUARIO">Usuário</option>
          </select>
        </div>

        <div>
          <label htmlFor="dataNascimento" className="block text-purple-200">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d102d]/60 border border-purple-500/40 text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {isSubmitting ? "Enviando..." : "Criar Conta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
