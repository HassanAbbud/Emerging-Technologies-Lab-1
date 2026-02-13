const User = require('../models/User');
const Game = require('../models/Game');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user registration
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'username already exists' });
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = new User({
            username,
            password: hashedPassword,
            games: []
        });

        await user.save();
        res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// user login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'invalid username or password' });
        }

        // validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'invalid username or password' });
        }

        // generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add game to user's collection
exports.addGameToCollection = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const game = await Game.findById(req.params.gameId);

        if (!game) {
            return res.status(404).json({ message: 'game not found' });
        }

        if (!user.games.includes(req.params.gameId)) {
            user.games.push(req.params.gameId);
            await user.save();
        }

        res.json({ message: 'game added to collection successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove game from user's collection
exports.removeGameFromCollection = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.games = user.games.filter(gameId => gameId.toString() !== req.params.gameId);
        await user.save();
        res.json({ message: 'game removed from collection successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get user's game collection
exports.getUserGames = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('games');
        res.json(user.games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};