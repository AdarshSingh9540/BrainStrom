import Link from 'next/link';
import React from 'react';
import { Sparkles, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-blur-md p-8 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 md:px-[5rem]">
        <div className="flex flex-col justify-start mb-8 md:mb-0">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 flex items-start mb-4"
          >
            <Sparkles className="text-purple-700 mr-2" size={30} />
            BrainStrom Quiz
          </Link>
          <p className="text-gray-300">Challenging minds with a side of BrainStrom</p>
        </div>

        <div className="flex flex-col  md:items-center">
          <h3 className="text-lg font-semibold mb-4 md:mb-0">Connect With Us</h3>
          <div className="flex space-x-4 md:ml-4 mt-1 lg:mt-2">
            <Link
              href="https://github.com/AdarshSingh9540"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:singhadarsh9540@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <span className="sr-only">E-mail</span>
              <Mail className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/adarsh-singh-183357262/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <span className="sr-only">Linkedin</span>
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://x.com/adarsh9540?t=4eRz7G1jlnRlVqfH5Dtu1Q&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 BrainStrom Quiz. All rights reserved.</p>
      </div>
    </footer>
  );
}
