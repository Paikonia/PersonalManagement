const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const {
  getAllTasks,
  getTaskById,
  insertTask,
  deleteTaskById,
  updateTask,
} = require("../QueryBuilders/tasksDatabaseCalls");

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    tasksId: { type: GraphQLID },
    task: { type: GraphQLString },
    taskDate: { type: GraphQLString },
    startingTime: { type: GraphQLString },
    complete: { type: GraphQLBoolean },
    estimatedDuration: { type: GraphQLInt },
    goalId: { type: GraphQLString },
    progress: { type: ProgressEnum },
  }),
});

const taskMutations = {
  addTask: {
    type: TaskType,
    args: {
      task: { type: GraphQLString },
      taskDate: { type: GraphQLString },
      startingTime: { type: GraphQLString },
      complete: { type: GraphQLBoolean },
      estimatedDuration: { type: GraphQLInt },
      goalId: { type: GraphQLString },
      progress: { type: ProgressEnum },
    },
    resolve: async (parent, args) => {
      return await insertTask(args);
    },
  },
  deleteTask: {
    type: TaskType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteTaskById(args.id);
    },
  },
  updateTask: {
    type: TaskType,
    args: {
      id: { type: GraphQLID },
      task: { type: GraphQLString },
      taskDate: { type: GraphQLString },
      startingTime: { type: GraphQLString },
      complete: { type: GraphQLBoolean },
      estimatedDuration: { type: GraphQLInt },
      goalId: { type: GraphQLString },
      progress: { type: ProgressEnum },
    },
    resolve: async (parent, args) => {
      return await updateTask(args.id, args);
    },
  },
};

const taskQueries = {
  tasks: {
    type: new GraphQLList(TaskType),
    resolve: async () => await getAllTasks(),
  },
  task: {
    type: TaskType,
    args: { id: { type: GraphQLInt } },
    resolve: async (parent, args) => await getTaskById(args.id),
  },
};


