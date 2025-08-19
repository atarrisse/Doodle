import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ChatBubble from ".";

describe("ChatBubble", () => {
  it("renders author", () => {
    const { container } = render(
      <ChatBubble message="Hello" createdAt="2025-08-18T09:45:51.182Z" />
    );
    const author = container.querySelector("cite");
    expect(author?.className).toContain("sr-only");
  });

  it("doesn't render author", () => {
    const { container } = render(
      <ChatBubble
        author="Someone"
        message="Hello"
        createdAt="2025-08-18T09:45:51.182Z"
      />
    );
    const author = container.querySelector("cite");
    expect(author?.className).not.toContain("sr-only");
  });

  it("formats date", () => {
    // TODO
  })
});
