# The Ultimate Guide to **Generic Classes in TypeScript**

> “Write once. Reuse everywhere. Type-safely.”



## What You’ll Learn (Tutorial Skeleton)

1. **Why Generics?** – The need for flexibility and safety
2. **What Are Generic Classes?** – Clear explanation
3. **Real-World Scenario** – Calculators and Reusable Services
4. **Using Constraints** – Putting guardrails on generics
5. **Accessing Object Properties Safely** – Like a pro
6. **Class Factories with Generics** – The factory pattern with animals
7. **Live Demo** – Fully functional examples to play with



## 1. Why Generics?

Without generics, we write repetitive code for different types.

```ts
class StringBox {
  contents: string;
}

class NumberBox {
  contents: number;
}
```

That's inefficient, hard to maintain, and not reusable.

**Solution: Use Generic Classes** – write **one class**, use it with **any type**.



## 2. What Are Generic Classes?

### Definition

A **Generic Class** is a class that takes a **type parameter** — just like a function takes a value parameter.

```ts
class Box<T> {
  contents: T;
  constructor(value: T) {
    this.contents = value;
  }
}
```

Now you can reuse it:

```ts
const stringBox = new Box<string>("Hello");
const numberBox = new Box<number>(123);
```

> You don’t care what `T` is — it will be decided when the class is used.



## 3. Real-World Scenario: Calculator

Let’s build a **Generic Calculator** for numbers, strings, or complex data.

```ts
class GenericCalculator<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFn;
  }

  sum(a: T, b: T): T {
    return this.add(a, b);
  }
}
```

Now use it for numbers:

```ts
const numCalc = new GenericCalculator<number>(0, (a, b) => a + b);
console.log(numCalc.sum(10, 15)); // 25
```

Or for strings:

```ts
const strCalc = new GenericCalculator<string>("", (a, b) => a + b);
console.log(strCalc.sum("Type", "Script")); // "TypeScript"
```


## 4. Using Constraints (Generic + Rules)

Let’s say you want a function that only works with things that have `.length`.

### Problem:

```ts
function logLength<T>(value: T): T {
  console.log(value.length); // Error!
  return value;
}
```

### Fix with Constraints

```ts
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): T {
  console.log(value.length); // Now safe!
  return value;
}

logLength("Hello");
logLength([1, 2, 3]);
logLength({ length: 99 });
```

> `T extends HasLength` guarantees that `.length` exists.


## 5. Access Object Properties Safely

Let’s say we want to grab a value from an object — only if the key actually exists:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user = { name: "Jean", age: 22 };
console.log(getProperty(user, "name")); // Jean
// getProperty(user, "email"); // Error: no such key
```


## 6. Class Factory with Generic Constraints

Let’s use generic class types and **constructor signatures**.

```ts
class BeeKeeper {
  hasMask = true;
}

class ZooKeeper {
  nametag = "Zookeeper Sam";
}

class Animal {
  numLegs = 4;
}

class Bee extends Animal {
  keeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper = new ZooKeeper();
}

function createInstance<A extends Animal>(Ctor: new () => A): A {
  return new Ctor();
}

console.log(createInstance(Lion).keeper.nametag); // Zookeeper Sam
console.log(createInstance(Bee).keeper.hasMask);  // true
```

> This pattern is used in **mixins**, **frameworks**, and **ORMs** (e.g. TypeORM, Angular).


## 🔬 7. Full Interactive Demo 

```ts
// Generic Class
class GenericCalculator<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFn;
  }

  sum(a: T, b: T): T {
    return this.add(a, b);
  }
}

const numCalc = new GenericCalculator<number>(0, (a, b) => a + b);
console.log("Number sum:", numCalc.sum(10, 15));

const strCalc = new GenericCalculator<string>("", (a, b) => a + b);
console.log("String sum:", strCalc.sum("Type", "Script"));

// Constraint: Only accepts .length
interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(value: T): T {
  console.log("Length:", value.length);
  return value;
}
logLength("Jean");
logLength([1, 2, 3]);

// Access safe object properties
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const profile = { username: "Jean", age: 21 };
console.log(getProperty(profile, "username"));

// Class Factory
class BeeKeeper { hasMask = true; }
class ZooKeeper { nametag = "Sam"; }
class Animal { numLegs = 4; }
class Bee extends Animal { keeper = new BeeKeeper(); }
class Lion extends Animal { keeper = new ZooKeeper(); }

