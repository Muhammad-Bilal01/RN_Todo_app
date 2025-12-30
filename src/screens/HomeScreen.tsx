import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import TaskCard from '../components/TaskCard';
// reducers
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addTask,
  toggleTaskComplete,
  deleteTask,
} from '../store/slices/taskSlice';

const HomeScreen = () => {
  /*
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
*/

  // type Task = {
  //   id: string;
  //   title: string;
  //   completed: boolean;
  //   createdAt: number;
  // };

  type TaskType = 'All' | 'Pending' | 'Completed';

  // const [taskList, setTaskList] = useState<Task[]>([]);
  // const [filterTask, setFilterTask] = useState<Task[]>([]);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  const [taskTitle, setTaskTitle] = useState('');
  const [selectedType, setSelectedType] = useState<TaskType>('All');

  const taskTypes: string[] = ['All', 'Pending', 'Completed'];

  const handleOnAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));

      // const newTask = {
      //   id: taskList.length + 1 + '',
      //   title: taskTitle,
      //   completed: false,
      //   createdAt: Date.now(),
      // };
      // const updatedTasks = [newTask, ...taskList];
      // setTaskList(updatedTasks);
      // handleOnApplyFiler(selectedType, updatedTasks);
    }
    setTaskTitle('');
  };

  const handleOnTaskToggle = (taskId: string) => {
    dispatch(toggleTaskComplete(taskId));
    // const updatedTasks = taskList.map(task => {
    //   if (task.id === taskId) {
    //     return { ...task, completed: !task.completed };
    //   }
    //   return task;
    // });
    // setTaskList(updatedTasks);
    // handleOnApplyFiler(selectedType, updatedTasks);
  };

  const handleOnTaskDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
    // const updatedTasks = taskList.filter(task => task.id !== taskId);
    // setTaskList(updatedTasks);
    // handleOnApplyFiler(selectedType, updatedTasks);
  };

  const handleOnApplyFiler = (type: TaskType) => {
    setSelectedType(type);
  };

  const filterdTasks = tasks.filter(task => {
    if (selectedType === 'Pending') {
      return !task.completed;
    } else if (selectedType === 'Completed') {
      return task.completed;
    }
    return task;
  });

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

      {/* Task Types Filter */}
      <View style={styles.taskTypesContainer}>
        {taskTypes.map((type, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => handleOnApplyFiler(type as TaskType)}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === type && styles.selectedTypeText,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {filterdTasks.length === 0 && (
        <View style={styles.emptyList}>
          <Text>No tasks available</Text>
        </View>
      )}

      {/* FlatList: Task Lists */}
      <FlatList
        data={filterdTasks}
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
  taskTypesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
    marginTop: 20,
    justifyContent: 'space-around',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.GRAY,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedTypeText: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
  },
});
