"use client"

import type React from "react"

import { useEffect } from "react"
import { Search, MoreVertical, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { GameProgress } from "@/app/page"

interface WhatsAppBusinessProps {
  gameProgress: GameProgress
  setGameProgress: React.Dispatch<React.SetStateAction<GameProgress>>
  onClientSelect: (clientId: number) => void
  onAllClientsCompleted: () => void
}

export default function WhatsAppBusiness({
  gameProgress,
  setGameProgress,
  onClientSelect,
  onAllClientsCompleted,
}: WhatsAppBusinessProps) {
  // Check if all clients are completed
  useEffect(() => {
    if (gameProgress.clientsData.length > 0) {
      const completedCount = gameProgress.clientsData.filter((client) => client.responded).length
      if (completedCount >= 4) {
        setTimeout(() => {
          onAllClientsCompleted()
        }, 1000)
      }
    }
  }, [gameProgress.clientsData, onAllClientsCompleted])

  const getBusinessName = () => {
    switch (gameProgress.selectedNicho) {
      case "academia":
        return "Academia FitMax"
      case "clinica":
        return "Clínica Dental Sorrisos"
      default:
        return "WhatsApp Business"
    }
  }

  const handleClientClick = (clientId: number) => {
    const client = gameProgress.clientsData.find((c) => c.id === clientId)
    if (client && !client.responded) {
      setGameProgress((prev) => ({
        ...prev,
        currentClient: clientId,
      }))
      onClientSelect(clientId)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Mobile Layout */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-green-600 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-semibold text-sm sm:text-base">{getBusinessName()}</h1>
            <p className="text-xs sm:text-sm opacity-90">WhatsApp Business</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1 sm:p-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1 sm:p-2">
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Pesquisar ou começar nova conversa" className="pl-10 bg-gray-50 text-sm" />
          </div>
        </div>

        {/* Clients List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {gameProgress.clientsData
            .sort((a, b) => {
              // Clientes não respondidos primeiro, depois os respondidos
              if (a.responded === b.responded) {
                return a.id - b.id // Manter ordem original se mesmo status
              }
              return a.responded ? 1 : -1 // Não respondidos primeiro
            })
            .map((client) => (
              <div
                key={client.id}
                className={`p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  client.responded ? "opacity-60" : ""
                }`}
                onClick={() => handleClientClick(client.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={client.avatar || "/placeholder.svg"}
                      alt={client.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random&color=fff&size=128`
                      }}
                    />
                    {!client.responded && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    )}
                    {client.responded && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate pr-2">{client.name}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{client.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-gray-600 truncate pr-2">
                        {client.responded ? "Conversa finalizada" : client.lastMessage}
                      </p>
                      {!client.responded && (
                        <Badge className="bg-green-500 text-white text-xs flex-shrink-0">Nova</Badge>
                      )}
                      {client.responded && (
                        <Badge variant="outline" className="text-xs border-blue-500 text-blue-600 flex-shrink-0">
                          ✓ Respondido
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Status Bar */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Clientes Atendidos: {gameProgress.clientsData.filter((c) => c.responded).length}/4
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(gameProgress.clientsData.filter((c) => c.responded).length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content - Only show when no clients or all completed */}
        {gameProgress.clientsData.filter((c) => !c.responded).length === 0 && gameProgress.clientsData.length > 0 && (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10">
            <div className="text-center max-w-sm px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Parabéns!</h2>

              <p className="text-sm sm:text-base text-gray-600 mb-4">Você atingiu sua meta de hoje!</p>

              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">💰 Ganhos de Hoje</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  R$ {gameProgress.totalEarnings.toFixed(2)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Meta: R$ 250,00</p>
              </div>

              <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium text-sm sm:text-base">🎉 Todos os clientes foram atendidos!</p>
                <p className="text-green-600 text-xs sm:text-sm mt-1">
                  Aguarde o redirecionamento para ver seus resultados...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
