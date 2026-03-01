window.POSTS = [
  {
    title: "Replacing Sendbird with an In-house Chat Engine",
    slug: "replacing-sendbird-with-an-in-house-chat-engine",
    path: "blogs/replacing-sendbird-with-an-in-house-chat-engine.html",
    date: "2026-03-01",
    tags: ["go", "websocket", "redis", "backend"],
    summary:
      "We were paying $1,250/month for Sendbird on a job platform where users stay connected without sending messages. We built a custom Go + Redis + MongoDB chat engine and cut the bill to $233.",
  },
  {
    title: "The Stock Opname Page That Leaked Memory",
    slug: "the-stock-opname-page-that-leaked-memory",
    path: "blogs/the-stock-opname-page-that-leaked-memory.html",
    date: "2025-11-27",
    tags: ["web", "expo", "react"],
    summary:
      "A camera-driven stock opname flow kept mounting fresh streams and triggering needless React Query invalidations, slowly leaking memory.",
  },
  {
    title: "Why Database Transactions Nearly Broke Our API at Scale",
    slug: "why-database-transactions-nearly-broke-our-api-at-scale",
    path: "blogs/why-database-transactions-nearly-broke-our-api-at-scale.html",
    date: "2025-01-15",
    tags: ["api", "scaling", "backend", "go"],
    summary:
      "Starting transactions for every request crushed throughput and locked the database under load. Narrower scopes and better observability brought the API back.",
  },
];
