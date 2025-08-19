"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Users, Calendar, MessageSquare, Heart } from "lucide-react"

interface NichoSelectionProps {
  onNichoSelect: (nicho: string) => void
}

export default function NichoSelection({ onNichoSelect }: NichoSelectionProps) {
  const nichos = [
    {
      id: "academia",
      name: "Academia FitMax",
      description: "Responder clientes sobre planos, horários e agendamentos",
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      available: true,
      color: "bg-blue-500",
      earnings: "R$ 280-350/dia",
    },
    {
      id: "clinica",
      name: "Clínica Dental Sorrisos",
      description: "Atender pacientes sobre consultas e tratamentos",
      icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
      available: true,
      color: "bg-green-500",
      earnings: "R$ 250-320/dia",
    },
    {
      id: "restaurante",
      name: "Restaurante Sabor & Arte",
      description: "Atender pedidos e reservas de clientes",
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />,
      available: false,
      color: "bg-orange-500",
      earnings: "R$ 300-400/dia",
    },
    {
      id: "salao",
      name: "Salão Beleza Total",
      description: "Agendar serviços de beleza e estética",
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      available: false,
      color: "bg-pink-500",
      earnings: "R$ 270-380/dia",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-x-hidden">
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Escolha seu Nicho de Trabalho</h1>
          <p className="text-base sm:text-lg text-gray-600 px-2 mb-4">
            Selecione a área onde você se sente mais confortável para atender clientes
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full mx-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Treinamento incluído para o nicho escolhido</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {nichos.map((nicho) => (
            <Card
              key={nicho.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                nicho.available
                  ? "hover:shadow-xl cursor-pointer border-2 hover:border-blue-300"
                  : "opacity-60 cursor-not-allowed"
              }`}
              onClick={() => nicho.available && onNichoSelect(nicho.id)}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 ${nicho.color}`} />

              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 sm:p-3 rounded-lg ${nicho.color} text-white`}>{nicho.icon}</div>
                  {nicho.available ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Disponível
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs sm:text-sm">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Vagas Esgotadas
                    </Badge>
                  )}
                </div>

                <CardTitle className="text-lg sm:text-xl">{nicho.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{nicho.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Ganhos diários:</span>
                    <span className="text-base sm:text-lg font-bold text-green-600">{nicho.earnings}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Horário:</span>
                    <span className="text-sm text-gray-700">Flexível (4h mínimo)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Dificuldade:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                            star <= (nicho.id === "academia" ? 2 : nicho.id === "clinica" ? 3 : 4)
                              ? "bg-yellow-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {nicho.available && (
                    <Button
                      className="w-full mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                      onClick={() => onNichoSelect(nicho.id)}
                    >
                      Escolher este Nicho
                    </Button>
                  )}

                  {!nicho.available && (
                    <div className="text-center mt-3 sm:mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Todas as vagas foram preenchidas</p>
                      <p className="text-xs text-red-500 mt-1">Novas vagas em breve</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">💡 Dica Importante</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Cada nicho tem suas particularidades. Escolha aquele onde você se sente mais confortável para oferecer o
              melhor atendimento e maximizar seus ganhos!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
