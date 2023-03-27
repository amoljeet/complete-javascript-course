'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const dayTransc = `${date.getDate()}`.padStart(2, '0');
    const monthTransc = `${date.getMonth() + 1}`.padStart(2, '0');
    const yearTransc = `${date.getFullYear()}`.padStart(2, '0');
    const displayDate = `${dayTransc}/${monthTransc}/${yearTransc}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// Fake always logged in

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date and time
    const presentDate = new Date();
    const presentDay = `${presentDate.getDate()}`.padStart(2, '0');
    const presentMonth = `${presentDate.getMonth() + 1}`.padStart(2, '0');
    const presentYear = presentDate.getFullYear();
    const presentHour = `${presentDate.getHours()}`.padStart(2, '0');
    const presentMins = `${presentDate.getMinutes()}`.padStart(2, '0');
    labelDate.textContent = `${presentDay}/${presentMonth}/${presentYear}, ${presentHour}:${presentMins}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/**
 * In js all numbers are represented internally as floating point numbers
 *
 * We cannot do precise scientific calculations
 */

console.log('0.1 + 0.2 = ', 0.1 + 0.2);
console.log('Is 0.1 + 0.2 === 0.3 in JS ?', 0.1 + 0.2 === 0.3);

// conversion
console.log('String 23 to Number = ', Number('23'));
console.log('+ performs type coercion & changes to Num', +'23');

/**
 * parsing
 *
 * parseInt takes second args which is radix (base in mathematical number system)
 */

console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e23'));
console.log(Number.parseInt('50px', 10));

console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5'));

// check if value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));

// checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

/**
 * Math and rounding
 */

console.log('');
console.log('##### Math and rounding #####');

console.log('Square root of 25 = ', Math.sqrt(25));
console.log('Exponential value = ', 5 ** 3);

console.log('Max value = ', Math.max(5, 17, 44, 67, 2));
console.log('Max value with type coercion = ', Math.max(5, 17, 44, '67', 2));
console.log('Min value = ', Math.min(5, 17, 44, 67, 2));
console.log('Area of circle = ', Math.PI * Number.parseFloat('10px') ** 2);

console.log('Random value from 1 & 6 = ', Math.trunc(Math.random() * 6) + 1);

// rounding integers
console.log('Round off 23.3 = ', Math.round(23.3));
console.log('Round off 23.9 = ', Math.round(23.9));

console.log('Ceil 23.3 = ', Math.ceil(23.3));
console.log('Ceil 23.9 = ', Math.ceil(23.9));

console.log('Floor 23.3 = ', Math.floor(23.3));
console.log('Floor 23.9 = ', Math.floor(23.9));
console.log('Floor 23.9 type coercion = ', Math.floor('23.9'));
console.log('Floor -ive -23.3 = ', Math.floor(-23.3));
console.log('Trunc 23.3 = ', Math.trunc(-23.3));

// rounding decimals
console.log('to fixed return string = ', (2.7).toFixed(0));
console.log('round decimal = ', (2.7).toFixed(3));
console.log('round decimal string format = ', (2.345).toFixed(2));
console.log('round decimal number format = ', +(2.345).toFixed(2));

/**
 * Remainder operator
 */

console.log('');
console.log('##### Remainder Operator #####');

console.log('Remainder 5 divided by 2 = ', 5 % 2);
console.log('Result 5 divided by 2 = ', 5 / 2);

/**
 * Numeric Separators
 */

console.log('');
console.log('##### Numeric Separators #####');

const numericSepNum = 1_00_00_000;
console.log('Number as it is = ', numericSepNum);

/**
 * BigInt
 *
 * can store large numbers
 */

console.log('');
console.log('##### BigInt #####');

console.log('Biggest number JS can represent = ', 2 ** 53 - 1);
console.log('Max safe integer = ', Number.MAX_SAFE_INTEGER);

console.log('Big int = ', 42348567324856832434123535342341234653245n);
console.log('Big Int = ', BigInt(4234856734653245));

// exceptions
console.log('Strict equality = ', 20n === 20);
console.log('Loose equality = ', 20n == 20);
console.log(typeof 20n);

// Divisions
console.log('Divison bigInt = ', 10n / 3n);
console.log('division = ', 10 / 3);

/**
 * Dates
 */

console.log('');
console.log('##### Date #####');

const now = new Date();
console.log('Now = ', now);
