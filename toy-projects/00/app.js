// forEach
const numbers = [1, 2, 3, 4];

numbers.forEach((number) => {
  console.log(number * 2);
});

numbers.forEach((number, index) => {
  console.log(`${number * 2} index : ${index}`);
});

numbers.forEach((number, index, array) => {
  console.log(`${number * 2} index : ${index} array : ${array}`);
});

// map
const arr = [1, 2, 3, 4];
const tr = arr.map((number) => {
  return number * 3;
});
// const tr = arr.map((number) => number * 3);
console.log(tr);

const users = [
  { name: "Neo", age: "30" },
  { name: "Anderson", age: "31" },
];

const names = users.map((user) => user.name);
console.log(names);

console.log("--배열--");
// 1-1. indexOf
const arr2 = [1, 2, 3, 2, 5];
console.log(arr2.indexOf(2));
console.log(arr2.indexOf(4));

// 1-2. lastIndexOf
console.log(arr2.lastIndexOf(2));
console.log(arr2.lastIndexOf(4));

// 1-3. find
const arr3 = [1, 2, 3, 4, 5];
const find = arr3.find((element) => element > 3);
console.log(find); // 4

// 1-4. findIndex
const findIndex = arr3.findIndex((element) => element > 3);
console.log(findIndex); // 3

console.log("--문자열--");

const str = "Hello world";
// 2-1. startsWith()
console.log(str.startsWith("Hello"));
console.log(str.startsWith("world"));
console.log(str.startsWith("world", 6));

// 2-2. endsWith()
console.log(str.endsWith("world"));
console.log(str.endsWith("Hello"));
console.log(str.endsWith("Hello", 5));

// 2-3. includes()
console.log(str.includes("Hello"));
console.log(str.includes("world"));
console.log(str.includes("bye"));

console.log("--기타--");

const number2 = [1, 2, 3, 4, 5];
const hasEven = number2.some(num => num % 2 === 0);
console.log(hasEven);

const hasEven2 = number2.some(num => num > 10);
console.log(hasEven2);

const allEven = number2.every(num => num % 2 === 0);
console.log(allEven);