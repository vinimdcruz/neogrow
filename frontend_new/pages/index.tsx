import { FormEvent, useState } from "react"
import Link from "next/link"

import { Button } from "../components/button/Button"
import { Input } from "../components/input/Input"
import { Label } from "../components/label/Label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!email.includes("@")) {
      newErrors.email = "Formato de email inválido"
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória"
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      console.log("Formulário enviado:", { email, password }) 
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={`mt-1 w-full px-3 py-2 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Campo Senha */}
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Link href="/forgetpass" className="text-xs text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full px-3 py-2 rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Botão de Login */}
          <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
