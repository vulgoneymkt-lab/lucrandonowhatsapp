"use client"

import { useState, useEffect } from "react"
import { Trophy, TrendingUp, Calendar, DollarSign, Target, Star, Wallet, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { GameProgress } from "@/app/page"

interface ResultsScreenProps {
  gameProgress: GameProgress
  onViewWallet: () => void
}

export default function ResultsScreen({ gameProgress, onViewWallet }: ResultsScreenProps) {
  const [animatedEarnings, setAnimatedEarnings] = useState(0)

  const maxPossibleEarnings = 375 // Máximo possível para 4 clientes (ajustado)
  const satisfactionRate = Math.round((gameProgress.totalEarnings / maxPossibleEarnings) * 100)
  const monthlyEarnings = gameProgress.totalEarnings * 22 // 22 working days
  const weeklyEarnings = gameProgress.totalEarnings * 5 // 5 working days

  useEffect(() => {
    // Animate earnings counter
    const duration = 2000
    const steps = 60
    const increment = gameProgress.totalEarnings / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= gameProgress.totalEarnings) {
        setAnimatedEarnings(gameProgress.totalEarnings)
        clearInterval(timer)
      } else {
        setAnimatedEarnings(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [gameProgress.totalEarnings])

  const getPerformanceLevel = () => {
    if (satisfactionRate >= 90) return { level: "Excelente", color: "text-green-600", bg: "bg-green-100" }
    if (satisfactionRate >= 75) return { level: "Muito Bom", color: "text-blue-600", bg: "bg-blue-100" }
    if (satisfactionRate >= 60) return { level: "Bom", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "Regular", color: "text-red-600", bg: "bg-red-100" }
  }

  const performance = getPerformanceLevel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-x-hidden">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 px-2">Parabéns! 🎉</h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-4 px-4">Você atingiu sua cota de atendimento de hoje!</p>

          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block mb-4 mx-2">
            <p className="font-semibold text-sm sm:text-base text-center">
              ✨ Ao decorrer do tempo, mais clientes serão liberados por dia, resultando em MAIS GANHOS!
            </p>
          </div>

          <Badge className={`${performance.bg} ${performance.color} px-4 py-2 text-base sm:text-lg font-semibold`}>
            Desempenho: {performance.level}
          </Badge>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Clients Served */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-base sm:text-lg">Clientes Atendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{gameProgress.completedClients}/5</div>
              <p className="text-xs sm:text-sm text-gray-600">Meta diária: 4 clientes atingida!</p>
            </CardContent>
          </Card>

          {/* Daily Earnings */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-base sm:text-lg">Ganhos de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">R$ {animatedEarnings.toFixed(2)}</div>
              <p className="text-xs sm:text-sm text-gray-600">Excelente resultado!</p>
            </CardContent>
          </Card>

          {/* Performance Score */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-2" />
              <CardTitle className="text-base sm:text-lg">Nota do Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
                {(satisfactionRate / 10).toFixed(1)}/10
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Baseado nas suas respostas</p>
              <Progress value={satisfactionRate} className="w-full mt-2" />
            </CardContent>
          </Card>

          {/* Potential Earnings */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-base sm:text-lg">Ganho Máximo Possível</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
                R$ {maxPossibleEarnings.toFixed(2)}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {gameProgress.totalEarnings === maxPossibleEarnings ? "Perfeito!" : "Continue melhorando!"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Weekly Projection */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Projeção Semanal
              </CardTitle>
              <CardDescription className="text-blue-100 text-sm">Trabalhando de segunda a sexta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">R$ {weeklyEarnings.toFixed(2)}</div>
              <p className="text-blue-100 text-sm">Com o mesmo desempenho de hoje</p>
              <div className="mt-3 flex items-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Mais que 1 salário mínimo por semana!</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Projection */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Projeção Mensal
              </CardTitle>
              <CardDescription className="text-green-100 text-sm">22 dias úteis por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">R$ {monthlyEarnings.toFixed(2)}</div>
              <p className="text-green-100 text-sm">Trabalhando apenas 4 horas por dia!</p>
              <div className="mt-3 flex items-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Renda superior a muitos empregos CLT!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Opportunities */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 text-lg sm:text-xl">🚀 Próximos Níveis Desbloqueados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">Nível 2 - Próxima Semana</h4>
                <ul className="space-y-1 text-purple-600 text-xs sm:text-sm">
                  <li>• 6 clientes por dia</li>
                  <li>• R$ 350-450 por dia</li>
                  <li>• Novos nichos disponíveis</li>
                </ul>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">Nível 3 - Próximo Mês</h4>
                <ul className="space-y-1 text-purple-600 text-xs sm:text-sm">
                  <li>• 8 clientes por dia</li>
                  <li>• R$ 500-650 por dia</li>
                  <li>• Bônus por performance</li>
                </ul>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">Nível Expert</h4>
                <ul className="space-y-1 text-purple-600 text-xs sm:text-sm">
                  <li>• 10+ clientes por dia</li>
                  <li>• R$ 700+ por dia</li>
                  <li>• Comissões especiais</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Button */}
        <div className="text-center mb-6">
          <Button
            onClick={onViewWallet}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto animate-pulse"
          >
            <Wallet className="w-6 h-6 mr-2" />💰 VER MEU SALDO
          </Button>
        </div>

        {/* Footer Stats */}
        <div className="text-center text-gray-600 px-4">
          <p className="text-sm">
            🏆 Você faz parte dos <strong>{satisfactionRate >= 75 ? "20%" : "40%"}</strong> melhores atendentes!
            Continue assim e seus ganhos só vão <strong>AUMENTAR</strong>! 📈
          </p>
        </div>
      </div>
    </div>
  )
}
