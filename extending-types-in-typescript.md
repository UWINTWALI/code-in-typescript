# Extending Types in TypeScript

When building software, we often deal with types that naturally evolve or grow. For example, you might start with a simple address and later realize you also need to track apartment numbers or units. TypeScript makes this kind of growth possible through **extending types**.

This avoids repeating yourself, keeps your code meaningful, and makes relationships between types clear.


## What This Covers

* Reusing object type structures using `extends`
* Extending multiple interfaces
* Building types by combining others using intersection types (`&`)
* Real-world examples that highlight each approach
* Bonus: Index signatures and readonly arrays
* Bonus: A practical union type use case


## 1. Repetition Without Extending

Let’s define a type to describe a basic postal address:

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

Now we want to add a `unit` (like an apartment or suite number), so we define another interface:

```ts
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

It works — but it repeats every field from `BasicAddress`, which makes the code harder to maintain.

### Demo

```ts
const address1: AddressWithUnit = {
  name: "Alice",
  unit: "Apt 101",
  street: "123 Main St",
  city: "Kigali",
  country: "Rwanda",
  postalCode: "25000",
};

console.log("Repetition Without Extending:", address1);
```


## 2. Extending an Interface

Instead of repeating fields, we can extend `BasicAddress` and only add what’s new:

```ts
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

This version is cleaner and signals an important relationship:

> `AddressWithUnit` is a kind of `BasicAddress`, with one extra field.

### Demo

```ts
const address2: AddressWithUnit = {
  name: "Bob",
  unit: "Suite 7B",
  street: "456 Elm St",
  city: "Musanze",
  country: "Rwanda",
  postalCode: "25001",
};

console.log("\nExtended Address:", address2);
```


## 3. Extending Multiple Interfaces

An interface in TypeScript can extend more than one other interface:

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}
```

Here, `ColorfulCircle` inherits both `color` and `radius`.

### Demo

```ts
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

console.log("\nColorfulCircle:", cc);
```


## 4. Intersection Types (`&`)

In addition to extending interfaces, TypeScript lets you create **intersection types** using `&`:

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

This creates a new type that combines both `Colorful` and `Circle`.

### Demo

```ts
const fancy: ColorfulCircle = {
  color: "blue",
  radius: 99,
};

console.log("\nFancy Circle using &:", fancy);
```


## 5. Index Signatures and Readonly Arrays

You can also describe objects where the property names aren't known ahead of time:

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;
  name: string;
}
```

> "You can use any string as a property key, and the value must be a number or a string."


---
---
---
---
---
---
---

```ts
[index: string]: number | string;
```

This is called an **index signature** in TypeScript.



### What It Means

It tells TypeScript:

> "This object can have **any number of properties**, as long as the **property key is a `string`**, and the **value must be either a `number` or a `string`**."

In short:
**You don't know the exact property names ahead of time, but you want to describe the shape of those properties.**


### Think of It Like a Dictionary

Just like a dictionary maps words (keys) to definitions (values), this type maps **string keys** to **number or string values**.



### Real Example

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;  // <== this allows unknown string keys
  name: string;
  length: number;
}
```

Then you can do:

```ts
const dict: NumberOrStringDictionary = {
  name: "Demo Dict",
  length: 3,
  age: 27,
  key1: "hello",
  score: 42,
};
```

This is valid because:

* All keys are **strings**
* All values are either **number** or **string**



**Readonly arrays can be modeled like this:**

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
```
TypeScript arrays are indexed by numbers, not strings.

### Demo

```ts
const dict: NumberOrStringDictionary = {
  name: "Demo Dict",
  length: 3,
  key1: "value",
  key2: 22,
};

console.log("\nIndex Signature:", dict);
```

```ts
function getReadOnlyStringArray(): ReadonlyStringArray {
  return ["Alpha", "Beta", "Gamma"];
}

const myArray = getReadOnlyStringArray();
console.log("\nReadonly Array:", myArray);
// myArray[0] = "Changed"; // ❌ Error: Cannot assign to read-only property
```



## Summary Table

| Concept            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `extends`          | Inherit fields from another interface                   |
| Multiple `extends` | Extend more than one interface at the same time         |
| `&` intersection   | Create a new type by combining two existing types       |
| Index signature    | Define property names dynamically                       |
| `readonly`         | Prevent properties or array elements from being changed |



## Try This

Create a base interface called `User` with `id` and `name`. Then extend it to make two new types:

* `AdminUser` with a `role` field
* `RegularUser` with a `subscriptionLevel` field

Then write a function that accepts either type and prints different messages based on the kind of user.

### Demo

```ts
interface User {
  id: number;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
}

interface RegularUser extends User {
  subscriptionLevel: "free" | "premium";
}

type AppUser = AdminUser | RegularUser;

function describeUser(user: AppUser) {
  if ("role" in user) {
    console.log(`\n Admin User: ${user.name} (Role: ${user.role})`);
  } else {
    console.log(`\n Regular User: ${user.name} (Subscription: ${user.subscriptionLevel})`);
  }
}

const admin: AdminUser = { id: 1, name: "Jean", role: "admin" };
const regular: RegularUser = { id: 2, name: "Mucyo", subscriptionLevel: "premium" };

describeUser(admin);
describeUser(regular);
```



## Final Note

Extending types in TypeScript helps build structured, scalable, and meaningful code.
Use it often when designing complex applications where types share common structure or behavior.

Let your types evolve without your codebase breaking. That’s the TypeScript way!


