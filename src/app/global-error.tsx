"use client";

// This boundary replaces the root layout entirely when it errors, so it
// renders its own <html>/<body> and avoids depending on anything that
// could itself be the source of the failure.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .ge-root { background: #fbfaf7; color: #241f18; }
          .ge-muted { color: #6b5f4d; }
          .ge-button { border-color: #241f18; }
          @media (prefers-color-scheme: dark) {
            .ge-root { background: #17140f; color: #ede7db; }
            .ge-muted { color: #b3a891; }
            .ge-button { border-color: #ede7db; }
          }
        `}</style>
      </head>
      <body
        className="ge-root"
        style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}
      >
        <p className="ge-muted" style={{ fontFamily: "monospace" }}>
          Error
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: "0.5rem" }}>
          Something went wrong
        </h1>
        <p className="ge-muted" style={{ marginTop: "0.75rem" }}>
          {error.digest ? `Reference: ${error.digest}` : "Please refresh the page."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="ge-button"
          style={{ marginTop: "1.5rem", padding: "0.5rem 1.5rem", border: "1px solid" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