function createInstance<A extends Animal>(Ctor: new () => A): A {
  return new Ctor();
}
console.log("Lion Keeper:", createInstance(Lion).keeper.nametag);
console.log("Bee Keeper:", createInstance(Bee).keeper.hasMask);
```


## Summary Table

| Concept                     | Explanation                                   |
| --------------------------- | --------------------------------------------- |
| `class MyClass<T>`          | A class that works for any type `T`           |
| `T extends Something`       | Constrains `T` to a shape (interface)         |
| `keyof T`                   | Gets all valid property keys of a type        |
| `new () => T`               | Constructor signature for class factories     |
| `GenericCalculator<number>` | A class instance with type set to `number`    |
| `getProperty(obj, "a")`     | Ensures safe property access                  |
| `createInstance(SomeClass)` | Creates instance with type inference + safety |


## What to Try Next (practice)

* Build a `GenericStack<T>` class
* Create a generic `Result<T, E>` structure
* Use `extends keyof` in a reusable CRUD service
* Apply this to real projects (like form handlers, state containers, etc.)

---
---
---
---
---
---
---

## 1. Build a `GenericStack<T>` Class

A classic stack (Last-In-First-Out) that works for any data type.

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item); //  push method on the internal array (this.items), not calling itself.
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop()); // 20

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.peek()); // world
```

> **Use case**: building undo/redo systems, navigation history, syntax parsing.


## 2. Create a Generic `Result<T, E>` Structure

This models a function that either succeeds with a value or fails with an error.

```ts
type Result<T, E> = 
  | { success: true; value: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { success: false, error: "Division by zero" };
  return { success: true, value: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log("Result:", result.value);
} else {
  console.error("Error:", result.error);
}
```

> **Use case**: replacing exceptions with predictable return values — great for API responses or business logic.


## 3. Use `extends keyof` in a Reusable CRUD Service

Safe access to object properties via dynamic keys.

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Jean", age: 22 };
console.log(getValue(user, "name")); // Jean
// console.log(getValue(user, "email")); // Type error
```


> **Use case**: building admin dashboards, auto-generated forms, or table components.



## 4. Apply Generics to Real Projects

Generics become **powerful tools** in real applications:

### Form Handlers

```ts
/*
** if u want to update many fields:
** Partial<T> : T Accepts one or more keys from the original object
function handleFormChange<T>(formState : T , updates : Partial<T>) : T {
  return {
    ...formState,
    ...updates
  }
}
*/
function handleFormChange<T>(formState: T, field: keyof T, value: any): T {
  return { ...formState, [field]: value };
}

const loginForm = { email: "", password: "" };

/*
** in case of updating many fields
const update2 = handleFormChange(loginForm, 
  {
    "email": "uwintwali.umd@outlook.com",
    "password": "123@Abc"
  }
  )
  */
const updated = handleFormChange(loginForm, "email", "jean@email.com");
console.log(updated);
```

In our case:

```ts
keyof T = "email" | "password"
// So you can only pass "email" or "password" — anything else will cause a type error.
```

 Context:

### 🔹 `T`

This is a **generic type** that represents the shape of the object being passed in (`formState`).

In this case:

```ts
T = {
  email: string;
  password: string;
}
```

### `field: keyof T`

This means:

* `field` must be one of the **keys of the object** `T`
* In your case: `field` must be `"email"` or `"password"`

```ts
keyof T = "email" | "password"
```

So TypeScript won’t allow you to pass something like `"username"` — it's not part of `loginForm`.


### `value: any`

You’re passing a new value to assign to the field.

In this example:

```ts
handleFormChange(loginForm, "email", "jean@email.com")
```

So:

* `formState = { email: "", password: "" }`
* `field = "email"`
* `value = "jean@email.com"`


## `{ ...formState, [field]: value }`

This is where the update happens.

Let’s break this into parts:


### 1. `...formState` → **Spread Operator**

This copies all the existing key-value pairs from `formState`.

So this:

```ts
...formState
```

Means:

```ts
email: "", 
password: ""
```

### 2. `[field]: value` → **Dynamic Property Update**

This uses **computed property names** in JavaScript/TypeScript.

Let’s say:

```ts
field = "email"
value = "jean@email.com"
```

Then:

```ts
[field]: value
```

becomes:

```ts
email: "jean@email.com"
```

So putting it together:

```ts
{ ...formState, [field]: value }
```

becomes:

```ts
{ email: "", password: "", email: "jean@email.com" }
```

And JavaScript keeps the **last version of each property**, so this becomes:

```ts
{ email: "jean@email.com", password: "" }
```

Now the form has been updated **without mutating the original object**.

---

## Visual Summary

```ts
// Original form:
const loginForm = { email: "", password: "" };

// You call:
handleFormChange(loginForm, "email", "jean@email.com")

// Inside function:
return {
  ...formState,           // copies all keys: { email: "", password: "" }
  [field]: value          // replaces the 'email' value
};

// Final result:
{ email: "jean@email.com", password: "" }
```

### State Containers

```ts
class Store<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  update(partial: Partial<T>) {
    this.state = { ...this.state, ...partial };
  }
}

const userStore = new Store({ name: "Jean", age: 21 });
userStore.update({ age: 22 });
console.log(userStore.getState()); // { name: "Jean", age: 22 }
```

> **Use case**: Replace Redux-like stores or manage component state in large apps.