# Extending Types in TypeScript

When building software, we often deal with types that naturally evolve or grow. For example, you might start with a simple address and later realize you also need to track apartment numbers or units. TypeScript makes this kind of growth possible through **extending types**.

This avoids repeating yourself, keeps your code meaningful, and makes relationships between types clear.


## What This Covers

* Reusing object type structures using `extends`
* Extending multiple interfaces
* Building types by combining others using intersection types (`&`)
* Real-world examples that highlight each approach
* Bonus: Index signatures and readonly arrays
* Bonus: A practical union type use case


## 1. Repetition Without Extending

Let’s define a type to describe a basic postal address:

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

Now we want to add a `unit` (like an apartment or suite number), so we define another interface:

```ts
interface AddressWithUnit {
  name?: string;
  unit: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

It works — but it repeats every field from `BasicAddress`, which makes the code harder to maintain.

### Demo

```ts
const address1: AddressWithUnit = {
  name: "Alice",
  unit: "Apt 101",
  street: "123 Main St",
  city: "Kigali",
  country: "Rwanda",
  postalCode: "25000",
};

console.log("Repetition Without Extending:", address1);
```


## 2. Extending an Interface

Instead of repeating fields, we can extend `BasicAddress` and only add what’s new:

```ts
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

This version is cleaner and signals an important relationship:

> `AddressWithUnit` is a kind of `BasicAddress`, with one extra field.

### Demo

```ts
const address2: AddressWithUnit = {
  name: "Bob",
  unit: "Suite 7B",
  street: "456 Elm St",
  city: "Musanze",
  country: "Rwanda",
  postalCode: "25001",
};

console.log("\nExtended Address:", address2);
```


## 3. Extending Multiple Interfaces

An interface in TypeScript can extend more than one other interface:

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}
```

Here, `ColorfulCircle` inherits both `color` and `radius`.

### Demo

```ts
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

console.log("\nColorfulCircle:", cc);
```


## 4. Intersection Types (`&`)

In addition to extending interfaces, TypeScript lets you create **intersection types** using `&`:

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

This creates a new type that combines both `Colorful` and `Circle`.

### Demo

```ts
const fancy: ColorfulCircle = {
  color: "blue",
  radius: 99,
};

console.log("\nFancy Circle using &:", fancy);
```


## 5. Index Signatures and Readonly Arrays

You can also describe objects where the property names aren't known ahead of time:

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;
  name: string;
}
```

> "You can use any string as a property key, and the value must be a number or a string."


---
---
---
---
---
---
---

```ts
[index: string]: number | string;
```

This is called an **index signature** in TypeScript.



### What It Means

It tells TypeScript:

> "This object can have **any number of properties**, as long as the **property key is a `string`**, and the **value must be either a `number` or a `string`**."

In short:
**You don't know the exact property names ahead of time, but you want to describe the shape of those properties.**


### Think of It Like a Dictionary

Just like a dictionary maps words (keys) to definitions (values), this type maps **string keys** to **number or string values**.



### Real Example

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;  // <== this allows unknown string keys
  name: string;
  length: number;
}
```

Then you can do:

```ts
const dict: NumberOrStringDictionary = {
  name: "Demo Dict",
  length: 3,
  age: 27,
  key1: "hello",
  score: 42,
};
```

This is valid because:

* All keys are **strings**
* All values are either **number** or **string**



**Readonly arrays can be modeled like this:**

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
```
TypeScript arrays are indexed by numbers, not strings.

### Demo

```ts
const dict: NumberOrStringDictionary = {
  name: "Demo Dict",
  length: 3,
  key1: "value",
  key2: 22,
};

console.log("\nIndex Signature:", dict);
```

```ts
function getReadOnlyStringArray(): ReadonlyStringArray {
  return ["Alpha", "Beta", "Gamma"];
}

const myArray = getReadOnlyStringArray();
console.log("\nReadonly Array:", myArray);
// myArray[0] = "Changed"; // ❌ Error: Cannot assign to read-only property
```



## Summary Table

| Concept            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `extends`          | Inherit fields from another interface                   |
| Multiple `extends` | Extend more than one interface at the same time         |
| `&` intersection   | Create a new type by combining two existing types       |
| Index signature    | Define property names dynamically                       |
| `readonly`         | Prevent properties or array elements from being changed |



## Try This

Create a base interface called `User` with `id` and `name`. Then extend it to make two new types:

* `AdminUser` with a `role` field
* `RegularUser` with a `subscriptionLevel` field

Then write a function that accepts either type and prints different messages based on the kind of user.

### Demo

```ts
interface User {
  id: number;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
}

interface RegularUser extends User {
  subscriptionLevel: "free" | "premium";
}

type AppUser = AdminUser | RegularUser;

function describeUser(user: AppUser) {
  if ("role" in user) {
    console.log(`\n Admin User: ${user.name} (Role: ${user.role})`);
  } else {
    console.log(`\n Regular User: ${user.name} (Subscription: ${user.subscriptionLevel})`);
  }
}

const admin: AdminUser = { id: 1, name: "Jean", role: "admin" };
const regular: RegularUser = { id: 2, name: "Mucyo", subscriptionLevel: "premium" };

describeUser(admin);
describeUser(regular);
```



## Final Note

Extending types in TypeScript helps build structured, scalable, and meaningful code.
Use it often when designing complex applications where types share common structure or behavior.

Let your types evolve without your codebase breaking. That’s the TypeScript way!


