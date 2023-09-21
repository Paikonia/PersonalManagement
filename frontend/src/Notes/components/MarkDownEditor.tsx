import React, { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState<string>(""); // State to store the Markdown text

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div>
      <h1>Markdown Editor</h1>
      <div>
        <textarea
          rows={10}
          cols={50}
          placeholder="Type your Markdown here..."
          value={markdownText}
          onChange={handleTextChange}
        />
      </div>
      <div>
        <h2>Preview:</h2>
        <div>
          <ReactMarkdown  >{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
