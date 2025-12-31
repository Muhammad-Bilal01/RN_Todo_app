import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectFilter = (
  _: RootState,
  filter: 'All' | 'Pending' | 'Completed',
) => filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    switch (filter) {
      case 'Pending':
        return tasks.filter(task => !task.completed);
      case 'Completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  },
);
