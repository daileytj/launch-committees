const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CleanUpSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    checked:{
      type: String,
      // default: "false"
    }
});

CleanUpSchema.methods.apiRepr = function() {
    return {
        id: this.id || '',
        item: this.item || '',
        checked: this.checked
    };
};

const CleanUp = mongoose.model('CleanUp', CleanUpSchema);

module.exports = {
    CleanUp
};
