import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ChatBubble from ".";

describe("ChatBubble", () => {
  it("renders sender", () => {
    const { container } = render(
      <ChatBubble message="Hello" timestamp="9999" />
    );
    const sender = container.querySelector("cite");
    expect(sender?.className).toContain("sr-only");
  });

  it("doesn't render sender", () => {
    const { container } = render(
      <ChatBubble sender="Someone" message="Hello" timestamp="9999" />
    );
    const sender = container.querySelector("cite");
    expect(sender?.className).not.toContain("sr-only");
  });
});
