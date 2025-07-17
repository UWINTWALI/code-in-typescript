# TypeScript Classes & Inheritance

## Table of Contents

1. [Making Classes Flexible with Index Signatures](#1-making-classes-flexible-with-index-signatures)
2. [The Art of Class Inheritance](#2-the-art-of-class-inheritance)
3. [Keeping Promises with `implements`](#3-keeping-promises-with-implements)
4. [Building on Foundations with `extends`](#4-building-on-foundations-with-extends)
5. [Customizing Behavior through Method Overriding](#5-customizing-behavior-through-method-overriding)
6. [Type Declarations Without Runtime Impact](#6-type-declarations-without-runtime-impact)
7. [Understanding the Class Initialization Dance](#7-understanding-the-class-initialization-dance)
8. [Extending JavaScript's Built-in Classes](#8-extending-javascripts-built-in-classes)


## 1. Making Classes Flexible with Index Signatures 

Sometimes we need a class where we **don’t know all the property names ahead of time** — like a permission system where each user may have different permissions.

That’s where **index signatures** are useful. They allow us to say:
**“This class can have any number of additional properties, as long as their key and value match a certain type.”**

---

### Concept First:

In this example, we're saying:

```ts
[permissionName: string]: boolean | ((name: string) => boolean);
```

This means:

> “This class can have any string key, and the value can be either a `boolean`, or a `function` that returns a `boolean`.”


## Part 1: `this[permission]` vs. `this.permission`

### `this[permission]`

* This is **dynamic property access** (called "bracket notation").
* It works when you don’t know the name of the property in advance — the name is stored in a variable.

Example:

```ts
const key = "canEdit";
console.log(this[key]); // Looks for this.canEdit
```

### `this.permission`

* This is **static property access** (called "dot notation").
* It looks for a **property literally named `permission`**.

Example:

```ts
console.log(this.permission); // Looks for this.permission (exact name)
```

### Summary:

| Expression         | Looks for                                 |
| ------------------ | ----------------------------------------- |
| `this["canEdit"]`  | the value of `this.canEdit`               |
| `this[permission]` | the value of `this[someVariable]`         |
| `this.permission`  | the property literally named "permission" |

So in this line:

```ts
const value = this[permission];
```

We're using a **variable** `permission` to **dynamically access** a property. That’s **necessary** when the property name is only known at runtime.


## Part 2: Understanding `[permissionName: string]: boolean | ((name: string) => boolean);`


### Why use `[permissionName: string]`?

It allows you to say:

> “The object/class can accept any custom key of type `string`, like `canEdit`, `canDelete`, `canShare`, etc.”

Without this, TypeScript would complain if you tried to do:

```ts
userPermissions["canEditProfile"] = true; // Error without index signature
```

But with the index signature:

```ts
[permissionName: string]: boolean | ((name: string) => boolean);
```

You're telling TypeScript:
"I might add arbitrary string keys later, and here’s what kind of value they'll have."


### Full Code with Clear Explanations

```typescript
// We create a flexible class using an index signature
class PermissionManager {
  // Allow any string property that is either a boolean or a function returning a boolean
  [permissionName: string]: boolean | ((name: string) => boolean);

  // This method checks if a given permission is allowed
  verifyPermission(permission: string): boolean {
    const value = this[permission]; // Try to get the value from the class using the permission name

    // If the value is a function, we call it
    if (typeof value === "function") {
      return value(permission);
    }

    // If the value is a boolean (true or false), just return it
    return !!value; // If it's undefined, return false
  }
}

// ========== DEMO ==========
const userPermissions = new PermissionManager();

// Add a simple boolean permission
userPermissions["canEditProfile"] = true;

// Add a permission using a function (for custom logic)
userPermissions["canDeletePosts"] = (permName) => permName === "canDeletePosts";

// Check if user has certain permissions
console.log("Can edit profile?", userPermissions.verifyPermission("canEditProfile")); // true
console.log("Can delete posts?", userPermissions.verifyPermission("canDeletePosts")); // true
console.log("Can view analytics?", userPermissions.verifyPermission("canViewAnalytics")); // false (not defined)
```



### Why This Is Useful

You might use this when:

* You’re building a **user permissions** or **settings manager**
* You want **flexible property names** without losing **type safety**
* You want to allow either **booleans** or **functions that evaluate to booleans**


### Important Note

While index signatures are powerful, **don’t overuse them**. Too many dynamic properties can:

* Make code harder to understand
* Make autocomplete and type checking less helpful

Use them **only when flexibility is really needed**.


## 2. The Art of Class Inheritance

Inheritance is like passing down family traits - a child class gets all the capabilities of its parent and can add its own special features.

```typescript
class Measurement {
  private _value = 0;

  get current(): number {
    return this._value;
  }

  set update(value: string | number | boolean) {
    const num = Number(value);
    this._value = Number.isFinite(num) ? num : 0;
  }
}
```

This simple `Measurement` class handles numeric values safely. Now imagine specializing it...

## 3. Keeping Promises with `implements` in TypeScript

In TypeScript, the `implements` keyword acts like a **contract** between a class and an interface. When a class implements an interface, it **guarantees** that it will provide concrete definitions for every member defined by the interface.

Let’s start with an intuitive analogy.

> *If an interface is a blueprint, then `implements` ensures the class builds according to that blueprint.*


### 1. **Define the Interface (The Contract)**

```typescript
interface Loggable {
  log(message: string): void;
}
```

This interface declares one method: `log()`. Any class that `implements Loggable` **must** have a method named `log` that takes a string argument and returns nothing (`void`).


### 2. **Implementing the Interface in a Class**

```typescript
class ConsoleLogger implements Loggable {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}
```

This class **honors the contract**. It implements the `log` method as required.

### 3. **Failing to Implement the Contract**

```typescript
class FileLogger implements Loggable {
  saveToFile(message: string): void {
    console.log(`Saving to file: ${message}`);
  }
}
```

This will throw a **TypeScript error**:

```
Class 'FileLogger' incorrectly implements interface 'Loggable'.
Property 'log' is missing in type 'FileLogger' but required in type 'Loggable'.
```

Why? Because `FileLogger` promised to implement `log()` but didn’t.


## Why This Matters

* Interfaces **describe what** needs to be done.
* Classes **decide how** it’s done.

This separation helps you build **interchangeable components**. For example:

```typescript
function writeLog(logger: Loggable, msg: string) {
  logger.log(msg);
}

const consoleLogger = new ConsoleLogger();
writeLog(consoleLogger, "Hello Console!");

// You could add another class later:
class TimestampLogger implements Loggable {
  log(message: string): void {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

writeLog(new TimestampLogger(), "Message with timestamp");
```

No matter which logger you use, `writeLog()` works the same way — because all loggers **implement the same interface**.



## Playable Example in Browser Console

Copy and paste this block into your TypeScript playground:

```typescript
interface Loggable {
  log(message: string): void;
}

class ConsoleLogger implements Loggable {
  log(message: string): void {
    console.log(`[ConsoleLogger] ${message}`);
  }
}

class TimestampLogger implements Loggable {
  log(message: string): void {
    const now = new Date().toISOString();
    console.log(`[${now}] ${message}`);
  }
}

function writeLog(logger: Loggable, message: string): void {
  logger.log(message);
}

// Test it
const logger1 = new ConsoleLogger();
const logger2 = new TimestampLogger();

writeLog(logger1, "System started");
writeLog(logger2, "System initialized with timestamp");
```

You’ll see output like:

```
[ConsoleLogger] System started
[2025-07-16T12:00:00.000Z] System initialized with timestamp
```


## Final Takeaways

* `implements` is a **promise**: your class must define all members from the interface.
* This improves **reliability**, **scalability**, and **code consistency**.
* It allows **plug-and-play** behavior — write once, reuse everywhere.

If you're working with TypeScript, mastering `implements` means you’re writing **strong, predictable, and flexible** code.

## 4. Building on Foundations with `extends`

Where `implements` requires you to fulfill a contract, `extends` gives you functionality for free that you can then build upon.

```typescript
class Vehicle {
  move(distance: number) {
    console.log(`Moving ${distance} meters`);
  }
}

class Helicopter extends Vehicle {
  fly(height: number) {
    console.log(`Flying ${height} meters high`);
  }
}

const chopper = new Helicopter();
chopper.move(100); // From Vehicle
chopper.fly(500);  // From Helicopter
```

**Key difference**: 
- `implements` says "you must do these things"
- `extends` says "you get these things and can add more"

## 5. Customizing Behavior through Method Overriding

When a child class wants to do something differently than its parent, it can override methods while maintaining compatibility.

```typescript
class Greeter {
  greet() {
    return "Hello!";
  }
}

class PersonalizedGreeter extends Greeter {
  greet(name?: string) {
    if (!name) return super.greet();
    return `Hello, ${name}!`;
  }
}

const greeter: Greeter = new PersonalizedGreeter();
console.log(greeter.greet()); // "Hello!"
```

**The golden rule**: Your overridden method should work in all cases where the original worked. Here, `PersonalizedGreeter` still handles the no-argument case.

## 6. Type Declarations Without Runtime Impact

The `declare` keyword lets you adjust types without changing runtime behavior - like telling TypeScript "trust me, this is what it will be."

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a noise.`;
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  speak(): string {
    return `${this.name} says meow.`;
  }
}

class AnimalShelter {
  resident: Animal;

  constructor(animal: Animal) {
    this.resident = animal;
  }

  describeResident(): string {
    return this.resident.speak();
  }
}

class CatShelter extends AnimalShelter {
  declare resident: Cat;

  constructor(cat: Cat) {
    super(cat);
  }
}

// Interacting in console
const kitty = new Cat("Whiskers");
const shelter = new CatShelter(kitty);

console.log(shelter.describeResident()); // Output: "Whiskers says meow."
```

**When you'd use this**: When you know more about the specific types than TypeScript can infer, but don't need to actually change the JavaScript output.
```Typescript
/* But with AnimalShelter we can get pretty much the same. but since we know that "Whiskers" is cat we have to be very specific to help out compiler and for performance*/
const kitty = new Cat("Whiskers");
const shelter = new AnimalShelter(kitty);

console.log(shelter.describeResident()); 
```

I recommend using declare resident: Cat in a subclass like CatShelter when you want to make the inherited resident property more specific than the type declared in the parent class. While the code works fine at runtime due to JavaScript’s dynamic method dispatch (polymorphism), this type declaration helps TypeScript understand that resident is guaranteed to be a Cat in this context. This allows you to safely access Cat-specific properties and methods without needing type assertions or casting, and it improves type safety, code clarity, and editor support. It’s not required for functionality, but it’s a good practice when you're working with specialized subclasses.

## 7. Understanding the Class Initialization Dance

Classes initialize in a specific order that's important to understand when working with inheritance.

```typescript
class Base {
  name = "base";
  
  constructor() {
    console.log(`Initializing ${this.name}`);
  }
}

class Derived extends Base {
  name = "derived";
}

new Derived(); // Logs: "Initializing base"
```

**Why this happens**:
1. Base class fields initialize
2. Base constructor runs
3. Derived class fields initialize
4. Derived constructor runs

This means when the base constructor runs, derived fields aren't set yet! until the constructor set the field(s).

## 8. Extending JavaScript's Built-in Classes

When extending built-in classes like `Error`, `Array`, or `Map`, there are special considerations.

```typescript
class FriendlyError extends Error {
  constructor(message: string) {
    super(message);
    // Required for proper prototype chain
    Object.setPrototypeOf(this, FriendlyError.prototype);
  }
  
  explain() {
    return `Let me explain what went wrong: ${this.message}`;
  }
}

const err = new FriendlyError("File not found");
console.log(err.explain());
```

**The crucial part**: `Object.setPrototypeOf` ensures methods added to your subclass will work properly. Without it, `explain()` would be undefined when the error is caught elsewhere.

## Bringing It All Together


### Simple Payment Example

```ts
// Describes the ability to process payments
interface PaymentProcessor {
  process(amount: number): boolean;
}

// A general type of payment method (not used directly)
abstract class PaymentMethod {
  constructor(public name: string) {}

  // Every payment method must have a way to check if it's valid
  abstract validate(): boolean;
}

// A specific payment method: Credit Card
class CreditCard extends PaymentMethod implements PaymentProcessor {
  constructor(public cardNumber: string, public expiry: string) {
    super("Credit Card");
  }

  // A very basic check to see if the card looks valid
  validate(): boolean {
    return this.cardNumber.length === 16 && this.expiry.includes("/");
  }

  // Tries to process the payment if the card is valid
  process(amount: number): boolean {
    if (!this.validate()) {
      console.log("Card is not valid.");
      return false;
    }
    console.log(`Paid $${amount} using ${this.name}`);
    return true;
  }
}

// Example use
const card = new CreditCard("1234567812345678", "12/25");
card.process(100); // Logs: Paid $100 using Credit Card
```

---

### What’s Happening:




This project demonstrates how to use TypeScript interfaces, abstract classes, and inheritance to structure a basic payment processing system. The goal is to understand each line of code like an engineer — analyzing the intention, mechanics, and real-life analogy behind every component.

### 1. Interface Definition

```ts
interface PaymentProcessor {
  process(amount: number): boolean;
}
````

This `interface` defines a contract. Any class that "implements" this interface must provide a `process()` method. The method signature `process(amount: number): boolean` means that the method takes a numeric input and must return a boolean.

Under the hood, TypeScript does not compile interfaces to JavaScript. They exist only at compile-time for type checking. Think of `PaymentProcessor` like a promise you must keep: if you say you’re a `PaymentProcessor`, you must be able to process payments.

In terms of analogy, imagine a `PaymentProcessor` is a job description. It doesn’t do anything by itself, but if you claim the title, you must perform the duties listed in that description.

### 2. Abstract Class

```ts
abstract class PaymentMethod {
  constructor(public name: string) {}

  abstract validate(): boolean;
}
```

This `abstract` class is a blueprint. It cannot be instantiated directly. It forces all subclasses to implement the `validate()` method.

In the constructor, `public name: string` both declares and initializes a public member called `name`. The abstract method `validate()` is a rule, saying that every subclass must have its own version of this method.

Under the hood, JavaScript has no `abstract` keyword. TypeScript enforces this rule at compile-time. If a subclass fails to implement the `validate()` method, the TypeScript compiler will throw an error.

The analogy here is that this class represents an abstract payment system. It defines that any payment method must be able to validate itself, but it doesn’t specify how. Each subclass will define its own way.

### 3. Concrete Class with Interface and Abstract Inheritance

```ts
class CreditCard extends PaymentMethod implements PaymentProcessor {
  constructor(public cardNumber: string, public expiry: string) {
    super("Credit Card");
  }
```

This class extends `PaymentMethod`, meaning it inherits the `name` property and the requirement to implement the `validate()` method. It also implements `PaymentProcessor`, meaning it must define the `process(amount: number): boolean` method.

The constructor accepts `cardNumber` and `expiry` as parameters and assigns them to the instance. It also calls `super("Credit Card")` to initialize the inherited `name` property.

Under the hood, `super()` must be called before accessing `this` in a constructor. After this call, the instance has a `name`, `cardNumber`, and `expiry`, and is required to define both `validate()` and `process()` methods.

### 4. Validation Method

```ts
validate(): boolean {
  return this.cardNumber.length === 16 && this.expiry.includes("/");
}
```

This method checks whether the card number is exactly 16 characters and the expiry string contains a forward slash. It returns true only if both conditions are met.

Under the hood, this is a very naive validator. In real-world applications, the validation would involve more sophisticated logic such as the Luhn algorithm, proper date format validation, and expiration date comparison.

### 5. Process Method

```ts
process(amount: number): boolean {
  if (!this.validate()) {
    console.log("Card is not valid.");
    return false;
  }
  console.log(`Paid $${amount} using ${this.name} ${this.cardNumber}`);
  return true;
}
```

This method checks whether the card is valid using the `validate()` method. If the card is not valid, it logs a message and returns `false`. If the card is valid, it logs the payment and returns `true`.

This method uses the `validate()` method defined in the same class, which satisfies the contract enforced by the abstract class. It uses `this.name`, which is "Credit Card", and `this.cardNumber`, which was set in the constructor.

Even though you implement the `process()` method because of the `PaymentProcessor` interface, it's still your decision how you handle the payment logic inside that method.

### 6. Usage / Instantiation

```ts
const card = new CreditCard("1234567812345678", "12/25");
card.process(100443); // Logs: Paid $100 using Credit Card
```

In this example, `new CreditCard(...)` creates an instance of the class with the specified card number and expiry date. When `card.process(100443)` is called, it first validates the card. If valid, it logs the message and returns `true`.

In this specific instance, since the card has 16 digits and a valid-looking expiry, the call to `process()` succeeds and logs the message indicating payment.

### 7. Summary (Engineer-Level Mindset)

The table below maps the structure to its TypeScript feature and the role it plays.

| Concept                        | TypeScript Feature | Role                                                  |
| ------------------------------ | ------------------ | ----------------------------------------------------- |
| `interface PaymentProcessor`   | Interface          | Defines a capability (e.g. can process a payment)     |
| `abstract class PaymentMethod` | Abstract class     | Defines shared behavior & rules for all payment types |
| `CreditCard` class             | Concrete class     | Implements interface + inherits abstract class        |
| `validate()`                   | Method             | Verifies if the payment method is usable              |
| `process()`                    | Method             | Performs the action if validation passes              |
| `super()`                      | Superclass call    | Initializes the parent class’s property               |

### 8. Thought Process Questions

* What does each class represent in the real world?
* What contracts are enforced? What freedom does each class have?
* What would happen if I removed `implements`? Or forgot to implement `validate()`?
* How does this scale to multiple payment methods (e.g. PayPal, Crypto)?

## Final Words

Remember that inheritance is a powerful tool, but composition (building objects by combining simpler objects) is often more flexible. TypeScript's type system lets you use both approaches effectively.

When designing your class hierarchy:
1. Favor `implements` for defining capabilities
2. Use `extends` judiciously for true "is-a" relationships
3. Keep inheritance chains shallow (deep hierarchies become hard to maintain)
4. Consider using small classes and combining them

The true power of TypeScript's class system comes from combining these features thoughtfully to create clear, maintainable object-oriented code.
