### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? 

- What is a Promise? A promise is a guarantee for a future value.

- What are the differences between an async function and a regular function? A regular function is executed synchronously line by line while an asynchronous function returns a promise (a guarantee for a future value) once this promise is resolved or rejected, the rest of the function continues.

- What is the difference between Node.js and Express.js? Node.js is a JavaScript environment used to write server-side JavaScript while Express.js is a web framework the helps a developer build a web application to handle HTTP requests.

- What is the error-first callback pattern? The callback functions first parameter is an error. Node supplies an error object (if something happens), otherwise null is the argument.

- What is middleware? It is code that runs in the middle of the request/response cycle.

- What does the `next` function do? If arguments are passed to next, Express always treats this as an error. Otherwise, it matches the route to the next matching callback function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc) Each request for each variable is requested sequentially. So each one has to wait for the promise of the variable prior to be resolved before it can get its value even though the promises are independent of each other. This will slow execution. The developer should redo the variables as such: const eliePromise = $.getJson('https://api.github.com/users/elie'); and then const elie = await eliePromise; or use Promise.all on all the promises needed for this function.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
