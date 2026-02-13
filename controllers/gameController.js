const Game = require('../models/Game');

// get all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get game by id
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'game not found' });
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create new game
exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// update game
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) return res.status(404).json({ message: 'game not found' });
        res.json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete game
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ message: 'game not found' });
        res.json({ message: 'game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};