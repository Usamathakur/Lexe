import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { render } from 'react-native-draftjs-render';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef();

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const insertText = (text) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const newContentState = Modifier.insertText(contentState, selectionState, text);
    setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
  };

  const setBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const setItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const setUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    // Save content to your database or local storage
  };

  const loadContent = (content) => {
    const parsedContent = convertFromRaw(JSON.parse(content));
    setEditorState(EditorState.createWithContent(parsedContent));
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={setBold}>
          <Text>Bold</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setItalic}>
          <Text>Italic</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setUnderline}>
          <Text>Underline</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => insertText('Hello World')}>
          <Text>Insert Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveContent}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editorContainer}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          ref={editorRef}
          placeholder="Type here..."
          style={styles.editor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  editorContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
  },
  editor: {
    flex: 1,
  },
});

export default RichTextEditor;
