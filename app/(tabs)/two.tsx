import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoogleDocsClone = () => {
  const initialNumRows = 100; // Number of rows to start with
  const initialNumCols = 10; // Number of columns to start with
  const scrollThreshold = 300; // Threshold for dynamically adding more rows and columns

  // Days of the week to use as column headers
  const daysOfWeek = Array.from({ length: initialNumCols }, (_, index) => `Day${index + 1}`);

  // Calculate screen dimensions to adjust cell size accordingly
  const screenWidth = Dimensions.get('window').width;
  const cellWidth = Math.floor(screenWidth / initialNumCols);

  // State to store the grid data
  const [gridData, setGridData] = useState([]);

  // Ref for ScrollView
  const scrollViewRef = useRef(null);

  // Track the visible indices of rows and columns
  const [visibleRows, setVisibleRows] = useState({ start: 0, end: initialNumRows });
  const [visibleCols, setVisibleCols] = useState({ start: 0, end: initialNumCols });

  // Function to handle cell value change
  const handleCellValueChange = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][colIndex].value = value;
    setGridData(updatedGridData);
  };

  // Function to handle scrolling and update visible indices
  const handleScroll = useCallback(
    (event) => {
      const contentOffset = event.nativeEvent.contentOffset;
      const contentSize = event.nativeEvent.contentSize;
      const layoutMeasurement = event.nativeEvent.layoutMeasurement;

      const isReachingEndX = contentSize.width - contentOffset.x <= layoutMeasurement.width + scrollThreshold;
      const isReachingEndY = contentSize.height - contentOffset.y <= layoutMeasurement.height + scrollThreshold;

      if (isReachingEndX || isReachingEndY) {
        const updatedGridData = [...gridData];

        if (isReachingEndX) {
          for (let i = 0; i < initialNumRows; i++) {
            updatedGridData[i] = [
              ...updatedGridData[i],
              {
                value: '',
                coordinate: daysOfWeek[visibleCols.end + i],
              },
            ];
          }
        }

        if (isReachingEndY) {
          const newRow = Array(updatedGridData[0].length).fill('').map((_, colIndex) => ({
            value: '',
            coordinate: daysOfWeek[colIndex] + (updatedGridData.length + 1),
          }));
          updatedGridData.push(newRow);
        }

        setGridData(updatedGridData);
      }

      // Check if gridData is empty and set initial visible rows and columns
      if (gridData.length === 0) {
        setVisibleRows({ start: 0, end: initialNumRows });
        setVisibleCols({ start: 0, end: initialNumCols });
        return;
      }

      // Calculate visible rows and columns
      const rowHeight = 50; // Adjust this based on your cell height

      const visibleStartRow = Math.max(0, Math.floor(contentOffset.y / rowHeight) - 1);
      const visibleEndRow = Math.min(gridData.length, Math.ceil((contentOffset.y + layoutMeasurement.height) / rowHeight) + 1);
      const visibleStartCol = Math.max(0, Math.floor(contentOffset.x / cellWidth) - 1);
      const visibleEndCol = Math.min(gridData[0].length, Math.ceil((contentOffset.x + layoutMeasurement.width) / cellWidth) + 1);

      setVisibleRows({ start: visibleStartRow, end: visibleEndRow });
      setVisibleCols({ start: visibleStartCol, end: visibleEndCol });
    },
    [gridData]
  );

  // State to track if data is loaded or not
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data from local storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedGridData = await AsyncStorage.getItem('gridData');
        if (savedGridData) {
          setGridData(JSON.parse(savedGridData));
        } else {
          // Initialize grid data with empty values
          setGridData(
            Array.from({ length: initialNumRows }, (_, rowIndex) =>
              Array.from({ length: initialNumCols }, (_, colIndex) => ({
                value: '',
                coordinate: daysOfWeek[colIndex] + (rowIndex + 1),
              }))
            )
          );
        }
        setDataLoaded(true); // Set dataLoaded to true once data is loaded
      } catch (error) {
        console.error('Error loading data:', error);
        setDataLoaded(true); // Set dataLoaded to true even if there's an error
      }
    };
    loadData();
  }, []);

  // Save data to local storage whenever gridData changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('gridData', JSON.stringify(gridData));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [gridData]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Track your Progress</Text>
      </View>
      {dataLoaded ? ( // Check if data is loaded
        <ScrollView
          ref={scrollViewRef}
          horizontal
          onScroll={(event) => {
            handleScroll(event);
            // Manually trigger ScrollView re-rendering when the ScrollView is scrolled
            scrollViewRef.current?.setNativeProps({ scrollEnabled: false });
            setTimeout(() => {
              scrollViewRef.current?.setNativeProps({ scrollEnabled: true });
            }, 100);
          }}
          scrollEventThrottle={16} // Adjust the scroll responsiveness
        >
          <ScrollView
            onScroll={(event) => handleScroll(event)}
            scrollEventThrottle={16}
          >
            <View style={styles.gridContainer}>
              {/* Header row */}
              <View style={styles.row}>
                <View style={[styles.cell, styles.headerCell]} />
                {gridData[0].slice(visibleCols.start, visibleCols.end).map((_, colIndex) => (
                  <View key={colIndex} style={[styles.cell, styles.headerCell]}>
                    <Text style={styles.cellText}>{daysOfWeek[colIndex + visibleCols.start]}</Text>
                  </View>
                ))}
              </View>

              {/* Grid rows */}
              {gridData.slice(visibleRows.start, visibleRows.end).map((rowData, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  <View style={[styles.cell, styles.headerCell]}>
                    <Text style={styles.cellText}>{rowData[0].coordinate}</Text>
                  </View>
                  {rowData.slice(visibleCols.start, visibleCols.end).map((cellData, colIndex) => (
                    <View key={colIndex} style={[styles.cell, styles.dataCell]}>
                      <TextInput
                        style={styles.cellText}
                        multiline // Allow multiline input
                        value={cellData.value}
                        onChangeText={(value) => handleCellValueChange(rowIndex, colIndex + visibleCols.start, value)}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      ) : (
        // Show loading indicator while data is being fetched
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
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
  gridContainer: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 100, // Adjust this based on your cell height
    width: '100%', // Width of the entire grid
  },
  headerCell: {
    backgroundColor: 'lightblue', // Background color for header cells
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    height: '100%', // Take the entire height of the row
  },
  dataCell: {
    backgroundColor: '#fff', // Background color for data cells
  },
  cellText: {
    textAlignVertical: 'top',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoogleDocsClone;
