# TypeScript Visibility Modifiers

## Understanding Member Visibility in TypeScript Classes

When designing classes in TypeScript, controlling access to members (properties and methods) is crucial for creating robust and maintainable code. TypeScript provides three visibility modifiers that determine where class members can be accessed:

1. `public` - Accessible anywhere (default if no modifier is specified)
2. `protected` - Accessible within the class and its subclasses
3. `private` - Accessible only within the class itself

## Public Visibility: The Default Choice

```typescript
class Speaker {
    // No modifier needed - public by default
    speak() {
        console.log("Hello!");
    }
    
    // Explicit public (optional)
    public greet() {
        console.log("Welcome!");
    }
}

const speaker = new Speaker();
speaker.speak();  // "Hello!"
speaker.greet();  // "Welcome!"
```

**Key points:**
- `public` is the default modifier
- Explicitly writing `public` is optional but can improve readability
- Public members form your class's API - what consumers of your class can use

## Protected Visibility: Sharing with Family

Protected members are accessible within the class and any subclasses, but not from outside the class hierarchy.

```typescript
class Person {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public introduce() {
        console.log(`Hello, I'm ${this.name}`);
    }
}

class Employee extends Person {
    private department: string;
    
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    
    public workIntroduction() {
        // Can access protected member from parent
        console.log(`Hi, I'm ${this.name} from ${this.department}`);
    }
}

const emp = new Employee("Sarah", "Engineering");
emp.introduce();         // "Hello, I'm Sarah"
emp.workIntroduction();  // "Hi, I'm Sarah from Engineering"
// emp.name; // Error: Property 'name' is protected
```

**Important nuances:**
1. **Subclass Exposure**: A derived class can make a protected member public
   ```typescript
   class Base {
       protected secret = 123;
   }
   
   class Derived extends Base {
       // Now making it public
       public secret = 456;
   }
   ```
   
2. **Cross-Hierarchy Access**: TypeScript follows C#/C++ rules
   ```typescript
   class Animal {
       protected age: number;
   }
   
   class Dog extends Animal {
       compareAge(other: Animal) {
           // Error in TypeScript (allowed in Java)
           return this.age === other.age;
       }
   }
   ```

## Private Visibility: Strict Encapsulation

Private members are only accessible within the class they're declared in.

```typescript
class Safe {
    private secretCode: number;
    public displayCode: string;
    
    constructor(code: number) {
        this.secretCode = code;
        this.displayCode = `CODE-${code % 1000}`;
    }
    
    public verify(code: number): boolean {
        return code === this.secretCode;
    }
}

const safe = new Safe(12345);
console.log(safe.displayCode);  // "CODE-345"
console.log(safe.verify(12345)); // true
// console.log(safe.secretCode); // Error: Property 'secretCode' is private
```

**Key behaviors:**
1. **No Subclass Access**: Unlike protected, private members aren't visible to subclasses
   ```typescript
   class Base {
       private x = 10;
   }
   
   class Derived extends Base {
       showX() {
           console.log(this.x); // Error: Property 'x' is private
       }
   }
   ```

2. **Cross-Instance Access**: TypeScript allows same-class instances to access each other's privates
   ```typescript
   class Box {
       private content: string;
       
       constructor(content: string) {
           this.content = content;
       }
       
       equals(other: Box) {
           return this.content === other.content;
       }
   }
   ```

## Runtime Privacy Considerations

TypeScript's `private` is "soft privacy" - enforced only during type checking. For true runtime privacy, use JavaScript's `#` private fields (ES2022+):

```typescript
class SecureVault {
    #password: string;
    public identifier: string;
    
    constructor(password: string, id: string) {
        this.#password = password;
        this.identifier = id;
    }
    
    authenticate(attempt: string): boolean {
        return attempt === this.#password;
    }
}

const vault = new SecureVault("s3cr3t!", "user123");
console.log(vault.identifier);  // "user123"
// console.log(vault.#password); // Syntax error in JavaScript
```


## Static Members: Class-Level Visibility

Static members can also have visibility modifiers:

```typescript
class Configuration {
    private static instance: Configuration;
    public static readonly defaultName = "AppConfig";
    
    private constructor() {}
    
    public static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
}

const config = Configuration.getInstance();
console.log(Configuration.defaultName); // "AppConfig"
// console.log(Configuration.instance); // Error: Property 'instance' is private
```

## Practical Guidelines

1. **Default to private**: Start with the most restrictive visibility and widen as needed
2. **Use protected judiciously**: Only when you specifically want subclass access
3. **Consider composition**: Often better than protected members for code reuse
4. **For true privacy**: Use `#` fields when security is critical
5. **Document your public API**: Clearly indicate what's meant for external use

## Visibility in Class Hierarchies: Dos and Don'ts

**Do:**
```typescript
// Proper protected usage
class Animal {
    protected age: number;
    
    constructor(age: number) {
        this.age = age;
    }
}

class Dog extends Animal {
    public getAgeInDogYears() {
        return this.age * 7; // Valid protected access
    }
}
```

**Don't:**
```typescript
// Violating encapsulation
class Database {
    private credentials: string;
    
    constructor(creds: string) {
        this.credentials = creds;
    }
}

class UnsecureDatabase extends Database {
    public exposeCredentials() {
        return this.credentials; // Error: Can't access private member
    }
}
```

## Advanced Pattern: Protected Constructors

A useful pattern for base classes that should only be extended, not instantiated directly:

```typescript
abstract class Shape {
    protected constructor(public name: string) {}
    
    public abstract area(): number;
}

class Circle extends Shape {
    constructor(public radius: number) {
        super("Circle");
    }
    
    public area(): number {
        return Math.PI * this.radius ** 2;
    }
}

// const shape = new Shape("Generic"); // Error
const circle = new Circle(5);
console.log(circle.area()); // 78.5398...
```
These visibility rules helps you create TypeScript classes with proper encapsulation, leading to more maintainable and robust object-oriented code.