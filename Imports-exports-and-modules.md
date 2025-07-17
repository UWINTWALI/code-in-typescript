# **TypeScript Modules & Imports**  

This guide will teach how to organize and share code in TypeScript effectively. We'll cover exports, imports, module systems, and best practices—all with **real-world examples** and **interactive demos** you can try yourself.  

Content:  
 * Understand how to structure a TypeScript project  
 * Know when to use `import` vs `require`  
 * Master dynamic imports for performance  
 * Use path aliases for cleaner code  
 * Avoid common pitfalls  



## **1. Basic Exports and Imports**  
### **What You Need to Know**  
- **Export**: Makes variables, functions, or types available to other files.  
- **Import**: Brings those exported values into another file.  

### **Code Example: A Simple Utility Module**  
```typescript
// utils/math.ts
export const PI = 3.14;

export function calculateArea(radius: number): number {
  return PI * radius * radius;
}

export interface Circle {
  radius: number;
  area: number;
}
```

### **Importing in Another File**  
```typescript
// app.ts
import { PI, calculateArea, type Circle } from './utils/math';

const myCircle: Circle = {
  radius: 5,
  area: calculateArea(5)
};

console.log(myCircle.area); // 78.5
```

### **Real-World Demo: Building a Circle Calculator**  
 **[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-1-basic-imports-2vx6j?file=/src/app.ts)**  

**What's Happening?**  
1. `math.ts` exports `PI`, `calculateArea`, and `Circle`.  
2. `app.ts` imports them and uses them to compute a circle's area.  



## **2. CommonJS vs ES Modules**  
### **When to Use Each**  
| Feature | CommonJS (`require`) | ES Modules (`import`) |  
|---------|----------------------|----------------------|  
| Syntax | `module.exports` / `require` | `export` / `import` |  
| Usage | Older Node.js, legacy code | Modern JavaScript, browsers, Node.js (ESM mode) |  
| Static Analysis | Harder for bundlers | Better optimization |  

### **CommonJS Example (Node.js Style)**  
```typescript
// logger.js
function log(message) {
  console.log(`[LOG]: ${message}`);
}

module.exports = { log };
```

```typescript
// app.js
const { log } = require('./logger');
log("Hello, CommonJS!");
```

### **ES Modules Example (Modern JS)**  
```typescript
// logger.ts
export function log(message: string): void {
  console.log(`[LOG]: ${message}`);
}
```

```typescript
// app.ts
import { log } from './logger';
log("Hello, ES Modules!");
```

### **Real-World Demo: Migrating from CommonJS to ESM**  
 **[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-2-esm-vs-commonjs-8q7zl?file=/src/app.ts)**  

**Key Takeaway:**  
- Use **ES Modules** for new projects (better tooling support).  
- Use **CommonJS** if working with older Node.js code.  

## **3. Default vs Named Exports**  
### **When to Use Each**  
| Feature | Named Exports | Default Exports |  
|---------|--------------|----------------|  
| Syntax | `export { a, b }` | `export default thing` |  
| Import Syntax | `import { a, b } from '...'` | `import thing from '...'` |  
| Best For | Multiple utilities, functions | Single-class modules (React components) |  

### **Named Export Example**  
```typescript
// auth.ts
export function login(email: string, password: string) { /* ... */ }
export function logout() { /* ... */ }
```

```typescript
// app.ts
import { login, logout } from './auth';
login("user@example.com", "123456");
```

### **Default Export Example (React Component)**  
```typescript
// Button.tsx
export default function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}
```

```typescript
// App.tsx
import Button from './Button';
<Button text="Click Me" />
```

### **Real-World Demo: React Component with Exports**  
**[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-3-default-vs-named-exports-l9z8d?file=/src/App.tsx)**  

**Key Takeaway:**  
- **Named exports** are better for utility functions.  
- **Default exports** work well for single components.  


## **4. Type-Only Imports/Exports**  
### **Why Use Them?**  
- Reduces runtime code (improves performance).  
- Makes it clear that an import is **only for types**.  

### **Example: Importing Types Without Runtime Overhead**  
```typescript
// types.ts
export interface User {
  id: string;
  name: string;
}
```

```typescript
// app.ts
import { type User } from './types'; // Won't appear in compiled JS

const user: User = { id: "1", name: "Alice" };
```

### **Real-World Demo: Optimizing a React App**  
 **[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-4-type-only-imports-5w8xk?file=/src/App.tsx)**  

**Key Takeaway:**  
Use `type` prefix when importing **only types** to keep your bundle small.  

## **5. Dynamic Imports (Code Splitting)**  
### **Why Use Dynamic Imports?**  
- **Faster page loads** (load code only when needed).  
- Great for **large libraries** (e.g., charting, PDF rendering).  

### **Example: Lazy-Loading a Heavy Library**  
```typescript
// app.ts
async function loadChartLibrary() {
  const { Chart } = await import('chart.js');
  const chart = new Chart(...);
}
```

### **Real-World Demo: Lazy-Loading in React**  
**[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-5-dynamic-imports-6jzqk?file=/src/App.tsx)**  

**Key Takeaway:**  
Use dynamic imports for **performance optimization** in large apps.  


## **6. Module Resolution Strategies**  
### **How TypeScript Finds Files**  
- **`classic`** (legacy, not recommended).  
- **`node`** (default for CommonJS, mimics Node.js resolution).  

