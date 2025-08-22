# Comprehensive Tutorial: Function Types and Callbacks in TypeScript

## Introduction

Callbacks are a fundamental programming pattern in JavaScript/TypeScript that enable asynchronous operations, event handling, and functional programming techniques. TypeScript enhances this pattern with static typing, making callbacks more predictable and less error-prone.

In this tutorial, we'll explore how to define, type, and use callback functions in TypeScript with practical examples.





Callbacks are a fundamental concept in JavaScript/TypeScript. They allow us to pass one function into another and execute it later. In TypeScript, we can add *type safety* to callbacks so we always know what kind of function we’re passing.


## 1. What is a Callback?

A **callback** is simply a function passed as an argument to another function.

👉 Think of it like giving someone instructions:

* “Here’s a recipe (`function`). Use it when you’re ready.”

---

## 2. Defining a Callback Type

In TypeScript, we can describe the “shape” of a callback function using a **function type**.

```ts
type Callback = (num_1: number, num_2: number) => void;
```

* `type Callback = ...` → we’re creating a **type alias** called `Callback`.
* `(num_1: number, num_2: number)` → this callback must accept **two numbers**.
* `=> void` → this callback must **not return anything** (`void` means no value is returned).

**`Callback` means: a function that takes two numbers and does not return anything.**


## 3. Creating a Function That Accepts a Callback

Now, let’s make a function that *uses* our callback:

```ts
function callbackFunc(callback: Callback, number_1: number, number_2: number) {
    callback(number_1, number_2);
}
```

* `callback: Callback` → we expect the first parameter to be a function of type `Callback`.
* `number_1: number, number_2: number` → these are just normal number inputs.
* Inside, we **execute** the callback: `callback(number_1, number_2)`.

---

## 4. Example Callback Functions

Let’s create two different functions that fit the `Callback` type:

```ts
function mult(arg1: number, arg2: number) {
    console.log(arg1 * arg2);
}

function add(num_1: number, num_2: number) {
    console.log(num_1 + num_2);
}
```

Both `mult` and `add`:

* Take two numbers as input ✅
* Don’t return anything (they just `console.log`) ✅

Therefore, they are **valid `Callback`s**.


## 5. Using the Callback Function

Now let’s try passing them into `callbackFunc`:

```ts
callbackFunc(mult, 10, 6);  // prints 60
callbackFunc(add, 10, 6);   // prints 16
```

Here’s what happens step by step for the first call:

1. We call `callbackFunc(mult, 10, 6)`.
2. Inside `callbackFunc`, the `callback` parameter is `mult`.
3. It calls `mult(10, 6)`.
4. The result is `console.log(10 * 6)`, so it prints **60**.


## 6. Why Use Callback Types?

Without typing, callbacks can be messy. You might pass in the wrong function by accident. TypeScript helps prevent mistakes:

```ts
function wrongCallback(text: string) {
    console.log(text);
}

callbackFunc(wrongCallback, 10, 6); // ❌ ERROR: Argument of type '(text: string) => void' is not assignable to parameter of type 'Callback'.
```

👉 The compiler saves us from runtime errors by checking function compatibility at compile time.

---

## 7. Alternative Ways to Define Callback Types

Instead of using a `type` alias, you can also define function types inline:

```ts
function callbackFunc(
    callback: (num_1: number, num_2: number) => void,
    number_1: number,
    number_2: number
) {
    callback(number_1, number_2);
}
```

Both styles are correct.

* **Use `type` or `interface`** when you want to reuse the same function signature in multiple places.
* **Use inline** when it’s only needed once.





## 1. Understanding Callbacks

A **callback** is a function passed as an argument to another function, to be executed later. This pattern is essential for:

- Asynchronous operations (API calls, file I/O)
- Event handling (clicks, keyboard events)
- Higher-order functions (map, filter, reduce)

```javascript
// JavaScript callback example
setTimeout(function() {
    console.log("This executes after 1 second");
}, 1000);
```

## 2. Basic Callback Typing in TypeScript

TypeScript lets us define the expected signature of callback functions:

```typescript
// Define a callback type
type SimpleCallback = () => void;

// Function that accepts the callback
function executeCallback(callback: SimpleCallback) {
    console.log("About to execute callback...");
    callback();
    console.log("Callback executed!");
}

// Usage
executeCallback(() => {
    console.log("Hello from the callback!");
});
```

Output:
```
About to execute callback...
Hello from the callback!
Callback executed!
```

## 3. Advanced Callback Typing with Parameters

Let's create a more practical example with parameters:

```typescript
// Define a callback type with parameters
type CalculationCallback = (x: number, y: number) => void;

// Function that uses the callback
function calculate(callback: CalculationCallback, a: number, b: number) {
    console.log(`Calculating with ${a} and ${b}`);
    callback(a, b);
}

// Callback implementations
const multiply: CalculationCallback = (a, b) => {
    console.log(`Multiplication result: ${a * b}`);
};

const add: CalculationCallback = (a, b) => {
    console.log(`Addition result: ${a + b}`);
};

// Usage
calculate(multiply, 5, 6);    // Output: Multiplication result: 30
calculate(add, 5, 6);         // Output: Addition result: 11
```

