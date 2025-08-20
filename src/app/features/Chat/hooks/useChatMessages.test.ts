import { renderHook, act, waitFor } from "@testing-library/react";
import useChatMessages from "@/app/features/Chat/hooks/useChatMessages";
import { polling, postMessage, type ChatMessage } from "@/app/data";

jest.mock("@/app/data", () => ({
  polling: jest.fn(),
  postMessage: jest.fn(),
}));

const pollingMock = polling as jest.MockedFunction<typeof polling>;
const postMessageMock = postMessage as jest.MockedFunction<typeof postMessage>;

const message = (overrides: Partial<ChatMessage> = {}): ChatMessage => ({
  _id: overrides._id ?? Math.random().toString(36).slice(2),
  message: overrides.message ?? "hello",
  author: overrides.author ?? "user",
  createdAt:
    overrides.createdAt ?? new Date("2024-01-01T00:00:00.000Z").toISOString(),
});

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_POLL_INTERVAL = "1000";
  process.env.NEXT_PUBLIC_API_LIMIT = "50";
  pollingMock.mockReturnValue(() => {});
});

describe("useChatMessages", () => {
  test("subscribes to polling and handles success", async () => {
    const { result } = renderHook(() => useChatMessages());

    const { onSuccess } = (pollingMock.mock.calls[0][0]) as {
        onSuccess: (msgs: ChatMessage[]) => void;
        onError?: (e: unknown) => void;
      };

    expect(pollingMock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);

    act(() => {
      onSuccess([
        message({ _id: "1", createdAt: "2024-01-01T00:00:00.000Z" }),
        message({ _id: "2", createdAt: "2024-01-02T00:00:00.000Z" }),
      ]);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.messages.map((m) => m._id)).toEqual(["1", "2"]);
  });

  test("deduplicates messages by _id", async () => {
    const m1 = message({ _id: "1" });
    const m2 = message({ _id: "2", createdAt: "2024-01-03T00:00:00.000Z" });

    const { result } = renderHook(() => useChatMessages());
    const { onSuccess } = (pollingMock.mock.calls[0][0]) as {
      onSuccess: (msgs: ChatMessage[]) => void;
    };

    act(() => {
      onSuccess([m1]);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.messages).toHaveLength(1);

    act(() => {
      onSuccess([m1, m2]);
    });

    await waitFor(() => expect(result.current.messages).toHaveLength(2));
    expect(result.current.messages.map((m) => m._id)).toEqual(["1", "2"]);
  });

  test("handles polling error and sets error state", async () => {
    const { result } = renderHook(() => useChatMessages());

    const { onError } = (pollingMock.mock.calls[0][0]) as {
      onError?: (e: unknown) => void;
    };
    expect(result.current.loading).toBe(true);

    act(() => {
      onError?.(new Error("error"));
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("error");
  });

  test("sendMessage appends new message and toggles loading", async () => {
    const newMsg = message({ _id: "n", message: "hi" });
    postMessageMock.mockResolvedValue(newMsg);

    const { result } = renderHook(() => useChatMessages());
    const { onSuccess } = (pollingMock.mock.calls[0][0]) as {
      onSuccess: (msgs: ChatMessage[]) => void;
    };

    act(() => {
      onSuccess([]);
    });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.sendMessage("hi");
    });

    expect(postMessageMock).toHaveBeenCalledWith("hi");
    expect(result.current.messages.at(-1)).toEqual(newMsg);
    expect(result.current.loading).toBe(false);
  });

  test("cleans up polling on unmount", () => {
    const stop = jest.fn();
    pollingMock.mockReturnValue(stop);

    const { unmount } = renderHook(() => useChatMessages());
    unmount();
    expect(stop).toHaveBeenCalledTimes(1);
  });
});
