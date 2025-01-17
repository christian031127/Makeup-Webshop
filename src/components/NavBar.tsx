import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Shopping cart icon
import DarkModeToggle from "./DarkModeToggle";
import "../styles/NavBar.less";

/**
 * The NavBar component renders the navigation bar with links to different pages,
 * a shopping cart icon displaying the total number of items in the cart, and a dark mode toggle.
 * It also hides or shows the navigation bar based on scroll direction.
 *
 * @component
 */
const NavBar: React.FC = () => {
  /**
   * Retrieves the cart from the CartContext to calculate the total number of items.
   */
  const { cart } = useCart();

  /**
   * Calculates the total number of items in the cart.
   * 
   * @returns {number} The sum of all item quantities in the cart.
   */
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * State that determines if the navbar is visible.
   * 
   * @default true
   */
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Stores the Y position of the last scroll event.
   * 
   * @default 0
   */
  const [lastScrollY, setLastScrollY] = useState(0);

  /**
   * Handles the scroll event to dynamically show or hide the navbar based on scroll direction.
   */
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false); // Hide navbar on scroll down
    } else {
      setIsVisible(true); // Show navbar on scroll up
    }
    setLastScrollY(currentScrollY);
  };

  /**
   * Adds a scroll event listener on mount and removes it on unmount.
   * 
   * @effect Handles dynamic navbar visibility based on scrolling.
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? "navbar--visible" : "navbar--hidden"}`}>
      <div className="navbar__container">
        <ul className="navbar__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
        <div className="navbar__light">
          <DarkModeToggle />
        </div>
        <div className="navbar__cart">
          <Link to="/cart">
            <FiShoppingCart size={24} />
          </Link>
          <span className="navbar__cart-count">{totalItems}</span>
        </div>
      </div>

    </nav>
  );
};

// Exports the NavBar component.
export default NavBar;
