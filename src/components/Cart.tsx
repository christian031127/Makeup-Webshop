import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi"; // Delete icon
import Coupon from "./Coupon"; // Custom coupon component import
import "../styles/Cart.less";

/**
 * Represents the Cart component that displays a list of items the user has added to their shopping cart.
 * Provides functionality for updating item quantities, applying discount coupons, and proceeding to checkout.
 * 
 * @component
 */
const Cart: React.FC = () => {
  /** Accesses cart context to retrieve the list of items, and functions for updating and removing items. */
  const { cart, updateQuantity, removeFromCart } = useCart();

  /** Navigation hook for redirecting to different routes. */
  const navigate = useNavigate();

  /** 
   * State to hold the applied discount value as a fraction.
   * @default 0
   */
  const [discount, setDiscount] = useState(0);

  /** Calculates the total amount before applying any discounts. */
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /** Calculates the total amount after applying the discount. */
  const discountedAmount = totalAmount * (1 - discount);

  /**
   * Handles navigation to the checkout page.
   * Triggered when the "Submit" button is clicked.
   */
  const handleCheckout = () => {
    navigate("/checkout");
  };

  /**
   * Applies a discount to the cart total.
   * @param discountValue - A numeric value representing the percentage of discount in decimal form (e.g., 0.1 for 10%).
   */
  const applyDiscount = (discountValue: number) => {
    setDiscount(discountValue);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {/* Conditional rendering based on the number of items in the cart */}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Table displaying the list of items in the cart */}
          <table className="cart__table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="cart__product">
                    {/* Product image and name */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart__product-image"
                    />
                    <span>{item.name}</span>
                  </td>
                  {/* Price, quantity, total, and remove button */}
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number((e.target as HTMLSelectElement).value))}
                    >
                      {/* Dropdown for selecting quantity */}
                      {[...Array(10).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="cart__remove">
                      <FiX size={20} /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Coupon component for applying discounts */}
          <Coupon applyDiscount={applyDiscount} />
          <div className="cart__summary">
            <h3>
              Total Amount: <span className={discount > 0 ? "cart__amount--strikethrough" : ""}>${totalAmount.toFixed(2)}</span>
            </h3>
            {/* Display discounted amount if a discount is applied */}
            {discount > 0 && (
              <h3 className="cart__amount--discounted">Discounted Amount: ${discountedAmount.toFixed(2)}</h3>
            )}
          </div>
          <button className="cart__submit" onClick={handleCheckout}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

// Exports the Cart component as the default export.
export default Cart;
