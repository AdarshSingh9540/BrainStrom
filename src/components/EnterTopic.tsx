'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import {Input} from '@/components/ui/input'; 
import {Button} from '@/components/ui/button'; 
import { useRouter } from 'next/navigation';

export default function EnterTopic() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleClick=()=>{
   if(!topic) alert("Please Enter Topic For Quiz!") 
    router.push(`/quiz?topic=${encodeURIComponent(topic)}`);
  }
  return (
    <div>
      <main className="flex-grow container flex justify-center items-center h-screen mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
       
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                BrainStrom Quiz Generator
              </h1>
              <p className="text-xl mb-8 text-center max-w-md">
                Ready to test your knowledge with a side of BrainStrom? Enter a topic and let's get quizzing!
              </p>
              <div className="w-full max-w-md space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your quiz topic"
                  className="bg-white bg-opacity-20 border-pink-500 text-white placeholder-gray-300"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <Button
                  onClick={handleClick}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Generate Quiz
                </Button>
              </div>
            </motion.div>
   
        </AnimatePresence>
      </main>
    </div>
  );
}
