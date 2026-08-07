const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email : {
        type: String,
        required: [true, 'Please enter an email'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    }

}, {timestamps: true});
//never use next() in pre save hook when using async await, because it will cause the function to run twice and create two users instead of one.
//always await bcrypt

userSchema.pre('save', async function () {
    // only hash if password is new or modified
    if (!this.isModified('password')) return;

    if (typeof this.password !== 'string') {
        throw Error('Password must be a string');
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    console.log("user about to be created and saved", this);
});


userSchema.post('save', function(doc){
    console.log('new user to be saved', doc);
});

//create a static method because mongoose does not have a login method
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email: email});
    if(user){
        //if email is true, compare the PD entered to the hashed PD in db,
        //i need to hash PD entered to be able to compare it to the hashed one in db
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('Incorrect Password')

    }
    throw Error('Incorrect Email')
}

const User = mongoose.model('User', userSchema);
module.exports= User;