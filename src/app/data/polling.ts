import { ChatMessage } from "@/app/data";

type PollOptions = {
  pollIntervalMs?: number;
  limit?: number;
  after?: string;
  before?: string;
  onSuccess: (messages: ChatMessage[]) => void;
  onError?: (err: unknown) => void;
};

const polling = ({
  pollIntervalMs = 2000,
  limit = 50,
  after: _after,
  before,
  onSuccess,
  onError,
}: PollOptions) => {
  let after: string | undefined = _after;
  let isStopped = false;

  const fetchOnce = async () => {
    if (isStopped) return;
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
      if (limit) url.searchParams.set("limit", String(limit));
      if (after) url.searchParams.set("after", after);
      else if (before) url.searchParams.set("before", before);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ChatMessage[] = await res.json();
      if (isStopped) return;

      if (Array.isArray(data) && data.length > 0) {
        onSuccess(data);
        after = data
          .map((m) => m.createdAt)
          .sort()
          .at(-1)!; // advance cursor
      }
    } catch (err) {
      if (!isStopped && onError) onError(err);
    }
  };

  void fetchOnce();
  const id = setInterval(fetchOnce, pollIntervalMs);

  return () => {
    isStopped = true;
    clearInterval(id);
  };
};

export { polling };
