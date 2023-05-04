import React from "react";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero">
      <div className="row heroRow">
        <div className="col-lg-6 col-md-12 col-sm-12 heroImg">
          <img
            className="heroImg"
            src="resources/hero.png"
            width="600px"
            alt="DSA-Coach"
          />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 heroText">
          <h4 className="Hero4">Want to Learn DSA ?</h4>
          <h4 className="Hero4">But can’t keep the consistency?</h4>
          <h2 className="hero2">We got you covered...</h2>
        </div>
      </div>
    </div>
    </section>
  );
}
