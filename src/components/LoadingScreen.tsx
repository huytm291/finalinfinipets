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
          }, 1000); // Delay để animation hoàn thành
          return 100;
        }
        return prev + 3; // Tăng chậm hơn để có cảm giác loading
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg relative overflow-hidden animate-gradient-x"
      style={{
        backgroundImage: 'linear-gradient(270deg, #0d9488, #22c55e, #0d9488)', // tương đương from-teal-700 via-green-600 to-teal-700
        backgroundSize: '400% 400%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-white/10 blur-3xl pointer-events-none animate-glow"></div>

      <div className="relative text-center px-6 py-12 max-w-md w-full z-10">
        {/* Paw Prints Animation - 2 icon nhấp nháy xen kẽ với scale và glow */}
        <div className="flex items-center justify-center space-x-6 mb-10">
          <div className="text-7xl paw-step animate-step-1">🐾</div>
          <div className="text-7xl paw-step animate-step-2">🐾</div>
        </div>

        {/* INFINIPETS Logo với shimmer gradient */}
        <h1
          className={`font-coiny text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-green-300 to-white bg-clip-text text-transparent relative overflow-hidden
          transition-transform duration-700 ease-in-out
          ${progress >= 90 ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
        `}
        >
          INFINIPETS
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 animate-shimmer pointer-events-none"></span>
        </h1>

        {/* Tagline */}
        <p className="text-white/90 text-xl md:text-2xl mb-14 font-light tracking-wide drop-shadow-lg">
          Infinite Styles for Infinite Personalities
        </p>

        {/* Progress Bar với shimmer */}
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden shadow-lg relative">
          <div
            className="h-full rounded-full shadow-md transition-all duration-300 ease-out bg-gradient-to-r from-green-400 to-teal-400 relative overflow-hidden"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/60 to-white/30 opacity-50 animate-shimmer pointer-events-none"></div>
          </div>
        </div>
        <p className="text-white/70 text-sm mt-4 font-semibold tracking-wide select-none">
          Loading... {Math.round(progress)}%
        </p>
      </div>

      {/* Floating Elements với chuyển động đa chiều và xoay */}
      <div
        className="absolute top-16 left-16 text-3xl opacity-20 animate-float-xy"
        style={{ animationDelay: '0s' }}
      >
        ✨
      </div>
      <div
        className="absolute top-36 right-28 text-2xl opacity-20 animate-float-xy"
        style={{ animationDelay: '1.2s' }}
      >
        🎾
      </div>
      <div
        className="absolute bottom-36 left-28 text-3xl opacity-20 animate-float-xy"
        style={{ animationDelay: '2.4s' }}
      >
        🦴
      </div>
      <div
        className="absolute bottom-20 right-20 text-2xl opacity-20 animate-float-xy"
        style={{ animationDelay: '0.6s' }}
      >
        🐕
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-glow {
          animation: glow 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes paw-step-opacity-scale {
          0%,
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-8px) scale(1.2);
            text-shadow: 0 0 20px rgba(255, 255, 255, 1);
          }
        }
        .paw-step {
          transition: opacity 0.3s ease, transform 0.3s ease;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
        }
        .animate-step-1 {
          animation: paw-step-opacity-scale 1.2s infinite;
        }
        .animate-step-2 {
          animation: paw-step-opacity-scale 1.2s infinite;
          animation-delay: 0.6s;
        }
        @keyframes float-xy {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translate(5px, -8px) rotate(5deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(-5px, 8px) rotate(-5deg);
            opacity: 0.25;
          }
          75% {
            transform: translate(3px, -5px) rotate(3deg);
            opacity: 0.3;
          }
        }
        .animate-float-xy {
          animation: float-xy 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;