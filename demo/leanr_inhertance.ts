class Person {
  protected title: string;

  constructor(public name: string) {
    this.title = "Mr./Ms.";
  }

  getFormalName(): string {
    return `${this.title} ${this.name}`;
  }
}


class Greeter extends Person {
  constructor(name: string) {
    super(name); // Call the parent constructor
  }

  greet(): string {
    return `Hello, ${this.getFormalName()}!`;
  }
}


class PersonalizedGreeter extends Greeter {
  constructor(name: string, private nickname?: string) {
    super(name);
  }

  greet(): string {
    if (!this.nickname) return super.greet();
    return `Hey ${this.nickname}! Nice to see you.`;
  }
}


class TimedGreeter extends PersonalizedGreeter {
  constructor(name: string, nickname?: string) {
    super(name, nickname);
  }

  greet(): string {
    const hour = new Date().getHours();

    let greetingPrefix = "";
    if (hour < 12) {
      greetingPrefix = "Good morning";
    } else if (hour < 18) {
      greetingPrefix = "Good afternoon";
    } else {
      greetingPrefix = "Good evening";
    }

    return `${greetingPrefix}, ${super.greet()}`;
  }
}



const basic = new Greeter("Jean");
console.log(basic.greet()); // Hello, Mr./Ms. Jean!

const personalized = new PersonalizedGreeter("Jean", "JD");
console.log(personalized.greet()); // Hey JD! Nice to see you.

const noNickname = new PersonalizedGreeter("Jean");
console.log(noNickname.greet()); // Hello, Mr./Ms. Jean!

const timed = new TimedGreeter("Jean", "JD");
console.log(timed.greet());
// Might log: "Good evening, Hey JD! Nice to see you."
