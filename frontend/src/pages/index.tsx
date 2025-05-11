"use client"

import { Header } from "@/components/header/Header"
import { Container } from "@/components/container/Container"
import { FaBaby, FaGithub, FaChartLine, FaBell, FaChartBar } from "react-icons/fa"
import { Footer } from "@/components/footer/Footer"

export default function Main() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Container>
        <main className="flex-1 pt-32 pb-24">
          {/* Hero Section */}
          <section className="w-full mb-32">
            <div className="grid gap-12 lg:grid-cols-2 items-center ">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-3xl text-center md:text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Neo<span className="text-green-600">Grow</span> API
                  </h2>
                </div>
                <p className="text-xl text-gray-600 max-w-xl text-center md:text-left">
                  Backend com FastAPI para acompanhamento do crescimento de bebês com insights personalizados.
                </p>
                <div className="flex flex-wrap gap-4 justify-center items-center md:justify-start md:items-start">
                  <a
                    href="https://github.com/vinimdcruz/neogrow"
                    target="_blank"
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-8 py-3 text-white shadow-lg"
                    rel="noreferrer"
                  >
                    <FaGithub className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center rounded-lg border-2 border-blue-500 bg-transparent hover:bg-blue-50 px-8 py-3 text-blue-600"
                  >
                    Explorar
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-400 p-8 shadow-2xl bg-white backdrop-blur-sm hover:translate-y-[-5px]">
                <h3 className="text-2xl font-bold mb-4">Acompanhamento Inteligente</h3>
                <p className="text-gray-600 mb-8">
                  Monitore o crescimento com precisão e receba insights baseados em métricas de crescimento.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaChartLine className="h-6 w-6 text-blue-600" />,
                      title: "Curvas de Crescimento",
                      desc: "Acompanhamento para bebês",
                    },
                    {
                      icon: <FaBell className="h-6 w-6 text-blue-600" />,
                      title: "Alertas",
                      desc: "Baseados em métricas de saúde",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-5 p-4 rounded-xl hover:bg-blue-50">
                      <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 shadow-md">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full pt-16">
            <div className="text-center mb-16">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm text-blue-700 font-medium mb-4">
                Recursos
              </span>
              <h2 className="text-3xl font-bold mb-4">Funcionalidades</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ferramentas para acompanhar o desenvolvimento do seu bebê
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <FaBaby className="h-6 w-6 text-blue-600" />,
                  title: "Cadastro",
                  desc: "Registro seguro das informações",
                },
                {
                  icon: <FaChartLine className="h-6 w-6 text-blue-600" />,
                  title: "Curvas",
                  desc: "Para análise de crescimento",
                },
                {
                  icon: <FaBell className="h-6 w-6 text-blue-600" />,
                  title: "Alertas",
                  desc: "Notificações sobre marcos importantes",
                },
                {
                  icon: <FaChartBar className="h-6 w-6 text-blue-600" />,
                  title: "Visualização",
                  desc: "Gráficos e insights de dados",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-8 border border-blue-400 rounded-2xl shadow-xl bg-white hover:shadow-blue-500/10 hover:translate-y-[-10px]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shadow-md mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full mt-32 py-16 px-8 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Acompanhe o crescimento do seu bebê hoje</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-blue-100">
              Acesse nossa API e integre com sua aplicação para melhor acompanhamento.
            </p>
            <div className="hover:scale-105">
              <a
                href="https://github.com/vinimdcruz/neogrow"
                target="_blank"
                className="inline-flex items-center rounded-lg bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 shadow-lg"
                rel="noreferrer"
              >
                <FaGithub className="h-5 w-5 mr-2" />
                Ver no GitHub
              </a>
            </div>
          </section>
        </main>
      </Container>
      <Footer />
    </div>
  )
}
