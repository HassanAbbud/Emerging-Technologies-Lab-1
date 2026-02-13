const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/games', auth, userController.getUserGames);
router.post('/games/:gameId', auth, userController.addGameToCollection);
router.delete('/games/:gameId', auth, userController.removeGameFromCollection);

module.exports = router;