/**
 * ErrorMessage Component
 * Displays error messages
 */

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-12 text-xl font-normal text-[#ef4444] tracking-[0.1em] animate-[fadeInUp_0.6s_ease-out]">
      <p>Error: {error}</p>
    </div>
  );
};
