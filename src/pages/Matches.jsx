import { useEffect, useState, useContext } from "react";
import { getMatches } from "../api/matchApi.js";
import { getFavorites, addFavorite, removeFavorite } from "../api/favoriteApi.js";
import { AuthContext } from "../context/AuthContext.jsx";

const Matches = () => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sportFilter, setSportFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await getMatches({ sport: sportFilter, search });
      setMatches(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs.map(f => f.id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async (matchId) => {
    if (favorites.includes(matchId)) {
      await removeFavorite(matchId);
      setFavorites(favorites.filter(id => id !== matchId));
    } else {
      await addFavorite(matchId);
      setFavorites([...favorites, matchId]);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [sportFilter, search]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Matches</h3>

      <div className="d-flex mb-3">
        <select
          className="form-select me-2"
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
        >
          <option value="">All Sports</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Tennis">Tennis</option>
        </select>

        <input
          type="text"
          placeholder="Search by team"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : matches.length === 0 ? (
        <p className="text-center">No matches found 😞</p>
      ) : (
        <div className="row">
          {matches.map((match) => (
            <div className="col-md-4 mb-3" key={match.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {match.team_a} vs {match.team_b}
                    <span
                      style={{
                        cursor: "pointer",
                        color: favorites.includes(match.id) ? "gold" : "gray"
                      }}
                      onClick={() => toggleFavorite(match.id)}
                    >
                      ★
                    </span>
                  </h5>
                  <p className="card-text">
                    Sport: {match.sport} <br />
                    League: {match.league} <br />
                    Start: {new Date(match.start_time).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
