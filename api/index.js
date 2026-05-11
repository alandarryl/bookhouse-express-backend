const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // <--- GARDER UNIQUEMENT CELUI-CI
const connectDb = require('../config/db');

// configuration de l'environnement
dotenv.config();

// connexion à MongoDB
connectDb();

const app = express();

// --- CONFIGURATION CORS (UNE SEULE FOIS) ---
const allowedOrigins = [
    'http://localhost:5173', 
    'https://ton-projet-frontend.vercel.app' // Remplace par ton vrai lien frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // Autorise les requêtes sans origine (comme Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La politique CORS de ce site ne permet pas l\'accès.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- AUTRES MIDDLEWARES ---
app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---
// Remplace tes imports de routes actuels par ceux-ci :
app.use('/api/books', require('../routes/bookRoutes')); // Ajout de ../
app.use('/api/user', require('../routes/authRoutes'));   // Ajout de ../
app.use('/api/favorite', require('../routes/favoriteRoutes')); // Ajout de ../
app.use('/api/discussion', require('../routes/discussionRoutes')); // Ajout de ../
app.use('/api/messages', require('../routes/messageRoutes')); 

// gestion 404
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

module.exports = app;