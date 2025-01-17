import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Sun és Moon icons
import "../styles/DarkModeToggle.less";

/**
 * A component that allows users to toggle between light and dark themes.
 * It checks the user's current theme preference from localStorage and applies the theme to the page.
 * The component renders a button that displays either a sun or moon icon depending on the active theme.
 * 
 * @component
 * 
 * @returns {JSX.Element} A button that toggles between light and dark modes.
 */
const DarkModeToggle: React.FC = () => {
  // State to track whether dark mode is active
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if a dark theme was previously set in localStorage
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Apply the dark or light mode class to the body element based on the state
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]); // Runs when the isDarkMode state changes

  const toggleDarkMode = () => {
    // Toggle the dark mode state
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

// Export the DarkModeToggle component
export default DarkModeToggle;
