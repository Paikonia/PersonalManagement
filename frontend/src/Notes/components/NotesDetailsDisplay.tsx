import { Card } from "../../Components/ui/card";
import Markdown from "react-markdown";

const NotesDetailsDisplay = ({ note }: { note: NotesType }) => {
  
  return (
    <Card className="w-full shadow-xl">
      <div className="flex w-full justify-between items-center px-2 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-bold capitalize">{note.title}</h1>
          <p className="text-slate-400 text-sm">{note.notePrivacy}</p>
        </div>
        <span className="text-slate-600 text-sm">
          {new Date(note.dateCreated).toISOString().split("T")[0]}
        </span>
      </div>
      <div className="px-2 border-1 border-black">
        <Markdown children={note.note || ""}></Markdown>
      </div>
    </Card>
  );
};

export default NotesDetailsDisplay;
