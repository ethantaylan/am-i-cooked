# 🏗️ Architecture Documentation

## SMART Architecture Overview

This project follows **SMART Architecture** principles for clean, maintainable, and scalable code:

- **S**eparation of Concerns
- **M**odular Components
- **A**PI/Service Layer
- **R**eusable Utilities
- **T**ype Safety

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ScenarioInput.tsx    # Input field with validation
│   ├── JudgeButton.tsx      # Submit button with loading state
│   ├── ResultOverlay.tsx    # Result display (cooked/safe)
│   ├── VideoHeader.tsx      # Animated video header
│   ├── ErrorMessage.tsx     # Error display component
│   ├── Footer.tsx           # Footer with GitHub link
│   └── index.ts             # Barrel export
│
├── hooks/                # Custom React hooks
│   ├── useJudgement.ts      # Judgement state & logic
│   ├── useScenarioInput.ts  # Input state & validation
│   └── index.ts             # Barrel export
│
├── services/             # Business logic & API layer
│   ├── api.service.ts       # HTTP client with interceptors
│   ├── judgement.service.ts # Judgement business logic
│   └── index.ts             # Barrel export
│
├── config/               # Configuration files
│   └── app.config.ts        # Centralized app configuration
│
├── types/                # TypeScript type definitions
│   └── index.ts             # App-wide types
│
├── constants/            # Application constants
│   └── index.ts             # Messages, facts, config
│
├── utils/                # Pure utility functions
│   └── nameValidator.ts     # Name validation logic
│
├── assets/               # Static assets
│   ├── c00ked-dog.webp
│   └── waiting.mp4
│
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🎯 Architecture Layers

### 1. **Components Layer** (`/components`)

Reusable, presentational components following Single Responsibility Principle.

**Key Features:**
- Props-based configuration
- No business logic
- Fully typed with TypeScript
- Accessible with ARIA labels

**Example:**
```typescript
<ScenarioInput
  value={scenario}
  onChange={handleChange}
  disabled={loading}
/>
```

### 2. **Hooks Layer** (`/hooks`)

Custom hooks for state management and side effects.

**Benefits:**
- Encapsulates complex state logic
- Reusable across components
- Testable in isolation
- Follows React best practices

**Example:**
```typescript
const { isCooked, aiJudgement, loading, error, judge, reset } = useJudgement();
```

### 3. **Services Layer** (`/services`)

Business logic and API communication.

**Responsibilities:**
- HTTP requests with error handling
- Business logic validation
- Data transformation
- Error handling with custom exceptions

**Example:**
```typescript
// API Service with interceptors
const result = await apiClient.judgeScenario(scenario);

// Business logic service
const { isCooked, judgement } = await judgeScenario(scenario);
```

### 4. **Configuration Layer** (`/config`)

Centralized configuration for maintainability.

**Benefits:**
- Single source of truth
- Easy environment management
- Type-safe configuration
- No magic numbers

**Example:**
```typescript
APP_CONFIG.validation.maxScenarioLength // 200
APP_CONFIG.api.endpoints.judge // "/api/judge"
```

### 5. **Types Layer** (`/types`)

TypeScript type definitions for type safety.

**Benefits:**
- Full IntelliSense support
- Compile-time error checking
- Self-documenting code
- Prevents runtime errors

## 🔄 Data Flow

```
User Input
    ↓
Component (ScenarioInput)
    ↓
Hook (useScenarioInput) → Validation
    ↓
Component (JudgeButton)
    ↓
Hook (useJudgement)
    ↓
Service (judgement.service) → Business Logic
    ↓
Service (api.service) → HTTP Request
    ↓
Backend API
    ↓
Response
    ↓
Hook updates state
    ↓
Component re-renders (ResultOverlay)
```

## 🎨 Component Composition

```typescript
<App>
  <VideoHeader />
  <Form>
    <ScenarioInput />
    <JudgeButton />
  </Form>
  <ErrorMessage />
  <ResultOverlay>
    {isCooked ? <CookedOverlay /> : <SafeOverlay />}
  </ResultOverlay>
  <Footer />
</App>
```

## 🛠️ Key Design Patterns

### 1. **Custom Hooks Pattern**
Encapsulates stateful logic for reusability.

```typescript
// Before: 100+ lines of logic in component
// After: Clean separation
const { scenario, handleChange, isValid } = useScenarioInput();
```

### 2. **Service Layer Pattern**
Separates API logic from components.

```typescript
// Singleton API client with interceptors
export const apiClient = new ApiClient();
```

### 3. **Barrel Exports Pattern**
Simplified imports with index files.

```typescript
// Instead of:
import { ScenarioInput } from './components/ScenarioInput';
import { JudgeButton } from './components/JudgeButton';

// Use:
import { ScenarioInput, JudgeButton } from './components';
```

### 4. **Configuration Pattern**
Centralized configuration management.

```typescript
// All configuration in one place
APP_CONFIG.api.baseUrl
APP_CONFIG.validation.maxScenarioLength
```

## 📊 Benefits of This Architecture

### ✅ Maintainability
- Easy to locate and modify code
- Clear separation of concerns
- Self-documenting structure

### ✅ Scalability
- Easy to add new features
- Components can be reused
- Services can be extended

### ✅ Testability
- Each layer can be tested independently
- Pure functions in utils
- Mockable services

### ✅ Type Safety
- Full TypeScript coverage
- Compile-time error detection
- IntelliSense everywhere

### ✅ Developer Experience
- Clear file organization
- Easy onboarding for new developers
- Consistent patterns throughout

## 🔐 Error Handling Strategy

### API Layer
```typescript
class ApiError extends Error {
  constructor(message, statusCode, originalError) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

### Service Layer
```typescript
try {
  const result = await judgeScenario(scenario);
} catch (error) {
  // Handled by custom hook
  setError(error.message);
}
```

### Component Layer
```typescript
<ErrorMessage error={error} />
```

## 🚀 Performance Optimizations

1. **useCallback** for event handlers
2. **useMemo** for expensive computations
3. **Lazy loading** potential for components
4. **Code splitting** ready architecture
5. **Tree shaking** friendly exports

## 📝 Naming Conventions

- **Components**: PascalCase (`ScenarioInput.tsx`)
- **Hooks**: camelCase with `use` prefix (`useJudgement.ts`)
- **Services**: camelCase with `.service` suffix (`api.service.ts`)
- **Types**: PascalCase for interfaces (`AIJudgement`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CHARS`)
- **Functions**: camelCase (`judgeScenario`)

## 🔄 Adding New Features

### Example: Add a "Share Result" feature

1. **Add API endpoint** in `config/app.config.ts`
2. **Create service method** in `services/share.service.ts`
3. **Create custom hook** in `hooks/useShare.ts`
4. **Create component** in `components/ShareButton.tsx`
5. **Integrate** in `App.tsx`

This structure ensures consistency and maintainability!

## 📚 Further Reading

- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Built with ❤️ using SMART Architecture principles**
