import { Note } from './NoteStore';

export const debugNotes: Omit<Note, 'id' | 'contentSize'>[] = [
  {
    title: "Markdown Basics: Line Breaks & Paragraphs",
    content: `In Markdown, you create a new paragraph by leaving a blank line between blocks of text.

If you want to force a line break without starting a new paragraph, you can add a backslash ( \\ ) at the end of a line, like this:

Example: \\
This is the first line.\\
This is the second line on a new line.
`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Headings",
    content: `Use the hash symbol (#) at the start of a line to create headings. The number of hash marks determines the heading level:

# This is a large heading (H1)
## This is a medium heading (H2)
### This is a smaller heading (H3)
#### This is even smaller (H4)
##### This is quite small (H5)
###### This is the smallest heading (H6)

Headings help organize your notes and make them easier to scan.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Emphasis (Italics & Bold)",
    content: `Use a single asterisk (*) or underscore (_) around a word or phrase to make it *italic*. Use double asterisks (**) or double underscores (__) to make it **bold**. You can also combine them.

Examples:
*This text is italic.*
_This text is also italic._

**This text is bold.**
__This text is also bold.__

***You can even combine bold and italics.***
`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Bullet Points",
    content: `Create bullet lists (unordered lists) by placing a dash (-), plus (+), or asterisk (*) at the beginning of a line, followed by a space.

Example with dash:
- First item
- Second item
- Third item

Example with plus:
+ You can also use plus signs
+ Like this

Example with asterisk:
* Or even asterisks
* Like this

All three symbols work equally well for bulleted lists.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Numbered Lists",
    content: `For ordered (numbered) lists, just type the number followed by a period, then a space.

Example:
1. First item
2. Second item
3. Third item

The numbers will automatically format in most Markdown renderers.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Nested Lists",
    content: `You can create nested lists by indenting your list items with two or four spaces.

Example:
- Fruit
  - Apples
  - Oranges
- Vegetables
  - Carrots
  - Broccoli

This helps you organize items in a hierarchical way.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Code Blocks & Inline Code",
    content: `Inline code is used for short code snippets. Surround the text with backticks (\`).

Example:
Use \`console.log()\` to print messages in JavaScript.

For longer code, use triple backticks before and after your code block:

\`\`\`
function greet(name) {
  return "Hello, " + name;
  }
console.log(greet("World"));
\`\`\`

This makes your code more readable and preserves formatting.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Blockquotes",
    content: `To create a blockquote, start a line with the greater-than symbol (>).

Example:
> This is a blockquote.
>
> You can make multiple lines in a blockquote by starting each line with >.

Blockquotes are often used to highlight quotes or important information.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Horizontal Rules",
    content: `You can create a horizontal rule (a line divider) by typing three or more dashes (---), asterisks (***), or underscores (___) on a line by themselves.

Example:
This is text above the line
***
This is text below the line
`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Escaping Special Characters",
    content: `If you need to show a literal character that Markdown normally interprets (like * or #), place a backslash (\\) before it to "escape" the character.

Example: \\
\\*This text will not be italic.* \\
\\# This is not a heading.

Escaping ensures your text stays as raw text instead of being formatted.`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Markdown Basics: Putting It All Together",
    content: `When creating Neuronika notes or any Markdown content, you can combine all these features for rich formatting.

For example:
# My Formatted Note

Hello, **Neuronika** world!\\
This line is force-broken.

## Bullet Points
- First item
- Second item

## Code Example
\`\`\`python
def hello():
  print("Hello, World!")
\`\`\`

> A blockquote can emphasize important info.

---
Don't forget to try out links, images, tables, and more for an even richer note experience!
`,
    tags: ["Markdown", "Formatting"]
  },
  {
    title: "Using Neuronika: AutoFormatting",
    content: ` To use Neuronika's auto-formatting feature, simply type your text and press space bar to allow the app to apply the formatting.
`,
    tags: ["Neuronika", "AutoFormatting"]
  },
  {
    title: "Using Neuronika: Taking Notes",
    content: ` Double click the title of the note card to edit the title. Double click the content of the note card to edit the content.
`,
    tags: ["Neuronika", "Editing"]
  },
  {
    title: "Using Neuronika: Resizing and Dragging Notes",
    content: ` Hold and drag the sides or the corners of the note card to resize it. To move the note card, click and drag it to the desired location.
`,
    tags: ["Neuronika", "Resizing"]
  }
];
