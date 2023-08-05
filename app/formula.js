import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Formula = () => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
      storeData([...images, result.uri]);
    }
  };

  const storeData = async (images) => {
    try {
      await AsyncStorage.setItem('images', JSON.stringify(images));
    } catch (e) {
      console.log('Error storing images: ', e);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('images');
      if (value !== null) {
        setImages(JSON.parse(value));
      }
    } catch (e) {
      console.log('Error retrieving images: ', e);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('images');
      setImages([]);
    } catch (e) {
      console.log('Error clearing images: ', e);
    }
  };

  const numColumns = 3;
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          setSelectedImage(item);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
        <Button title="Clear Images" onPress={clearData} />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    galleryContainer: {
      flex: 1,
      margin: 5,
    },
    imageContainer: {
      flex: 1 / 3,
      aspectRatio: 1,
      margin: 5,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
export default Formula;  