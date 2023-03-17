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

// ###### Call and Apply Methods ######
console.log('');
console.log('###### Call and Apply Methods ######');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  bookFlight(flightNum, name) {
    console.log(
      `${name} your seat booked on ${this.airline} in ${flightNum} ${this.iataCode}`
    );

    this.bookings.push({ flight: `${this.iataCode} ${this.airline}`, name });
  },
};

lufthansa.bookFlight('123', 'Peter Griffine');
lufthansa.bookFlight('456', 'Stewie');

const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call Method

/**
 * A function is just an object and objects have methods so functions can have methods too, call is one such method
 *
 * JS has 1st class functions and we can store that inside another variable
 */

const bookAnyAirlineFlight = lufthansa.bookFlight;

bookAnyAirlineFlight.call(euroWings, '789', 'Brian Griffin');
console.log(euroWings);

const swissAirlines = {
  airline: 'Swiss Airline',
  iataCode: 'LX',
  bookings: [],
};

bookAnyAirlineFlight.call(swissAirlines, '357', 'Chris Griffin');
console.log(swissAirlines);

// Apply Method
const flightDataApply = ['274', 'Joe Swanson'];
bookAnyAirlineFlight.apply(swissAirlines, flightDataApply);
console.log(swissAirlines);
