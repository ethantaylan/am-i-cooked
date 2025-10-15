# 🔥 Am I C00ked?

> **The ultimate truth detector for your existence**
> Type your name. Face the reality. No escape.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 What is this?

A brutally honest web app powered by **AI** that judges how "cooked" you are based on your situation. Describe your scenario and get an instant verdict with a cooking percentage!

### ✨ Features

- 🤖 **AI-Powered Judgement** - OpenAI analyzes your situation and rates how cooked you are (0-100%)
- 🎬 **Cinematic Experience** - Dramatic fade-ins and smooth animations
- 🎥 **Waiting Animation** - A hypnotic looping video while you contemplate your existence
- 🐕 **The Ultimate Reveal** - If you're c00ked, you'll see the percentage and a witty verdict
- 😎 **Safe Zone** - Green light if you're good... _for now_
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

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your secret trigger words AND OpenAI API key

# Start the backend server (in one terminal)
npm run dev:backend

# Start the frontend dev server (in another terminal)
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
│   └── index.ts        # C00KED_NAMES, messages, durations
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

| Technology          | Purpose                              |
| ------------------- | ------------------------------------ |
| **React 18**        | UI library with hooks                |
| **TypeScript**      | Type safety and developer experience |
| **Tailwind CSS v4** | Utility-first styling                |
| **Vite**            | Lightning-fast build tool            |
| **Express**         | Backend server                       |
| **OpenAI API**      | AI-powered judgement system          |

## 🔧 Customization

### 🔐 Environment Setup

**IMPORTANT:** Secrets are stored in environment variables to keep them safe.

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit [`.env.local`](.env.local) and add your configuration:

   ```env
   # Predefined trigger words (comma-separated)
   VITE_C00KED_NAMES=name1,name2,name3

   # OpenAI API Key (required for AI judgement)
   OPENAI_API_KEY=sk-your-api-key-here

   # Server port (optional, defaults to 3001)
   PORT=3001
   ```

3. **Security Note:** The `.env.local` file is gitignored and will never be committed to GitHub.

4. **Get an OpenAI API Key:** Visit [OpenAI Platform](https://platform.openai.com/api-keys) to create your API key.

### Changing Messages

Update the `MESSAGES` constant in [`src/constants/index.ts`](src/constants/index.ts):

```typescript
export const MESSAGES = {
  SUCCESS: "😎 you are good, for now",
  C00KED: "C00KED",
  TITLE: "am i c00ked?",
  PLACEHOLDER: "enter name...",
} as const;
```

### Adjusting Animation Timing

Modify `ANIMATION_DURATIONS` in [`src/constants/index.ts`](src/constants/index.ts):

```typescript
export const ANIMATION_DURATIONS = {
  VIDEO_FADE_IN: 2000, // Video fade duration (ms)
  OVERLAY_FADE_IN: 3000, // Overlay fade duration (ms)
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

1. **Describe your situation** - Type anything like "I shit on myself" or "I forgot my girlfriend's birthday"
2. **Click "Am I Cooked?"** - The AI analyzes your scenario
3. **Get the verdict**:
   - ✅ **Green message** - You're safe (for now)
   - 🔥 **C00KED** - A dramatic overlay shows your cooking percentage (0-100%) and a witty AI verdict
4. **Close and retry** - Click the ✕ button to try another scenario

### Example Scenarios to Try:

- "I accidentally sent a message about my boss to my boss"
- "I forgot my anniversary"
- "I said 'you too' when the waiter said 'enjoy your meal'"
- "I called my teacher 'mom' in class"

## 🧪 Code Quality

- ✅ **TypeScript** - 100% type coverage
- ✅ **ESLint** - Enforced code standards
- ✅ **Functional Components** - Modern React patterns
- ✅ **Performance Optimized** - Memoized callbacks
- ✅ **Clean Architecture** - Separation of concerns
- ✅ **No Dependencies Bloat** - Only essential packages

## 🚀 Production Deployment

### Security Features Included:

- ✅ **Backend Server** - API keys stay private and secure
- ✅ **Rate Limiting** - 20 requests per 15 minutes per IP
- ✅ **CORS Protection** - Only your domain can access the API
- ✅ **Input Validation** - Max 500 characters per scenario
- ✅ **Request Size Limits** - 10KB max to prevent abuse

### Deployment Steps:

1. **Deploy Backend** (e.g., Railway, Render, Heroku):
   - Set environment variables:
     - `OPENAI_API_KEY` - Your OpenAI API key
     - `FRONTEND_URL` - Your frontend URL (e.g., https://myapp.vercel.app)
     - `NODE_ENV=production`
   - Deploy the [server.js](server.js) file

2. **Deploy Frontend** (e.g., Vercel, Netlify):
   - Update [src/App.tsx](src/App.tsx) line 37 with your backend URL:
     ```typescript
     const response = await axios.post("https://your-backend.com/api/judge", {
       scenario: scenario,
     });
     ```
   - Build and deploy: `npm run build`

3. **Update CORS** in [server.js](server.js):
   - Change `https://yourdomain.com` to your actual frontend URL

### Recommended Hosting:

| Service | For | Free Tier |
|---------|-----|-----------|
| **Vercel** | Frontend | Yes |
| **Railway** | Backend | Yes (limited) |
| **Render** | Backend | Yes |

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

Want to add more c00ked names? Feel free to:

1. Fork the repo
2. Add names to `C00KED_NAMES`
3. Submit a PR

## 📄 License

MIT - Do whatever you want with this

---

<div align="center">

**Built with 🔥 and React**

[⭐ Star on GitHub](.) • [🐛 Report Bug](.) • [✨ Request Feature](.)

</div>
