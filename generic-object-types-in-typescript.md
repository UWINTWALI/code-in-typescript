# Generic Object Types in TypeScript

Generics in TypeScript allow you to write flexible, reusable, and type-safe code. Let's explore this through a simple and relatable scenario: **a Box that can hold anything**.


## Why Not Just Use `any` or `unknown`?

Let’s say you want a container that can store values of different types — strings, numbers, even custom objects like `Giraffe`. Here’s a basic (but unsafe) attempt:

```ts
interface Box {
  contents: any;
}
```

Using `any` works, but it disables type checking. You might end up passing the wrong type and introducing bugs.

You might try:

```ts
interface Box {
  contents: unknown;
}
```

`unknown` is safer than `any`, but you’ll have to do type checking or type assertions every time you access `contents`.

### Demo

```ts
let x: Box = {
  contents: "hello world",
};

// Type guard
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// Or type assertion
console.log((x.contents as string).toUpperCase());
```


## The Boilerplate Problem

Let’s say you try to solve the problem with multiple specific box types:

```ts
interface NumberBox {
  contents: number;
}
interface StringBox {
  contents: string;
}
interface BooleanBox {
  contents: boolean;
}
```

Now you have to duplicate functions too:

```ts
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

This is tedious, error-prone, and hard to maintain. There's a better way — **generics!**


## Using Generics to Create Reusable Box Types

We can define a generic `Box<Type>` interface:

```ts
interface Box<Type> {
  contents: Type;
}
```

Now, we can create any type of box by simply passing in the type:

```ts
let boxA: Box<string> = { contents: "hello" };
let boxB: Box<number> = { contents: 123 };
```

This is equivalent to our earlier `StringBox`, `NumberBox`, etc., but **with only one interface**.


## Generic Functions

We can also write generic functions that work with any box type:

```ts
function setContents<Type>(box: Box<Type>, newContents: Type): void {
  box.contents = newContents;
}
```

### Demo

```ts
interface Apple {
  variety: string;
}

type AppleBox = Box<Apple>;

const myAppleBox: AppleBox = {
  contents: { variety: "Golden Delicious" },
};

setContents(myAppleBox, { variety: "Fuji" });
console.log("Updated AppleBox:", myAppleBox);
```


## Generics with Type Aliases

You can define generic types using **type aliases** too:

```ts
type Container<T> = {
  contents: T;
};
```

These are functionally the same as generic interfaces, but type aliases can also represent more than just object types (like unions, tuples, etc.).


## Why Type Checking Helps

Let’s look at a quick example to show **why static typing is useful**:

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// Correct usage
draw({ color: "blue", radius: 42 });

// Typo: 'raidus' instead of 'radius'
draw({ color: "red", raidus: 42 });
// Error: Object literal may only specify known properties.
```

Without type checking, that typo would go unnoticed. TypeScript saves you from subtle bugs.



## Final Thoughts

Generics are a powerful way to:

* Eliminate repetitive code
* Improve maintainability
* Retain type safety without sacrificing flexibility

Use them whenever you find yourself duplicating types or functions for different data types. That’s how you write smart, scalable TypeScript!