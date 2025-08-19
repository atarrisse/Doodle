import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
    it("renders children", () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText("Click me")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(getByRole("button"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is true", () => {
        const { getByRole } = render(<Button disabled>Disabled</Button>);
        expect(getByRole("button")).toBeDisabled();
    });

    it("applies additional props", () => {
        const { getByRole } = render(<Button data-testid="my-btn">Test</Button>);
        expect(getByRole("button")).toHaveAttribute("data-testid", "my-btn");
    });
});