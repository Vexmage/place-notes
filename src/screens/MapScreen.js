// src/screens/MapScreen.js
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useUserLocation from '../hooks/useUserLocation';

export default function MapScreen({ navigation }) {
  const { location, errorMsg, loading } = useUserLocation();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Getting your location…</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 16 }}>{errorMsg}</Text>
        <Button title="Create Note" onPress={() => navigation.navigate('CreateNote')} />
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
        {/* Example marker at your location for now */}
        <Marker coordinate={location} title="You are here" />
      </MapView>

      {/* Floating button to go to Create Note */}
      <View style={styles.fabContainer}>
        <Button
          title="+ Note"
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
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
