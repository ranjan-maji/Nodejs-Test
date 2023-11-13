// validations/vehicleValidation.js
const Joi = require('joi');

const validateVehicle = (vehicle) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(vehicle);
};

const validateBooking = (booking) => {
  const schema = Joi.object({
    vehicleType: Joi.string().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
  });

  return schema.validate(booking);
};


const userSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    numberOfWheels: Joi.number().required(),
    vehicleType: Joi.string().required(),
    vehicleModel: Joi.string().required(),
  });
  
  const validateUser = (user) => {
    const userArraySchema = Joi.alternatives().try(
      Joi.array().items(userSchema),
      userSchema
    );
  
    return userArraySchema.validate(user);
  };


  

  const validateBookingResponse = (bookings) => {
    const bookingSchema = Joi.object({
      id: Joi.number().required(),
      vehicleType: Joi.string().required(),
      startTime: Joi.date().iso().required(),
      endTime: Joi.date().iso().required(),
    });
  
    const schema = Joi.array().items(bookingSchema);
  
    const { error } = schema.validate(bookings);
  
    if (error) {
      return {
        error: {
          message: error.details.map((detail) => detail.message),
        },
      };
    }
  
    // Additional validation for date range
    const overlappingBookings = findOverlappingBookings(bookings);
  
    if (overlappingBookings.length > 0) {
      return {
        error: {
          message: 'Booking overlap detected',
          overlappingBookings,
        },
      };
    }
  
    return { value: bookings };
  };
  
  // Function to find overlapping bookings
  const findOverlappingBookings = (bookings) => {
    const overlappingBookings = [];
  
    for (let i = 0; i < bookings.length - 1; i++) {
      for (let j = i + 1; j < bookings.length; j++) {
        const bookingA = bookings[i];
        const bookingB = bookings[j];
  
        if (isOverlap(bookingA.startTime, bookingA.endTime, bookingB.startTime, bookingB.endTime)) {
          overlappingBookings.push({ bookingA, bookingB });
        }
      }
    }
  
    return overlappingBookings;
  };
  
  // Function to check if two date ranges overlap
  const isOverlap = (startA, endA, startB, endB) => {
    return startA < endB && endA > startB;
  };
  

module.exports = { validateVehicle, validateBooking, validateUser, validateBookingResponse };
