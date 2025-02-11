import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/afterRegister.css"

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
        <a className="navbar-brand" href="#">User Dashboard</a>
        <div>
          <span className="text-white me-3">{user.userName}</span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar py-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">🏠 Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">📜 Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">⚙️ Settings</a>
              </li>
              <li className="nav-item">
                <button className="nav-link text-danger border-0 bg-transparent" onClick={handleLogout}>🚪 Logout</button>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2 className="mt-4">Welcome, {user.userName}!</h2>

              
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
