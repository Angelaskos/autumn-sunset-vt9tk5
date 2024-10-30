import React from "react";
import { render, screen } from "@testing-library/react";
import StoryList from "./StoryList";

test("renders empty saved stories message", () => {
  render(<StoryList savedStories={[]} handleRemoveStory={() => {}} />);
  expect(screen.getByText(/No stories saved yet./i)).toBeInTheDocument();
});

test("renders a saved story", () => {
  const savedStories = [
    {
      title: "Test Story",
      author: "Author",
      points: 100,
      num_comments: 20,
      objectID: "1",
    },
  ];
  render(
    <StoryList savedStories={savedStories} handleRemoveStory={() => {}} />
  );
  expect(screen.getByText(/Test Story/i)).toBeInTheDocument();
  expect(screen.getByText(/100 points/i)).toBeInTheDocument();
  expect(screen.getByText(/by Author/i)).toBeInTheDocument();
});
