import React from "react";
import { FiSearch } from "react-icons/fi"; // Imports the search icon from 'react-icons' library.
import "../styles/SearchBar.less"; // Imports custom styles for the search bar.

/**
 * Props for the SearchBar component.
 * 
 * @interface SearchBarProps
 * @property {Function} onSearch - A callback function that is called when the input value changes.
 * It receives a string argument, the search query.
 */
interface SearchBarProps {
    onSearch: (query: string) => void;
}

/**
 * `SearchBar` component allows users to type a search query, which triggers the `onSearch` callback
 * with the current input value.
 * 
 * @component
 * @example
 * // Example usage of SearchBar component:
 * <SearchBar onSearch={handleSearch} />
 * 
 * @param {SearchBarProps} props - The props object containing the onSearch callback function.
 * @returns {JSX.Element} The rendered SearchBar component.
 * 
 * @remarks
 * This component displays an input field with a search icon. As the user types in the field, 
 * the `onSearch` callback is triggered with the current query value.
 * 
 * The component uses the `FiSearch` icon from the `react-icons` library and applies custom styles
 * using LESS.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    /**
     * Handles input changes in the search bar and triggers the `onSearch` callback with the input value.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by an input change.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.currentTarget.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                className="search-bar__input"
            />
            <FiSearch className="search-bar__icon" {...(undefined as any)} /> {/* Renders the search icon */}
        </div>
    );
};

// Exports the SearchBar component.
export default SearchBar;
