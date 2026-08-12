'use client';
import React from "react";
import { Waves } from "./wave-background";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

import { ArrowRight, Menu, X, Terminal, Download } from "lucide-react";

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <Terminal size={24} className="text-white" />
            <span>TEM</span>
          </div>
          
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </a>
            <a href="#installation" className="text-sm text-white/60 hover:text-white transition-colors">
              Installation
            </a>
            <a href="https://github.com/firOLA3/TEM.git" className="text-sm text-white/60 hover:text-white transition-colors">
              GitHub
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button type="button" variant="ghost" size="sm">
              View Source
            </Button>
            <Button type="button" variant="default" size="sm">
              <Download size={16} /> Download
            </Button>
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
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#installation"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Installation
            </a>
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
              <Button type="button" variant="default" size="sm">
                <Download size={16} /> Download
              </Button>
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

export function TemLandingPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navigation />
      <Hero />
    </main>
  );
}
