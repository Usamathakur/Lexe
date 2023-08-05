import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks]);

  const loadData = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddTask = () => {
    if (!newTaskText.trim() || !selectedDate) {
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [selectedDate]: [...(prevTasks[selectedDate] || []), newTaskText],
      };
      setNewTaskText('');
      return updatedTasks;
    });
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Planner</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />
      </View>

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          value={newTaskText}
          onChangeText={(text) => setNewTaskText(text)}
          placeholder="Enter your task"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {selectedDate && tasks[selectedDate] && (
        <>
          <Text style={styles.sectionTitle}>Tasks for {selectedDate}:</Text>
          <FlatList
            data={tasks[selectedDate]}
            renderItem={renderTask}
            keyExtractor={(item, index) => `task-${index}`}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  calendarContainer: {
    marginBottom: 16,
  },
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius:25
  },
  addButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 8,
    backgroundColor:'lightblue',
    borderRadius:20
  },
  taskText: {
    fontSize: 20,
    fontWeight:'600',
    color:'blue'
  },
});

export default Planner;
