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
                Dine Easy (Restaurant Management and Reservation System) is a
                project that allows users to make online table reservations.
                This system allows customers and restaurant owners to track the
                food orders and reservation process. The project is divided into
                two types: Customer and Administration. In the customer section,
                the users can reserve tables, see their order progression, order
                online, view the menu, and customize their menu. Whereas, in the
                admin section, they can view inventory management, staff
                records, online orders, table reservation records, and manage
                staff.
              </p>
              <ul>
                <p>
                  <i class="bi bi-check-circle text-white"></i>Users are
                  required to register with their details to access the
                  application's features. Upon completing the registration
                  process, customers can utilize functions such as online
                  ordering, table booking, online payment, event management, and
                  customer service. Additionally, registered users have complete
                  access to the menu, enabling them to view available tables and
                  track the status of their meal preparation. On the
                  administrative side, the administrator has full control over
                  personnel management, menu adjustments, and inventory control.
                  The system administrator can efficiently add, remove, or
                  update components as necessary.
                </p>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
