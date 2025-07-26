declare global {
  interface String {
    customPadStart(targetLength: number, padString?: string): string;
  }
}

String.prototype.customPadStart = function (  targetLength: number,  padString: string = " "): string {
  const str = String(this);
  const needed = targetLength - str.length;

  if (needed <= 0) return str;

  let repeated = "";
  while (repeated.length < needed) {
    repeated += padString;
  }

  return repeated.slice(0, needed) + str;
};

console.log("7".customPadStart(3, "0")); // "7" → needs to be length 3 → pad with "0" → Output: "007"

console.log("Mucyo".customPadStart(10, "-")); // "Mucyo" is 5 chars → needs 5 more → pad with "-" → Output: "-----Mucyo"

console.log("42".customPadStart(5)); // No pad string passed → default is " " (space) → Output: "   42"


export {}; 
// Explanation:
// Required in TypeScript to make this file a "module"
// Otherwise `declare global` won't work correctly in TypeScript context
