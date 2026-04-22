
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

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())


const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173', // Ton React en local (Vite)
    'https://ton-projet-frontend.vercel.app' // Ton futur lien Vercel
    ];

    app.use(cors({
    origin: function (origin, callback) {
        // Autorise les requêtes sans origine (comme Postman ou les outils de test)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'La politique CORS de ce site ne permet pas l\'accès depuis l\'origine spécifiée.';
        return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // INDISPENSABLE si tu utilises cookie-parser
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//definition des route

//book api
app.use('/api/books', require('./routes/bookRoutes'));
//user api
app.use('/api/user', require('./routes/authRoutes'));
//favorite api
app.use('/api/favorite', require('./routes/favoriteRoutes'));
//discussion api
app.use('/api/discussion', require('./routes/discussionRoutes'));
//message api
app.use('/api/messages', require('./routes/messageRoutes'));

//if route note found
app.use((req, res) =>{
    res.status(404).json({message: "Route non trouvré"});
})

//run the server
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>{
//     console.log(`The server is running on : http://localhost:${PORT}`);
// });

module.exports = app;

