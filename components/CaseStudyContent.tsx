"use client";

interface CaseStudyContentProps {
  content: string;
}

// Simple markdown-to-HTML converter for MDX content
// In production, this uses next-mdx-remote for full MDX support
function renderMarkdown(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Code inline
    .replace(/`(.+?)`/g, "<code>$1</code>")
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre>$1</pre>")
    // Blockquote
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // HR
    .replace(/^---$/gm, "<hr />")
    // Table headers (simple)
    .replace(
      /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
      (_, header, rows) => {
        const headerCells = header
          .split("|")
          .filter(Boolean)
          .map((h: string) => `<th>${h.trim()}</th>`)
          .join("");
        const bodyRows = rows
          .trim()
          .split("\n")
          .map((row: string) => {
            const cells = row
              .split("|")
              .filter(Boolean)
              .map((c: string) => `<td>${c.trim()}</td>`)
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("");
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      }
    )
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Paragraphs (lines not starting with HTML tags)
    .replace(/^(?!<[a-z]|\s)(.+)$/gm, "<p>$1</p>")
    // Clean up
    .replace(/\n{3,}/g, "\n\n");

  return html;
}

export default function CaseStudyContent({ content }: CaseStudyContentProps) {
  const html = renderMarkdown(content);

  return (
    <div
      className="prose-custom case-study-body-content"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        "--table-border": "1px solid var(--border)",
      } as React.CSSProperties}
    />
  );
}
