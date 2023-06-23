// CODE FOR SECTION 4 GOES HERE
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import MessageItem from '../components/MessageItem';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Fetch all chat messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Create a new chat message
  const createMessage = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      console.log('Message created:', data);
      setInputText('');
      fetchMessages(); // Refresh the messages list
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  // Delete a chat message
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/messages/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Message deleted successfully');
        fetchMessages(); // Refresh the messages list
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Update a chat message
  // Update a chat message
  
  
  

  useEffect(() => {
    fetchMessages();
  }, []);

  const renderMessageItem = ({ item }) => {
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/api/messages/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Message deleted successfully');
          fetchMessages(); // Refresh the messages list
        } else {
          console.error('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    };
  
    const handleUpdate = async (id, newText) => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/api/messages/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newText }),
        });
        if (response.ok) {
          console.log('Message updated successfully');
          fetchMessages(); // Refresh the messages list
        } else {
          console.error('Failed to update message');
        }
      } catch (error) {
        console.error('Error updating message:', error);
      }
    };
  
    return (
      <MessageItem item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessageItem}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Type your message..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton} onPress={createMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  messagesContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  messageContainer: {
    backgroundColor: '#323232',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  optionText: {
    color: '#007AFF',
    marginLeft: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#666',
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: '#FFF',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatApp;