### **Example: Configuring `paths` in `tsconfig.json`**  
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"]
    }
  }
}
```

Now you can import like this:  
```typescript
import { Button } from '@components/Button'; // Instead of '../../components/Button'
```

### **Real-World Demo: Setting Up Path Aliases**  
 **[Try it on CodeSandbox](https://codesandbox.io/s/typescript-module-example-6-module-resolution-9jz9q?file=/tsconfig.json)**  

**Key Takeaway:**  
Use **`paths`** to avoid messy relative imports (`../../../`).  


## **7. Common Pitfalls & Best Practices**  
### **Mistake: Circular Dependencies**  
**Bad:**  
```typescript
// a.ts
import { b } from './b';
export const a = () => b();
```

```typescript
// b.ts
import { a } from './a';
export const b = () => a(); // Infinite loop!
```

**Fix:** Refactor shared logic into a third file.  

### **Best Practices**  
✔ Prefer **named exports** for better refactoring.  
✔ Use **`type` imports** for types.  
✔ Enable **`esModuleInterop`** for smoother CommonJS/ESM interop.  


## **Final Challenge: Build a Modular App**  
**[Try the Full Project on CodeSandbox](https://codesandbox.io/s/typescript-module-example-final-challenge-7kz9d?file=/src/app.ts)**  

**Task:**  
1. Create a `utils/` folder with math functions.  
2. Use **named exports**.  
3. Import them in `app.ts`.  
4. Add **dynamic imports** for optional features.  


## **Summary**  
**Use `export`/`import`** for modern JS.  
**Prefer named exports** for utils, **default exports** for components.  
**Dynamic imports** improve performance.  
**Path aliases** (`@components/`) keep imports clean.  


# **CommonJS vs ES Modules in TypeScript**

## **Understanding Module Systems in TypeScript**

TypeScript supports both CommonJS and ES Modules, but they work differently. Let's break it down clearly.

## **What is CommonJS?**
**CommonJS (Common JavaScript Module System)** is Node.js's original module system. TypeScript can compile to it for backward compatibility.

### **Key Facts About CommonJS in TypeScript**
- Uses `require()` and `module.exports`
- Default in older Node.js projects
- Works with `.ts` files when `"module": "commonjs"` in tsconfig.json

### **CommonJS Export Patterns**

#### **1. Exporting a Single Function**
```typescript
// logger.ts
function log(message: string): void {
  console.log(`[LOG]: ${message}`);
}

module.exports = log;

// Alternative:
// exports.log = log;
```

#### **2. Importing in CommonJS**
```typescript
// app.ts
const log = require('./logger');
log("Hello from CommonJS!");

// With destructuring:
const { log } = require('./logger');
```

## **What Are ES Modules?**
**ES Modules (ECMAScript Modules)** are the modern standard that TypeScript prefers.

### **Key Facts About ES Modules in TypeScript**
- Uses `import`/`export` syntax
- Requires `"module": "es2015"` or higher in tsconfig.json
- Better for tree-shaking and static analysis

### **ES Module Export Patterns**

#### **1. Named Exports**
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

#### **2. Default Export**
```typescript
// logger.ts
export default function log(message: string): void {
  console.log(`[LOG]: ${message}`);
}
```

#### **3. Importing in ES Modules**
```typescript
// app.ts
import { add, subtract } from './math';
import log from './logger';

console.log(add(2, 3)); // 5
log("Hello from ES Modules!");
```

### **2. What You *Should* Remember About TS Configs**

#### **For CommonJS (Node.js Legacy)**
```json
{
  "compilerOptions": {
    "module": "commonjs",  // ← This is the critical line
    "target": "es2015"
  }
}
```

#### **For ES Modules (Modern Code)**
```json
{
  "compilerOptions": {
    "module": "es2015",    // ← Key difference
    "target": "es2015",
    "esModuleInterop": true  // ← Important for compatibility
  }
}
```

**Only remember these essentials:**
- `"module": "commonjs"` → Old Node.js style
- `"module": "es2015"` → Modern modules
- `"esModuleInterop": true` → Fixes import issues

---

### **3. How Professionals Work With Configs**
1. **Start with `tsc --init`**  
   Generates a complete `tsconfig.json` with all options commented

2. **Modify only what you need**  
   Example for a Node.js project:
   ```diff
   {
     "compilerOptions": {
   +   "module": "commonjs",
   +   "outDir": "./dist",
   +   "rootDir": "./src",
       ...other defaults
     }
   }
   ```

## **Important Gotchas in TypeScript**

1. **Mixed Module Systems Cause Issues**
   ```typescript
   // Dangerous mixing
   import { thing } from 'commonjs-package'; // May fail
   ```

2. **TypeScript's `esModuleInterop`**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "esModuleInterop": true // Fixes CommonJS/ESM interop
     }
   }
   ```

3. **File Extensions Matter**
   - `.ts` = TypeScript
   - `.mts` = ES Modules TypeScript
   - `.cts` = CommonJS TypeScript

## **Migration Guide: CommonJS → ES Modules**

1. Change `module` in tsconfig.json to `"es2015"` or higher
2. Replace `require()` with `import`
3. Convert `module.exports` to `export`
4. Update package.json:
   ```json
   {
     "type": "module"
   }
   ```

## **Which Should You Use?**

- **Use CommonJS if:**
  - Maintaining old Node.js code
  - Working with legacy packages

- **Use ES Modules if:**
  - Starting a new project
  - Targeting browsers
  - Want better tooling support

## **Final Recommendation**

For modern TypeScript projects, **always prefer ES Modules**. They're the future of JavaScript and work better with TypeScript's type system. Reserve CommonJS only for legacy maintenance.

```bash
# Run ES Modules in Node.js
node --loader ts-node/esm your-file.ts
```
