import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';
import useUserLocation from '../hooks/useUserLocation';

export default function MapScreen({ navigation }) {
  const { location, errorMsg, loading, refreshLocation } = useUserLocation();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesRef = collection(db, 'notes');
    const q = query(notesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(loaded);
      },
      (error) => {
        console.error('Error listening for notes:', error);
      }
    );

    return () => unsubscribe();
  }, []);

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
        <Text style={{ marginBottom: 16 }}>
          {errorMsg || 'Current location is unavailable. Make sure that location services are enabled.'}
        </Text>
        <Button title="Retry" onPress={refreshLocation} />
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
        <Marker coordinate={location} title="You are here" pinColor="red" />

        {notes.map((note) => (
          <Marker
            key={note.id}
            coordinate={{ latitude: note.lat, longitude: note.lng }}
            title={note.text}
            description={note.text}
          />
        ))}
      </MapView>

      <View style={styles.fabContainer}>
        <Button
          title="+ NOTE"
          onPress={() =>
            navigation.navigate('CreateNote', {
              lat: location.latitude,
              lng: location.longitude,
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
    padding: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
