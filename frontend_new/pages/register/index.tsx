import { FormEvent, useState } from "react"

import Image from 'next/image';
import minhaImagem from '@/assets/logo.jpg'
import Link from "next/link"
import { Container } from "@/components/container/Container"

import { Input } from "@/components/input/Input"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório."),
  email: z.string().email("Insira um e-mail válido").nonempty("O campo e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").nonempty("O campo senha é obrigatório.")
})

type FormData = z.infer<typeof schema>


export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
    })

    function onSubmit(data: FormData){
      console.log(data);
    }

    return (
    <Container>
          <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
            <Link href="/">
              <Image
                src={minhaImagem}
                alt="Logo do Site"
                className="h-60 w-50 mb-3"
              />
            </Link>

            <form
              className="bg-white max-w-xl w-full rounded-lg p-4"
              onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <Input 
                    type="text"
                    placeholder="Digite seu nome completo"
                    name="name"
                    error={errors.name?.message}
                    register={register}
                  />
                </div>

                <div className="mb-3">
                  <Input 
                    type="email"
                    placeholder="Digite seu e-mail"
                    name="email"
                    error={errors.email?.message}
                    register={register}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    name="password"
                    error={errors.password?.message}
                    register={register}
                  />
                </div>

              <button type="submit" className="w-full h-10 bg-blue-600 rounded-md text-white hover:bg-blue-700 cursor-pointer">
                Cadastrar  
              </button>    
            </form>
            
            <Link href="/login" className="cursor-pointer hover:text-blue-600 transition-colors duration-300">
              Já tem uma conta? Faça login.
            </Link>

          </div>
    </Container>
  )
}
