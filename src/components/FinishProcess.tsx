import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/FinishProcess.less";

/**
 * `FinishProcess` component handles the final step of the checkout process.
 * It displays a success message with an order ID, clears the cart, and redirects
 * the user to the homepage after a short delay.
 *
 * @returns {JSX.Element} The rendered component showing the payment success message.
 */
const FinishProcess: React.FC = () => {
  const { cart, removeFromCart } = useCart(); // Manages cart content
  const navigate = useNavigate();

  /**
   * Generates a unique order ID for display.
   *
   * @returns {string} A randomly generated order ID in the format `ORD-XXXXXX`.
   */
  const generateOrderId = (): string => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const orderId = generateOrderId();

  /**
   * Clears the cart when the component is mounted.
   */
  useEffect(() => {
    cart.forEach((item) => removeFromCart(item.id));
  }, [cart, removeFromCart]);

  /**
   * Redirects the user to the homepage after 10 seconds.
   * The timer is cleared when the component is unmounted.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [navigate]);

  // Render the component
  return (
    <div className="finish-process">
      <h1>Payment Successful!</h1>
      <p>Your order has been successfully placed.</p>
      <p>
        <strong>Order ID:</strong> {orderId}
      </p>
      <p>You will be redirected to the homepage shortly...</p>
    </div>
  );
};

// Export the `FinishProcess` component.
export default FinishProcess;
