# 🔥 Am I Cooked?

> **The ultimate truth detector for your existence**
> Type your name. Face the reality. No escape.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 What is this?

A brutally honest web app that tells you if you're **COOKED** or not. Just type your name and prepare yourself for the truth.

### ✨ Features

- 🎬 **Cinematic Experience** - Dramatic fade-ins and smooth animations
- 🎥 **Waiting Animation** - A hypnotic looping video while you contemplate your existence
- 🐕 **The Ultimate Reveal** - If you're cooked, you'll know it
- 😎 **Safe Zone** - Green light if you're good... *for now*
- ⚡ **Lightning Fast** - Built with Vite for instant hot reload
- 📱 **Fully Responsive** - Works perfectly on all devices
- ♿ **Accessible** - ARIA labels and semantic HTML

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to directory
cd am-i-cooked

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

This project follows **SMART Architecture** principles:

```
src/
├── assets/              # Static files (images, videos)
├── constants/           # Configuration & constants
│   └── index.ts        # COOKED_NAMES, messages, durations
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── utils/              # Pure utility functions
│   └── nameValidator.ts # Name checking logic
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles + animations
```

### 🧠 Design Principles

- **Separation of Concerns** - Each file has a single responsibility
- **Pure Functions** - Testable, predictable utilities
- **Type Safety** - Full TypeScript coverage
- **Performance** - Optimized with `useCallback` and memoization
- **Clean Code** - Self-documenting with clear naming

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **TypeScript** | Type safety and developer experience |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite** | Lightning-fast build tool |

## 🔧 Customization

### Adding New "Cooked" Names

Edit [`src/constants/index.ts`](src/constants/index.ts):

```typescript
export const COOKED_NAMES = [
  "leah",
  "kayz",
  "yourname", // Add your name here
] as const;
```

The validator automatically handles:
- ✅ Case insensitivity (`LEAH` = `leah`)
- ✅ Accent removal (`Léah` = `Leah`)
- ✅ Whitespace trimming

### Changing Messages

Update the `MESSAGES` constant in [`src/constants/index.ts`](src/constants/index.ts):

```typescript
export const MESSAGES = {
  SUCCESS: "😎 you are good, for now",
  COOKED: "COOKED",
  TITLE: "am i cooked?",
  PLACEHOLDER: "enter name...",
} as const;
```

### Adjusting Animation Timing

Modify `ANIMATION_DURATIONS` in [`src/constants/index.ts`](src/constants/index.ts):

```typescript
export const ANIMATION_DURATIONS = {
  VIDEO_FADE_IN: 2000,      // Video fade duration (ms)
  OVERLAY_FADE_IN: 3000,    // Overlay fade duration (ms)
  CLOSE_BUTTON_DELAY: 2000, // Close button appearance delay (ms)
} as const;
```

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
```

## 🎭 How It Works

1. **Type a name** - The app checks in real-time
2. **Watch the video** - A looping animation keeps you entertained
3. **Get the verdict**:
   - ✅ **Green message** - You're safe (for now)
   - 🔥 **COOKED** - The dramatic overlay appears with a meme
4. **Close and retry** - Click the ✕ button to try another name

## 🧪 Code Quality

- ✅ **TypeScript** - 100% type coverage
- ✅ **ESLint** - Enforced code standards
- ✅ **Functional Components** - Modern React patterns
- ✅ **Performance Optimized** - Memoized callbacks
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **No Dependencies Bloat** - Only essential packages

## 📱 Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎓 Learning Resources

This project demonstrates:
- React hooks (`useState`, `useCallback`)
- TypeScript best practices
- Tailwind CSS utility-first approach
- Vite configuration
- Clean code architecture
- Component composition

## 🤝 Contributing

Want to add more cooked names? Feel free to:
1. Fork the repo
2. Add names to `COOKED_NAMES`
3. Submit a PR

## 📄 License

MIT - Do whatever you want with this

---

<div align="center">

**Built with 🔥 and React**

[⭐ Star on GitHub](.) • [🐛 Report Bug](.) • [✨ Request Feature](.)

</div>
