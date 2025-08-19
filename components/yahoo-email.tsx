"use client"

import { Search, Settings, User, ChevronDown, Star, Archive, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface YahooEmailProps {
  onEmailClick: () => void
}

export default function YahooEmail({ onEmailClick }: YahooEmailProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="text-xl sm:text-2xl font-bold">Yahoo</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:underline text-sm">
              Mail
            </a>
            <a href="#" className="hover:underline text-sm">
              News
            </a>
            <a href="#" className="hover:underline text-sm">
              Finance
            </a>
            <a href="#" className="hover:underline text-sm">
              Sports
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Mail Interface */}
      <div className="flex flex-col sm:flex-row min-h-screen">
        {/* Sidebar - Hidden on mobile, shown on larger screens */}
        <div className="hidden sm:block w-64 bg-gray-50 border-r border-gray-200 p-4">
          <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-sm">Escrever</Button>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-blue-100 rounded text-blue-700 font-medium text-sm">
              <span>Caixa de entrada</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">1</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
              <Star className="w-4 h-4 mr-2" />
              <span>Com estrela</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
              <Archive className="w-4 h-4 mr-2" />
              <span>Arquivo</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer text-sm">
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Lixeira</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <input type="checkbox" className="rounded" />
              <ChevronDown className="w-4 h-4" />
              <div className="flex space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                  Arquivar
                </Button>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                  Excluir
                </Button>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                  Spam
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Input placeholder="Pesquisar no email" className="text-sm flex-1 sm:w-48" />
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            <div
              className="flex items-center p-3 sm:p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={onEmailClick}
            >
              <input type="checkbox" className="mr-3 sm:mr-4 rounded flex-shrink-0" />
              <Star className="w-4 h-4 mr-3 sm:mr-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    Oportunidades de Trabalho Online
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">há 2 horas</div>
                </div>
                <div className="text-sm font-medium text-gray-700 mt-1">
                  TRABALHE EM CASA COM WHATSAPP E GANHE R$250+ POR DIA
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                  Vaga disponível para atendimento via WhatsApp. Trabalhe no conforto da sua casa e ganhe até R$400 por
                  dia...
                </div>
              </div>
            </div>

            {/* Placeholder emails */}
            <div className="flex items-center p-3 sm:p-4 border-b border-gray-200 opacity-50">
              <input type="checkbox" className="mr-3 sm:mr-4 rounded flex-shrink-0" />
              <Star className="w-4 h-4 mr-3 sm:mr-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <div className="text-gray-600 text-sm sm:text-base truncate">Newsletter Semanal</div>
                  <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">ontem</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                  Confira as principais notícias da semana...
                </div>
              </div>
            </div>

            <div className="flex items-center p-3 sm:p-4 border-b border-gray-200 opacity-50">
              <input type="checkbox" className="mr-3 sm:mr-4 rounded flex-shrink-0" />
              <Star className="w-4 h-4 mr-3 sm:mr-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <div className="text-gray-600 text-sm sm:text-base truncate">Promoções Especiais</div>
                  <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">2 dias atrás</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                  Aproveite nossas ofertas exclusivas...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
