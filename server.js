const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

//get the env variable
dotenv.config();

//connect to MongoDB
connectDb();

const app = express();

// --- CONFIGURATION CORS SÉCURISÉE POUR COOKIES ---
const allowedOrigins = [
    'http://localhost:5173', 
    'https://bookhouse-react-frontend.vercel.app' // Ton vrai lien frontend en ligne !
];

app.use(cors({
    origin: function (origin, callback) {
        // Autorise les requêtes sans origine (comme Postman ou les outils de test)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La politique CORS de ce site ne permet pas l\'accès.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // <-- INDISPENSABLE pour accepter les cookies d'Axios
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//middlewares
app.use(express.json());
app.use(cookieParser());

//definition des route
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/user', require('./routes/authRoutes'));
app.use('/api/favorite', require('./routes/favoriteRoutes'));
app.use('/api/discussion', require('./routes/discussionRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

//if route not found
app.use((req, res) => {
    res.status(404).json({message: "Route non trouvée"});
});

module.exports = app;
