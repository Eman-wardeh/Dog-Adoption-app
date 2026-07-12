const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
    dog_name: { type: String, required: true},
    description: { type: String},
    owner: { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    adoptedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    adopted:{
        type: Boolean,
        default: false
    }
})

const Dog = mongoose.model('Dog', dogSchema);
module.exports = Dog;