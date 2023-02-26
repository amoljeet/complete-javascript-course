'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  orderFood: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ######### Array Destructuring ##############
console.log('###### Array destructuing ######');

// Assign value to variables
const demoArray = [1, 2, 3, 4];
const [w, x, y, z] = demoArray;
console.log('variable values = ', w, x, y, z);

// Assign value of 1st two variables
const [first, second] = restaurant.categories;
console.log('1st & 2nd element = ', first, second);

// Assign value of specific elements of array
const [firstEl, , thirdEl] = restaurant.categories;
console.log('1st & 3rd element = ', firstEl, thirdEl);

// change value of variables with Array Destructuring
let [main, secondary] = restaurant.categories;
console.log('Main & Secondary meal = ', main, secondary);
[secondary, main] = [main, secondary];
console.log('Main & secondary meal after change = ', main, secondary);

// Receive two return value from function
const [starterMeal, mainMeal] = restaurant.orderFood(2, 1);
console.log('Food ordered = ', starterMeal, mainMeal);

// Nested destructuring
const nestedArr = [5, [1, 2, 3]];
const [d, [a, b, c]] = nestedArr;
console.log('Nested destructuring = ', d, a, b, c);

// Default values for elements instead of undefined
const [p = 1, q = 2, r = 3] = [4, 7];
console.log('Elements are = ', p, q, r);

// ############ Object Destructuring #############
console.log('');
console.log('##### Object destructuring #####');

// Assigning value with variable name same as object property
const { name, openingHours, categories } = restaurant;
console.log(
  'value of variables after destructuring = ',
  name,
  openingHours,
  categories
);

// Assigning value with different variable name
const {
  name: restName,
  openingHours: restHours,
  categories: restCategory,
} = restaurant;
console.log(
  'value with different variable name = ',
  restName,
  restHours,
  restCategory
);

// Setting default values
const { menuItem = 'default value', starterMenu: resStarters = [] } =
  restaurant;
console.log('values are = ', menuItem, resStarters);

// Mutating variables
let firstNum = 1;
let secondNum = 2;
const thirdObj = { firstNum: 12, secondNum: 14 };
({ firstNum, secondNum } = thirdObj);
console.log('Re-assignment = ', firstNum, secondNum);

// nested objects
const nestedObj = {
  a: {
    abc: 1,
    def: 2,
  },
};
const {
  a: { abc, def },
} = nestedObj;
console.log('value after nested dest = ', abc, def);

// passing object as a parameter (object destructuring)
// order of parameters wont matter as name is kept same
// we can also set default values of parameters in case no value passed
function orderFood({ place = 'NYC', starters, time = '1 AM', mainCourse }) {
  const result = `${starters} will come in starters & ${mainCourse} will come in main course, delivery at ${place} at ${time}`;
  console.log(result);
}

orderFood({
  starters: 'abc',
  mainCourse: 'def',
  place: 'xyz',
  time: '2 PM',
});

orderFood({
  starters: 'wer',
  mainCourse: 'fgh',
});

// ######## Spread Operator ########
console.log('');
console.log('####### Spread Operator ########');

// Spread operator
const arrayOfEvenNums = [2, 4, 6];
const newArray = [1, 3, ...arrayOfEvenNums];
console.log('new array = ', newArray);
console.log('elements of array = ', ...newArray);

/*
Note : 
  - Iterables = array,string,map,set but not objects
  - multiple values separted by a comma are only expected => when passing an argument in function or creating a new array
*/

// Spread string
const spreadStr = 'IRON';
const resultStrArr = [...spreadStr];
console.log(resultStrArr);

// Spread operator to pass args in function
function orderFood(starter, mainCourse, desert) {
  console.log(
    `I'll start with ${starter}, fill up with ${mainCourse} & finish with ${desert} `
  );
}

const orderByCustomer = ['Burger', 'Pizza', 'Ice-cream'];

orderFood(...orderByCustomer);

// Spread operator on object
const employee = {
  name: 'abc',
  place: 'def',
};
const newEmployee = { phone: 1234, ...employee };
console.log(newEmployee);

// creating copy of object with spread operator actual copy is created
const employeeCopy = { ...newEmployee };
employeeCopy.phone = 5890;

console.log('Phone of new employee = ', newEmployee.phone);
console.log('Phone of employee copy = ', employeeCopy.phone);

// ####### Rest Pattern and parameters #######
console.log('');
console.log('####### Rest Pattern & Parameters #######');

/*
Note :-
  - spread operator and rest pattern have same syntax
  - three dots on left of assignment operator ( = ) makes it rest pattern
  - three dots on right of assignment operator ( = ) makes it spread operator
  - rest element should be last element
  - there should be only 1 rest element in destructuring assignment
*/

// spread because on right side of =
const spreadArr = [1, 2, ...[4, 5, 6]];
console.log('Spread Array is = ', spreadArr);

