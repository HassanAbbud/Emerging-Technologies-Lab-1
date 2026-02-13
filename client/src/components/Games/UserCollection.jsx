import React, { useState, useEffect } from 'react';
import { userGames } from '../../services/api';
import './Games.css';

function UserCollection() {
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        fetchCollection();
    }, []);

    const fetchCollection = async () => {
        try {
            const response = await userGames.getCollection();
            setCollection(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch collection:', error);
            setLoading(false);
        }
    };

    const handleRemoveGame = async (gameId) => {
        try {
            await userGames.removeFromCollection(gameId);
            setCollection(collection.filter(game => game._id !== gameId));
            if (selectedGame && selectedGame._id === gameId) {
                setSelectedGame(null);
            }
        } catch (error) {
            console.error('Failed to remove game:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading collection...</p>
            </div>
        );
    }

    return (
        <div className="user-collection-container">
            <h1 className="collection-title">My Game Collection</h1>

            <div className="collection-content">
                <div className="collection-games">
                    {collection.length === 0 ? (
                        <p className="empty-message">Your collection is empty. Start adding games!</p>
                    ) : (
                        collection.map(game => (
                            <div
                                key={game._id}
                                className={`collection-item ${selectedGame?._id === game._id ? 'selected' : ''}`}
                                onClick={() => setSelectedGame(game)}
                            >
                                <h3 className="collection-item-title">{game.title}</h3>
                                <p className="collection-item-info">{game.genre} - {game.platform}</p>
                                <button
                                    className="remove-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveGame(game._id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {selectedGame && (
                    <div className="game-details">
                        <h2 className="details-title">{selectedGame.title}</h2>
                        <div className="details-content">
                            <p><strong>Genre:</strong> {selectedGame.genre}</p>
                            <p><strong>Platform:</strong> {selectedGame.platform}</p>
                            <p><strong>Release Year:</strong> {selectedGame.releaseYear}</p>
                            <p><strong>Developer:</strong> {selectedGame.developer}</p>
                            <p><strong>Rating:</strong> ⭐ {selectedGame.rating}/10</p>
                            <p className="details-description"><strong>Description:</strong> {selectedGame.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserCollection;