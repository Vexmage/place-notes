// src/screens/MapScreen.js
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useUserLocation from '../hooks/useUserLocation';

export default function MapScreen({ navigation }) {
  const { location, errorMsg, loading } = useUserLocation();
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Getting your location…</Text>
      </View>
    );
  }

  if (errorMsg || !location) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 16 }}>{errorMsg || 'No location available'}</Text>
        <Button title="Retry" onPress={() => { /* later we can add retry */ }} />
      </View>
    );
  }

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        showsUserLocation
      >
        {/* Marker at your current location (optional, since blue dot already shows it) */}
        <Marker coordinate={location} title="You are here" pinColor="red" />

        {/* Render all saved notes */}
        {notes.map((note) => (
          <Marker
            key={note.id}
            coordinate={{ latitude: note.lat, longitude: note.lng }}
            title={note.text}
            description={note.text}
          />
        ))}
      </MapView>

      {/* Floating button to go to Create Note */}
      <View style={styles.fabContainer}>
        <Button
          title="+ NOTE"
          onPress={() =>
            navigation.navigate('CreateNote', {
              lat: location.latitude,
              lng: location.longitude,
              onSave: handleAddNote, // pass callback to CreateNoteScreen
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
