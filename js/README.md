What is the difference between var, let, and const?

ans: 

var - can be redeclared and updated
let - can be updated but not redeclared.
const - cannot be redeclared or updated—value is constant.



2) What is the difference between map(), forEach(), and filter()?

ans: 

map- Returns a new array
foprEach()-Loops over an array ,not return .
filter- loop, and Returns a new array with only the items that pass a condition.



3) What are arrow functions in ES6?

ans:  const add = (a, b) => a + b; short and easy syntax from regular function 


4) How does destructuring assignment work in ES6?

ans: 

const numbers = [1, 2, 3];
const [a, b] = numbers;
console.log(a, b); 

// 1 2


5) Explain template literals in ES6. How are they different from string concatenation?


ans: 

// 
const msg = "My name is " + name + " and I am " + age + " years old.";

//
const name = "Hasan";
const age = 25;
const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);