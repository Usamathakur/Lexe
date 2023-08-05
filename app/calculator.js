import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleAddition = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum.toString());
  };

  const handleSubtraction = () => {
    const difference = parseFloat(num1) - parseFloat(num2);
    setResult(difference.toString());
  };

  const handleMultiplication = () => {
    const product = parseFloat(num1) * parseFloat(num2);
    setResult(product.toString());
  };

  const handleDivision = () => {
    const quotient = parseFloat(num1) / parseFloat(num2);
    setResult(quotient.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Place To Calculate Whatever</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter first number'
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter second number'
        value={num2}
        onChangeText={setNum2}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleAddition}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubtraction}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMultiplication}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDivision}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'lightgray'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CalculatorScreen;
