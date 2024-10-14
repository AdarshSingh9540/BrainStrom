'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShineBorder from './ui/shine-border';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from './ui/button';

interface Question {
  Question: string;
  Options: string[];
  answer: string;
}

interface QuizResponse {
  response: Question[];
}

export default function QuestionCard() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showCheckResult, setShowCheckResult] = useState(false); 
  
  const router = useRouter(); 

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if (!topic) {
          throw new Error('Topic is required');
        }
        const response = await axios.post<QuizResponse>('https://namastequiz-backend.vercel.app/chat', { topic });
        setQuestionList(response.data.response);
      } catch (e: unknown) {
        // You can check the type of the error and handle accordingly
        if (e instanceof Error) {
          console.error('There was an error making the POST request:', e.message);
        } else {
          console.error('There was an unknown error:', e);
        }
      }
    };
    fetchQuestion();
  }, [topic]);

  const currentQuestion = questionList[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const isAnswerCorrect = selectedOption === currentQuestion.answer;
      setTotalCorrect((prev) => prev + (isAnswerCorrect ? 1 : 0));
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsQuizComplete(true);
      setShowCheckResult(true); 
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((current) => current - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleCheckResult = () => {
    router.push(`/result?totalCorrect=${totalCorrect}&totalQuestion=${questionList.length}`); 
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <ShineBorder
          className="relative flex mx-2 lg:mx-0 lg:w-[60%] h-[400px] flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
        >
          <div className="flex flex-col items-center justify-center h-full p-4 text-white">
            <h2 className="text-xl font-semibold mb-4">Quiz Questions</h2>
            {!isQuizComplete && currentQuestion ? (
              <div className="mb-4">
                <p className="text-lg my-2 mb-4">{currentQuestion.Question}</p>
                <ul className="flex flex-col">
                  {currentQuestion.Options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`mb-2 p-2 cursor-pointer rounded-lg 
                        ${!isSubmitted && selectedOption === option ? 'bg-pink-500' : ''} 
                        ${isSubmitted && option === currentQuestion.answer ? 'bg-green-600' : ''} 
                        ${isSubmitted && option !== currentQuestion.answer && selectedOption === option ? 'bg-red-600' : 'bg-gray-700'}
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
            <div className="flex space-x-4 mt-6">
              {!isQuizComplete && (
                <>
                  <Button
                    className={`bg-purple-600 px-12 ${currentQuestionIndex > 0 ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  {!isSubmitted ? (
                    <Button className="bg-purple-600 px-12" onClick={handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button className="bg-purple-600 px-12" onClick={handleNext}>
                      {currentQuestionIndex === questionList.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  )}
                </>
              )}
              {showCheckResult && (
                <Button className="bg-purple-600 px-12" onClick={handleCheckResult}>
                  Check Result
                </Button>
              )}
            </div>
          </div>
        </ShineBorder>
      </div>
    </div>
  );
}
