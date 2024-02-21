import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
  const navigation = useNavigation();

  // Dummy list of games
  const allGames = [
    { id: 1, title: 'Game 1' },
    { id: 2, title: 'Game 2' },
    { id: 3, title: 'Game 3' },
    { id: 4, title: 'Game 4' },
    { id: 5, title: 'Game 5' },
    { id: 6, title: 'Game 6' },
    { id: 7, title: 'Game 7' },
    { id: 8, title: 'Game 8' },
    { id: 9, title: 'Game 9' },
    { id: 10, title: 'Game 10' },
    // Add more games as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Slice the list of games for the current page
  const games = allGames.slice(startIndex, endIndex);

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToGamePage(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Function to handle pagination
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Function to navigate to GamePage.js
  const navigateToGamePage = (game) => {
    navigation.navigate('GamePage', { gameId: game.id, gameTitle: game.title });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.pagination}>
        <TouchableOpacity onPress={goToPrevPage} disabled={currentPage === 1} style={[styles.button, currentPage === 1 && styles.disabled]}>
          <Text style={styles.buttonText}>Previous Page</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Page {currentPage}</Text>
        <TouchableOpacity onPress={goToNextPage} disabled={endIndex >= allGames.length} style={[styles.button, endIndex >= allGames.length && styles.disabled]}>
          <Text style={styles.buttonText}>Next Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000', // Example border color
    borderRadius: 15, // Optional: to round the corners
  },
  title: {
    fontSize: 18,
    color:'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: 'lightgray',
  },
});

export default Game;
