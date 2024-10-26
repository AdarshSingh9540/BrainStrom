"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ShineBorder from "./ui/shine-border"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"

interface Question {
  Question: string
  Options: string[]
  answer: string
  "detailed explanation": string
}

interface QuizResponse {
  response: Question[]
}

export const QuestionContent = () => {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic")
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [showCheckResult, setShowCheckResult] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if (!topic) {
          throw new Error("Topic is required")
        }
        const response = await axios.post<QuizResponse>(
          "https://namastequiz-backend.vercel.app/chat",
          { topic }
        )
        setQuestionList(response.data.response)
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(
            "There was an error making the POST request:",
            e.message
          )
        } else {
          console.error("There was an unknown error:", e)
        }
      }
    }
    fetchQuestion()
  }, [topic])

  useEffect(() => {
    if (!isSubmitted && !isQuizComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            handleTimeout()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentQuestionIndex, isSubmitted, isQuizComplete])

  const currentQuestion = questionList[currentQuestionIndex]

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option)
    }
  }

  const handleSubmit = () => {
    if (selectedOption) {
      const isAnswerCorrect = selectedOption === currentQuestion.answer;


      setTotalCorrect((prev) => {
        const newTotal = isAnswerCorrect ? prev + 1 : prev;

        
        if (currentQuestionIndex === questionList.length - 1) {
          handleCheckResult(newTotal); 
        }

        return newTotal;
      });

      setIsSubmitted(true);
    }
  }

  const handleTimeout = () => {
    setShowTimeoutDialog(true)
    setIsSubmitted(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedOption(null)
      setIsSubmitted(false)
      setExpanded(false)
      setTimeLeft(15)
      setShowTimeoutDialog(false)
    } else {
      setIsQuizComplete(true)
      setShowCheckResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((current) => current - 1)
      setSelectedOption(null)
      setIsSubmitted(false)
      setTimeLeft(15)
      setShowTimeoutDialog(false)
    }
  }

  const handleCheckResult = (finalCorrectCount: number) => {
    router.push(
      `/result?totalCorrect=${finalCorrectCount}&totalQuestion=${questionList.length}`
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <ShineBorder
          className="relative flex mx-2 lg:mx-0 lg:w-[60%] h-auto flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <div className="flex flex-col items-center justify-center h-full p-4 text-white">
            <h2 className="text-xl font-semibold mb-4">Quiz Questions</h2>
            {!isQuizComplete && currentQuestion ? (
              <div className="mb-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questionList.length}</span>
                  <div className="flex items-center bg-purple-600 rounded-full px-3 py-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-xl font-bold">{timeLeft}s</span>
                  </div>
                </div>
                <p className="text-lg my-2 mb-4">{currentQuestion.Question}</p>
                <ul className="flex flex-col">
                  {currentQuestion.Options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`mb-2 p-2 cursor-pointer rounded-lg 
                        ${!isSubmitted && selectedOption === option ? "bg-pink-500" : ""} 
                        ${isSubmitted && option === currentQuestion.answer ? "bg-green-600" : ""} 
                        ${isSubmitted && option !== currentQuestion.answer && selectedOption === option ? "bg-red-600" : "bg-gray-700"}
                        hover:bg-blue-400`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-lg">Loading questions...</p>
            )}
            {isSubmitted && (
              <div className="mt-4 w-full">
                <Button
                  variant="outline"
                  onClick={() => setExpanded(!expanded)}
                  className="w-full p-2 flex justify-between items-center bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <span>{expanded ? "Hide" : "Show"} Explanation</span>
                  {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
                {expanded && (
                  <div className="mt-2 p-4 bg-gray-800 rounded-md">
                    <p className="text-sm">{currentQuestion["detailed explanation"]}</p>
                  </div>
                )}
              </div>
            )}
       
            <div className="flex space-x-4 mt-6">
              {!isQuizComplete && (
                <>
                  <Button
                    className={`bg-purple-600 hover:bg-purple-700 px-12 ${currentQuestionIndex > 0 ? "opacity-100" : "opacity-40 cursor-not-allowed"}`}
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  {!isSubmitted ? (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 px-12"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 px-12"
                      onClick={handleNext}
                    >
                      {currentQuestionIndex === questionList.length - 1 ? "Finish" : "Next"}
                    </Button>
                  )}
                </>
              )}
              {showCheckResult && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 px-12"
                  onClick={() => handleCheckResult(totalCorrect)}
                >
                  Check Result
                </Button>
              )}
            </div>
          </div>
        </ShineBorder>
      </div>
      <Dialog open={showTimeoutDialog} onOpenChange={setShowTimeoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time&apos;s Up!</DialogTitle>
            <DialogDescription>
              You didn&apos;t answer the question in time. The correct answer was: {currentQuestion?.answer}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleNext}>Next Question</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
