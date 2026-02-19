import React from "react";
import "../style/About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="fade-in">
              More <span className="highlight">About Smart Kade</span>
            </h1>
            <p className="fade-in delay-1">
              Learn about Smart Kade — your modern, interactive platform for learning and smart solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Info */}
      <section className="about-info">
        <div className="container">
          <div className="row">
            <div className="about-text fade-left">
              <h2>Welcome to Smart Kade</h2>
              <p>
                Smart Kade is designed to make learning and organizing tasks easier, faster, and fun. We integrate modern design with interactive features to help you achieve your goals.
              </p>
              <p>
                Our platform is intuitive and responsive, allowing students and users to navigate effortlessly while enjoying visually appealing interfaces.
              </p>
              <p>
                Whether it's course management, interactive quizzes, or tracking progress, Smart Kade provides everything in one sleek, modern package.
              </p>
            </div>

            <div className="about-image fade-right">
              <img src="/images/about-smartkade.jpg" alt="Smart Kade" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="container">
          <div className="cards">
            <div className="card fade-up">
              <h3>Our Mission</h3>
              <p>
                To empower learners with smart tools, interactive resources, and modern digital experiences.
              </p>
            </div>
            <div className="card fade-up delay-1">
              <h3>Our Vision</h3>
              <p>
                To be the leading platform for intuitive and modern learning, helping students achieve success efficiently.
              </p>
            </div>
            <div className="card fade-up delay-2">
              <h3>Our Values</h3>
              <p>
                Innovation, Simplicity, Engagement, and Growth — all wrapped in a user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
