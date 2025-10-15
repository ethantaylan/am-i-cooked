/**
 * ResultOverlay Component
 * Displays the judgement result (cooked or safe)
 */

import { MESSAGES } from "../constants";
import c00kedDog from "../assets/c00ked-dog.webp";
import type { AIJudgement } from "../types";

interface ResultOverlayProps {
  isCooked: boolean;
  aiJudgement: AIJudgement | null;
  onClose: () => void;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({
  isCooked,
  aiJudgement,
  onClose,
}) => {
  if (isCooked) {
    return <CookedOverlay aiJudgement={aiJudgement} onClose={onClose} />;
  }

  if (aiJudgement) {
    return <SafeOverlay aiJudgement={aiJudgement} onClose={onClose} />;
  }

  return null;
};

/**
 * Cooked Overlay - Red theme
 */
const CookedOverlay: React.FC<{
  aiJudgement: AIJudgement | null;
  onClose: () => void;
}> = ({ aiJudgement, onClose }) => (
  <div className="fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-sm flex items-center justify-center z-[1000] animate-[fadeInSlow_0.4s_ease-out]">
    <CloseButton onClose={onClose} hoverColor="red" />

    <div className="flex flex-col items-center justify-center gap-6 animate-[fadeInUp_0.6s_ease-out] px-6 max-w-[500px]">
      {aiJudgement ? (
        <>
          <PercentageDisplay
            percentage={aiJudgement.percentage}
            color="red"
            emoji="🔥"
          />
          <GradientText
            text={MESSAGES.C00KED}
            gradient="from-red-500 via-orange-500 to-yellow-500"
          />
          <VerdictBubble verdict={aiJudgement.verdict} />
          <img
            className="w-[200px] h-[200px] object-cover rounded-full border-4 border-gray-800 shadow-[0_0_40px_rgba(239,68,68,0.4)] mt-2"
            src={c00kedDog}
            alt="c00ked dog"
          />
        </>
      ) : (
        <>
          <GradientText
            text={MESSAGES.C00KED}
            gradient="from-red-500 via-orange-500 to-yellow-500"
          />
          <img
            className="w-[250px] h-[250px] object-cover rounded-full border-4 border-gray-800 shadow-[0_0_40px_rgba(239,68,68,0.4)]"
            src={c00kedDog}
            alt="c00ked dog"
          />
        </>
      )}
      <HintText />
    </div>
  </div>
);

/**
 * Safe Overlay - Green theme
 */
const SafeOverlay: React.FC<{
  aiJudgement: AIJudgement;
  onClose: () => void;
}> = ({ aiJudgement, onClose }) => (
  <div className="fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-sm flex items-center justify-center z-[1000] animate-[fadeInSlow_0.4s_ease-out]">
    <CloseButton onClose={onClose} hoverColor="green" />

    <div className="flex flex-col items-center justify-center gap-6 animate-[fadeInUp_0.6s_ease-out] px-6 max-w-[500px]">
      <PercentageDisplay
        percentage={aiJudgement.percentage}
        color="green"
        emoji="✨"
      />
      <GradientText
        text="YOU'RE SAFE"
        gradient="from-green-400 via-emerald-500 to-teal-500"
      />
      <VerdictBubble verdict={aiJudgement.verdict} />
      <div className="text-[120px] leading-none mt-2">😎</div>
      <HintText />
    </div>
  </div>
);

/**
 * Close Button Component
 */
const CloseButton: React.FC<{
  onClose: () => void;
  hoverColor: "red" | "green";
}> = ({ onClose, hoverColor }) => {
  const hoverClass =
    hoverColor === "red"
      ? "hover:bg-red-500/80 hover:border-red-500"
      : "hover:bg-green-500/80 hover:border-green-500";

  return (
    <button
      className={`fixed top-6 right-6 w-12 h-12 rounded-full bg-gray-900 border border-gray-700 text-white text-xl cursor-pointer flex items-center justify-center transition-all duration-200 z-[1001] hover:rotate-90 active:scale-90 ${hoverClass}`}
      onClick={onClose}
      aria-label="Close overlay"
    >
      ✕
    </button>
  );
};

/**
 * Percentage Display Component
 */
const PercentageDisplay: React.FC<{
  percentage: number;
  color: "red" | "green";
  emoji: string;
}> = ({ percentage, color, emoji }) => {
  const colorClass =
    color === "red"
      ? "text-[#ef4444] [text-shadow:0_0_60px_rgba(239,68,68,0.8)]"
      : "text-[#4ade80] [text-shadow:0_0_60px_rgba(74,222,128,0.8)]";

  return (
    <div className="relative">
      <div
        className={`text-[clamp(5rem,20vw,10rem)] font-black tracking-tight leading-none ${colorClass}`}
      >
        {percentage}%
      </div>
      <div className="absolute -top-6 -right-8 text-4xl animate-bounce">
        {emoji}
      </div>
    </div>
  );
};

/**
 * Gradient Text Component
 */
const GradientText: React.FC<{
  text: string;
  gradient: string;
}> = ({ text, gradient }) => (
  <div
    className={`text-[clamp(2rem,8vw,4rem)] font-black tracking-[0.3em] uppercase [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] bg-gradient-to-r ${gradient} bg-clip-text text-transparent text-center`}
  >
    {text}
  </div>
);

/**
 * Verdict Bubble Component
 */
const VerdictBubble: React.FC<{ verdict: string }> = ({ verdict }) => (
  <div className="relative bg-gray-900 backdrop-blur-md border border-gray-700 rounded-3xl px-6 py-4 max-w-[400px]">
    <div className="text-base md:text-lg text-white text-center leading-relaxed font-medium">
      {verdict}
    </div>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 border-b border-r border-gray-700 rotate-45"></div>
  </div>
);

/**
 * Hint Text Component
 */
const HintText: React.FC = () => (
  <div className="text-sm text-gray-500 mt-2">press ✕ to try again</div>
);
