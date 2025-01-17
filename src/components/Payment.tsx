import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icon imports
import { useNavigate } from "react-router-dom";
import "../styles/Payment.less";

/**
 * A React functional component that renders a payment form for credit card transactions.
 * It includes fields for card number, name on the card, expiry date, CVC, and terms acceptance.
 * The form validates user input and navigates to a different route upon successful submission.
 * 
 * @returns {JSX.Element} A JSX element representing the payment form.
 */
const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvc: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{ expiryDate?: string }>({});
  const [showCVC, setShowCVC] = useState(false); // Controls the visibility of the CVC field.

  /**
   * Handles changes to form inputs and updates the formData state.
   * Applies input validation for card number, name, expiry date, and CVC fields.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "cardNumber") {
      // Only numbers allowed
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 16); // Maximum 16 digits
      // Formation: ####-####-####-####
      const formattedValue = sanitizedValue
        .replace(/(\d{4})/g, "$1-") // After every 4 digits add a hyphen
        .replace(/-$/, ""); // Remove the last hyphen
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    if (name === "nameOnCard") {
      // Only letters and spaces allowed
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({ ...formData, [name]: sanitizedValue });
      return;
    }

    if (name === "cvc") {
      // Only numbers allowed
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 3); // Maximum 3 digits
      setFormData({ ...formData, [name]: sanitizedValue });
      return;
    }

    if (name === "expiryDate") {
      // Expiry Date formázás (MM/YY)
      const formattedValue = value
        .replace(/\D/g, "") // Csak számokat enged
        .slice(0, 4); // Maximum 4 számjegy

      const expiryWithSlash =
        formattedValue.length > 2
          ? `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`
          : formattedValue;

      setFormData({ ...formData, [name]: expiryWithSlash });

      if (
        formattedValue.length === 4 &&
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryWithSlash)
      ) {
        setErrors({ expiryDate: "Invalid expiry date format. Use MM/YY." });
      } else {
        setErrors({ expiryDate: "" });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles changes to the terms acceptance checkbox.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The checkbox change event.
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, termsAccepted: (e.target as HTMLInputElement).checked });
  };

  /**
   * Handles form submission.
   * Validates form data and navigates to the finish process page if valid.
   * Displays an alert if terms are not accepted or if there are validation errors.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
    if (errors.expiryDate) {
      alert("Please fix the errors before submitting.");
      return;
    }
    // Navigate to the finish process page
    navigate("/finish-process");
  };

  // Payment form JSX
  return (
    <div className="payment">
      <h1>Payment</h1>
      <form className="payment__form" onSubmit={handleSubmit}>
        <div className="payment__card">
          <h2>Card Details</h2>
          <div className="payment__field">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              required
            />
          </div>
          <div className="payment__field">
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              placeholder="Cardholder Name"
              required
            />
          </div>
          <div className="payment__row">
            <div className="payment__field">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div className="payment__field payment__cvc">
              <label htmlFor="cvc">CVC</label>
              <div className="payment__cvc-container">
                <input
                  type={showCVC ? "text" : "password"}
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="***"
                  maxLength={3}
                  required
                />
                <button
                  type="button"
                  className="payment__cvc-toggle"
                  onClick={() => setShowCVC(!showCVC)}
                >
                  {showCVC ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="payment__terms">
          <input
            type="checkbox"
            id="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsAccepted">I accept the terms and conditions</label>
        </div>
        <button type="submit" className="payment__submit" disabled={!formData.termsAccepted}>
          Pay
        </button>
      </form>
    </div>
  );
};

// Default export
export default Payment;
