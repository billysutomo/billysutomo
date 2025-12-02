(() => {
  const posts = (window.POSTS || []).slice();
  const logList = document.getElementById("log-list");
  const feedList = document.getElementById("feed-list");

  if (!feedList) return;

  const formatDate = (iso) => {
    const date = new Date(iso);
    const month = date.toLocaleString("en", { month: "short" });
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const renderLogs = (list) => {
    if (!logList) return;
    logList.innerHTML = "";
    const latest = list.slice(0, 2);
    latest.forEach((post) => {
      const item = document.createElement("a");
      item.className = "log-item";
      item.href = post.path;

      const title = document.createElement("span");
      title.className = "log-title";
      title.textContent = post.title;

      const meta = document.createElement("span");
      meta.className = "log-meta";
      meta.textContent = `${formatDate(post.date)} — ${post.tags.join(" / ")}`;

      item.append(title, meta);
      logList.appendChild(item);
    });

    if (!latest.length) {
      logList.innerHTML =
        '<p class="muted">No posts yet. Add one in posts.js.</p>';
    }
  };

  const renderFeed = (list) => {
    feedList.innerHTML = "";

    list.forEach((post) => {
      const article = document.createElement("article");
      article.className = "feed-item";

      const metaRow = document.createElement("div");
      metaRow.className = "feed-meta";

      const date = document.createElement("span");
      date.className = "post-date";
      date.textContent = formatDate(post.date);

      const tags = document.createElement("div");
      tags.className = "post-tags";
      post.tags.forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "tag-pill";
        pill.textContent = tag;
        tags.appendChild(pill);
      });

      metaRow.append(date, tags);

      const title = document.createElement("a");
      title.className = "feed-title";
      title.href = post.path;
      title.textContent = post.title;

      const excerpt = document.createElement("p");
      excerpt.className = "feed-excerpt";
      excerpt.textContent = post.summary;

      const link = document.createElement("a");
      link.className = "inline-link";
      link.href = post.path;
      link.textContent = "Open →";

      article.append(metaRow, title, excerpt, link);
      feedList.appendChild(article);
    });

    if (!list.length) {
      feedList.innerHTML =
        '<div class="feed-item"><p class="muted">No posts yet.</p></div>';
    }
  };

  const sorted = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (logList) renderLogs(sorted);
  renderFeed(sorted);
})();
