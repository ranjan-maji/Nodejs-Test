// models/Booking.js
class Booking {
    constructor(id, vehicleType, startTime, endTime) {
      this.id = id;
      this.vehicleType = vehicleType;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }
  
  module.exports = Booking;
  