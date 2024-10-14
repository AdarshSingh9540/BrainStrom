'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from 'next/link';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function UserMenu({ user }:any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2"
      >
        <Avatar>
          <AvatarImage src={user?.picture || ''} />
          <AvatarFallback>{user?.given_name?.charAt(0)}{user?.family_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span>{user?.given_name} {user.family_name}</span>
          <span className="text-xs hidden lg:block">{user?.email}</span>
        </div>
        {
            isOpen? <ChevronUp size={20}/>: <ChevronDown size={20} />
        }
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24  bg-white rounded-lg shadow-lg py-1">
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b ">Profile</Link>
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b ">Settings</Link>
         <LogoutLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</LogoutLink>
        </div>
      )}
    </div>
  );
}