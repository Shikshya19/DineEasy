import React from "react";
export default function Home() {
  return (
    <>
      <section id="home" className="d-flex align-items-center">
        <div
          className="container position-relative text-center text-lg-start"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="row">
            <div className="col-lg-8">
              <h1>
                Welcome to <span>DineEasy</span>
              </h1>
              <h2>👌</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
