import Link from 'next/link';
import React from 'react';
import { Sparkles, Github} from 'lucide-react'
export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-blur-md p-8 mt-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 flex items-center mb-4">
          <Sparkles className="mr-2" />
         BrainStrom Quiz
        </Link>
        <p className="text-gray-300">Challenging minds with a side of sass since 2024.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link href="#features" className="hover:text-pink-400 transition-colors">Features</Link></li>
          <li><Link href="#testimonials" className="hover:text-pink-400 transition-colors">Testimonials</Link></li>
          <li><Link href="#faq" className="hover:text-pink-400 transition-colors">FAQ</Link></li>
          <li><Link href="/auth" className="hover:text-pink-400 transition-colors">Login / Sign Up</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996  4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
      <p>&copy; 2024 BrainStrom Quiz. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
  );
}
