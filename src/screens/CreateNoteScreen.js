// src/screens/CreateNoteScreen.js
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CreateNoteScreen({ route, navigation }) {
  const { lat, lng } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Note</Text>
      {lat && lng && (
        <Text style={styles.subtitle}>
          At location: {lat.toFixed(5)}, {lng.toFixed(5)}
        </Text>
      )}

      <Button title="Back to Map" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
});
