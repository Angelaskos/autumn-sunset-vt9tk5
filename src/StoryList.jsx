import React from "react";
import PropTypes from "prop-types";

/**
 * Component for showing the list of saved stories
 * @param savedStories The list of saved stories
 * @param handleRemoveStory Function that handles the removing of a story from the saved
 */
const StoryList = ({ savedStories, handleRemoveStory }) => (
  <div className="saved-list">
    {savedStories.length > 0 ? (
      <ul>
        {savedStories.map((story) => (
          <li key={story.objectID} className="saved-item">
            <div className="story-info">
              <p className="story-title">{story.title}</p>
              <p className="story-meta">
                {story.points} points | by {story.author} | {story.num_comments}{" "}
                comments
              </p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleRemoveStory(story.objectID)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No stories saved yet.</p>
    )}
  </div>
);

StoryList.propTypes = {
  savedStories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      num_comments: PropTypes.number.isRequired,
      objectID: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleRemoveStory: PropTypes.func.isRequired,
};

export default StoryList;
