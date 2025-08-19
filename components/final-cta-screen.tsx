"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { GameProgress } from "@/app/page"

interface FinalCTAScreenProps {
  gameProgress: GameProgress
}

interface PopupNotification {
  id: number
  name: string
  message: string
  show: boolean
}

export default function FinalCTAScreen({ gameProgress }: FinalCTAScreenProps) {
  const [popups, setPopups] = useState<PopupNotification[]>([])
  const [popupCounter, setPopupCounter] = useState(0)

  const fullNames = [
    "Mariana Silva",
    "Carlos Santos",
    "Ana Paula Costa",
    "Roberto Oliveira",
    "Fernanda Lima",
    "João Pereira",
    "Camila Rodrigues",
    "Pedro Almeida",
    "Juliana Ferreira",
    "Rafael Souza",
    "Beatriz Martins",
    "Lucas Barbosa",
    "Gabriela Ribeiro",
    "Thiago Carvalho",
    "Larissa Gomes",
    "Diego Nascimento",
    "Patrícia Araújo",
    "Marcelo Dias",
    "Vanessa Moreira",
    "André Cardoso",
    "Priscila Mendes",
    "Bruno Teixeira",
    "Carla Nunes",
    "Felipe Rocha",
    "Amanda Correia",
    "Rodrigo Pinto",
    "Daniela Castro",
    "Gustavo Ramos",
    "Renata Freitas",
    "Leandro Monteiro",
  ]

  const messages = [
    "garantiu agora o método e já pode começar a trabalhar hoje!",
    "entrou para a comunidade, garantiu o método e já pode começar a trabalhar hoje!",
  ]

  const handleCTAClick = () => {
    window.open("https://global.tribopay.com.br/vrzxr75nv7", "_blank")
  }

  const satisfactionRate = Math.round((gameProgress.totalEarnings / 375) * 100)

  // Sistema de popups com intervalo de 2-5 minutos
  useEffect(() => {
    const createPopup = () => {
      const randomName = fullNames[Math.floor(Math.random() * fullNames.length)]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      const newPopup: PopupNotification = {
        id: popupCounter,
        name: randomName,
        message: randomMessage,
        show: true,
      }

      setPopups((prev) => [...prev, newPopup])
      setPopupCounter((prev) => prev + 1)

      // Remove popup after 6 seconds
      setTimeout(() => {
        setPopups((prev) => prev.filter((popup) => popup.id !== newPopup.id))
      }, 6000)
    }

    // Create first popup after 30 seconds
    const firstTimeout = setTimeout(createPopup, 30000)

    // Create subsequent popups every 2-5 minutes (120000ms - 300000ms)
    const interval = setInterval(
      () => {
        createPopup()
      },
      Math.random() * 180000 + 120000, // 2-5 minutes (120000ms + 0-180000ms)
    )

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [popupCounter])

  const closePopup = (id: number) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 overflow-x-hidden relative">
      {/* Popups de Urgência */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {popups.map((popup) => (
          <div
            key={popup.id}
            className="bg-white rounded-lg shadow-xl p-4 max-w-sm animate-slide-in-right border-l-4 border-l-green-500"
            style={{
              animation: "slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 5.5s forwards",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{popup.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{popup.message}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Há poucos segundos</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => closePopup(popup.id)}
                className="p-1 h-auto text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto p-4 text-white">
        {/* Success Message */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">🎉 Saque Solicitado com Sucesso!</h1>
          <p className="text-lg text-purple-100 mb-2">
            Você acabou de experimentar como é ganhar R$ {gameProgress.totalEarnings.toFixed(2)} em poucas horas!
          </p>
          <p className="text-purple-200 text-sm">Agora imagine receber isso TODOS OS DIAS trabalhando de casa...</p>
        </div>

        {/* Main CTA Card */}
        <Card className="bg-white text-gray-900 mb-6">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-800">
              Quer Começar a Trabalhar Assim de Verdade?
            </h2>

            <p className="text-lg sm:text-xl mb-6 text-gray-700 text-center">
              Faça parte da nossa comunidade exclusiva que ganha{" "}
              <strong className="text-green-600">MAIS DE 1 SALÁRIO MÍNIMO POR SEMANA</strong> trabalhando no conforto de
              casa com apenas um celular, WhatsApp e internet!
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">🎁 O que você vai receber HOJE:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Um kit completo para começar a trabalhar ainda HOJE usando apenas seu celular e WhatsApp.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    A fórmula exata que centenas estão usando para fazer renda com atendimento por WhatsApp.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Modelos prontos para você só copiar e colar e parecer um profissional desde o primeiro cliente.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Um sistema de atendimento por WhatsApp que já está sendo usado por freelancers que estão ganhando
                    até R$4.000 por mês.
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">💰 Ganhe R$ 4.576,00 por mês!</p>
              <p className="text-gray-600">Trabalhando apenas 4 horas por dia de casa</p>
            </div>

            <div className="text-center mb-6">
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg sm:text-xl font-bold rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto animate-pulse"
              >
                🚀 QUERO COMEÇAR HOJE!
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>

            <p className="text-center text-red-600 font-semibold mb-4">
              ⚡ ÚLTIMAS VAGAS DISPONÍVEIS - Garante a sua agora antes que esgote!
            </p>

            <div className="text-center text-sm text-gray-600 mb-4">
              <p className="mb-2">✅ Sem mensalidades • ✅ Sem taxas ocultas • ✅ Garantia de 7 dias</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800 font-semibold">
                ⚠️ Se você ignorar isso, amanhã vai continuar reclamando da vida… com um celular na mão e a chance que
                jogou fora.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Stats */}
        <div className="text-center text-purple-100">
          <p className="text-sm">
            🏆 Você faz parte dos <strong>{satisfactionRate >= 75 ? "20%" : "40%"}</strong> melhores atendentes!
            Continue assim e seus ganhos só vão <strong>AUMENTAR</strong>! 📈
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
