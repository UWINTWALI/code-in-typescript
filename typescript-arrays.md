# TypeScript Arrays — Practical Demo

Arrays in TypeScript are more than just containers — they’re **typed**, **generic**, and extremely **flexible**. This guide will walk you through how TypeScript handles arrays, how to write them safely, and how to build functions that work with array values confidently.



## What This Covers

* Defining arrays in multiple ways
* Understanding `Array<Type>` vs `Type[]`
* Writing functions that accept arrays
* Using `ReadonlyArray` to protect from mutation
* Demo with sample data and output



## Key Concepts You'll Learn

Before we dive into code, let’s unpack the essential array concepts in TypeScript.


### 1. **Array Type Syntax**

There are two ways to type arrays in TypeScript:

```ts
let fruits: string[] = ["apple", "banana"];
let numbers: Array<number> = [1, 2, 3];
```

Both mean the same thing: an array of values of a specific type. Pick whichever is more readable for you.


### 2. **Functions That Accept Arrays**

We can write functions that accept arrays just like regular parameters:

```ts
function printAllStrings(values: string[]) {
  for (const val of values) {
    console.log(val);
  }
}
```

Or using generic `Array<T>`:

```ts
function PrintAllValues<T>(values : Array<T>) : void {
    values.forEach(val => console.log(val))
}

PrintAllValues(["mucyo", "Kevin", "trump"])
PrintAllValues([1,4,7,9])
PrintAllValues([true, true, false])
```
With number type:

```ts
function printAllNumbers(values: Array<number>) {
  values.forEach(v => console.log(v));
}
```


### 3. **Passing Arrays into Functions**

TypeScript knows how to handle both literal arrays and instances of `Array<T>`:

```ts
let greetings = ["hello", "world"];
printAllStrings(greetings); 

printAllStrings(new Array("hi", "again")); 
```


### 4. **ReadonlyArray<T> — No Mutations Allowed**

Want to make sure an array passed into a function doesn’t get changed?

Use `ReadonlyArray<T>` or `readonly T[]`:

```ts
function processReadOnly(values: ReadonlyArray<string>) {
  console.log(values[0]);      
  values.push("oops");         // Error
}
```

```ts
const names: readonly string[] = ["Alice", "Bob"];
processReadOnly(names);
```


### 5. **Array Interface Structure**

TypeScript defines the core structure of `Array<T>` like this:

```ts
interface Array<T> {
  length: number;
  pop(): T | undefined;
  push(...items: T[]): number;
  // and many more...
}
```

This means TypeScript understands how arrays behave, and will help prevent errors when you do something incorrect.


## Full Code Example: Arrays in Action

```ts
function printFruits(fruits: string[]) {
  console.log("Fruits List:");
  for (const fruit of fruits) {
    console.log(`${fruit}`);
  }
}

function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

function readOnlyDemo(values: ReadonlyArray<string>) {
  console.log("First item:", values[0]);
  // values.push("oops"); // Uncommenting this will cause a compile-time error
}

// Testing the functions
const fruits = ["Apple", "Banana", "Mango"];
const nums = [10, 20, 30, 40];
const readOnly = ["one", "two", "three"] as const;

printFruits(fruits);
console.log("Sum of numbers:", sum(nums));
readOnlyDemo(readOnly);
```


## Live Demo 

You can **copy this code** into the [`TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/) to test it live.

```ts
function printFruits(fruits: string[]) {
  console.log("Fruits List:");
  for (const fruit of fruits) {
    console.log(`${fruit}`);
  }
}

function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

function readOnlyDemo(values: ReadonlyArray<string>) {
  console.log("First item:", values[0]);
  // values.push("oops"); // Error: Property 'push' does not exist on type 'readonly string[]'
}

// Test data
const fruits = ["Apple", "Banana", "Mango"];
const nums = [10, 20, 30, 40];
const readOnly = ["one", "two", "three"] as const;

printFruits(fruits);
console.log("Sum of numbers:", sum(nums));
readOnlyDemo(readOnly);
```

[`Open in TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/)


## Summary Table

| Concept            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `string[]`         | Array of strings                                        |
| `Array<number>`    | Generic form of number array                            |
| `ReadonlyArray<T>` | Array that can’t be changed (no `push`, `pop`, etc.)    |
| `readonly T[]`     | Shorthand for `ReadonlyArray<T>`                        |
| `.reduce()`        | Common method to calculate totals or aggregate results  |
| `as const`         | Ensures an array is treated as readonly at compile-time |

