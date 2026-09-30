(() => {
  const source = document.getElementById("legal-source");
  const target = document.getElementById("legal-content");
  if (!source || !target) return;

  const lines = source.textContent.replace(/^\s+|\s+$/g, "").split(/\n/);
  let list = null;
  let paragraph = [];

  const flushList = () => {
    if (list) target.appendChild(list);
    list = null;
  };

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const node = document.createElement("p");
    node.textContent = paragraph.join(" ");
    target.appendChild(node);
    paragraph = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      flushList();
      const heading = document.createElement("h2");
      heading.textContent = line;
      target.appendChild(heading);
      return;
    }

    if (line.startsWith("• ")) {
      flushParagraph();
      if (!list) list = document.createElement("ul");
      const item = document.createElement("li");
      item.textContent = line.slice(2);
      list.appendChild(item);
      return;
    }

    if (["Apple App Store", "Google Play", "Virtual content:"].includes(line)) {
      flushParagraph();
      flushList();
      const heading = document.createElement("h3");
      heading.textContent = line;
      target.appendChild(heading);
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();
})();
