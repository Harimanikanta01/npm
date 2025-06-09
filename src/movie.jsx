import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import { useNavigate } from "react-router-dom";
import { FaRegCaretSquareLeft, FaRegCaretSquareRight } from "react-icons/fa";

function Movie() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const handleNext = () => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const handleMovieClick = (id) => {
    navigate("/get", { state: { nnw: id } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://npm-1.onrender.com/take");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };
    fetchData();
  }, []);

  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <style>{`
        .movie-card:hover .movie-overlay {
          opacity: 1;
        }

        .movie-overlay {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 10px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          font-weight: bold;
        }

        .movie-image-wrapper {
          position: relative;
          width: 100%;
          height: 270px;
          overflow: hidden;
          border-radius: 10px;
        }

        .movie-card:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="container mt-5">
        <h3 className="mb-4 text-center">🎬 Newly Added Movies</h3>

        <div className="d-flex justify-content-between align-items-center">
          <button className="nav-btn" onClick={handlePrev} disabled={startIndex === 0}>
            <FaRegCaretSquareLeft size={40} />
          </button>

          <div className="d-flex overflow-hidden flex-grow-1 justify-content-around">
            {currentItems.map((product) => (
              <div
                key={product._id}
                className="movie-card text-center p-2 m-2 shadow-sm rounded"
                onClick={() => handleMovieClick(product._id)}
                style={{
                  cursor: 'pointer',
                  minWidth: '200px',
                  maxWidth: '220px',
                  background: '#f9f9f9',
                  transition: 'transform 0.3s',
                }}
              >
                <div className="movie-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.text}
                    className="img-fluid"
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  />
                  <div className="movie-overlay">{product.text}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= data.length}
          >
            <FaRegCaretSquareRight size={40} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
