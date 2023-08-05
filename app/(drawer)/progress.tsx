import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryCalendar = ({ history }) => {
  return (
    <View style={styles.calendarContainer}>
      {history.map((date) => (
        <View key={date} style={styles.calendarDay}>
          <Text>{date}</Text>
        </View>
      ))}
    </View>
  );
};

const Progress = () => {
  const [daysUsed, setDaysUsed] = useState(0);
  const [firstLaunchDate, setFirstLaunchDate] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
    loadHistory();
  }, []);

  const loadData = async () => {
    try {
      const storedFirstLaunchDate = await AsyncStorage.getItem('firstLaunchDate');
      if (storedFirstLaunchDate) {
        const today = new Date();
        const differenceInDays = Math.floor((today - new Date(storedFirstLaunchDate)) / (1000 * 60 * 60 * 24));
        setDaysUsed(differenceInDays + 1); // Add 1 to include the first launch day
        setFirstLaunchDate(new Date(storedFirstLaunchDate));
      } else {
        // First launch, set the current date as the first launch date
        const today = new Date();
        await AsyncStorage.setItem('firstLaunchDate', today.toISOString());
        setFirstLaunchDate(today);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(); // Format the date in a localized string
  };

  const handleFeedbackPress = () => {
    const email = 'feedback@example.com';
    const subject = 'App Feedback';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(mailtoLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracking</Text>
      {firstLaunchDate && (
        <Text style={styles.progressText}>You started using the app on {formatDate(firstLaunchDate)}</Text>
      )}
      <Text style={styles.progressText}>Today is {formatDate(new Date())}</Text>
      <Text style={styles.progressText}>You have used the app for {daysUsed} days!</Text>

      <TouchableOpacity onPress={handleFeedbackPress}>
        <Text style={styles.feedbackButton}>Provide Feedback</Text>
      </TouchableOpacity>

      <Text style={styles.title}>History Tracking</Text>
      <HistoryCalendar history={history} />
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
  progressText: {
    fontSize: 16,
  },
  feedbackButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default Progress;
