import React, { useState, useEffect } from 'react';
import { games, userGames } from '../../services/api';
import './Games.css';

function GameList({ user }) {
    const [allGames, setAllGames] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGames();
        if (user) {
            fetchUserCollection();
        }
    }, [user]);

    const fetchGames = async () => {
        try {
            const response = await games.getAll();
            setAllGames(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch games:', error);
            setLoading(false);
        }
    };

    const fetchUserCollection = async () => {
        try {
            const response = await userGames.getCollection();
            setUserCollection(response.data.map(game => game._id));
        } catch (error) {
            console.error('Failed to fetch user collection:', error);
        }
    };

    const handleAddToCollection = async (gameId) => {
        try {
            await userGames.addToCollection(gameId);
            setUserCollection([...userCollection, gameId]);
        } catch (error) {
            console.error('Failed to add game:', error);
        }
    };

    const handleRemoveFromCollection = async (gameId) => {
        try {
            await userGames.removeFromCollection(gameId);
            setUserCollection(userCollection.filter(id => id !== gameId));
        } catch (error) {
            console.error('Failed to remove game:', error);
        }
    };

    const filteredGames = allGames.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading games...</p>
            </div>
        );
    }

    return (
        <div className="games-container">
            <div className="games-header">
                <h1 className="games-title">Game Library</h1>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="games-grid">
                {filteredGames.map(game => (
                    <div key={game._id} className="game-card">
                        <div className="game-card-header">
                            <h3 className="game-card-title">{game.title}</h3>
                            <span className="game-rating">⭐ {game.rating}/10</span>
                        </div>
                        <div className="game-card-body">
                            <p className="game-info"><strong>Genre:</strong> {game.genre}</p>
                            <p className="game-info"><strong>Platform:</strong> {game.platform}</p>
                            <p className="game-info"><strong>Release Year:</strong> {game.releaseYear}</p>
                            <p className="game-info"><strong>Developer:</strong> {game.developer}</p>
                            <p className="game-description">{game.description}</p>
                        </div>
                        <div className="game-card-footer">
                            {user && (
                                userCollection.includes(game._id) ? (
                                    <button
                                        className="btn-remove"
                                        onClick={() => handleRemoveFromCollection(game._id)}
                                    >
                                        Remove from Collection
                                    </button>
                                ) : (
                                    <button
                                        className="btn-add"
                                        onClick={() => handleAddToCollection(game._id)}
                                    >
                                        Add to Collection
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameList;