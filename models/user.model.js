const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { roles } = require('../utils/constants');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'entrez votre email'],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'entrez votre mot de passe'],
        minlength: [6, 'le mot de passe doit contenir au moins six caractères'],



    },
    name: {
        type: String,
        required: [true, 'entrez votre nom'],
    },
    prenom: {
        type: String,
        required: [true, 'entrez votre prenom'],
    },
    adr: {
        type: String,
        required: [true, 'entrez votre adresse'],
    },
    tel: {
        type: String,

        required: [true, 'entrez votre numéro de téléphone'],
        minlength: [10, 'le numéro de téléphone doit avoir 10 chiffres'],
        maxlength: [10, 'le numéro de téléphone doit avoir 10 chiffres'],
    },
    role: {
        type: String,
        value: roles.avocat,
        required: [true, 'précisez votre role'],


    },
    wilaya: {
        type: String,
        required: [true, 'entrez votre wilayae'],
    },
    commune: {
        type: String,
        required: [true, 'entrez votre commune'],
    },
    tribunal: {
        type: String,
        required: [true, 'entrez le tribunal'],

    },
    code: {
        type: String,
    }

})
UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw createHttpError.InternalServerError(error.message);
    }
};

UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;

        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;