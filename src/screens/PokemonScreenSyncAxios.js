import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

const PokemonListSA = () => {
  const [pokemonData, setPokemonData] = useState([]); // State to hold the fetched Pokemon data
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State to hold the selected Pokemon
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

  useEffect(() => {
    // Fetch Pokemon data when the component mounts
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=10')
      .then(response => {
        setPokemonData(response.data.results); // Update the state with the fetched Pokemon data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handlePokemonSelect = (pokemon) => {
    // Fetch the details of the selected Pokemon
    axios
      .get(pokemon.url)
      .then(response => {
        setSelectedPokemon(response.data); // Update the state with the selected Pokemon's details
        setModalVisible(true); // Show the modal to display the selected Pokemon's details
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon List using Axios</Text>
      <FlatList
        data={pokemonData}
        keyExtractor={pokemon => pokemon.name}
        renderItem={({ item: pokemon }) => (
          <TouchableOpacity onPress={() => handlePokemonSelect(pokemon)}>
            <Text style={styles.item}>{pokemon.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {selectedPokemon && (
                <View>
                  <Image
                    source={{ uri: selectedPokemon.sprites.front_default }}
                    style={styles.pokemonImage}
                  />
                  <Text style={styles.pokemonName}>Name: {selectedPokemon.name}</Text>
                  <Text style={styles.pokemonDetail}>Height: {selectedPokemon.height}</Text>
                  <Text style={styles.pokemonDetail}>Weight: {selectedPokemon.weight}</Text>
                  {/* Render other Pokemon details as needed */}
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pokemonDetail: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default PokemonListSA;