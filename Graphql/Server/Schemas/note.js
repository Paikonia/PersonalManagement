const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const {
  getAllNotes,
  getNoteById,
  insertNote,
  deleteNoteById,
  updateNote,
} = require("../QueryBuilders/notesDatabaseCalls");

const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    noteId: { type: GraphQLID },
    title: { type: GraphQLString },
    note: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    media: { type: GraphQLString }, // Assuming media is a JSON string
    notePrivacy: { type: PrivacyTypeEnum },
    creator: { type: GraphQLString },
  }),
});

const noteMutations = {
  addNote: {
    type: NoteType,
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      note: { type: GraphQLNonNull(GraphQLString) },
      media: { type: GraphQLString }, // Assuming media is a JSON string
      notePrivacy: { type: PrivacyTypeEnum },
    },
    resolve: async (parent, args) => {
      return await insertNote(args);
    },
  },
  deleteNote: {
    type: NoteType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteNoteById(args.id);
    },
  },
  updateNote: {
    type: NoteType,
    args: {
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      note: { type: GraphQLString },
      media: { type: GraphQLString }, // Assuming media is a JSON string
      notePrivacy: { type: PrivacyTypeEnum },
    },
    resolve: async (parent, args) => {
      return await updateNote(args.id, args);
    },
  },
};

const notesQueries = {
  Notes: {
    type: new GraphQLList(NoteType),
    resolve: async () => getAllNotes(),
  },
  Note: {
    type: NoteType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => await getNoteById(args.id),
  },
};
