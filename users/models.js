const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
    // required: true
  },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  committeesServed: {type: String},
  lead: {type: String},
  member: {type: String},
  phoneNumber: {type:String},
  newToLaunch: {type: String}
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.email|| '',
    id: this.id || '',
    email: this.email || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    committeesServed: this.committeesServed || '',
    lead: this.lead,
    member: this.member,
    phoneNumber: this.phoneNumber,
    newToLaunch: this.newToLaunch
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
