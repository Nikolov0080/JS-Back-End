const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;
const bcrypt = require('bcrypt');
const saltRounds = 5;
const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minlength:6
    },

    password: {
        type: String,
        required: true,
        minlength:6,
    },

    // special for the  TASK!!!
    courses: [{
        type: ObjectId,
        ref: 'Courses'
    }]
});

userSchema.methods = {
    passwordsMatch(password) {
        return bcrypt.compare(password, this.password)
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { return next(err); }

            bcrypt.hash(this.password, salt, (err, encryptedPassword) => {
                if (err) { return next(err); }

                this.password = encryptedPassword;
                next();
            });
        });

        return;
    }

    next();
})

module.exports = new Model('User', userSchema);