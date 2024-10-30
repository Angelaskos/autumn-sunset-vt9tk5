import React, { useState } from 'react';
import SearchBar from './SearchBar';
import StoryList from './StoryList';
import './style.css';

/**
 * Main App component
 */
const App = () => {
  const [savedStories, setSavedStories] = useState([]);

  // Function that checks if a story is already saved before updating the saved stories
  const handleSelectStory = (story) => {
    setSavedStories((prevStories) => 
      prevStories.some(s => s.objectID === story.objectID) 
        ? prevStories // Return existing saved stories if already present
        : [...prevStories, story] // Otherwise, add the new story
    );
  };

  // Function that removes given story from saved 
  const handleRemoveStory = (storyID) => {
    setSavedStories((prevStories) => prevStories.filter(story => story.objectID !== storyID));
  };

  return (
    <div className="container">
      <h1>Hacker News Search</h1>
      <h3>Search</h3>
      <SearchBar onSelectStory={handleSelectStory} />
      <h2>Saved Stories</h2>
      <StoryList savedStories={savedStories} handleRemoveStory={handleRemoveStory} />
    </div>
  );
};

export default App;
