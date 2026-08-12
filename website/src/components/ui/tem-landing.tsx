'use client';
import React from "react";
import Link from "next/link";
import { Waves } from "./wave-background";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10 relative";
    
    const variants = {
      default: "bg-white text-black hover:bg-gray-100",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "hover:bg-gray-800/50 text-white",
      gradient: "bg-gradient-to-b from-white via-white/95 to-white/60 text-black hover:scale-105 active:scale-95"
    };
    
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base"
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

import { ArrowRight, Menu, X, Terminal, Download, Mail } from "lucide-react";

// Navigation Component
export const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white hover:opacity-80 transition-opacity">
            <Terminal size={24} className="text-white" />
            <span>TEM</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#installation" className="text-sm text-white/60 hover:text-white transition-colors">
              Installation
            </Link>
            <a href="https://github.com/firOLA3/TEM.git" className="text-sm text-white/60 hover:text-white transition-colors">
              GitHub
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button type="button" variant="ghost" size="sm">
              View Source
            </Button>
            <Link href="/download" tabIndex={-1}>
              <Button type="button" variant="default" size="sm">
                <Download size={16} /> Download
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="/#features"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#installation"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Installation
            </Link>
            <a
              href="https://github.com"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
              <Button type="button" variant="ghost" size="sm">
                View Source
              </Button>
              <Link href="/download" tabIndex={-1}>
                <Button type="button" variant="default" size="sm" className="w-full">
                  <Download size={16} /> Download
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const Hero = React.memo(() => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-32 overflow-hidden"
      style={{
        animation: "fadeIn 0.6s ease-out"
      }}
    >
      <Waves className="absolute inset-0 z-0 opacity-40 pointer-events-none" strokeColor="#ffffff" backgroundColor="#000000" pointerSize={0.5} />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <aside className="mb-8 z-10 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/80 backdrop-blur-md max-w-full">
        <span className="text-xs text-center whitespace-nowrap" style={{ color: '#d1d5db' }}>
          Terminal Event Monitor v1.0 is now live!
        </span>
        <a
          href="#features"
          className="flex items-center gap-1 text-xs text-white hover:text-gray-300 transition-all active:scale-95 whitespace-nowrap"
          aria-label="Read more about the new version"
        >
          See what's new
          <ArrowRight size={12} />
        </a>
      </aside>

      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl px-6 leading-tight mb-6 z-10 drop-shadow-lg"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f3f4f6, #9ca3af)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.03em"
        }}
      >
        Stop pasting terminal errors manually.
      </h1>

      <p className="text-base md:text-lg text-center max-w-2xl px-6 mb-10 z-10" style={{ color: '#9ca3af' }}>
        Press <code className="bg-gray-800 text-white px-2 py-1 rounded text-sm mx-1 border border-gray-700">Win+Alt+E</code> when a script crashes. 
        TEM automatically grabs the stack trace, extracts the source code context, and pops open Copilot Chat instantly.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 mb-20">
        <a href="/downloads/tem.exe" download className="w-full sm:w-auto">
          <Button
            type="button"
            variant="gradient"
            size="lg"
            className="rounded-lg flex items-center justify-center shadow-lg shadow-white/10 w-full"
          >
            <Download size={18} className="mr-2" />
            Download tem.exe
          </Button>
        </a>
        <a href="/downloads/tem.vsix" download className="w-full sm:w-auto">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="rounded-lg flex items-center justify-center border border-gray-700 bg-black/50 backdrop-blur-md w-full"
          >
            <Download size={18} className="mr-2" />
            Install VS Code Extension
          </Button>
        </a>
      </div>

      <div className="w-full max-w-6xl relative pb-20 z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
            alt="Code editor showing error handling"
            className="relative w-full h-auto rounded-xl shadow-2xl border border-gray-800"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

const Newsletter = React.memo(() => {
  return (
    <section className="relative py-24 px-6 border-t border-gray-800/50 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10 shadow-lg shadow-white/5">
          <Mail size={24} className="text-gray-300" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          Stay in the Loop
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter for the latest updates on TEM, including new features, OS support, and developer productivity tips.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full h-11 px-4 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
            required
          />
          <Button type="submit" variant="default" className="w-full sm:w-auto h-11 px-8 rounded-lg shadow-lg shadow-white/10 hover:bg-gray-200">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
});
Newsletter.displayName = "Newsletter";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = React.memo(() => {
  return (
    <footer className="border-t border-gray-800/50 bg-black pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-white mb-4 hover:opacity-80 transition-opacity">
              <Terminal size={24} className="text-white" />
              <span>TEM</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Stop pasting terminal errors manually. Pipe errors directly to VS Code Copilot Chat.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/firOLA3/TEM.git" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/download" className="text-sm text-gray-400 hover:text-white transition-colors">Download</Link></li>
              <li><Link href="/#installation" className="text-sm text-gray-400 hover:text-white transition-colors">Installation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/firOLA3/TEM.git" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} TEM. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Designed for Developers
          </div>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = "Footer";

export function TemLandingPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navigation />
      <Hero />
      <Newsletter />
      <Footer />
    </main>
  );
}
