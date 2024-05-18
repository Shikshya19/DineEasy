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
            <div className="event-management-item-image"></div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Birthdays</h3>
              <p className="event-management-item-description">
                DineEasy includes a dedicated birthday event management feature,
                making party planning a breeze. Easily organize guest lists,
                send out invites, choose the perfect venue, and coordinate with
                vendors right from your phone. Whether it's a small gathering or
                a big celebration, our feature ensures every detail is taken
                care of, so you can focus on creating unforgettable memories.
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation?event=birthday")}
              >
                Book for Birthday
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image"></div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Private Party</h3>
              <p className="event-management-item-description">
                EasyDine has exclusive private party booking feature! Seamlessly
                reserve your own private event space within our app for an
                unforgettable gathering. Whether it's a birthday celebration,
                anniversary party, or special reunion, easily browse and book
                venues, customize packages, and coordinate details with our
                intuitive platform. Elevate your event experience with our
                private party feature reserve your spot today and create
                cherished memories with ease.
              </p>
              <button
                className="event-management-item-button"
                onClick={() =>
                  navigate("/tableReservation?event=private-party")
                }
              >
                Book for Private Party
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image"></div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Weddings</h3>
              <p className="event-management-item-description">
                Discover an unparalleled wedding event management service at
                DineEasy, where our dedicated team of planners brings your dream
                wedding to life with precision and creativity. From intimate
                gatherings to grand celebrations, we meticulously handle every
                detail, including venue selection, decor, catering, and
                entertainment, ensuring a flawless experience tailored to your
                unique style and budget.
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation?event=wedding")}
              >
                Book for Wedding
              </button>
            </div>
          </div>

          <div className="event-management-item">
            <div className="event-management-item-image"></div>
            <div className="event-management-item-details">
              <h3 className="event-management-item-title">Special</h3>
              <p className="event-management-item-description">
                Introducing our Special Occasion Booking feature! Easily plan
                milestone events like birthdays and anniversaries with tailored
                experiences. Browse venues, customize packages, and coordinate
                details seamlessly within our app. From romantic dinners to
                family reunions, make every occasion unforgettable. Start
                planning your next special event today!
              </p>
              <button
                className="event-management-item-button"
                onClick={() => navigate("/tableReservation?event=special")}
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
