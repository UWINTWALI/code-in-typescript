## Understanding Object Types in TypeScript

In JavaScript, objects are the primary way we organize and move data around.

TypeScript helps us make that process safer and more predictable by letting us describe the **structure** of those objects — what properties they must have, and what types those properties should be.

This is done through what TypeScript calls **object types**.

We can write them directly inside functions, or define them using `interface` or `type`.



## What This Guide Covers

* How to define object types using inline syntax, `interface`, and `type`
* How to mark properties as optional
* How to handle missing values safely
* How to set fallback values using JavaScript’s destructuring
* A complete example that explains each idea step by step



## Key Concepts

Before looking at the full example, let’s walk through the tools TypeScript provides for working with object types.



### 1. Defining Object Types

You can describe an object type right where you use it:

```ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

Or you can define a named structure using `interface`:

```ts
interface Person {
  name: string;
  age: number;
}
```

Or with `type`:

```ts
type Person = {
  name: string;
  age: number;
};
```
Then
```ts
function greet(person : Person ){
    return "Hello " + person.name;
}
```

Each version tells TypeScript exactly what the `person` object should look like.



### 2. Optional Properties

Sometimes, an object might have properties that aren’t always present.
We can indicate this using a question mark (`?`):

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```

This tells TypeScript:
If `xPos` or `yPos` are provided, they must be numbers.
But it's also fine if they’re left out.



### 3. Dealing with `undefined`

When you mark a property as optional, TypeScript understands that it might be `undefined`.

If you try to read that property, you need to check first:

```ts
if (opts.xPos !== undefined) {
  // It's safe to use opts.xPos here
}
```

Alternatively, you can provide a fallback.



### 4. Providing Default Values

JavaScript lets you assign default values using destructuring:

```ts
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  // xPos and yPos are guaranteed to be numbers here
}
```

This pattern helps you avoid repeating `undefined` checks and keeps your code clean.



## Full Example: A Painting Program

Let’s bring these ideas together.
We’ll define a shape and some paint options, then write a function that paints a shape step by step, depending on the provided options.

```ts
// Shape interface
interface Shape {
  name: string;
  color: string;
  draw: () => void;
}

// Options with optional coordinates
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// Simulate a shape to paint
function getShape(): Shape {
  return {
    name: "Circle",
    color: "Red",
    draw: () => {
      console.log("Step 3: Applying paint to the canvas.");
    },
  };
}

// Main function
function paintShape(opts: PaintOptions) {
  const { shape, xPos, yPos } = opts;

  console.log(`Step 1: Preparing to paint a ${shape.color} ${shape.name}.`);

  if (xPos !== undefined && yPos !== undefined) {
    console.log(`Step 2: Positioning shape at coordinates (${xPos}, ${yPos}).`);
  } else if (xPos !== undefined) {
    console.log(`Step 2: Positioning shape horizontally at x = ${xPos}.`);
  } else if (yPos !== undefined) {
    console.log(`Step 2: Positioning shape vertically at y = ${yPos}.`);
  } else {
    console.log("Step 2: No position specified; using default position.");
  }

  shape.draw();

  console.log("Step 4: Paint operation completed.\n");
}

// Try it out
const shape = getShape();

paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 200 });
paintShape({ shape, xPos: 150, yPos: 250 });
```



## Step-by-Step Recap

* We define a `Shape` with name, color, and a method to draw it.
* We define `PaintOptions`, where `xPos` and `yPos` are optional.
* In the `paintShape()` function, we handle four possibilities:

  * No coordinates
  * Only `xPos`
  * Only `yPos`
  * Both `xPos` and `yPos`
* Each path is handled clearly, and safely.



## Glossary of Terms

### `interface`

Defines a structure — what properties an object must have.

```ts
interface Shape {
  name: string;
  draw: () => void;
}
```



### `?` (optional property)

Means a property might be missing.

```ts
xPos?: number
```



### `undefined`

The absence of a value.
When something is optional and not provided, its value is `undefined`.



### Destructuring with Defaults

Allows you to assign a fallback if a property is missing.

```ts
function paint({ x = 0 }) {}
```



## Summary Table

| Concept               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `interface`           | Describes object structure                       |
| `?`                   | Marks optional properties                        |
| `undefined` check     | Ensures safe access to optional properties       |
| Destructuring default | Provides a fallback when property is not defined |



## Practice Idea

Add a new shape — for example, a `Square` with a `sideLength` property.
Update the `paintShape()` function to detect it and print its side length.

This small change will help you get more comfortable working with object types and conditional logic in TypeScript.