import React from "react";
import ReviewSlider from "./ReviewSlider";
import "../styles/Home.less";

// Import images for the home page features
import premiumImage from "../assets/home/premium.webp";
import tipsImage from "../assets/home/tips.webp";
import offerImage from "../assets/home/offer.webp";

/**
 * The Home component represents the landing page of the Glamour Boutique application.
 * It showcases a banner, highlights key features of the shop (Premium Products, Expert Tips, Exclusive Offers),
 * and includes a review slider for displaying customer testimonials or ratings.
 *
 * @component
 *
 * @returns {JSX.Element} A React functional component rendering the home page layout.
 *
 * @example
 * // Render the Home component
 * import Home from "./Home";
 *
 * const App = () => (
 *   <div>
 *     <Home />
 *   </div>
 * );
 *
 * export default App;
 */
const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Banner section with a title and description */}
      <div className="home__banner">
        <h1>Welcome to Glamour Boutique</h1>
        <p>Your one-stop shop for all things beauty and makeup!</p>
      </div>

      {/* Features section with three key highlights */}
      <section className="home__features">
        <div className="home__feature">
          <img src={premiumImage} alt="Premium Products" />
          <h3>Premium Products</h3>
          <p>Only the best makeup brands curated for you.</p>
        </div>

        <div className="home__feature">
          <img src={tipsImage} alt="Expert Tips" />
          <h3>Expert Tips</h3>
          <p>Learn from the best with our beauty tutorials.</p>
        </div>

        <div className="home__feature">
          <img src={offerImage} alt="Exclusive Offers" />
          <h3>Exclusive Offers</h3>
          <p>Get exclusive discounts and deals every week.</p>
        </div>
      </section>

      {/* Render the ReviewSlider component */}
      <ReviewSlider />
    </div>
  );
};

// Export the Home component
export default Home;
