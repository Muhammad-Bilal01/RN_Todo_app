import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskCard = ({ title, isCompleted, onToggle, onDelete }: Props) => {
  return (
    <View style={styles.taskCard}>
      <Pressable onPress={onToggle}>
        {/* check circle */}
        <View style={[styles.checkCircle, isCompleted && styles.checked]} />
      </Pressable>
      {/* task title */}
      <Text style={[styles.taskTitle, isCompleted && styles.completedTitle]}>
        {title}
      </Text>

      <Pressable onPress={onDelete}>
        {/* check circle */}
        <Text style={styles.deleteText}>Del</Text>
      </Pressable>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    marginRight: 8,
    marginLeft: 4,
  },
  checked: {
    backgroundColor: COLORS.PRIMARY,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.GRAY,
  },
  deleteText: {
    fontSize: 16,
    color: COLORS.RED,
    fontWeight: '700',
  },
});
