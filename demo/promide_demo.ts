// create a  promise that resolve with hello world after 5 seconds

const createPromise = new Promise<string>(
    (resolve) => {
      setTimeout(() => {
      resolve("Hello, World");
      }, 5000);
   }
);

createPromise.then((message) => console.log(message));
