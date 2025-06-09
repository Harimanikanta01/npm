import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Jk() {
  const { state } = useLocation();
  const { npa1 } = state || {};

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`http://localhost:5000/item1/${npa1}`);
        setData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    if (npa1) fetchData();
  }, [npa1]);

  if (!data) return <div style={{ color: "#fff", padding: "2rem" }}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <img src={data.banner} alt="Banner" style={styles.bannerImg} />
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.title}>{data.name}</h1>
      </section>

      <section style={styles.content}>
        <div style={styles.posterWrapper}>
          <img src={data.image} alt={data.name} style={styles.poster} />
        </div>

        <div style={styles.details}>
          <p style={styles.description}>{data.info}</p>

          <div style={styles.metaBox}>
            <p><strong>Genre:</strong> Action / Drama</p>
            <p><strong>Rating:</strong> ⭐⭐⭐⭐☆</p>
            <p><strong>Release Year:</strong> 2024</p>
          </div>

          <div style={styles.gallery}>
            {[data.image1]?.map((src, i) =>
              src && (
                <img
                  key={i}
                  src={src}
                  alt={`Still ${i + 1}`}
                  style={styles.galleryImg}
                />
                
              )
            )}
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
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,10,10,0.9), rgba(0,0,0,0.3) 60%, transparent)",
    zIndex: 1,
  },
  title: {
    zIndex: 2,
    fontSize: "4.2rem",
    fontWeight: "800",
    marginBottom: "2.5rem",
    color: "#fff",
    position: "relative",
    textShadow: "3px 3px 12px rgba(0,0,0,0.85)",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "-80px",
    zIndex: 5,
    position: "relative",
  },
  posterWrapper: {
    flex: "0 0 320px",
    display: "flex",
    justifyContent: "center",
  },
  poster: {
    width: "100%",
    height: "460px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 14px 38px rgba(0,0,0,0.85)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  details: {
    flex: "1 1 340px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "1.5rem",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  },
  description: {
    fontSize: "1.15rem",
    lineHeight: 1.7,
    color: "#ddd",
  },
  metaBox: {
    backgroundColor: "#111",
    borderLeft: "4px solid #e50914",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#eee",
  },
  gallery: {
    display: "flex",
    gap: "1rem",
    overflowX: "auto",
  },
  galleryImg: {
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    maxHeight: "200px",
    objectFit: "contain",
    borderRadius: "12px",
    backgroundColor: "#222",
    padding: "6px",
  },
};

export default Jk;
