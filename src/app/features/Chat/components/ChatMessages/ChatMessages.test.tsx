import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import ChatMessages from ".";

import type { ChatMessage } from "@/app/data";

type MockReturn = {
  messages: ChatMessage[];
  loading: boolean;
  error: Error | null;
  sendMessage: jest.Mock;
};

let mockReturn: MockReturn;

jest.mock("@/app/features/Chat/hooks/useChatMessages", () => ({
  __esModule: true,
  default: () => mockReturn,
}));

beforeEach(() => {
  mockReturn = {
    messages: [],
    loading: false,
    error: null,
    sendMessage: jest.fn(),
  };
  jest.clearAllMocks();
});

describe("ChatMessages", () => {
  it("renders loading state", () => {
    mockReturn.loading = true;

    const { getByText } = render(<ChatMessages />);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockReturn.error = new Error("Oops");

    const { getByText } = render(<ChatMessages />);
    expect(getByText("Apologies, there was an error")).toBeInTheDocument();
  });

  it("does not render a list when there are no messages", () => {
    mockReturn.messages = [];

    const { queryByRole } = render(<ChatMessages />);
    expect(queryByRole("list")).toBeNull();
  });

  it("renders a list of chat messages", () => {
    const baseTime = new Date("2025-08-18T09:45:51.182Z").toISOString();
    mockReturn.messages = [
      {
        _id: "1",
        message: "Hello",
        author: "Alice",
        createdAt: baseTime,
      },
      {
        _id: "2",
        message: "World",
        author: "Bob",
        createdAt: baseTime,
      },
    ];

    const { getByRole, getAllByRole, getByText } = render(<ChatMessages />);

    expect(getByRole("list")).toBeInTheDocument();
    expect(getAllByRole("listitem")).toHaveLength(2);
    expect(getByText("Hello")).toBeInTheDocument();
    expect(getByText("World")).toBeInTheDocument();
  });
});


