"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Types
interface GameState {
  points: number
  badges: string[]
  preparation: number
  currentPage: number
  currentQuestion: number
  quizAnswers: Record<string, any>
  exerciseStep: number
  testimonialIndex: number
}

interface Badge {
  name: string
  icon: string
  description: string
}

interface QuizQuestion {
  title: string
  subtitle: string
  options?: Array<{
    text: string
    emoji: string
    points: number
  }>
  type?: string
  placeholder?: string
  points?: number
  badge?: string
}

interface Testimonial {
  name: string
  initial: string
  weeks: string
  level: string
  points: number
  result: string
  badges: string[]
  testimonial: string
}

// Data
const badges: Record<string, Badge> = {
  "primeira-missao": { name: "Primeira Missão", icon: "🏆", description: "Completou o quiz inicial" },
  autoconhecimento: { name: "Autoconhecimento", icon: "💪", description: "Avaliou histórico de exercícios" },
  "foco-objetivo": { name: "Foco no Objetivo", icon: "🎯", description: "Definiu preferência de parto" },
  "primeira-vitoria": { name: "Primeira Vitória", icon: "🏅", description: "Completou primeiro exercício" },
  pioneira: { name: "Pioneira", icon: "💎", description: "Uma das primeiras 100 alunas" },
}

const quizQuestions: QuizQuestion[] = [
  {
    title: "Essa é a sua primeira gestação?",
    subtitle: "Selecione uma opção abaixo para avançar",
    options: [
      { text: "Sim, é minha primeira gestação", emoji: "🤱", points: 10 },
      { text: "Já tive outra gestação", emoji: "👶", points: 10 },
    ],
  },
  {
    title: "Você já fez fisioterapia pélvica?",
    subtitle: "Escolha uma opção para avançar",
    options: [
      { text: "Sim, já fiz", emoji: "✅", points: 15 },
      { text: "Não, nunca fiz", emoji: "❌", points: 15 },
    ],
    badge: "autoconhecimento",
  },
  {
    title: "Qual é a sua idade?",
    subtitle: "Digite sua idade para personalizar seu plano",
    type: "input",
    placeholder: "Exemplo: 28",
    points: 10,
  },
  {
    title: "Se você pudesse escolher o seu parto, qual seria?",
    subtitle: "Escolha uma opção para avançar",
    options: [
      { text: "Parto normal", emoji: "🌱", points: 15 },
      { text: "Cesárea", emoji: "🏥", points: 15 },
      { text: "Não tenho preferência", emoji: "🤷‍♀️", points: 15 },
    ],
    badge: "foco-objetivo",
  },
  {
    title: "Você sente algum desconforto na gestação?",
    subtitle: "Pode marcar mais de uma opção",
    options: [
      { text: "Dor nas costas", emoji: "😣", points: 5 },
      { text: "Dor no pé da barriga", emoji: "🤰", points: 5 },
      { text: "Dor na região íntima", emoji: "😰", points: 5 },
      { text: "Dor no ciático", emoji: "⚡", points: 5 },
      { text: "Sem dores", emoji: "😊", points: 20 },
    ],
  },
  {
    title: "Sentiu sua energia cair na gestação?",
    subtitle: "Escolha uma opção para avançar",
    options: [
      { text: "Caiu muito, vivo cansada", emoji: "😴", points: 15 },
      { text: "Caiu um pouco", emoji: "😐", points: 15 },
      { text: "Estou normal", emoji: "🙂", points: 15 },
      { text: "Estou mais disposta na gravidez", emoji: "😄", points: 15 },
    ],
  },
  {
    title: "Você se sente estressada na gestação?",
    subtitle: "Escolha uma opção para avançar",
    options: [
      { text: "Muito estressada", emoji: "😰", points: 15 },
      { text: "Mais estressada que o normal", emoji: "😟", points: 15 },
      { text: "Estou tranquila", emoji: "😌", points: 15 },
    ],
  },
  {
    title: "Antes de engravidar você praticava exercício físico?",
    subtitle: "Escolha uma opção para avançar",
    options: [
      { text: "Sim, 5 vezes na semana", emoji: "💪", points: 15 },
      { text: "Sim, 2 a 3 vezes na semana", emoji: "🏃‍♀️", points: 15 },
      { text: "Não praticava", emoji: "👀", points: 15 },
    ],
  },
  {
    title: "Você está com quantas semanas de gestação?",
    subtitle: "Por favor, digite um número. Exemplo: 22 semanas",
    type: "input",
    placeholder: "Exemplo: 22",
    points: 10,
  },
  {
    title: "Você tem quantos minutos por dia livre para praticar Fisioterapia Pélvica em casa?",
    subtitle: "Os exercícios do Movimento Materno são feitos para você conseguir realizar em casa",
    options: [
      { text: "10-15 minutos (mínimo recomendado)", emoji: "⏱️", points: 15 },
      { text: "15-20 minutos", emoji: "⏰", points: 15 },
      { text: "+25 minutos", emoji: "⏳", points: 15 },
    ],
  },
]

const testimonials: Testimonial[] = [
  {
    name: "Jaqueline",
    initial: "J",
    weeks: "40 semanas",
    level: "Mestre",
    points: 2450,
    result: "Parto em 3 horas",
    badges: ["👑", "🌟", "🧠"],
    testimonial:
      "Fiz os exercícios, tive minha bebê com 40 semanas em apenas 3 horas de trabalho de parto! Foi incrível como me senti preparada.",
  },
  {
    name: "Marina Santos",
    initial: "M",
    weeks: "38 semanas",
    level: "Experiente",
    points: 1890,
    result: "Sem episiotomia",
    badges: ["💪", "🔋", "🏅"],
    testimonial:
      "O programa me deu muita confiança. Consegui um parto normal sem nenhum corte, foi exatamente como sonhei!",
  },
  {
    name: "Carolina Lima",
    initial: "C",
    weeks: "36 semanas",
    level: "Experiente",
    points: 1650,
    result: "Dores eliminadas",
    badges: ["🌟", "🧠", "🎯"],
    testimonial:
      "As dores nas costas e no ciático que me incomodavam sumiram completamente após 1 semana de exercícios.",
  },
]

