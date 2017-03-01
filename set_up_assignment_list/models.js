const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SetUpSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    checked:{
      type:String,
      default: "false"
    }
});

SetUpSchema.methods.apiRepr = function() {
    return {
        id: this.id || '',
        item: this.item || '',
        checked: this.checked
    };
};

const SetUp = mongoose.model('SetUp', SetUpSchema);

module.exports = {
    SetUp
};
