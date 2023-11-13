// models/User.js
class User {
    constructor(id, firstName, lastName, numberOfWheels, vehicleType, vehicleModel) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.numberOfWheels = numberOfWheels;
      this.vehicleType = vehicleType;
      this.vehicleModel = vehicleModel;
    }
  }
  
  module.exports = User;
  