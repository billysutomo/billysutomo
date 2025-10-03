class TerminalBlog {
  constructor() {
    this.data = null;
    this.currentPath = "~/blog";
    this.commandHistory = [];
    this.historyIndex = -1;
    this.posts = [
      {
        id: "posts/why-database-transactions-nearly-broke-our-api-at-scale",
        filename: "why-database-transactions-nearly-broke-our-api-at-scale.md",
        title: "Why Database Transactions Nearly Broke Our API at Scale",
        permissions: "rw-r--r--",
        owner: "billy",
        group: "eng",
        size: "4.2K",
        modified: "Jan 15 14:30",
        meta: { readTime: "5 min read", category: "backend", featured: false },
        tags: ["api", "scaling", "backend", "nodejs", "production"],
        excerpt:
          "Scaling from 100 to 40,000 requests per minute, our biggest bottleneck wasn’t servers but database transactions. Fixing them cut response times by 60% and eliminated errors.",
      },
    ];

    this.user = {
      username: "billy",
      home: "/Users/billy",
      shell: "/bin/zsh",
      lastLogin: "Mon Jan 20 10:30:42 2024",
      profile: {
        name: "Billy Sutomo",
        role: "Software Engineer",
        location: "Remote / Indonesia",
        timezone: "Asia/Jakarta (UTC+7)",
        bio: "Building scalable systems and sharing what I learn along the way.",
        languages: [],
        platforms: [],
        contact: {
          email: "billysutomo.53@gmail.com",
          github: "github.com/billysutomo",
          linkedin: "linkedin.com/in/billysutomo",
        },
      },
    };

    this.init();
  }

  async init() {
    this.setupTerminal();
    this.showWelcome();
  }

  setupTerminal() {
    const terminal = document.getElementById("terminal");
    if (!terminal) return;

    terminal.innerHTML = `
      <div id="terminal-output"></div>
      <div class="terminal-input-line">
        <span class="prompt">billy@sutomo:~/blog$ </span>
        <input type="text" id="terminal-input" autocomplete="off" spellcheck="false">
        <span class="cursor">█</span>
      </div>
    `;

    const input = document.getElementById("terminal-input");
    input.addEventListener("keydown", (e) => this.handleKeypress(e));
    input.focus();

    // Keep focus on input
    document.addEventListener("click", () => input.focus());
  }

  handleKeypress(e) {
    const input = e.target;

    if (e.key === "Enter") {
      const command = input.value.trim();
      if (command) {
        this.executeCommand(command);
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
      }
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        input.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        input.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        input.value = "";
      }
    }
  }

  executeCommand(command) {
    this.addOutput(`billy@sutomo:~/blog$ ${command}`);

    const [cmd, ...args] = command.split(" ");
    const arg = args.join(" ");

    // Handle aliases
    const aliases = {
      ll: "ls -la",
      la: "ls -la",
      posts: "ls -la",
      about: "finger billy",
      contact: "cat ~/.contact",
      skills: "cat ~/.profile",
    };

    const actualCmd = aliases[cmd] || cmd;

    switch (actualCmd) {
      case "ls":
      case "ls -la":
        this.listPosts(args);
        break;
      case "cat":
        this.catFile(arg);
        break;
      case "whoami":
        this.whoami();
        break;
      case "finger":
        this.finger(arg);
        break;
      case "pwd":
        this.pwd();
        break;
      case "date":
        this.date();
        break;
      case "uptime":
        this.uptime();
        break;
      case "df":
        this.diskUsage();
        break;
      case "ps":
        this.processes();
        break;
      case "env":
        this.environment();
        break;
      case "history":
        this.history();
        break;
      case "clear":
        this.clear();
        break;
      case "help":
        this.help();
        break;
      case "cat ~/.contact":
        this.showContact();
        break;
      case "cat ~/.profile":
        this.showProfile();
        break;
      default:
        this.commandNotFound(cmd);
    }
  }

  listPosts(args) {
    const isLongFormat = args.includes("-la") || args.includes("-l");

    if (isLongFormat) {
      this.addOutput(`total ${this.posts.length}`);
      this.posts.forEach((post) => {
        const featured = post.meta.featured ? "*" : " ";
        this.addOutput(
          `${post.permissions} 1 ${post.owner} ${post.group} ${post.size.padStart(6)} ${post.modified} ${post.filename}${featured}`,
          "file-line clickable",
          () => this.openPost(post.id),
        );
      });
    } else {
      const filenames = this.posts.map((p) => p.filename).join("  ");
      this.addOutput(filenames);
    }
  }

  catFile(filename) {
    if (!filename) {
      this.addOutput("cat: missing file operand");
      return;
    }

    const post = this.posts.find(
      (p) => p.filename === filename || p.id === filename,
    );
    if (post) {
      this.openPost(post.id);
    } else {
      this.addOutput(`cat: ${filename}: No such file or directory`);
    }
  }

  whoami() {
    this.addOutput(this.user.username);
  }

  finger(username = "billy") {
    const user = this.user;
    this.addOutput(
      `Login: ${user.username}           Name: ${user.profile.name}`,
    );
    this.addOutput(`Directory: ${user.home}        Shell: ${user.shell}`);
    this.addOutput(`Last login: ${user.lastLogin}`);
    this.addOutput(`Role: ${user.profile.role}`);
    this.addOutput(`Location: ${user.profile.location}`);
    this.addOutput("");
    this.addOutput("Languages: " + user.profile.languages.join(", "));
    this.addOutput("Platforms: " + user.profile.platforms.join(", "));
    this.addOutput("");
    this.addOutput(user.profile.bio);
  }

  pwd() {
    this.addOutput(this.currentPath);
  }

  date() {
    this.addOutput(new Date().toString());
  }

  uptime() {
    const uptime = Math.floor(Math.random() * 10) + 1;
    this.addOutput(
      `up ${uptime} days, 12 hours, 1 user, load averages: 0.52 0.47 0.43`,
    );
  }

  diskUsage() {
    this.addOutput("Filesystem     Size  Used Avail Use% Mounted on");
    this.addOutput("/dev/blog      100M   28M   72M  28% /blog");
  }

  processes() {
    this.addOutput("  PID TTY           TIME CMD");
    this.addOutput("  501 ttys000    0:00.12 -zsh");
    this.addOutput("  502 ttys000    0:01.34 node blog.js");
    this.addOutput("  503 ttys000    0:00.08 git status");
  }

  environment() {
    const env = {
      USER: this.user.username,
      HOME: this.user.home,
      SHELL: this.user.shell,
      PATH: "/usr/local/bin:/usr/bin:/bin",
      BLOG_AUTHOR: this.user.profile.name,
      BLOG_ROLE: this.user.profile.role,
      TZ: this.user.profile.timezone.split(" ")[0],
    };

    Object.entries(env).forEach(([key, value]) => {
      this.addOutput(`${key}=${value}`);
    });
  }

  history() {
    this.commandHistory.forEach((cmd, index) => {
      this.addOutput(`${index + 1}  ${cmd}`);
    });
  }

  clear() {
    document.getElementById("terminal-output").innerHTML = "";
  }

  help() {
    this.addOutput("Available commands:");
    this.addOutput("");
    this.addOutput("  ls           List blog posts");
    this.addOutput("  ls -la       List posts with details");
    this.addOutput("  cat <file>   Read a blog post");
    this.addOutput("  whoami       Show user info");
    this.addOutput("  finger       Show detailed user profile");
    this.addOutput("  pwd          Show current directory");
    this.addOutput("  date         Show current date/time");
    this.addOutput("  uptime       Show blog uptime");
    this.addOutput("  df           Show disk usage");
    this.addOutput("  ps           Show running processes");
    this.addOutput("  env          Show environment variables");
    this.addOutput("  history      Show command history");
    this.addOutput("  clear        Clear terminal");
    this.addOutput("  help         Show available commands");
    this.addOutput("");
    this.addOutput("Aliases:");
    this.addOutput("  ll, la       ls -la");
    this.addOutput("  posts        ls -la");
    this.addOutput("  about        finger billy");
    this.addOutput("  contact      cat ~/.contact");
    this.addOutput("  skills       cat ~/.profile");
  }

  showContact() {
    const contact = this.user.profile.contact;
    this.addOutput("# Contact Information");
    this.addOutput("");
    Object.entries(contact).forEach(([key, value]) => {
      this.addOutput(`${key}: ${value}`);
    });
  }

  showProfile() {
    const profile = this.user.profile;
    this.addOutput("# Billy Sutomo - Software Engineer");
    this.addOutput("");
    this.addOutput(`export ROLE="${profile.role}"`);
    this.addOutput(`export LOCATION="${profile.location}"`);
    this.addOutput(
      `export LANGUAGES=(${profile.languages.map((l) => `"${l}"`).join(" ")})`,
    );
    this.addOutput(
      `export PLATFORMS=(${profile.platforms.map((p) => `"${p}"`).join(" ")})`,
    );
    this.addOutput("");
    this.addOutput(`# ${profile.bio}`);
  }

  commandNotFound(cmd) {
    this.addOutput(`zsh: command not found: ${cmd}`);
  }

  showWelcome() {
    this.addOutput("Welcome to Billy's Engineering Blog");
    this.addOutput(`Last login: ${this.user.lastLogin} on ttys000`);
    this.addOutput("");
    this.addOutput('Type "help" for available commands, "ls -la" to see posts');
    this.addOutput('Click on any file to read it, or use "cat filename.md"');
    this.addOutput("");
  }

  addOutput(text, className = "", onClick = null) {
    const output = document.getElementById("terminal-output");
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`;
    line.textContent = text;

    if (onClick) {
      line.style.cursor = "pointer";
      line.addEventListener("click", onClick);
    }

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  openPost(postId) {
    // Navigate to post page
    window.location.href = `${postId}.html`;
  }
}

// Initialize terminal when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.terminal = new TerminalBlog();
});
