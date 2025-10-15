/**
 * Footer Component
 * Displays GitHub link and random fact
 */

import { useMemo } from "react";
import { Github } from "lucide-react";
import { facts } from "../constants";

export const Footer: React.FC = () => {
  const randomFact = useMemo(() => {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
  }, []);

  return (
    <div className="absolute p-4 gap-3 flex flex-col items-center bottom-0 text-sm text-gray-600">
      <a
        className="hover:text-gray-400 hover:scale-105 transition-all flex items-center flex-col duration-200"
        href="https://github.com/ethantaylan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={20} />
        <small>@ethantaylan</small>
      </a>
      <cite className="text-center max-w-md">{randomFact}</cite>
    </div>
  );
};
