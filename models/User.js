
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        image_profil: {
            type: String,
            default: ""
        },
        password : {
            type: String,
            required: true
        },
        role : {
            type: Number,
            default: 0
        }
    },{timestamps: true}
);

/**
 * Méthode pour comparer le mot de passe saisi avec la version hachée
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Middleware Mongoose (Hook) : Hache le mot de passe avant la sauvegarde
 * Note : Pas de 'next' ici car c'est une fonction async.
 */
userSchema.pre('save', async function () {
    // Si le mot de passe n'est pas modifié, on passe à la suite
    if (!this.isModified('password')) {
        return; 
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);


