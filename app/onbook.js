import { Text, Image, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function OnBookScreen() {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Retrieve imageUri from AsyncStorage
    AsyncStorage.getItem('imageUri').then((value) => {
      setImageUri(value);
    });
  }, []);

  const pickImage = async () => {
    // Configure image picker options
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 9],
      quality: 1,
      base64: true
    };
  
    // Show image picker
    const response = await ImagePicker.launchImageLibraryAsync(options);
  
    if (!response.cancelled) {
      // Save image to app's document directory
      const fileName = response.uri.split('/').pop();
      const destPath = `${FileSystem.documentDirectory}/${fileName}`;
      await FileSystem.copyAsync({from: response.uri, to: destPath});
  
      // Update imageUri state and save to AsyncStorage
      setImageUri(destPath);
      await AsyncStorage.setItem('imageUri', destPath);
    }
  };  

  return (
    <View style={{ backgroundColor: '#161818', flex: 1 }}>
      <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 375 , height: 563 }} />}
        <View style={styles.button}>
          <Button title="Select Image" onPress={pickImage} />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems:'center',
    borderRadius: 8,
    borderColor: 'red',
    padding: 6,
    borderWidth: 5,
  },
});
