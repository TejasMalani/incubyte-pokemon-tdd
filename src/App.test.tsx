import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./App";

test("renders pokemon list page", () => {
    render(<App />);
    expect(screen.getByText(/Pokemon List Page/i)).toBeInTheDocument();
});