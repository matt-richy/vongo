import React from "react";
import { useState } from "react";
import "./home.css";
import image1 from "./iceflow.png";
import flag from "./flag.png";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const Homepage = () => {
  return (
    <div>
      <div className="home-image" id="sticky-parallax-header">
        <h1 className="home-image-text">VONGO</h1>
      </div>
      <div className="spacer"></div>
      <div className="body1">
        <div className="firstImageDiv">
          <img src={image1} className="firstImage" />
        </div>
        <div className="tech-spec-div">
          <div className="tech-specs">
            <h1 className="specs">1.9l / 3.8l</h1>
          </div>
        </div>

        <div className="spacer2"></div>
        <div className="about-vongo">
          <h1>Journey of Vongo</h1>
          <p>
            Introducing our latest innovation in hydration: the Vongo Flask.
            Crafted from premium, high-quality materials, this flask is designed
            to elevate your hydration experience to new heights. With it's
            generous capacity, you can stay hydrated with ice cold water
            throughout the day, whether you're at the office, hitting the gym,
            or exploring the great outdoors. The double-wall insulation ensures
            your beverages stay cold or hot for extended periods, while the
            durable construction guarantees long-lasting performance. Say
            goodbye to disposable plastic bottles and embrace sustainability
            with our eco-friendly solution. Stay refreshed, stay stylish, and
            stay hydrated with Vongo.
          </p>
        </div>

        <div className="spacer1"></div>
        <div className="grid-specs">
          <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce>
            <div className="grid1">
              <h1>&#10052; 12 hrs</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="grid2">
              <h1>&#9832; 18 hrs</h1>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce>
            <div className="grid3">
              <h1>double wall insulated</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="grid4">
              <h1>304. stainless steal</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce>
            <div className="grid8">
              <h1>vongo flasks</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="grid5">
              <h1>extremely durable</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce>
            <div className="grid6">
              <h1>1.9l/3.8l</h1>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="grid7">
              <h1>Proudly South African</h1>
            </div>
          </ScrollAnimation>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default Homepage;
