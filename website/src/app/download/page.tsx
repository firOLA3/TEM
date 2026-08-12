import { Navigation, Button } from "@/components/ui/tem-landing";
import { Waves } from "@/components/ui/wave-background";
import { Monitor, Apple, Terminal, Download } from "lucide-react";
import Link from "next/link";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navigation />
      
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32 overflow-hidden"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <Waves className="absolute inset-0 z-0 opacity-40 pointer-events-none" strokeColor="#ffffff" backgroundColor="#000000" pointerSize={0.5} />
        
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { font-family: 'Inter', sans-serif; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mt-16 md:mt-0">
          Download TEM
        </h1>
        <p className="text-gray-400 text-center max-w-lg mb-12 z-10">
          Select your operating system below. TEM is currently optimized for Windows, with macOS and Linux support coming soon.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
          {/* Windows (Active) */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:scale-105 hover:border-gray-500 shadow-xl shadow-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Monitor size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 relative z-10">Windows</h3>
            <p className="text-sm text-gray-400 mb-8 flex-grow relative z-10">
              Windows 10/11 (64-bit)<br />Requires Windows Terminal
            </p>
            <div className="w-full space-y-3 relative z-10">
              <a href="/downloads/tem.exe" download className="block w-full">
                <Button variant="gradient" className="w-full h-11 text-sm font-semibold rounded-lg shadow-lg shadow-white/10">
                  <Download size={16} className="mr-2" />
                  tem.exe (Daemon)
                </Button>
              </a>
              <a href="/downloads/tem.vsix" download className="block w-full">
                <Button variant="secondary" className="w-full h-11 text-sm font-semibold rounded-lg border border-gray-700 bg-black/50 backdrop-blur-md hover:bg-gray-800">
                  <Download size={16} className="mr-2" />
                  VS Code Extension
                </Button>
              </a>
            </div>
          </div>
          
          {/* macOS (Dummy) */}
          <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center opacity-70">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 text-gray-400">
              <Apple size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-300">macOS</h3>
            <p className="text-sm text-gray-500 mb-8 flex-grow">
              macOS 12+ (Intel & Apple Silicon)<br />Currently in development
            </p>
            <div className="w-full">
              <Button variant="secondary" className="w-full h-11 rounded-lg border border-gray-800 bg-black/30" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
          
          {/* Linux (Dummy) */}
          <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center opacity-70">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 text-gray-400">
              <Terminal size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-300">Linux</h3>
            <p className="text-sm text-gray-500 mb-8 flex-grow">
              Debian, Ubuntu, Fedora<br />Currently in development
            </p>
            <div className="w-full">
              <Button variant="secondary" className="w-full h-11 rounded-lg border border-gray-800 bg-black/30" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
