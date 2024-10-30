import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  expect(screen.getByText("Hacker News Search")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
  expect(screen.getByText("Saved Stories")).toBeInTheDocument();
});
