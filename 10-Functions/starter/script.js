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
