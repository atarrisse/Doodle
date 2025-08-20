import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import ChatForm from "./ChatForm";

const sendMessageMock = jest.fn();
jest.mock("@/app/features/Chat/hooks/useChatMessages", () => ({
  __esModule: true,
  default: () => ({
    sendMessage: sendMessageMock,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ChatForm", () => {
  it("renders input and disabled send button initially", () => {
    const { getByRole } = render(<ChatForm />);
    const input = getByRole("textbox");
    const button = getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("enables button when text is entered", () => {
    const { getByRole } = render(<ChatForm />);
    const input = getByRole("textbox");
    const button = getByRole("button");

    expect(button).toBeDisabled();
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(button).not.toBeDisabled();
  });

  it("disables input while sending", async () => {
    const { getByRole } = render(<ChatForm />);
    const input = getByRole("textbox");
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "Hello" } });

    let resolveSend: (value?: unknown) => void = () => {};
    sendMessageMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSend = resolve;
        })
    );

    fireEvent.click(button);

    expect(sendMessageMock).toHaveBeenCalledWith("Hello");
    expect(input).toBeDisabled();

    await act(async () => {
      resolveSend();
    });

    expect(input).not.toBeDisabled();
  });

  it("does not send when message is only whitespace", async () => {
    const { getByRole } = render(<ChatForm />);
    const input = getByRole("textbox") as HTMLInputElement;
    const button = getByRole("button");

    fireEvent.change(input, { target: { value: "   " } });
    expect(button).toBeDisabled();

    // Force form submission via Enter key even though button is disabled
    fireEvent.submit(button.closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(sendMessageMock).not.toHaveBeenCalled();
      expect(input.value).toBe("   ");
      expect(button).toBeDisabled();
    });
  });

  it("submits message and clears input", async () => {
    const { getByRole } = render(<ChatForm />);
    const input = getByRole("textbox") as HTMLInputElement;
    const button = getByRole("button");

    // Type a message to enable submission
    fireEvent.change(input, { target: { value: "Hello" } });

    let resolveSend: (value?: unknown) => void = () => {};
    sendMessageMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSend = resolve;
        })
    );

    // Submit the form
    fireEvent.click(button);

    expect(sendMessageMock).toHaveBeenCalledWith("Hello");

    await act(async () => {
      resolveSend();
    });

    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(input.value).toBe("");
      expect(button).toBeDisabled();
    });
  });
});