// rest pattern because on left side of =
const [restFirstEl, restSecEl, ...restOtherEl] = [1, 2, 3, 4, 5];
console.log('Elements are = ', restFirstEl, restSecEl, restOtherEl);

// rest pattern for objects
const restOriginalObject = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
};

const { monday, ...restWeek } = restOriginalObject;
console.log('Object after rest operation = ', monday, restWeek);

// Rest parameters - Function
const restParamsFunc = function (...numbers) {
  // rest parameters received are in form of an array
  let sum = 0;
  numbers.forEach(number => {
    sum += number;
  });
  console.log(`I/P received is ${numbers} & sum is ${sum}`);
};
restParamsFunc(1, 2);
restParamsFunc(1, 2, 3, 4);
restParamsFunc(1, 2, 3, 4, 5, 6);

// Rest parameeters - Function
const restParamsFunc2 = function (num, ...nums) {
  console.log('First param = ', num);
  console.log('Second param = ', nums);
};
restParamsFunc2(10, 20, 30, 40);

// ####### Short Circuiting ##########
console.log('');
console.log('###### Short Circuiting #######');

/*
Note:-
  - Logical operators can use any data type and return any data type
  - short circuiting (OR) => if the 1st value is a truthy value it will immediately return that value
  - (AND) => And operator short circuits when the first value is falsy and immediately returns that falsy value without even evaluating the operand, if evaluation is truthy then last value is returned
 */

// OR operator
console.log('---- OR ----');
console.log(1 || 'ABC');
console.log('' || 'Hello');
console.log(true || 0);
console.log(undefined || null); // null is also falsy value
console.log(0 || '' || undefined || 'ABC' || null);

// AND operator
console.log('---- AND ----');
console.log(undefined && 'FALSE');
console.log(0 && 'HELLO');
console.log(7 && 'YO');
console.log(7 && 'YO' && true && null && 'HELLO');

// ####### Nullish Coalescing operator #######
console.log('');
console.log('##### Nullish Coalescaling operator #####');

/*
Nullish value = null and undefined values (not 0 or "")
 */

console.log(null ?? 'hello');
console.log(null ?? undefined ?? 0 ?? 'HELLO');
console.log(null ?? false ?? 'Hello');

// ##### Assignment Operator #####
console.log('');
console.log('##### Assignment operator #####');

// OR assignmemt operator
const restaurant1 = {
  name: 'ABC',
  numGuests: 14,
};

const restaurant2 = {
  name: 'DEF',
  owner: 'owner',
};

// restaurant1.numGuests = restaurant1.numGuests || 20;
// restaurant2.numGuests = restaurant2.numGuests || 25;

// another way or writing same thing

restaurant1.numGuests ||= 20;
restaurant2.numGuests ||= 25;

console.log('Restaurant 1 & 2 are = ', restaurant1, restaurant2);

/*
Note :- 
  - one issue with OR assignment operator is it will take 0 as falsy value even if it is perfectly fine w.r.t use case e.g. number of guests can be 0
  - to solve this we have we can use nullish assignment 
*/

// Nullish assignment operator (null or undefined)
const restaurant3 = {
  name: 'abc',
  numOfGuests: 0,
};

const restaurant4 = {
  name: 'def',
  owner: 'xyz',
};

restaurant3.numOfGuests ??= 14;
restaurant4.numOfGuests ??= 15;
console.log('Restaurant 3 & 4 = ', restaurant3, restaurant4);

// And assignment operator

// restaurant3.owner = restaurant3.owner && 'anonymous';
// restaurant4.owner = restaurant4.owner && 'anonymous';

restaurant3.owner &&= 'anonymous';
restaurant4.owner &&= 'anonymous';

console.log('Restaurant owners = ', restaurant3, restaurant4);

// ##### For Of Loop ######
console.log('');
console.log('###### for-of Loop ######');

// For-Of Loop
const arrayOfPersons = ['ABC', 'DEF', 'GHI'];
for (const person of arrayOfPersons) {
  console.log('Person = ', person);
}

//  Position of element also
for (const person of arrayOfPersons.entries()) {
  console.log('Person = ', person);
}

// destructuring in for-of loop
for (const [position, value] of arrayOfPersons.entries()) {
  console.log(`${position + 1} person is ${value}`);
}

// ####### Enhanced Object Literals #######
console.log('');
console.log('###### Enhanced Object Literals ######');

// writing object property
const daysObjLit = {
  mon: 'monday',
  tue: 'tuesday',
};

const daysObjLit2 = {
  wed: 'wednesday',
  thus: 'thursday',
};

const combinedDaysObj = {
  daysObjLit: daysObjLit,
  // ES6 enhanced object literals
  daysObjLit2,
};

console.log(combinedDaysObj);

