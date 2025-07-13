## Type Guards & Type Predicates in TypeScript

When working with values that can be more than one type, TypeScript gives us powerful tools to figure out **what we're dealing with** at runtime while keeping type safety. This is where **type guards** and **type predicates** come in.



## What This Covers

* Defining custom types using `interface`
* Using union types like `Fish | Bird`
* Writing a custom **type guard** function
* Narrowing types using **type predicates**
* Making runtime decisions safely based on object type



## Key Concepts You’ll See in This Example

Before we jump into the code, let’s break down a few TypeScript concepts that form the core of this tutorial:



### **1. `interface` – Defining Custom Types**

An `interface` describes the structure of an object — what properties and methods it must have.
It’s like giving TypeScript a checklist: “Any object of this type must follow this format.”

```ts
interface Fish {
  name: string;
  swim: () => void;
}
```



### **2. Union Types (`|`) – Handling Multiple Possibilities**

A **union type** lets you say that a value could be **one of several types**.

```ts
let pet: Fish | Bird;
```

This tells TypeScript:

> “`pet` might be a Fish, or it might be a Bird — I’ll figure that out later.”



### **3. Type Guard – Figuring Out What You're Dealing With**

A **type guard** is a function or condition that checks which type a value really is at runtime.
It helps TypeScript narrow down the type safely inside a block of code.

```ts
if (isFish(pet)) {
  // TypeScript knows pet is a Fish here
}
```



### **4. Type Predicate – Teaching the Compiler to Trust You**

A **type predicate** is the special syntax in a type guard that looks like this:

```ts
function isFish(pet: Fish | Bird): pet is Fish
```

This tells TypeScript:

> “If this function returns true, then you can treat `pet` as a Fish from here on.”

It's what gives the type guard its power to affect type checking.



### **Making Runtime Decisions Based on Object Type**

By combining these tools, you can write code that safely chooses behavior depending on what kind of object you're dealing with — without losing type safety.
This is especially useful when working with dynamic data like API responses, forms, or user actions.



## Full Code Example

```ts
// Step 1: Describe the structure of Fish and Bird
interface Fish {
  name: string;
  swim: () => void;
}

interface Bird {
  name: string;
  fly: () => void;
}

// Step 2: A type guard that checks if the given pet is a Fish
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Step 3: Use the guard to call the correct method
function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    console.log(`This ${pet.name} is really a Fish`);
    pet.swim();
  } else {
    console.log(`This ${pet.name} is Bird`);
    pet.fly();
  }
}

// Step 4: Create some example pets
const goldFish = {
  name: "Glodie",
  swim: () => console.log("swish swish swish"),
};

const parrot = {
  name: "Polly",
  fly: () => console.log("flap flap flap"),
};

// Step 5: Try moving them
move(goldFish); // Output: This Glodie is really a Fish
move(parrot);   // Output: This Polly is Bird
```



## How It Works (Explained Step-by-Step)

* We use `interface` to define what a `Fish` and a `Bird` should look like.
* We define a **union type**: `Fish | Bird`, which means a pet could be either.
* The function `isFish()` is a **type guard** — it checks if the `swim` method exists and narrows the type to `Fish`.
* TypeScript will understand this and allow us to safely call `.swim()` or `.fly()` depending on the result.



## Keywords & Concepts (Humanized Glossary)

### `interface`

> Think of it like a blueprint that says:
> "If you're a Fish, you need to have a `name` and a `swim()` method."

```ts
interface Fish {
  name: string;
  swim: () => void;
}
```



### `union type (|)`

> Allows a variable to be one of many types.
> "This `pet` can either be a `Fish` or a `Bird`."

```ts
let pet: Fish | Bird;
```



### **type guard**

> A function or condition that figures out what the real type of a value is during runtime.

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```



### **type predicate**

> The magic in the return type: `pet is Fish`.
> This tells TypeScript:
> "If this function returns true, `pet` can now be treated as a `Fish`."



### `as` (type assertion)

> Tells TypeScript to temporarily treat something as a specific type.
> "Hey, I know what I'm doing."

```ts
(pet as Fish).swim
```



### `undefined`

> A value that means “not assigned.”
> Often used in checks to confirm the presence of a property.

```ts
(pet as Fish).swim !== undefined
```



### `?` (optional property)

> Marks a property that may or may not exist on an object.

```ts
interface Shape {
  radius?: number;
}
```



### `discriminated union`

> A union of types where each type has a unique `kind` field.

```ts
interface Fish {
  kind: "fish";
  swim: () => void;
}
interface Bird {
  kind: "bird";
  fly: () => void;
}

function move(pet: Fish | Bird) {
  if (pet.kind === "fish") {
    pet.swim();
  } else {
    pet.fly();
  }
}
```



### `typeof`, `in`, `instanceof` (native type guards)

Built-in ways to check and narrow types:

```ts
typeof x === "string"       // for primitives
"name" in obj               // for property check
obj instanceof SomeClass    // for class-based instances
```



## Summary Table

| Concept             | Think of it as...                                        |
| ------------------- | -------------------------------------------------------- |
| `interface`         | A contract saying “here’s what a Fish must look like”    |
| `Fish \| Bird`      | A pet that could be a fish or a bird — not sure yet      |
| type guard          | A function that checks the real type at runtime          |
| type predicate      | A signal to the compiler saying: “Trust me, it’s a Fish” |
| `as Fish`           | Manual override saying “I know this is a Fish”           |
| `undefined` check   | Confirming a property or method exists                   |
| `?` in property     | Optional property that might be missing                  |
| discriminated union | Tagging types with `kind` to make them easier to filter  |



## Want to Extend This?

Try creating a `Duck` that can **both swim and fly**.
Then update your type guards to detect animals with multiple abilities.

