'use client';

import { useState } from 'react';
import Image from 'next/image';
import minhaImagem from '@/assets/logo.jpg';
import Link from "next/link";
import { FiUserPlus, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md'
import { FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export function Header() {
  const { signed, user, logout, loading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push('/');
  }

  function goToDashboard() {
    router.push('/dashboard');
  }

  if (loading) return null;

  return (
    <div className='w-full flex items-center justify-center h-16 bg-background/95 drop-shadow mb-4 sticky top-0 z-[200]'>
      <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>

        {/* Logo */}
        <Link href="/">
          <div className='flex items-center gap-2'>
            <Image
              src={minhaImagem}
              alt="Logotipo"
              className="h-7 w-auto"
            />
          </div>
        </Link>

        {/* Botão de menu em telas pequenas */}
        <button
          className="sm:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu - Responsivo */}
        <div className={`flex-col sm:flex-row sm:flex items-center gap-3 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent p-4 sm:p-0 shadow-md sm:shadow-none z-[199] transition-all duration-300 ${menuOpen ? 'flex' : 'hidden sm:flex'}`}>

          {signed && user ? (
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">
                <strong>Usuário: </strong><span className='text-blue-600'><strong>{user.email}</strong></span>
              </span>

              <button
                onClick={goToDashboard}
                className="w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300"
              >
                <MdDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300"
              >
                <FiLogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                  <FaLock className="h-4 w-4 mr-2" />
                  Login
                </button>
              </Link>

              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                  <FiUserPlus className="h-4 w-4 mr-2" />
                  Cadastrar-se
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
