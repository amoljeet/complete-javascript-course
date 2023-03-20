'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/**
 * Methods are simply functions that we can call on objects
 *
 * These are functions attached to objects
 *
 * if we have array methods that means arrays themselves are also objects, array methods are simply functions that are attached to all arrays we create in JS
 */

console.log('##### Simple Array Methods #####');

/**
 * Slice Method
 *
 * we can extract part of array without changing original array
 *
 * we have begin parameter => from where to start extracting
 *
 * return new array
 */

let simpleArray = ['a', 'b', 'c', 'd', 'e'];
console.log('slice only begin param = ', simpleArray.slice(2));
console.log('slice begin and end param = ', simpleArray.slice(2, 4));
console.log('-ive parameter to get last elements = ', simpleArray.slice(-2));
console.log('Extrace from index 1 except last 2', simpleArray.slice(1, -2));
console.log('Shallow copy of array = ', simpleArray.slice());

/**
 * Splice Method
 *
 * Works similar to slice method but changes the original array
 *
 * 1st param = starting index
 * 2nd param = no of elements to be removed (diff from slice)
 */

console.log('Last element removed permanently = ', simpleArray.splice(-1));
console.log('Original array = ', simpleArray);
console.log('2 removed elements = ', simpleArray.splice(1, 2));

/**
 * Reverse Method
 *
 * Mutates the original Array
 */

simpleArray = ['a', 'b', 'c', 'd', 'e'];
console.log('Reverse of an array = ', simpleArray.reverse());
console.log('Original array mutated = ', simpleArray);

simpleArray = ['a', 'b', 'c', 'd', 'e'];
const anotherArray = ['f', 'g', 'h', 'i'];

/**
 * Concat method
 *
 * doesn't mutate original array
 *
 */

const letters = simpleArray.concat(anotherArray);
console.log('Array after concatenation = ', letters);
console.log('All elements = ', [...simpleArray, ...anotherArray]);

/**
 * Join method
 *
 * Returns string
 */

console.log('Join method = ', letters.join(' - '));

// ##### At method #####
console.log('');
console.log('##### At method #####');

const atArray = [1, 2, 3, 4, 5];
console.log('1st element of array = ', atArray[0]);
console.log('1st element of array = ', atArray.at(0));
console.log('Last element = ', atArray.at(-1));
