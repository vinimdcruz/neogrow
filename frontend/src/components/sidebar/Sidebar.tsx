import Link from "next/link";
import { FiHome, FiPlus, FiUsers } from "react-icons/fi";

export function Sidebar() {
  return (
    <aside className="hidden md:flex sticky top-30 flex-col w-60 h-[50rem] bg-white border border-gray-300 rounded-2xl shadow-md p-6 ml-8 mt-8">
      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
        >
          <FiHome />
          Dashboard
        </Link>

        <Link
          href="/registerbaby"
          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
        >
          <FiPlus />
          Registrar
        </Link>

        <Link
          href="/babiespage"
          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
        >
          <FiUsers />
          Lista de Registro
        </Link>
      </nav>
    </aside>
  );
}
