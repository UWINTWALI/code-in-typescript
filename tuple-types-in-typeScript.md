# Tuple Types in TypeScript

Tuples in TypeScript give you the **power of arrays** with the **precision of types**. You know exactly **what should be in each position**, which means **clear structure, better type safety, and more readable code**.


## What This Covers

* What is a tuple?
* How tuples differ from regular arrays
* How to define and use tuple types
* Use cases: coordinates, key-value pairs, structured returns
* Demo to play with and see outputs


## What Is a Tuple?

A **tuple** is a special type of array in TypeScript where:

* The **number of elements is fixed**
* The **types of each element are known**

> Think of a tuple as a **labeled box**: each slot has its place and purpose.


### Tuple vs Array

| Feature              | Tuple (`[string, number]`) | Array (`string[]`)      |
| -------------------- | -------------------------- | ----------------------- |
| Fixed Length         | Yes                      | No                    |
| Known Types by Index | Yes                      | No (all must be same) |
| Readable Structure   | High                     | Lower in some cases  |


## Basic Tuple Example

```ts
type PersonTuple = [string, number];

const person: PersonTuple = ["Alice", 25];
// person = [25, "Alice"]; Error: wrong order/types
```

> The tuple guarantees that `person[0]` is a `string`, and `person[1]` is a `number`.


## Practical Use Cases

### 1. Coordinates

```ts
type Point = [number, number];

const start: Point = [0, 0];
const end: Point = [5, 10];
```

### 2. Key-Value Pairs

```ts
type KeyValue = [string, number];

const entry: KeyValue = ["score", 100];
```

### 3. Function Return Values

```ts
function splitName(fullName: string): [string, string] {
  const [first, last] = fullName.split(" ");
  return [first, last];
}

const [firstName, lastName] = splitName("Ada Lovelace");
```


## Full Code Demo – Play With Tuples

Copy this into the [` TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/) and run it to see the output.

```ts
// 1. Defining a tuple for a person
type Person = [string, number];

const user: Person = ["Jean", 22];
console.log(`Name: ${user[0]}, Age: ${user[1]}`);

// 2. A function returning a tuple
function getStatus(code: number): [string, boolean] {
  if (code === 200) return ["OK", true];
  return ["Error", false];
}

const [message, success] = getStatus(200);
console.log(`Status: ${message} (${success ? "Success" : "Fail"})`);

// 3. Key-value pair tuple
type KeyValue = [string, number];
const item: KeyValue = ["points", 88];
console.log(`${item[0]}: ${item[1]}`);

// 4. Coordinate system
type Coordinates = [number, number];
const position: Coordinates = [12.5, 7.8];
console.log(`📍 Location: X=${position[0]}, Y=${position[1]}`);
```

[`Open in TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/)


## Notes on Tuple Safety

**Accessing by index gives precise types**:

```ts
const result: [string, number] = ["pass", 100];
const label = result[0]; // string
const score = result[1]; // number
```

**Too many or mismatched types throw errors**:

```ts
const wrong: [string, number] = ["label", "not a number"]; // Error
```


## Summary Table

| Concept            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `[string, number]` | A tuple of 2 items: first is a string, second is a number |
| Fixed Length       | Tuples can’t grow or shrink unless explicitly typed to    |
| Named Elements     | No, but you can destructure them into named variables     |
| Use Case           | Return values, structured arrays, position pairs, etc.    |


##  Want to Try More?

Try building:

* A tuple of `[string, number, boolean]` for tracking a student's name, score, and pass/fail
* A function that returns two values (like `[value, error]`)
* Arrays of tuples: `const leaderboard: [string, number][]`




## 1. Tuple for Student Status: `[string, number, boolean]`

This tuple tracks:

* `string`: the student’s name
* `number`: their score
* `boolean`: whether they passed

```ts
type StudentStatus = [string, number, boolean];

const student: StudentStatus = ["Jean", 82, true];

console.log(`Name: ${student[0]}`);
console.log(`Score: ${student[1]}`);
console.log(`Passed: ${student[2] ? "Yes" : "No"}`);
```

### Output:

```
Name: Jean
Score: 82
Passed: Yes
```


## 2. Function That Returns `[value, error]`

This pattern is inspired by Go or Rust — return a value and an error as a tuple.

```ts
function parseScore(input: string): [number, string?] {
  const num = Number(input);
  if (isNaN(num)) {
    return [0, "Invalid score"];
  }
  return [num];
}

const [score1, error1] = parseScore("85");
const [score2, error2] = parseScore("oops");

console.log(`Parsed: ${score1}, Error: ${error1 ?? "None"}`);
console.log(`Parsed: ${score2}, Error: ${error2 ?? "None"}`);
```

### Output:

```
Parsed: 85, Error: None
Parsed: 0, Error: Invalid score
```


## 3. Arrays of Tuples: `const leaderboard: [string, number][]`

Each tuple in the array represents a user and their score.

```ts
const leaderboard: [string, number][] = [
  ["Alice", 95],
  ["Bob", 88],
  ["Jean", 82],
];

console.log("Leaderboard:");
for (const [name, score] of leaderboard) {
  console.log(`${name} — ${score} pts`);
}
```

### Output:

```
Leaderboard:
Alice — 95 pts
Bob — 88 pts
Jean — 82 pts
```


## All In One 

Paste the following in the [`TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/):

```ts
// 1. Student Status Tuple
type StudentStatus = [string, number, boolean];
const student: StudentStatus = ["Jean", 82, true];
console.log("Name:", student[0]);
console.log("Score:", student[1]);
console.log("Passed:", student[2] ? "Yes" : "No");

// 2. Value + Error Function Tuple
function parseScore(input: string): [number, string?] {
  const num = Number(input);
  if (isNaN(num)) {
    return [0, "Invalid score"];
  }
  return [num];
}

const [score1, error1] = parseScore("85");
const [score2, error2] = parseScore("oops");

console.log("Parsed:", score1, "Error:", error1 ?? "None");
console.log("Parsed:", score2, "Error:", error2 ?? "None");

// 3. Array of Tuples – Leaderboard
const leaderboard: [string, number][] = [
  ["Alice", 95],
  ["Bob", 88],
  ["Jean", 82],
];

console.log("Leaderboard:");
for (const [name, score] of leaderboard) {
  console.log(`${name} — ${score} pts`);
}
```

[`Open in TypeScript Playground`](https://www.programiz.com/typescript/online-compiler/)
