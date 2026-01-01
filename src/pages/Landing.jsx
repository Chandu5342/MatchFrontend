import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron p-5 bg-light rounded-3 text-center">
        <h1 className="display-5">Welcome to MatchFinder</h1>
        <p className="lead">Discover matches, save favorites, and manage matches if you are an admin.</p>
        <hr className="my-4" />
        <div className="d-flex justify-content-center gap-2">
          <Link to="/matches" className="btn btn-primary btn-lg">Browse Matches</Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg">Login / Register</Link>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Nice & Simple</h4>
          <p>Matches presented in a clean card layout. Use filters and search to find matches fast.</p>
        </div>
        <div className="col-md-6">
          <h4>Admin Controls</h4>
          <p>If you are an admin, you can add, edit and delete matches right from the matches page.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
