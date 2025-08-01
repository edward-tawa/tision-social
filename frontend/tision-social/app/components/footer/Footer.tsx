import React from 'react';
import { Copyright } from 'lucide-react';
import { Eye, Feather, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-text-color min-h-40 mt-5 px-2 py-2">
      <div className="text-[20px] text-text-color font-serif">
        <span className="text-text-color font-serif">Tision Technologies</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-center flex flex-row items-center gap-2">
          <Copyright className="text-black" /> {new Date().getFullYear()} Tision Technologies. All rights reserved.
        </div>
        <div className="flex flex-row items-center justify-center gap-3 text-sm">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
        <div className="text-[20px] text-white font-seif flex flex-row items-center justify-center gap-4">
          <div><Eye className="h-6 w-6 text-black" /> </div>
          <div><Feather className="h-5 w-5 text-black" /></div>
          <div><Shield className="h-5 w-5 text-black" /></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer