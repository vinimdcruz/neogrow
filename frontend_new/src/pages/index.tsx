"use client";


import { Header } from "@/components/header/Header"
import { Container } from "@/components/container/Container"
import {
  FaBaby,
  FaGithub,
  FaChartLine,
  FaBell,
  FaChartBar
} from 'react-icons/fa'

export default function Main() {
  return (
    <>
      <Header />
      <Container>
        <main className="flex-1">

          {/* Hero Section */}
          <section className="w-full py-40">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">
                  Cuidados para seu bebê 👶
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  NeoGrow API
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Backend com FastAPI para auxiliar pais de bebês no acompanhamento do crescimento.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/vinimdcruz/neogrow"
                    target="_blank"
                    className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 transition px-8 py-2.5 text-sm font-medium text-white"
                  >
                    <FaGithub className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-gray-300 p-6 shadow-lg bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold mb-2">Acompanhamento Inteligente</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Monitore o crescimento com precisão e receba insights personalizados.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: <FaChartLine className="h-5 w-5 text-blue-600" />,
                      title: "Curvas de Crescimento",
                      desc: "Para bebês"
                    },
                    {
                      icon: <FaBell className="h-5 w-5 text-blue-600" />,
                      title: "Alertas Personalizados",
                      desc: "Baseados em métricas de saúde"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full">
            <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <FaBaby className="h-5 w-5 text-blue-600" />,
                  title: "Cadastro de Dados",
                  desc: "Registro detalhado do bebê"
                },
                {
                  icon: <FaChartLine className="h-5 w-5 text-blue-600" />,
                  title: "Curvas de Crescimento",
                  desc: "Específicas para prematuros"
                },
                {
                  icon: <FaBell className="h-5 w-5 text-blue-600" />,
                  title: "Alertas",
                  desc: "Notificações personalizadas"
                },
                {
                  icon: <FaChartBar className="h-5 w-5 text-blue-600" />,
                  title: "Visualização",
                  desc: "Gráficos e insights"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </Container>

      {/* Footer */}
        <footer className="w-full h-full border-t bg-blue-600 backdrop-blur-sm py-8 mt-16">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-2 text-white">
              <FaBaby className="h-5 w-5 text-white" />
              <p className="text-sm">© 2025 NeoGrow — Todos os direitos reservados.</p>
            </div>
          <div className="text-sm text-white">
            Desenvolvido com por NeoGrow
          </div>
        </div>
      </footer>

    </>
  )
}
