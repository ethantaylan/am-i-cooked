/**
 * VideoHeader Component
 * Displays the animated video and title - Responsive & Translated
 * @module components/VideoHeader
 */

import { useApp } from "../contexts/AppContext";
import waitingVideo from "../assets/waiting.mp4";

export const VideoHeader: React.FC = () => {
  const { t, theme } = useApp();
  const isDark = theme === "dark";

  return (
    <>
      {/* Video - Responsive */}
      <div className="mb-6 sm:mb-8 flex justify-center items-center animate-[fadeInSlow_2s_ease-out]">
        <video
          className={`w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] border-2 sm:border-3 hover:scale-105 duration-300 rounded-full object-cover shadow-[0_0_20px_rgba(255,255,255,0.2)] ${
            isDark ? "border-gray-700" : "border-gray-300"
          }`}
          src={waitingVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Title - Responsive & Translated */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider uppercase ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {t.title}
      </h1>
    </>
  );
};
