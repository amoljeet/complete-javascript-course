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

// Display deposit withdrawal
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate Display balance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
};

// Calculate display message
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}£`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}£`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}£`;
};

// Create Username for each account
const createUserName = function (userAccounts) {
  userAccounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin == Number(inputLoginPin.value)) {
    // display UI
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // display movements
    displayMovements(currentAccount.movements);

    // displace balance
    calcDisplayBalance(currentAccount.movements);

    // display summary
    calcDisplaySummary(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
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

/**
 * Looping arrays - forEach
 *
 * forEach is a higher order function that requires callback function to tell what to do
 *
 * we use callback function to tell higher order function what to do
 *
 * in each iteration it will call the callback function with array element as parameter
 *
 * continue and break doesnt work on forEach
 */
console.log('');
console.log('##### forEach #####');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function (movement, index, arrayItself) {
  if (movement > 1000) {
    console.log(`${movement} at ${index} position in ${arrayItself}`);
  }
});

/**
 * forEach with Maps and sets
 */

console.log('');
console.log('##### forEach with maps and sets #####');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log('currencies map = ', currencies);

// Map
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// Set
const currenciesSet = new Set(['USD', 'EUR', 'GBP', 'USD', 'USD', 'EUR']);
console.log('Set currency = ', currenciesSet);

currenciesSet.forEach((value, key, map) => {
  console.log(`${key} : ${value}`);
});

/**
 * Map method
 *
 * another way to loop over an array but this method will return a brand new array, this new array in each position will contain the result of callback function applied on each element
 */

console.log('');
console.log('##### Map Method #####');

const eurToUsd = 1.1;

const movementsUsd = movements.map(function (move) {
  return move * eurToUsd;
});

console.log('Movements in Euro = ', movements);
console.log('Movements in US Dollar = ', movementsUsd);

/**
 * Multiple Params Map method
 *
 * In forEach method we were printing everything in console with each iteration which is a side effect
 *
 * in Map method we are creating a brand new array
 */

const movementsDesc = movements.map((move, index) => {
  return `Movement ${index + 1} you ${
    move > 0 ? 'deposited' : 'withdraw'
  } ${Math.abs(move)}`;
});
console.log('Movements Desc = ', movementsDesc);

/**
 * Filter Method
 *
 * returns boolean => that element is returned for which boolean is true
 */

console.log('');
console.log('##### Filter Method #####');

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log('Original movements = ', movements);
console.log('Deposits = ', deposits);

/**
 * Reduce Method
 *
 * reduce all the elements of an array into one single value
 *
 * reduce method has 2 params => one callback function and other initial value of accumulator
 *
 * 1st param of callback is accumulator which keeps accumulating the value in each iteration
 */

console.log('');
console.log('##### Reduce Method #####');

console.log('Original Movements arr = ', movements);

const balance = movements.reduce(function (
  accumulator,
  currentVal,
  index,
  arrItself
) {
  return accumulator + currentVal;
},
0);

console.log('Balance = ', balance);

// Maximum value
const maxValRed = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log('Largest value in movements = ', maxValRed);

/**
 * Chaining Methods
 *
 * We can only chain method after another one if first one returns an array
 */

const arrayOfNumsChain = [1, 5, 7, -2, 44, -33, 56, 23, 77, -99];
const chainResult = arrayOfNumsChain
  .filter(num => num > 0)
  .map(num => num * 2)
  .reduce((acc, num) => acc + num, 0);
console.log('Chaining result ', chainResult);

/**
 * Find Method
 *
 * It will not return new array but first element that satisfies the condition
 *
 * filter method returns all the elements that returns the condition while find method returns the first element that match the condition
 */

const peterCharac = {
  name: 'Peter Griffin',
  character: 'Family guy',
  occupation: 'Pawtucket brewery',
};
const brianCharac = {
  name: 'Brian Griffin',
  character: 'Dog',
  occupation: 'Pet',
};
const stewieCharac = {
  name: 'Stewie griffin',
  character: 'Toddler',
  occupation: 'child',
};
const familyFuyCharactersFind = [peterCharac, brianCharac, stewieCharac];
const characterFound = familyFuyCharactersFind.find(
  character => character.name === 'Stewie griffin'
);
console.log('Character found = ', characterFound);
