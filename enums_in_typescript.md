
## **TypeScript Enums: Pro-Level Cheat Sheet**

This cheat sheet provides a comprehensive overview of TypeScript enums, from basic usage to advanced patterns and common anti-patterns. Use it as a reference and a starting point for your projects.

```typescript
// ========================
// 1. BASIC ENUM DEFINITIONS
// ========================

/**
 * 1.1 Standard Numeric Enum (Auto-incrementing)
 * - Starts at 0 by default.
 * - Generates a runtime JavaScript object.
 * - Supports reverse mapping (e.g., LogLevel[0] -> "Error")
 */
enum LogLevel {
  Error,   // 0
  Warn,    // 1
  Info,    // 2
  Debug,   // 3
}

/**
 * 1.2 Numeric Enum with Custom Initializers
 * - Auto-increment continues from the last defined value.
 */
enum HttpStatus {
  OK = 200,
  Created = 201,
  Accepted = 202,
  BadRequest = 400,
  Unauthorized, // 401
  Forbidden,    // 402
}

/**
 * 1.3 String Enum
 * - MUST be initialized with a string literal.
 * - No auto-increment behavior.
 * - NO reverse mapping (HttpMethod["GET"] is invalid at runtime).
 * - Preferred for serialization and readability.
 */
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * 1.4 Const Enum
 * - Does NOT generate a runtime object.
 * - Values are inlined for performance.
 * - Reverse mapping is impossible.
 * - Use for maximum performance in front-end apps.
 */
const enum Priority {
  Low,    // Inlines to 0
  Medium, // Inlines to 1
  High,   // Inlines to 2
}
// Compiles to: let taskPriority = 2;
let taskPriority = Priority.High;

/**
 * 1.5 Heterogeneous Enum (AVOID THIS)
 * - Mixing number and string is allowed but highly discouraged.
 * - Creates confusing and unpredictable code.
 */
enum WeirdEnum {
  A = 1,
  B = "B",
  C = 2, // If you set this after a string, you MUST initialize it.
}

// ========================
// 2. ACCESS PATTERNS
// ========================

// Standard value access
let method: HttpMethod = HttpMethod.POST;

// Reverse mapping (Numeric enums only!)
let statusCode = 200;
let statusName = HttpStatus[statusCode]; // "OK"
console.log(HttpStatus[HttpStatus.OK]); // "OK"

// ========================
// 3. ADVANCED PATTERNS
// ========================

/**
 * 3.1 Enum with Namespace for Static Methods
 * - Use a namespace with the same name to add functionality.
 * - Keeps related logic bundled with the data structure.
 */
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

// Merge namespace with the enum
namespace UserRole {
  export function hasEditPermissions(role: UserRole): boolean {
    // Use the enum values in logic
    return role === UserRole.Admin || role === UserRole.Editor;
  }
  export function getAllRoles(): UserRole[] {
    // Use type assertion if needed. Note: this relies on runtime object existence.
    return Object.values(UserRole).filter((v): v is UserRole => typeof v === 'string');
  }
}

// Usage of the namespace methods
const canEdit: boolean = UserRole.hasEditPermissions(UserRole.Admin);
const allRoles: UserRole[] = UserRole.getAllRoles();

/**
 * 3.2 Using Enums as Object Keys
 * - Enums can be used to define restricted sets of keys.
 */
enum AppTheme {
  Light = "light-theme",
  Dark = "dark-theme",
  System = "system-theme",
}

// A configuration object that must have all theme keys
type ThemeConfig = {
  [key in AppTheme]: { primaryColor: string };
};

const themeConfig: ThemeConfig = {
  [AppTheme.Light]: { primaryColor: "#ffffff" },
  [AppTheme.Dark]: { primaryColor: "#000000" },
  [AppTheme.System]: { primaryColor: "#888888" },
  // Error: if you miss a key, TypeScript will complain.
};

// ========================
// 4. RUNTIME ITERATION & TYPE-SAFETY
// ========================

/**
 * 4.1 Iterating over Enum Keys/Values
 * - Be cautious: numeric enums have reverse mapping keys.
 */
function logAllStringEnumValues(enumType: any) {
  // Best method for string enums: get all values
  for (const value in enumType) {
    if (typeof enumType[value] === 'string') {
      console.log(enumType[value]);
    }
  }
}
logAllStringEnumValues(HttpMethod); // "GET", "POST", "PUT", "DELETE"

/**
 * 4.2 Type-Safe Enum Validation (from a string)
 * - A common pattern when receiving data from an API.
 */
function isHttpMethod(method: string): method is HttpMethod {
  return Object.values(HttpMethod).includes(method as HttpMethod);
}

const incomingData = "PATCH";
if (isHttpMethod(incomingData)) {
  // TypeScript now knows 'incomingData' is of type HttpMethod
  const validMethod: HttpMethod = incomingData;
} else {
  console.error("Invalid method received:", incomingData);
}

// ========================
// 5. PITFALLS & GOTCHAS (WHAT TO AVOID)
// ========================

/**
 * 5.1 Pitfall: Accidental Numeric Operations
 * - Numeric enums are… numbers. You can do math on them, which is usually a bug.
 */
let myLogLevel: LogLevel = LogLevel.Error;
myLogLevel += 1; // This is LogLevel.Warn, but it's a horrible practice.
// SOLUTION: Prefer string enums to avoid this entirely.

/**
 * 5.2 Pitfall: Const Enum in Ambiguous Contexts
 * - Const enums are erased and cannot be used in places that need a runtime value.
 */
// This will cause an error if 'Priority' is a const enum and this file
// is treated as a module. Const enums are only safe in isolated compilation.
// console.log(Priority.Low); // Inlines fine.
// console.log(Priority[0]); // ERROR: Cannot access reverse mapping.

/**
 * 5.3 Pitfall: Assuming String Enum Runtime Object Structure
 */
// HttpMethod runtime object looks like: { GET: "GET", POST: "POST", ... }
// You cannot get a list of keys easily without filtering out the reverse map.
// Always use a helper function like the one in the namespace example.

// ========================
// 6. MODERN ALTERNATIVES (Know Your Options)
// ========================

/**
 * 6.1 Union Types + Const Objects
 * - Provides similar type-safety with less runtime overhead.
 * - No reverse mapping, but often not needed.
 */
const LOG_LEVEL = {
  Error: 0,
  Warn: 1,
  Info: 2,
  Debug: 3,
} as const; // 'as const' makes properties readonly

type LogLevelType = keyof typeof LOG_LEVEL; // "Error" | "Warn" | "Info" | "Debug"
type LogLevelValue = typeof LOG_LEVEL[LogLevelType]; // 0 | 1 | 2 | 3

// This pattern is often preferred for its simplicity and control.

// ========================
// SUMMARY & RECOMMENDATIONS
// ========================

/*
| Use Case                               | Recommended Approach        |
|----------------------------------------|-----------------------------|
| API communication, logging, readability| String Enum                 |
| Simple flags, internal state          | Numeric Enum (if needed)    |
| Extreme performance (UI frameworks)   | Const Enum                  |
| Maximum control, no runtime overhead  | Union Type + Const Object   |
| Adding methods/helpers                | Enum + Namespace merger     |

* AVOID: Heterogeneous enums. Just don't.
*/

export {}; // Make this file a module to avoid scope issues.
```
