import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTasks } from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    // add reducers here
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistence: load tasks from AsyncStorage on startup and save on changes.
const TASKS_STORAGE_KEY = 'TASKS';

(async () => {
  try {
    const json = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (json) {
      const tasks = JSON.parse(json);
      // populate store with persisted tasks
      store.dispatch(setTasks(tasks));
    }
  } catch (e: unknown) {
    // non-fatal: log and continue
    console.warn('Failed to load tasks from storage', e);
  }

  // subscribe to store changes and persist tasks (simple, no debounce)
  let prevTasks = store.getState().tasks.tasks;
  store.subscribe(() => {
    const currentTasks = store.getState().tasks.tasks;
    if (prevTasks !== currentTasks) {
      prevTasks = currentTasks;
      AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(currentTasks),
      ).catch((e: unknown) => {
        console.warn('Failed to save tasks to storage', e);
      });
    }
  });
})();
