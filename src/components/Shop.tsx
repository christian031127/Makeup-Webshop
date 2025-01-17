import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";
import "../styles/Shop.less";

// Import images for the shop page
import lipstickImage from "../assets/shop/lipstick.jpeg";
import eyeshadowImage from "../assets/shop/eyeshadow_palette.webp";
import foundationImage from "../assets/shop/foundation.webp";
import blushImage from "../assets/shop/blush.webp";
import mascaraImage from "../assets/shop/mascara.webp";
import eyelinerImage from "../assets/shop/eyeliner.webp";

/**
 * Static list of products available in the shop.
 */
const products = [
  { id: 1, name: "Lipstick", price: 15, image: lipstickImage },
  { id: 2, name: "Eyeshadow Palette", price: 25, image: eyeshadowImage },
  { id: 3, name: "Foundation", price: 30, image: foundationImage },
  { id: 4, name: "Blush", price: 20, image: blushImage },
  { id: 5, name: "Mascara", price: 18, image: mascaraImage },
  { id: 6, name: "Eyeliner", price: 12, image: eyelinerImage },
];

/**
 * @component
 * @description The `Shop` component renders a list of products with functionalities to search, filter, 
 * and add items to the shopping cart. Includes a flying animation for visual feedback.
 */
const Shop: React.FC = () => {
  const { addToCart, cart } = useCart();

  /** State to manage the search query entered by the user. */
  const [searchQuery, setSearchQuery] = useState("");

  /** State to store the URL of the product image being animated. */
  const [flyingImage, setFlyingImage] = useState<string | null>(null);

  /**
   * State to store the starting position of the flying animation.
   * This position is captured from the button's bounding rectangle.
   */
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);

  /**
   * Filters the list of products based on the user's search query.
   * 
   * @returns An array of products whose names match the search query.
   */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
 * Handles adding a product to the cart and initiating a visual flying animation for feedback.
 * Prevents adding more than 10 units of the same product.
 * 
 * @param product - The product object containing the following properties:
 *   @property id - Unique identifier for the product.
 *   @property name - Name of the product.
 *   @property price - Price of the product in USD.
 *   @property image - URL or path to the product image.
 * @param event - The mouse event triggered by the "Add to Cart" button click.
 */
  const handleAddToCart = (
    product: { id: number; name: string; price: number; image: string },
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    /**
   * Captures the bounding rectangle of the button triggering the event.
   * This position is used as the starting point of the flying animation.
   */
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
    setStartPosition({ x: buttonRect.x, y: buttonRect.y });

    /**
   * Sets the image of the product being animated to the flying state.
   * Used as a visual feedback for the user.
   */
    setFlyingImage(product.image);

    /**
   * Checks if the product is already in the cart and validates the maximum allowed quantity (10).
   * If the limit is reached, displays an alert and exits the function.
   */
    const existingProduct = cart.find((item) => item.id === product.id);

    /**
   * Adds the product to the cart with an initial quantity of 1.
   * Uses the `addToCart` function provided by the cart context.
   */
    if (existingProduct && existingProduct.quantity >= 10) {
      alert(`You can only add a maximum of 10 units of ${product.name}.`);
      return;
    }

    addToCart({ ...product, quantity: 1 });

    /**
   * Removes the flying animation image after 1 second to reset the state.
   */
    setTimeout(() => setFlyingImage(null), 1000);
  };

  /**
 * JSX structure of the shop component's UI.
 * - Renders a search bar for filtering products.
 * - Displays a title for the sales section.
 * - Handles the flying animation when products are added to the cart.
 * - Displays a grid of products filtered by the search query.
 */
  return (
    <div className="shop">
      {/* Search bar component with a callback for updating the search query */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Title for the sales section */}
      <h1>Week Sales</h1>

      {/* Flying animation for products added to the cart */}
      {flyingImage && startPosition && (
        <img
          src={flyingImage}
          className="fly-animation"
          style={{
            left: startPosition.x,
            top: startPosition.y,
            "--end-x": `${window.innerWidth - startPosition.x - 40}px`, // Right up corner
            "--end-y": `${-startPosition.y + 20}px`,
          } as React.CSSProperties}
          alt="Flying product"
        />
      )}

      {/* Grid of products filtered by the search query */}
      {filteredProducts.length > 0 ? (
        <div className="shop__grid">
          {filteredProducts.map((product) => (
            <div className="shop__product" key={product.id}>
              <img src={product.image} alt={product.name} className="shop__product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>

              {/* Button to add the product to the cart */}
              <button onClick={(e) => handleAddToCart(product, e)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Message displayed when no products match the search query
        <p>No products found.</p>
      )}
    </div>
  );
};

// Export the Shop component
export default Shop;
