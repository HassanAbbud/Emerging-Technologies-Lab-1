const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        // init sample game data after successful connection
        initGames();
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });

// initialize sample game data
async function initGames() {
    try {
        const Game = require('./models/Game');
        const count = await Game.countDocuments();
        if (count === 0) {
            const sampleGames = [
                {
                    title: "The Legend of Zelda: Breath of the Wild",
                    genre: "Action-Adventure",
                    platform: "Nintendo Switch",
                    releaseYear: 2017,
                    developer: "Nintendo",
                    rating: 9.5,
                    description: "An open-world action-adventure game"
                },
                {
                    title: "Red Dead Redemption 2",
                    genre: "Action-Adventure",
                    platform: "PC, PS4, Xbox One",
                    releaseYear: 2018,
                    developer: "Rockstar Games",
                    rating: 9.7,
                    description: "A Western-themed open-world game"
                },
                {
                    title: "Cyberpunk 2077",
                    genre: "RPG",
                    platform: "PC, PS5, Xbox Series X",
                    releaseYear: 2020,
                    developer: "CD Projekt Red",
                    rating: 7.5,
                    description: "A sci-fi open-world RPG"
                }
            ];
            await Game.insertMany(sampleGames);
            console.log('Sample game data initialized successfully');
        }
    } catch (error) {
        console.error('Failed to initialize sample game data:', error);
    }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});