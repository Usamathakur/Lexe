import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Do something with the scanned data, e.g., open a URL, add an event, etc.
    Alert.alert('Scanned QR Code', `Type: ${type}, Data: ${data}`, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>

      {/* QR Code Scanner */}
      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanAgainButtonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scanAgainButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  scanAgainButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