const exerciseSteps = [
  {
    title: "Posição Inicial",
    description: "Deite-se confortavelmente de costas, joelhos flexionados",
    instruction: "Respire profundamente e relaxe todos os músculos",
    duration: 10,
  },
  {
    title: "Contração Suave",
    description: "Contraia gentilmente os músculos do assoalho pélvico",
    instruction: "Imagine que está segurando o xixi e pum ao mesmo tempo",
    duration: 15,
  },
  {
    title: "Relaxamento",
    description: "Relaxe completamente os músculos por alguns segundos",
    instruction: "Solte toda a tensão e respire naturalmente",
    duration: 10,
  },
]

export default function MovimentoMaterno() {
  const [gameState, setGameState] = useState<GameState>({
    points: 0,
    badges: [],
    preparation: 0,
    currentPage: 1,
    currentQuestion: 0,
    quizAnswers: {},
    exerciseStep: 0,
    testimonialIndex: 0,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationBadge, setCelebrationBadge] = useState<string>("")
  const [inputValue, setInputValue] = useState("")
  const [exerciseTimer, setExerciseTimer] = useState(0)
  const [isExerciseRunning, setIsExerciseRunning] = useState(false)
  const [offerTimer, setOfferTimer] = useState(23 * 3600 + 42 * 60 + 15)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Exercise timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isExerciseRunning && exerciseTimer > 0) {
      timer = setTimeout(() => {
        setExerciseTimer((prev) => prev - 1)
      }, 1000)
    } else if (isExerciseRunning && exerciseTimer === 0) {
      handleExerciseStepComplete()
    }

    return () => clearTimeout(timer)
  }, [exerciseTimer, isExerciseRunning])

  // Auto scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [gameState.currentPage])

  const updatePoints = (points: number) => {
    setGameState((prev) => ({ ...prev, points: prev.points + points }))
  }

  const addBadge = (badgeId: string) => {
    if (!gameState.badges.includes(badgeId)) {
      setGameState((prev) => ({
        ...prev,
        badges: [...prev.badges, badgeId],
        points: prev.points + 50,
      }))
      showBadgeCelebration(badgeId)
    }
  }

  const updatePreparation = (percentage: number) => {
    setGameState((prev) => ({ ...prev, preparation: percentage }))
  }

  const showBadgeCelebration = (badgeId: string) => {
    setCelebrationBadge(badgeId)
    setShowCelebration(true)
    createConfetti()
    setTimeout(() => setShowCelebration(false), 3000)
  }

  const createConfetti = () => {
    console.log("🎉 Confetti!")
  }

  const showPage = (pageNumber: number) => {
    setGameState((prev) => ({ ...prev, currentPage: pageNumber }))
  }

  const answerQuestion = (points: number, badge?: string) => {
    updatePoints(points)

    if (badge) {
      setTimeout(() => addBadge(badge), 500)
    }

    setTimeout(
      () => {
        setGameState((prev) => {
          const nextQuestion = prev.currentQuestion + 1
          if (nextQuestion < quizQuestions.length) {
            return { ...prev, currentQuestion: nextQuestion }
          } else {
            addBadge("primeira-missao")
            updatePreparation(25)
            setTimeout(() => showPage(3), 2000)
            return prev
          }
        })
      },
      badge ? 3500 : 1000,
    )
  }

  const startExercise = () => {
    setGameState((prev) => ({ ...prev, exerciseStep: 0 }))
    setIsExerciseRunning(true)
    setExerciseTimer(exerciseSteps[0].duration)
  }

  const handleExerciseStepComplete = () => {
    const nextStep = gameState.exerciseStep + 1
    if (nextStep < exerciseSteps.length) {
      setGameState((prev) => ({ ...prev, exerciseStep: nextStep }))
      setExerciseTimer(exerciseSteps[nextStep].duration)
    } else {
      setIsExerciseRunning(false)
      updatePoints(100)
      addBadge("primeira-vitoria")
      updatePreparation(40)

      setTimeout(() => {
        showPage(5)
      }, 3000)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = quizQuestions[gameState.currentQuestion]

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Game Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Movimento BoraParir</h1>
              <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full">💪 Fisio Pélvica</span>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <span className="text-lg">⭐</span>
              <span className="font-bold">{gameState.points} PP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Preparação para o Parto</span>
                <span className="text-sm text-gray-500">{gameState.preparation}/100</span>
              </div>
              <Progress value={gameState.preparation} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Badges Conquistados</span>
                <span className="text-sm text-gray-500">{gameState.badges.length}/10</span>
              </div>
              <Progress value={(gameState.badges.length / 10) * 100} className="h-3" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Últimos Badges:</span>
              <div className="flex gap-1">
                {gameState.badges.slice(-3).map((badgeId, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center shadow-lg border-2 border-yellow-300"
                  >
                    <span>{badges[badgeId]?.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

{/* PAGE 1: LANDING PAGE */}
{gameState.currentPage === 1 && (
  <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-2 md:p-4">
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          <img 
            src="https://nutricaoalimentos.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-28T180230.648.png" 
            alt="Movimento BoraParirrrrr" 
            className="max-w-full h-auto mx-auto"
          />
        </h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full inline-block mb-6">
          💪 FISIOTERAPIA PÉLVICA
        </div>
        ...
Essa abordagem:

Mantém a estrutura semântica original (o <h1> continua sendo o título principal)
Preserva as classes CSS originais do <h1>
Substitui apenas o texto por uma imagem, sem alterar a estrutura do componente
Adiciona classes para garantir que a imagem seja responsiva e centralizada
Isso deve funcionar corretamente na Vercel sem causar problemas de atualização.



está dando esse erro:

350 | <div className="min-h-screen bg-teal-50">
: ^^^
351 | {/* Game Header */}
352 | <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-50">
353 | <div className="max-w-4xl mx-auto">
`----
Caused by:
Syntax Error
Import trace for requested module:
./app/page.tsx

Build failed because of webpack errors
 ELIFECYCLE  Command failed with exit code 1.
Error: Command "pnpm run build" exited with 1
Exiting build container




Claude 3.7 Sonnet
O erro indica um problema de sintaxe no seu código. Vamos verificar a estrutura completa para identificar o que pode estar causando o erro.

O problema pode estar relacionado a um fechamento incorreto de tags, chaves ou parênteses. Vamos corrigir a parte específica da substituição da imagem e garantir que todas as tags estejam corretamente fechadas:

jsx
Copiar

{/* Page Content */}
<div className="min-h-screen">
  {/* PAGE 1: LANDING PAGE */}
  {gameState.currentPage === 1 && (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-2 md:p-4">
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <img 
              src="https://nutricaoalimentos.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-28T180230.648.png" 
              alt="Movimento BoraParirrrrr" 
              className="max-w-full h-auto mx-auto"
            />
          </h1>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-full inline-block mb-6">
            💪 FISIOTERAPIA PÉLVICA
          </div>
          <h2 className="text-3xl font-bold mb-6">
            Descubra seu Nível de Preparação Pélvica e Desbloqueie sua Jornada Rumo ao Parto dos Sonhos!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Fisio Pélvica para facilitar o parto: Você vai receber um Plano de fisio pélvica para ter um parto
            mais fácil.
          </p>
        </div>
      </div>
            <div className="max-w-4xl mx-auto px-4 py-16">
              <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 text-center mb-8">
                <CardContent className="space-y-6">
                  <div className="text-6xl">🎯</div>
                  <CardTitle className="text-2xl font-bold text-teal-800">MISSÃO: PARTO TRANQUILO</CardTitle>
                  <p className="text-lg text-gray-700">
                    Descubra em apenas 2 minutos se você está preparada para o parto e ganhe seu primeiro badge!
                  </p>

                  <Card className="p-6 shadow-lg">
                    <CardTitle className="font-bold text-lg mb-4">🏆 Recompensas por Participar:</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl mb-2">⭐</div>
                        <p className="text-sm">
                          <strong>150 Pontos PP</strong>
                          <br />
                          Por completar avaliação
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">🏅</div>
                        <p className="text-sm">
                          <strong>3 Badges Exclusivos</strong>
                          <br />
                          Conquistas especiais
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <p className="text-sm">
                          <strong>Plano Personalizado</strong>
                          <br />
                          Baseado no seu perfil
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Button
                    onClick={() => {
                      setIsLoading(true)
                      updatePoints(10)
                      setTimeout(() => {
                        setIsLoading(false)
                        showPage(2)
                      }, 2000)
                    }}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Iniciando Avaliação...
                      </div>
                    ) : (
                      "🚀 INICIAR AVALIAÇÃO DE PREPARAÇÃO"
                    )}
                  </Button>

                  {isLoading && (
                    <div className="text-green-600 font-medium animate-pulse">
                      ✨ Preparando sua jornada de fisio pélvica...
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="border-red-200 border-2 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                  <CardTitle className="font-bold text-lg mb-4 text-red-800">😰 Antes do Movimento BoraParir</CardTitle>
                  <CardContent className="space-y-2 text-gray-700 p-0">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Sem energia
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Muito estresse
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Dor no corpo
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Não sabe sobre parto
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 border-2 bg-gradient-to-br from-green-50 to-blue-50 p-6">
                  <CardTitle className="font-bold text-lg mb-4 text-green-800">
                    🌟 Depois do Movimento BoraParir
                  </CardTitle>
                  <CardContent className="space-y-2 text-gray-700 p-0">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Mais disposição
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Corpo e mente preparados
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Livre de dores
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Sabe o que fazer no parto
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Parto mais fácil
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-yellow-200 border-2 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 text-center">
                <CardTitle className="font-bold text-xl mb-4">
                  🏆 Mais de 20.000 gestantes em 16 países diferentes escolheram o Movimento BoraParir
                </CardTitle>
                <CardContent className="p-0">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <span className="text-3xl">⭐⭐⭐⭐⭐</span>
                    <span className="text-xl font-bold">4.9 de avaliação</span>
                  </div>
                  <p className="text-gray-600">
                    Junte-se à comunidade de guerreiras maternas que já conquistaram mais de 50.000 badges!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PAGE 2: QUIZ */}
        {gameState.currentPage === 2 && (
          <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-2 md:p-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Movimento BoraParir</h1>
                <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full inline-block mb-4">
                  💪 Avaliação de Preparação Materna
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progresso do Quiz</span>
                    <span className="text-sm text-gray-500">{gameState.currentQuestion + 1}/10</span>
                  </div>
                  <Progress value={((gameState.currentQuestion + 1) / quizQuestions.length) * 100} className="h-3" />
                </div>
              </div>

              <Card className="border-2 border-teal-200 p-8 mb-6">
                <CardContent className="text-center space-y-6 p-0">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{currentQuestion?.title}</CardTitle>
                    <p className="text-gray-600">{currentQuestion?.subtitle}</p>
                  </div>

                  {currentQuestion?.type === "input" ? (
                    <div className="max-w-md mx-auto space-y-4">
                      <Input
                        type="number"
                        placeholder={currentQuestion.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="text-center text-xl"
                      />
                      <Button
                        onClick={() => {
                          if (inputValue.trim()) {
                            answerQuestion(currentQuestion.points || 10)
                            setInputValue("")
                          }
                        }}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-lg hover:from-teal-600 hover:to-emerald-600"
                      >
                        Continuar ✨ (+{currentQuestion.points || 10} PP)
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentQuestion?.options?.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => answerQuestion(option.points, currentQuestion.badge)}
                          className="w-full p-4 text-left bg-gradient-to-r from-green-50 to-blue-50 text-gray-800 border-2 border-gray-200 hover:border-teal-300 hover:from-teal-50 hover:to-emerald-50 rounded-lg transition-all duration-200 flex items-center gap-4 h-auto"
                          variant="outline"
                        >
                          <span className="text-2xl">{option.emoji}</span>
                          <span className="flex-1 text-left">{option.text}</span>
                          <span className="text-teal-600 font-medium">+{option.points} PP</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-gray-600">
                  Pergunta {gameState.currentQuestion + 1} de {quizQuestions.length}
                </p>
                <p className="text-sm text-teal-600 mt-2">
                  🎯 Cada resposta te dá pontos PP e pode desbloquear badges especiais!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: RESULTADO */}
        {gameState.currentPage === 3 && (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-2 md:p-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Movimento BoraParir</h1>
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full inline-block">
                  📊 Resultado da Avaliação de Preparação
                </div>
              </div>

              <Card className="border-4 border-red-400 bg-gradient-to-r from-red-100 to-orange-100 p-8 text-center mb-8">
                <CardContent className="space-y-6 p-0">
                  <div className="text-6xl animate-pulse">⚠️</div>
                  <CardTitle className="text-3xl font-bold text-red-800">
                    ALERTA: NÍVEL CRÍTICO DE PREPARAÇÃO!
                  </CardTitle>
                  <p className="text-xl text-red-700">
                    O nível ideal de preparação do seu corpo para o parto é a partir de 75%
                  </p>

                  <Card className="p-6">
                    <div className="flex items-end justify-between h-32 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-red-500 w-16 h-8 rounded-t mb-2"></div>
                        <span className="text-sm font-bold text-red-600">Você hoje</span>
                        <span className="text-lg font-bold text-red-800">{gameState.preparation}%</span>
                        <span className="text-xs text-red-600">Pouco preparada</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-green-500 w-16 h-24 rounded-t mb-2"></div>
                        <span className="text-sm font-bold text-green-600">IDEAL</span>
                        <span className="text-lg font-bold text-green-800">75%+</span>
                        <span className="text-xs text-green-600">Preparada</span>
                      </div>
                    </div>
                    <Progress value={gameState.preparation} className="h-3" />
                  </Card>

                  <Card className="bg-red-50 p-4">
                    <CardTitle className="font-bold text-red-800 mb-2">
                      ⚡ Falta de preparação para o parto pode:
                    </CardTitle>
                    <ul className="text-left text-red-700 space-y-1">
                      <li>• Te fazer sentir ainda mais estresse</li>
                      <li>• Deixar seu corpo mais tenso gerando mais dor</li>
                      <li>• Aumentar riscos de complicações</li>
                      <li>• Causar insegurança durante o parto</li>
                    </ul>
                  </Card>
                </CardContent>
              </Card>

              <Card className="border-teal-200 border-2 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 mb-8">
                <CardTitle className="text-2xl font-bold mb-4 text-center">
                  💪 Seu Perfil de Preparação Materna
                </CardTitle>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-4">📊 Estatísticas Atuais:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Nível Atual:</span>
                          <span className="font-bold text-teal-600">Iniciante</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pontos PP:</span>
                          <span className="font-bold text-teal-600">{gameState.points}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Badges Conquistados:</span>
                          <span className="font-bold text-teal-600">{gameState.badges.length}/50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preparação:</span>
                          <span className="font-bold text-red-600">{gameState.preparation}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-4">🏅 Badges Conquistados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {gameState.badges.map((badgeId, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center shadow-lg border-2 border-yellow-300"
                          >
                            <span className="text-xl">{badges[badgeId]?.icon}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 border-2 bg-gradient-to-br from-green-50 to-blue-50 p-6 text-center mb-8">
                <CardTitle className="text-2xl font-bold mb-4">🎯 SUA MISSÃO: Alcançar 75% em 7 Dias</CardTitle>
                <CardContent className="space-y-6 p-0">
                  <p className="text-lg">
                    Montamos um plano incrível para você. Com base nos resultados das nossas alunas, esperamos que em 7
                    dias você já sinta seu corpo mais preparado para o parto.
                  </p>

                  <Card className="p-6">
                    <h4 className="font-bold mb-4">📈 Sua Transformação Prevista:</h4>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-3xl mb-2">😰</div>
                        <span className="text-sm font-bold">Você hoje</span>
                        <div className="text-lg text-red-600">{gameState.preparation}%</div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gradient-to-r from-red-400 to-green-400 rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">🌟</div>
                        <span className="text-sm font-bold">Você em 7 dias</span>
                        <div className="text-lg text-green-600">75%+</div>
                      </div>
                    </div>
                  </Card>

                  <Button
                    onClick={() => showPage(4)}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                  >
                    🎁 EXPERIMENTAR GRÁTIS O DIA 1 DA JORNADA
                  </Button>

                  <p className="text-sm text-gray-600">✨ Ganhe +50 PP e desbloqueie o badge "Primeira Vitória"</p>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 border-2 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 text-center">
                <CardTitle className="font-bold text-xl mb-4">🔥 Outras Guerreiras Estão na Frente!</CardTitle>
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">1.247</div>
                      <div className="text-sm">Gestantes começaram hoje</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">892</div>
                      <div className="text-sm">Já conquistaram 75%+</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{formatTime(offerTimer)}</div>
                      <div className="text-sm">Tempo restante da oferta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PAGE 4: DEMO */}
        {gameState.currentPage === 4 && (
          <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-2 md:p-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Movimento BoraParir</h1>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block">
                  🎁 Demo Gratuita - Dia 1 da Jornada
                </div>
              </div>

              {!isExerciseRunning && gameState.exerciseStep === 0 && (
                <Card className="border-2 border-green-200 p-8 text-center mb-6">
                  <CardContent className="space-y-6 p-0">
                    <div className="text-6xl">💪</div>
                    <CardTitle className="text-2xl font-bold">Exercício de Fortalecimento Pélvico</CardTitle>
                    <p className="text-lg text-gray-700">
                      Experimente GRÁTIS um dos exercícios mais eficazes do nosso programa. Este exercício demora apenas
                      2 minutos e você já sentirá a diferença!
                    </p>

                    <Card className="bg-green-50 p-4">
                      <CardTitle className="font-bold text-green-800 mb-2">🎯 O que você vai ganhar:</CardTitle>
                      <ul className="text-left text-green-700 space-y-1">
                        <li>• +100 Pontos PP</li>
                        <li>• Badge "Primeira Vitória" 🏅</li>
                        <li>• +15% de preparação corporal</li>
                        <li>• Sensação imediata de fortalecimento</li>
                      </ul>
                    </Card>

                    <Button
                      onClick={startExercise}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                    >
                      🚀 COMEÇAR EXERCÍCIO (2 min)
                    </Button>
                  </CardContent>
                </Card>
              )}

              {isExerciseRunning && (
                <Card className="border-2 border-blue-200 p-8">
                  <CardContent className="text-center space-y-6 p-0">
                    <div>
                      <CardTitle className="text-xl font-bold mb-2">
                        Etapa {gameState.exerciseStep + 1}/3: {exerciseSteps[gameState.exerciseStep]?.title}
                      </CardTitle>
                      <Progress value={((gameState.exerciseStep + 1) / 3) * 100} className="h-3 mb-4" />
                    </div>

                    <div>
                      <div className="text-4xl mb-4">🧘‍♀️</div>
                      <h4 className="text-lg font-semibold mb-2">
                        {exerciseSteps[gameState.exerciseStep]?.description}
                      </h4>
                      <p className="text-gray-600 mb-6">{exerciseSteps[gameState.exerciseStep]?.instruction}</p>

                      <Card className="bg-blue-50 p-4">
                        <div className="text-sm text-blue-600 mb-2">Duração da etapa:</div>
                        <div className="text-2xl font-bold text-blue-800">{exerciseTimer}s</div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isExerciseRunning && gameState.exerciseStep >= exerciseSteps.length && (
                <div className="space-y-6">
                  <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center">
                    <CardContent className="space-y-6 p-0">
                      <div className="text-6xl animate-bounce">🎉</div>
                      <CardTitle className="text-3xl font-bold text-green-800">
                        PARABÉNS! Primeira Vitória Conquistada!
                      </CardTitle>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                          <div className="text-2xl mb-2">⭐</div>
                          <div className="font-bold">+100 PP</div>
                          <div className="text-sm text-gray-600">Pontos ganhos</div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-2xl mb-2">🏅</div>
                          <div className="font-bold">Badge Especial</div>
                          <div className="text-sm text-gray-600">"Primeira Vitória"</div>
                        </Card>
                      </div>

                      <Card className="p-6">
                        <h4 className="font-bold mb-4">📈 Sua Evolução Imediata:</h4>
                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <span className="text-sm">Antes</span>
                            <div className="text-xl text-red-600">25%</div>
                          </div>
                          <div className="flex-1 mx-4">
                            <Progress value={40} className="h-3" />
                          </div>
                          <div className="text-center">
                            <span className="text-sm">Agora</span>
                            <div className="text-xl text-green-600">40%</div>
                          </div>
                        </div>
                        <p className="text-sm text-green-600 mt-2 font-medium">
                          ✨ Você já está 40% preparada para o parto!
                        </p>
                      </Card>

                      <p className="text-lg text-gray-700">
                        Isso foi apenas o primeiro exercício! Imagine os resultados com o programa completo de 7 dias...
                      </p>

                      <div className="text-teal-600 font-medium animate-pulse">
                        ✨ Redirecionando para depoimentos em instantes...
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200 border-2 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 text-center">
                    <CardTitle className="font-bold text-lg mb-4">🔒 Próximos Desafios Disponíveis:</CardTitle>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <Card className="p-3">
                          <div className="text-lg mb-1">🌟</div>
                          <div className="font-medium">Dia 2: Libertação das Dores</div>
                          <div className="text-gray-600">Badge "Livre de Dores"</div>
                        </Card>
                        <Card className="p-3">
                          <div className="text-lg mb-1">🧠</div>
                          <div className="font-medium">Dia 3: Mente de Guerreira</div>
                          <div className="text-gray-600">Badge "Mente Zen"</div>
                        </Card>
                      </div>
                      <p className="text-teal-600 text-sm mt-4">Desbloqueie todos os 7 dias + 50 badges exclusivos!</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 5: DEPOIMENTOS */}
        {gameState.currentPage === 5 && (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-2 md:p-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Movimento BoraParir</h1>
                <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full inline-block">
                  👥 Conquistas da Comunidade de Guerreiras
                </div>
              </div>

              <Card className="border-yellow-300 border-2 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">🏆 Conquistas da Comunidade Hoje</CardTitle>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-orange-600">12.847</div>
                      <div className="text-sm">Badges "Livre de Dores" conquistados</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">8.932</div>
                      <div className="text-sm">Gestantes alcançaram 75%+</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">20.000+</div>
                      <div className="text-sm">Guerreiras ativas</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">4.9⭐</div>
                      <div className="text-sm">Avaliação média</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 p-8 mb-8">
                <CardContent className="space-y-6 p-0">
                  <div className="text-center">
                    <CardTitle className="text-2xl font-bold mb-4">
                      📱 Relatos de Guerreiras que Passaram pelo Movimento BoraParir
                    </CardTitle>
                    <p className="text-gray-600">
                      Milhares de gestantes tiveram a gestação transformada com a ajuda do Movimento BoraParir
                    </p>
                  </div>

                  <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonials[gameState.testimonialIndex].initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-lg">{testimonials[gameState.testimonialIndex].name}</h4>
                            <p className="text-sm text-gray-600">
                              {testimonials[gameState.testimonialIndex].weeks} • Nível{" "}
                              {testimonials[gameState.testimonialIndex].level}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-teal-600 font-medium">
                              {testimonials[gameState.testimonialIndex].points} PP
                            </div>
                            <div className="text-xs text-gray-500">Total de pontos</div>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                          {testimonials[gameState.testimonialIndex].badges.map((badge, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center shadow-lg border-2 border-yellow-300"
                            >
                              <span>{badge}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-medium mb-3">
                          🎉 Resultado: {testimonials[gameState.testimonialIndex].result}
                        </div>

                        <blockquote className="text-gray-700 italic">
                          "{testimonials[gameState.testimonialIndex].testimonial}"
                        </blockquote>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newIndex =
                          gameState.testimonialIndex > 0 ? gameState.testimonialIndex - 1 : testimonials.length - 1
                        setGameState((prev) => ({ ...prev, testimonialIndex: newIndex }))
                      }}
                    >
                      ← Anterior
                    </Button>

                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${index === gameState.testimonialIndex ? "bg-teal-500" : "bg-gray-300"}`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        const newIndex =
                          gameState.testimonialIndex < testimonials.length - 1 ? gameState.testimonialIndex + 1 : 0
                        setGameState((prev) => ({ ...prev, testimonialIndex: newIndex }))
                      }}
                    >
                      Próximo →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="border-red-200 border-2 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                  <CardTitle className="font-bold text-lg mb-4 text-red-800">😰 Antes do Movimento BoraParir</CardTitle>
                  <CardContent className="space-y-2 text-gray-700 p-0">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Sem energia
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Muito estresse
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Dor no corpo
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Não sabe sobre parto
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">❌</span> Medo e insegurança
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 border-2 bg-gradient-to-br from-green-50 to-blue-50 p-6">
                  <CardTitle className="font-bold text-lg mb-4 text-green-800">
                    🌟 Depois do Movimento BoraParir
                  </CardTitle>
                  <CardContent className="space-y-2 text-gray-700 p-0">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Mais disposição
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Corpo e mente preparados
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Livre de dores
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Sabe o que fazer no parto
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✅</span> Parto mais fácil
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-teal-300 border-2 bg-gradient-to-r from-teal-50 to-emerald-50 p-8 text-center">
                <CardTitle className="text-2xl font-bold mb-4">💪 Pronta para Começar Sua Jornada?</CardTitle>
                <CardContent className="space-y-6 p-0">
                  <p className="text-lg">Junte-se a essas guerreiras e desbloqueie TODOS os níveis e conquistas!</p>

                  <Card className="p-4">
                    <h4 className="font-bold mb-2">🎁 O que você vai desbloquear:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>50+ Conquistas</div>
                      <div>7 Níveis Completos</div>
                      <div>Comunidade VIP</div>
                      <div>Suporte 24/7</div>
                    </div>
                  </Card>

                  <Button
                    onClick={() => showPage(6)}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                  >
                    🚀 DESBLOQUEAR JORNADA COMPLETA
                  </Button>

                  <p className="text-sm text-gray-600">⏰ Oferta especial expira em {formatTime(offerTimer)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PAGE 6: OFERTA */}
        {gameState.currentPage === 6 && (
          <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-2 md:p-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Movimento BoraParir</h1>
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full inline-block">
                  🎉 SEU PLANO ESTÁ PRONTO! DESBLOQUEIE SUA JORNADA COMPLETA
                </div>
              </div>

              <Card className="border-4 border-green-400 bg-gradient-to-r from-green-100 to-blue-100 p-8 text-center mb-8">
                <CardContent className="space-y-6 p-0">
                  <div className="text-6xl">🏆</div>
                  <CardTitle className="text-3xl font-bold text-green-800">
                    PARABÉNS! Você Completou Sua Avaliação!
                  </CardTitle>
                  <p className="text-xl">
                    Agora você tem acesso ao seu plano personalizado de fisioterapia pélvica.
                    <br />
                    Desbloqueie TODOS os exercícios e conquistas para transformar seu parto:
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">
                  ⭐ DESTAQUES DO SEU PLANO PREMIUM ⭐
                </CardTitle>
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="text-green-600 text-xl">✅</div>
                    <div>
                      <div className="font-bold">+40 Exercícios de Fisio Pélvica cientificamente comprovados</div>
                      <div className="text-sm text-gray-600">Reduza em até 47% o tempo de trabalho de parto</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="text-green-600 text-xl">✅</div>
                    <div>
                      <div className="font-bold">Sistema de progressão em 4 níveis</div>
                      <div className="text-sm text-gray-600">93% das gestantes relatam alívio das dores em 14 dias</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="text-green-600 text-xl">✅</div>
                    <div>
                      <div className="font-bold">
                        Tensão reduzida na pelve, costas, ciático, pescoço e região íntima
                      </div>
                      <div className="text-sm text-gray-600">Diminua em até 65% o desconforto durante a gestação</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="text-green-600 text-xl">✅</div>
                    <div>
                      <div className="font-bold">Técnicas de respiração e relaxamento para redução do estresse</div>
                      <div className="text-sm text-gray-600">
                        89% das mamães relatam melhora significativa na qualidade do sono
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="text-green-600 text-xl">✅</div>
                    <div>
                      <div className="font-bold">Tempo de acesso: 12 meses completos</div>
                      <div className="text-sm text-gray-600">
                        Com apenas 15 minutos por dia você transforma seu parto
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 p-6 mb-8">
                <CardTitle className="text-xl font-bold text-center mb-4">
                  ⭐⭐⭐⭐⭐ 4.9/5.0 (baseado em 3.782 avaliações verificadas)
                </CardTitle>
                <CardContent className="space-y-4 p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
                      <blockquote className="text-gray-700 italic text-sm mb-3">
                        "Consegui ter um parto normal sem episiotomia graças aos exercícios do BoraParir!"
                      </blockquote>
                      <div className="text-right text-xs font-medium">Maria Silva, 32 anos, São Paulo</div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
                      <blockquote className="text-gray-700 italic text-sm mb-3">
                        "Meu trabalho de parto durou apenas 4 horas! Os exercícios de abertura pélvica fizeram toda
                        diferença."
                      </blockquote>
                      <div className="text-right text-xs font-medium">Ana Paula Ferreira, 28 anos, Rio de Janeiro</div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50">
                      <blockquote className="text-gray-700 italic text-sm mb-3">
                        "As dores nas costas que me atormentavam desapareceram em 10 dias de prática!"
                      </blockquote>
                      <div className="text-right text-xs font-medium">Juliana Mendes, 34 anos, Belo Horizonte</div>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">
                  🎁 DESBLOQUEIE HOJE ESTAS RECOMPENSAS EXCLUSIVAS 🎁
                </CardTitle>
                <CardContent className="space-y-4 p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 border-2 border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🏆</div>
                        <div>
                          <div className="font-bold">BÔNUS 1: Masterclass "Enxoval Inteligente"</div>
                          <div className="text-sm">Economize até R$1.200 nas compras</div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500 line-through">Valor: R$97</span>
                            <span className="text-green-600 font-bold">HOJE: GRÁTIS</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-2 border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🏆</div>
                        <div>
                          <div className="font-bold">BÔNUS 2: Guia "Respiração no Trabalho de Parto"</div>
                          <div className="text-sm">Técnicas das doulas mais experientes</div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500 line-through">Valor: R$67</span>
                            <span className="text-green-600 font-bold">HOJE: GRÁTIS</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-2 border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🏆</div>
                        <div>
                          <div className="font-bold">BÔNUS 3: Mini-curso "Exercícios para o Trabalho de Parto"</div>
                          <div className="text-sm">Reduza a dor em até 60%</div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500 line-through">Valor: R$87</span>
                            <span className="text-green-600 font-bold">HOJE: GRÁTIS</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-2 border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🏆</div>
                        <div>
                          <div className="font-bold">BÔNUS 4: Protocolo Anti-Diástase</div>
                          <div className="text-sm">Previna a separação abdominal pós-parto</div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500 line-through">Valor: R$77</span>
                            <span className="text-green-600 font-bold">HOJE: GRÁTIS</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <div className="font-bold text-lg">💰 Valor total dos bônus: R$328</div>
                    <div className="text-green-600 font-bold">Você economiza R$328 ao entrar hoje!</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">
                  🚀 SUA JORNADA DE TRANSFORMAÇÃO COM O MOVIMENTO MATERNO 🚀
                </CardTitle>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="flex-1 p-3 bg-white rounded-lg shadow">
                        <div className="font-bold">Semana 1:</div>
                        <div className="text-gray-600">
                          Alívio inicial das dores lombares e melhor qualidade de sono
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="flex-1 p-3 bg-white rounded-lg shadow">
                        <div className="font-bold">Semana 2:</div>
                        <div className="text-gray-600">Fortalecimento do assoalho pélvico e redução da ansiedade</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        4
                      </div>
                      <div className="flex-1 p-3 bg-white rounded-lg shadow">
                        <div className="font-bold">Semana 4:</div>
                        <div className="text-gray-600">Maior mobilidade pélvica e confiança para o parto</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        8
                      </div>
                      <div className="flex-1 p-3 bg-white rounded-lg shadow">
                        <div className="font-bold">Semana 8:</div>
                        <div className="text-gray-600">
                          Preparação completa do corpo e mente para um parto mais fácil
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">👩‍⚕️ SUA MENTORA NESTA JORNADA 👩‍⚕️</CardTitle>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Dra. Mariana Costa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dra. Mariana Costa</h3>
                      <p className="text-gray-700 mb-4">
                        Fisioterapeuta especialista em saúde da mulher, com mestrado em Obstetrícia pela USP e doutorado
                        em Biomecânica Pélvica pela Universidade de Barcelona. Com mais de 15 anos dedicados
                        exclusivamente à fisioterapia pélvica, já transformou a experiência de parto de mais de 25.000
                        gestantes em 16 países.
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🏅</span>
                          <span>Criadora do método BoraParir, revolucionário na preparação para o parto natural</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🏅</span>
                          <span>Palestrante internacional com mais de 200 workshops realizados em 4 continentes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🏅</span>
                          <span>Autora do best-seller "Parto Sem Medo: O Poder da Fisioterapia Pélvica"</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🏅</span>
                          <span>Consultora das principais maternidades humanizadas do Brasil</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🏅</span>
                          <span>Premiada pela Associação Brasileira de Fisioterapia na Saúde da Mulher (2023)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-white p-4 rounded-lg shadow">
                    <blockquote className="text-gray-700 italic">
                      "Minha missão é devolver à mulher o protagonismo do seu parto. Após testemunhar milhares de partos
                      traumáticos que poderiam ter sido evitados com a preparação adequada, desenvolvi o BoraParir para
                      que toda gestante possa viver a experiência mais transformadora da sua vida com confiança,
                      segurança e menos dor. Não é apenas sobre exercícios - é sobre empoderamento feminino no momento
                      mais importante da maternidade."
                    </blockquote>
                  </Card>

                  <p className="mt-4 text-gray-700">
                    A Dra. Mariana também é mãe de 3 filhos, todos nascidos de parto normal usando as mesmas técnicas
                    que ela ensina no programa. Sua experiência pessoal soma-se à sua vasta experiência profissional,
                    tornando-a uma das vozes mais respeitadas no cenário da obstetrícia humanizada no Brasil.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4 border-teal-400 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 mb-8">
                <CardContent className="space-y-8 p-0">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full inline-block mb-4 font-bold">
                      🔥 SUPER PROMOÇÃO DO MÊS DAS MÃES 🔥
                    </div>
                    <CardTitle className="text-3xl font-bold mb-4">Pagamento único: acesso 12 meses</CardTitle>
                    <p className="text-lg text-gray-700 mb-6">
                      Todo esse valor que você acabou de ver (programa completo + R$328 em bônus) por um investimento
                      muito menor do que você imagina:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:gap-8 items-center">
                    <div>
                      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                        <div className="mb-2">
                          <span className="text-lg text-gray-500 line-through">De R$ 197</span>
                          <span className="text-sm text-gray-500 ml-2">Por APENAS</span>
                        </div>
                        <div className="text-6xl font-bold text-green-600 mb-2">R$ 39,90</div>
                        <div className="text-lg text-gray-700">à vista</div>

                        <Card className="bg-red-100 text-red-800 px-4 py-2 rounded-lg mt-4">
                          <div className="font-bold">⏱️ Sua oferta exclusiva expira em:</div>
                          <div className="text-2xl font-mono">{formatTime(offerTimer)}</div>
                        </Card>

                        <div className="mt-4 text-amber-600 font-bold animate-pulse">
                          👑 Apenas 27 vagas restantes neste valor promocional!
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          addBadge("pioneira")
                          alert(
                            '🎉 Parabéns! Você desbloqueou o acesso completo e ganhou o badge "Pioneira"!\n\n✨ Bem-vinda à Jornada Completa do Movimento BoraParir!',
                          )
                        }}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg mt-4"
                      >
                        QUERO DESBLOQUEAR MEU PLANO AGORA
                      </Button>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Programa BoraParir"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center">
                        <h3 className="font-bold text-lg">Programa Completo BoraParir</h3>
                        <p className="text-sm">Transforme seu parto com apenas 15 minutos por dia</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">
                      Isso é menos que o valor de uma consulta particular de fisioterapia!
                    </p>
                    <div className="bg-green-100 p-4 rounded-lg">
                      <div className="font-bold text-green-800">💡 Pense assim:</div>
                      <div className="text-green-700">
                        R$ 39,90 ÷ 12 meses = apenas R$ 3,32 por mês para transformar seu parto!
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 mb-8">
                <CardContent className="flex flex-col md:flex-row items-center gap-6 p-0">
                  <div className="text-6xl">🛡️</div>
                  <div>
                    <CardTitle className="text-xl font-bold mb-2">GARANTIA INCONDICIONAL DE 7 DIAS</CardTitle>
                    <p className="text-gray-700">
                      Experimente o Movimento Materno sem riscos. Se em 7 dias você não perceber os primeiros resultados
                      ou achar que o programa não é ideal para você, basta solicitar o reembolso e devolveremos 100% do
                      seu investimento.
                    </p>
                    <p className="font-medium mt-2">Sem perguntas. Sem burocracia. Sem estresse.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-red-400 bg-gradient-to-r from-red-100 to-orange-100 p-6 text-center mb-8 animate-pulse">
                <CardTitle className="text-2xl font-bold text-red-800 mb-4">🚨 OFERTA POR TEMPO LIMITADO 🚨</CardTitle>
                <CardContent className="p-0">
                  <div className="mb-2">
                    <span className="text-lg text-gray-500 line-through">De R$ 197</span>
                    <span className="text-sm text-gray-500 ml-2">Por APENAS</span>
                  </div>
                  <div className="text-6xl font-bold text-green-600 mb-2">R$ 39,90</div>
                  <div className="text-lg text-gray-700 mb-4">à vista</div>

                  <div className="bg-yellow-100 p-3 rounded-lg mb-4">
                    <div className="font-bold">⏱️ Sua oferta exclusiva expira em:</div>
                    <div className="text-2xl font-mono">{formatTime(offerTimer)}</div>
                    <div className="mt-2 text-amber-600 font-bold">👑 Apenas 27 vagas restantes neste valor!</div>
                  </div>

                  <Button
                    onClick={() => {
                      addBadge("pioneira")
                      alert(
                        '🎉 Parabéns! Você desbloqueou o acesso completo e ganhou o badge "Pioneira"!\n\n✨ Bem-vinda à Jornada Completa do Movimento BoraParir!',
                      )
                    }}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-lg md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                  >
                    SIM! QUERO TRANSFORMAR MEU PARTO AGORA
                  </Button>

                  <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>💳</span>
                      <span>Pagamento 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔒</span>
                      <span>Seus dados estão protegidos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰</span>
                      <span>Parcelamento em até 12x (sujeito a juros)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🌎</span>
                      <span>Acesso imediato</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 p-6 mb-8">
                <CardTitle className="text-2xl font-bold text-center mb-6">❓ PERGUNTAS FREQUENTES ❓</CardTitle>
                <CardContent className="space-y-4 p-0">
                  <Card className="p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">🟢</div>
                      <div>
                        <div className="font-bold mb-1">Quero parto normal, esses exercícios realmente ajudam?</div>
                        <p className="text-gray-700 text-sm">
                          Com certeza! 87% das nossas alunas que desejavam parto normal conseguiram realizá-lo, mesmo
                          aquelas que inicialmente foram desencorajadas por seus médicos. Os exercícios de fisio pélvica
                          foram especialmente desenvolvidos para facilitar a passagem do bebê pelo canal de parto.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">🟢</div>
                      <div>
                        <div className="font-bold mb-1">A partir de quantas semanas posso começar?</div>
                        <p className="text-gray-700 text-sm">
                          Você pode começar em QUALQUER momento da gestação! Temos protocolos específicos para cada
                          trimestre. Quanto antes começar, melhores serão os resultados, mas mesmo gestantes de 38
                          semanas já relataram benefícios significativos.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">🟢</div>
                      <div>
                        <div className="font-bold mb-1">Como são os exercícios? São difíceis de fazer?</div>
                        <p className="text-gray-700 text-sm">
                          Todos os exercícios são seguros, confortáveis e projetados especificamente para gestantes.
                          Cada movimento é demonstrado em vídeo com instruções detalhadas. 98% das nossas alunas relatam
                          que conseguem realizar os exercícios sem dificuldade, mesmo sem experiência prévia.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">🟢</div>
                      <div>
                        <div className="font-bold mb-1">Onde receberei o acesso?</div>
                        <p className="text-gray-700 text-sm">
                          Imediatamente após a compra, você receberá acesso via WhatsApp e e-mail. Nossa equipe de
                          suporte está disponível 7 dias por semana para garantir que você comece sua jornada sem
                          complicações.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">🟢</div>
                      <div>
                        <div className="font-bold mb-1">Quanto tempo terei de acesso?</div>
                        <p className="text-gray-700 text-sm">
                          Você paga uma única vez R$39,90 e tem acesso garantido por 12 meses completos a todo o
                          conteúdo, atualizações e à comunidade exclusiva de gestantes.
                        </p>
                      </div>
                    </div>
                  </Card>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 p-6 mb-8 text-center">
                <CardTitle className="text-xl font-bold mb-4">🔰 CONFIANÇA E SEGURANÇA 🔰</CardTitle>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-3 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">💳</div>
                      <div className="text-xs">Pagamentos Seguros</div>
                    </Card>

                    <Card className="p-3 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">🔒</div>
                      <div className="text-xs">Site Seguro</div>
                    </Card>

                    <Card className="p-3 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">✅</div>
                      <div className="text-xs">Satisfação Garantida</div>
                    </Card>

                    <Card className="p-3 flex flex-col items-center justify-center">
                      <div className="text-3xl mb-2">🛡️</div>
                      <div className="text-xs">Privacidade Protegida</div>
                    </Card>
                  </div>

                  <div className="mt-6 text-sm text-gray-500">BoraParir © 2025 - Todos os direitos reservados</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="celebration">
            <Card className="border-4 border-yellow-400 bg-gradient-to-r from-yellow-100 to-orange-100 p-8 text-center shadow-2xl">
              <CardContent className="space-y-4 p-0">
                <div className="text-6xl animate-bounce">🎉</div>
                <CardTitle className="text-2xl font-bold text-yellow-800">BADGE CONQUISTADO!</CardTitle>
                <div className="text-4xl">{badges[celebrationBadge]?.icon}</div>
                <p className="text-lg font-bold">{badges[celebrationBadge]?.name}</p>
                <p className="text-sm text-gray-600">{badges[celebrationBadge]?.description}</p>
                <div className="text-green-600 font-bold">+50 PP</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
