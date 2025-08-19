"use client"

import { useState } from "react"
import { ArrowLeft, DollarSign, TrendingUp, Calendar, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { GameProgress } from "@/app/page"

interface WalletScreenProps {
  gameProgress: GameProgress
  onWithdraw: () => void
}

export default function WalletScreen({ gameProgress, onWithdraw }: WalletScreenProps) {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)

  // Filtrar apenas clientes respondidos e com earnings definidos
  const respondedClients = gameProgress.clientsData.filter(
    (client) => client.responded && client.earnings !== undefined && client.earnings > 0,
  )

  console.log("Clientes respondidos:", respondedClients)
  console.log("Total earnings do gameProgress:", gameProgress.totalEarnings)

  const currentTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  const handleWithdrawClick = () => {
    setShowWithdrawForm(true)
  }

  const handleWithdrawSubmit = () => {
    if (withdrawAmount && Number.parseFloat(withdrawAmount) > 0) {
      onWithdraw()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-x-hidden">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Minha Carteira</h1>
            <div className="w-6"></div>
          </div>

          {/* Balance Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <div className="text-center">
              <p className="text-green-100 text-sm mb-1">Saldo Disponível</p>
              <p className="text-3xl font-bold mb-2">R$ {gameProgress.totalEarnings.toFixed(2)}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Hoje: +R$ {gameProgress.totalEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs text-green-100">Clientes Hoje</p>
              <p className="font-bold">{respondedClients.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs text-green-100">Média/Cliente</p>
              <p className="font-bold">
                R${" "}
                {respondedClients.length > 0
                  ? (gameProgress.totalEarnings / respondedClients.length).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Extrato de Hoje</h2>
            <Badge className="bg-green-100 text-green-800">{respondedClients.length} transações</Badge>
          </div>

          <div className="space-y-3">
            {respondedClients.length > 0 ? (
              respondedClients.map((client) => (
                <Card key={client.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500">Atendimento WhatsApp</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+R$ {(client.earnings || 0).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{client.completionTime || currentTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma transação encontrada</p>
                <p className="text-sm mt-2">Complete alguns atendimentos para ver o extrato</p>
              </div>
            )}

            {/* Summary Card */}
            {respondedClients.length > 0 && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Total do Dia</p>
                      <p className="text-sm text-gray-600">{respondedClients.length} atendimentos realizados</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">R$ {gameProgress.totalEarnings.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{currentTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {!showWithdrawForm ? (
            <Button
              onClick={handleWithdrawClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold animate-pulse"
            >
              <CreditCard className="w-5 h-5 mr-2" />💳 SACAR SALDO VIA PIX
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor para saque (máximo: R$ {gameProgress.totalEarnings.toFixed(2)})
                </label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={gameProgress.totalEarnings}
                  step="0.01"
                  className="text-lg text-center"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setWithdrawAmount((gameProgress.totalEarnings * 0.25).toFixed(2))}
                  className="text-sm"
                >
                  25%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setWithdrawAmount((gameProgress.totalEarnings * 0.5).toFixed(2))}
                  className="text-sm"
                >
                  50%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setWithdrawAmount(gameProgress.totalEarnings.toFixed(2))}
                  className="text-sm"
                >
                  100%
                </Button>
              </div>

              <Button
                onClick={handleWithdrawSubmit}
                disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold animate-pulse"
              >
                🚀 RECEBER VIA PIX
              </Button>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-3">
            💡 Saques processados instantaneamente • Taxa: R$ 0,00
          </p>
        </div>
      </div>
    </div>
  )
}
