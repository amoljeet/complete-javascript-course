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

console.log('');
console.log('##### Constructor Functions #####');

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

const Peter = new Person('Peter Griffin', 1950);
console.log('Result of constructor func = ', Peter);

const Stewie = new Person('Stewie Griffin', 2000);
console.log('Stewie const func result = ', Stewie);

/**
 * Prototypes
 *
 * Each and every fucnction in JS has a property called prototype
 * Every object created by a certain constructor function has access to prototypes
 *
 * any object has access to methods from its prototypes
 */

console.log('');
console.log('##### Prototypes #####');

// single method is created which is accessible to all the objects with constructor function
Person.prototype.calcAge = function () {
  console.log('Age in 3000', 3000 - this.birthYear);
};

Peter.calcAge();

console.log(Peter.__proto__);
console.log(Peter.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(Peter));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(Peter, Stewie);

console.log(Peter.species);
console.log(Stewie.species);

console.log(Peter.hasOwnProperty('firstName'));
console.log(Peter.hasOwnProperty('species'));

/**
 * Prototypal Inheritance
 *
 * Mechanism for reusing the code
 */

console.log('');
console.log('##### Prototypal inheritance');

console.log(Peter.__proto__);
console.log(Peter.__proto__.__proto__);
console.log(Peter.__proto__.__proto__.__proto__);

const protoArrEx = [1, 2, 2, 2, 3, 3, 3, 4];
console.log(protoArrEx.__proto__);
console.log(protoArrEx.__proto__ === Array.prototype);
console.log(protoArrEx.__proto__.__proto__);

/**
 * Add new method in prototype property
 *
 * method created inside Array will be available for all the arrays
 *
 * not a good idea => in next JS version they might add method with same name
 */

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(protoArrEx.unique());
