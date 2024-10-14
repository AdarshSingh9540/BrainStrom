'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import confetti from 'canvas-confetti';
import { useEffect, Suspense } from 'react';

const ResultContent = () => {
  const router = useRouter();
  const searchParam = useSearchParams(); 
  const correct = Number(searchParam.get('totalCorrect'));
  const total = Number(searchParam.get('totalQuestion'));

  const score = correct * 4;
  const totalScore = total * 4;

  const percentage = (score / totalScore) * 100;

  let message;
  if (percentage >= 85) {
    message = "Perfect! You're officially goat and smart!";
  } else if (percentage >= 60) {
    message = "Not bad! But there's room for improvement.";
  } else {
    message = "Well, at least you made an effort. Keep working on the smart part!";
  }

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className='flex justify-center items-center h-screen mx-2 lg:mx-0'>
      <motion.div
        key="results"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md lg:mx-auto bg-white bg-opacity-10 backdrop-blur-md border-pink-500">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-400" />
            </motion.div>
            <p className="text-2xl mb-4">You scored</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
              {score}/{totalScore}
            </p>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
              Total correct Answers: {correct}/{total}
            </p>
            <p className="text-xl">
              {message}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/')} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              Try Another Quiz
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
