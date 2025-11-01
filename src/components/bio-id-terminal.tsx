
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const BioIDTerminal = () => {
  const [scanning, setScanning] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleScan = () => {
    if (scanning || accessGranted) return;

    setScanning(true);
    setTimeout(() => {
      setAccessGranted(true);
      setScanning(false);
    }, 2000);
  };
  
  const handleNavigate = () => {
      document.body.classList.add('is-nav-scrolling');
      setTimeout(() => {
        router.push('/members');
        setTimeout(() => document.body.classList.remove('is-nav-scrolling'), 100);
      }, 800);
  }

  const handleClick = () => {
    if(accessGranted) {
      handleNavigate();
    } else {
      handleScan();
    }
  };

  return (
      <div className="flex flex-col md:flex-row gap-4 items-center bg-background/80 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-primary/30 box-glow-primary w-full max-w-4xl mx-auto">
        <div className="relative w-48 md:w-56 flex-shrink-0 flex flex-col items-center gap-2">
          <div
            className="bio-id-scanner group"
            onClick={handleClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            role="button"
            tabIndex={0}
            aria-label="Bio-ID Scanner"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                width="200"
                height="200"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <rect x="20" y="20" width="160" height="160" rx="5" stroke="hsl(var(--accent) / 0.4)" strokeWidth="1" fill="none" />
                <rect x="30" y="30" width="140" height="140" rx="3" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" fill="none" />
                
                 <g stroke="hsl(var(--accent) / 0.2)" strokeWidth="1">
                    <line x1="100" y1="10" x2="100" y2="40" />
                    <line x1="100" y1="160" x2="100" y2="190" />
                    <line x1="10" y1="100" x2="40" y2="100" />
                    <line x1="160" y1="100" x2="190" y2="100" />
                </g>

                 <rect 
                    x="65" y="65" 
                    width="70" height="70" 
                    rx="2" 
                    stroke="hsl(var(--primary) / 0.5)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    transform="rotate(45 100 100)"
                />


                <g stroke="#00ff00" strokeWidth="2.5" opacity={hovering ? "1" : "0.7"} className="transition-opacity duration-300">
                  <path d="M 40 40 L 40 60 M 40 40 L 60 40" />
                  <path d="M 160 40 L 140 40 M 160 40 L 160 60" />
                  <path d="M 40 160 L 40 140 M 40 160 L 60 160" />
                  <path d="M 160 160 L 140 160 M 160 160 L 160 140" />
                </g>

                {hovering && !scanning && (
                  <g stroke="#ff00ff" strokeWidth="1" opacity="0.8">
                    <line x1="50" y1="100" x2="70" y2="100" strokeDasharray="2 2" />
                    <line x1="130" y1="100" x2="150" y2="100" strokeDasharray="2 2" />
                    <line x1="100" y1="50" x2="100" y2="70" strokeDasharray="2 2" />
                    <line x1="100" y1="130" x2="100" y2="150" strokeDasharray="2 2" />
                  </g>
                )}

                <g className={!scanning ? "animate-iris-pulse" : ""}>
                  {Array.from({length: 16}).map((_, i) => (
                    <path
                      key={`cyan-${i}`}
                      d={`M 100 100 L ${100 + 40 * Math.cos(i * Math.PI / 8)} ${100 + 40 * Math.sin(i * Math.PI / 8)} A 40 40 0 0 1 ${100 + 40 * Math.cos((i + 1) * Math.PI / 8)} ${100 + 40 * Math.sin((i + 1) * Math.PI / 8)} Z`}
                      fill="#00ffff"
                      opacity={i % 3 === 0 ? "0.4" : i % 3 === 1 ? "0.2" : "0.1"}
                    />
                  ))}
                  
                  {Array.from({length: 12}).map((_, i) => (
                    <path
                      key={`pink-${i}`}
                      d={`M 100 100 L ${100 + 30 * Math.cos(i * Math.PI / 6)} ${100 + 30 * Math.sin(i * Math.PI / 6)} A 30 30 0 0 1 ${100 + 30 * Math.cos((i + 1) * Math.PI / 6)} ${100 + 30 * Math.sin((i + 1) * Math.PI / 6)} Z`}
                      fill="#ff00ff"
                      opacity={i % 2 === 0 ? "0.5" : "0.3"}
                    />
                  ))}
                  
                  {Array.from({length: 8}).map((_, i) => (
                    <path
                      key={`green-${i}`}
                      d={`M 100 100 L ${100 + 22 * Math.cos(i * Math.PI / 4)} ${100 + 22 * Math.sin(i * Math.PI / 4)} A 22 22 0 0 1 ${100 + 22 * Math.cos((i + 1) * Math.PI / 4)} ${100 + 22 * Math.sin((i + 1) * Math.PI / 4)} Z`}
                      fill="#00ff00"
                      opacity={i % 2 === 0 ? "0.6" : "0.4"}
                    />
                  ))}
                </g>

                <circle
                  cx="100"
                  cy="100"
                  r="15"
                  fill="#000000"
                  opacity="0.9"
                />

                {scanning && (
                  <g>
                    <defs>
                      <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
                        <stop offset="45%" stopColor="#00ffff" stopOpacity="0.8" />
                        <stop offset="55%" stopColor="#ff00ff" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="30"
                      y="30"
                      width="140"
                      height="4"
                      fill="url(#scanGradient)"
                      className="animate-scan-line"
                    />
                  </g>
                )}

                {accessGranted && (
                  <g>
                    <circle
                      cx="100"
                      cy="100"
                      r="50"
                      stroke="#00ff00"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.8"
                    />
                    <path
                      d="M 80 100 L 95 115 L 120 85"
                      stroke="#00ff00"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                    />
                  </g>
                )}
              </svg>
          </div>
          {!scanning && !accessGranted && (
            <div className="text-accent text-xs font-code whitespace-nowrap text-glow-accent animate-pulse">
              CLICK TO SCAN
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center mx-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full ${ i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-500' } animate-pulse`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
          <div className="text-cyan-400 text-xs mx-2 font-code">AUTH</div>
          {[...Array(4)].map((_, i) => (
            <div
              key={i + 4}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full ${ i % 2 === 0 ? 'bg-green-400' : 'bg-cyan-400' } animate-pulse`}
              style={{ animationDelay: `${(i + 4) * 0.15}s` }}
            />
          ))}
        </div>

        <div className="bg-card/50 border border-green-400 rounded-sm p-3 md:p-4 w-full font-code text-xs md:text-sm flex-grow">
          <div className="text-green-400 mb-2 text-center font-bold border-b border-green-400/30 pb-1 text-sm">
            BIO-ID TERMINAL v2.1
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-cyan-400 mr-2">USER:</span>
              <span className="text-pink-500 text-right font-bold">EDGERUNNERS</span>
            </div>
            <div className="flex justify-between items-center flex-wrap">
              <span className="text-cyan-400 mr-2">STATUS:</span>
              <span className={cn('text-right font-bold',
                accessGranted ? 'text-green-400' : scanning ? 'text-yellow-400 animate-pulse' : 'text-red-500'
              )}>
                {accessGranted ? 'ACCESS GRANTED' : scanning ? 'SCANNING...' : 'AWAITING SCAN'}
              </span>
            </div>

            {accessGranted && (
              <>
                <div className="border-t border-green-400/30 pt-2 mt-2">
                  <div className="flex justify-between items-center flex-wrap mb-1">
                    <span className="text-cyan-400 mr-2">CLEARANCE:</span>
                    <span className="text-pink-500 text-right font-bold">ADMIN</span>
                  </div>
                  <div className="flex justify-between items-center flex-wrap">
                    <span className="text-cyan-400 mr-2">LINK:</span>
                    <button
                      onClick={handleNavigate}
                      className="hover:text-background px-2 py-0.5 cursor-pointer transition-colors text-xs md:text-sm border-none font-code focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-opacity-50 bg-green-400 text-background rounded-sm whitespace-nowrap font-bold"
                    >
                      ACCESS TEAM DATABASE
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-green-400/30">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={cn('w-2 h-2 rounded-full',
                    accessGranted ? 'bg-green-400' : scanning ? 'bg-yellow-400 animate-pulse' : 'bg-red-500'
                )}
              ></div>
              <span className="text-green-400">
                {accessGranted ? 'SYSTEM READY' : scanning ? 'PROCESSING...' : 'STANDBY MODE'}
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BioIDTerminal;
