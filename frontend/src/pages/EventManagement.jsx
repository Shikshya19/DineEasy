import React from "react";
import { useNavigate } from "react-router-dom";

const EventManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="event-management-container">
      <section className="event-management-section">
        <div className="event-management-header">
          <h2 className="event-management-title">Event Management</h2>
        </div>

        <div className="event-management-content">
          <div className="event-management-item">
            <div className="event-management-item-image">
              <img src="assets/img/specials-1.png" alt="Birthday" />
            </div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Birthdays</h3>
              <p className="event-management-item-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Similique exercitationem aperiam quam? Tempora, sequi tempore.
                Eaque, harum illo. Dolorum soluta asperiores eligendi id
                corrupti voluptate, reprehenderit animi nisi ratione ipsam!
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation")}
              >
                Book for Birthday
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image">
              <img src="assets/img/specials-2.png" alt="Private Party" />
            </div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Private Party</h3>
              <p className="event-management-item-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
                exercitationem consequatur doloremque? Quia a culpa cupiditate
                distinctio blanditiis consequatur illo, sit magni, fugiat quo
                ducimus repellat quae. Voluptate, accusantium sequi!
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation")}
              >
                Book for Private Party
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image">
              <img src="assets/img/specials-3.png" alt="Weddings" />
            </div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Weddings</h3>
              <p className="event-management-item-description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                perferendis nulla dolor quasi, suscipit deleniti voluptate
                debitis nemo, id nisi, sed similique voluptatibus inventore quis
                adipisci at beatae numquam provident.
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation")}
              >
                Book for Wedding
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image">
              <img src="assets/img/specials-4.png" alt="Tender" />
            </div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Tender</h3>
              <p className="event-management-item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                ipsam fugiat non quidem dolorem esse! Deserunt, ea nulla ipsa
                sunt molestias voluptatibus cumque, quia dicta voluptatum
                recusandae doloribus veritatis numquam.
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation")}
              >
                Book for Tender
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image">
              <img src="assets/img/specials-5.png" alt="Special" />
            </div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Special</h3>
              <p className="event-management-item-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus adipisci mollitia quod minus, impedit rerum fugit fuga
                autem eos cum sed commodi quas odio, harum esse illum sit nisi
                earum?
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation")}
              >
                Book for Special
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventManagement;
