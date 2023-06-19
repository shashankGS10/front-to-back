import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const PokemonListAF = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=10');
          const data = await response.json();
          setPokemonData(data.results);
          setIsLoading(false); // Set loading state to false when data is fetched
        }, 5000); //5 seconds of lag to show how Async works
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonSelect = async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setSelectedPokemon(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Handling data using Async Fetch function to render Pokemon List</Text>
      <FlatList
        data={pokemonData}
        keyExtractor={(pokemon) => pokemon.name}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonListAF;
