import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import App from "./App";

it("should add item", () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Add an item")).toBeVisible();

  fireEvent.change(screen.getByPlaceholderText("Add an item"), {
    target: { value: "abc" }
  });
  fireEvent.change(screen.getByPlaceholderText("Amount"), {
    target: { value: "123" }
  });
  fireEvent.click(screen.getByText("add"));
  expect(screen.getByText("abc")).toBeVisible();
  expect(screen.getByText(/123/)).toBeVisible();
});