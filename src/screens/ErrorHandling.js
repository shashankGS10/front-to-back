import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/iamwrong';

// 200 OK: Successful request (GET, POST, PUT, DELETE).

// 201 Created: New resource successfully created (e.g., POST).

// 400 Bad Request: Invalid or malformed request data.

// 401 Unauthorized: Request requires authentication, invalid credentials.

// 403 Forbidden: Authenticated client lacks permission to access resource.

// 404 Not Found: Requested resource not found.

// 500 Internal Server Error: Server encountered an unexpected error.


const ErrorHandle = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render the fetched data */}
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default ErrorHandle;
