"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData
      );

      // Se o login deu certo, redireciona (ajuste para onde quiser)
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.status === 401) {
        setErrors({ auth: "Email ou senha inválidos." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-black">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        {errors.auth && (
          <p className="text-red-500 text-center mb-3">{errors.auth}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
            {errors.senha && (
              <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
            )}
          </div>

          {/* Botão */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
