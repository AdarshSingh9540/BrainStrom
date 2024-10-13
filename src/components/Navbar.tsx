import Link from "next/link";
import React from "react";
import { Sparkles, Brain, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function Navbar() {
  return (
    <div className="">
      <nav className="bg-black bg-opacity-30 backdrop-blur-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 flex items-center"
          >
            <Sparkles className="mr-2" />
            BrainStrom
          </Link>
          <div className="space-x-16">
            <Link href="/" className="hover:text-pink-400 transition-colors">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-pink-400 transition-colors"
            >
              About
            </Link>
          </div>
          <div className=" flex justify-center items-center ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <span className="px-4">Adarsh Singh</span>
        </div>
        </div>
      </nav>
    </div>
  );
}
