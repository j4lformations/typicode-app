const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {capitalCase} = require('capital-case');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    prenom: {
        type: String,
        trim: true,
        required: [true, `Merci de renseigner votre prénom SVP !!!`],
        maxlength: 20,
        validate: [validator.isAlpha, 'Le prenom ne doit pas contenir de nombre !!!']
    },
    email: {
        type: String,
        trim: true,
        required: [true, `Merci de renseigner votre email SVP !!!`],
        unique: [true, `Cette adresse <<{{VALUE}}>> est déjà utilisée !!!`],
        lowercase: true,
        validate: [validator.isEmail, 'Adresse de courriel invalide']
    },
    mdp: {
        type: String,
        required: [true, `Merci de renseigner votre mot de passe SVP !!!`],
        minlength: 6,
        select: false
    },
    confirmMdp: {
        type: String,
        required: [true, `Merci de confirmer votre mot de passe SVP !!!`],
        validate: {
            validator: function (cMdp) {
                return cMdp === this.mdp;
            },
            message: `Les mots passes ne sont pas identiques !!!`
        }
    },
    photo: {
        type: String,
        default: 'photo.png'
    },
    mdpChangedAt: Date,
    mdpResetToken: String,
    mdpResetExpires: Date,
    role: {
        type: String,
        enum: {
            values: ['admin', 'employe', 'user'],
            message: `La valeur {VALUE} est invalide !!!`
        },
        default: []
    },
    historique: {
        type: Array,
        default: []
    },
    actif: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// capitaliser le champ prenom avant une persistence
UserSchema.pre('save', async function () {
    this.prenom = capitalCase(this.prenom);
});

// hasher le champ password avant une persistence
UserSchema.pre('save', async function (next) {
    // le mdp n'a pas ete modifié
    if (!this.isModified('mdp')) {
        return next();
    }

    // On hash le mdp
    this.mdp = await bcrypt.hashSync(this.mdp, 12);

    // On desactive le champ de confirmation du mdp
    this.confirmMdp = undefined;
    next();
});


UserSchema.plugin(beautifyUnique);
module.exports = mongoose.model('User', UserSchema);