import { useEffect, useState, useContext } from "react";
import { getMatches, createMatch, updateMatch, deleteMatch } from "../api/matchApi.js";
import { getFavorites, addFavorite, removeFavorite } from "../api/favoriteApi.js";
import { AuthContext } from "../context/AuthContext.jsx";

const Matches = () => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sportFilter, setSportFilter] = useState("");
  const [search, setSearch] = useState("");

  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ sport: "", league: "", team_a: "", team_b: "", start_time: "" });

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

  const openCreate = () => {
    setEditId(null);
    setForm({ sport: "", league: "", team_a: "", team_b: "", start_time: "" });
    setFormVisible(true);
  };

  const openEdit = (m) => {
    setEditId(m.id);
    setForm({
      sport: m.sport || "",
      league: m.league || "",
      team_a: m.team_a || "",
      team_b: m.team_b || "",
      start_time: m.start_time ? new Date(m.start_time).toISOString().slice(0,16) : "",
    });
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        start_time: new Date(form.start_time).toISOString(),
      };
      if (editId) {
        await updateMatch(editId, payload);
      } else {
        await createMatch(payload);
      }
      setFormVisible(false);
      setEditId(null);
      fetchMatches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this match?")) return;
    try {
      await deleteMatch(id);
      fetchMatches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Matches</h3>

      <div className="d-flex mb-3 align-items-center">
        <select
          className="form-select me-2"
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          style={{ maxWidth: 200 }}
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

        {user?.role === "admin" && (
          <button className="btn btn-success ms-3" onClick={openCreate}>
            Add Match
          </button>
        )}
      </div>

      {formVisible && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{editId ? "Edit Match" : "Create Match"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3 mb-2">
                  <input className="form-control" placeholder="Sport" value={form.sport} onChange={(e)=>setForm({...form, sport: e.target.value})} required />
                </div>
                <div className="col-md-3 mb-2">
                  <input className="form-control" placeholder="League" value={form.league} onChange={(e)=>setForm({...form, league: e.target.value})} />
                </div>
                <div className="col-md-3 mb-2">
                  <input className="form-control" placeholder="Team A" value={form.team_a} onChange={(e)=>setForm({...form, team_a: e.target.value})} required />
                </div>
                <div className="col-md-3 mb-2">
                  <input className="form-control" placeholder="Team B" value={form.team_b} onChange={(e)=>setForm({...form, team_b: e.target.value})} required />
                </div>
                <div className="col-md-4 mb-2">
                  <input className="form-control" type="datetime-local" value={form.start_time} onChange={(e)=>setForm({...form, start_time: e.target.value})} required />
                </div>
              </div>
              <div className="mt-2">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

                  {user?.role === "admin" && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={()=>openEdit(match)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(match.id)}>Delete</button>
                    </div>
                  )}
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
