import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
      </div>
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 Sassy Quiz. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
