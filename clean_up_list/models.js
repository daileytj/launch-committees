const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CleanUpSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    }
});

CleanUpSchema.methods.apiRepr = function() {
    return {
        id: this.id || '',
        item: this.item || ''
    };
};

const CleanUp = mongoose.model('CleanUp', CleanUpSchema);

module.exports = {
    CleanUp
};
