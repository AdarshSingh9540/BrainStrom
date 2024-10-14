'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from 'next/link';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
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
          <span className="text-xs">{user?.email}</span>
        </div>
        <ChevronDown size={20} />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          {/* Add menu items here */}
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
          <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LogoutLink>Log out</LogoutLink></Link>
        </div>
      )}
    </div>
  );
}