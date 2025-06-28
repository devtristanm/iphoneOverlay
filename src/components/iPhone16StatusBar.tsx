import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  className?: string;
}

export const iPhone16StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [isCharging, setIsCharging] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes}`;
  };

  const SignalBars = () => (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[3px] bg-white rounded-full transition-all duration-300 ${
            bar <= 3 ? 'opacity-100' : 'opacity-30'
          }`}
          style={{ height: `${bar * 3 + 2}px` }}
        />
      ))}
    </div>
  );

  const WifiBars = () => (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className="w-[3px] bg-white rounded-full opacity-100"
          style={{ height: `${bar * 4 + 2}px` }}
        />
      ))}
    </div>
  );

  const BatteryIndicator = () => (
    <div className="flex items-center gap-1">
      <span className="text-white text-[15px] font-medium leading-none">{batteryLevel}%</span>
      <div className="relative">
        <div className="w-[27px] h-[13px] border-[1.5px] border-white/60 rounded-[3px] relative">
          <div
            className={`absolute top-[1px] left-[1px] h-[7px] rounded-[1px] transition-all duration-300 ${
              isCharging
                ? 'bg-green-400'
                : batteryLevel > 20
                ? 'bg-white'
                : 'bg-red-500'
            }`}
            style={{ width: `${(batteryLevel / 100) * 21}px` }}
          />
          <div className="absolute -right-[5px] top-[3px] w-[2px] h-[6px] bg-white/60 rounded-full" />
        </div>
        {isCharging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                d="M3.8 7.2H1.6L4.4 0H6.6L5.2 4.8H8.4L4.4 12L3.8 7.2Z"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Dynamic Island */}
      <div className="flex justify-center mb-2">
        <div className="w-32 h-8 bg-black rounded-full shadow-lg border border-gray-800" />
      </div>
      
      {/* Status Bar with black background for visibility */}
      <div className="bg-black rounded-[25px] px-6 py-3">
        <div className="flex justify-between items-center text-white">
          {/* Left side - Time */}
          <div className="flex items-center">
            <span className="text-[17px] font-semibold leading-none tracking-tight">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-3">
            <SignalBars />
            <WifiBars />
            <BatteryIndicator />
          </div>
        </div>
      </div>
    </div>
  );
};