import React from "react";
import { useNavigate } from "react-router-dom";
export default function EventManagement() {
  const navigate = useNavigate();
  return (
    <>
      <section id="specials" class="specials">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Specials</h2>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-3">
              <ul class="nav nav-tabs flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link active show"
                    data-bs-toggle="tab"
                    href="#tab-1"
                  >
                    Birthdays
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#tab-2">
                    Private Party
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#tab-3">
                    Weddings
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#tab-4">
                    Tendor
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#tab-5">
                    Special
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-9 mt-4 mt-lg-0">
              <div class="tab-content">
                <div class="tab-pane active show" id="tab-1">
                  <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                      <h3>Birthdays</h3>
                      <p class="fst-italic">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Similique exercitationem aperiam quam? Tempora,
                        sequi tempore. Eaque, harum illo. Dolorum soluta
                        asperiores eligendi id corrupti voluptate, reprehenderit
                        animi nisi ratione ipsam!
                      </p>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Molestiae et reprehenderit, eum libero velit porro
                        deserunt perspiciatis fugit quia quibusdam earum?
                        Cupiditate officiis placeat necessitatibus quo
                        repellendus nihil odio sunt?
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/tableReservation")}
                      >
                        Book for birthday
                      </button>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/specials-1.png"
                        alt=""
                        class="img-fluid"
                      ></img>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="tab-2">
                  <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                      <h3>Private Party</h3>
                      <p class="fst-italic">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Veniam exercitationem consequatur doloremque? Quia
                        a culpa cupiditate distinctio blanditiis consequatur
                        illo, sit magni, fugiat quo ducimus repellat quae.
                        Voluptate, accusantium sequi!
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Explicabo voluptatibus porro dolores, incidunt quidem
                        voluptatem quas autem, similique deserunt recusandae,
                        ipsum dignissimos quisquam laudantium soluta nemo rem
                        sit? Fuga, placeat.
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/tableReservation")}
                      >
                        Book for private party
                      </button>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/specials-2.png"
                        alt=""
                        class="img-fluid"
                      ></img>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="tab-3">
                  <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                      <h3>Weddings</h3>
                      <p class="fst-italic">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Libero perferendis nulla dolor quasi, suscipit
                        deleniti voluptate debitis nemo, id nisi, sed similique
                        voluptatibus inventore quis adipisci at beatae numquam
                        provident.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere veritatis soluta, cumque quas corrupti aperiam
                        nemo maiores deserunt dicta enim ullam eius labore
                        adipisci blanditiis illo quos ab quisquam rem!
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/tableReservation")}
                      >
                        Book for wedding
                      </button>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/specials-3.png"
                        alt=""
                        class="img-fluid"
                      ></img>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="tab-4">
                  <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                      <h3>Tendor</h3>
                      <p class="fst-italic">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        At, ipsam fugiat non quidem dolorem esse! Deserunt, ea
                        nulla ipsa sunt molestias voluptatibus cumque, quia
                        dicta voluptatum recusandae doloribus veritatis numquam.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ea adipisci dolorum qui asperiores fuga! At amet
                        cupiditate incidunt facere quidem iste et error
                        veritatis maxime. Optio a non omnis asperiores.
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/tableReservation")}
                      >
                        Book for tendor
                      </button>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/specials-4.png"
                        alt=""
                        class="img-fluid"
                      ></img>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="tab-5">
                  <div class="row">
                    <div class="col-lg-8 details order-2 order-lg-1">
                      <h3>Special</h3>
                      <p class="fst-italic">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus adipisci mollitia quod minus, impedit
                        rerum fugit fuga autem eos cum sed commodi quas odio,
                        harum esse illum sit nisi earum?
                      </p>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Nemo tenetur laborum, quia error quod molestiae
                        voluptatum. Repellendus, fugiat dolorum. In quibusdam
                        soluta aut officia fugit doloribus maiores voluptates
                        dignissimos necessitatibus.
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/tableReservation")}
                      >
                        Book for special
                      </button>
                    </div>
                    <div class="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/specials-5.png"
                        alt=""
                        class="img-fluid"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
