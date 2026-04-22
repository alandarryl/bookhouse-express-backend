const mongoose = require('mongoose');

// Variable pour stocker l'état de la connexion
let isConnected = false; 

const connectDB = async () => {
    // Si on est déjà connecté, on ne refait rien
    if (isConnected) {
        console.log('Utilisation de la connexion MongoDB existante');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Note: Verifie bien l'orthographe de dbName (N majuscule ou pas selon ton .env)
            dbName: process.env.DB_NAME, 
        });

        isConnected = conn.connections[0].readyState;
        console.log(`MongoDB connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion : ${error.message}`);
        // En serverless, on évite process.exit(1) car cela tue l'instance violemment
        throw error; 
    }
}

module.exports = connectDB;