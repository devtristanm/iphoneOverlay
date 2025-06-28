import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  className?: string;
}

export const iPhone16StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(87);
  const [isCharging] = useState(true);

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
          className={`w-[3px] bg-white rounded-sm transition-all duration-300 ${
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
          className="w-[3px] bg-white rounded-sm opacity-100"
          style={{ height: `${bar * 4 + 2}px` }}
        />
      ))}
    </div>
  );

  const BatteryIndicator = () => (
    <div className="flex items-center gap-1">
      <span className="text-white text-sm font-medium leading-none">{batteryLevel}%</span>
      <div className="relative">
        <div className="w-6 h-3 border border-white/60 rounded-sm relative bg-black">
          <div
            className={`absolute top-0.5 left-0.5 h-2 rounded-sm transition-all duration-300 ${
              isCharging
                ? 'bg-green-400'
                : batteryLevel > 20
                ? 'bg-white'
                : 'bg-red-500'
            }`}
            style={{ width: `${Math.max(2, (batteryLevel / 100) * 20)}px` }}
          />
          <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white/60 rounded-full" />
        </div>
        {isCharging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 text-black">
              ⚡
            </div>
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
      <div className="bg-black rounded-3xl px-6 py-3 shadow-lg">
        <div className="flex justify-between items-center text-white">
          {/* Left side - Time */}
          <div className="flex items-center">
            <span className="text-lg font-semibold leading-none tracking-tight">
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