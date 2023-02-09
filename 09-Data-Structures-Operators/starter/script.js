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
