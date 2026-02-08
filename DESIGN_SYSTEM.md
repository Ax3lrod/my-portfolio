# Design System Rules

## 1. Token Definitions

### Typography
Defined in `src/app/globals.css` via Tailwind v4 `@theme` variables and `src/app/layout.tsx` / `src/lib/font.ts`.

- **Display**: `font-display` -> Unbounded (via `@fontsource/unbounded` or similar var).
- **Mono**: `font-mono` -> "Departure Mono" (Local font).
- **Sans**: `font-sans` -> Geist Sans.
- **Accent**: `font-led` -> LED Dot Matrix (Local font).

**Usage:**
```tsx
<h1 className="font-display">Title</h1>
<p className="font-mono">Code / HUD text</p>
```

### Colors
Standard Tailwind v4 palette.
- **Accents (Cyberpunk)**:
  - Pink/Red: `#e0287d` (Glitch effect)
  - Cyan/Blue: `#1bc7fb` (Glitch effect)
  - Green: `green-500` (#22c55e) (System online indicators)

### Effects
- **Glitch**: Custom CSS animations in `src/app/globals.css` (`.cyber-glitch`, `.glitch-active`).
- **Glow**: SVG filters in components (e.g., `ArwesFrame`).

## 2. Component Library

Located in `src/components/`.

- **Architecture**: Functional React Components with TypeScript interfaces.
- **Pattern**:
  - `ArwesFrame.tsx`: Container with animated SVG borders.
  - `GlitchText.tsx`: Text effect component.
  - `CyberAssets.tsx`: Decorative HUD elements.

**Example Component Structure:**
```tsx
interface Props {
  children: React.ReactNode;
  active?: boolean;
}

export const Component = ({ children, active = true }: Props) => {
  // Logic
  return (
    <div className="relative">
      {/* Visuals */}
      {children}
    </div>
  );
};
```

## 3. Frameworks & Libraries

- **Core**: Next.js 16 (App Router), React 19.
- **Styling**: Tailwind CSS v4.
- **Animation**: Motion (Framer Motion).
- **Icons**: Lucide React.

## 4. Asset Management

- **Static**: `public/` directory.
  - `public/fonts/`: Local font files.
  - `public/images/`: Static images/GIFs.
- **Fonts**: `next/font/local` and `next/font/google`.
- **Optimization**: Use `src/components/Image.tsx` (wrapper around `next/image`) for images.

## 5. Icon System

- **Library**: `lucide-react`.
- **Usage**:
  ```tsx
  import { Globe, ArrowRight } from "lucide-react";
  
  <Globe size={16} className="text-neutral-400" />
  ```

## 6. Styling Approach

- **Tailwind v4**: Primary styling method.
  - Use `@theme` in `globals.css` for custom variables.
  - Use utility classes for layout, spacing, and colors.
- **Motion**: For entrance/exit animations and complex interactions.
  ```tsx
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  />
  ```
- **CSS Modules / Global**: Used for complex keyframe animations (Glitch).

## 7. Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css      # Global styles & Tailwind theme
│   └── layout.tsx       # Root layout
├── components/          # Reusable UI components
│   ├── layouts/         # Layout components (Footer, etc.)
│   └── ArwesFrame.tsx   # Specific components
├── sections/            # Page-specific sections (Hero, Profile)
├── lib/                 # Utilities (font loaders)
└── const/               # Data constants
```
