"use client"

import Image from "next/image"
import minhaImagem from "@/assets/logo.jpg"
import { Container } from "@/components/container/Container"
import { Footer } from "@/components/footer/Footer"
import { ScrollUp } from "@/components/scrollup/ScrollUp"
import { CookieBanner } from "@/components/cookiebanner/CookieBanner"
import { useRouter } from "next/navigation"

export default function TermsPage() {
  const router = useRouter()

  const handleAccept = () => {
    router.push("/login")
  }

  const handleDecline = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Container>
        <div className="flex justify-center items-center flex-col gap-1 mt-5 md:mt-10">
          <Image
            src={minhaImagem}
            alt="Logo do Site"
            className="h-10 w-60"
            priority
          />
        </div>

        <main className="py-12 max-w-4xl mx-auto space-y-10">
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            Termos de Uso e Política de Privacidade
          </h1>
          <p className="text-sm text-center text-gray-500">Última atualização: Julho de 2025</p>

          <section className="space-y-6 text-justify leading-relaxed text-[1rem]">
            <p>
              Seja bem-vindo ao <strong>NeoGrow</strong>, uma aplicação de código aberto desenvolvida com o objetivo de auxiliar pais e responsáveis no acompanhamento do crescimento infantil por meio de dados visuais e informativos.
            </p>

            <h2 className="text-xl font-semibold text-blue-600">1. Sobre o NeoGrow</h2>
            <p>
              O <strong>NeoGrow</strong> é um projeto <strong>gratuito e open source</strong>, construído com fins <strong>educacionais e informativos</strong>, sem qualquer intenção comercial ou de monetização. O código-fonte está disponível no GitHub:
              <br />
              <a
                href="https://github.com/vinimdcruz/neogrow"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                github.com/vinimdcruz/neogrow
              </a>
            </p>

            <h2 className="text-xl font-semibold text-blue-600">2. Natureza Informativa</h2>
            <p>
              O NeoGrow <strong>não realiza diagnósticos médicos</strong> nem substitui o acompanhamento profissional de pediatras, nutricionistas ou outros profissionais de saúde. As informações exibidas são baseadas em dados públicos e estatísticos (como padrões da OMS), com finalidade exclusivamente educativa.
            </p>
            <p><strong>Sempre consulte um profissional de saúde</strong> para avaliações, dúvidas ou preocupações sobre o desenvolvimento da criança.</p>

            <h2 className="text-xl font-semibold text-blue-600">3. Responsabilidade do Usuário</h2>
            <p>Ao utilizar esta aplicação, você concorda em:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Utilizar os dados fornecidos com responsabilidade;</li>
              <li><b>Não tomar decisões médicas baseadas exclusivamente nas informações aqui apresentadas;</b></li>
              <li>Contribuir de forma ética e responsável, caso deseje colaborar com o projeto no GitHub.</li>
            </ul>

            <h2 className="text-xl font-semibold text-blue-600">4. Controle</h2>
            <p>
              O NeoGrow <strong>não compartilha dados pessoais</strong> dos usuários. A aplicação pode utilizar <strong>cookies funcionais</strong> apenas para melhorar a experiência do usuário (ex: manter preferências ou exibir avisos).
              <br />
              Nenhum dado é utilizado para fins comerciais ou de rastreamento. 
              <br />
              <b>Recomendamos utilizar apelidos e não inserir dados como documentos pessoais ou nomes completos.</b>
            </p>

            <h2 className="text-xl font-semibold text-blue-600">5. Cookies</h2>
            <p>
              Utilizamos cookies <strong>estritamente necessários</strong> para o funcionamento da interface e exibição do aviso de cookies. Não utilizamos cookies de terceiros, publicidade ou rastreamento.
            </p>

            <h2 className="text-xl font-semibold text-blue-600">6. Código Aberto e Licença</h2>
            <p>
              Este projeto está licenciado sob os termos da <strong>MIT License</strong>. Você pode usar, copiar, modificar e distribuir o código, desde que preserve os avisos de copyright.
              <br />
              Os desenvolvedores <strong>não se responsabilizam por qualquer uso indevido ou consequência decorrente</strong> da aplicação.
            </p>

            <h2 className="text-xl font-semibold text-blue-600">7. Limitação de Responsabilidade</h2>
            <p>
              Os criadores do NeoGrow não garantem precisão, disponibilidade ou confiabilidade dos dados fornecidos e não se responsabilizam por perdas ou danos relacionados ao uso da aplicação.
            </p>

            <h2 className="text-xl font-semibold text-blue-600">8. Alterações nos Termos</h2>
            <p>
              Estes termos poderão ser atualizados periodicamente. Alterações relevantes serão comunicadas na interface ou no repositório do GitHub.
            </p>

            <h2 className="text-xl font-semibold text-blue-600">9. Contato</h2>
            <p>
              Por se tratar de um projeto comunitário, dúvidas e sugestões podem ser encaminhadas via GitHub:
              <br />
              <a
                href="https://github.com/vinimdcruz/neogrow"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                github.com/vinimdcruz/neogrow
              </a>
            </p>

            <p className="font-semibold text-center mt-10">
              Ao utilizar o NeoGrow, você declara estar ciente e de acordo com todos os termos acima.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
              <button
                onClick={handleAccept}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Eu aceito e quero continuar
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-lg bg-red-700 text-white font-medium hover:bg-red-400 transition duration-200 cursor-pointer"
              >
                Não aceito e quero sair do App
              </button>
            </div>
          </section>
        </main>
      </Container>

      <ScrollUp />
      <Footer />
      <CookieBanner />
    </div>
  )
}
