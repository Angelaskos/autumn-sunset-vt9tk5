import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Component for showing the search bar
 * @param onSelectStory Function that handles the selecting of a story
 */
const SearchBar = ({ onSelectStory }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch stories based on the current query
  const fetchStories = async (searchTerm) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchTerm}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      // Check if data has the required structure
      if (!data || !Array.isArray(data.hits)) {
        throw new Error('Invalid data structure');
      }

      // Filter the response to only include needed fields
      const filteredStories = data.hits.map((story) => ({
        title: story.title,
        author: story.author,
        num_comments: story.num_comments,
        points: story.points,
        objectID: story.objectID,
      }));
      setSuggestions(filteredStories);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories. Please try again.');
      setSuggestions([]); // Clear suggestions if there's an error
    } finally {
      setLoading(false);
    }
  };

  // useEffect to trigger fetch when the query length is 3 or more
  useEffect(() => {
    // Check if the query length is less than 3
    if (query.length < 3) {
      setSuggestions([]);
      setIsDropdownVisible(false);
      return; // Early exit if the query is too short
    }

    // Set a timeout for fetching stories
    const handler = setTimeout(() => {
      fetchStories(query); // Call the API after 300ms of inactivity
    }, 300);

    // Cleanup function to clear the timeout if the component unmounts or query changes
    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Handle input change and update the query state
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle story selection
  const handleSelectSuggestion = (story) => {
    onSelectStory(story);
    setIsDropdownVisible(false);
    setQuery(''); // Clear input after selection
  };

  const highlightSearchTerm = (title) => {
    // early exit when given no query or title
    if (!query || !title) return title;

    const regex = new RegExp(`(${query})`, 'gi'); // global and case insensitive
    const parts = title.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : part
    );
  };

  return (
    <div className="search-bar">
      {loading && <p>Loading...</p>}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Hacker News stories..."
        disabled={loading} // Disable input during loading
      />
      {error && <p className="error-msg">{error}</p>}
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((story) => (
            <li
              key={story.objectID}
              className="suggestion"
              onClick={() => handleSelectSuggestion(story)}
            >
              {highlightSearchTerm(story.title)}
              <p className="story-meta">
                {story.points} points | by {story.author} | {story.num_comments} comments
              </p>
            </li>
          ))}
        </ul>
      )}
      {isDropdownVisible && suggestions.length === 0 && query.length >= 3 && (
        <p className="no-results">No matching results.</p>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSelectStory: PropTypes.func.isRequired,
};

export default SearchBar;
