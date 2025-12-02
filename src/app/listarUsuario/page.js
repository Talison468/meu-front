"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, IdCard, Calendar, Shield } from "lucide-react";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/usuario");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-black via-[#0b0f2a] to-purple-900 text-white">

      <h1 className="text-4xl font-extrabold text-center text-purple-300 drop-shadow-lg mb-10">
        👥 Lista de Usuários
      </h1>

      {loading ? (
        <p className="text-center text-purple-300 animate-pulse text-xl">
          Carregando usuários...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usuarios.map((user) => (
            <div
              key={user.id}
              className="
                bg-white/10 backdrop-blur-xl border border-purple-400/30
                shadow-[0_0_20px_rgba(150,0,255,0.5)]
                hover:shadow-[0_0_35px_rgba(150,0,255,0.9)]
                hover:scale-[1.03]
                transition-all duration-300
                rounded-2xl p-6
               "
            >
              <div className="flex items-center gap-3 mb-3">
                <User className="text-purple-300" size={28} />
                <h2 className="text-2xl font-bold text-purple-200">
                  {user.nome}
                </h2>
              </div>

              <div className="space-y-2 text-gray-200">
                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-purple-300" />
                  {user.email}
                </p>

                <p className="flex items-center gap-2">
                  <IdCard size={18} className="text-purple-300" />
                  {user.cpf}
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-purple-300" />
                  {user.telefone}
                </p>

                <p className="flex items-center gap-2">
                  <Shield size={18} className="text-purple-300" />
                  Tipo: {user.tipo}
                </p>

                <p className="flex items-center gap-2">
                  <Calendar size={18} className="text-purple-300" />
                  Nascimento:{" "}
                  {new Date(user.dataNascimento).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarUsuarios;
