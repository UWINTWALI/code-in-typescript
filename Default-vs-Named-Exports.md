# **JavaScript Modules: Default vs. Named Exports**

Welcome to this in-depth tutorial on **Default and Named Exports** in JavaScript modules! If you're working with ES6 modules and wondering about:

* The **difference** between default and named exports
* **When** to use each
* Why some imports use **curly braces `{}`** while others don’t

You're in the right place. This guide will walk you through everything, using clear explanations, real-world examples, and practical tips to help you write **modular, reusable code**.


## **Table of Contents**

1. [Introduction to JavaScript Modules](#1-introduction-to-javascript-modules)
2. [Named Exports](#2-named-exports)
3. [Default Exports](#3-default-exports)
4. [Mixing Default and Named Exports](#4-mixing-default-and-named-exports)
5. [When to Use Each](#5-when-to-use-each)
6. [Common Pitfalls & Best Practices](#6-common-pitfalls--best-practices)


## **1. Introduction to JavaScript Modules**

Before ES6, JavaScript lacked a standardized way to structure code across multiple files. Developers used tools like **CommonJS** (in Node.js) and **AMD** (in browsers).

With **ES6 Modules**, JavaScript introduced a native way to organize code into **separate, reusable pieces** called modules. This is done using `export` and `import`.

### **Key Concepts**

* **Exporting**: Making variables, functions, or classes available outside the file.
* **Importing**: Bringing code from other modules into the current file.

There are **two main types of exports**:

1. **Named Exports** — multiple exports per file, identified by name
2. **Default Exports** — only one per file, representing the main value


## **2. Named Exports**

Named exports let you **explicitly name** each value you want to export. They're useful when a file offers multiple pieces of functionality.

### **How to Use Named Exports**

#### **Exporting (in `utils.js`)**

```javascript
export const PI = 3.14159;

export function double(x) {
  return x * 2;
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

Alternatively, export everything together:

```javascript
const PI = 3.14159;
function double(x) {
  return x * 2;
}
class Person {
  constructor(name) {
    this.name = name;
  }
}
export { PI, double, Person };
```

#### **Importing Named Exports (in `app.js`)**

```javascript
import { PI, double, Person } from './utils.js';

console.log(PI);        // 3.14159
console.log(double(5)); // 10
const john = new Person("John");
```

### **Important Notes**

* You **must use the exact names** exported from the file.
* Use **curly braces** when importing named exports.
* You can also **rename** them during import using `as`:

```javascript
import { PI as constantPI, double as twice } from './utils.js';

console.log(constantPI); // 3.14159
console.log(twice(5));   // 10
```

Named exports are ideal for files that contain **utility functions**, **constants**, or **multiple class definitions**.

## **3. Default Exports**

A default export represents the **primary value** from a module. It’s commonly used when a file is designed to export **just one thing**, such as a single function, class, or configuration object.

### **Why Use Default Exports?**

* They simplify importing, especially for single-responsibility files.
* The importer can choose **any name** for the default import.

### **Exporting a Default Value**

```javascript
// Direct export
export default function log(message) {
  console.log(message);
}

// OR declare first, then export
function log(message) {
  console.log(message);
}
export default log;
```

### **Importing a Default Export**

```javascript
import logger from './Logger.js';       // Using the default name
import myLog from './Logger.js';        // You can rename it freely

logger("Hello!");
myLog("Hi!");
```

### **Other Use Cases**

You can default export classes, objects, or any other value:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
export default User;
```

```javascript
import User from './User.js';
const u = new User("Alice");
```

### **Summary**

* Only one default export allowed per module.
* **No curly braces** needed when importing.
* Use any name you like for the import.


## **4. Mixing Default and Named Exports**

You can export both a **default** and multiple **named** values from the same file. This can be useful, but should be done with caution to avoid confusion.

### **Example (in `math.js`)**

```javascript
export const PI = 3.14159;
export function square(x) {
  return x * x;
}
export default function add(a, b) {
  return a + b;
}
```

### **Importing Both**

```javascript
import add, { PI, square } from './math.js';

console.log(add(2, 3));   // 5
console.log(PI);          // 3.14159
console.log(square(4));   // 16
```

You can also import the default export using a different syntax:

```javascript
import { default as add, PI, square } from './math.js';
```

## **5. When to Use Each?**

| **Named Exports**                      | **Default Exports**                             |
| -------------------------------------- | ----------------------------------------------- |
| Multiple exports per file              | Only one export per file                        |
| Explicit names required when importing | You can import with **any name**                |
| `import { foo } from 'file'`           | `import foo from 'file'`                        |
| Great for utility libraries            | Great for single-purpose modules                |
| Better for tree-shaking in bundlers    | Easier to consume without worrying about naming |

### **Best Practices**

* Use **named exports** when a file exports multiple things.
* Use a **default export** when there's a clear, main thing being exported.
* Avoid mixing both unless there's a **strong justification**, as it can lead to confusion.

---

## **6. Common Pitfalls & Best Practices**

### **Mistaking Named for Default Imports**

```javascript
// Incorrect: trying to import default as named
import { add } from './math.js'; // Only valid if `add` was a named export
```

```javascript
// Correct: importing the default export
import add from './math.js'; // 
```

### **Multiple Default Exports**

```javascript
export default function foo() {}
export default function bar() {} // This will throw an error
```

### ✔ **Naming Conventions**

* Use **PascalCase** for default-exported classes or React components:

  ```javascript
  export default MyComponent;
  ```

* Use **camelCase** for named utility functions:

  ```javascript
  export { calculateTotal, formatDate };
  ```


## **Final Thoughts**

JavaScript modules bring structure to your codebase. Mastering how **named** and **default** exports work will help you write better, maintainable, and reusable code.

You should now understand:

* **Named Exports** — good for multiple utilities
* **Default Exports** — best for exporting one main thing

So when you see:

```javascript
import React from 'react';       // default export
import { useState } from 'react'; // named export
```

…you’ll know **exactly what’s going on**.


## **Quiz (Test Your Knowledge!)**

1. How many default exports can a module have?
2. What syntax is used to import a named export?
3. Can you rename a default import?

**Answers:**

1. Only **one**
2. `import { name } from 'module'`
3. **Yes!** `import myName from 'module'`


## **Next Steps**

* Try refactoring one of your files to use default or named exports appropriately.
* Learn about **dynamic imports** using `import()` for code splitting.
* Explore module bundlers like **Webpack**, **Vite**, or **Rollup** to optimize your modules.
