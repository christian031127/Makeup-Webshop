import React, { useState } from "react";
import "../styles/Coupon.less";

/**
 * Props for the Coupon component.
 * 
 * @property {Function} applyDiscount - Function to apply a discount based on the entered coupon code.
 */
interface CouponProps {
  applyDiscount: (discount: number) => void;
}

/**
 * Coupon component allows users to enter and apply discount codes.
 * 
 * @component
 * @param {CouponProps} props - The props for the Coupon component.
 */
const Coupon: React.FC<CouponProps> = ({ applyDiscount }) => {
  /**
   * State to hold the entered coupon code.
   * @default ""
   */
  const [couponCode, setCouponCode] = useState("");

  /**
   * State to indicate if the entered coupon code is valid.
   * Can be true, false, or null (for no validation state).
   * @default null
   */
  const [isValid, setIsValid] = useState<boolean | null>(null);

  /**
   * List of valid coupon codes with corresponding discount percentages.
   * Example: `"SAVE10"` gives a 10% discount.
   */
  const validCoupons: { [key: string]: number } = {
    "SAVE10": 0.1, // 10% discount
    "SAVE20": 0.2, // 20% discount
    "SAVE30": 0.3, // 30% discount
  };

  /**
   * Handles the application of a coupon code.
   * Checks if the entered code is valid and applies the corresponding discount.
   */
  const handleApplyCoupon = () => {
    if (validCoupons[couponCode.toUpperCase()]) {
      const discount = validCoupons[couponCode.toUpperCase()];
      applyDiscount(discount);
      setIsValid(true); // Valid coupon
    } else {
      setIsValid(false); // Invalid coupon
    }
  };

  return (
    <div className="coupon">
      <h3>Have a Coupon?</h3>
      <div className="coupon__input-group">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode((e.target as HTMLInputElement).value)}
          placeholder="Enter coupon code"
          className={`coupon__input ${isValid === false ? "coupon__input--error" : ""}`}
        />
        <button onClick={handleApplyCoupon} className="coupon__button">
          Apply
        </button>
      </div>
      {isValid === false && <p className="coupon__error">Invalid coupon code!</p>}
      {isValid === true && <p className="coupon__success">Coupon applied successfully!</p>}
    </div>
  );
};

// Export the Coupon component.
export default Coupon;
