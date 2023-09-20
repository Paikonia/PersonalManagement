export interface PartialNoteType {
  noteId: number;
  title: string;
  dateCreated: Date | null;
}

export interface NotesType extends PartialNoteType {
  note: string | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}


