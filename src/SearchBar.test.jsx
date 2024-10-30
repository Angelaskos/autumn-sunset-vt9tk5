import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import SearchBar from "./SearchBar";

test("renders search input", () => {
  const onSelectStory = jest.fn();
  render(<SearchBar onSelectStory={onSelectStory} />);
  const input = screen.getByPlaceholderText(/Search Hacker News stories.../i);
  expect(input).toBeInTheDocument();
});

test("calls fetch on typing query", () => {
  const onSelectStory = jest.fn();
  render(<SearchBar onSelectStory={onSelectStory} />);
  const input = screen.getByPlaceholderText(/Search Hacker News stories.../i);
  fireEvent.change(input, { target: { value: "react" } });
  expect(input.value).toBe("react");
});
