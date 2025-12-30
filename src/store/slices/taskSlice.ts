import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.unshift({
        id: state.tasks.length + 1 + '',
        title: action.payload,
        completed: false,
        createdAt: Date.now(),
      });
    },

    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskComplete, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
