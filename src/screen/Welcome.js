import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
  
  return (
    <ImageBackground
      source={require('../red.jpg')} // Replace with your image path
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.customText}>GameSPY</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Game ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  customText: {
    fontFamily: 'OCR A Extended Regular', // Use the actual font name you defined in react-native.config.js
    fontSize: 50,
    color: '#fff',
    // Other text styles
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Overlay to make the text/button visible
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
 
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Button text color
  },
});

export default Welcome;