// writing function
const functionObjLit = {
  addition: function (num1, num2) {
    console.log('Addition from inside Obj = ', num1 + num2);
  },

  // ES6 enhanced object literals
  subtraction(num1, num2) {
    console.log('Subtraction from inside Obj = ', num1 - num2);
  },
};

functionObjLit.addition(4, 2);
functionObjLit.subtraction(4, 2);

// computer property names (square bracket syntax to compute)
const daysOfWeek = ['Mon', 'Tue', 'Wed'];

const weekDaysObj = {
  [daysOfWeek[0]]: 'Monday',
  [daysOfWeek[1]]: 'Tuesday',
  [daysOfWeek[`${4 - 2}`]]: 'Wednesday',
};

console.log('Weekdays = ', weekDaysObj);

// ###### Optional chaining ######
console.log('');
console.log('###### Optional Chaining ######');

/**
 * In optional chaining if certain property doesnt exist undefined is returned immediately
 * If optional chaining not there an error is thrown over non existent property
 */

const daysOfWeekOpCh = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const weekOpCh = {
  mon: {
    open: '10 AM',
  },
  tue: {
    open: '1 PM',
  },
  fri: {
    open: '5 PM',
  },
};

for (const day of daysOfWeekOpCh) {
  const result = weekOpCh[day]?.open ?? 'Closed';
  console.log(`on ${day} we open at ${result}`);
}

// Optional chaining on methods
const methodsOpCh = {
  sum(num1, num2) {
    return num1 + num2;
  },
};

console.log(
  'Optional chaining func call = ',
  methodsOpCh.sum?.(2, 3) ?? 'Method doesnt exist'
);
console.log(
  'Optional chaining func call = ',
  methodsOpCh.diff?.(4, 2) ?? 'Method doesnt exist'
);

// Optional chaining on Arrays
const arrayOpCh = [{ name: 'ABC' }];
console.log(
  'first name of Array = ',
  arrayOpCh[0]?.name ?? 'User doesnt exist'
);
console.log(
  'second name of Array = ',
  arrayOpCh[1]?.name ?? 'user doesnt exist'
);

// ##### Looping Objects ######
console.log('');
console.log('###### Looping Objects ######');

// looping through object.keys
const daysOfWeekRestOpen = {
  mon: '11 AM',
  tue: '2 PM',
  fri: '5PM',
};

const daysRestOpen = Object.keys(daysOfWeekRestOpen);
let resultStr = `We are open ${daysRestOpen.length} on `;

for (const day of daysRestOpen) {
  resultStr += `${day}, `;
}
console.log(resultStr);

const monthsOfYear = {
  Jan: {
    open: '1 Jan',
    close: '26 Jan',
  },
  Jun: {
    open: '1 Jun',
    close: '21 Jun',
  },
};

// Object keys as array
const monthsArray = Object.keys(monthsOfYear);
console.log(monthsArray);

// Object values as array
const valueArray = Object.values(monthsOfYear);
console.log(valueArray);

// complete object as array
const entriesArray = Object.entries(monthsOfYear);
console.log(entriesArray);

// Looping though Object.entries
for (const [keyValue, { open, close }] of Object.entries(monthsOfYear)) {
  console.log(
    `In the month of ${keyValue} we open at ${open} & close at ${close}`
  );
}

// ###### Set ######
console.log('');
console.log('###### Set ######');

/**
 * - Set is a collection of unique values
 * - we need to pass iterable in set & most common iterable is an array
 * - order does not matter in set
 */

const characterFamilyGuy = new Set([
  'peter',
  'meg',
  'brian',
  'meg',
  'joe',
  'lois',
  'meg',
  'lois',
]);

console.log('Unique values of characters of family guy = ', characterFamilyGuy);

// Size of set
console.log('Size of set is = ', characterFamilyGuy.size);

// Find element in set
console.log('Is lois part of show = ', characterFamilyGuy.has('lois'));
console.log('Is phil part of show = ', characterFamilyGuy.has('phil'));

// add element in set
characterFamilyGuy.add('chris');
console.log('characters of show after addition = ', characterFamilyGuy);

// delete element in set
characterFamilyGuy.delete('joe');
console.log('characters after deletion = ', characterFamilyGuy);

// Iterate over sets
for (const character of characterFamilyGuy) {
  console.log('Charcter = ', character);
}

console.log('String is also iterable = ', new Set('Hello'));

// add values of set in array
const familyGuyCharac = [
  'peter',
  'lois',
  'brian',
  'peter',
  'lois',
  'chris',
  'meg',
  'brian',
  'stewie',
];

const familyGuySet = new Set(familyGuyCharac);
console.log('Family guy set = ', familyGuySet);

const familyGuyArr = [...familyGuySet];
console.log('Family guy array = ', familyGuyArr);
