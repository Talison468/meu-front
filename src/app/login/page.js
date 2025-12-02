"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 animate-fadeIn">
        
        <h2 className="text-4xl font-bold text-center mb-8 tracking-wide">
          Entrar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@gmail.com"
              required
              className="w-full bg-white/20 border border-white/30 px-3 py-3 rounded-lg outline-none focus:ring focus:ring-purple-400 text-white placeholder-gray-300"
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="text-sm font-semibold mb-1 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full bg-white/20 border border-white/30 px-3 py-3 rounded-lg outline-none focus:ring focus:ring-purple-400 text-white placeholder-gray-300"
            />
          </div>

          {/* BOTAO LOGIN */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg shadow-xl"
          >
            <LogIn size={22} />
            Entrar
          </button>

        </form>

        {/* LINK CADASTRO */}
        <p className="text-center text-sm mt-6">
          Não tem conta?{" "}
          <Link href="/cadastro" className="text-purple-300 underline hover:text-purple-200">
            Criar conta
          </Link>
        </p>

      </div>

    </div>
  );
}
