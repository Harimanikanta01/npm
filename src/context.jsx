import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Si() {
  const { state } = useLocation();
  const { nnw } = state || {};
  const [productDetails, setProductDetails] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nnw) {
      const fetchDetails = async () => {
        try {
          const res = await axios.get(`https://final123-z948.onrender.com/item/${nnw}`);
          setProductDetails(res.data);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      };
      fetchDetails();
    }
  }, [nnw]);

  useEffect(() => {
    if (selectedId) {
      navigate("/book", { state: { id: selectedId } });
    }
  }, [selectedId, navigate]);

  if (!productDetails)
    return (
      <div style={{ color: "#fff", padding: "2rem", textAlign: "center" }}>
        <h4>Loading movie details...</h4>
      </div>
    );

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <img src={productDetails.banner} alt="Banner" style={styles.bannerImg} />
        <div style={styles.heroOverlay}></div>
        <div style={styles.contentWrapper}>
          <img src={productDetails.image} alt={productDetails.text} style={styles.poster} />
          <div style={styles.details}>
            <h2 style={styles.title}>{productDetails.text}</h2>
            <div style={styles.badges}>
              <span style={styles.badge}>2D</span>
              <span style={styles.badge}>Telugu</span>
            </div>
            <p style={styles.description}>
              Enjoy an immersive cinematic experience with this blockbuster movie in stunning 2D.
            </p>
            <button style={styles.button} onClick={() => setSelectedId(productDetails._id)}>
              🎟️ Watch Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#080808",
    fontFamily: "Poppins, sans-serif",
    color: "#eaeaea",
    minHeight: "100vh",
  },
  hero: {
    position: "relative",
    height: "90vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: "2rem",
  },
  bannerImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,10,10,0.9), rgba(0,0,0,0.3) 60%, transparent)",
    zIndex: 1,
  },
  contentWrapper: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    gap: "2rem",
    backgroundColor: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(6px)",
    padding: "1.5rem 2rem",
    borderRadius: "14px",
    maxWidth: "900px",
    width: "100%",
    alignItems: "center",
  },
  poster: {
    width: "220px",
    height: "330px",
    borderRadius: "16px",
    boxShadow: "0 14px 38px rgba(0,0,0,0.85)",
    objectFit: "cover",
  },
  details: {
    flex: 1,
    color: "#eaeaea",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
  },
  badges: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  badge: {
    backgroundColor: "#e50914",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "1rem",
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "1.8rem",
    color: "#ddd",
  },
  button: {
    backgroundColor: "#e50914",
    border: "none",
    padding: "0.75rem 2rem",
    borderRadius: "25px",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Si;
