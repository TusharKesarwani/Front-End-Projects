import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Set the image loaded state to true after the component mounts
    setIsImageLoaded(true);
  }, []);

  return (
    <section id="Home" className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.mainHeading}>
          Building Smarter,
          <br />
          Developing Faster,
          <br />
          Innovating with Tech
        </h1>
        <p className={styles.subHeading}>
          <em>Eloquent Solutions Has the Answers!</em>
        </p>

        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
          />
          <button className={styles.getStartedButton}>
            {/* <img src="/icon-get-started.svg" alt="Get Started Icon" /> */}
            Let's get started!
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className={`${styles.imageContainer} ${
          isImageLoaded ? styles.imageLoaded : ""
        }`}
      >
        <img
          src="headermain.svg" // Replace with your image path
          alt="Innovative Technology"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default Header;
