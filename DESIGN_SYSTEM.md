# Design System Guide

This document provides guidance on using the new design system for the AI Knowledge Base Assistant.

---

## 🎨 Color Palette

### CSS Custom Properties

All colors are defined as CSS variables in `App.css`:

```css
:root {
  /* Gradients */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  
  /* Solid Colors */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #00d9a5;
  --danger-color: #ff6b6b;
  --warning-color: #ffd93d;
  
  /* Text Colors */
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-tertiary: #718096;
  
  /* Background Colors */
  --bg-primary: #f7fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #edf2f7;
  
  /* Borders & Shadows */
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

### Usage Examples

```css
/* Using gradient background */
.my-button {
  background: var(--primary-gradient);
}

/* Using solid color */
.my-text {
  color: var(--primary-color);
}

/* Using shadow */
.my-card {
  box-shadow: var(--shadow-md);
}
```

---

## 📏 Spacing & Sizing

### Border Radius

```css
--radius-sm: 8px;   /* Small elements (tags, inputs) */
--radius-md: 12px;  /* Medium elements (buttons, cards) */
--radius-lg: 16px;  /* Large elements (containers, modals) */
--radius-xl: 20px;  /* Extra large elements */
```

### Shadows

Use shadows to create depth and hierarchy:

- `--shadow-sm`: Subtle elevation (small cards, inputs)
- `--shadow-md`: Medium elevation (buttons, main cards)
- `--shadow-lg`: High elevation (dropdowns, modals)
- `--shadow-xl`: Maximum elevation (toasts, overlays)

---

## ⚡ Transitions & Animations

### Transition Speeds

```css
--transition-fast: 0.15s ease;  /* Quick interactions (hover states) */
--transition-base: 0.3s ease;   /* Standard transitions */
--transition-slow: 0.5s ease;   /* Slow transitions (complex animations) */
```

### Common Animation Patterns

#### 1. **Fade In**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 0.5s ease;
}
```

#### 2. **Slide Up**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: slideUp 0.5s ease;
}
```

#### 3. **Hover Lift**
```css
.card {
  transition: transform var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
}
```

#### 4. **Shimmer Effect**
```css
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.element {
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255,255,255,0.3) 50%, 
    transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

---

## 🎯 Component Patterns

### Button Styles

#### Primary Button
```css
.btn-primary {
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.9rem 2rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.65rem 1.5rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
}
```

### Card Styles

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Input Styles

```css
.input {
  padding: 0.9rem 1.1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: all var(--transition-base);
  background: var(--bg-secondary);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

---

## 🎨 Gradient Backgrounds

### Creating Custom Gradients

The design uses 135deg angle gradients for consistency:

```css
/* Primary Purple Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Success Cyan Gradient */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Danger Pink Gradient */
background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
```

### Gradient Overlays

For subtle backgrounds:

```css
/* Light gradient overlay */
background: linear-gradient(135deg, 
  rgba(102, 126, 234, 0.1) 0%, 
  rgba(118, 75, 162, 0.1) 100%);

/* Medium gradient overlay */
background: linear-gradient(135deg, 
  rgba(102, 126, 234, 0.15) 0%, 
  rgba(118, 75, 162, 0.15) 100%);
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */

/* Tablet and up */
@media (min-width: 768px) {
  /* Styles for tablets */
}

/* Desktop and up */
@media (min-width: 1024px) {
  /* Styles for desktop */
}

/* Large desktop */
@media (min-width: 1440px) {
  /* Styles for large screens */
}

/* Mobile only */
@media (max-width: 767px) {
  /* Mobile-specific styles */
}
```

### Responsive Patterns

```css
/* Stack on mobile, row on desktop */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎭 Icons & Emojis

### Icon System

The platform uses emoji icons for a friendly, modern look:

```javascript
// Common icons used
🤖 - AI Assistant
👤 - User
📤 - Upload
📁 - Folder/Documents
📄 - Document file
📎 - Attachment/Source
✅ - Success
❌ - Error
⚠️ - Warning
ℹ️ - Info
💬 - Chat/Message
🎯 - Target/Goal
✈️ - Send
💡 - Tip/Hint
📭 - Empty state
```

### Usage in CSS

```css
.icon::before {
  content: '🤖';
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
```

---

## 🎬 Animation Best Practices

### Performance Tips

1. **Use `transform` and `opacity`** for animations (GPU accelerated)
   ```css
   /* Good ✓ */
   .element {
     transform: translateY(-4px);
   }
   
   /* Avoid ✗ */
   .element {
     top: -4px; /* Triggers layout recalculation */
   }
   ```

2. **Use `will-change` sparingly**
   ```css
   .element {
     will-change: transform;
   }
   ```

3. **Reduce motion for accessibility**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

### Timing Functions

```css
/* Ease (default) - starts slow, fast middle, slow end */
transition: all 0.3s ease;

/* Ease-in - starts slow, ends fast */
transition: all 0.3s ease-in;

/* Ease-out - starts fast, ends slow (best for UI) */
transition: all 0.3s ease-out;

/* Ease-in-out - slow start and end */
transition: all 0.3s ease-in-out;

/* Custom cubic-bezier */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🎨 Custom Scrollbar

```css
/* Webkit browsers (Chrome, Safari, Edge) */
.scrollable::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollable::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: var(--primary-gradient);
  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}
```

---

## 📦 Component Architecture

### File Structure

```
components/
├── ComponentName.jsx      # Component logic
├── ComponentName.css      # Component styles
└── ComponentName.test.js  # Component tests (future)
```

### CSS Naming Convention

```css
/* Component root */
.component-name { }

/* Component elements */
.component-name-element { }

/* Component states */
.component-name.is-active { }
.component-name.is-loading { }

/* Component modifiers */
.component-name--variant { }
```

---

## 🚀 Quick Start

### Creating a New Component

1. **Create component file**:
```jsx
// components/MyComponent.jsx
import './MyComponent.css'

function MyComponent() {
  return (
    <div className="my-component">
      <h2>My Component</h2>
    </div>
  )
}

export default MyComponent
```

2. **Create styles**:
```css
/* components/MyComponent.css */
.my-component {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  animation: fadeIn 0.5s ease;
}

.my-component h2 {
  color: var(--text-primary);
  font-size: 1.35rem;
  font-weight: 700;
}
```

3. **Import and use**:
```jsx
// App.jsx
import MyComponent from './components/MyComponent'

function App() {
  return <MyComponent />
}
```

---

## 📚 Resources

### Learning Resources
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

### Inspiration
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Awwwards](https://www.awwwards.com/) - Web design excellence
- [UI Design Daily](https://www.uidesigndaily.com/) - Daily UI inspiration

---

**Design System Version**: 1.0  
**Last Updated**: November 8, 2025  
**Maintained By**: AI Knowledge Base Team

