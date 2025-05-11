import { FaBaby } from 'react-icons/fa'

export function Footer(){
    return(
        <div className='w-full flex items-center justify-center h-16 bg-background/95 drop-shadow '>
            <footer className='w-full h-auto border-t bg-blue-600 backdrop-blur-sm py-3 mt-16'>
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <FaBaby className="h-5 w-5 text-white" />
                      <p className="text-bg">© 2025 NeoGrow — Todos os direitos reservados.</p>
                    </div>
                    <div className="text-bg text-white">
                      Desenvolvido com por NeoGrow
                    </div>
                </div>
            </footer>
        </div>
    )
}

