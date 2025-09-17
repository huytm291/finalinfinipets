import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadComplete();
          }, 800); // Delay để animation hoàn thành
          return 100;
        }
        return prev + 5; // Tăng chậm hơn để có cảm giác loading
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-teal-600 via-green-500 to-teal-600 animate-gradient-x backdrop-blur-md">
      <div className="relative text-center px-6 py-12 max-w-md w-full">
        {/* Paw Prints Animation - 2 icon nhấp nháy xen kẽ */}
        <div className="flex items-center justify-center space-x-6 mb-10">
          <div className="text-7xl paw-step animate-step-1">🐾</div>
          <div className="text-7xl paw-step animate-step-2">🐾</div>
        </div>

        {/* INFINIPETS Logo */}
        <h1 className={`font-coiny text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent transition-transform duration-700 ease-in-out
          ${progress >= 90 ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
        `}>
          INFINIPETS
        </h1>

        {/* Tagline */}
        <p className="text-white/90 text-xl md:text-2xl mb-14 font-light tracking-wide drop-shadow-lg">
          Infinite Styles for Infinite Personalities
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-lg">
          <div
            className="bg-gradient-to-r from-green-400 to-teal-400 h-full rounded-full shadow-md transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-white/70 text-sm mt-4 font-semibold tracking-wide">
          Loading... {Math.round(progress)}%
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-16 text-3xl opacity-20 animate-float-slow" style={{ animationDelay: '0s' }}>✨</div>
      <div className="absolute top-36 right-28 text-2xl opacity-20 animate-float-slow" style={{ animationDelay: '1.2s' }}>🎾</div>
      <div className="absolute bottom-36 left-28 text-3xl opacity-20 animate-float-slow" style={{ animationDelay: '2.4s' }}>🦴</div>
      <div className="absolute bottom-20 right-20 text-2xl opacity-20 animate-float-slow" style={{ animationDelay: '0.6s' }}>🐕</div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        @keyframes paw-step-opacity {
          0%, 100% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-5px);
          }
        }
        .paw-step {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .animate-step-1 {
          animation: paw-step-opacity 1.2s infinite;
        }
        .animate-step-2 {
          animation: paw-step-opacity 1.2s infinite;
          animation-delay: 0.6s;
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(10deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;