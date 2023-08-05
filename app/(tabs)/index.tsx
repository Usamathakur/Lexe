import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabOneScreen = () => {
  const editorRef = useRef(null);
  const isFocused = useIsFocused();

  // Function to set bold formatting
  const setBold = () => {
    editorRef.current?.sendAction('bold');
  };

  // Function to set italic formatting
  const setItalic = () => {
    editorRef.current?.sendAction('italic');
  };

  // Function to set underline formatting
  const setUnderline = () => {
    editorRef.current?.sendAction('underline');
  };

  // Handle editor focus when the screen is focused
  useEffect(() => {
    if (isFocused && editorRef.current) {
      editorRef.current.focusContentEditor();
    }
  }, [isFocused]);

  // Save the content to AsyncStorage when component unmounts
  useEffect(() => {
    return () => {
      saveContentToAsyncStorage();
    };
  }, []);

  // Load the content from AsyncStorage when the component mounts
  useEffect(() => {
    loadContentFromAsyncStorage();
  }, []);

  // Function to save the content to AsyncStorage
  const saveContentToAsyncStorage = async () => {
    try {
      const content = await editorRef.current?.getContentHtml();
      if (content) {
        await AsyncStorage.setItem('editorContent', content);
      }
    } catch (error) {
      console.log('Error saving content to AsyncStorage:', error);
    }
  };

  // Function to load the content from AsyncStorage
  const loadContentFromAsyncStorage = async () => {
    try {
      const content = await AsyncStorage.getItem('editorContent');
      if (content && editorRef.current) {
        editorRef.current?.setContentHtml(content);
      }
    } catch (error) {
      console.log('Error loading content from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <RichToolbar
        editor={editorRef}
        selectedIconTint="#2095F2"
        disabledIconTint="#bfbfbf"
        onPressAddImage={() => {}}
      />
      <RichEditor
        ref={editorRef}
        style={styles.editor}
        initialContentHTML=""
        useContainer={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editor: {
    flex: 1,
  },
});

export default TabOneScreen;
