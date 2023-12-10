
import EditDeleteButtons from "../../Components/EditDeleteButtons";
import { Card } from "../../Components/ui/card";
import useFetch from "../../utils/fetch";
import { useNavigate } from "react-router-dom";

interface DisplayNotesProps {
  displayClick: (id: number) => void;
  noteId:string;
  title:string;
  dateCreated:string;
}

const NotesDisplay = ({
  noteId,
  title,
  dateCreated,
  displayClick,
}: DisplayNotesProps) => {
  const fetch = useFetch();
  const onDeleteNoteClick = async () => {
    await fetch('/notes', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({noteIds: [noteId]}),
    })
    window.location.reload()
  };
  const navigate = useNavigate()
  const onEditNoteClick = () => {
    navigate(`compose?ei=${noteId}`, { state: [noteId] });
  };
  return (
    <Card
      onClick={() => {
        displayClick(Number(noteId));
      }}
      className="border-2 hover:bg-slate-200 overflow-hidden rounded-xl p-2 flex  mb-4 justify-between"
    >
      <div className="flex w-10/12 sm:w-10/12 md:w-11/12 xl:w-5/6 px-1 py-0 left-0 justify-start items-center">
        <input
          type="checkbox"
          className="mx-1"
          name={String(noteId)}
          id={String(noteId)}
        />
        <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">{title}</p>
        <h3 className="mr-2">
          {
            new Date(dateCreated?.toString() as string)
              .toISOString()
              .split("T")[0]
          }
        </h3>
      </div>
      <EditDeleteButtons
        editHandler={onEditNoteClick}
        deleteHandler={onDeleteNoteClick}
      />
    </Card>
  );
};

export default NotesDisplay;
