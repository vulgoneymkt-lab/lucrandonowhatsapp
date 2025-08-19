"use client"

import { useState } from "react"
import YahooEmail from "@/components/yahoo-email"
import EmailContent from "@/components/email-content"
import NichoSelection from "@/components/nicho-selection"
import WhatsAppBusiness from "@/components/whatsapp-business"
import ChatInterface from "@/components/chat-interface"
import ResultsScreen from "@/components/results-screen"
import WalletScreen from "@/components/wallet-screen"
import FinalCTAScreen from "@/components/final-cta-screen"

export type GameState = "yahoo" | "email" | "nicho" | "whatsapp" | "chat" | "results" | "wallet" | "final-cta"

export interface ClientData {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  responded: boolean
  questions: string[]
  responses: {
    text: string
    type: "correct" | "acceptable" | "wrong"
    value: number
  }[][]
  finalMessage: string
  earnings?: number // Ganhos reais do cliente
  completionTime?: string // Horário real de conclusão
}

export interface GameProgress {
  currentState: GameState
  selectedNicho: string
  currentClient: number
  clientsData: ClientData[]
  totalEarnings: number
  maxPossibleEarnings: number
  satisfactionRate: number
  completedClients: number
}

export default function FunilGamificado() {
  const [gameState, setGameState] = useState<GameState>("yahoo")
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    currentState: "yahoo",
    selectedNicho: "",
    currentClient: -1,
    clientsData: [],
    totalEarnings: 0,
    maxPossibleEarnings: 0,
    satisfactionRate: 0,
    completedClients: 0,
  })

  const initializeClientsData = (selectedNicho: string): ClientData[] => {
    const baseClients: ClientData[] = [
      {
        id: 1,
        name: "Maria Silva",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        lastMessage:
          selectedNicho === "academia"
            ? "Oi! Gostaria de saber sobre os planos da academia"
            : "Olá, preciso agendar uma consulta",
        time: "14:32",
        responded: false,
        questions:
          selectedNicho === "academia"
            ? [
                "Oi! Gostaria de saber sobre os planos da academia",
                "Qual o valor do plano mensal?",
                "Vocês têm aulas de pilates?",
                "Posso fazer uma visita hoje?",
              ]
            : [
                "Olá, preciso agendar uma consulta",
                "Vocês atendem no sábado?",
                "Qual o valor da limpeza?",
                "Posso remarcar para outro dia?",
              ],
        responses:
          selectedNicho === "academia"
            ? [
                [
                  {
                    text: "Olá Maria! Temos vários planos disponíveis!",
                    type: "correct",
                    value: 15,
                  },
                  { text: "Temos planos sim", type: "acceptable", value: 8 },
                  { text: "Sim", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Plano mensal custa R$ 89,90 com acesso completo",
                    type: "correct",
                    value: 20,
                  },
                  { text: "R$ 89,90 por mês", type: "acceptable", value: 12 },
                  { text: "É um pouco caro", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim! Temos pilates às terças e quintas às 18h",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Temos pilates sim", type: "acceptable", value: 10 },
                  { text: "Acho que temos", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Claro! Estamos abertos até 22h hoje",
                    type: "correct",
                    value: 17,
                  },
                  { text: "Pode vir hoje sim", type: "acceptable", value: 9 },
                  { text: "Talvez seja possível", type: "wrong", value: 0 },
                ],
              ]
            : [
                [
                  {
                    text: "Olá! Posso te ajudar com o agendamento",
                    type: "correct",
                    value: 15,
                  },
                  { text: "Posso agendar sim", type: "acceptable", value: 8 },
                  { text: "Vou ver", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim, atendemos sábados das 8h às 14h",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Atendemos sábado sim", type: "acceptable", value: 12 },
                  { text: "Não tenho certeza", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "A limpeza custa R$ 120 completa",
                    type: "correct",
                    value: 18,
                  },
                  { text: "R$ 120 a limpeza", type: "acceptable", value: 10 },
                  { text: "É um preço justo", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Claro! Posso remarcar sem problema",
                    type: "correct",
                    value: 17,
                  },
                  { text: "Pode remarcar sim", type: "acceptable", value: 9 },
                  { text: "Vou verificar", type: "wrong", value: 0 },
                ],
              ],
        finalMessage: "",
        earnings: 0,
        completionTime: "",
      },
      {
        id: 2,
        name: "João Santos",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        lastMessage:
          selectedNicho === "academia" ? "Bom dia! Vocês têm personal trainer?" : "Boa tarde, meu dente está doendo",
        time: "14:28",
        responded: false,
        questions:
          selectedNicho === "academia"
            ? [
                "Bom dia! Vocês têm personal trainer?",
                "Qual o valor por sessão?",
                "Posso agendar para amanhã?",
                "Vocês têm desconto para pacotes?",
              ]
            : [
                "Boa tarde, meu dente está doendo",
                "É urgência?",
                "Vocês atendem convênio?",
                "Quanto custa uma consulta?",
              ],
        responses:
          selectedNicho === "academia"
            ? [
                [
                  {
                    text: "Bom dia João! Sim, temos personal trainers qualificados",
                    type: "correct",
                    value: 16,
                  },
                  { text: "Temos personal sim", type: "acceptable", value: 9 },
                  { text: "Temos", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Cada sessão custa R$ 60 por 1 hora",
                    type: "correct",
                    value: 19,
                  },
                  { text: "R$ 60 por sessão", type: "acceptable", value: 11 },
                  { text: "É um pouco caro", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Posso verificar a agenda do personal",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Vou verificar", type: "acceptable", value: 10 },
                  { text: "Não sei se tem vaga", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim! Pacote de 10 sessões por R$ 500",
                    type: "correct",
                    value: 22,
                  },
                  { text: "Temos desconto sim", type: "acceptable", value: 13 },
                  { text: "Talvez tenha", type: "wrong", value: 0 },
                ],
              ]
            : [
                [
                  {
                    text: "Boa tarde João! Vamos te ajudar rapidamente",
                    type: "correct",
                    value: 16,
                  },
                  { text: "Vamos te ajudar", type: "acceptable", value: 9 },
                  { text: "Que situação", type: "wrong", value: 0 },
                ],
                [
                  { text: "Sim, é urgência! Posso encaixar você hoje às 16h", type: "correct", value: 25 },
                  { text: "É urgência sim", type: "acceptable", value: 15 },
                  { text: "Acho que é", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Atendemos vários convênios! Qual o seu?",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Atendemos convênio sim", type: "acceptable", value: 10 },
                  { text: "Não sei quais", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Consulta particular R$ 150. Convênio gratuito",
                    type: "correct",
                    value: 20,
                  },
                  { text: "R$ 150 particular", type: "acceptable", value: 12 },
                  { text: "É um pouco caro", type: "wrong", value: 0 },
                ],
              ],
        finalMessage: "",
        earnings: 0,
        completionTime: "",
      },
      {
        id: 3,
        name: "Ana Costa",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        lastMessage:
          selectedNicho === "academia"
            ? "Olá! Quero cancelar minha matrícula"
            : "Preciso de um orçamento para aparelho",
        time: "14:15",
        responded: false,
        questions:
          selectedNicho === "academia"
            ? [
                "Olá! Quero cancelar minha matrícula",
                "Qual o procedimento?",
                "Tem multa?",
                "Posso cancelar hoje mesmo?",
              ]
            : [
                "Preciso de um orçamento para aparelho",
                "Qual tipo vocês recomendam?",
                "Tem parcelamento?",
                "Quando posso começar?",
              ],
        responses:
          selectedNicho === "academia"
            ? [
                [
                  {
                    text: "Olá Ana! Posso te ajudar com o cancelamento",
                    type: "correct",
                    value: 14,
                  },
                  { text: "Posso ajudar sim", type: "acceptable", value: 7 },
                  { text: "Vou cancelar", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Você precisa vir pessoalmente com RG",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Tem que vir aqui", type: "acceptable", value: 10 },
                  { text: "Não sei", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Não tem multa com 30 dias de antecedência",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Não tem multa", type: "acceptable", value: 12 },
                  { text: "Tem multa sim", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Pode sim! Estamos abertos até 18h",
                    type: "correct",
                    value: 16,
                  },
                  { text: "Pode cancelar hoje", type: "acceptable", value: 8 },
                  { text: "Talvez seja possível", type: "wrong", value: 0 },
                ],
              ]
            : [
                [
                  {
                    text: "Olá Ana! Posso fazer seu orçamento",
                    type: "correct",
                    value: 14,
                  },
                  { text: "Posso fazer sim", type: "acceptable", value: 7 },
                  { text: "Vou ver", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Recomendo o aparelho fixo metálico",
                    type: "correct",
                    value: 22,
                  },
                  { text: "O metálico é bom", type: "acceptable", value: 14 },
                  { text: "Qualquer um serve", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim! Parcelamos em até 24x sem juros",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Tem parcelamento sim", type: "acceptable", value: 12 },
                  { text: "Não sei", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Podemos agendar para próxima semana",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Semana que vem", type: "acceptable", value: 10 },
                  { text: "Depois a gente vê", type: "wrong", value: 0 },
                ],
              ],
        finalMessage: "",
        earnings: 0,
        completionTime: "",
      },
      {
        id: 4,
        name: "Carlos Lima",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        lastMessage: selectedNicho === "academia" ? "Oi, vocês têm natação?" : "Bom dia! Quebrei um dente",
        time: "14:10",
        responded: false,
        questions:
          selectedNicho === "academia"
            ? [
                "Oi, vocês têm natação?",
                "Qual o horário das aulas?",
                "Precisa saber nadar?",
                "Tem aula para iniciantes?",
              ]
            : [
                "Bom dia! Quebrei um dente",
                "Vocês fazem restauração?",
                "Dói muito o procedimento?",
                "Quanto tempo demora?",
              ],
        responses:
          selectedNicho === "academia"
            ? [
                [
                  {
                    text: "Oi Carlos! Sim, temos piscina aquecida",
                    type: "correct",
                    value: 17,
                  },
                  { text: "Temos natação sim", type: "acceptable", value: 9 },
                  { text: "Temos", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Temos aulas às 7h, 9h, 15h e 17h",
                    type: "correct",
                    value: 21,
                  },
                  { text: "Manhã e tarde", type: "acceptable", value: 13 },
                  { text: "Vários horários", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Não precisa! Temos aulas para iniciantes",
                    type: "correct",
                    value: 19,
                  },
                  { text: "Não precisa saber", type: "acceptable", value: 11 },
                  { text: "Acho que não", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim! Turma específica às 9h da manhã",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Tem para iniciantes", type: "acceptable", value: 10 },
                  { text: "Tem sim", type: "wrong", value: 0 },
                ],
              ]
            : [
                [
                  {
                    text: "Bom dia Carlos! Vamos resolver rapidamente",
                    type: "correct",
                    value: 17,
                  },
                  { text: "Vamos ajudar", type: "acceptable", value: 9 },
                  { text: "Que problema", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim, fazemos! Vou agendar urgente",
                    type: "correct",
                    value: 23,
                  },
                  { text: "Fazemos restauração", type: "acceptable", value: 15 },
                  { text: "Fazemos sim", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Usamos anestesia, não sentirá dor",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Não dói, usamos anestesia", type: "acceptable", value: 12 },
                  { text: "Dói um pouquinho", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Cerca de 1 hora, fica perfeito!",
                    type: "correct",
                    value: 19,
                  },
                  { text: "Umas 1 hora", type: "acceptable", value: 11 },
                  { text: "Demora bastante", type: "wrong", value: 0 },
                ],
              ],
        finalMessage: "",
        earnings: 0,
        completionTime: "",
      },
      {
        id: 5,
        name: "Fernanda Oliveira",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        lastMessage:
          selectedNicho === "academia" ? "Boa tarde! Vocês têm aulas de dança?" : "Olá, preciso fazer um canal",
        time: "14:05",
        responded: false,
        questions:
          selectedNicho === "academia"
            ? [
                "Boa tarde! Vocês têm aulas de dança?",
                "Que tipos de dança vocês oferecem?",
                "Qual o valor das aulas?",
                "Posso fazer uma aula experimental?",
              ]
            : [
                "Olá, preciso fazer um canal",
                "Dói muito o procedimento?",
                "Quanto tempo leva para cicatrizar?",
                "Preciso voltar para revisão?",
              ],
        responses:
          selectedNicho === "academia"
            ? [
                [
                  {
                    text: "Boa tarde Fernanda! Sim, temos várias modalidades",
                    type: "correct",
                    value: 16,
                  },
                  { text: "Temos aulas de dança", type: "acceptable", value: 9 },
                  { text: "Temos", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Oferecemos zumba, salão, ballet e dança do ventre",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Vários tipos", type: "acceptable", value: 12 },
                  { text: "Algumas modalidades", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "R$ 45 cada ou R$ 150 mensal ilimitado",
                    type: "correct",
                    value: 18,
                  },
                  { text: "R$ 45 por aula", type: "acceptable", value: 10 },
                  { text: "É um pouco caro", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Claro! Oferecemos aula experimental gratuita",
                    type: "correct",
                    value: 19,
                  },
                  { text: "Pode fazer experimental", type: "acceptable", value: 11 },
                  { text: "Talvez seja possível", type: "wrong", value: 0 },
                ],
              ]
            : [
                [
                  {
                    text: "Olá Fernanda! Fazemos canal com prioridade",
                    type: "correct",
                    value: 16,
                  },
                  { text: "Fazemos canal sim", type: "acceptable", value: 9 },
                  { text: "Vamos ver", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Com anestesia adequada não sentirá dor",
                    type: "correct",
                    value: 22,
                  },
                  { text: "Não dói, usamos anestesia", type: "acceptable", value: 14 },
                  { text: "Dói um pouco", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Cicatrização completa em 1 semana",
                    type: "correct",
                    value: 20,
                  },
                  { text: "Cerca de 1 semana", type: "acceptable", value: 12 },
                  { text: "Demora bastante", type: "wrong", value: 0 },
                ],
                [
                  {
                    text: "Sim, revisão em 7 dias é importante",
                    type: "correct",
                    value: 18,
                  },
                  { text: "Precisa voltar sim", type: "acceptable", value: 10 },
                  { text: "Não precisa", type: "wrong", value: 0 },
                ],
              ],
        finalMessage: "",
        earnings: 0,
        completionTime: "",
      },
    ]

    return baseClients
  }

  const updateGameState = (newState: GameState, updates?: Partial<GameProgress>) => {
    setGameState(newState)
    if (updates) {
      // Se está mudando para whatsapp e tem nicho selecionado, inicializar clientes
      if (newState === "whatsapp" && updates.selectedNicho && !gameProgress.clientsData.length) {
        const initializedClients = initializeClientsData(updates.selectedNicho)
        setGameProgress((prev) => ({
          ...prev,
          currentState: newState,
          clientsData: initializedClients,
          ...updates,
        }))
      } else {
        setGameProgress((prev) => ({
          ...prev,
          currentState: newState,
          ...updates,
        }))
      }
    } else {
      setGameProgress((prev) => ({
        ...prev,
        currentState: newState,
      }))
    }
  }

  const renderCurrentScreen = () => {
    switch (gameState) {
      case "yahoo":
        return <YahooEmail onEmailClick={() => updateGameState("email")} />
      case "email":
        return <EmailContent onCTAClick={() => updateGameState("nicho")} />
      case "nicho":
        return <NichoSelection onNichoSelect={(nicho) => updateGameState("whatsapp", { selectedNicho: nicho })} />
      case "whatsapp":
        return (
          <WhatsAppBusiness
            gameProgress={gameProgress}
            setGameProgress={setGameProgress}
            onClientSelect={(clientId) => updateGameState("chat", { currentClient: clientId })}
            onAllClientsCompleted={() => updateGameState("results")}
          />
        )
      case "chat":
        return (
          <ChatInterface
            gameProgress={gameProgress}
            onChatComplete={(updatedProgress) => {
              setGameProgress(updatedProgress)
              updateGameState("whatsapp")
            }}
          />
        )
      case "results":
        return <ResultsScreen gameProgress={gameProgress} onViewWallet={() => updateGameState("wallet")} />
      case "wallet":
        return <WalletScreen gameProgress={gameProgress} onWithdraw={() => updateGameState("final-cta")} />
      case "final-cta":
        return <FinalCTAScreen gameProgress={gameProgress} />
      default:
        return <YahooEmail onEmailClick={() => updateGameState("email")} />
    }
  }

  return <div className="min-h-screen bg-gray-100">{renderCurrentScreen()}</div>
}
