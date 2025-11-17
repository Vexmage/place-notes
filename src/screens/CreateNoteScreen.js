// src/screens/CreateNoteScreen.js
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CreateNoteScreen({ route, navigation }) {
  const { lat, lng, onSave } = route.params || {};
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) {
      Alert.alert('Empty note', 'Please enter some text for your note.');
      return;
    }

    if (typeof onSave === 'function' && lat && lng) {
      onSave({
        id: Date.now().toString(),
        text: text.trim(),
        lat,
        lng,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Note</Text>

      {lat && lng && (
        <Text style={styles.subtitle}>
          At location: {lat.toFixed(5)}, {lng.toFixed(5)}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write your note, memory, or graffiti…"
        value={text}
        onChangeText={setText}
        multiline
      />

      <View style={styles.buttons}>
        <Button title="Save Note" onPress={handleSave} />
        <View style={{ height: 8 }} />
        <Button title="Cancel" color="#777" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttons: {
    marginTop: 8,
  },
});
