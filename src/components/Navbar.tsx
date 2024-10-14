import Link from "next/link";
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserMenu from "./UserMenu";  

export default async function Navbar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();

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
          {isUserAuthenticated ? (
            <UserMenu user={user} />  
          ) : (
            <Button className="border">
              <RegisterLink className="text-white">Sign up</RegisterLink>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}