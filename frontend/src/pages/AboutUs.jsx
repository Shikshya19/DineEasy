import React from "react";
export default function AboutUs() {
  return (
    <>
      <section id="aboutus" class="aboutus">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div
              class="col-lg-6 order-1 order-lg-2"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div class="about">
                <img src="assets\img\about.jpg" alt=""></img>
              </div>
            </div>
            <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content text-white">
              <h3>About Us</h3>
              <p class="fst-italic text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <i class="bi bi-check-circle"></i> Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </li>
                <li>
                  <i class="bi bi-check-circle text-white"></i> Duis aute irure
                  dolor in reprehenderit in voluptate velit.
                </li>
                <li>
                  <i class="bi bi-check-circle text-white"></i> Ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate trideta storacalaperda mastiro
                  dolore eu fugiat nulla pariatur.
                </li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
