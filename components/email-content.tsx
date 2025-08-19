"use client"

import { ArrowLeft, Star, Archive, Trash2, Reply, Forward, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmailContentProps {
  onCTAClick: () => void
}

export default function EmailContent({ onCTAClick }: EmailContentProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl sm:text-2xl font-bold">Yahoo</div>
        </div>
      </div>

      {/* Email Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Email Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <Button variant="ghost" size="sm" className="self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Archive className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
            TRABALHE EM CASA COM WHATSAPP E GANHE R$250+ POR DIA
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-2">
            <div className="break-all sm:break-normal">
              <span className="font-medium">De:</span> Oportunidades de Trabalho Online
              &lt;vagas@trabalhoremoto.com.br&gt;
            </div>
            <div className="flex-shrink-0">há 2 horas</div>
          </div>
        </div>

        {/* Email Body */}
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-lg mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              🏠 VAGA DISPONÍVEL - ATENDENTE WHATSAPP HOME OFFICE
            </h2>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base">
              <p>
                <strong>Olá!</strong> Temos uma oportunidade incrível para você trabalhar no conforto da sua casa!
              </p>

              <p>
                Estamos contratando <strong>Atendentes via WhatsApp</strong> para trabalhar em regime home office. É uma
                oportunidade real de ganhar entre <strong>R$ 250 a R$ 350 por dia</strong>, podendo chegar a
                <strong> mais de R$ 400 diários</strong> conforme sua performance.
              </p>

              <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-green-700 mb-2 text-sm sm:text-base">💰 GANHOS DIÁRIOS:</h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>
                    • <strong>Iniciante:</strong> R$ 250 - R$ 350 por dia
                  </li>
                  <li>
                    • <strong>Experiente:</strong> R$ 350 - R$ 400+ por dia
                  </li>
                  <li>
                    • <strong>Pagamento:</strong> Diário via PIX
                  </li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base">⏰ HORÁRIOS:</h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>
                    • <strong>Mínimo:</strong> 4 horas por dia
                  </li>
                  <li>
                    • <strong>Flexibilidade:</strong> Você escolhe seu horário
                  </li>
                  <li>
                    • <strong>Dias:</strong> Segunda a Sexta (fins de semana opcionais)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-700 mb-2 text-sm sm:text-base">📱 REQUISITOS:</h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>• Celular com WhatsApp</li>
                  <li>• Internet estável</li>
                  <li>• Disponibilidade mínima de 4h/dia</li>
                  <li>• Boa comunicação escrita</li>
                </ul>
              </div>

              <p>
                <strong>O QUE VOCÊ VAI FAZER:</strong> Responder clientes via WhatsApp de empresas parceiras, tirar
                dúvidas, fazer agendamentos e dar suporte. É simples, prático e muito lucrativo!
              </p>

              <p>
                <strong>TREINAMENTO INCLUÍDO:</strong> Fornecemos todo o material e treinamento necessário para você
                começar a trabalhar imediatamente.
              </p>

              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium text-sm sm:text-base">
                  ⚡ <strong>VAGAS LIMITADAS!</strong> Temos apenas algumas posições disponíveis. Garante já a sua vaga
                  antes que esgote!
                </p>
              </div>

              <p className="text-center font-medium">
                <strong>Pronto para começar a ganhar dinheiro trabalhando de casa?</strong>
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-6">
            <Button
              onClick={onCTAClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              🚀 QUERO TRABALHAR COM O WHATSAPP
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">
            <p>Responda rapidamente - vagas limitadas!</p>
          </div>
        </div>

        {/* Email Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Reply className="w-4 h-4 mr-2" />
            Responder
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Forward className="w-4 h-4 mr-2" />
            Encaminhar
          </Button>
        </div>
      </div>
    </div>
  )
}
