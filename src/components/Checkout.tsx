import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.less";

/**
 * The `Checkout` component renders a form where users can input their personal and delivery details.
 * Upon submission, it validates the input and navigates to the payment page if successful.
 *
 * @component
 */
const Checkout: React.FC = () => {
  /**
   * State for storing form data.
   */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
  });

  /**
   * Hook for navigating to different routes.
   */
  const navigate = useNavigate();

  /**
   * Handles form field changes by updating the `formData` state.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by input change.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles form submission, validates all fields, and navigates to the payment page if valid.
   * 
   * @param {React.FormEvent} e - The event triggered by form submission.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
    if (!allFieldsFilled) {
      alert("Please fill in all the fields.");
      return;
    }
    // If all fields are filled, navigate to the payment page.
    navigate("/payment");
  };

  // Render the Checkout component.
  return (
    <div className="checkout">
      <h1>Enter your Details</h1>
      <form className="checkout__form" onSubmit={handleSubmit}>
        <div className="checkout__field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your zip code"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="checkout__field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button type="submit" className="checkout__submit">
          Submit
        </button>
      </form>
    </div>
  );
};

// Export the Checkout component.
export default Checkout;
