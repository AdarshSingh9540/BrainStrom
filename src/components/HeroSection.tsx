'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Trophy, Rocket, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

interface LandingPageClientProps {
    isUserAuthenticated: boolean; 
}
  
export default function LandingPageClient({ isUserAuthenticated }: LandingPageClientProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      y: [0, -10, 0],
      transition: { delay: i * 0.2, repeat: Infinity, duration: 2 }
    }));
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <main>
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:px-16 px-4">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Test Your Knowledge with a Side of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  BrainStorm
                </span>
              </motion.h1>
              <motion.p
                className="text-lg lg:text-xl mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Dive into our quirky quizzes and challenge yourself with a twist of humor. Are you ready to prove you&apos;re both smart and sassy?
              </motion.p>
              <motion.div
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 rounded-full text-lg font-semibold">
                  <Link href={isUserAuthenticated ? '/enter-topic' : '/'}>
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-8 py-6 rounded-full text-lg font-semibold">
                  <Link href="/">Learn More</Link>
                </Button>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative lg:pl-[7rem]">
              <Image
                src="https://res.cloudinary.com/dzvdh7yez/image/upload/v1728889711/online-test-removebg-preview_xhi1st.png"
                height={500}
                width={500}
                alt="img"
                className='w-full h-auto lg:w-[450px] lg:h-[450px]'
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-black bg-opacity-30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Sassy Quiz?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "Smart Content", description: "Our quizzes are crafted by experts to challenge and educate." },
                { icon: Sparkles, title: "Sassy Humor", description: "Enjoy witty comments and playful jabs as you quiz." },
                { icon: Rocket, title: "Learn Fast", description: "Gamified learning helps you retain information better." },
                { icon: Trophy, title: "Compete & Win", description: "Challenge friends and climb our global leaderboards." },
                { icon: CheckCircle, title: "Track Progress", description: "Monitor your improvement with detailed stats." },
                { icon: Star, title: "Diverse Topics", description: "From pop culture to quantum physics, we've got it all." },
              ].map((feature, index) => (
                <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-md border-pink-500">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mb-4 text-pink-400 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Sassy?</h2>
            <p className="text-lg lg:text-xl mb-8">Join our community of quiz enthusiasts and start your journey to becoming a sass master!</p>
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 rounded-full text-lg font-semibold">
              <Link href="/quiz">
                Start Quizzing Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
