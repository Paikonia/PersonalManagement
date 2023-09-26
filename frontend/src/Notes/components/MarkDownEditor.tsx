import { Button } from "../../Components/ui/button";
import LabelledInput from "../../Components/LabelledInput";
import { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import useFetch from "../../utils/fetch";

type MarkDownEditorProps = {
  changeToDisplay: () => void
};

const MarkdownEditor = ({ changeToDisplay }: MarkDownEditorProps) => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("private");
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const fetch = useFetch();

  const subimitNote = async () => {
    await fetch("/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([
        {
          title,
          note: markdownText,
          notePrivacy: privacy,
          media: []
        },
      ]),
    });
    changeToDisplay()
  };

  return (
    <div>
      <div>
        <LabelledInput
          label="Title"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="py-2 px-2 mx-2">
          <select
            id="privace"
            name="notePrivacy"
            value={privacy}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
            className="w-full mx-2 px-2 py-4"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
      </div>

      <div className="w-full p-2 mx-4 lg:grid lg:grid-cols-2 gap-2">
        <div className="w-full mb-4 ">
          <h1>Markdown Editor</h1>
          <textarea
            rows={10}
            cols={50}
            placeholder="Type your Markdown here..."
            value={markdownText}
            onChange={handleTextChange}
            className="w-full"
          />
        </div>
        <div className="w-full border-black border-2 rounded-sm">
          <h2>Preview:</h2>
          <div>
            <ReactMarkdown
              children={markdownText}
              className="w-full p-4"
            ></ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="flex  mt-4">
        <Button onClick={subimitNote} className="w-full mx-2">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
