### Developer Buzz:

Did you know? **TypeScript 5.x** continues to improve **type narrowing and inference**, making your code both more **robust** and **cleaner**. More dev teams are shifting from plain JavaScript to TypeScript for **scalability and safety**. It's a great time to strengthen your TypeScript skills.




## TypeScript Index Signature and Dynamic Properties

This tutorial introduces how to define and manipulate an object in TypeScript where keys and values can be dynamic, using an **index signature**.

### Objective

* Learn how to define flexible object structures using `[key: string]: any`
* Add new properties dynamically
* Safely loop through object keys using `Object.prototype.hasOwnProperty`


### Code Example

```ts
// Define an object with a dynamic structure
let car: { [key: string]: any } = {
    make: "ford",
    model: "mustand",
    year: 1789
};

// Dynamically add or update properties
car.color = "black";
car.year = 2021;

// Define a function to safely show object contents
function show(obj: { [key: string]: any }) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            console.log(`- ${key} : ${value}`);
        }
    }
}

// Run the display function
show(car);
```


### Explanation

| Part                            | Purpose                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| `let car: {[key: string]: any}` | Defines an object that can have any string key with any value.                               |
| `car.color = "black"`           | Dynamically adds a new key-value pair.                                                       |
| `car.year = 2021`               | Updates an existing property.                                                                |
| `function show(...)`            | Loops through the object's keys safely using `hasOwnProperty` to avoid inherited properties. |


### Why `hasOwnProperty`?

When looping with `for...in`, you may also get keys from the object’s prototype chain. To ensure only the object's own properties are shown, use:

```ts
Object.prototype.hasOwnProperty.call(obj, key)
```

This avoids unexpected behavior when objects inherit from other prototypes. This line checks whether obj has its own property named key, and not one inherited from its prototype chain.



---

### Output:

```
- make : ford
- model : mustand
- year : 2021
- color : black
```


### When to Use This Pattern

* When working with unknown or dynamic object shapes
* When building configs or JSON-like structures
* When parsing API responses that vary in shape

---

###  Pro Tip

Instead of `any`, prefer using `unknown` or stricter types when possible. Use `any` only when necessary to avoid losing TypeScript’s type safety.
