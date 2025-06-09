import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function App() {
  const [data, setData] = useState([]);
  const [nn, setNn1] = useState("Login Success");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://npm-1.onrender.com/get");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setNn1(null), 5000);
    return () => clearTimeout(timeout);
  }, [nn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        /* Reset and base */
        body {
          background-color: #121212;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #e0e0e0;
          margin: 0; padding: 0;
        }
        a {
          text-decoration: none;
          color: inherit;
        }

        /* Navbar container */
        .navbar-top {
          position: fixed;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: #1f1f1f;
          box-shadow: 0 4px 12px rgba(0,0,0,0.7);
          z-index: 1000;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Branding */
        .navbar-top h3 {
          font-weight: 700;
          font-size: 1.6rem;
          color: #ff2e63; /* bright crimson */
          user-select: none;
          margin: 0;
        }

        /* Search box */
        .search-box {
          display: flex;
          flex: 1 1 300px;
          max-width: 400px;
          box-shadow: 0 0 10px rgba(255,46,99,0.3);
          border-radius: 30px;
          overflow: hidden;
          background: #2c2c2c;
          transition: box-shadow 0.3s ease;
        }
        .search-box:hover {
          box-shadow: 0 0 15px rgba(255,46,99,0.6);
        }
        .search-box input {
          flex-grow: 1;
          border: none;
          padding: 10px 20px;
          background: transparent;
          color: #e0e0e0;
          font-size: 1rem;
          outline: none;
        }
        .search-box input::placeholder {
          color: #aaa;
        }
        .search-box button {
          background: #ff2e63;
          border: none;
          color: white;
          padding: 0 24px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .search-box button:hover {
          background: #e02659;
        }

        /* Auth buttons container */
        .auth-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .auth-buttons .btn {
          padding: 8px 18px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }
        .btn-success {
          background: #28a745;
          color: white;
          box-shadow: 0 2px 8px rgba(40,167,69,0.6);
        }
        .btn-success:hover {
          background: #218838;
          box-shadow: 0 4px 15px rgba(33,136,56,0.7);
        }
        .btn-info {
          background: #17a2b8;
          color: white;
          box-shadow: 0 2px 8px rgba(23,162,184,0.6);
        }
        .btn-info:hover {
          background: #138496;
          box-shadow: 0 4px 15px rgba(19,132,150,0.7);
        }
        .btn-danger {
          background: #dc3545;
          color: white;
          box-shadow: 0 2px 8px rgba(220,53,69,0.6);
        }
        .btn-danger:hover {
          background: #c82333;
          box-shadow: 0 4px 15px rgba(200,35,51,0.7);
        }

        /* Category bar below navbar */
        .category-bar {
          margin-top: 75px;
          text-align: center;
          background: #1f1f1f;
          padding: 14px 0;
          box-shadow: inset 0 -2px 4px rgba(255,46,99,0.15);
          user-select: none;
        }
        .category-bar p {
          display: inline-block;
          margin: 0 20px;
          font-weight: 600;
          color: #ccc;
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .category-bar p:hover {
          color: #ff2e63;
          transform: scale(1.1);
        }

        /* Carousel container */
        .carousel-container {
          max-width: 960px;
          margin: 30px auto 60px;
          padding: 0 15px;
        }
        .carousel-caption h5 {
          background-color: rgba(0,0,0,0.7);
          display: inline-block;
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 1px 5px rgba(0,0,0,0.7);
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .navbar-top {
            justify-content: center;
            gap: 15px;
          }
          .navbar-top h3 {
            flex-basis: 100%;
            text-align: center;
          }
          .search-box {
            max-width: 100%;
            flex-grow: 1;
          }
          .auth-buttons {
            justify-content: center;
            flex-basis: 100%;
            gap: 10px;
          }
          .category-bar p {
            margin: 0 10px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="navbar-top">
        <h3>🎬 Movie ONLINE</h3>

        <div className="search-box" role="search">
          <input
            type="text"
            placeholder="Search movies, events, plays..."
            aria-label="Search movies, events, plays"
          />
          <button type="submit" aria-label="Search">Search</button>
        </div>

        <div className="auth-buttons">
          {!token ? (
            <>
              <Link to="/login" className="btn btn-success">Login</Link>
              <Link to="/create" className="btn btn-info">Create Account</Link>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              {nn && <Alert severity="success" style={{ minWidth: '150px' }}>{nn}</Alert>}
            </>
          )}
        </div>
      </div>

      {/* Category bar */}
      <div className="category-bar" role="navigation" aria-label="Categories">
        <p tabIndex="0">Movies</p>
        <p tabIndex="0">Stream</p>
        <p tabIndex="0">Events</p>
        <p tabIndex="0">Plays</p>
      </div>

      {/* Carousel Section */}
      <div className="carousel-container">
        <Carousel interval={3000} fade>
          {data.length > 0 ? (
            data.map((product) => (
              <Carousel.Item key={product._id}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.text}
                  style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <Carousel.Caption>
                  <h5>{product.text}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <div className="text-center mt-5">
              <p>Loading...</p>
            </div>
          )}
        </Carousel>
      </div>
    </>
  );
}

export default App;
