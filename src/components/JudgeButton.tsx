/**
 * JudgeButton Component
 * Submit button with loading state
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string | number>
    ) => void;
  }
}

interface JudgeButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  scenario: string;
}

export const JudgeButton: React.FC<JudgeButtonProps> = ({
  loading,
  disabled,
  onClick,
  scenario,
}) => {
  const trackEvent = async () => {
    // Send GA4 event with input value
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "judge_button_click", {
        event_category: "engagement",
        event_label: "scenario_submission",
        scenario_text: scenario,
      });
    }
  };

  return (
    <button
      type="submit"
      onClick={() => {
        trackEvent();
        onClick();
      }}
      disabled={disabled}
      className="group relative mt-10 px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-red-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
    >
      <span className="relative z-10">
        {loading ? "🔥 JUDGING..." : "JUDGE ME 🔥"}
      </span>
    </button>
  );
};
