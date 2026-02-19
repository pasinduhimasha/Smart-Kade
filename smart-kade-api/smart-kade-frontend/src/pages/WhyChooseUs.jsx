import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/WhyChooseUs.css";

const features = [
  {
    img: "/images/fresh-ingredients.jpg",
    title: "Fresh Ingredients",
    desc: "We use only fresh, high-quality ingredients sourced locally to ensure every meal is delicious."
  },
  {
    img: "/images/fast-service.jpg",
    title: "Fast Service",
    desc: "Quick preparation and prompt delivery make every order seamless."
  },
  {
    img: "/images/expert-chefs.jpg",
    title: "Expert Chefs",
    desc: "Our chefs bring experience and passion to craft every dish to perfection."
  },
  {
    img: "/images/customer-care.jpg",
    title: "Customer Care",
    desc: "We value our customers and provide attentive service every time."
  }
];

const WhyChooseUs = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="fade-in">
              Why Choose <span className="highlight">Smart Kade</span>?
            </h1>
            <p className="fade-in delay-1">
              Learn what makes us special, fresh, and customer-friendly
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card fade-up delay-1">
                <img src={feature.img} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Details / Commitment Section */}
          <div className="additional-details fade-in delay-2">
            <h2>Our Commitment to You</h2>
            <p>
              At Smart Kade, we go beyond just providing services — we create experiences. Our commitment is to ensure that every interaction you have with us leaves you satisfied, informed, and inspired.
            </p>
            <p>
              We prioritize quality and consistency. From sourcing the freshest ingredients to maintaining high standards of hygiene and safety, every step is carefully monitored to meet your expectations.
            </p>
            <p>
              Innovation is at the heart of everything we do. Whether it's introducing new dishes, improving our delivery system, or integrating modern technology into your learning and food experience, we are constantly evolving to serve you better.
            </p>
            <p>
              We value our community. Listening to feedback, responding promptly, and tailoring experiences to your needs ensures that Smart Kade is not just a service provider but a partner in your daily life.
            </p>
            <p>
              Your satisfaction is our measure of success. Every meal, every order, every interaction is crafted with care to create trust, joy, and lasting memories.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WhyChooseUs;
