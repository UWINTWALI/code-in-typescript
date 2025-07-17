# Understanding Getters and Setters in TypeScript: An Engineering Perspective

In any structured software system, **data control** becomes a necessity, not a luxury. As engineers, we don’t just write code—we design systems. And in systems, internal states must often be hidden from the outside world, while still being accessible or modifiable in a controlled way.

This is where **getters and setters** play their role. They're not just syntactic sugar; they are tools that let you **enforce rules around how data is read or written**.


## Why Not Just Use Public Properties?

You might think: why not just expose a public field?

```ts
class Sensor {
  public temperature = 0;
}
```

This seems simple, but it means:

* **No validation** is possible.
* **No change tracking** or transformation logic.
* You can't control what happens when that field is modified.

That’s a violation of **encapsulation**, one of the pillars of object-oriented design. A better design exposes an interface but protects internal data. Just like how a microwave lets you push a button instead of fiddling with circuits inside.


## The Problem of Direct Access

Let’s take a simple measurement system:

```ts
class Measurement {
  private _value = 0;
}
```

This private `_value` can’t be accessed directly outside the class. So, how do we provide access?

Instead of making `_value` public, we use **getters** and **setters** to control how the value is read or written.


## How Getters Work

A **getter** is a special method that lets you **retrieve** a value as if it were a property.

```ts
get value(): number {
  return this._value;
}
```

This allows external code to do:

```ts
console.log(measurement.value);
```

But underneath, it's calling a method.

**Conceptually**, a getter acts like a **read-only interface** to private data. You can change its internal implementation later, and external code won’t know—this is powerful for refactoring and testing.


## How Setters Work

A **setter** is a method that acts as a **controlled entry point** for updating internal state.

```ts
set value(newValue: number) {
  if (Number.isFinite(newValue)) {
    this._value = newValue;
  } else {
    throw new Error("Invalid value.");
  }
}
```

Now you can do:

```ts
measurement.value = 42;
```

This is not just a variable assignment—it's a gatekeeper that lets you enforce rules, log changes, or even emit events when data changes.


## Full Example: Engineering View

Let’s assemble the class properly:

```ts
class Measurement {
  private _value = 0;

  get value(): number {
    return this._value;
  }

  set value(input: number | string | boolean) {
    const num = Number(input);
    this._value = Number.isFinite(num) ? num : 0;
  }
}
```

Now you can write:

```ts
const m = new Measurement();
m.value = "23.5";  // type coercion
console.log(m.value); // 23.5

m.value = "invalid";
console.log(m.value); // 0 (fallback)
```

This pattern protects the internal data from misuse, but still provides usability.


## Real-World Example: Bank Account System

Let’s move from theory to practice with a simple system you can run.

```ts
class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set deposit(amount: number) {
    if (amount > 0) {
      this._balance += amount;
      console.log(`Deposited: ${amount}`);
    } else {
      console.log("Deposit must be a positive number.");
    }
  }

  set withdraw(amount: number) {
    if (amount <= 0) {
      console.log("Withdrawal must be positive.");
    } else if (amount > this._balance) {
      console.log("Insufficient funds.");
    } else {
      this._balance -= amount;
      console.log(`Withdrew: ${amount}`);
    }
  }
}

// DEMO
const account = new BankAccount();

account.deposit = 500;
account.withdraw = 100;
account.withdraw = 700;

console.log("Current Balance:", account.balance);
```

### Output:

```
Deposited: 500
Withdrew: 100
Insufficient funds.
Current Balance: 400
```

This is a **usable interface** that hides internal complexity but exposes clean operations. You can later add logging, audit trails, or API hooks without changing the external API.


## Digging Deeper: What's Actually Happening?

Under the hood, when you write `account.balance`, TypeScript is translating it to:

```ts
account.get balance()
```

And for the setter:

```ts
account.set deposit(value)
```

The nice part is: **users don’t have to know.** They interact with your class as if it’s just plain data. But you, the engineer, control the logic inside.


## When to Use Getters and Setters

You should reach for getters/setters when:

* You need **validation** on incoming data.
* You want to **control side effects** (logging, API calls, state updates).
* You want to **change your internal implementation** without changing the external interface.

Avoid using them when:

* You're just storing and reading raw values with no logic.
* You're introducing unnecessary complexity into a simple object.


## Conclusion

Getters and setters in TypeScript are more than just syntactic features—they’re architectural tools. They help you define **clean APIs**, **protect internal state**, and **guide how data flows** through your system.

They let you **design like an engineer**, where access is not just about what can be done—but about what should be done.
