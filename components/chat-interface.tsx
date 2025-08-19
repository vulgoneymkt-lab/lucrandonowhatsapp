"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Phone, Video, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GameProgress, ClientData } from "@/app/page"

interface ChatInterfaceProps {
  gameProgress: GameProgress
  onChatComplete: (updatedProgress: GameProgress) => void
}

export default function ChatInterface({ gameProgress, onChatComplete }: ChatInterfaceProps) {
  const [currentClient, setCurrentClient] = useState<ClientData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<
    Array<{
      id: number
      text: string
      sender: "client" | "user"
      timestamp: string
      status?: "sending" | "sent" | "delivered" | "read"
    }>
  >([])
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [clientEarnings, setClientEarnings] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showEarningsNotification, setShowEarningsNotification] = useState(false)
  const [lastEarning, setLastEarning] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize current client
    const client = gameProgress.clientsData.find((c) => c.id === gameProgress.currentClient)
    if (client && client.questions && client.questions.length > 0) {
      setCurrentClient(client)
      // Reset state for new conversation
      setCurrentQuestionIndex(0)
      setMessages([])
      setIsTyping(false)
      setShowOptions(false)
      setClientEarnings(0)
      setCorrectAnswers(0)
      setShowEarningsNotification(false)
      setLastEarning(0)

      // Add first message
      const firstMessage = {
        id: 1,
        text: client.questions[0],
        sender: "client" as const,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        status: "read" as const,
      }
      setMessages([firstMessage])

      // Show options after a delay
      setTimeout(() => {
        setShowOptions(true)
      }, 1500)
    }
  }, [gameProgress.currentClient, gameProgress.clientsData])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const showEarningsAlert = (amount: number) => {
    if (amount > 0) {
      setLastEarning(amount)
      setShowEarningsNotification(true)
      setTimeout(() => {
        setShowEarningsNotification(false)
      }, 2000)
    }
  }

  const handleResponseSelect = (responseIndex: number) => {
    if (!currentClient) return

    const response = currentClient.responses[currentQuestionIndex][responseIndex]
    const userMessage = {
      id: messages.length + 1,
      text: response.text,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setShowOptions(false)

    // Update earnings and correct answers
    const newEarnings = clientEarnings + response.value
    setClientEarnings(newEarnings)

    if (response.type === "correct") {
      setCorrectAnswers((prev) => prev + 1)
    }

    // Show earnings notification
    showEarningsAlert(response.value)

    // Log para debug
    console.log(`Cliente ${currentClient.name} - Resposta selecionada:`, response)
    console.log(`Ganhos atuais do cliente: R$ ${newEarnings.toFixed(2)}`)

    // Show typing indicator after user message
    setTimeout(() => {
      setIsTyping(true)
    }, 800)

    // Random typing duration between 5-15 seconds
    const typingDuration = Math.random() * 10000 + 5000

    setTimeout(() => {
      setIsTyping(false)

      if (currentQuestionIndex < currentClient.questions.length - 1) {
        // Next question
        const nextQuestionIndex = currentQuestionIndex + 1
        const nextMessage = {
          id: messages.length + 2,
          text: currentClient.questions[nextQuestionIndex],
          sender: "client" as const,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          status: "read" as const,
        }

        setMessages((prev) => [...prev, nextMessage])
        setCurrentQuestionIndex(nextQuestionIndex)

        // Show options for next question
        setTimeout(() => {
          setShowOptions(true)
        }, 1000)
      } else {
        // Final message based on performance
        let finalMessage = ""
        const finalCorrectAnswers = correctAnswers + (response.type === "correct" ? 1 : 0)

        if (finalCorrectAnswers >= 3) {
          finalMessage =
            "Muito obrigado pelo excelente atendimento! Vocês são incríveis! Fiquei muito satisfeito com o suporte. Parabéns! 😊👏"
        } else if (finalCorrectAnswers >= 2) {
          finalMessage = "Obrigado pelo atendimento! Foi muito útil e esclarecedor."
        } else if (finalCorrectAnswers >= 1) {
          finalMessage = "Obrigado."
        } else {
          finalMessage = "Ok, obrigado. Esperava um atendimento melhor."
        }

        const finalMsg = {
          id: messages.length + 2,
          text: finalMessage,
          sender: "client" as const,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          status: "read" as const,
        }

        setMessages((prev) => [...prev, finalMsg])

        // Complete chat after final message
        setTimeout(() => {
          completeChat(newEarnings) // Passar os ganhos finais
        }, 3000)
      }
    }, typingDuration)
  }

  const completeChat = (finalEarnings: number) => {
    if (!currentClient) return

    // Update client as responded in the clientsData with real earnings and completion time
    const completionTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

    console.log(`Finalizando chat com ${currentClient.name}`)
    console.log(`Ganhos finais: R$ ${finalEarnings.toFixed(2)}`)

    const updatedClientsData = gameProgress.clientsData.map((client) =>
      client.id === currentClient.id
        ? {
            ...client,
            responded: true,
            earnings: finalEarnings, // Usar os ganhos finais calculados
            completionTime: completionTime,
          }
        : client,
    )

    console.log(
      "Cliente atualizado:",
      updatedClientsData.find((c) => c.id === currentClient.id),
    )

    const updatedProgress: GameProgress = {
      ...gameProgress,
      clientsData: updatedClientsData,
      totalEarnings: gameProgress.totalEarnings + finalEarnings,
      completedClients: gameProgress.completedClients + 1,
      currentClient: -1, // Reset current client
    }

    onChatComplete(updatedProgress)
  }

  if (!currentClient) return null

  return (
    <div className="h-screen bg-gray-100 flex flex-col relative overflow-hidden">
      {/* Earnings Notification */}
      {showEarningsNotification && lastEarning > 0 && (
        <div className="absolute top-16 right-2 sm:right-4 z-50 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span className="font-bold text-sm">R$ {lastEarning.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-green-600 text-white p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700 p-1 flex-shrink-0"
            onClick={() => onChatComplete(gameProgress)}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          <img
            src={currentClient.avatar || "/placeholder.svg"}
            alt={currentClient.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sm sm:text-base truncate">{currentClient.name}</h2>
            <p className="text-xs sm:text-sm opacity-90">{isTyping ? "digitando..." : "online"}</p>
          </div>
        </div>

        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-1">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs sm:max-w-sm px-3 py-2 rounded-lg ${
                message.sender === "user" ? "bg-green-500 text-white" : "bg-white text-gray-900 shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed break-words">{message.text}</p>
              <div
                className={`flex items-center justify-end mt-1 space-x-1 ${
                  message.sender === "user" ? "text-green-100" : "text-gray-500"
                }`}
              >
                <span className="text-xs">{message.timestamp}</span>
                {message.sender === "user" && <span className="text-xs">✓✓</span>}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 shadow-sm px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Response Options */}
      {showOptions && currentClient && (
        <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="mb-3">
            <Badge className="bg-blue-100 text-blue-800 text-xs">Escolha sua resposta:</Badge>
          </div>

          <div className="space-y-2">
            {currentClient.responses[currentQuestionIndex].map((response, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-3 hover:bg-gray-50 bg-transparent text-sm leading-relaxed"
                onClick={() => handleResponseSelect(index)}
              >
                <span className="break-words">{response.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Earnings Display */}
      <div className="bg-green-50 p-2 sm:p-3 border-t border-green-200 flex-shrink-0">
        <div className="text-center">
          <span className="text-green-700 font-medium text-sm">
            Ganhos nesta conversa: R$ {clientEarnings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
