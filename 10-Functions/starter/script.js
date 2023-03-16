'use strict';

// ###### Default Parameters ######
console.log('##### Default Parameters ######');

const bookings = [];
const createBooking = function (
  flightNum,
  passengers = 1,
  price = passengers * 500
) {
  const booking = {
    flightNum,
    passengers,
    price,
  };
  bookings.push(booking);
  console.log(
    `Booking for ${passengers} passengers for flight num ${flightNum} at ${price} is confirmed `
  );
};

createBooking('IN123');
createBooking('IN123', 2, 100);
createBooking('IN123', 5);

// ##### Passing Arguments - Values v/s References #####
console.log('');
console.log('##### Passing Arguments - Values v/s References #####');

/**
 * - Passing a primitive type as an argument in function is like passing a copy => changes made in copy will not change original
 * - Passing an object as argument in function is like passing a reference => changes made in copy will change original
 * - JS only passes by value never by reference though it may look passing by reference
 */

const personVal = 'Peter Griffin';
const personObj = {
  name: 'Peter Griffin',
};
const printPerson = function (value, obj) {
  value = 'Stewie';
  obj.name = 'Brian Griffin';
};
console.log('Arguments values before func call = ', personVal, personObj);
printPerson(personVal, personObj);
console.log('Arguments values after func call = ', personVal, personObj);

// ###### Higher order functions ######
console.log('');
console.log('###### Higher Order Functions ######');

/**
 * HFC is a function that accepts function as a parameter and can also return a function
 */

const processIpFunc = function (str, func) {
  console.log(`Before Processing = `, str);
  return func(str);
};

const convertLowerToUpper = function (str) {
  return console.log(`After Processing = `, str.toUpperCase());
};

processIpFunc('family guy show', convertLowerToUpper);

// ###### Functions returning functions ######
console.log('');
console.log('###### Functions returning functions ######');

/**
 * Function call returns a value => if function return a function then we can call the received result
 */

const greetMe = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetIndividual = greetMe('Good Morning');
greetIndividual('Peter Griffin');

greetMe('Good Evening')('Stewie');

// Arrow function returning function
const greetMeArrow = greeting => name => console.log(`${greeting} ${name}`);

greetMeArrow('hello')('Brian');
