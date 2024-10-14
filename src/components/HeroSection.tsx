'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Brain, Trophy, Rocket, ArrowRight, Github, Star, CheckCircle, HelpCircle } from 'lucide-react'
import Image from 'next/image'


export default function LandingPage() {
  const [email, setEmail] = useState('')
  const controls = useAnimation()

  useEffect(() => {
    controls.start(i => ({
      y: [0, -10, 0],
      transition: { delay: i * 0.2, repeat: Infinity, duration: 2 }
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <main>
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 px-[5rem]">
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Test Your Knowledge with a Side of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">BrainStrom</span>
              </motion.h1>
              <motion.p 
                className="text-xl mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Dive into our quirky quizzes and challenge yourself with a twist of humor. Are you ready to prove you're both smart and sassy?
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  <Link href="/quiz">
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  <Link href="#features">Learn More</Link>
                </Button>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative pl-[7rem]">
              <Image 
              src="https://res.cloudinary.com/dzvdh7yez/image/upload/v1728889711/online-test-removebg-preview_xhi1st.png"
              height={500}
              width={500}
              alt='img'
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-black bg-opacity-30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Sassy Quiz?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "Smart Content", description: "Our quizzes are crafted by experts to challenge and educate." },
                { icon: Sparkles, title: "Sassy Humor", description: "Enjoy witty comments and playful jabs as you quiz." },
                { icon: Rocket, title: "Learn Fast", description: "Gamified learning helps you retain information better." },
                { icon: Trophy, title: "Compete & Win", description: "Challenge friends and climb our global leaderboards." },
                { icon: CheckCircle, title: "Track Progress", description: "Monitor your improvement with detailed stats." },
                { icon: Star, title: "Diverse Topics", description: "From pop culture to quantum physics, we've got it all." },
              ].map((feature, index) => (
                <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-md border-pink-500">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 mb-4 text-pink-400" />
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
            <p className="text-xl mb-8">Join our community of quiz enthusiasts and start your journey to becoming a sass master!</p>
            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
              <Link href="/quiz">
                Start Quizzing Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="bg-black bg-opacity-30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Sassy Community</h2>
            <p className="text-xl mb-8">Get notified about new quizzes and sass-tastic updates!</p>
            <form className="flex justify-center items-center space-x-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white bg-opacity-10 border-pink-500 text-white placeholder-gray-300 flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

    </div>
  )
}