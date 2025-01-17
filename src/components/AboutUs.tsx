import React from "react";
import MapComponent from "./MapComponent";
import "../styles/AboutUs.less";

/**
 * The AboutUs component displays the company's location and contact information.
 *
 * This component renders a heading for availability, followed by the company's 
 * location displayed using a map (with coordinates for Budapest) and contact details 
 * such as address, phone number, email, and working hours.
 * 
 * @component
 * @example
 * return (
 *   <AboutUs />
 * )
 * 
 * @returns {JSX.Element} The About Us page with location and contact information.
 */
const AboutUs: React.FC = () => {
  return (
    <div className="about-us">
      <h1>Availability</h1>
      <div className="about-us__content">
        <div className="about-us__map">
          <h2>Our Location</h2>
          <MapComponent lat={47.47282161233902} lng={19.06036901917156} /> {/* Example Budapest coordinates */}
        </div>
        <div className="about-us__details">
          <h2>Contact Us</h2>
          <ul>
            <li><strong>Address:</strong> Magyar Tudósok Körútja 2, Budapest, Hungary</li>
            <li><strong>Phone:</strong> +1 (123) 456-7890</li>
            <li><strong>Email:</strong> contact@company.com</li>
            <li><strong>Working Hours:</strong> Mon-Fri: 9am - 6pm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Export the AboutUs component
export default AboutUs;
