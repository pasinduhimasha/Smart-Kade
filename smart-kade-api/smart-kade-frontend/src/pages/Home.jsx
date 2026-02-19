import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Home.css";

const Home = () => {

  // BACKEND URL
  const BACKEND_URL = "http://localhost:5000";

  // Hero slider images
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slider);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  // Categories
  const categories = [
    { name: "Sea Food", img: "/images/seafood.jpg" },
    { name: "Italian", img: "/images/italian.jpg" },
    { name: "Chinese", img: "/images/chinese.jpg" },
    { name: "Sri Lankan", img: "/images/srilankan.jpg" },
    { name: "Desserts", img: "/images/desserts.jpg" },
  ];

  // OFFERS STATE (from DB)
  const [offers, setOffers] = useState([]);

  // Fetch offers from backend
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/offers`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        <div className="hero-overlay">
          <h1>Delicious Food Delivered Fast</h1>
          <p>Order your favourite meals from Smart Kade</p>

          <div className="hero-buttons">
            <button className="prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <div key={i} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section (FROM DATABASE) */}
      <section className="offers">
        <h2>Today's Offers</h2>
        <br></br>

        <div className="offer-slider">
          <div className="offer-track">
            {offers.length === 0 ? (
              <p style={{ textAlign: "center" }}>No offers available</p>
            ) : (
              offers.concat(offers).map((offer, i) => (
                <div key={i} className="offer-card">
                  <img
                    src={`${BACKEND_URL}${offer.img}`}
                    alt={offer.text}
                  />
                  <p>{offer.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
