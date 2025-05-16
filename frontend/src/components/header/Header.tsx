import Image from 'next/image';
import minhaImagem from '@/assets/logo.jpg'
import Link from "next/link"
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import { FaLock } from 'react-icons/fa'

export function Header(){
    const signed = false;
    const loadingAuth = false;


    return(
        <div className='w-full flex items-center justify-center h-16 bg-background/95 drop-shadow mb-4 sticky top-0 z-200'>
            <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>
                <Link href="/">
                    <div className='flex items-center gap-2'>
                        <Image 
                            src={minhaImagem}
                            alt="Logotipo" 
                            className="h-7 w-35"/>
                    </div>
                </Link>

                    <div className="ml-auto flex items-right gap-3">
                        {!loadingAuth && signed && (
                            <Link href="/">
                            <button className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-8 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                                <FiLogIn className="h-4 w-4 mr-2" />
                                Sair
                            </button>
                            </Link>
                        )}

                        {!loadingAuth && !signed && (
                            <>
                            <Link href="/login">
                                <button className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-8 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                                <FaLock className="h-4 w-4 mr-2" />
                                Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-6 py-2 text-sm font-medium shadow-sm cursor-pointer hover:text-blue-600 transition-colors duration-300">
                                <FiUserPlus className="h-4 w-4 mr-2" />
                                Registrar
                                </button>
                            </Link>
                            </>
                        )}
                    </div>
            </header>
        </div>
    )
}

