import { useState, useCallback, useMemo } from "react";
import { facts, MESSAGES } from "./constants";
import { isNameC00ked } from "./utils/nameValidator";
import type { CookStatus } from "./types";
import c00kedDog from "./assets/c00ked-dog.webp";
import waitingVideo from "./assets/waiting.mp4";
import { Github } from "lucide-react";

export default function App() {
  const [name, setName] = useState("");
  const [isC00ked, setIsC00ked] = useState<CookStatus>(null);

  const handleInputChange = useCallback((value: string) => {
    setName(value);

    if (!value.trim()) {
      setIsC00ked(null);
      return;
    }

    setIsC00ked(isNameC00ked(value));
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setIsC00ked(null);
    setName("");
  }, []);

  const randomFact = useMemo(() => {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
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
        <h1 className="text-3xl sm:text-5xl md:text-7xl tracking-wider">
          {MESSAGES.TITLE}
        </h1>

        {/* Input */}
        <div className="mx-auto w-full flex items-center justify-center mt-10">
          <input
            aria-label="name-input"
            value={name}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full border-b p-5 placeholder:text-xl"
            placeholder={MESSAGES.PLACEHOLDER}
            autoFocus
          />
        </div>

        {/* Success Message */}
        {isC00ked === false && name.trim() !== "" && (
          <div className="mt-12 text-2xl font-normal text-[#4ade80] tracking-[0.1em] animate-[fadeInUp_0.6s_ease-out] [text-shadow:0_0_20px_rgba(74,222,128,0.5)]">
            <p>{MESSAGES.SUCCESS}</p>
          </div>
        )}
      </div>
      {/* C00ked Overlay */}
      {isC00ked === true && (
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
              className="max-w-[600px] w-[85vw] h-auto rounded-lg [filter:grayscale(0%)_contrast(1.1)]"
              src={c00kedDog}
              alt="c00ked dog"
            />
            <div className="text-[clamp(3rem,12vw,6rem)] font-bold text-white tracking-[0.5em] ml-[0.5em] uppercase animate-[fadeInUp_1s_ease-out_2s_forwards] opacity-0">
              {MESSAGES.C00KED}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <a
        href="https://github.com/ethantaylan"
        className="absolute p-4 gap-3 flex flex-col items-center bottom-0 text-sm text-gray-600 hover:text-gray-400 "
      >
        <Github size={20} />
        <small>@ethantaylan</small>
        <cite className="text-center ">{randomFact}</cite>
      </a>
    </div>
  );
}
