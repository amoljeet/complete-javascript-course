'use strict';

/**
 * Constructor functions
 *
 * constructor function always start with Capital letter
 *
 * The diff b/w constructor function and normal function is we use new keyword to call constructor function
 *
 * Arrow function doesn't work as constructor function because it doesnt have this keyword
 *
 * convention = Property has same name as parameters
 *
 * Object created from class is called an instance
 *
 * never create methods inside constructor functions => if we create 1000 objects then 1000 objects will create this methods
 */

const Person = function (firstName, birthYear) {
  // instance properties (will be available on all the instances created through constructor function)
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never do this
  // this.calcAge = function () {};
};

/**
 * 1 - new {} is created
 * 2 - function is called and this assigned empty obj, this = {}
 * 3 - {} is linked to prototype
 * 4 - function automatically return {}
 */

const Peter = new Person('Peter Griffin', 1900);
console.log('Result of constructor func = ', Peter);

const Stewie = new Person('Stewie Griffin', 2000);
console.log('Stewie const func result = ', Stewie);
