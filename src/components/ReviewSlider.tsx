import React, { useState, useEffect } from "react";
import "../styles/ReviewSlider.less";

/**
 * Represents a single customer review.
 * @property {number} id - Unique identifier for the review.
 * @property {string} name - The name of the reviewer.
 * @property {string} review - The content of the review.
 * @property {number} rating - The rating provided by the reviewer (1-5).
 */
interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
}

/**
 * Predefined list of customer reviews to be displayed in the slider.
 */
const reviews: Review[] = [
  { id: 1, name: "Anna", review: "Amazing products! The lipstick is so long-lasting.", rating: 5 },
  { id: 2, name: "David", review: "Great quality, but the shipping took longer than expected.", rating: 4 },
  { id: 3, name: "Emma", review: "The foundation is perfect for my skin tone. Highly recommend!", rating: 5 },
  { id: 4, name: "John", review: "Affordable and great quality. Will buy again.", rating: 4 },
  { id: 5, name: "Sophia", review: "The eyeshadow palette is stunning. Love the colors!", rating: 5 },
];

/**
 * A React component that displays customer reviews in a slider format.
 * Automatically cycles through reviews every 5 seconds.
 * @returns {JSX.Element} The rendered `ReviewSlider` component.
 */
const ReviewSlider: React.FC = () => {
  /**
   * The index of the currently displayed review.
   */
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  /**
   * Sets up an interval to automatically switch reviews every 5 seconds.
   * Cleans up the interval when the component unmounts.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  /**
   * The currently displayed review based on the `currentReviewIndex`.
   */
  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="review-slider">
      <div className="review-slider__content">
        <p className="review-slider__text">"{currentReview.review}"</p>
        <p className="review-slider__author">- {currentReview.name}</p>
        <p className="review-slider__rating">
          {"★".repeat(currentReview.rating)}
          {"☆".repeat(5 - currentReview.rating)}
        </p>
      </div>
    </div>
  );
};

// Export the `ReviewSlider` component as the default export
export default ReviewSlider;
