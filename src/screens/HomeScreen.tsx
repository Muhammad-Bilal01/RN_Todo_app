import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import TaskCard from '../components/TaskCard';

const HomeScreen = () => {
  const tasks = [
    {
      id: '1',
      title: 'Buy groceries',
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: '2',
      title: 'Walk the dog',
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: '3',
      title: 'Read a book',
      completed: true,
      createdAt: Date.now(),
    },
  ];

  const [taskList, setTaskList] = useState(tasks);
  const [taskTitle, setTaskTitle] = useState('');

  const handleOnAddTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: taskList.length + 1 + '',
        title: taskTitle,
        completed: false,
        createdAt: Date.now(),
      };
      setTaskList([newTask, ...taskList]);
    }
    setTaskTitle('');
  };

  const handleOnTaskToggle = (taskId: string) => {
    const updatedTasks = taskList.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const handleOnTaskDelete = (taskId: string) => {
    const updatedTasks = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTasks);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      {/* AppBar */}
      <View style={styles.appbar}>
        <Text style={styles.appTitle}>Task Manager</Text>
        <Text style={styles.appSubtitle}>Manage your tasks efficiently</Text>
      </View>

      {/* Input Box and add tasks button */}
      <View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter task title"
            style={styles.input}
            placeholderTextColor={COLORS.GRAY}
            onChangeText={text => setTaskTitle(text)}
            value={taskTitle}
          />
        </View>
        <PrimaryButton title={'Add Task'} onPress={handleOnAddTask} />
      </View>

      {taskList.length === 0 && (
        <View style={styles.emptyList}>
          <Text>No tasks available</Text>
        </View>
      )}

      {/* FlatList: Task Lists */}
      <FlatList
        data={taskList}
        keyExtractor={(item: { id: string }) => item.id}
        renderItem={({ item }: any) => (
          <TaskCard
            isCompleted={item.completed}
            title={item.title}
            onToggle={() => handleOnTaskToggle(item.id)}
            onDelete={() => handleOnTaskDelete(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  appbar: {
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  appSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.GRAY,
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLORS.GRAY,
    marginBottom: 12,
  },
  input: {
    color: COLORS.BLACK,
    fontWeight: '500',
    padding: 12,
    fontSize: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
