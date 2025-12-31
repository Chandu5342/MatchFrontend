import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/favoriteApi.js";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const removeFromFav = async (id) => {
    await removeFavorite(id);
    setFavorites(favorites.filter(f => f.id !== id));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">My Favorites</h3>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : favorites.length === 0 ? (
        <p className="text-center">No favorites yet 😞</p>
      ) : (
        <div className="row">
          {favorites.map((match) => (
            <div className="col-md-4 mb-3" key={match.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{match.team_a} vs {match.team_b}</h5>
                  <p className="card-text">
                    Sport: {match.sport} <br />
                    League: {match.league} <br />
                    Start: {new Date(match.start_time).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromFav(match.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
