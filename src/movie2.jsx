import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function Npas() {
  const [data, setData] = useState([]);
  const [len1, setLen1] = useState(0);
  const items = 5;
const navigate=useNavigate()
  const apa = async () => {
    const ap = await axios("https://npm-1.onrender.com/movieg2");
    setData(ap.data);
  };

  const next = () => {
    if ((len1 + 1) * items < data.length) {
      setLen1((prevlen1) => prevlen1 + 1);
    }
  };

  const prev = () => {
    if (len1 > 0) {
      setLen1((prevlen1) => prevlen1 - 1);
    }
  };

  const mp = data.slice(len1 * items, (len1 + 1) * items);

  useEffect(() => {
    apa();
  }, []);
const Op = (products) => {
  if (products?._id) {
    try {
      navigate("/movie3", { state: { npa1: products._id } });
    } catch (error) {
      console.log("Navigation error:", error);
    }
  }
};


  return (
    <>
      <style>
        {`
        .npas-container {
          padding: 30px;
          background-color: #121212; /* Dark black background */
          position: relative;
          color: #e0e0e0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .npas-title {
          text-align: center;
          font-weight: 700;
          font-size: 26px;
          margin-bottom: 20px;
          color: #ff2e63; /* bright accent */
          user-select: none;
        }

        .movie-list {
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 20px;
          padding: 10px;
          background-color: #1f1f1f; /* dark card background */
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(255,46,99,0.3);
          scrollbar-width: thin;
          scrollbar-color: #ff2e63 transparent;
        }
        /* Scrollbar styles for WebKit browsers */
        .movie-list::-webkit-scrollbar {
          height: 8px;
        }
        .movie-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .movie-list::-webkit-scrollbar-thumb {
          background-color: #ff2e63;
          border-radius: 20px;
          border: 2px solid transparent;
        }

        .movie-card {
          flex: 0 0 auto;
          width: 200px;
          background-color: #292929;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(255, 46, 99, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .movie-card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(255, 46, 99, 0.6);
        }

        .movie-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
          filter: brightness(0.95);
          transition: filter 0.3s ease;
        }

        .movie-card:hover img {
          filter: brightness(1);
        }

        .movie-title-overlay {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(255, 46, 99, 0.85);
          color: white;
          text-align: center;
          padding: 10px 5px;
          font-size: 16px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          user-select: none;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .movie-card:hover .movie-title-overlay {
          opacity: 1;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 50%;
          padding: 5px;
          cursor: pointer;
          z-index: 2;
          color: #ff2e63;
          transition: background-color 0.3s ease, color 0.3s ease;
          user-select: none;
        }

        .nav-btn:hover {
          background-color: rgba(255, 46, 99, 0.8);
          color: white;
        }

        .nav-left {
          left: 10px;
        }

        .nav-right {
          right: 10px;
        }

        @media (max-width: 768px) {
          .movie-card {
            width: 150px;
          }

          .movie-card img {
            height: 220px;
          }

          .movie-title-overlay {
            font-size: 14px;
            padding: 6px;
          }
        }
        `}
      </style>

      <div className="npas-container">
        <h3 className="npas-title">🎥 Top Content</h3>

        <button onClick={prev} className="nav-btn nav-left" aria-label="Previous">
          <CiCircleChevLeft size={40} />
        </button>

        <div className="movie-list" role="list">
          {mp.map((products) => (
            <div className="movie-card" key={products._id} role="listitem" tabIndex={0}>
                <button onClick={()=>Op(products)}>
              <img src={products.image} alt={products.name} /></button>
              <div className="movie-title-overlay">{products.name}</div>
            </div>
          ))}
        </div>

        <button onClick={next} className="nav-btn nav-right" aria-label="Next">
          <CiCircleChevRight size={40} />
        </button>
      </div>
    </>
  );
}

export default Npas;
