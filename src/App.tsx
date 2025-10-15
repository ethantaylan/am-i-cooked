import { useState, useCallback } from "react";
import { MESSAGES } from "./constants";
import { isNameCooked } from "./utils/nameValidator";
import type { CookStatus } from "./types";
import cookedDog from "./assets/cooked-dog.webp";
import waitingVideo from "./assets/waiting.mp4";

export default function App() {
  const [name, setName] = useState("");
  const [isCooked, setIsCooked] = useState<CookStatus>(null);

  const handleInputChange = useCallback((value: string) => {
    setName(value);

    if (!value.trim()) {
      setIsCooked(null);
      return;
    }

    setIsCooked(isNameCooked(value));
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setIsCooked(null);
    setName("");
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center text-white overflow-hidden">
      <div className="w-full max-w-[600px] px-8 text-center animate-[fadeInUp_0.8s_ease-out]">
        {/* Video - Always visible */}
        <div className="mb-8 flex justify-center items-center animate-[fadeInSlow_2s_ease-out]">
          <video
            className="w-[200px] h-[200px] rounded-full object-cover shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            src={waitingVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Title */}
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-light tracking-[-0.02em] mb-16 transition-all duration-300 hover:tracking-[0.1em]">
          {MESSAGES.TITLE}
        </h1>

        {/* Input */}
        <div className="mx-auto max-w-[500px]">
          <input
            aria-label="name-input"
            value={name}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-8 py-6 text-2xl font-light bg-transparent border-none border-b-2 border-white/20 text-white text-center outline-none transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.05em] placeholder:text-white/30 placeholder:font-light focus:border-b-white focus:pb-7 hover:border-b-white/50"
            placeholder={MESSAGES.PLACEHOLDER}
            autoFocus
          />
        </div>

        {/* Success Message */}
        {isCooked === false && name.trim() !== "" && (
          <div className="mt-12 text-2xl font-normal text-[#4ade80] tracking-[0.1em] animate-[fadeInUp_0.6s_ease-out] [text-shadow:0_0_20px_rgba(74,222,128,0.5)]">
            <p>{MESSAGES.SUCCESS}</p>
          </div>
        )}
      </div>

      {/* Cooked Overlay */}
      {isCooked === true && (
        <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[1000]">
          {/* Close Button */}
          <button
            className="fixed top-8 right-8 w-[50px] h-[50px] rounded-full bg-white/10 border-2 border-white/30 text-white text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] animate-[fadeInSlow_1s_ease-out_2s_forwards] opacity-0 hover:bg-white/20 hover:border-white/60 hover:scale-110 active:scale-95"
            onClick={handleCloseOverlay}
            aria-label="Close overlay"
          >
            ✕
          </button>

          {/* Content */}
          <div className="flex flex-col items-center justify-center gap-8 animate-[fadeInSlow_3s_ease-in_forwards] opacity-0">
            <img
              className="max-w-[600px] w-[85vw] h-auto rounded-lg grayscale-0 contrast-110"
              src={cookedDog}
              alt="cooked dog"
            />
            <div className="text-[clamp(3rem,12vw,6rem)] font-bold text-white tracking-[0.5em] ml-[0.5em] uppercase animate-[fadeInUp_1s_ease-out_2s_forwards] opacity-0">
              {MESSAGES.COOKED}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