## 4. Callbacks with Return Values

Callbacks can also return values. Let's enhance our example:

```typescript
// Callback that returns a value
type ReturningCallback = (x: number, y: number) => number;

function calculateAndReturn(callback: ReturningCallback, a: number, b: number): number {
    console.log(`Calculating with ${a} and ${b}`);
    const result = callback(a, b);
    console.log(`Got result: ${result}`);
    return result;
}

// Callback implementations
const power: ReturningCallback = (base, exponent) => {
    return Math.pow(base, exponent);
};

// Usage
const result = calculateAndReturn(power, 2, 8);
console.log(`Final result: ${result}`);
```

Output:
```
Calculating with 2 and 8
Got result: 256
Final result: 256
```

## 5. Error Handling in Callbacks

Traditional Node.js callbacks often use the error-first pattern:

```typescript
// Error-first callback pattern
type ErrorFirstCallback = (error: Error | null, result?: number) => void;

function divideSafely(a: number, b: number, callback: ErrorFirstCallback) {
    if (b === 0) {
        callback(new Error("Division by zero"));
    } else {
        callback(null, a / b);
    }
}

// Usage
divideSafely(10, 2, (error, result) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Result:", result);
    }
});

divideSafely(10, 0, (error, result) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Result:", result);
    }
});
```

Output:
```
Result: 5
Error: Division by zero
```

## 6. Generic Callbacks

We can create flexible callback types using generics:

```typescript
// Generic callback type
type GenericCallback<T, U> = (input: T) => U;

// Processor function using generic callback
function processArray<T, U>(arr: T[], callback: GenericCallback<T, U>): U[] {
    const result: U[] = [];
    for (const item of arr) {
        result.push(callback(item));
    }
    return result;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const squared = processArray(numbers, (x) => x * x);
console.log(squared); // [1, 4, 9, 16, 25]

const strings = ["hello", "world"];
const lengths = processArray(strings, (s) => s.length);
console.log(lengths); // [5, 5]
```

## 7. Optional Parameters in Callbacks

Callbacks can have optional parameters:

```typescript
type ConfigurableCallback = (required: number, optional?: string) => void;

function runCallback(callback: ConfigurableCallback) {
    // Call with both parameters
    callback(42, "optional");
    
    // Call with only required parameter
    callback(100);
}

runCallback((num, text) => {
    console.log(`Number: ${num}, Text: ${text || "not provided"}`);
});
```

## 8. Real-World Example: API Request with Callbacks

Let's create a more practical example simulating an API call:

```typescript
type ApiCallback = (error: string | null, data?: any) => void;

function fetchUserData(userId: number, callback: ApiCallback) {
    console.log(`Fetching data for user ${userId}...`);
    
    // Simulate API delay
    setTimeout(() => {
        if (userId > 0 && userId < 100) {
            callback(null, { id: userId, name: `User ${userId}`, role: "admin" });
        } else {
            callback("User not found");
        }
    }, 1000);
}

// Usage
fetchUserData(42, (error, userData) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("User data:", userData);
    }
});

fetchUserData(999, (error, userData) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("User data:", userData);
    }
});
```

## 9. Best Practices

1. **Always type your callbacks** - This prevents runtime errors
2. **Use descriptive parameter names** - Makes code more readable
3. **Consider using interfaces for complex callbacks** - Better documentation
4. **Handle errors appropriately** - Especially in async operations
5. **Avoid callback hell** - Use promises/async-await for complex async flows

```typescript
// Instead of nested callbacks, consider:
interface DatabaseCallback {
    (error: Error | null, results?: any[]): void;
}

interface LoggingCallback {
    (message: string): void;
}

// This is more maintainable than anonymous callback types
```

## 10. Converting Callbacks to Promises

For modern TypeScript development, you might want to wrap callbacks in promises:

```typescript
function fetchUserDataAsync(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        fetchUserData(userId, (error, data) => {
            if (error) {
                reject(new Error(error));
            } else {
                resolve(data);
            }
        });
    });
}

// Usage with async/await
async function getUser() {
    try {
        const user = await fetchUserDataAsync(42);
        console.log("User:", user);
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
    }
}
```

## Conclusion

Callbacks are a powerful pattern in TypeScript when properly typed. They enable:

- Flexible function composition
- Asynchronous programming patterns
- Event-driven architectures
- Clean separation of concerns

By adding TypeScript's type safety to callbacks, you get the best of both worlds: JavaScript's flexibility with TypeScript's reliability.

Remember that for complex async flows, modern JavaScript offers Promises and async/await that often provide better readability than callback-based code.




