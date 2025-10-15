/**
 * ScenarioInput Component
 * Input field for scenario with character counter
 */

import { APP_CONFIG } from "../config/app.config";

interface ScenarioInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const ScenarioInput: React.FC<ScenarioInputProps> = ({
  value,
  onChange,
  disabled = false,
  autoFocus = true,
}) => {
  const maxLength = APP_CONFIG.validation.maxScenarioLength;

  return (
    <div className="w-full relative">
      <input
        aria-label="scenario-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-2 border-gray-700 rounded-2xl p-5 text-white placeholder:text-gray-500 placeholder:text-lg focus:border-gray-500 focus:outline-none transition-all duration-300"
        placeholder="Type your situation... be honest 👀"
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={maxLength}
      />
      <div className="absolute -bottom-6 right-2 text-xs text-gray-500">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};
