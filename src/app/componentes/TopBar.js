"use client";
import { Home, LogIn, PlusCircle } from "lucide-react";
import Link from "next/link";

function TopBar() {
  return <div className="fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300 bg-black bg-opacity-50 backdrop-blur-md shadow-md">
    <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

      {/* LOGO / HOME */}
      <Link href="/" passHref>
        <div className="flex items-center gap-2 cursor-pointer group">
          <Home
            size={22}
            className="text-purple-300 group-hover:text-purple-400 transition"
          />
          <span className="flex items-center gap-2 text-purple-300 hover:text-purple-200 cursor-pointer transition">
            Events Manager
          </span>
        </div>
      </Link>

      {/* CADASTRAR EVENTO */}
      <Link href="/evento/create" passHref>
        <div className="flex items-center gap-2 text-purple-300 hover:text-purple-200 cursor-pointer transition">
          <PlusCircle size={20} />
          <span className="font-medium">Cadastrar Evento</span>
        </div>
      </Link>

      {/* LOGIN */}
      <Link href="/login" passHref>
        <div className="flex items-center gap-2 text-purple-300 hover:text-purple-200 cursor-pointer transition">
          <LogIn size={20} />
          <span className="font-medium">Entrar</span>
        </div>
      </Link>

      {/* <renderEvent /> */}

    </div>
  </div>
}

export default TopBar;